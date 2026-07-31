#!/usr/bin/env python3
"""
Prova que slugify.py (importador) e slugify.ts (API) produzem o MESMO slug.

Roda os dois sobre todos os nomes reais da planilha e compara. Se divergirem, editar
um produto no CMS mudaria a URL pública dele — falha silenciosa e cara.

Uso:
    python3 verificar_slug.py --xlsx "Orientação para Cadastrar no Site.xlsx"
"""

import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

from importar_catalogo import slugify

TS_RUNNER = """
const {{ slugify }} = require({modulo});
const nomes = require({entrada});
console.log(JSON.stringify(nomes.map(slugify)));
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--xlsx", required=True)
    args = ap.parse_args()

    import openpyxl

    ws = openpyxl.load_workbook(args.xlsx, data_only=True).active
    nomes = []
    for _fab, nome, categoria, tags in ws.iter_rows(min_row=2, values_only=True):
        if not nome:
            continue
        nomes.append(str(nome).strip())
        if categoria:
            nomes.append(str(categoria).strip())
        nomes += [t.strip() for t in str(tags or "").split(";") if t.strip()]
    nomes = sorted(set(nomes))

    raiz = Path(__file__).resolve().parents[2]
    ts = raiz / "apps/api/src/common/slugify.ts"
    if not ts.exists():
        sys.exit(f"não achei {ts}")

    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        # compila o .ts isolado (sem depender do build da API inteira)
        subprocess.run(
            ["npx", "tsc", str(ts), "--outDir", str(tmp), "--module", "commonjs", "--target", "es2020"],
            cwd=raiz / "apps/api", check=True, capture_output=True,
        )
        (tmp / "nomes.json").write_text(json.dumps(nomes, ensure_ascii=False))
        runner = tmp / "run.js"
        runner.write_text(
            TS_RUNNER.format(
                modulo=json.dumps(str(tmp / "slugify.js")),
                entrada=json.dumps(str(tmp / "nomes.json")),
            )
        )
        saida = subprocess.run(["node", str(runner)], check=True, capture_output=True, text=True)
        do_ts = json.loads(saida.stdout)

    do_py = [slugify(n) for n in nomes]

    divergencias = [(n, p, t) for n, p, t in zip(nomes, do_py, do_ts) if p != t]

    print(f"Comparados {len(nomes)} valores (nomes + categorias + tags)")
    if divergencias:
        print(f"\nFALHOU — {len(divergencias)} divergências:\n")
        for nome, py, ts_ in divergencias[:30]:
            print(f"  {nome!r}\n    python: {py!r}\n    typesc: {ts_!r}")
        sys.exit(1)

    vazios = [n for n, s in zip(nomes, do_py) if not s]
    if vazios:
        print(f"\nATENÇÃO — {len(vazios)} geram slug vazio: {vazios[:10]}")
        sys.exit(1)

    print("OK — Python e TypeScript geram slugs idênticos.")


if __name__ == "__main__":
    main()
