-- Catálogo de ingredientes — LIPOID
-- GERADO por scripts/import-catalogo/importar_catalogo.py — não editar à mão.
-- Fontes: Orientação para Cadastrar no Site.xlsx + LIPOID_Produtos_201-254.pdf
-- 37 produtos · 6 categorias · 50 tags · 76 códigos comerciais
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
  VALUES (gen_random_uuid()::text, 'Extratos botânicos', 'extratos-botanicos', 1, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extratos botânicos secos', 'extratos-botanicos-secos', 2, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fermentados botânicos', 'fermentados-botanicos', 3, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Leites vegetais', 'leites-vegetais', 4, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteínas e peptídeos cosméticos', 'proteinas-e-peptideos-cosmeticos', 5, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();

  -- ---------- tags
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Agave Organic', 'agave-organic', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Aniseed', 'aniseed', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Arnica Montana', 'arnica-montana', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Artichoke', 'artichoke', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativo botânico', 'ativo-botanico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Açai', 'acai', now())
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
  VALUES (gen_random_uuid()::text, 'Birch', 'birch', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Black Currant', 'black-currant', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Blackcurrant', 'blackcurrant', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Carrot', 'carrot', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cashew Apple', 'cashew-apple', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Celery', 'celery', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Centella Asiatica (Gotu Kola)', 'centella-asiatica-gotu-kola', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Chamomile', 'chamomile', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cherry Blossom', 'cherry-blossom', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'China (Peruvian) Bark', 'china-peruvian-bark', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cocos fruit', 'cocos-fruit', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cucumber', 'cucumber', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Dispersão vegetal', 'dispersao-vegetal', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extrato botânico', 'extrato-botanico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extrato seco', 'extrato-seco', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fermentado botânico', 'fermentado-botanico', now())
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
  VALUES (gen_random_uuid()::text, 'Honey', 'honey', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Karkade', 'karkade', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Kimchi', 'kimchi', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lavender', 'lavender', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lemon', 'lemon', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Linha Eco', 'linha-eco', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Liquorice', 'liquorice', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Mallow', 'mallow', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Marigold (Calendula)', 'marigold-calendula', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Moringa', 'moringa', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Moringuard', 'moringuard', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Mountain Tea', 'mountain-tea', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Oat/ Almond Oil', 'oat-almond-oil', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Peptídeos', 'peptideos', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteínas', 'proteinas', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Raspberry', 'raspberry', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Rose Flower (Petal)', 'rose-flower-petal', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Rosemary', 'rosemary', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Trigo', 'trigo', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vine Leaves', 'vine-leaves', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Water Lily', 'water-lily', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Óleo de girassol', 'oleo-de-girassol', now())
  ON CONFLICT (slug) DO NOTHING;

  -- ---------- produtos

  --   1. Rose Flower (Petal) Herbasec®
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Rose Flower (Petal) Herbasec®',
    'rose-flower-petal-herbasec',
    'Rose Flower (Petal) Herbasec® é um extrato botânico seco da linha Herbasec®. O formato em pó concentra a matéria-prima vegetal e permite seu uso em formulações nas quais a forma sólida, a dispersibilidade e o controle de água são relevantes.

Pode ser pré-disperso em água, glicerina ou outro veículo compatível, conforme a ficha técnica. O processo deve controlar formação de grumos, sedimentação, cor, odor e impacto sobre a viscosidade e a preservação.',
    'Extrato botânico seco de pétalas de rosa para dispersões cosméticas',
    'Apresente sua formulação no Formulário de Atendimento e avance com o suporte técnico da equipe Lipid.',
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
  VALUES (gen_random_uuid()::text, '218250.25000',
          (SELECT id FROM ingredients WHERE slug = 'rose-flower-petal-herbasec'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rose-flower-petal-herbasec'),
          (SELECT id FROM tags WHERE slug = 'rose-flower-petal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rose-flower-petal-herbasec'),
          (SELECT id FROM tags WHERE slug = 'herbasec'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rose-flower-petal-herbasec'),
          (SELECT id FROM tags WHERE slug = 'extrato-seco'))
  ON CONFLICT DO NOTHING;

  --   2. Liquorice Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Liquorice Herbasol® Extract PG (PF)',
    'liquorice-herbasol-extract-pg-pf',
    'Liquorice Herbasol® Extract PG (PF) é um extrato botânico líquido de alcaçuz em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de alcaçuz em propilenoglicol para formulações de fase aquosa',
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
  VALUES (gen_random_uuid()::text, '219600.10000',
          (SELECT id FROM ingredients WHERE slug = 'liquorice-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '219600.25000',
          (SELECT id FROM ingredients WHERE slug = 'liquorice-herbasol-extract-pg-pf'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '219600.50000',
          (SELECT id FROM ingredients WHERE slug = 'liquorice-herbasol-extract-pg-pf'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'liquorice-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'liquorice'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'liquorice-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'liquorice-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'liquorice-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --   3. China (Peruvian) Bark Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'China (Peruvian) Bark Herbasol® Extract PG (PF)',
    'china-peruvian-bark-herbasol-extract-pg-pf',
    'China (Peruvian) Bark Herbasol® Extract PG (PF) é um extrato botânico líquido de casca de quina em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de casca de quina em propilenoglicol para formulações de fase aquosa',
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
  VALUES (gen_random_uuid()::text, '400993.25000',
          (SELECT id FROM ingredients WHERE slug = 'china-peruvian-bark-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400993.50000',
          (SELECT id FROM ingredients WHERE slug = 'china-peruvian-bark-herbasol-extract-pg-pf'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'china-peruvian-bark-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'china-peruvian-bark'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'china-peruvian-bark-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'china-peruvian-bark-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'china-peruvian-bark-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --   4. Slimming Factor Karkade (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Slimming Factor Karkade (PF)',
    'slimming-factor-karkade-pf',
    'Slimming Factor Karkade (PF) é um ativo cosmético hidrossolúvel baseado em extrato de flores orgânicas de hibisco, apresentado em sistema aquoso com propilenoglicol. A proposta técnica é direcionada a formulações corporais voltadas à aparência de celulite e ao cuidado do contorno corporal.

Pode ser estudado em géis, séruns corporais, emulsões e produtos de massagem. A incorporação deve considerar pH, compatibilidade com polímeros e tensoativos, viscosidade, sistema conservante e validação do desempenho na formulação final.',
    'Ativo botânico de hibisco para cuidado corporal e definição de contorno',
    'Transforme a necessidade da formulação em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '211200.5000',
          (SELECT id FROM ingredients WHERE slug = 'slimming-factor-karkade-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '211200.10000',
          (SELECT id FROM ingredients WHERE slug = 'slimming-factor-karkade-pf'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '211200.25000',
          (SELECT id FROM ingredients WHERE slug = 'slimming-factor-karkade-pf'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'slimming-factor-karkade-pf'),
          (SELECT id FROM tags WHERE slug = 'karkade'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'slimming-factor-karkade-pf'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --   5. Honey Herbasol® Extract sunflower oil
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Honey Herbasol® Extract sunflower oil',
    'honey-herbasol-extract-sunflower-oil',
    'Honey Herbasol® Extract sunflower oil é um extrato botânico apresentado em óleo de girassol, formando uma preparação compatível com fases oleosas. O veículo lipídico permite incorporar os constituintes extraídos da matéria-prima em emulsões e sistemas anidros.

Pode ser trabalhado em cremes, loções, óleos, balms e produtos capilares. O desenvolvimento deve verificar oxidação, compatibilidade com antioxidantes e fragrâncias, sensorial, embalagem e estabilidade da emulsão.',
    'Extrato lipofílico de mel em óleo de girassol',
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
  VALUES (gen_random_uuid()::text, '400474.25000',
          (SELECT id FROM ingredients WHERE slug = 'honey-herbasol-extract-sunflower-oil'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-herbasol-extract-sunflower-oil'),
          (SELECT id FROM tags WHERE slug = 'honey'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-herbasol-extract-sunflower-oil'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-herbasol-extract-sunflower-oil'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'honey-herbasol-extract-sunflower-oil'),
          (SELECT id FROM tags WHERE slug = 'oleo-de-girassol'))
  ON CONFLICT DO NOTHING;

  --   6. Birch Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Birch Herbasol® Extract Glycerine SB',
    'birch-herbasol-extract-glycerine-sb',
    'Birch Herbasol® Extract Glycerine SB é um extrato botânico líquido de bétula, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de bétula para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '400585.100000',
          (SELECT id FROM ingredients WHERE slug = 'birch-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'birch-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'birch'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'birch-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'birch-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'birch-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --   7. Aniseed Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Aniseed Herbasol® Extract Glycerine SB',
    'aniseed-herbasol-extract-glycerine-sb',
    'Aniseed Herbasol® Extract Glycerine SB é um extrato botânico líquido de anis, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de anis para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '400530.25000',
          (SELECT id FROM ingredients WHERE slug = 'aniseed-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aniseed-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'aniseed'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aniseed-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aniseed-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'aniseed-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --   8. Chamomile Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Chamomile Herbasol® Extract Glycerine SB',
    'chamomile-herbasol-extract-glycerine-sb',
    'Chamomile Herbasol® Extract Glycerine SB é um extrato botânico líquido de camomila, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de camomila para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '400160.25000',
          (SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'chamomile'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --   9. Oat/ Almond Oil Herbamilk® Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Oat/ Almond Oil Herbamilk® Eco',
    'oat-almond-oil-herbamilk-eco',
    'Oat/ Almond Oil Herbamilk® Eco é uma preparação cosmética do tipo Herbamilk® Eco, que combina componentes botânicos e lipídicos em uma matriz dispersível em água. A apresentação foi desenvolvida para levar óleos ou matérias-primas vegetais a formulações leves sem depender de uma fase oleosa convencional ampla.

Pode ser estudado em loções, séruns, géis-creme, máscaras e produtos capilares. A incorporação deve preservar a dispersão, com controle de temperatura, cisalhamento, eletrólitos e compatibilidade com tensoativos e conservantes.',
    'Leite cosmético vegetal de aveia e óleo de amêndoas com suporte fosfolipídico',
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
  VALUES (gen_random_uuid()::text, '410265.10000',
          (SELECT id FROM ingredients WHERE slug = 'oat-almond-oil-herbamilk-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410265.25000',
          (SELECT id FROM ingredients WHERE slug = 'oat-almond-oil-herbamilk-eco'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'oat-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'oat-almond-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'oat-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'herbamilk'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'oat-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'dispersao-vegetal'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'oat-almond-oil-herbamilk-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  10. Artichoke Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Artichoke Herbasol® Extract PG (PF)',
    'artichoke-herbasol-extract-pg-pf',
    'Artichoke Herbasol® Extract PG (PF) é um extrato botânico líquido de alcachofra em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de alcachofra em propilenoglicol para formulações de fase aquosa',
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
  VALUES (gen_random_uuid()::text, '201450.101.2',
          (SELECT id FROM ingredients WHERE slug = 'artichoke-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'artichoke-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'artichoke'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'artichoke-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'artichoke-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'artichoke-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --  11. Chamomile Herbasec
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Chamomile Herbasec',
    'chamomile-herbasec',
    'Chamomile Herbasec é um extrato botânico seco da linha Herbasec®. O formato em pó concentra a matéria-prima vegetal e permite seu uso em formulações nas quais a forma sólida, a dispersibilidade e o controle de água são relevantes.

Pode ser pré-disperso em água, glicerina ou outro veículo compatível, conforme a ficha técnica. O processo deve controlar formação de grumos, sedimentação, cor, odor e impacto sobre a viscosidade e a preservação.',
    'Extrato botânico seco de camomila para dispersões cosméticas',
    'Compartilhe o desafio técnico no Formulário de Atendimento e avance com a orientação da equipe Lipid.',
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
  VALUES (gen_random_uuid()::text, '211150.09.2',
          (SELECT id FROM ingredients WHERE slug = 'chamomile-herbasec'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasec'),
          (SELECT id FROM tags WHERE slug = 'chamomile'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasec'),
          (SELECT id FROM tags WHERE slug = 'herbasec'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasec'),
          (SELECT id FROM tags WHERE slug = 'extrato-seco'))
  ON CONFLICT DO NOTHING;

  --  12. Arnica Montana Herbasec
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Arnica Montana Herbasec',
    'arnica-montana-herbasec',
    'Arnica Montana Herbasec é um extrato botânico seco da linha Herbasec®. O formato em pó concentra a matéria-prima vegetal e permite seu uso em formulações nas quais a forma sólida, a dispersibilidade e o controle de água são relevantes.

Pode ser pré-disperso em água, glicerina ou outro veículo compatível, conforme a ficha técnica. O processo deve controlar formação de grumos, sedimentação, cor, odor e impacto sobre a viscosidade e a preservação.',
    'Extrato botânico seco de arnica-montana para dispersões cosméticas',
    'Inclua este ingrediente no seu estudo: preencha o Formulário de Atendimento e apresente o contexto de uso.',
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
  VALUES (gen_random_uuid()::text, '201400.09.2',
          (SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasec'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasec'),
          (SELECT id FROM tags WHERE slug = 'arnica-montana'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasec'),
          (SELECT id FROM tags WHERE slug = 'herbasec'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'arnica-montana-herbasec'),
          (SELECT id FROM tags WHERE slug = 'extrato-seco'))
  ON CONFLICT DO NOTHING;

  --  13. Black Currant Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Black Currant Herbasol® Extract Glycerine SB',
    'black-currant-herbasol-extract-glycerine-sb',
    'Black Currant Herbasol® Extract Glycerine SB é um extrato botânico líquido de groselha-negra, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria- prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de groselha-negra para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '400807.25000',
          (SELECT id FROM ingredients WHERE slug = 'black-currant-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'black-currant-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'black-currant'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'black-currant-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'black-currant-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'black-currant-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --  14. Agave Organic Herbasol® Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Agave Organic Herbasol® Extract Glycerine SB',
    'agave-organic-herbasol-extract-glycerine-sb',
    'Agave Organic Herbasol® Extract Glycerine SB é um extrato botânico líquido de agave, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de agave para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '400893',
          (SELECT id FROM ingredients WHERE slug = 'agave-organic-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'agave-organic-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'agave-organic'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'agave-organic-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'agave-organic-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'agave-organic-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --  15. Cocos fruit Herbasol(R) Extract Glycerine
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cocos fruit Herbasol(R) Extract Glycerine',
    'cocos-fruit-herbasolr-extract-glycerine',
    'Cocos fruit Herbasol(R) Extract Glycerine é um extrato botânico líquido de fruto de coco, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de fruto de coco para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '410271',
          (SELECT id FROM ingredients WHERE slug = 'cocos-fruit-herbasolr-extract-glycerine'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cocos-fruit-herbasolr-extract-glycerine'),
          (SELECT id FROM tags WHERE slug = 'cocos-fruit'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cocos-fruit-herbasolr-extract-glycerine'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cocos-fruit-herbasolr-extract-glycerine'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cocos-fruit-herbasolr-extract-glycerine'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --  16. Moringa Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Moringa Pro',
    'moringa-pro',
    'Moringa Pro é um extrato aquoso-glicerinado de folhas orgânicas de moringa, hidrossolúvel e pertencente à linha Herbasol® Pro. O ativo foi desenvolvido para aplicações de cuidado calmante, suporte à regeneração e proteção do couro cabeludo e da pele.

Pode ser avaliado em séruns, géis, emulsões e produtos capilares. A formulação deve controlar pH, temperatura, preservação, cor, odor e compatibilidade com os demais ativos, especialmente em sistemas destinados a pele ou couro cabeludo sensíveis.',
    'Extrato substanciado de folha de moringa para conforto e recuperação da pele',
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
  VALUES (gen_random_uuid()::text, '410159.5000',
          (SELECT id FROM ingredients WHERE slug = 'moringa-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410159.10000',
          (SELECT id FROM ingredients WHERE slug = 'moringa-pro'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410159.25000',
          (SELECT id FROM ingredients WHERE slug = 'moringa-pro'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'moringa-pro'),
          (SELECT id FROM tags WHERE slug = 'moringa'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'moringa-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  17. Rosemary Herbasol Extract PG unpreserved
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Rosemary Herbasol Extract PG unpreserved',
    'rosemary-herbasol-extract-pg-unpreserved',
    'Rosemary Herbasol Extract PG unpreserved é um extrato botânico líquido de alecrim em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de alecrim em propilenoglicol para formulações de fase aquosa',
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
  VALUES (gen_random_uuid()::text, '400565',
          (SELECT id FROM ingredients WHERE slug = 'rosemary-herbasol-extract-pg-unpreserved'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rosemary-herbasol-extract-pg-unpreserved'),
          (SELECT id FROM tags WHERE slug = 'rosemary'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rosemary-herbasol-extract-pg-unpreserved'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rosemary-herbasol-extract-pg-unpreserved'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'rosemary-herbasol-extract-pg-unpreserved'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --  18. Lemon Herbasol Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lemon Herbasol Extract Glycerine SB',
    'lemon-herbasol-extract-glycerine-sb',
    'Lemon Herbasol Extract Glycerine SB é um extrato botânico líquido de limão, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de limão para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '400477',
          (SELECT id FROM ingredients WHERE slug = 'lemon-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lemon-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'lemon'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lemon-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lemon-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lemon-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --  19. Blackcurrant Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Blackcurrant Pro',
    'blackcurrant-pro',
    'Blackcurrant Pro é um extrato aquoso-glicerinado de folhas orgânicas de groselha-negra, hidrossolúvel e integrante da linha Herbasol® Pro. O ingrediente apresenta eficácia avaliada para aplicações calmantes e de suporte ao equilíbrio de peles sensibilizadas.

Pode ser empregado no desenvolvimento de séruns, géis, emulsões, produtos pós-limpeza e cuidados capilares. A etapa de adição deve considerar temperatura moderada, pH, sistema conservante e estabilidade de cor e odor.',
    'Extrato substanciado de groselha-negra para conforto de pele sensível',
    'Transforme a necessidade da formulação em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '410156.5000',
          (SELECT id FROM ingredients WHERE slug = 'blackcurrant-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410156.25000',
          (SELECT id FROM ingredients WHERE slug = 'blackcurrant-pro'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'blackcurrant-pro'),
          (SELECT id FROM tags WHERE slug = 'blackcurrant'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'blackcurrant-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  20. Moringuard
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Moringuard',
    'moringuard',
    'Moringuard é um ativo aquoso-glicerinado e hidrossolúvel obtido de torta de sementes de moringa reaproveitada, proveniente de fonte rastreável. A preparação é sem conservante adicionado e foi desenvolvida para ajudar a proteger a pele frente a vermelhidão, irritação, estresse oxidativo e comprometimento da barreira.

Pode ser estudado em séruns, géis, emulsões e produtos capilares voltados à recuperação e ao conforto.

A incorporação deve ocorrer em condições moderadas, com controle de pH, eletrólitos, preservação e compatibilidade com lipídios de barreira e demais ativos.',
    'Extrato de semente de moringa para proteção, conforto e suporte à barreira',
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
  VALUES (gen_random_uuid()::text, '410453.30',
          (SELECT id FROM ingredients WHERE slug = 'moringuard'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410453.5000',
          (SELECT id FROM ingredients WHERE slug = 'moringuard'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410453.25000',
          (SELECT id FROM ingredients WHERE slug = 'moringuard'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'moringuard'),
          (SELECT id FROM tags WHERE slug = 'moringuard'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'moringuard'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  21. Mountain Tea Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Mountain Tea Pro',
    'mountain-tea-pro',
    'Mountain Tea Pro é um extrato aquoso-glicerinado, hidrossolúvel e sem conservante adicionado, obtido da erva orgânica Sideritis scardica. Pertence à linha Herbasol® Pro e foi desenvolvido para formulações associadas à proteção antioxidante, recuperação e bem-estar da pele.

Pode ser considerado em séruns, essências, géis e emulsões de cuidado diurno ou noturno. Recomenda- se incorporação em condições moderadas de temperatura e cisalhamento, com avaliação de pH, preservação e estabilidade no sistema completo.',
    'Extrato substanciado de chá-da-montanha para proteção antioxidante e regeneração',
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
  VALUES (gen_random_uuid()::text, '410314.5000',
          (SELECT id FROM ingredients WHERE slug = 'mountain-tea-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410314.10000',
          (SELECT id FROM ingredients WHERE slug = 'mountain-tea-pro'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410314.25000',
          (SELECT id FROM ingredients WHERE slug = 'mountain-tea-pro'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410314.50000',
          (SELECT id FROM ingredients WHERE slug = 'mountain-tea-pro'), 3)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410314.100000',
          (SELECT id FROM ingredients WHERE slug = 'mountain-tea-pro'), 4)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mountain-tea-pro'),
          (SELECT id FROM tags WHERE slug = 'mountain-tea'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mountain-tea-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  22. Wheat Placenta Cos
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Wheat Placenta Cos',
    'wheat-placenta-cos',
    'Wheat Placenta Cos é um extrato concentrado e fracionado de farelo de trigo, apresentado em sistema aquoso com propilenoglicol. A denominação comercial se refere a um complexo vegetal desenvolvido para oferecer propriedades cosméticas semelhantes às associadas a preparações de placenta, sem indicar material placentário de origem animal.

Pode ser avaliado em séruns, emulsões, máscaras e produtos capilares com propostas de proteção e regeneração. A formulação deve considerar pH, compatibilidade com polímeros e tensoativos, sistema conservante e estabilidade de cor e odor.',
    'Extrato concentrado de farelo de trigo para proteção e regeneração cosmética',
    'Comece a análise deste ingrediente pelo Formulário de Atendimento e detalhe a aplicação pretendida.',
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
  VALUES (gen_random_uuid()::text, '150160.5000',
          (SELECT id FROM ingredients WHERE slug = 'wheat-placenta-cos'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '150160.10000',
          (SELECT id FROM ingredients WHERE slug = 'wheat-placenta-cos'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wheat-placenta-cos'),
          (SELECT id FROM tags WHERE slug = 'proteinas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wheat-placenta-cos'),
          (SELECT id FROM tags WHERE slug = 'peptideos'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wheat-placenta-cos'),
          (SELECT id FROM tags WHERE slug = 'trigo'))
  ON CONFLICT DO NOTHING;

  --  23. Raspberry Herbasol Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Raspberry Herbasol Eco',
    'raspberry-herbasol-eco',
    'Raspberry Herbasol Eco integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de framboesa para formulações de posicionamento natural',
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
  VALUES (gen_random_uuid()::text, '410058.5000',
          (SELECT id FROM ingredients WHERE slug = 'raspberry-herbasol-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410058.10000',
          (SELECT id FROM ingredients WHERE slug = 'raspberry-herbasol-eco'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'raspberry-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'raspberry'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'raspberry-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'raspberry-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'raspberry-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  24. Cherry Blossom (FR) Herbasol Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cherry Blossom (FR) Herbasol Eco',
    'cherry-blossom-fr-herbasol-eco',
    'Cherry Blossom (FR) Herbasol Eco integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de flor de cerejeira para formulações de posicionamento natural',
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
  VALUES (gen_random_uuid()::text, '410060.5000',
          (SELECT id FROM ingredients WHERE slug = 'cherry-blossom-fr-herbasol-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410060.10000',
          (SELECT id FROM ingredients WHERE slug = 'cherry-blossom-fr-herbasol-eco'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cherry-blossom-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'cherry-blossom'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cherry-blossom-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cherry-blossom-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cherry-blossom-fr-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  25. Lavender Herbasol Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lavender Herbasol Eco',
    'lavender-herbasol-eco',
    'Lavender Herbasol Eco integra uma linha de extratos botânicos desenvolvida para projetos cosméticos de posicionamento natural. O nome comercial identifica a origem vegetal e a família de processamento, que devem ser relacionadas à documentação técnica vigente.

Pode ser estudado em séruns, géis, emulsões e produtos capilares. A formulação deve confirmar solubilidade, pH, preservação, cor, odor e etapa de adição antes do escalonamento.',
    'Extrato de lavanda para formulações de posicionamento natural',
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
  VALUES (gen_random_uuid()::text, '410061.5000',
          (SELECT id FROM ingredients WHERE slug = 'lavender-herbasol-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410061.10000',
          (SELECT id FROM ingredients WHERE slug = 'lavender-herbasol-eco'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lavender-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'lavender'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lavender-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lavender-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lavender-herbasol-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  26. Centella Asiatica (Gotu Kola) Herbasec
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Centella Asiatica (Gotu Kola) Herbasec',
    'centella-asiatica-gotu-kola-herbasec',
    'Centella Asiatica (Gotu Kola) Herbasec é um extrato botânico seco da linha Herbasec®. O formato em pó concentra a matéria-prima vegetal e permite seu uso em formulações nas quais a forma sólida, a dispersibilidade e o controle de água são relevantes.

Pode ser pré-disperso em água, glicerina ou outro veículo compatível, conforme a ficha técnica. O processo deve controlar formação de grumos, sedimentação, cor, odor e impacto sobre a viscosidade e a preservação.',
    'Extrato botânico seco de centella asiática para dispersões cosméticas',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
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
  VALUES (gen_random_uuid()::text, '203120.09.2.25000',
          (SELECT id FROM ingredients WHERE slug = 'centella-asiatica-gotu-kola-herbasec'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '203120.09.2.50000',
          (SELECT id FROM ingredients WHERE slug = 'centella-asiatica-gotu-kola-herbasec'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '203120.09.2.10000',
          (SELECT id FROM ingredients WHERE slug = 'centella-asiatica-gotu-kola-herbasec'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'centella-asiatica-gotu-kola-herbasec'),
          (SELECT id FROM tags WHERE slug = 'centella-asiatica-gotu-kola'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'centella-asiatica-gotu-kola-herbasec'),
          (SELECT id FROM tags WHERE slug = 'herbasec'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'centella-asiatica-gotu-kola-herbasec'),
          (SELECT id FROM tags WHERE slug = 'extrato-seco'))
  ON CONFLICT DO NOTHING;

  --  27. Cashew Apple Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cashew Apple Pro',
    'cashew-apple-pro',
    'Cashew Apple Pro é um extrato aquoso-glicerinado e hidrossolúvel obtido de pedúnculos orgânicos de caju provenientes de uma cadeia de aproveitamento e comércio justo. A preparação é sem conservante adicionado e integra a linha Herbasol® Pro, com eficácia avaliada para hidratação, firmeza e uniformidade visual da pele.

Pode ser estudado em séruns, géis, emulsões e máscaras faciais. A incorporação deve preservar a integridade do extrato, com controle de temperatura, pH, eletrólitos, sistema conservante e compatibilidade com polímeros e outros ativos.',
    'Extrato substanciado de caju para hidratação, firmeza e vitalidade',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e envie os requisitos técnicos.',
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
  VALUES (gen_random_uuid()::text, '410435.5000',
          (SELECT id FROM ingredients WHERE slug = 'cashew-apple-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410435.10000',
          (SELECT id FROM ingredients WHERE slug = 'cashew-apple-pro'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410435.25000',
          (SELECT id FROM ingredients WHERE slug = 'cashew-apple-pro'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410435.50000',
          (SELECT id FROM ingredients WHERE slug = 'cashew-apple-pro'), 3)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410435.100000',
          (SELECT id FROM ingredients WHERE slug = 'cashew-apple-pro'), 4)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cashew-apple-pro'),
          (SELECT id FROM tags WHERE slug = 'cashew-apple'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cashew-apple-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  28. Water Lily Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Water Lily Pro',
    'water-lily-pro',
    'Water Lily Pro é um extrato aquoso em propilenoglicol obtido da raiz de nenúfar-branco, hidrossolúvel e sem conservante adicionado. Integra a linha Herbasol® Pro e foi desenvolvido para aplicações de cuidado do cabelo e couro cabeludo, incluindo condicionamento, resistência e otimização de volume.

Pode ser avaliado em shampoos, condicionadores, máscaras, tônicos e produtos leave-in. A formulação deve verificar compatibilidade com tensoativos, polímeros catiônicos, eletrólitos e fragrâncias, além de controlar pH e estabilidade.',
    'Extrato substanciado de raiz de nenúfar para cuidado, força e volume capilar',
    'Transforme a necessidade da formulação em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '410259.5000',
          (SELECT id FROM ingredients WHERE slug = 'water-lily-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410259.10000',
          (SELECT id FROM ingredients WHERE slug = 'water-lily-pro'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410259.25000',
          (SELECT id FROM ingredients WHERE slug = 'water-lily-pro'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410259.50000',
          (SELECT id FROM ingredients WHERE slug = 'water-lily-pro'), 3)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410259.100000',
          (SELECT id FROM ingredients WHERE slug = 'water-lily-pro'), 4)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'water-lily-pro'),
          (SELECT id FROM tags WHERE slug = 'water-lily'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'water-lily-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  29. Açai Herbasol Extract Glycerine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Açai Herbasol Extract Glycerine SB',
    'acai-herbasol-extract-glycerine-sb',
    'Açai Herbasol Extract Glycerine SB é um extrato botânico líquido de açaí, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de açaí para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '400874.25000',
          (SELECT id FROM ingredients WHERE slug = 'acai-herbasol-extract-glycerine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400874.50000',
          (SELECT id FROM ingredients WHERE slug = 'acai-herbasol-extract-glycerine-sb'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400874.100000',
          (SELECT id FROM ingredients WHERE slug = 'acai-herbasol-extract-glycerine-sb'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'acai-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'acai'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'acai-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'acai-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'acai-herbasol-extract-glycerine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

  --  30. Vine Leaves Herbasol® Extract PG (PF)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Vine Leaves Herbasol® Extract PG (PF)',
    'vine-leaves-herbasol-extract-pg-pf',
    'Vine Leaves Herbasol® Extract PG (PF) é um extrato botânico líquido de folhas de videira em propilenoglicol e água, sem conservante adicionado. A apresentação polar favorece sua avaliação em sistemas aquosos e emulsões, mantendo definida a identidade do extrato e do veículo.

A incorporação deve ser planejada preferencialmente em etapa de baixa temperatura, com controle de pH, cor, odor e compatibilidade com o sistema conservante. A estabilidade precisa ser confirmada no produto completo.',
    'Extrato de folhas de videira em propilenoglicol para formulações de fase aquosa',
    'Avalie esta solução com apoio técnico: preencha o Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '218150.5000',
          (SELECT id FROM ingredients WHERE slug = 'vine-leaves-herbasol-extract-pg-pf'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '218150.10000',
          (SELECT id FROM ingredients WHERE slug = 'vine-leaves-herbasol-extract-pg-pf'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '218150.25000',
          (SELECT id FROM ingredients WHERE slug = 'vine-leaves-herbasol-extract-pg-pf'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '218150.50000',
          (SELECT id FROM ingredients WHERE slug = 'vine-leaves-herbasol-extract-pg-pf'), 3)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '218150.100000',
          (SELECT id FROM ingredients WHERE slug = 'vine-leaves-herbasol-extract-pg-pf'), 4)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vine-leaves-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'vine-leaves'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vine-leaves-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vine-leaves-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vine-leaves-herbasol-extract-pg-pf'),
          (SELECT id FROM tags WHERE slug = 'base-propilenoglicol'))
  ON CONFLICT DO NOTHING;

  --  31. Chamomile Herbasol® Extract IPM
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Chamomile Herbasol® Extract IPM',
    'chamomile-herbasol-extract-ipm',
    'Chamomile Herbasol® Extract IPM é um extrato botânico apresentado em miristato de isopropila, um veículo lipofílico. A forma comercial é indicada para projetos em que os constituintes extraídos e o sistema de incorporação devem permanecer compatíveis com a fase oleosa.

Pode ser trabalhado em emulsões, óleos, balms e produtos anidros. O desenvolvimento deve verificar solubilidade, oxidação, sensorial, compatibilidade com filtros e fragrâncias e estabilidade da emulsão.',
    'Extrato lipofílico de camomila em IPM para fases oleosas',
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
  VALUES (gen_random_uuid()::text, '211150.02.2',
          (SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-ipm'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'chamomile'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'chamomile-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'base-ipm'))
  ON CONFLICT DO NOTHING;

  --  32. Marigold (Calendula) Herbasol® Extract IPM
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Marigold (Calendula) Herbasol® Extract IPM',
    'marigold-calendula-herbasol-extract-ipm',
    'Marigold (Calendula) Herbasol® Extract IPM é um extrato botânico apresentado em miristato de isopropila, um veículo lipofílico. A forma comercial é indicada para projetos em que os constituintes extraídos e o sistema de incorporação devem permanecer compatíveis com a fase oleosa.

Pode ser trabalhado em emulsões, óleos, balms e produtos anidros. O desenvolvimento deve verificar solubilidade, oxidação, sensorial, compatibilidade com filtros e fragrâncias e estabilidade da emulsão.',
    'Extrato lipofílico de calêndula em IPM para fases oleosas',
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
  VALUES (gen_random_uuid()::text, '203050.02.2',
          (SELECT id FROM ingredients WHERE slug = 'marigold-calendula-herbasol-extract-ipm'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'marigold-calendula-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'marigold-calendula'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'marigold-calendula-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'marigold-calendula-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'marigold-calendula-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'base-ipm'))
  ON CONFLICT DO NOTHING;

  --  33. Carrot Herbasol® Ferment
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Carrot Herbasol® Ferment',
    'carrot-herbasol-ferment',
    'Carrot Herbasol® Ferment é uma preparação glicerinada e hidrossolúvel obtida por fermentação de raiz de cenoura. A linha Herbasol® Ferment utiliza materiais vegetais orgânicos e fornece metabólitos derivados da biotransformação, com preservação de origem natural.

Pode ser avaliado em séruns, géis, emulsões e produtos capilares voltados ao cuidado da barreira e do microbioma. A incorporação deve considerar temperatura moderada, pH, compatibilidade com conservantes e tensoativos e estabilidade microbiológica do produto final.',
    'Fermentado botânico de cenoura para vitalidade, luminosidade e suporte ao microbioma',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fermentados-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410470.5',
          (SELECT id FROM ingredients WHERE slug = 'carrot-herbasol-ferment'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410470.1',
          (SELECT id FROM ingredients WHERE slug = 'carrot-herbasol-ferment'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'carrot-herbasol-ferment'),
          (SELECT id FROM tags WHERE slug = 'carrot'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'carrot-herbasol-ferment'),
          (SELECT id FROM tags WHERE slug = 'fermentado-botanico'))
  ON CONFLICT DO NOTHING;

  --  34. Celery Herbasol® Ferment
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Celery Herbasol® Ferment',
    'celery-herbasol-ferment',
    'Celery Herbasol® Ferment é uma preparação glicerinada e hidrossolúvel obtida por fermentação de material vegetal de aipo. A linha Herbasol® Ferment utiliza materiais vegetais orgânicos e fornece metabólitos derivados da biotransformação, com preservação de origem natural.

Pode ser avaliado em séruns, géis, emulsões e produtos capilares voltados ao cuidado da barreira e do microbioma. A incorporação deve considerar temperatura moderada, pH, compatibilidade com conservantes e tensoativos e estabilidade microbiológica do produto final.',
    'Fermentado botânico de aipo para vitalidade e suporte ao equilíbrio da pele',
    'Leve este ingrediente para a próxima etapa: compartilhe o objetivo do projeto no Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fermentados-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410471.5',
          (SELECT id FROM ingredients WHERE slug = 'celery-herbasol-ferment'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410471.1',
          (SELECT id FROM ingredients WHERE slug = 'celery-herbasol-ferment'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'celery-herbasol-ferment'),
          (SELECT id FROM tags WHERE slug = 'celery'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'celery-herbasol-ferment'),
          (SELECT id FROM tags WHERE slug = 'fermentado-botanico'))
  ON CONFLICT DO NOTHING;

  --  35. Cucumber Herbasol® Ferment
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Cucumber Herbasol® Ferment',
    'cucumber-herbasol-ferment',
    'Cucumber Herbasol® Ferment é uma preparação glicerinada e hidrossolúvel obtida por fermentação de fruto de pepino. A linha Herbasol® Ferment utiliza materiais vegetais orgânicos e fornece metabólitos derivados da biotransformação, com preservação de origem natural.

Pode ser avaliado em séruns, géis, emulsões e produtos capilares voltados ao cuidado da barreira e do microbioma. A incorporação deve considerar temperatura moderada, pH, compatibilidade com conservantes e tensoativos e estabilidade microbiológica do produto final.',
    'Fermentado botânico de pepino para hidratação, conforto e suporte ao microbioma',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fermentados-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410469.5',
          (SELECT id FROM ingredients WHERE slug = 'cucumber-herbasol-ferment'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410469.1',
          (SELECT id FROM ingredients WHERE slug = 'cucumber-herbasol-ferment'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cucumber-herbasol-ferment'),
          (SELECT id FROM tags WHERE slug = 'cucumber'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'cucumber-herbasol-ferment'),
          (SELECT id FROM tags WHERE slug = 'fermentado-botanico'))
  ON CONFLICT DO NOTHING;

  --  36. Kimchi Herbasol® Ferment
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Kimchi Herbasol® Ferment',
    'kimchi-herbasol-ferment',
    'Kimchi Herbasol® Ferment é uma preparação glicerinada e hidrossolúvel obtida por fermentação de folhas de repolho fermentado. A linha Herbasol® Ferment utiliza materiais vegetais orgânicos e fornece metabólitos derivados da biotransformação, com preservação de origem natural.

Pode ser avaliado em séruns, géis, emulsões e produtos capilares voltados ao cuidado da barreira e do microbioma. A incorporação deve considerar temperatura moderada, pH, compatibilidade com conservantes e tensoativos e estabilidade microbiológica do produto final.',
    'Fermentado botânico de repolho fermentado para hidratação, vitalidade e suporte ao microbioma',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e envie os requisitos técnicos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fermentados-botanicos'),
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
  VALUES (gen_random_uuid()::text, '410459.5',
          (SELECT id FROM ingredients WHERE slug = 'kimchi-herbasol-ferment'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '410459.1',
          (SELECT id FROM ingredients WHERE slug = 'kimchi-herbasol-ferment'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'kimchi-herbasol-ferment'),
          (SELECT id FROM tags WHERE slug = 'kimchi'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'kimchi-herbasol-ferment'),
          (SELECT id FROM tags WHERE slug = 'fermentado-botanico'))
  ON CONFLICT DO NOTHING;

  --  37. Mallow Herbasol Extract Glyberine SB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Mallow Herbasol Extract Glyberine SB',
    'mallow-herbasol-extract-glyberine-sb',
    'Mallow Herbasol Extract Glyberine SB é um extrato botânico líquido de malva, apresentado em glicerina e água, em sistema glicerinado. A denominação comercial identifica a matéria-prima e o veículo, permitindo selecionar o ingrediente de acordo com a polaridade e o perfil de processo.

Pode ser avaliado em séruns, géis, emulsões, produtos de limpeza e cuidados capilares. A incorporação deve considerar pH, temperatura, cor, odor, compatibilidade com conservantes e estabilidade ao longo do armazenamento.',
    'Extrato glicerinado de malva para sistemas cosméticos aquosos',
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
  VALUES (gen_random_uuid()::text, '400158.116.2',
          (SELECT id FROM ingredients WHERE slug = 'mallow-herbasol-extract-glyberine-sb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mallow-herbasol-extract-glyberine-sb'),
          (SELECT id FROM tags WHERE slug = 'mallow'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mallow-herbasol-extract-glyberine-sb'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mallow-herbasol-extract-glyberine-sb'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'mallow-herbasol-extract-glyberine-sb'),
          (SELECT id FROM tags WHERE slug = 'base-glicerinada'))
  ON CONFLICT DO NOTHING;

END $$;

COMMIT;
