-- Aponta os slots de imagem do CMS para os assets versionados em apps/website/public.
--
-- Por que asset estático num campo de CMS: as peças de /sobre e as fotos de parceiro são fixas
-- e devem viajar junto com o deploy (apps/api/uploads/ está no .gitignore, então um upload pelo
-- painel não chega em produção pelo git). O front resolve as duas origens em `resolveAssetUrl`
-- (apps/website/src/lib/api.ts): caminho iniciado em /uploads vai para a API, o resto é servido
-- pelo próprio site. Trocar a arte pelo painel continua funcionando e sobrescreve estes valores.
--
-- Idempotente. Rodar SEMPRE DEPOIS de scripts/seed-institucional/seed.sql — aquele script apaga
-- e reinsere os itens de cada seção, o que descartaria estes imageUrl.

BEGIN;

-- ---------------------------------------------------------------- /sobre : seções
UPDATE institutional_sections SET "imageUrl" = '/sobre/sobre-hero-bicamada-lipidica.webp',
  "updatedAt" = now() WHERE slug = 'hero';

UPDATE institutional_sections SET "imageUrl" = '/sobre/sobre-equipe-laboratorio-controle-qualidade.webp',
  "updatedAt" = now() WHERE slug = 'quem-somos';

UPDATE institutional_sections SET "imageUrl" = '/sobre/sobre-processo-etapas-desenvolvimento.webp',
  "updatedAt" = now() WHERE slug = 'como-atuamos';

UPDATE institutional_sections SET "imageUrl" = '/sobre/sobre-qualidade-equipe-planta.webp',
  "updatedAt" = now() WHERE slug = 'qualidade';

-- ---------------------------------------------------------------- /sobre : minis do bento "areas"
UPDATE institutional_section_items AS i
SET "imageUrl" = v.url, "updatedAt" = now()
FROM (VALUES
  ('farmaceutica', '/sobre/sobre-segmento-farmaceutica-frasco-capsulas.webp'),
  ('cosmetica',    '/sobre/sobre-segmento-cosmetica-creme-gel.webp'),
  ('nutricional',  '/sobre/sobre-segmento-nutricional-lecitina-soja.webp'),
  ('veterinaria',  '/sobre/sobre-segmento-veterinaria-nutricao-animal.webp')
) AS v(anchor, url)
WHERE i."sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'areas')
  AND i.extra->>'anchorId' = v.anchor;

-- ---------------------------------------------------------------- parceiros : foto institucional
UPDATE partners SET image = '/parceiros/lipoid-equipe-lipid-feira.webp',
  "updatedAt" = now() WHERE slug = 'lipoid';

UPDATE partners SET image = '/parceiros/readline-biotech-estande-feira.webp',
  "updatedAt" = now() WHERE slug = 'readline-biotech';

COMMIT;

-- Conferência
SELECT slug, "imageUrl" FROM institutional_sections
 WHERE slug IN ('hero','quem-somos','como-atuamos','qualidade') ORDER BY slug;
SELECT i.extra->>'anchorId' AS anchor, i."imageUrl" FROM institutional_section_items i
 WHERE i."sectionId" = (SELECT id FROM institutional_sections WHERE slug='areas')
 ORDER BY i."order";
SELECT slug, image FROM partners ORDER BY slug;
