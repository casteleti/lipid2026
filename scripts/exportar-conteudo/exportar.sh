#!/usr/bin/env bash
#
# Exporta o CONTEÚDO do banco local (catálogo, parceiros, blog) para levar a outro
# ambiente. Schema e textos institucionais/segmentos/tecnologias NÃO entram aqui —
# schema é `prisma migrate diff` e os textos têm seeds próprios em scripts/seed-*.
#
# Gera dois arquivos em scripts/exportar-conteudo/saida/:
#   conteudo.sql   — INSERTs idempotentes (ON CONFLICT DO NOTHING), na ordem das FKs
#   uploads.tar.gz — a mídia enviada pelo painel (apps/api/uploads)
#
# Uso:
#   ./exportar.sh
#
set -euo pipefail

DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-lipid_development}"
DB_USER="${DB_USER:-postgres}"

AQUI="$(cd "$(dirname "$0")" && pwd)"
RAIZ="$(cd "$AQUI/../.." && pwd)"
SAIDA="$AQUI/saida"
SQL="$SAIDA/conteudo.sql"

mkdir -p "$SAIDA"

# A ordem importa: o Postgres valida FK linha a linha, então a tabela referenciada
# precisa vir antes. Um pg_dump único com vários -t não garante essa ordem.
TABELAS=(
  partners
  ingredient_categories
  tags
  ingredients
  ingredient_codes
  ingredients_on_tags
  ingredient_images
  ingredient_files
  categories
  content
  content_summary_points
  content_faqs
  content_files
  content_on_categories
)

cat > "$SQL" <<CABECALHO
-- =============================================================================
-- Conteúdo exportado de $DB_NAME em $(date -u '+%Y-%m-%d %H:%M UTC')
--
-- Só INSERT, com ON CONFLICT DO NOTHING: rodar de novo não duplica e não sobrescreve
-- o que já existir no destino. Nada é apagado.
--
-- Pré-requisito: o schema do destino já precisa estar atualizado (mesmas colunas).
--
--   psql "<URL_DO_BANCO>" -v ON_ERROR_STOP=1 -f conteudo.sql
-- =============================================================================

BEGIN;

CABECALHO

for tabela in "${TABELAS[@]}"; do
  linhas=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -tAc \
    "SELECT count(*) FROM $tabela")
  echo "  $tabela: $linhas linha(s)"
  {
    echo ""
    echo "-- ----------------------------------------------------- $tabela ($linhas)"
  } >> "$SQL"

  # Descarta só o preâmbulo de sessão do pg_dump (SET/SELECT pg_catalog/comentários).
  # Filtrar por "linha que começa com INSERT" quebraria os INSERTs que o pg_dump
  # distribui em mais de uma linha — o statement chegaria pela metade no destino.
  pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
    --data-only --column-inserts --on-conflict-do-nothing --no-owner --no-privileges \
    -t "public.$tabela" \
    | sed -E '/^(SET |SELECT pg_catalog|--|$)/d' >> "$SQL" || true
done

cat >> "$SQL" <<RODAPE

COMMIT;

-- Conferência
SELECT 'ingredients' AS tabela, count(*) FROM ingredients
UNION ALL SELECT 'ingredient_codes', count(*) FROM ingredient_codes
UNION ALL SELECT 'tags', count(*) FROM tags
UNION ALL SELECT 'partners', count(*) FROM partners
UNION ALL SELECT 'content', count(*) FROM content
ORDER BY 1;
RODAPE

# ---------------------------------------------------------------- mídia
if [ -d "$RAIZ/apps/api/uploads" ]; then
  tar -czf "$SAIDA/uploads.tar.gz" -C "$RAIZ/apps/api" uploads
  echo "  uploads: $(ls "$RAIZ/apps/api/uploads" | wc -l | tr -d ' ') arquivo(s)"
fi

echo ""
echo "Gerado em $SAIDA:"
ls -lh "$SAIDA" | tail -n +2 | awk '{print "  " $9 "  " $5}'
