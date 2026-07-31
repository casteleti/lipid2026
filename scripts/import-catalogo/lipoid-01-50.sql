-- Catálogo de ingredientes — LIPOID
-- GERADO por scripts/import-catalogo/importar_catalogo.py — não editar à mão.
-- Fontes: Orientação para Cadastrar no Site.xlsx + LIPOID_Produtos_01-50.pdf
-- 50 produtos · 14 categorias · 33 tags · 51 códigos comerciais
--
-- Idempotente: reexecutar atualiza conteúdo, não duplica. Rode dentro de transação.

BEGIN;

DO $$
DECLARE
  v_partner_id text;
BEGIN
  SELECT id INTO v_partner_id FROM partners WHERE slug = 'lipoid';
  IF v_partner_id IS NULL THEN
    RAISE EXCEPTION 'Parceiro % nao encontrado — cadastre-o antes de importar o catalogo', 'lipoid';
  END IF;


  -- ---------- categorias (taxonomia global, compartilhada entre fabricantes)
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfatidilcolinas', 'fosfatidilcolinas', 0, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfatidiletanolaminas', 'fosfatidiletanolaminas', 1, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfatidilgliceróis', 'fosfatidilglicerois', 2, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Glicerofosfocolinas', 'glicerofosfocolinas', 3, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lecitinas de girassol', 'lecitinas-de-girassol', 4, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lecitinas e fosfolipídios de ovo', 'lecitinas-e-fosfolipidios-de-ovo', 5, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lecitinas e fosfolipídios de soja', 'lecitinas-e-fosfolipidios-de-soja', 6, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lecitinas e fosfolipídios de soja hidrogenados', 'lecitinas-e-fosfolipidios-de-soja-hidrogenados', 7, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lecitinas e fosfolipídios de soja não transgênica', 'lecitinas-e-fosfolipidios-de-soja-nao-transgenica', 8, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lecitinas e fosfolipídios de soja não transgênica hidrogenados', 'lecitinas-e-fosfolipidios-de-soja-nao-transgenica-hidrogenados', 9, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lisofosfatidilcolina', 'lisofosfatidilcolina', 10, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Oleato de sódio', 'oleato-de-sodio', 11, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ácidos fosfatídicos', 'acidos-fosfatidicos', 12, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Óleos purificados', 'oleos-purificados', 13, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();

  -- ---------- tags
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Base propilenoglicol', 'base-propilenoglicol', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Colina', 'colina', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Curcumina', 'curcumina', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfatidilcolina', 'fosfatidilcolina', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfatidiletanolamina', 'fosfatidiletanolamina', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfatidilglicerol', 'fosfatidilglicerol', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfolipídio sintético', 'fosfolipidio-sintetico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfolipídios', 'fosfolipidios', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Glicerofosfocolina', 'glicerofosfocolina', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Hidrogenado', 'hidrogenado', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'LPC', 'lpc', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lecitina de girassol', 'lecitina-de-girassol', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lecitina de ovo', 'lecitina-de-ovo', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lecitina de soja', 'lecitina-de-soja', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lipídios', 'lipidios', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lisofosfatidilcolina', 'lisofosfatidilcolina', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'MCT', 'mct', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Não transgênico', 'nao-transgenico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Oleato de sódio', 'oleato-de-sodio', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'PA', 'pa', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'PC', 'pc', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'PE', 'pe', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'PG', 'pg', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Phosal', 'phosal', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Phospholipon', 'phospholipon', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sal de sódio', 'sal-de-sodio', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Triglicerídeos', 'triglicerideos', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ácido fosfatídico', 'acido-fosfatidico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ácido graxo', 'acido-graxo', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Óleo de peixe', 'oleo-de-peixe', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Óleo de soja', 'oleo-de-soja', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Óleo purificado', 'oleo-purificado', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ômega', 'omega', now())
  ON CONFLICT (slug) DO NOTHING;

  -- ---------- produtos

  --   1. Lipoid E 80
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid E 80',
    'lipoid-e-80',
    'Lipoid E 80 integra a família “Egg Lecithins and Phospholipids”. Sua identidade técnica é fosfolipídios de gema de ovo com 80% de fosfatidilcolina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfolipídios de gema de ovo para emulsões, lipossomas e sistemas de entrega',
    'Leve este ingrediente para a próxima etapa: preencha o Formulário de Atendimento e apresente o objetivo da sua formulação.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-ovo'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '510300',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-e-80'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-e-80'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-ovo'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-e-80'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --   2. Lipoid E PC S
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid E PC S',
    'lipoid-e-pc-s',
    'Lipoid E PC S integra a família “Egg Lecithins and Phospholipids”. Sua identidade técnica é fosfatidilcolina de gema de ovo com teor mínimo de 96%. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfatidilcolina altamente purificada para sistemas lipídicos de alta definição',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento para avançar.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-ovo'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '510800',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-e-pc-s'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-e-pc-s'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-ovo'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-e-pc-s'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --   3. LIPOID E PE
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID E PE',
    'lipoid-e-pe',
    'LIPOID E PE integra a família “Egg Lecithins and Phospholipids”. Sua identidade técnica é fosfatidiletanolamina de gema de ovo com teor mínimo de 97%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfolipídio de cabeça etanolamina para estruturas de membrana e formulações especializadas',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e compartilhe os requisitos do projeto.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-ovo'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '581500',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-e-pe'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-e-pe'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-ovo'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-e-pe'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --   4. Lipoid E PG
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid E PG',
    'lipoid-e-pg',
    'Lipoid E PG integra a família “Egg Lecithins and Phospholipids”. Sua identidade técnica é fosfatidilglicerol de gema de ovo, sal de sódio, com teor mínimo de 98%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfolipídio aniônico de alta pureza para ajuste de carga em sistemas lipídicos',
    'Transforme a necessidade técnica em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-ovo'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '583500',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-e-pg'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-e-pg'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-ovo'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-e-pg'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-e-pg'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --   5. Phosal 50 S.A.+
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phosal 50 S.A.+',
    'phosal-50-sa',
    'Phosal 50 S.A.+ integra a família “Soybean Lecithins and Phospholipid Systems”. Sua identidade técnica é formulação de fosfatidilcolina com teor mínimo de 50% em óleo de cártamo. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A linha PHOSAL reúne concentrados líquidos e isentos de água, usados como carreadores de componentes pouco solúveis, solubilizantes, emulsificantes e auxiliares de processo. Na prática, o ativo ou componente lipofílico pode ser dissolvido ou disperso diretamente na matriz, seguido da avaliação de diluição, emulsificação, estabilidade física e compatibilidade com o restante da formulação.',
    'Concentrado líquido e anidro para veiculação de componentes lipofílicos',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '368209',
          (SELECT id FROM ingredients WHERE slug = 'phosal-50-sa'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-50-sa'),
          (SELECT id FROM tags WHERE slug = 'phosal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-50-sa'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-50-sa'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --   6. Phosal 35 SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phosal 35 SB',
    'phosal-35-sb',
    'Phosal 35 SB pertence à linha PHOSAL de concentrados líquidos e isentos de água à base de fosfolipídios. A planilha informa o nome e o código comercial, mas não detalha a composição quantitativa ou o veículo desta apresentação; esses dados devem ser obtidos na ficha técnica vigente.

Como plataforma PHOSAL, o produto é avaliado em projetos que exigem solubilização de componentes pouco solúveis, emulsificação ou incorporação direta em uma matriz lipídica. O desenvolvimento deve confirmar capacidade de carga, miscibilidade, comportamento após contato com água e estabilidade do componente veiculado.

Código comercial: 368215. A composição, o grau e o processo de uso não devem ser definidos sem a documentação específica desta apresentação.

Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o seu projeto.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Concentrado líquido da linha PHOSAL para sistemas anidros e componentes lipofílicos',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '368215',
          (SELECT id FROM ingredients WHERE slug = 'phosal-35-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-35-sb'),
          (SELECT id FROM tags WHERE slug = 'phosal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-35-sb'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-35-sb'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --   7. Phosal H 50
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phosal H 50',
    'phosal-h-50',
    'Phosal H 50 integra a família “Phospholipid Systems”. Sua identidade técnica é fosfatidilcolina de girassol em óleo de girassol, com teor mínimo de 50%. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

A linha PHOSAL reúne concentrados líquidos e isentos de água, usados como carreadores de componentes pouco solúveis, solubilizantes, emulsificantes e auxiliares de processo. Na prática, o ativo ou componente lipofílico pode ser dissolvido ou disperso diretamente na matriz, seguido da avaliação de diluição, emulsificação, estabilidade física e compatibilidade com o restante da formulação.',
    'Sistema líquido de origem não transgênica para incorporar ativos lipofílicos',
    'Para discutir compatibilidade, grau e aplicação, preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '512340',
          (SELECT id FROM ingredients WHERE slug = 'phosal-h-50'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-h-50'),
          (SELECT id FROM tags WHERE slug = 'phosal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-h-50'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-h-50'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --   8. Phosal 53 MCT
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phosal 53 MCT',
    'phosal-53-mct',
    'Phosal 53 MCT integra a família “Phospholipid Systems”. Sua identidade técnica é fosfatidilcolina em triglicerídeos de cadeia média, com teor mínimo de 53%. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

A linha PHOSAL reúne concentrados líquidos e isentos de água, usados como carreadores de componentes pouco solúveis, solubilizantes, emulsificantes e auxiliares de processo. Na prática, o ativo ou componente lipofílico pode ser dissolvido ou disperso diretamente na matriz, seguido da avaliação de diluição, emulsificação, estabilidade física e compatibilidade com o restante da formulação.',
    'Concentrado anidro para solubilização e desenvolvimento de sistemas oleosos',
    'Aproxime este ingrediente da sua formulação. Envie o Formulário de Atendimento para iniciar a análise técnica.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '368204',
          (SELECT id FROM ingredients WHERE slug = 'phosal-53-mct'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-53-mct'),
          (SELECT id FROM tags WHERE slug = 'phosal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-53-mct'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-53-mct'),
          (SELECT id FROM tags WHERE slug = 'mct'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-53-mct'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --   9. Phosal 50 PG
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phosal 50 PG',
    'phosal-50-pg',
    'Phosal 50 PG integra a família “Phospholipid Systems”. Sua identidade técnica é fosfatidilcolina em propilenoglicol, com teor mínimo de 50%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A linha PHOSAL reúne concentrados líquidos e isentos de água, usados como carreadores de componentes pouco solúveis, solubilizantes, emulsificantes e auxiliares de processo. Na prática, o ativo ou componente lipofílico pode ser dissolvido ou disperso diretamente na matriz, seguido da avaliação de diluição, emulsificação, estabilidade física e compatibilidade com o restante da formulação.',
    'Fosfolipídios líquidos para solubilização e interface em formulações',
    'Compartilhe o desafio da sua formulação no Formulário de Atendimento e avance com o suporte da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '368214',
          (SELECT id FROM ingredients WHERE slug = 'phosal-50-pg'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-50-pg'),
          (SELECT id FROM tags WHERE slug = 'phosal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-50-pg'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-50-pg'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-50-pg'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  10. Phosal P 50
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phosal P 50',
    'phosal-p-50',
    'Phosal P 50 integra a família “Phospholipid Systems”. Sua identidade técnica é fosfatidilcolina de soja não transgênica em triglicerídeos de cadeia média. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A linha PHOSAL reúne concentrados líquidos e isentos de água, usados como carreadores de componentes pouco solúveis, solubilizantes, emulsificantes e auxiliares de processo. Na prática, o ativo ou componente lipofílico pode ser dissolvido ou disperso diretamente na matriz, seguido da avaliação de diluição, emulsificação, estabilidade física e compatibilidade com o restante da formulação.',
    'Carreador anidro para ativos lipofílicos em sistemas de fácil processamento',
    'Pronto para estudar esta solução? Preencha o Formulário de Atendimento e dê contexto ao seu desenvolvimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '512300',
          (SELECT id FROM ingredients WHERE slug = 'phosal-p-50'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-p-50'),
          (SELECT id FROM tags WHERE slug = 'phosal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-p-50'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-p-50'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  11. Phosal Curcumin
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phosal Curcumin',
    'phosal-curcumin',
    'Phosal Curcumin integra a família “Phospholipid Systems”. Sua identidade técnica é sistema com fosfatidilcolina em MCT e 7% de curcumina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A linha PHOSAL reúne concentrados líquidos e isentos de água, usados como carreadores de componentes pouco solúveis, solubilizantes, emulsificantes e auxiliares de processo. Na prática, o ativo ou componente lipofílico pode ser dissolvido ou disperso diretamente na matriz, seguido da avaliação de diluição, emulsificação, estabilidade física e compatibilidade com o restante da formulação.',
    'Curcumina pré-formulada em matriz fosfolipídica para melhor dispersão em sistemas lipídicos',
    'Leve este ingrediente para a próxima etapa: preencha o Formulário de Atendimento e apresente o objetivo da sua formulação.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '512020',
          (SELECT id FROM ingredients WHERE slug = 'phosal-curcumin'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-curcumin'),
          (SELECT id FROM tags WHERE slug = 'phosal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-curcumin'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-curcumin'),
          (SELECT id FROM tags WHERE slug = 'curcumina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phosal-curcumin'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  12. Phospholipon 90G
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phospholipon 90G',
    'phospholipon-90g',
    'Phospholipon 90G integra a família “Soybean Phospholipids”. Sua identidade técnica é fosfatidilcolina de soja com teor mínimo de 94%, em forma granulada. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfatidilcolina concentrada para emulsificação, lipossomas e matrizes farmacêuticas',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento para avançar.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '228154',
          (SELECT id FROM ingredients WHERE slug = 'phospholipon-90g'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '368247',
          (SELECT id FROM ingredients WHERE slug = 'phospholipon-90g'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-90g'),
          (SELECT id FROM tags WHERE slug = 'phospholipon'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-90g'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-90g'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  13. Lipoid S 45
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid S 45',
    'lipoid-s-45',
    'Lipoid S 45 integra a família “Soybean Phospholipids”. Sua identidade técnica é fração de lecitina de soja com 45% de fosfatidilcolina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Lecitina purificada para funções de interface e processamento',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e compartilhe os requisitos do projeto.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '574510',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-s-45'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-45'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-45'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  14. Lipoid S 75
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid S 75',
    'lipoid-s-75',
    'Lipoid S 75 integra a família “Soybean Phospholipids”. Sua identidade técnica é fosfolipídios de soja com aproximadamente 70% de fosfatidilcolina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfolipídios concentrados para emulsões, dispersões e lipossomas',
    'Transforme a necessidade técnica em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '577600',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-s-75'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-75'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-75'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  15. Lipoid S 100
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid S 100',
    'lipoid-s-100',
    'Lipoid S 100 integra a família “Soybean Phospholipids”. Sua identidade técnica é fosfatidilcolina de soja com teor mínimo de 94%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfatidilcolina de alta concentração para sistemas lipídicos definidos',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '579000',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-s-100'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-100'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-100'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  16. Phospholipon 80H
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phospholipon 80H',
    'phospholipon-80h',
    'Phospholipon 80H integra a família “Hydrogenated Soybean Phospholipids”. Sua identidade técnica é fosfolipídios de soja hidrogenados com cerca de 70% de fosfatidilcolina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A hidrogenação reduz insaturações nas cadeias lipídicas, aumentando a resistência à oxidação e favorecendo estruturas mais ordenadas. O produto pode ser hidratado ou disperso para formar lamelas, emulsões e lipossomas; temperatura, energia de mistura e composição da fase aquosa determinam tamanho de partícula, viscosidade e estabilidade.',
    'Emulsificante biomimético para estruturas lamelares mais estáveis',
    'Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o seu projeto.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja-hidrogenados'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '529200',
          (SELECT id FROM ingredients WHERE slug = 'phospholipon-80h'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-80h'),
          (SELECT id FROM tags WHERE slug = 'phospholipon'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-80h'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-80h'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-80h'),
          (SELECT id FROM tags WHERE slug = 'hidrogenado'))
  ON CONFLICT DO NOTHING;

  --  17. Phospholipon 90H
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phospholipon 90H',
    'phospholipon-90h',
    'Phospholipon 90H integra a família “Hydrogenated Soybean Phospholipids”. Sua identidade técnica é fosfolipídios de soja hidrogenados com teor mínimo de 90%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A hidrogenação reduz insaturações nas cadeias lipídicas, aumentando a resistência à oxidação e favorecendo estruturas mais ordenadas. O produto pode ser hidratado ou disperso para formar lamelas, emulsões e lipossomas; temperatura, energia de mistura e composição da fase aquosa determinam tamanho de partícula, viscosidade e estabilidade.',
    'Fosfatidilcolina hidrogenada para barreiras e sistemas lamelares robustos',
    'Para discutir compatibilidade, grau e aplicação, preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja-hidrogenados'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '529400',
          (SELECT id FROM ingredients WHERE slug = 'phospholipon-90h'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-90h'),
          (SELECT id FROM tags WHERE slug = 'phospholipon'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-90h'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-90h'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phospholipon-90h'),
          (SELECT id FROM tags WHERE slug = 'hidrogenado'))
  ON CONFLICT DO NOTHING;

  --  18. Lipoid S PC-3
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid S PC-3',
    'lipoid-s-pc-3',
    'Lipoid S PC-3 integra a família “Hydrogenated Soybean Phospholipids”. Sua identidade técnica é fosfatidilcolina de soja hidrogenada com teor mínimo de 98%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A hidrogenação reduz insaturações nas cadeias lipídicas, aumentando a resistência à oxidação e favorecendo estruturas mais ordenadas. O produto pode ser hidratado ou disperso para formar lamelas, emulsões e lipossomas; temperatura, energia de mistura e composição da fase aquosa determinam tamanho de partícula, viscosidade e estabilidade.',
    'Fosfatidilcolina saturada de alta pureza para sistemas de membrana estáveis',
    'Aproxime este ingrediente da sua formulação. Envie o Formulário de Atendimento para iniciar a análise técnica.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja-hidrogenados'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '525600',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-3'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-3'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-3'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-3'),
          (SELECT id FROM tags WHERE slug = 'hidrogenado'))
  ON CONFLICT DO NOTHING;

  --  19. Lipoid P 45
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid P 45',
    'lipoid-p-45',
    'Lipoid P 45 integra a família “Non-GMO Soybean Phospholipids”. Sua identidade técnica é fração de lecitina de soja não transgênica com no mínimo 45% de fosfatidilcolina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Lecitina não transgênica para emulsificação e dispersão',
    'Compartilhe o desafio da sua formulação no Formulário de Atendimento e avance com o suporte da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja-nao-transgenica'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '537000',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-p-45'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-45'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-45'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-45'),
          (SELECT id FROM tags WHERE slug = 'nao-transgenico'))
  ON CONFLICT DO NOTHING;

  --  20. Lipoid P 75
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid P 75',
    'lipoid-p-75',
    'Lipoid P 75 integra a família “Non-GMO Soybean Phospholipids”. Sua identidade técnica é fosfolipídios de soja não transgênica com no mínimo 70% de fosfatidilcolina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfolipídios concentrados para formulações naturais e sistemas de entrega',
    'Pronto para estudar esta solução? Preencha o Formulário de Atendimento e dê contexto ao seu desenvolvimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja-nao-transgenica'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '537500',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-p-75'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-75'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-75'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-75'),
          (SELECT id FROM tags WHERE slug = 'nao-transgenico'))
  ON CONFLICT DO NOTHING;

  --  21. Lipoid P 100
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid P 100',
    'lipoid-p-100',
    'Lipoid P 100 integra a família “Non-GMO Soybean Phospholipids”. Sua identidade técnica é fosfatidilcolina de soja não transgênica com teor mínimo de 90%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfatidilcolina concentrada para lipossomas, emulsões e matrizes biomiméticas',
    'Leve este ingrediente para a próxima etapa: preencha o Formulário de Atendimento e apresente o objetivo da sua formulação.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja-nao-transgenica'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '537800',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-p-100'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-100'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-100'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-100'),
          (SELECT id FROM tags WHERE slug = 'nao-transgenico'))
  ON CONFLICT DO NOTHING;

  --  22. Lipoid P 75-3
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid P 75-3',
    'lipoid-p-75-3',
    'Lipoid P 75-3 integra a família “Hydrogenated Non-GMO Soybean Phospholipids”. Sua identidade técnica é fosfolipídios de soja não transgênica hidrogenados, com cerca de 70% de fosfatidilcolina.

Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A hidrogenação reduz insaturações nas cadeias lipídicas, aumentando a resistência à oxidação e favorecendo estruturas mais ordenadas. O produto pode ser hidratado ou disperso para formar lamelas, emulsões e lipossomas; temperatura, energia de mistura e composição da fase aquosa determinam tamanho de partícula, viscosidade e estabilidade.',
    'Emulsificante biomimético para lamelas e reforço de barreira',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento para avançar.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja-nao-transgenica-hidrogenados'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '525800',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-p-75-3'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-75-3'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-75-3'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-75-3'),
          (SELECT id FROM tags WHERE slug = 'hidrogenado'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-75-3'),
          (SELECT id FROM tags WHERE slug = 'nao-transgenico'))
  ON CONFLICT DO NOTHING;

  --  23. Lipoid P 100-3
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid P 100-3',
    'lipoid-p-100-3',
    'Lipoid P 100-3 integra a família “Hydrogenated Non-GMO Soybean Phospholipids”. Sua identidade técnica é fosfatidilcolina de soja não transgênica hidrogenada, com teor mínimo de 90%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A hidrogenação reduz insaturações nas cadeias lipídicas, aumentando a resistência à oxidação e favorecendo estruturas mais ordenadas. O produto pode ser hidratado ou disperso para formar lamelas, emulsões e lipossomas; temperatura, energia de mistura e composição da fase aquosa determinam tamanho de partícula, viscosidade e estabilidade.',
    'Fosfatidilcolina hidrogenada para estruturas lamelares de alta organização',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e compartilhe os requisitos do projeto.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-e-fosfolipidios-de-soja-nao-transgenica-hidrogenados'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '525900',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-p-100-3'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-100-3'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-100-3'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-100-3'),
          (SELECT id FROM tags WHERE slug = 'hidrogenado'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-100-3'),
          (SELECT id FROM tags WHERE slug = 'nao-transgenico'))
  ON CONFLICT DO NOTHING;

  --  24. Lipoid H 85
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid H 85',
    'lipoid-h-85',
    'Lipoid H 85 integra a família “Sunflower Phospholipids”. Sua identidade técnica é fosfatidilcolina de girassol não transgênico com teor mínimo de 85%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Alternativa vegetal concentrada para sistemas lipídicos e nutricionais',
    'Transforme a necessidade técnica em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-de-girassol'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '533610',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-h-85'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-h-85'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-girassol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-h-85'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  25. Lipoid H 100
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid H 100',
    'lipoid-h-100',
    'Lipoid H 100 integra a família “Sunflower Phospholipids”. Sua identidade técnica é fosfatidilcolina de girassol não transgênico com teor mínimo de 94%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfatidilcolina de alta pureza e origem girassol',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-de-girassol'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '539800',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-h-100'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-h-100'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-girassol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-h-100'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  26. Lipoid H 100-3
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid H 100-3',
    'lipoid-h-100-3',
    'Lipoid H 100-3 integra a família “Hydrogenated Sunflower Phospholipids”. Sua identidade técnica é fosfatidilcolina de girassol hidrogenada com teor mínimo de 94%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A hidrogenação reduz insaturações nas cadeias lipídicas, aumentando a resistência à oxidação e favorecendo estruturas mais ordenadas. O produto pode ser hidratado ou disperso para formar lamelas, emulsões e lipossomas; temperatura, energia de mistura e composição da fase aquosa determinam tamanho de partícula, viscosidade e estabilidade.',
    'Emulsificante biomimético de origem girassol para barreiras e lamelas',
    'Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o seu projeto.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-de-girassol'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '511570',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-h-100-3'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-h-100-3'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-girassol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-h-100-3'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  27. Lipoid H 65
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid H 65',
    'lipoid-h-65',
    'Lipoid H 65 integra a família “Sunflower Phospholipids”. Sua identidade técnica é fosfolipídios de girassol com no mínimo 60% de fosfatidilcolina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Fosfolipídios vegetais para emulsificação e sistemas de entrega',
    'Para discutir compatibilidade, grau e aplicação, preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lecitinas-de-girassol'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '539610',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-h-65'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-h-65'),
          (SELECT id FROM tags WHERE slug = 'lecitina-de-girassol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-h-65'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  28. Lipoid GPC 85 F
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid GPC 85 F',
    'lipoid-gpc-85-f',
    'Lipoid GPC 85 F integra a família “Glycerophosphocholines”. Sua identidade técnica é concentrado fluido de sn-glicero-3-fosfocolina em água. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A glicerofosfocolina é altamente polar e pode ser trabalhada em sistemas aquosos, conforme a apresentação comercial. Em desenvolvimento, pode ser estudada como componente funcional ou fonte de colina, com controle de teor, pH, atividade de água e compatibilidade; a finalidade e as alegações dependem da categoria regulatória do produto final.',
    'GPC em apresentação líquida para desenvolvimento e processamento direto',
    'Aproxime este ingrediente da sua formulação. Envie o Formulário de Atendimento para iniciar a análise técnica.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'glicerofosfocolinas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '580400',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-gpc-85-f'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-gpc-85-f'),
          (SELECT id FROM tags WHERE slug = 'glicerofosfocolina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-gpc-85-f'),
          (SELECT id FROM tags WHERE slug = 'colina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-gpc-85-f'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  29. Lipoid GPC
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid GPC',
    'lipoid-gpc',
    'Lipoid GPC integra a família “Glycerophosphocholines”. Sua identidade técnica é sn-Glicero-3- fosfocolina com teor mínimo de 98%. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A glicerofosfocolina é altamente polar e pode ser trabalhada em sistemas aquosos, conforme a apresentação comercial. Em desenvolvimento, pode ser estudada como componente funcional ou fonte de colina, com controle de teor, pH, atividade de água e compatibilidade; a finalidade e as alegações dependem da categoria regulatória do produto final.',
    'Composto de alta pureza para formulações e estudos com fonte de colina',
    'Compartilhe o desafio da sua formulação no Formulário de Atendimento e avance com o suporte da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'glicerofosfocolinas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '521800',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-gpc'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-gpc'),
          (SELECT id FROM tags WHERE slug = 'glicerofosfocolina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-gpc'),
          (SELECT id FROM tags WHERE slug = 'colina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-gpc'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  30. Lipoid MCT
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid MCT',
    'lipoid-mct',
    'Lipoid MCT integra a família “Purified Oils”. Sua identidade técnica é triglicerídeos de cadeia média de grau compendial. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Em desenvolvimento, atua como fase lipídica ou matriz carreadora para substâncias lipossolúveis e sistemas de emulsão. A seleção deve considerar perfil de ácidos graxos, especificação compendial quando aplicável, resistência oxidativa, compatibilidade com o fármaco ou ativo e requisitos da via de administração.',
    'Óleo funcional para fase lipídica, carreamento e emulsões',
    'Pronto para estudar esta solução? Preencha o Formulário de Atendimento e dê contexto ao seu desenvolvimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'oleos-purificados'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '594000',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-mct'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-mct'),
          (SELECT id FROM tags WHERE slug = 'mct'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-mct'),
          (SELECT id FROM tags WHERE slug = 'oleo-purificado'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-mct'),
          (SELECT id FROM tags WHERE slug = 'triglicerideos'))
  ON CONFLICT DO NOTHING;

  --  31. Lipoid Purified Fish Oil
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid Purified Fish Oil',
    'lipoid-purified-fish-oil',
    'Lipoid Purified Fish Oil integra a família “Purified Oils”. Sua identidade técnica é óleo de peixe purificado de grau compendial. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Em desenvolvimento, atua como fase lipídica ou matriz carreadora para substâncias lipossolúveis e sistemas de emulsão. A seleção deve considerar perfil de ácidos graxos, especificação compendial quando aplicável, resistência oxidativa, compatibilidade com o fármaco ou ativo e requisitos da via de administração.',
    'Matriz lipídica purificada para formulações farmacêuticas e nutricionais',
    'Leve este ingrediente para a próxima etapa: preencha o Formulário de Atendimento e apresente o objetivo da sua formulação.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'oleos-purificados'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '578700',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-purified-fish-oil'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-purified-fish-oil'),
          (SELECT id FROM tags WHERE slug = 'oleo-de-peixe'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-purified-fish-oil'),
          (SELECT id FROM tags WHERE slug = 'oleo-purificado'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-purified-fish-oil'),
          (SELECT id FROM tags WHERE slug = 'omega'))
  ON CONFLICT DO NOTHING;

  --  32. Soybean Oil 700
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Soybean Oil 700',
    'soybean-oil-700',
    'Soybean Oil 700 integra a família “Purified Oils”. Sua identidade técnica é óleo de soja do portfólio de óleos purificados. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Em desenvolvimento, atua como fase lipídica ou matriz carreadora para substâncias lipossolúveis e sistemas de emulsão. A seleção deve considerar perfil de ácidos graxos, especificação compendial quando aplicável, resistência oxidativa, compatibilidade com o fármaco ou ativo e requisitos da via de administração.',
    'Fase oleosa e matriz carreadora para sistemas lipídicos',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento para avançar.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'oleos-purificados'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '570000',
          (SELECT id FROM ingredients WHERE slug = 'soybean-oil-700'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'soybean-oil-700'),
          (SELECT id FROM tags WHERE slug = 'oleo-de-soja'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'soybean-oil-700'),
          (SELECT id FROM tags WHERE slug = 'oleo-purificado'))
  ON CONFLICT DO NOTHING;

  --  33. Soy Oil Herbamilk Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Soy Oil Herbamilk Eco',
    'soy-oil-herbamilk-eco',
    'Soy Oil Herbamilk Eco integra a família “Cosmetic Botanical-Phospholipid System”. Sua identidade técnica é leite cosmético vegetal com óleo de soja, fosfolipídios hidrogenados e matriz de glicerina.

Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Pode ser incorporado a géis de banho, xampus, condicionadores, loções e cremes para fornecer emoliência, refatting e aparência leitosa. Por ser uma dispersão pronta, a formulação deve preservar sua estrutura, controlar viscosidade e confirmar estabilidade após adição de eletrólitos e tensoativos.',
    'Emulsão vegetal pronta para emoliência, hidratação e sensorial lácteo',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e compartilhe os requisitos do projeto.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'oleos-purificados'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '411969',
          (SELECT id FROM ingredients WHERE slug = 'soy-oil-herbamilk-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'soy-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'oleo-purificado'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'soy-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'lipidios'))
  ON CONFLICT DO NOTHING;

  --  34. Sodium Oleate B
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Sodium Oleate B',
    'sodium-oleate-b',
    'Sodium Oleate B integra a família “Fatty Acid Salts”. Sua identidade técnica é oleato de sódio de origem vegetal. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Como sal anfifílico de ácido graxo, pode atuar na interface óleo/água e como coestabilizante. Sua contribuição depende de pH, força iônica, concentração e associação com outros tensoativos ou fosfolipídios; por isso, o comportamento deve ser verificado no sistema completo.',
    'Sal de ácido graxo para coestabilização e modulação de interfaces',
    'Transforme a necessidade técnica em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'oleato-de-sodio'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '520400',
          (SELECT id FROM ingredients WHERE slug = 'sodium-oleate-b'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sodium-oleate-b'),
          (SELECT id FROM tags WHERE slug = 'oleato-de-sodio'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sodium-oleate-b'),
          (SELECT id FROM tags WHERE slug = 'acido-graxo'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sodium-oleate-b'),
          (SELECT id FROM tags WHERE slug = 'sal-de-sodio'))
  ON CONFLICT DO NOTHING;

  --  35. Lipoid P LPC 80
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid P LPC 80',
    'lipoid-p-lpc-80',
    'Lipoid P LPC 80 integra a família “Lysophosphatidylcholine”. Sua identidade técnica é lisofosfatidilcolina com 80% e até 20% de fosfatidilcolina. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

A lisofosfatidilcolina possui apenas uma cadeia acila e comportamento interfacial distinto da fosfatidilcolina diacilada. Pode ser usada para modular solubilização, curvatura de membrana e propriedades de dispersões, sempre com estudos de compatibilidade, segurança e estabilidade adequados à aplicação.',
    'Fosfolipídio monoacilado para solubilização, interfaces e sistemas especializados',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lisofosfatidilcolina'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '510430',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-p-lpc-80'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-lpc-80'),
          (SELECT id FROM tags WHERE slug = 'lisofosfatidilcolina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-lpc-80'),
          (SELECT id FROM tags WHERE slug = 'lpc'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-p-lpc-80'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  36. Lipoid PC 14:0/14:0 (DMPC)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PC 14:0/14:0 (DMPC)',
    'lipoid-pc-140140-dmpc',
    'Lipoid PC 14:0/14:0 (DMPC) corresponde a 1,2-dimiristoil-sn-glicero-3-fosfocolina. Trata-se de um fosfolipídio do tipo fosfatidilcolina zwitteriônica, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em formação de bicamadas e lipossomas com carga global próxima da neutralidade. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 556200. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o seu projeto.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidilcolina zwitteriônica com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidilcolinas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '556200',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pc-140140-dmpc'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-140140-dmpc'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilcolina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-140140-dmpc'),
          (SELECT id FROM tags WHERE slug = 'pc'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-140140-dmpc'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  37. Lipoid PC 16:0/16:0 (DPPC)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PC 16:0/16:0 (DPPC)',
    'lipoid-pc-160160-dppc',
    'Lipoid PC 16:0/16:0 (DPPC) corresponde a 1,2-dipalmitoil-sn-glicero-3-fosfocolina. Trata-se de um fosfolipídio do tipo fosfatidilcolina zwitteriônica, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em formação de bicamadas e lipossomas com carga global próxima da neutralidade. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 556300. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Para discutir compatibilidade, grau e aplicação, preencha o Formulário de Atendimento.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidilcolina zwitteriônica com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidilcolinas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '556300',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pc-160160-dppc'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-160160-dppc'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilcolina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-160160-dppc'),
          (SELECT id FROM tags WHERE slug = 'pc'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-160160-dppc'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  38. Lipoid PC 18:0/18:0 (DSPC)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PC 18:0/18:0 (DSPC)',
    'lipoid-pc-180180-dspc',
    'Lipoid PC 18:0/18:0 (DSPC) corresponde a 1,2-distearoil-sn-glicero-3-fosfocolina. Trata-se de um fosfolipídio do tipo fosfatidilcolina zwitteriônica, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em formação de bicamadas e lipossomas com carga global próxima da neutralidade. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 556500. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Aproxime este ingrediente da sua formulação. Envie o Formulário de Atendimento para iniciar a análise técnica.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidilcolina zwitteriônica com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidilcolinas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '556500',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pc-180180-dspc'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-180180-dspc'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilcolina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-180180-dspc'),
          (SELECT id FROM tags WHERE slug = 'pc'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-180180-dspc'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  39. LIPOID PC 18:1/18:1 (DOPC)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID PC 18:1/18:1 (DOPC)',
    'lipoid-pc-181181-dopc',
    'LIPOID PC 18:1/18:1 (DOPC) corresponde a 1,2-dioleoil-sn-glicero-3-fosfocolina. Trata-se de um fosfolipídio do tipo fosfatidilcolina zwitteriônica, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em formação de bicamadas e lipossomas com carga global próxima da neutralidade. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 556600. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Compartilhe o desafio da sua formulação no Formulário de Atendimento e avance com o suporte da equipe Lipid.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidilcolina zwitteriônica com cadeias insaturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidilcolinas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '556600',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pc-181181-dopc'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-181181-dopc'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilcolina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-181181-dopc'),
          (SELECT id FROM tags WHERE slug = 'pc'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-181181-dopc'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  40. Lipoid PC 16:0/18:1 (POPC)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PC 16:0/18:1 (POPC)',
    'lipoid-pc-160181-popc',
    'Lipoid PC 16:0/18:1 (POPC) corresponde a 1-palmitoil-2-oleoil-sn-glicero-3-fosfocolina. Trata-se de um fosfolipídio do tipo fosfatidilcolina zwitteriônica, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em formação de bicamadas e lipossomas com carga global próxima da neutralidade. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 556400. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Pronto para estudar esta solução? Preencha o Formulário de Atendimento e dê contexto ao seu desenvolvimento.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidilcolina zwitteriônica com cadeias insaturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidilcolinas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '556400',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pc-160181-popc'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-160181-popc'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilcolina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-160181-popc'),
          (SELECT id FROM tags WHERE slug = 'pc'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-160181-popc'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  41. Lipoid PG 14:0/14:0 (DMPG-Na)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PG 14:0/14:0 (DMPG-Na)',
    'lipoid-pg-140140-dmpg-na',
    'Lipoid PG 14:0/14:0 (DMPG-Na) corresponde a 1,2-dimiristoil-sn-glicero-3-fosfoglicerol, sal de sódio.

Trata-se de um fosfolipídio do tipo fosfatidilglicerol aniônico, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em introdução de carga negativa e ajuste da interação de partículas lipídicas com o meio. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 560200. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Leve este ingrediente para a próxima etapa: preencha o Formulário de Atendimento e apresente o objetivo da sua formulação.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidilglicerol aniônico com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidilglicerois'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '560200',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pg-140140-dmpg-na'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-140140-dmpg-na'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilglicerol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-140140-dmpg-na'),
          (SELECT id FROM tags WHERE slug = 'pg'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-140140-dmpg-na'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  42. Lipoid PG 16:0/16:0 (DPPG-Na)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PG 16:0/16:0 (DPPG-Na)',
    'lipoid-pg-160160-dppg-na',
    'Lipoid PG 16:0/16:0 (DPPG-Na) corresponde a 1,2-dipalmitoil-sn-glicero-3-fosfoglicerol, sal de sódio.

Trata-se de um fosfolipídio do tipo fosfatidilglicerol aniônico, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em introdução de carga negativa e ajuste da interação de partículas lipídicas com o meio. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 560300. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento para avançar.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidilglicerol aniônico com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidilglicerois'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '560300',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pg-160160-dppg-na'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-160160-dppg-na'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilglicerol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-160160-dppg-na'),
          (SELECT id FROM tags WHERE slug = 'pg'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-160160-dppg-na'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  43. Lipoid PG 18:0/18:0 (DSPG-Na)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PG 18:0/18:0 (DSPG-Na)',
    'lipoid-pg-180180-dspg-na',
    'Lipoid PG 18:0/18:0 (DSPG-Na) corresponde a 1,2-distearoil-sn-glicero-3-fosfoglicerol, sal de sódio.

Trata-se de um fosfolipídio do tipo fosfatidilglicerol aniônico, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em introdução de carga negativa e ajuste da interação de partículas lipídicas com o meio. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 560400. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e compartilhe os requisitos do projeto.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidilglicerol aniônico com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidilglicerois'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '560400',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pg-180180-dspg-na'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-180180-dspg-na'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilglicerol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-180180-dspg-na'),
          (SELECT id FROM tags WHERE slug = 'pg'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-180180-dspg-na'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  44. Lipoid PG 18:1/18:1 (DOPG-Na)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PG 18:1/18:1 (DOPG-Na)',
    'lipoid-pg-181181-dopg-na',
    'Lipoid PG 18:1/18:1 (DOPG-Na) corresponde a 1,2-dioleoil-sn-glicero-3-fosfoglicerol, sal de sódio.

Trata-se de um fosfolipídio do tipo fosfatidilglicerol aniônico, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em introdução de carga negativa e ajuste da interação de partículas lipídicas com o meio. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 564300. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Transforme a necessidade técnica em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidilglicerol aniônico com cadeias insaturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidilglicerois'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '564300',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pg-181181-dopg-na'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-181181-dopg-na'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilglicerol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-181181-dopg-na'),
          (SELECT id FROM tags WHERE slug = 'pg'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-181181-dopg-na'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  45. Lipoid PE 14:0/14:0 (DMPE)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PE 14:0/14:0 (DMPE)',
    'lipoid-pe-140140-dmpe',
    'Lipoid PE 14:0/14:0 (DMPE) corresponde a 1,2-dimiristoil-sn-glicero-3-fosfoetanolamina. Trata-se de um fosfolipídio do tipo fosfatidiletanolamina zwitteriônica de cabeça polar compacta, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em modulação de curvatura, fusogenicidade e organização de membranas.

O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 565200. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidiletanolamina zwitteriônica de cabeça polar compacta com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidiletanolaminas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '565200',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pe-140140-dmpe'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-140140-dmpe'),
          (SELECT id FROM tags WHERE slug = 'fosfatidiletanolamina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-140140-dmpe'),
          (SELECT id FROM tags WHERE slug = 'pe'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-140140-dmpe'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  46. Lipoid PE 16:0/16:0 (DPPE)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PE 16:0/16:0 (DPPE)',
    'lipoid-pe-160160-dppe',
    'Lipoid PE 16:0/16:0 (DPPE) corresponde a 1,2-dipalmitoil-sn-glicero-3-fosfoetanolamina. Trata-se de um fosfolipídio do tipo fosfatidiletanolamina zwitteriônica de cabeça polar compacta, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em modulação de curvatura, fusogenicidade e organização de membranas.

O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 565300. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o seu projeto.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidiletanolamina zwitteriônica de cabeça polar compacta com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidiletanolaminas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '565300',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pe-160160-dppe'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-160160-dppe'),
          (SELECT id FROM tags WHERE slug = 'fosfatidiletanolamina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-160160-dppe'),
          (SELECT id FROM tags WHERE slug = 'pe'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-160160-dppe'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  47. Lipoid PE 18:0/18:0 (DSPE)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PE 18:0/18:0 (DSPE)',
    'lipoid-pe-180180-dspe',
    'Lipoid PE 18:0/18:0 (DSPE) corresponde a 1,2-distearoil-sn-glicero-3-fosfoetanolamina. Trata-se de um fosfolipídio do tipo fosfatidiletanolamina zwitteriônica de cabeça polar compacta, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em modulação de curvatura, fusogenicidade e organização de membranas.

O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 565400. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Para discutir compatibilidade, grau e aplicação, preencha o Formulário de Atendimento.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidiletanolamina zwitteriônica de cabeça polar compacta com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidiletanolaminas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '565400',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-dspe'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-dspe'),
          (SELECT id FROM tags WHERE slug = 'fosfatidiletanolamina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-dspe'),
          (SELECT id FROM tags WHERE slug = 'pe'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-dspe'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  48. Lipoid PE 18:1/18:1 (DOPE)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PE 18:1/18:1 (DOPE)',
    'lipoid-pe-181181-dope',
    'Lipoid PE 18:1/18:1 (DOPE) corresponde a 1,2-dioleoil-sn-glicero-3-fosfoetanolamina. Trata-se de um fosfolipídio do tipo fosfatidiletanolamina zwitteriônica de cabeça polar compacta, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em modulação de curvatura, fusogenicidade e organização de membranas.

O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 565600. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Aproxime este ingrediente da sua formulação. Envie o Formulário de Atendimento para iniciar a análise técnica.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidiletanolamina zwitteriônica de cabeça polar compacta com cadeias insaturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidiletanolaminas'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '565600',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pe-181181-dope'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-181181-dope'),
          (SELECT id FROM tags WHERE slug = 'fosfatidiletanolamina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-181181-dope'),
          (SELECT id FROM tags WHERE slug = 'pe'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-181181-dope'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-sintetico'))
  ON CONFLICT DO NOTHING;

  --  49. Lipoid PA 16:0/16:0 (DPPA-Na)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PA 16:0/16:0 (DPPA-Na)',
    'lipoid-pa-160160-dppa-na',
    'Lipoid PA 16:0/16:0 (DPPA-Na) corresponde a 1,2-dipalmitoil-sn-glicero-3-fosfato, sal monossódico.

Trata-se de um fosfolipídio do tipo ácido fosfatídico aniônico, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em modulação de carga, composição e comportamento de membranas definidas. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 566300. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Compartilhe o desafio da sua formulação no Formulário de Atendimento e avance com o suporte da equipe Lipid.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Ácido fosfatídico aniônico com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'acidos-fosfatidicos'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '566300',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pa-160160-dppa-na'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pa-160160-dppa-na'),
          (SELECT id FROM tags WHERE slug = 'acido-fosfatidico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pa-160160-dppa-na'),
          (SELECT id FROM tags WHERE slug = 'pa'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pa-160160-dppa-na'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  50. Lipoid PA 18:0/18:0 (DSPA-Na)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PA 18:0/18:0 (DSPA-Na)',
    'lipoid-pa-180180-dspa-na',
    'Lipoid PA 18:0/18:0 (DSPA-Na) corresponde a 1,2-distearoil-sn-glicero-3-fosfato, sal de sódio. Trata-se de um fosfolipídio do tipo ácido fosfatídico aniônico, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em modulação de carga, composição e comportamento de membranas definidas. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 566400. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Pronto para estudar esta solução? Preencha o Formulário de Atendimento e dê contexto ao seu desenvolvimento.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Ácido fosfatídico aniônico com cadeias saturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'acidos-fosfatidicos'),
    true,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    name          = EXCLUDED.name,
    description   = EXCLUDED.description,
    excerpt       = EXCLUDED.excerpt,
    cta           = EXCLUDED.cta,
    inci          = COALESCE(EXCLUDED.inci, ingredients.inci),
    "partnerId"   = EXCLUDED."partnerId",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '566400',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pa-180180-dspa-na'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pa-180180-dspa-na'),
          (SELECT id FROM tags WHERE slug = 'acido-fosfatidico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pa-180180-dspa-na'),
          (SELECT id FROM tags WHERE slug = 'pa'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pa-180180-dspa-na'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

END $$;

COMMIT;
