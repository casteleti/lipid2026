#!/usr/bin/env python3
"""
Gera o SQL de seed das 4 páginas de segmento (/segmentos/*) a partir do JSON de conteúdo
(lipid_ingredients_4_paginas_segmentos.json) -> tabela segment_pages.

Uso:
    python3 seed_segmentos.py --json lipid_ingredients_4_paginas_segmentos.json --out seed.sql
"""

import argparse
import json
from pathlib import Path

SLUG_TO_SECTOR = {
    "farmaceutica": "FARMACEUTICA",
    "cosmetica": "COSMETICO",
    "nutricional": "NUTRICIONAL",
    "veterinaria": "VETERINARIO",
}


def sql_str(value):
    if value is None or value == "":
        return "NULL"
    return "'" + str(value).replace("'", "''") + "'"


def sql_json(value):
    if value is None:
        return "NULL"
    return "'" + json.dumps(value, ensure_ascii=False).replace("'", "''") + "'::jsonb"


def gerar_sql(doc):
    partes = [
        "-- Seed das páginas de segmento (/segmentos/*)",
        "-- GERADO por scripts/seed-segmentos/seed_segmentos.py — não editar à mão.",
        "-- Idempotente: reexecutar atualiza conteúdo, não duplica.",
        "",
        "BEGIN;",
        "",
    ]

    for ordem, p in enumerate(doc["pages"]):
        sector = SLUG_TO_SECTOR[p["id"]]
        challenge_field = next(
            (f for f in p["project_form"]["segment_fields"] if "desafio" in f["id"]), None
        )
        challenge_options = challenge_field["options"] if challenge_field else []

        partes.append(f"""
-- ===== {p['id']} ({sector}) =====
INSERT INTO segment_pages (
  id, slug, sector, "order", eyebrow, h1, subheadline, "salesParagraphs",
  "applicationsTitle", "applicationsIntro", applications, "floatingHighlight",
  "ingredientExplorerHeadline", "ingredientExplorerSupportingText",
  "formEyebrow", "formTitle", "formDescription", "formValueProposition",
  "formCtaLabel", "formSuccessMessage", "formChallengeOptions",
  "seoTitle", "seoDescription", "seoKeywords", "updatedAt"
) VALUES (
  gen_random_uuid()::text, {sql_str(p['id'])}, {sql_str(sector)}::"LeadSector", {ordem},
  {sql_str(p['hero']['eyebrow'])}, {sql_str(p['hero']['h1'])}, {sql_str(p['hero']['subheadline'])},
  {sql_json(p['sales_paragraphs'])},
  {sql_str(p['applications']['title'])}, {sql_str(p['applications']['intro'])},
  {sql_json(p['applications']['items'])},
  {sql_str(p['floating_highlight'])},
  {sql_str(p['ingredient_explorer']['headline'])}, {sql_str(p['ingredient_explorer']['supporting_text'])},
  {sql_str(p['project_form']['eyebrow'])}, {sql_str(p['project_form']['title'])},
  {sql_str(p['project_form']['description'])}, {sql_str(p['project_form']['value_proposition'])},
  {sql_str(p['project_form']['cta_label'])}, {sql_str(p['project_form']['success_message'])},
  {sql_json(challenge_options)},
  {sql_str(p['seo']['title'])}, {sql_str(p['seo']['description'])}, {sql_json(p['seo']['keywords'])},
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  sector = EXCLUDED.sector, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  h1 = EXCLUDED.h1, subheadline = EXCLUDED.subheadline, "salesParagraphs" = EXCLUDED."salesParagraphs",
  "applicationsTitle" = EXCLUDED."applicationsTitle", "applicationsIntro" = EXCLUDED."applicationsIntro",
  applications = EXCLUDED.applications, "floatingHighlight" = EXCLUDED."floatingHighlight",
  "ingredientExplorerHeadline" = EXCLUDED."ingredientExplorerHeadline",
  "ingredientExplorerSupportingText" = EXCLUDED."ingredientExplorerSupportingText",
  "formEyebrow" = EXCLUDED."formEyebrow", "formTitle" = EXCLUDED."formTitle",
  "formDescription" = EXCLUDED."formDescription", "formValueProposition" = EXCLUDED."formValueProposition",
  "formCtaLabel" = EXCLUDED."formCtaLabel", "formSuccessMessage" = EXCLUDED."formSuccessMessage",
  "formChallengeOptions" = EXCLUDED."formChallengeOptions",
  "seoTitle" = EXCLUDED."seoTitle", "seoDescription" = EXCLUDED."seoDescription",
  "seoKeywords" = EXCLUDED."seoKeywords", "updatedAt" = now();""")

    partes.append("\nCOMMIT;")
    return "\n".join(partes)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", required=True)
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    doc = json.loads(Path(args.json).read_text())
    Path(args.out).write_text(gerar_sql(doc))
    print(f"{len(doc['pages'])} páginas -> {args.out}")


if __name__ == "__main__":
    main()
