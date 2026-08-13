-- =============================================================================
-- CORREÇÃO PONTUAL — imagens dos 4 cards de "Áreas atendidas" em /sobre
--
-- SINTOMA (produção, 12/08/2026): os quatro cards do bento "areas" mostram a caixa
-- tracejada com o texto da dica de arte em vez da foto. As demais imagens da página
-- (quem-somos, como-atuamos, qualidade) aparecem normalmente.
--
-- CAUSA: não é arquivo faltando. Os quatro .webp estão versionados e respondem 200 em
-- produção — conferido em 12/08/2026. O que falta é o `imageUrl` das linhas de
-- institutional_section_items, que está NULL lá.
--
-- Por que só os itens: seed-institucional/seed.sql faz DELETE + INSERT dos itens de cada
-- seção a cada execução, e o INSERT não traz imageUrl. Já o imageUrl das SEÇÕES sobrevive,
-- porque o ON CONFLICT DO UPDATE daquele script não lista essa coluna. Ou seja, rodar o
-- seed institucional depois do seed de imagens apaga a arte dos itens e preserva a das
-- seções — exatamente o estado observado em produção.
--
-- ESCOPO: quatro UPDATEs, casados por título dentro da seção 'areas'. Não apaga, não
-- insere, não toca em nenhuma outra tabela, coluna ou linha. É seguro rodar em produção
-- sem sobrescrever conteúdo editado pelo painel.
--
-- Idempotente: rodar de novo apenas reescreve os mesmos quatro caminhos.
--
--   psql "<URL_DO_BANCO_DE_PRODUCAO>" -f corrigir-imagens-areas-producao.sql
--
-- PREVIEW (rodar antes, não altera nada):
--   SELECT i.title, i."imageUrl" FROM institutional_section_items i
--   JOIN institutional_sections s ON s.id = i."sectionId"
--   WHERE s.slug = 'areas' ORDER BY i."order";
-- =============================================================================

BEGIN;

UPDATE institutional_section_items AS i
SET "imageUrl" = v.url, "updatedAt" = now()
FROM (VALUES
  ('Farmacêutica', '/sobre/sobre-segmento-farmaceutica-frasco-capsulas.webp'),
  ('Cosmética',    '/sobre/sobre-segmento-cosmetica-creme-gel.webp'),
  ('Nutricional',  '/sobre/sobre-segmento-nutricional-lecitina-soja.webp'),
  ('Veterinária',  '/sobre/sobre-segmento-veterinaria-nutricao-animal.webp')
) AS v(titulo, url)
WHERE i.title = v.titulo
  AND i."sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'areas');

-- Confere antes de confirmar: tem de devolver 4 linhas, todas com imageUrl preenchido.
SELECT i."order", i.title, i."imageUrl"
FROM institutional_section_items i
JOIN institutional_sections s ON s.id = i."sectionId"
WHERE s.slug = 'areas'
ORDER BY i."order";

COMMIT;
