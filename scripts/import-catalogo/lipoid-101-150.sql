-- Catálogo de ingredientes — LIPOID
-- GERADO por scripts/import-catalogo/importar_catalogo.py — não editar à mão.
-- Fontes: Orientação para Cadastrar no Site.xlsx + LIPOID_Produtos_101-150.pdf
-- 32 produtos · 11 categorias · 55 tags · 58 códigos comerciais
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
  VALUES (gen_random_uuid()::text, 'Ativos botânicos', 'ativos-botanicos', 0, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos de proteção cutânea', 'ativos-de-protecao-cutanea', 1, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos em sistema Herbasome', 'ativos-em-sistema-herbasome', 2, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Complexos esfoliantes', 'complexos-esfoliantes', 3, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Esfoliantes e partículas cosméticas', 'esfoliantes-e-particulas-cosmeticas', 4, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extratos botânicos', 'extratos-botanicos', 5, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extratos botânicos secos', 'extratos-botanicos-secos', 6, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Leites vegetais', 'leites-vegetais', 7, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteínas e peptídeos cosméticos', 'proteinas-e-peptideos-cosmeticos', 8, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vinagres botânicos', 'vinagres-botanicos', 9, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vitaminas e carotenoides', 'vitaminas-e-carotenoides', 10, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();

  -- ---------- tags
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Aloe (Barbadensis)', 'aloe-barbadensis', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Aloe (Barbadensis)/ Almond Oil', 'aloe-barbadensis-almond-oil', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Aloe organic', 'aloe-organic', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Amaretine', 'amaretine', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Antioxidantes', 'antioxidantes', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Apple', 'apple', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Apple Water', 'apple-water', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Arnica Montana', 'arnica-montana', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativo botânico', 'ativo-botanico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativo cosmético', 'ativo-cosmetico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'BakuLipid', 'bakulipid', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Balm Mint', 'balm-mint', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Base IPM', 'base-ipm', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Base glicerinada', 'base-glicerinada', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Base propilenoglicol', 'base-propilenoglicol', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Blossom Honey', 'blossom-honey', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Carotenoides', 'carotenoides', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Carotolino', 'carotolino', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Carrot Water', 'carrot-water', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cherry Blossom', 'cherry-blossom', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Coconut Water', 'coconut-water', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Colágeno', 'colageno', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Complexo cosmético', 'complexo-cosmetico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Conforto cutâneo', 'conforto-cutaneo', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cosmepearl® N', 'cosmepearl-n', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cotton', 'cotton', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Dispersão vegetal', 'dispersao-vegetal', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Esfoliação', 'esfoliacao', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extrato botânico', 'extrato-botanico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extrato seco', 'extrato-seco', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fitocolágeno', 'fitocolageno', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ginkgo', 'ginkgo', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Green Tea', 'green-tea', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Herbamilk', 'herbamilk', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Herbasec', 'herbasec', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Herbasol', 'herbasol', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Herbasome', 'herbasome', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Immortelle Oil', 'immortelle-oil', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Jackfruit', 'jackfruit', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lime Tree Blossom', 'lime-tree-blossom', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Linha Eco', 'linha-eco', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Mate', 'mate', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Mulberry', 'mulberry', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Partículas naturais', 'particulas-naturais', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Peeling', 'peeling', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Peptídeos', 'peptideos', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteção cutânea', 'protecao-cutanea', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteínas', 'proteinas', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Rice', 'rice', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sebostat MPE', 'sebostat-mpe', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vanilla/ Almond Oil', 'vanilla-almond-oil', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vinagre botânico', 'vinagre-botanico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Violet', 'violet', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vitaminas', 'vitaminas', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Água vegetal', 'agua-vegetal', now())
  ON CONFLICT (slug) DO NOTHING;

  -- ---------- produtos

  --   1. Mulberry Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Mulberry Pro',
    'mulberry-pro',
    'Mulberry Pro é um extrato aquoso-glicerinado de folhas de amoreira-negra, pertencente à linha Herbasol® Pro. A apresentação reúne a matéria-prima botânica em um veículo polar e foi desenvolvida com eficácia avaliada para aplicações de cuidado calmante.

Por ser um ingrediente solúvel em água, pode ser estudado em séruns, géis, emulsões e produtos de limpeza ou cuidado de pele sensível. A incorporação deve considerar temperatura moderada, pH, sistema conservante e estabilidade de cor e odor.',
    'Extrato substanciado de folhas de amoreira para conforto e equilíbrio da pele',
    'Apresente sua formulação no Formulário de Atendimento e avance com o suporte técnico da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410158.25000',
          (SELECT id FROM ingredients WHERE slug = 'mulberry-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410158.5000',
          (SELECT id FROM ingredients WHERE slug = 'mulberry-pro'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410158.10000',
          (SELECT id FROM ingredients WHERE slug = 'mulberry-pro'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mulberry-pro'),
          (SELECT id FROM tags WHERE slug = 'mulberry'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mulberry-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --   2. Jackfruit Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Jackfruit Pro',
    'jackfruit-pro',
    'Jackfruit Pro é um extrato aquoso-glicerinado de fruto de jaca orgânica, integrante da linha Herbasol® Pro.

O ingrediente foi desenvolvido para formulações que exploram o fornecimento de nutrientes e o suporte ao metabolismo energético da pele.

A forma hidrossolúvel facilita a avaliação em séruns, géis, emulsões e produtos de cuidado diário. O desempenho deve ser validado no produto final, com atenção à compatibilidade com eletrólitos, conservantes, fragrância e às condições térmicas do processo.',
    'Extrato substanciado de jaca para suporte à nutrição e à energia celular',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410168.10000',
          (SELECT id FROM ingredients WHERE slug = 'jackfruit-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410168.25000',
          (SELECT id FROM ingredients WHERE slug = 'jackfruit-pro'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'jackfruit-pro'),
          (SELECT id FROM tags WHERE slug = 'jackfruit'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'jackfruit-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --   3. HerbaGlow® NRG
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'HerbaGlow® NRG',
    'herbaglow-nrg',
    'HerbaGlow® NRG combina extratos de botões de alcaparra, folhas de amoreira-negra e raiz de rhodiola em uma base de propanodiol, sem conservante adicionado. É um ativo hidrossolúvel desenvolvido para formulações orientadas à energia e à radiância da pele.

Pode ser considerado em séruns, essências, géis e emulsões de cuidado facial. Para preservar o perfil do complexo, a adição deve ser planejada em etapa de baixa temperatura, seguida de avaliação de pH, cor, odor e estabilidade no sistema completo.',
    'Complexo botânico para energia, luminosidade e aparência revitalizada',
    'Leve este ingrediente para a próxima etapa: compartilhe o objetivo do projeto no Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-de-protecao-cutanea'),
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
  VALUES (gen_random_uuid()::text, '410174.00.2',
          (SELECT id FROM ingredients WHERE slug = 'herbaglow-nrg'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410174.00.3',
          (SELECT id FROM ingredients WHERE slug = 'herbaglow-nrg'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'herbaglow-nrg'),
          (SELECT id FROM tags WHERE slug = 'protecao-cutanea'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'herbaglow-nrg'),
          (SELECT id FROM tags WHERE slug = 'ativo-cosmetico'))
  ON CONFLICT DO NOTHING;

  --   4. Aloe organic Herbasol® Extract PG unpreserved
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Aloe organic Herbasol® Extract PG unpreserved',
    'aloe-organic-herbasol-extract-pg-unpreserved',
    'Aloe organic Herbasol® Extract PG unpreserved é um extrato botânico líquido de aloe vera em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de aloe vera em propilenoglicol para formulações de fase aquosa',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e envie os requisitos técnicos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410179.10000',
          (SELECT id FROM ingredients WHERE slug = 'aloe-organic-herbasol-extract-pg-unpreserved'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410179.25000',
          (SELECT id FROM ingredients WHERE slug = 'aloe-organic-herbasol-extract-pg-unpreserved'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-organic-herbasol-extract-pg-unpreserved'),
          (SELECT id FROM tags WHERE slug = 'aloe-organic'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-organic-herbasol-extract-pg-unpreserved'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-organic-herbasol-extract-pg-unpreserved'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-organic-herbasol-extract-pg-unpreserved'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --   5. PhytoCollagen
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'PhytoCollagen',
    'phytocollagen',
    'PhytoCollagen é uma preparação aquoso-glicerinada de biopolímeros obtidos da goma de acácia orgânica.

O ingrediente foi concebido como alternativa vegetal a fontes animais ou sintéticas de colágeno, com aplicação em hidratação, firmeza e condicionamento.

A apresentação hidrossolúvel permite o uso em séruns, géis, máscaras, emulsões e produtos capilares. A formulação deve considerar interação com polímeros, eletrólitos e agentes catiônicos, além da definição de pH e etapa de incorporação conforme a ficha técnica.',
    'Biopolímeros de acácia como alternativa vegetal ao colágeno',
    'Transforme a necessidade da formulação em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'proteinas-e-peptideos-cosmeticos'),
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
  VALUES (gen_random_uuid()::text, '410290.00.2',
          (SELECT id FROM ingredients WHERE slug = 'phytocollagen'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytocollagen'),
          (SELECT id FROM tags WHERE slug = 'proteinas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytocollagen'),
          (SELECT id FROM tags WHERE slug = 'peptideos'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytocollagen'),
          (SELECT id FROM tags WHERE slug = 'colageno'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytocollagen'),
          (SELECT id FROM tags WHERE slug = 'fitocolageno'))
  ON CONFLICT DO NOTHING;

  --   6. Aloe (Barbadensis)/ Almond Oil Herbamilk® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Aloe (Barbadensis)/ Almond Oil Herbamilk® Eco',
    'aloe-barbadensis-almond-oil-herbamilk-eco',
    'Aloe (Barbadensis)/ Almond Oil Herbamilk® Eco é um leite cosmético vegetal que reúne uma preparação aquosa de aloe vera orgânica e óleo de amêndoas em uma combinação botânico-fosfolipídica. A matriz é fornecida em forma hidrossolúvel e sem conservante adicionado.

Pode ser avaliado em loções, séruns, cremes, produtos pós-limpeza e formulações capilares. A incorporação deve preservar a dispersão do sistema, evitando temperatura e cisalhamento excessivos, e deve ser acompanhada por testes de estabilidade e compatibilidade.',
    'Leite cosmético vegetal de aloe vera e óleo de amêndoas',
    'Compartilhe o desafio técnico no Formulário de Atendimento e avance com a orientação da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'leites-vegetais'),
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
  VALUES (gen_random_uuid()::text, '410298.10000',
          (SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-almond-oil-herbamilk-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410298.25000',
          (SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-almond-oil-herbamilk-eco'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'aloe-barbadensis-almond-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'herbamilk'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'dispersao-vegetal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --   7. Amaretine
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Amaretine',
    'amaretine',
    'Amaretine combina andrographolide de folhas de Andrographis paniculata e ácido glicirretínico derivado de alcaçuz em um sistema carreador lipossomal. A preparação é hidrossolúvel, baseada em propilenoglicol e direcionada ao conforto de peles sensíveis.

O ativo pode ser estudado em séruns, géis e emulsões com propostas de hidratação, suporte de barreira e ação calmante. A estrutura lipossomal recomenda incorporação em etapa de baixa temperatura, com controle de pH, eletrólitos e intensidade de homogeneização.',
    'Sinergia lipossomal de compostos amargos e doces para pele sensível',
    'Inclua este ingrediente no seu estudo: preencha o Formulário de Atendimento e apresente o contexto de uso.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410318.5000',
          (SELECT id FROM ingredients WHERE slug = 'amaretine'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410318.10000',
          (SELECT id FROM ingredients WHERE slug = 'amaretine'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410318.25000',
          (SELECT id FROM ingredients WHERE slug = 'amaretine'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'amaretine'),
          (SELECT id FROM tags WHERE slug = 'amaretine'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'amaretine'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --   8. BakuLipid
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'BakuLipid',
    'bakulipid',
    'BakuLipid é uma combinação de bakuchiol de origem vegetal e fosfolipídios insaturados em triglicerídeos de cadeia média. A preparação é lipossolúvel e foi desenvolvida para ampliar a entrega cutânea do bakuchiol em formulações voltadas à aparência jovem e ao controle de oleosidade.

Deve ser incorporado na fase oleosa ou em uma etapa compatível com ingredientes lipofílicos. O desenvolvimento requer avaliação de solubilidade, oxidação, embalagem, compatibilidade com filtros e antioxidantes e estabilidade da emulsão.',
    'Bakuchiol com fosfolipídios para sistemas cosméticos de fase oleosa',
    'Dê contexto ao seu desenvolvimento no Formulário de Atendimento e receba o direcionamento da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410361.5000',
          (SELECT id FROM ingredients WHERE slug = 'bakulipid'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410361.10000',
          (SELECT id FROM ingredients WHERE slug = 'bakulipid'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410361.25000',
          (SELECT id FROM ingredients WHERE slug = 'bakulipid'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bakulipid'),
          (SELECT id FROM tags WHERE slug = 'bakulipid'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bakulipid'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --   9. Immortelle Oil Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Immortelle Oil Pro',
    'immortelle-oil-pro',
    'Immortelle Oil Pro é um extrato de flores orgânicas de immortelle em triglicerídeos de cadeia média.

Pertence à linha Herbasol® Pro, apresenta caráter lipossolúvel e foi desenvolvido com eficácia avaliada para firmeza e aplicações de cuidado corporal.

A apresentação oleosa permite incorporação em emulsões, óleos, balms e sistemas anidros. O formulador deve verificar compatibilidade com a fase lipídica, resistência à oxidação, sensorial, embalagem e estabilidade sob as condições de processo.',
    'Extrato oleoso substanciado de immortelle para firmeza e contorno',
    'Avalie esta solução com apoio técnico: preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410370.5000',
          (SELECT id FROM ingredients WHERE slug = 'immortelle-oil-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410370.10000',
          (SELECT id FROM ingredients WHERE slug = 'immortelle-oil-pro'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410370.25000',
          (SELECT id FROM ingredients WHERE slug = 'immortelle-oil-pro'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'immortelle-oil-pro'),
          (SELECT id FROM tags WHERE slug = 'immortelle-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'immortelle-oil-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  10. Rice - Herbasol® Plant Water
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Rice - Herbasol® Plant Water',
    'rice-herbasol-plant-water',
    'Rice - Herbasol® Plant Water é uma água vegetal obtida da matéria-prima indicada no nome comercial. A apresentação fornece uma base aquosa botânica para formulações em que leveza, transparência e identidade vegetal são requisitos do projeto.

Pode ser estudada em tônicos, essências, séruns, géis, sprays e emulsões. A formulação deve controlar preservação, pH, cor, odor, eletrólitos e compatibilidade com os demais componentes.',
    'Água vegetal de arroz para formulações cosméticas leves',
    'Comece a análise deste ingrediente pelo Formulário de Atendimento e detalhe a aplicação pretendida.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410430.5000',
          (SELECT id FROM ingredients WHERE slug = 'rice-herbasol-plant-water'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410430.10000',
          (SELECT id FROM ingredients WHERE slug = 'rice-herbasol-plant-water'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410430.25000',
          (SELECT id FROM ingredients WHERE slug = 'rice-herbasol-plant-water'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-herbasol-plant-water'),
          (SELECT id FROM tags WHERE slug = 'rice'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-herbasol-plant-water'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-herbasol-plant-water'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-herbasol-plant-water'),
          (SELECT id FROM tags WHERE slug = 'agua-vegetal'))
  ON CONFLICT DO NOTHING;

  --  11. Cosmepearl® N
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cosmepearl® N',
    'cosmepearl-n',
    'Cosmepearl® N é um pó fino de pérola recoberto com óleo de jojoba. Trata-se de um ingrediente não solúvel, destinado a formulações em que partículas minerais naturais contribuam para aparência, textura e posicionamento sensorial.

A utilização exige dispersão homogênea e controle de sedimentação, abrasividade e compatibilidade com o sistema reológico. Pode ser estudado em produtos de pele, higiene oral e formulações de enxágue, sempre com validação do tamanho de partícula e do desempenho final.',
    'Pó fino de pérola revestido com óleo de jojoba',
    'Apresente sua formulação no Formulário de Atendimento e avance com o suporte técnico da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'esfoliantes-e-particulas-cosmeticas'),
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
  VALUES (gen_random_uuid()::text, '400842.00.2',
          (SELECT id FROM ingredients WHERE slug = 'cosmepearl-n'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cosmepearl-n'),
          (SELECT id FROM tags WHERE slug = 'esfoliacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cosmepearl-n'),
          (SELECT id FROM tags WHERE slug = 'particulas-naturais'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cosmepearl-n'),
          (SELECT id FROM tags WHERE slug = 'cosmepearl-n'))
  ON CONFLICT DO NOTHING;

  --  12. Carotolino
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Carotolino',
    'carotolino',
    'Carotolino é uma composição estabilizada de extrato de raiz de cenoura, óleo de semente de cenoura e beta-caroteno em óleo de canola. É um ativo lipossolúvel, sem conservante adicionado, desenvolvido para aplicações de luminosidade e proteção frente à luz.

Deve ser trabalhado na fase oleosa de emulsões ou em sistemas anidros, com atenção à exposição ao oxigênio, luz e calor. A seleção de antioxidantes, embalagem e condições de homogeneização é determinante para a estabilidade da cor e do ativo.',
    'Complexo oleoso de cenoura e beta-caroteno para luminosidade e proteção',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'vitaminas-e-carotenoides'),
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
  VALUES (gen_random_uuid()::text, '150404.5000',
          (SELECT id FROM ingredients WHERE slug = 'carotolino'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '150404.10000',
          (SELECT id FROM ingredients WHERE slug = 'carotolino'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '150404.25000',
          (SELECT id FROM ingredients WHERE slug = 'carotolino'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'carotolino'),
          (SELECT id FROM tags WHERE slug = 'vitaminas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'carotolino'),
          (SELECT id FROM tags WHERE slug = 'antioxidantes'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'carotolino'),
          (SELECT id FROM tags WHERE slug = 'carotenoides'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'carotolino'),
          (SELECT id FROM tags WHERE slug = 'carotolino'))
  ON CONFLICT DO NOTHING;

  --  13. Anti-Irritant Complex
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Anti-Irritant Complex',
    'anti-irritant-complex',
    'Anti-Irritant Complex reúne extrato de flores de camomila orgânica em propilenoglicol, bisabolol e pantenol.

É um ativo hidrossolúvel e sem conservante adicionado, formulado para aplicações de pele sensível, irritada ou sujeita a desconforto.

Pode ser avaliado em séruns, géis, loções, produtos pós-procedimento cosmético e cuidados do couro cabeludo. Recomenda-se incorporação em etapa de baixa temperatura, com controle de pH, compatibilidade com conservantes e verificação da estabilidade global.',
    'Complexo concentrado de camomila, bisabolol e pantenol para conforto cutâneo',
    'Leve este ingrediente para a próxima etapa: compartilhe o objetivo do projeto no Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-de-protecao-cutanea'),
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
  VALUES (gen_random_uuid()::text, '192602.10000',
          (SELECT id FROM ingredients WHERE slug = 'anti-irritant-complex'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '192602.25000',
          (SELECT id FROM ingredients WHERE slug = 'anti-irritant-complex'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'anti-irritant-complex'),
          (SELECT id FROM tags WHERE slug = 'protecao-cutanea'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'anti-irritant-complex'),
          (SELECT id FROM tags WHERE slug = 'ativo-cosmetico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'anti-irritant-complex'),
          (SELECT id FROM tags WHERE slug = 'conforto-cutaneo'))
  ON CONFLICT DO NOTHING;

  --  14. Aloe (Barbadensis) Herbasol® Extract IPM
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Aloe (Barbadensis) Herbasol® Extract IPM',
    'aloe-barbadensis-herbasol-extract-ipm',
    'Aloe (Barbadensis) Herbasol® Extract IPM é um extrato botânico apresentado em miristato de isopropila, um veículo lipofílico. A forma comercial é indicada para projetos em que os constituintes extraídos e o sistema de incorporação devem permanecer compatíveis com a fase oleosa.

Pode ser trabalhado em emulsões, óleos, balms e produtos anidros. O desenvolvimento deve verificar solubilidade, oxidação, sensorial, compatibilidade com filtros e fragrâncias e estabilidade da emulsão.',
    'Extrato lipofílico de aloe vera em IPM para fases oleosas',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '201100.10000',
          (SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-herbasol-extract-ipm'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '201100.25000',
          (SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-herbasol-extract-ipm'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'aloe-barbadensis'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aloe-barbadensis-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'base-ipm'))
  ON CONFLICT DO NOTHING;

  --  15. Arnica Montana Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Arnica Montana Herbasol® Extract PG (PF)',
    'arnica-montana-herbasol-extract-pg-pf',
    'Arnica Montana Herbasol® Extract PG (PF) é um extrato botânico líquido de arnica-montana em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de arnica-montana em propilenoglicol para formulações de fase aquosa',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e envie os requisitos técnicos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '201403.100000',
          (SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'arnica-montana'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --  16. Ginkgo Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Ginkgo Herbasol® Extract PG (PF)',
    'ginkgo-herbasol-extract-pg-pf',
    'Ginkgo Herbasol® Extract PG (PF) é um extrato botânico líquido de ginkgo em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de ginkgo em propilenoglicol para formulações de fase aquosa',
    'Para discutir compatibilidade, processo e documentação, envie sua demanda pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '207135.25000',
          (SELECT id FROM ingredients WHERE slug = 'ginkgo-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ginkgo-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'ginkgo'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ginkgo-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ginkgo-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ginkgo-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --  17. Balm Mint Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Balm Mint Herbasol® Extract PG (PF)',
    'balm-mint-herbasol-extract-pg-pf',
    'Balm Mint Herbasol® Extract PG (PF) é um extrato botânico líquido de melissa em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de melissa em propilenoglicol para formulações de fase aquosa',
    'Comece a análise deste ingrediente pelo Formulário de Atendimento e detalhe a aplicação pretendida.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '213300.10000',
          (SELECT id FROM ingredients WHERE slug = 'balm-mint-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '213300.25000',
          (SELECT id FROM ingredients WHERE slug = 'balm-mint-herbasol-extract-pg-pf'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'balm-mint-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'balm-mint'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'balm-mint-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'balm-mint-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'balm-mint-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --  18. Sebostat MPE Herbasec®
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Sebostat MPE Herbasec®',
    'sebostat-mpe-herbasec',
    'Sebostat MPE Herbasec® é um extrato botânico seco da linha Herbasec®. O formato em pó concentra a matéria-prima vegetal e permite seu uso em formulações nas quais a forma sólida, a dispersibilidade e o controle de água são relevantes.

Pode ser pré-disperso em água, glicerina ou outro veículo compatível, conforme a ficha técnica. O processo deve controlar formação de grumos, sedimentação, cor, odor e impacto sobre a viscosidade e a preservação.',
    'Extrato botânico seco de sebostat mpe para dispersões cosméticas',
    'Leve este ingrediente para a próxima etapa: compartilhe o objetivo do projeto no Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos-secos'),
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
  VALUES (gen_random_uuid()::text, '219362.09.2',
          (SELECT id FROM ingredients WHERE slug = 'sebostat-mpe-herbasec'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sebostat-mpe-herbasec'),
          (SELECT id FROM tags WHERE slug = 'sebostat-mpe'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sebostat-mpe-herbasec'),
          (SELECT id FROM tags WHERE slug = 'herbasec'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sebostat-mpe-herbasec'),
          (SELECT id FROM tags WHERE slug = 'extrato-seco'))
  ON CONFLICT DO NOTHING;

  --  19. Green Tea Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Green Tea Herbasol® Extract PG (PF)',
    'green-tea-herbasol-extract-pg-pf',
    'Green Tea Herbasol® Extract PG (PF) é um extrato botânico líquido de chá verde em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de chá verde em propilenoglicol para formulações de fase aquosa',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '220150.10000',
          (SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '220150.25000',
          (SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-extract-pg-pf'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'green-tea'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --  20. Violet Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Violet Herbasol® Extract PG (PF)',
    'violet-herbasol-extract-pg-pf',
    'Violet Herbasol® Extract PG (PF) é um extrato botânico líquido de violeta em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de violeta em propilenoglicol para formulações de fase aquosa',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e envie os requisitos técnicos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '222100.5000',
          (SELECT id FROM ingredients WHERE slug = 'violet-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'violet-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'violet'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'violet-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'violet-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'violet-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --  21. Apple Herbasol Vinegar Extract PF
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Apple Herbasol Vinegar Extract PF',
    'apple-herbasol-vinegar-extract-pf',
    'Apple Herbasol Vinegar Extract PF é um extrato botânico líquido obtido em uma matriz de vinagre. Além dos constituintes da matéria-prima indicada no nome, o sistema carrega a acidez e os componentes de fermentação característicos do veículo.

Pode ser avaliado em produtos de limpeza, tônicos, shampoos e formulações esfoliantes. O pH, a capacidade tamponante, a compatibilidade com tensoativos, a viscosidade e a preservação devem ser controlados no produto final.',
    'Extrato de maçã em matriz de vinagre para sistemas com pH controlado',
    'Transforme a necessidade da formulação em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'vinagres-botanicos'),
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
  VALUES (gen_random_uuid()::text, '400345.148.2',
          (SELECT id FROM ingredients WHERE slug = 'apple-herbasol-vinegar-extract-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'apple-herbasol-vinegar-extract-pf'),
          (SELECT id FROM tags WHERE slug = 'apple'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'apple-herbasol-vinegar-extract-pf'),
          (SELECT id FROM tags WHERE slug = 'vinagre-botanico'))
  ON CONFLICT DO NOTHING;

  --  22. Cotton Herbasol Extract IPM
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cotton Herbasol Extract IPM',
    'cotton-herbasol-extract-ipm',
    'Cotton Herbasol Extract IPM é um extrato botânico apresentado em miristato de isopropila, um veículo lipofílico. A forma comercial é indicada para projetos em que os constituintes extraídos e o sistema de incorporação devem permanecer compatíveis com a fase oleosa.

Pode ser trabalhado em emulsões, óleos, balms e produtos anidros. O desenvolvimento deve verificar solubilidade, oxidação, sensorial, compatibilidade com filtros e fragrâncias e estabilidade da emulsão.',
    'Extrato lipofílico de algodão em IPM para fases oleosas',
    'Compartilhe o desafio técnico no Formulário de Atendimento e avance com a orientação da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '40051925000',
          (SELECT id FROM ingredients WHERE slug = 'cotton-herbasol-extract-ipm'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'cotton'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'base-ipm'))
  ON CONFLICT DO NOTHING;

  --  23. Cherry Blossom Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cherry Blossom Herbasol® Extract Glycerine SB',
    'cherry-blossom-herbasol-extract-glycerine-sb',
    'Cherry Blossom Herbasol® Extract Glycerine SB é um extrato botânico líquido de flor de cerejeira, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria- prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de flor de cerejeira para sistemas cosméticos aquosos',
    'Inclua este ingrediente no seu estudo: preencha o Formulário de Atendimento e apresente o contexto de uso.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '400447.5000',
          (SELECT id FROM ingredients WHERE slug = 'cherry-blossom-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cherry-blossom-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'cherry-blossom'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cherry-blossom-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cherry-blossom-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cherry-blossom-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --  24. Apple Water Herbasome
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Apple Water Herbasome',
    'apple-water-herbasome',
    'Apple Water Herbasome é uma preparação da linha Herbasome, na qual o componente indicado no nome comercial é associado a fosfolipídios em uma forma dispersível em água. Essa arquitetura permite trabalhar o ingrediente em formulações aquosas com uma entrega diferente da matéria-prima livre.

Pode ser avaliado em séruns, géis, emulsões e produtos capilares. Para preservar o sistema, a adição deve ocorrer em condições moderadas de temperatura e cisalhamento, com controle de pH, eletrólitos e estabilidade.',
    'Sistema lipossomal de maçã para formulações aquosas',
    'Comece a análise deste ingrediente pelo Formulário de Atendimento e detalhe a aplicação pretendida.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-em-sistema-herbasome'),
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
  VALUES (gen_random_uuid()::text, '401016.90.2',
          (SELECT id FROM ingredients WHERE slug = 'apple-water-herbasome'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'apple-water-herbasome'),
          (SELECT id FROM tags WHERE slug = 'apple-water'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'apple-water-herbasome'),
          (SELECT id FROM tags WHERE slug = 'herbasome'))
  ON CONFLICT DO NOTHING;

  --  25. Carrot Water Herbasome
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Carrot Water Herbasome',
    'carrot-water-herbasome',
    'Carrot Water Herbasome é uma preparação da linha Herbasome, na qual o componente indicado no nome comercial é associado a fosfolipídios em uma forma dispersível em água. Essa arquitetura permite trabalhar o ingrediente em formulações aquosas com uma entrega diferente da matéria-prima livre.

Pode ser avaliado em séruns, géis, emulsões e produtos capilares. Para preservar o sistema, a adição deve ocorrer em condições moderadas de temperatura e cisalhamento, com controle de pH, eletrólitos e estabilidade.',
    'Sistema lipossomal de cenoura para formulações aquosas',
    'Apresente sua formulação no Formulário de Atendimento e avance com o suporte técnico da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-em-sistema-herbasome'),
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
  VALUES (gen_random_uuid()::text, '401018.90.2',
          (SELECT id FROM ingredients WHERE slug = 'carrot-water-herbasome'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'carrot-water-herbasome'),
          (SELECT id FROM tags WHERE slug = 'carrot-water'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'carrot-water-herbasome'),
          (SELECT id FROM tags WHERE slug = 'herbasome'))
  ON CONFLICT DO NOTHING;

  --  26. Vanilla/ Almond Oil Herbamilk® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Vanilla/ Almond Oil Herbamilk® Eco',
    'vanilla-almond-oil-herbamilk-eco',
    'Vanilla/ Almond Oil Herbamilk® Eco é uma preparação cosmética do tipo Herbamilk® Eco, que combina componentes botânicos e lipídicos em uma matriz dispersível em água. A apresentação foi desenvolvida para levar óleos ou matérias-primas vegetais a formulações leves sem depender de uma fase oleosa convencional ampla.

Pode ser estudado em loções, séruns, géis-creme, máscaras e produtos capilares. A incorporação deve preservar a dispersão, com controle de temperatura, cisalhamento, eletrólitos e compatibilidade com tensoativos e conservantes.',
    'Leite cosmético vegetal de baunilha e óleo de amêndoas com suporte fosfolipídico',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'leites-vegetais'),
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
  VALUES (gen_random_uuid()::text, '401037.10000',
          (SELECT id FROM ingredients WHERE slug = 'vanilla-almond-oil-herbamilk-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '401037.25000',
          (SELECT id FROM ingredients WHERE slug = 'vanilla-almond-oil-herbamilk-eco'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vanilla-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'vanilla-almond-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vanilla-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'herbamilk'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vanilla-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'dispersao-vegetal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vanilla-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  27. Coconut Water Herbasome
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Coconut Water Herbasome',
    'coconut-water-herbasome',
    'Coconut Water Herbasome é uma preparação da linha Herbasome, na qual o componente indicado no nome comercial é associado a fosfolipídios em uma forma dispersível em água. Essa arquitetura permite trabalhar o ingrediente em formulações aquosas com uma entrega diferente da matéria-prima livre.

Pode ser avaliado em séruns, géis, emulsões e produtos capilares. Para preservar o sistema, a adição deve ocorrer em condições moderadas de temperatura e cisalhamento, com controle de pH, eletrólitos e estabilidade.',
    'Sistema lipossomal de coconut para formulações aquosas',
    'Leve este ingrediente para a próxima etapa: compartilhe o objetivo do projeto no Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-em-sistema-herbasome'),
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
  VALUES (gen_random_uuid()::text, '401019.10000',
          (SELECT id FROM ingredients WHERE slug = 'coconut-water-herbasome'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '401019.25000',
          (SELECT id FROM ingredients WHERE slug = 'coconut-water-herbasome'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'coconut-water-herbasome'),
          (SELECT id FROM tags WHERE slug = 'coconut-water'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'coconut-water-herbasome'),
          (SELECT id FROM tags WHERE slug = 'herbasome'))
  ON CONFLICT DO NOTHING;

  --  28. Arnica Montana Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Arnica Montana Herbasol® Extract Glycerine SB',
    'arnica-montana-herbasol-extract-glycerine-sb',
    'Arnica Montana Herbasol® Extract Glycerine SB é um extrato botânico líquido de arnica-montana, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria- prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de arnica-montana para sistemas cosméticos aquosos',
    'Transforme a necessidade da formulação em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '400205.116.2',
          (SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'arnica-montana'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --  29. Lime Tree Blossom Herbasol® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lime Tree Blossom Herbasol® Eco',
    'lime-tree-blossom-herbasol-eco',
    'Lime Tree Blossom Herbasol® Eco integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de flor de tília para formulações de posicionamento natural',
    'Inclua este ingrediente no seu estudo: preencha o Formulário de Atendimento e apresente o contexto de uso.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410063.10000',
          (SELECT id FROM ingredients WHERE slug = 'lime-tree-blossom-herbasol-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410063.25000',
          (SELECT id FROM ingredients WHERE slug = 'lime-tree-blossom-herbasol-eco'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lime-tree-blossom-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'lime-tree-blossom'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lime-tree-blossom-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lime-tree-blossom-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lime-tree-blossom-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  30. Mate Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Mate Pro',
    'mate-pro',
    'Mate Pro é um extrato aquoso-glicerinado de folhas de mate, integrante da linha Herbasol® Pro. A matéria- prima botânica é disponibilizada em veículo polar para formulações que buscam um ingrediente vegetal com eficácia avaliada e identidade composicional definida.

A apresentação hidrossolúvel permite estudos em séruns, géis, emulsões e produtos capilares. A etapa de adição deve seguir a ficha técnica, com avaliação de pH, cor, odor, sistema conservante e estabilidade no produto acabado.',
    'Extrato substanciado de folhas de mate em base aquoso-glicerinada',
    'Para discutir compatibilidade, processo e documentação, envie sua demanda pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410157.5000',
          (SELECT id FROM ingredients WHERE slug = 'mate-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410157.10000',
          (SELECT id FROM ingredients WHERE slug = 'mate-pro'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410157.25000',
          (SELECT id FROM ingredients WHERE slug = 'mate-pro'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mate-pro'),
          (SELECT id FROM tags WHERE slug = 'mate'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mate-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  31. Blossom Honey Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Blossom Honey Pro',
    'blossom-honey-pro',
    'Blossom Honey Pro é um extrato aquoso-glicerinado de mel orgânico de flores de acácia, sem conservante adicionado. Pertence à linha Herbasol® Pro e foi desenvolvido para aplicações relacionadas à retenção de água, nutrição e vitalidade da pele.

Pode ser estudado em séruns, géis, máscaras, emulsões e produtos capilares. Por conter componentes naturais do mel, a formulação deve verificar cor, odor, atividade de água, preservação e compatibilidade com polímeros e eletrólitos.',
    'Extrato substanciado de mel de acácia para hidratação e vitalidade',
    'Avalie esta solução com apoio técnico: preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410252.28.2',
          (SELECT id FROM ingredients WHERE slug = 'blossom-honey-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'blossom-honey-pro'),
          (SELECT id FROM tags WHERE slug = 'blossom-honey'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'blossom-honey-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  32. Peeling Complex
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Peeling Complex',
    'peeling-complex',
    'Peeling Complex é uma combinação equilibrada de ácido cítrico, gluconolactona e ácido succínico em forma líquida hidrossolúvel. O sistema reúne um alfa-hidroxiácido, um poli-hidroxiácido e um ácido dicarboxílico para formulações esfoliantes de amplo espectro.

A aplicação exige controle rigoroso de pH, capacidade tamponante, compatibilidade com espessantes, conservantes e embalagem. A faixa de uso e as condições de segurança devem ser definidas pela documentação técnica e validadas no produto final.',
    'Trio de ácidos hidrossolúveis para textura, tonalidade e clareza',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'complexos-esfoliantes'),
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
  VALUES (gen_random_uuid()::text, '410372.5000',
          (SELECT id FROM ingredients WHERE slug = 'peeling-complex'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410372.25000',
          (SELECT id FROM ingredients WHERE slug = 'peeling-complex'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'peeling-complex'),
          (SELECT id FROM tags WHERE slug = 'peeling'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'peeling-complex'),
          (SELECT id FROM tags WHERE slug = 'esfoliacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'peeling-complex'),
          (SELECT id FROM tags WHERE slug = 'complexo-cosmetico'))
  ON CONFLICT DO NOTHING;

END $$;

COMMIT;
