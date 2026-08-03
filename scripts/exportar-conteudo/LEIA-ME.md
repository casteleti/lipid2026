# Pacote de migração de conteúdo

Produção já tem o **código** e o **schema** atualizados, além dos textos de
institucional / segmentos / tecnologias (seeds em `scripts/seed-*`).

O que **não** viaja no git e por isso falta lá:

| Conteúdo | Local | Produção |
|---|---|---|
| Ingredientes | 218 | 0 |
| Códigos comerciais | 312 | 0 |
| Tags / categorias de ingrediente | 258 / 48 | 0 |
| Parceiros | 2 | 0 |
| Posts (conteúdo técnico) | 4 | 0 |
| Mídia enviada pelo painel | 8 arquivos | — |

## Como aplicar

1. **Banco** — o arquivo só faz INSERT com `ON CONFLICT DO NOTHING`: não apaga nem
   sobrescreve nada, e rodar duas vezes não duplica (testado em banco limpo).

   ```bash
   psql "<DATABASE_URL_DE_PRODUCAO>" -v ON_ERROR_STOP=1 -f saida/conteudo.sql
   ```

   Ao final ele imprime a contagem das tabelas principais — confira 218 ingredientes.

2. **Mídia** — o conteúdo de `uploads.tar.gz` precisa ir para o volume do container
   da API, no caminho que a API serve como `/uploads`:

   ```bash
   # no servidor, com o container da API rodando
   docker cp uploads.tar.gz <container_api>:/tmp/
   docker exec <container_api> tar -xzf /tmp/uploads.tar.gz -C /app/apps/api
   ```

   Sem esse passo, logos de parceiros e PDFs de material quebram (404).

3. **Conferir**

   ```bash
   curl -s "https://api.daksa.app.br/api/v1/ingredients?take=1" | head -c 120
   ```

## Regerar o pacote

```bash
cd scripts/exportar-conteudo && ./exportar.sh
```

Lê o banco local (`lipid_development`) e regrava `saida/`.

## O que este pacote NÃO faz

- Não sincroniza schema — isso é `prisma migrate diff` (não há migrations versionadas).
- Não leva leads nem page_views: são dados de produção, e trazer os locais poluiria
  o relatório comercial com registros de teste.
- Não mexe em `technologies_on_applications`: produção já tem os próprios vínculos,
  e os ids de tecnologia/aplicação **diferem** entre os ambientes.

## Compatibilidade do dump

O `pg_dump` recente emite `\restrict`/`\unrestrict` — meta-comandos do psql que um
cliente mais antigo no destino (ex.: `postgres:15-alpine`) não reconhece, derrubando
a carga no meio. O `exportar.sh` remove essas linhas na origem; elas não carregam
dado, são só um envelope de sessão. O tar também sai sem os `._*` do macOS, que
virariam lixo servido como mídia pela API.

Ambos foram encontrados na primeira migração para produção (03/08/2026) e corrigidos
no script — regerar o pacote hoje já sai limpo.
