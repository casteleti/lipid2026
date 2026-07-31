-- Catálogo de ingredientes — LIPOID
-- GERADO por scripts/import-catalogo/importar_catalogo.py — não editar à mão.
-- Fontes: Orientação para Cadastrar no Site.xlsx + LIPOID_Produtos_151-200.pdf
-- 40 produtos · 10 categorias · 56 tags · 52 códigos comerciais
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
  VALUES (gen_random_uuid()::text, 'Ativos em sistema Herbasome', 'ativos-em-sistema-herbasome', 1, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extratos botânicos', 'extratos-botanicos', 2, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extratos botânicos secos', 'extratos-botanicos-secos', 3, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extratos naturais', 'extratos-naturais', 4, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Leites vegetais', 'leites-vegetais', 5, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteínas e peptídeos cosméticos', 'proteinas-e-peptideos-cosmeticos', 6, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sistemas de encapsulação', 'sistemas-de-encapsulacao', 7, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vinagres botânicos', 'vinagres-botanicos', 8, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Óleos vegetais', 'oleos-vegetais', 9, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();

  -- ---------- tags
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Acácia', 'acacia', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Almond Oil', 'almond-oil', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativo botânico', 'ativo-botanico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Avocado', 'avocado', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Bamboo', 'bamboo', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Bamboo/ Almond Oil', 'bamboo-almond-oil', now())
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
  VALUES (gen_random_uuid()::text, 'Bearberry', 'bearberry', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'CIDER', 'cider', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Caffeine', 'caffeine', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Calendula', 'calendula', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Capsicum (Cayenne)', 'capsicum-cayenne', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Chamomile', 'chamomile', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cocos/ Almond Oil', 'cocos-almond-oil', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Colágeno', 'colageno', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cotton', 'cotton', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cotton Oil', 'cotton-oil', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cranberry', 'cranberry', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Dispersão vegetal', 'dispersao-vegetal', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Encapsulação', 'encapsulacao', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extrato botânico', 'extrato-botanico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extrato natural', 'extrato-natural', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extrato seco', 'extrato-seco', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ginseng LipoHerbasec', 'ginseng-lipoherbasec', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Green Coffee', 'green-coffee', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Green Tea', 'green-tea', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'HENNA', 'henna', now())
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
  VALUES (gen_random_uuid()::text, 'Herbaspheres', 'herbaspheres', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Hibiscus Egypt', 'hibiscus-egypt', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Honey', 'honey', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Jojobaoil W', 'jojobaoil-w', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'KALE', 'kale', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Linha Eco', 'linha-eco', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Mango', 'mango', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Maritime Pine', 'maritime-pine', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Olive', 'olive', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Olive Oil W', 'olive-oil-w', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Peptídeos', 'peptideos', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteínas', 'proteinas', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Rice', 'rice', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Rice/ Almond Oil', 'rice-almond-oil', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Rosemary', 'rosemary', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Royal Jelly', 'royal-jelly', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sea Buckthorn', 'sea-buckthorn', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sem conservantes', 'sem-conservantes', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sheabutter', 'sheabutter', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sheabutter Almond Oil', 'sheabutter-almond-oil', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vanilla organic', 'vanilla-organic', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vinagre botânico', 'vinagre-botanico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Óleo vegetal', 'oleo-vegetal', now())
  ON CONFLICT (slug) DO NOTHING;

  -- ---------- produtos

  --   1. Vanilla organic Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Vanilla organic Herbasol® Extract Glycerine SB',
    'vanilla-organic-herbasol-extract-glycerine-sb',
    'Vanilla organic Herbasol® Extract Glycerine SB é um extrato botânico líquido de baunilha, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de baunilha para sistemas cosméticos aquosos',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '400719.5000',
          (SELECT id FROM ingredients WHERE slug = 'vanilla-organic-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400719.10000',
          (SELECT id FROM ingredients WHERE slug = 'vanilla-organic-herbasol-extract-glycerine-sb'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400719.25000',
          (SELECT id FROM ingredients WHERE slug = 'vanilla-organic-herbasol-extract-glycerine-sb'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vanilla-organic-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'vanilla-organic'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vanilla-organic-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vanilla-organic-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vanilla-organic-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --   2. Bamboo Herbasol Extract IPM
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Bamboo Herbasol Extract IPM',
    'bamboo-herbasol-extract-ipm',
    'Bamboo Herbasol Extract IPM é um extrato botânico apresentado em miristato de isopropila, um veículo lipofílico. A forma comercial é indicada para projetos em que os constituintes extraídos e o sistema de incorporação devem permanecer compatíveis com a fase oleosa.

Pode ser trabalhado em emulsões, óleos, balms e produtos anidros. O desenvolvimento deve verificar solubilidade, oxidação, sensorial, compatibilidade com filtros e fragrâncias e estabilidade da emulsão.',
    'Extrato lipofílico de bambu em IPM para fases oleosas',
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
  VALUES (gen_random_uuid()::text, '202080.25000',
          (SELECT id FROM ingredients WHERE slug = 'bamboo-herbasol-extract-ipm'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'bamboo'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'base-ipm'))
  ON CONFLICT DO NOTHING;

  --   3. Rosemary Herbasol Vinegar Extract PF
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Rosemary Herbasol Vinegar Extract PF',
    'rosemary-herbasol-vinegar-extract-pf',
    'Rosemary Herbasol Vinegar Extract PF é um extrato botânico líquido obtido em uma matriz de vinagre.

Além dos constituintes da matéria-prima indicada no nome, o sistema carrega a acidez e os componentes de fermentação característicos do veículo.

Pode ser avaliado em produtos de limpeza, tônicos, shampoos e formulações esfoliantes. O pH, a capacidade tamponante, a compatibilidade com tensoativos, a viscosidade e a preservação devem ser controlados no produto final.',
    'Extrato de alecrim em matriz de vinagre para sistemas com pH controlado',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e envie os requisitos técnicos.',
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
  VALUES (gen_random_uuid()::text, '400343.148.2',
          (SELECT id FROM ingredients WHERE slug = 'rosemary-herbasol-vinegar-extract-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rosemary-herbasol-vinegar-extract-pf'),
          (SELECT id FROM tags WHERE slug = 'rosemary'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rosemary-herbasol-vinegar-extract-pf'),
          (SELECT id FROM tags WHERE slug = 'vinagre-botanico'))
  ON CONFLICT DO NOTHING;

  --   4. Cotton Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cotton Herbasol® Extract Glycerine SB',
    'cotton-herbasol-extract-glycerine-sb',
    'Cotton Herbasol® Extract Glycerine SB é um extrato botânico líquido de algodão, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de algodão para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '400819.100000',
          (SELECT id FROM ingredients WHERE slug = 'cotton-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'cotton'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --   5. Royal Jelly Extract COS (SB)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Royal Jelly Extract COS (SB)',
    'royal-jelly-extract-cos-sb',
    'Royal Jelly Extract COS (SB) é um ingrediente cosmético de origem botânica identificado pela matéria- prima e pela apresentação comercial. A seleção deve considerar composição, polaridade, função tecnológica e compatibilidade com a arquitetura da formulação.

O modo de uso depende do veículo e da forma física do produto. A etapa de incorporação, o pH, a temperatura e a estabilidade devem ser estabelecidos a partir da ficha técnica e de testes no sistema final.',
    'Ingrediente botânico de geleia real para desenvolvimento cosmético',
    'Compartilhe o desafio técnico no Formulário de Atendimento e avance com a orientação da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'extratos-naturais'),
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
  VALUES (gen_random_uuid()::text, '400864.100.2',
          (SELECT id FROM ingredients WHERE slug = 'royal-jelly-extract-cos-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'royal-jelly-extract-cos-sb'),
          (SELECT id FROM tags WHERE slug = 'royal-jelly'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'royal-jelly-extract-cos-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-natural'))
  ON CONFLICT DO NOTHING;

  --   6. Ginseng LipoHerbasec
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Ginseng LipoHerbasec',
    'ginseng-lipoherbasec',
    'Ginseng LipoHerbasec é uma preparação seca que combina extrato de raiz de ginseng com fosfolipídios hidrogenados e maltodextrina. A matriz facilita a dispersão de um componente botânico em formulações cosméticas e associa o extrato a uma arquitetura lipídica.

O uso requer pré-dispersão controlada e verificação de hidratação, formação de grumos e compatibilidade com tensoativos e eletrólitos. Temperatura, cisalhamento e tempo de processamento devem seguir a ficha técnica para preservar a uniformidade do sistema.',
    'Extrato de ginseng em matriz seca de fosfolipídios',
    'Para discutir compatibilidade, processo e documentação, envie sua demanda pelo Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '410091.110.2',
          (SELECT id FROM ingredients WHERE slug = 'ginseng-lipoherbasec'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ginseng-lipoherbasec'),
          (SELECT id FROM tags WHERE slug = 'ginseng-lipoherbasec'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ginseng-lipoherbasec'),
          (SELECT id FROM tags WHERE slug = 'herbasec'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ginseng-lipoherbasec'),
          (SELECT id FROM tags WHERE slug = 'extrato-seco'))
  ON CONFLICT DO NOTHING;

  --   7. Jojobaoil W
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Jojobaoil W',
    'jojobaoil-w',
    'Jojobaoil W é uma apresentação de óleo de jojoba desenvolvida para facilitar sua dispersão em sistemas predominantemente aquosos. O formato permite explorar o perfil emoliente da jojoba sem depender exclusivamente de uma fase oleosa convencional.

Pode ser avaliado em loções leves, géis-creme, produtos capilares e formulações de limpeza. A estabilidade depende do balanço de tensoativos, eletrólitos, viscosidade e ordem de adição; esses parâmetros devem ser confirmados em testes de bancada.',
    'Óleo de jojoba dispersível em água para emulsões e sistemas aquosos',
    'Dê contexto ao seu desenvolvimento no Formulário de Atendimento e receba o direcionamento da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'oleos-vegetais'),
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
  VALUES (gen_random_uuid()::text, '171350.00.2',
          (SELECT id FROM ingredients WHERE slug = 'jojobaoil-w'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'jojobaoil-w'),
          (SELECT id FROM tags WHERE slug = 'jojobaoil-w'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'jojobaoil-w'),
          (SELECT id FROM tags WHERE slug = 'oleo-vegetal'))
  ON CONFLICT DO NOTHING;

  --   8. Sheabutter Herbamilk PF
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Sheabutter Herbamilk PF',
    'sheabutter-herbamilk-pf',
    'Sheabutter Herbamilk PF é uma preparação cosmética do tipo Herbamilk® Eco, que combina componentes botânicos e lipídicos em uma matriz dispersível em água. A apresentação foi desenvolvida para levar óleos ou matérias-primas vegetais a formulações leves sem depender de uma fase oleosa convencional ampla.

Pode ser estudado em loções, séruns, géis-creme, máscaras e produtos capilares. A incorporação deve preservar a dispersão, com controle de temperatura, cisalhamento, eletrólitos e compatibilidade com tensoativos e conservantes.',
    'Leite cosmético vegetal de manteiga de karité com suporte fosfolipídico',
    'Avalie esta solução com apoio técnico: preencha o Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '401062.25000',
          (SELECT id FROM ingredients WHERE slug = 'sheabutter-herbamilk-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '401062.50000',
          (SELECT id FROM ingredients WHERE slug = 'sheabutter-herbamilk-pf'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sheabutter-herbamilk-pf'),
          (SELECT id FROM tags WHERE slug = 'sheabutter'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sheabutter-herbamilk-pf'),
          (SELECT id FROM tags WHERE slug = 'herbamilk'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sheabutter-herbamilk-pf'),
          (SELECT id FROM tags WHERE slug = 'dispersao-vegetal'))
  ON CONFLICT DO NOTHING;

  --   9. Rice/ Almond Oil Herbamilk® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Rice/ Almond Oil Herbamilk® Eco',
    'rice-almond-oil-herbamilk-eco',
    'Rice/ Almond Oil Herbamilk® Eco é uma preparação cosmética do tipo Herbamilk® Eco, que combina componentes botânicos e lipídicos em uma matriz dispersível em água. A apresentação foi desenvolvida para levar óleos ou matérias-primas vegetais a formulações leves sem depender de uma fase oleosa convencional ampla.

Pode ser estudado em loções, séruns, géis-creme, máscaras e produtos capilares. A incorporação deve preservar a dispersão, com controle de temperatura, cisalhamento, eletrólitos e compatibilidade com tensoativos e conservantes.',
    'Leite cosmético vegetal de arroz e óleo de amêndoas com suporte fosfolipídico',
    'Apresente sua formulação no Formulário de Atendimento e avance com o suporte técnico da equipe Lipid.',
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
  VALUES (gen_random_uuid()::text, '410300.496.2',
          (SELECT id FROM ingredients WHERE slug = 'rice-almond-oil-herbamilk-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'rice-almond-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'herbamilk'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'dispersao-vegetal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  10. Sheabutter Almond Oil Herbaspheres
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Sheabutter Almond Oil Herbaspheres',
    'sheabutter-almond-oil-herbaspheres',
    'Sheabutter Almond Oil Herbaspheres é uma combinação de manteiga de karité e óleo de amêndoas estruturada em uma matriz dispersível. O sistema foi concebido para levar componentes lipídicos a formulações aquosas, contribuindo para emoliência e condicionamento.

A incorporação deve preservar a integridade da dispersão e evitar aquecimento ou cisalhamento além do recomendado. Devem ser avaliados viscosidade, estabilidade, sensorial, compatibilidade com tensoativos e comportamento durante o armazenamento.',
    'Sistema botânico-lipídico de karité e amêndoas para condicionamento',
    'Leve este ingrediente para a próxima etapa: compartilhe o objetivo do projeto no Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'sistemas-de-encapsulacao'),
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
  VALUES (gen_random_uuid()::text, '401035.496.2',
          (SELECT id FROM ingredients WHERE slug = 'sheabutter-almond-oil-herbaspheres'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sheabutter-almond-oil-herbaspheres'),
          (SELECT id FROM tags WHERE slug = 'sheabutter-almond-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sheabutter-almond-oil-herbaspheres'),
          (SELECT id FROM tags WHERE slug = 'encapsulacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sheabutter-almond-oil-herbaspheres'),
          (SELECT id FROM tags WHERE slug = 'herbaspheres'))
  ON CONFLICT DO NOTHING;

  --  11. Almond Oil Herbamilk® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Almond Oil Herbamilk® Eco',
    'almond-oil-herbamilk-eco',
    'Almond Oil Herbamilk® Eco é uma preparação cosmética do tipo Herbamilk® Eco, que combina componentes botânicos e lipídicos em uma matriz dispersível em água. A apresentação foi desenvolvida para levar óleos ou matérias-primas vegetais a formulações leves sem depender de uma fase oleosa convencional ampla.

Pode ser estudado em loções, séruns, géis-creme, máscaras e produtos capilares. A incorporação deve preservar a dispersão, com controle de temperatura, cisalhamento, eletrólitos e compatibilidade com tensoativos e conservantes.',
    'Leite cosmético vegetal de almond oil com suporte fosfolipídico',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
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
  VALUES (gen_random_uuid()::text, '401038.25000',
          (SELECT id FROM ingredients WHERE slug = 'almond-oil-herbamilk-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'almond-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'herbamilk'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'dispersao-vegetal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  12. Bamboo/ Almond Oil Herbamilk® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Bamboo/ Almond Oil Herbamilk® Eco',
    'bamboo-almond-oil-herbamilk-eco',
    'Bamboo/ Almond Oil Herbamilk® Eco é uma preparação cosmética do tipo Herbamilk® Eco, que combina componentes botânicos e lipídicos em uma matriz dispersível em água. A apresentação foi desenvolvida para levar óleos ou matérias-primas vegetais a formulações leves sem depender de uma fase oleosa convencional ampla.

Pode ser estudado em loções, séruns, géis-creme, máscaras e produtos capilares. A incorporação deve preservar a dispersão, com controle de temperatura, cisalhamento, eletrólitos e compatibilidade com tensoativos e conservantes.',
    'Leite cosmético vegetal de bambu e óleo de amêndoas com suporte fosfolipídico',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e envie os requisitos técnicos.',
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
  VALUES (gen_random_uuid()::text, '410299.25000',
          (SELECT id FROM ingredients WHERE slug = 'bamboo-almond-oil-herbamilk-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'bamboo-almond-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'herbamilk'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'dispersao-vegetal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  13. Cocos/ Almond Oil Herbamilk® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cocos/ Almond Oil Herbamilk® Eco',
    'cocos-almond-oil-herbamilk-eco',
    'Cocos/ Almond Oil Herbamilk® Eco é uma preparação cosmética do tipo Herbamilk® Eco, que combina componentes botânicos e lipídicos em uma matriz dispersível em água. A apresentação foi desenvolvida para levar óleos ou matérias-primas vegetais a formulações leves sem depender de uma fase oleosa convencional ampla.

Pode ser estudado em loções, séruns, géis-creme, máscaras e produtos capilares. A incorporação deve preservar a dispersão, com controle de temperatura, cisalhamento, eletrólitos e compatibilidade com tensoativos e conservantes.',
    'Leite cosmético vegetal de coco e óleo de amêndoas com suporte fosfolipídico',
    'Inclua este ingrediente no seu estudo: preencha o Formulário de Atendimento e apresente o contexto de uso.',
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
  VALUES (gen_random_uuid()::text, '411966.496.2',
          (SELECT id FROM ingredients WHERE slug = 'cocos-almond-oil-herbamilk-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cocos-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'cocos-almond-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cocos-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'herbamilk'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cocos-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'dispersao-vegetal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cocos-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  14. Olive Oil W
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Olive Oil W',
    'olive-oil-w',
    'Olive Oil W é uma apresentação de óleo de oliveira desenvolvida para facilitar sua dispersão em formulações aquosas. O formato amplia as possibilidades de incorporação do componente lipídico em produtos de baixa carga oleosa.

Pode ser avaliado em loções, géis-creme, produtos capilares e sistemas de limpeza. A estabilidade depende do balanço de tensoativos, viscosidade, eletrólitos e ordem de adição.',
    'Óleo de oliveira dispersível em água para sistemas leves',
    'Para discutir compatibilidade, processo e documentação, envie sua demanda pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'oleos-vegetais'),
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
  VALUES (gen_random_uuid()::text, '171300.25000',
          (SELECT id FROM ingredients WHERE slug = 'olive-oil-w'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'olive-oil-w'),
          (SELECT id FROM tags WHERE slug = 'olive-oil-w'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'olive-oil-w'),
          (SELECT id FROM tags WHERE slug = 'oleo-vegetal'))
  ON CONFLICT DO NOTHING;

  --  15. Olive Herbasol Unpreserved System 3
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Olive Herbasol Unpreserved System 3',
    'olive-herbasol-unpreserved-system-3',
    'Olive Herbasol Unpreserved System 3 é um ingrediente cosmético de origem botânica identificado pela matéria-prima e pela apresentação comercial. A seleção deve considerar composição, polaridade, função tecnológica e compatibilidade com a arquitetura da formulação.

O modo de uso depende do veículo e da forma física do produto. A etapa de incorporação, o pH, a temperatura e a estabilidade devem ser estabelecidos a partir da ficha técnica e de testes no sistema final.',
    'Ingrediente botânico de oliveira para desenvolvimento cosmético',
    'Dê contexto ao seu desenvolvimento no Formulário de Atendimento e receba o direcionamento da equipe Lipid.',
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
  VALUES (gen_random_uuid()::text, '215040.25000',
          (SELECT id FROM ingredients WHERE slug = 'olive-herbasol-unpreserved-system-3'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'olive-herbasol-unpreserved-system-3'),
          (SELECT id FROM tags WHERE slug = 'olive'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'olive-herbasol-unpreserved-system-3'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'olive-herbasol-unpreserved-system-3'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'olive-herbasol-unpreserved-system-3'),
          (SELECT id FROM tags WHERE slug = 'sem-conservantes'))
  ON CONFLICT DO NOTHING;

  --  16. Avocado Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Avocado Herbasol® Extract Glycerine SB',
    'avocado-herbasol-extract-glycerine-sb',
    'Avocado Herbasol® Extract Glycerine SB é um extrato botânico líquido de abacate, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de abacate para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '400304.10000',
          (SELECT id FROM ingredients WHERE slug = 'avocado-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400304.25000',
          (SELECT id FROM ingredients WHERE slug = 'avocado-herbasol-extract-glycerine-sb'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'avocado-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'avocado'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'avocado-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'avocado-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'avocado-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --  17. Hibiscus Egypt Herbasol Extract 80% BG
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Hibiscus Egypt Herbasol Extract 80% BG',
    'hibiscus-egypt-herbasol-extract-80-bg',
    'Hibiscus Egypt Herbasol Extract 80% BG é um ingrediente cosmético de origem botânica identificado pela matéria-prima e pela apresentação comercial. A seleção deve considerar composição, polaridade, função tecnológica e compatibilidade com a arquitetura da formulação.

O modo de uso depende do veículo e da forma física do produto. A etapa de incorporação, o pH, a temperatura e a estabilidade devem ser estabelecidos a partir da ficha técnica e de testes no sistema final.',
    'Ingrediente botânico de hibisco para desenvolvimento cosmético',
    'Apresente sua formulação no Formulário de Atendimento e avance com o suporte técnico da equipe Lipid.',
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
  VALUES (gen_random_uuid()::text, '400449.25000',
          (SELECT id FROM ingredients WHERE slug = 'hibiscus-egypt-herbasol-extract-80-bg'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'hibiscus-egypt-herbasol-extract-80-bg'),
          (SELECT id FROM tags WHERE slug = 'hibiscus-egypt'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'hibiscus-egypt-herbasol-extract-80-bg'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'hibiscus-egypt-herbasol-extract-80-bg'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;

  --  18. Olive Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Olive Herbasol® Extract Glycerine SB',
    'olive-herbasol-extract-glycerine-sb',
    'Olive Herbasol® Extract Glycerine SB é um extrato botânico líquido de oliveira, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de oliveira para sistemas cosméticos aquosos',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '400485.10000',
          (SELECT id FROM ingredients WHERE slug = 'olive-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400485.25000',
          (SELECT id FROM ingredients WHERE slug = 'olive-herbasol-extract-glycerine-sb'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'olive-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'olive'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'olive-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'olive-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'olive-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --  19. Calendula (CH) Herbasol® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Calendula (CH) Herbasol® Eco',
    'calendula-ch-herbasol-eco',
    'Calendula (CH) Herbasol® Eco integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de calêndula para formulações de posicionamento natural',
    'Leve este ingrediente para a próxima etapa: compartilhe o objetivo do projeto no Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '410054.177.2',
          (SELECT id FROM ingredients WHERE slug = 'calendula-ch-herbasol-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'calendula-ch-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'calendula'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'calendula-ch-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'calendula-ch-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'calendula-ch-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  20. Mango Herbasol® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Mango Herbasol® Eco',
    'mango-herbasol-eco',
    'Mango Herbasol® Eco integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de manga para formulações de posicionamento natural',
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
  VALUES (gen_random_uuid()::text, '410065.177.2',
          (SELECT id FROM ingredients WHERE slug = 'mango-herbasol-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410065.177.3',
          (SELECT id FROM ingredients WHERE slug = 'mango-herbasol-eco'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mango-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'mango'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mango-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mango-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mango-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  21. Sea Buckthorn (FR) Herbasol® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Sea Buckthorn (FR) Herbasol® Eco',
    'sea-buckthorn-fr-herbasol-eco',
    'Sea Buckthorn (FR) Herbasol® Eco integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de espinheiro-marítimo para formulações de posicionamento natural',
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
  VALUES (gen_random_uuid()::text, '410067.177.2',
          (SELECT id FROM ingredients WHERE slug = 'sea-buckthorn-fr-herbasol-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sea-buckthorn-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'sea-buckthorn'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sea-buckthorn-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sea-buckthorn-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'sea-buckthorn-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  22. Honey Herbasol® Vinegar Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Honey Herbasol® Vinegar Extract Glycerine SB',
    'honey-herbasol-vinegar-extract-glycerine-sb',
    'Honey Herbasol® Vinegar Extract Glycerine SB é um extrato botânico líquido obtido em uma matriz de vinagre. Além dos constituintes da matéria-prima indicada no nome, o sistema carrega a acidez e os componentes de fermentação característicos do veículo.

Pode ser avaliado em produtos de limpeza, tônicos, shampoos e formulações esfoliantes. O pH, a capacidade tamponante, a compatibilidade com tensoativos, a viscosidade e a preservação devem ser controlados no produto final.',
    'Extrato de mel em matriz de vinagre para sistemas com pH controlado',
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
  VALUES (gen_random_uuid()::text, '400757.25000',
          (SELECT id FROM ingredients WHERE slug = 'honey-herbasol-vinegar-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-herbasol-vinegar-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'honey'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-herbasol-vinegar-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'vinagre-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-herbasol-vinegar-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --  23. Mango Herbasol® Ecoverte™
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Mango Herbasol® Ecoverte™',
    'mango-herbasol-ecoverte',
    'Mango Herbasol® Ecoverte™ integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de manga para formulações de posicionamento natural',
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
  VALUES (gen_random_uuid()::text, '400837.149.2',
          (SELECT id FROM ingredients WHERE slug = 'mango-herbasol-ecoverte'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mango-herbasol-ecoverte'),
          (SELECT id FROM tags WHERE slug = 'mango'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mango-herbasol-ecoverte'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mango-herbasol-ecoverte'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mango-herbasol-ecoverte'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  24. Green Tea Herbasol® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Green Tea Herbasol® Eco',
    'green-tea-herbasol-eco',
    'Green Tea Herbasol® Eco integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de chá verde para formulações de posicionamento natural',
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
  VALUES (gen_random_uuid()::text, '410069.177.2',
          (SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'green-tea'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  25. Green Tea Herbasol® Ecoverte™
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Green Tea Herbasol® Ecoverte™',
    'green-tea-herbasol-ecoverte',
    'Green Tea Herbasol® Ecoverte™ integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de chá verde para formulações de posicionamento natural',
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
  VALUES (gen_random_uuid()::text, '400775.179.2',
          (SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-ecoverte'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-ecoverte'),
          (SELECT id FROM tags WHERE slug = 'green-tea'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-ecoverte'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-ecoverte'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-tea-herbasol-ecoverte'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  26. Green Coffee Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Green Coffee Pro',
    'green-coffee-pro',
    'Green Coffee Pro é um extrato aquoso-glicerinado de sementes orgânicas e de comércio justo de café verde. Integra a linha Herbasol® Pro e foi desenvolvido com eficácia avaliada para aplicações de conforto cutâneo.

A apresentação hidrossolúvel pode ser estudada em séruns, géis, emulsões e cuidados de couro cabeludo. A formulação deve controlar pH, cor, odor, preservação e estabilidade, especialmente quando combinada com cafeína ou outros extratos vegetais.',
    'Extrato substanciado de café verde para cuidado calmante e revitalizante',
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
  VALUES (gen_random_uuid()::text, '410161.116.2',
          (SELECT id FROM ingredients WHERE slug = 'green-coffee-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-coffee-pro'),
          (SELECT id FROM tags WHERE slug = 'green-coffee'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'green-coffee-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  27. Cotton Oil Herbamilk Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cotton Oil Herbamilk Eco',
    'cotton-oil-herbamilk-eco',
    'Cotton Oil Herbamilk Eco é uma preparação cosmética do tipo Herbamilk® Eco, que combina componentes botânicos e lipídicos em uma matriz dispersível em água. A apresentação foi desenvolvida para levar óleos ou matérias-primas vegetais a formulações leves sem depender de uma fase oleosa convencional ampla.

Pode ser estudado em loções, séruns, géis-creme, máscaras e produtos capilares. A incorporação deve preservar a dispersão, com controle de temperatura, cisalhamento, eletrólitos e compatibilidade com tensoativos e conservantes.',
    'Leite cosmético vegetal de óleo de algodão com suporte fosfolipídico',
    'Avalie esta solução com apoio técnico: preencha o Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '41106725000',
          (SELECT id FROM ingredients WHERE slug = 'cotton-oil-herbamilk-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'cotton-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'herbamilk'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'dispersao-vegetal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cotton-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  28. Caffeine Herbasome
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Caffeine Herbasome',
    'caffeine-herbasome',
    'Caffeine Herbasome é uma apresentação lipossomal de cafeína, desenvolvida para facilitar sua dispersão e entrega em formulações cosméticas. A associação com fosfolipídios diferencia o ingrediente da cafeína livre e exige atenção à estrutura do carreador.

Pode ser avaliado em séruns, géis, emulsões, cuidados corporais e produtos capilares. Recomenda-se adição em baixa temperatura, com controle de pH, eletrólitos e cisalhamento, além de comparação de desempenho e estabilidade com a cafeína não encapsulada.',
    'Cafeína em sistema lipossomal para formulações cosméticas aquosas',
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
  VALUES (gen_random_uuid()::text, '511830.00.2',
          (SELECT id FROM ingredients WHERE slug = 'caffeine-herbasome'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'caffeine-herbasome'),
          (SELECT id FROM tags WHERE slug = 'caffeine'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'caffeine-herbasome'),
          (SELECT id FROM tags WHERE slug = 'herbasome'))
  ON CONFLICT DO NOTHING;

  --  29. Bearberry Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Bearberry Herbasol® Extract PG (PF)',
    'bearberry-herbasol-extract-pg-pf',
    'Bearberry Herbasol® Extract PG (PF) é um extrato botânico líquido de uva-ursina em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de uva-ursina em propilenoglicol para formulações de fase aquosa',
    'Apresente sua formulação no Formulário de Atendimento e avance com o suporte técnico da equipe Lipid.',
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
  VALUES (gen_random_uuid()::text, '202030.101.2',
          (SELECT id FROM ingredients WHERE slug = 'bearberry-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bearberry-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'bearberry'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bearberry-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bearberry-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bearberry-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --  30. Rice Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Rice Herbasol® Extract PG (PF)',
    'rice-herbasol-extract-pg-pf',
    'Rice Herbasol® Extract PG (PF) é um extrato botânico líquido de arroz em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de arroz em propilenoglicol para formulações de fase aquosa',
    'Leve este ingrediente para a próxima etapa: compartilhe o objetivo do projeto no Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '400891.101.2',
          (SELECT id FROM ingredients WHERE slug = 'rice-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'rice'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --  31. Maritime Pine (FR) Herbasol® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Maritime Pine (FR) Herbasol® Eco',
    'maritime-pine-fr-herbasol-eco',
    'Maritime Pine (FR) Herbasol® Eco integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de pinheiro-marítimo para formulações de posicionamento natural',
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
  VALUES (gen_random_uuid()::text, '410066.1000',
          (SELECT id FROM ingredients WHERE slug = 'maritime-pine-fr-herbasol-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410066.25000',
          (SELECT id FROM ingredients WHERE slug = 'maritime-pine-fr-herbasol-eco'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410066.10000',
          (SELECT id FROM ingredients WHERE slug = 'maritime-pine-fr-herbasol-eco'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'maritime-pine-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'maritime-pine'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'maritime-pine-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'maritime-pine-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'maritime-pine-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  32. RICE VNGR+®
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'RICE VNGR+®',
    'rice-vngr',
    'RICE VNGR+® combina extratos de flor de crisântemo branco e raiz de Polygonum multiflorum em um sistema de extração com vinagre de arroz e glicerina. É um ativo líquido orientado a limpeza, controle de oleosidade e cuidados do couro cabeludo.

Por utilizar uma matriz ácida, sua aplicação exige controle de pH e capacidade tamponante. Pode ser estudado em shampoos, tônicos, produtos de limpeza e formulações esfoliantes, com validação de compatibilidade, preservação e tolerabilidade.',
    'Extratos de crisântemo e polygonum em vinagre de arroz para pele e couro cabeludo',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e envie os requisitos técnicos.',
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
  VALUES (gen_random_uuid()::text, '410083.250.2',
          (SELECT id FROM ingredients WHERE slug = 'rice-vngr'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-vngr'),
          (SELECT id FROM tags WHERE slug = 'rice'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rice-vngr'),
          (SELECT id FROM tags WHERE slug = 'vinagre-botanico'))
  ON CONFLICT DO NOTHING;

  --  33. CIDER VNGR+®
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'CIDER VNGR+®',
    'cider-vngr',
    'CIDER VNGR+® reúne extratos de flor de malva e folha de urtiga orgânicas em vinagre de maçã orgânico e glicerina. O sistema líquido foi desenvolvido para aplicações de limpeza, controle de oleosidade e cuidado de cabelos e couro cabeludo.

A matriz ácida requer ajuste de pH, estudo de compatibilidade com tensoativos e condicionantes e avaliação do impacto sobre viscosidade e preservação. A faixa de uso deve ser definida pela ficha técnica e por testes no produto final.',
    'Malva e urtiga em vinagre de maçã para limpeza e cuidado capilar',
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
  VALUES (gen_random_uuid()::text, '410082.249.2',
          (SELECT id FROM ingredients WHERE slug = 'cider-vngr'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cider-vngr'),
          (SELECT id FROM tags WHERE slug = 'cider'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cider-vngr'),
          (SELECT id FROM tags WHERE slug = 'vinagre-botanico'))
  ON CONFLICT DO NOTHING;

  --  34. KALE PRO
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'KALE PRO',
    'kale-pro',
    'KALE PRO é um extrato aquoso-glicerinado de folhas de couve orgânica, pertencente à linha Herbasol® Pro. A preparação é hidrossolúvel e foi desenvolvida com eficácia avaliada para aplicações de proteção antioxidante e radiância.

Pode ser considerado em séruns, géis, emulsões e produtos capilares. A formulação deve monitorar cor, odor, pH, preservação e compatibilidade com outros antioxidantes, filtros e agentes quelantes.',
    'Extrato substanciado de couve para ação antioxidante e luminosidade',
    'Compartilhe o desafio técnico no Formulário de Atendimento e avance com a orientação da equipe Lipid.',
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
  VALUES (gen_random_uuid()::text, '410152.166.2',
          (SELECT id FROM ingredients WHERE slug = 'kale-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'kale-pro'),
          (SELECT id FROM tags WHERE slug = 'kale'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'kale-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  35. ACACIA COLLAGEN (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'ACACIA COLLAGEN (PF)',
    'acacia-collagen-pf',
    'ACACIA COLLAGEN (PF) é um ingrediente funcional de origem vegetal baseado em componentes da acácia e apresentado para uso cosmético. Sua função tecnológica está associada à formação de filme e ao condicionamento de pele e cabelo.

Pode ser avaliado em séruns, máscaras, emulsões e produtos capilares. A interação com polímeros, sais, tensoativos e agentes catiônicos deve ser verificada, assim como o impacto sobre viscosidade, deposição e sensorial.',
    'Biopolímeros de acácia para filme, hidratação e condicionamento',
    'Inclua este ingrediente no seu estudo: preencha o Formulário de Atendimento e apresente o contexto de uso.',
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
  VALUES (gen_random_uuid()::text, '150154.100.2',
          (SELECT id FROM ingredients WHERE slug = 'acacia-collagen-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'acacia-collagen-pf'),
          (SELECT id FROM tags WHERE slug = 'proteinas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'acacia-collagen-pf'),
          (SELECT id FROM tags WHERE slug = 'peptideos'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'acacia-collagen-pf'),
          (SELECT id FROM tags WHERE slug = 'colageno'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'acacia-collagen-pf'),
          (SELECT id FROM tags WHERE slug = 'acacia'))
  ON CONFLICT DO NOTHING;

  --  36. Capsicum (Cayenne) Herbasol® Extract IPM
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Capsicum (Cayenne) Herbasol® Extract IPM',
    'capsicum-cayenne-herbasol-extract-ipm',
    'Capsicum (Cayenne) Herbasol® Extract IPM é um extrato botânico apresentado em miristato de isopropila, um veículo lipofílico. A forma comercial é indicada para projetos em que os constituintes extraídos e o sistema de incorporação devem permanecer compatíveis com a fase oleosa.

Pode ser trabalhado em emulsões, óleos, balms e produtos anidros. O desenvolvimento deve verificar solubilidade, oxidação, sensorial, compatibilidade com filtros e fragrâncias e estabilidade da emulsão.',
    'Extrato lipofílico de pimenta-caiena em IPM para fases oleosas',
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
  VALUES (gen_random_uuid()::text, '40032125000',
          (SELECT id FROM ingredients WHERE slug = 'capsicum-cayenne-herbasol-extract-ipm'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'capsicum-cayenne-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'capsicum-cayenne'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'capsicum-cayenne-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'capsicum-cayenne-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'capsicum-cayenne-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'base-ipm'))
  ON CONFLICT DO NOTHING;

  --  37. Cranberry Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cranberry Pro',
    'cranberry-pro',
    'Cranberry Pro é um extrato aquoso-glicerinado de fruto orgânico de cranberry, integrante da linha Herbasol® Pro. O ingrediente foi desenvolvido para modular a adesão e a formação de biofilmes cutâneos sem atuar como biocida.

Pode ser avaliado em produtos de limpeza, cuidados de pele com tendência a imperfeições e formulações voltadas ao equilíbrio do microbioma. O sistema conservante continua sendo necessário e deve ser validado separadamente por ensaios apropriados.',
    'Extrato substanciado de cranberry para controle não biocida de biofilmes',
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
  VALUES (gen_random_uuid()::text, '4101715000',
          (SELECT id FROM ingredients WHERE slug = 'cranberry-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '4101710000',
          (SELECT id FROM ingredients WHERE slug = 'cranberry-pro'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '41017125000',
          (SELECT id FROM ingredients WHERE slug = 'cranberry-pro'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cranberry-pro'),
          (SELECT id FROM tags WHERE slug = 'cranberry'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cranberry-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  38. HENNA HERBASEC
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'HENNA HERBASEC',
    'henna-herbasec',
    'HENNA HERBASEC é um extrato botânico seco da linha Herbasec®. O formato em pó concentra a matéria-prima vegetal e permite seu uso em formulações nas quais a forma sólida, a dispersibilidade e o controle de água são relevantes.

Pode ser pré-disperso em água, glicerina ou outro veículo compatível, conforme a ficha técnica. O processo deve controlar formação de grumos, sedimentação, cor, odor e impacto sobre a viscosidade e a preservação.',
    'Extrato botânico seco de henna para dispersões cosméticas',
    'Comece a análise deste ingrediente pelo Formulário de Atendimento e detalhe a aplicação pretendida.',
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
  VALUES (gen_random_uuid()::text, '208150.25000',
          (SELECT id FROM ingredients WHERE slug = 'henna-herbasec'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'henna-herbasec'),
          (SELECT id FROM tags WHERE slug = 'henna'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'henna-herbasec'),
          (SELECT id FROM tags WHERE slug = 'herbasec'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'henna-herbasec'),
          (SELECT id FROM tags WHERE slug = 'extrato-seco'))
  ON CONFLICT DO NOTHING;

  --  39. Honey Extract PG, unpreserved, system 3
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Honey Extract PG, unpreserved, system 3',
    'honey-extract-pg-unpreserved-system-3',
    'Honey Extract PG, unpreserved, system 3 é um extrato botânico líquido de mel em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de mel em propilenoglicol para formulações de fase aquosa',
    'Apresente sua formulação no Formulário de Atendimento e avance com o suporte técnico da equipe Lipid.',
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
  VALUES (gen_random_uuid()::text, '208315.25000',
          (SELECT id FROM ingredients WHERE slug = 'honey-extract-pg-unpreserved-system-3'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-extract-pg-unpreserved-system-3'),
          (SELECT id FROM tags WHERE slug = 'honey'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-extract-pg-unpreserved-system-3'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-extract-pg-unpreserved-system-3'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-extract-pg-unpreserved-system-3'),
          (SELECT id FROM tags WHERE slug = 'sem-conservantes'))
  ON CONFLICT DO NOTHING;

  --  40. Chamomile Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Chamomile Herbasol® Extract PG (PF)',
    'chamomile-herbasol-extract-pg-pf',
    'Chamomile Herbasol® Extract PG (PF) é um extrato botânico líquido de camomila em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de camomila em propilenoglicol para formulações de fase aquosa',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '211150.10000',
          (SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '211150.25000',
          (SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-pg-pf'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '211150.50000',
          (SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-pg-pf'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'chamomile'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

END $$;

COMMIT;
