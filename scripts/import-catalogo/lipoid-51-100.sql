-- Catálogo de ingredientes — LIPOID
-- GERADO por scripts/import-catalogo/importar_catalogo.py — não editar à mão.
-- Fontes: Orientação para Cadastrar no Site.xlsx + LIPOID_Produtos_51-100.pdf
-- 45 produtos · 18 categorias · 57 tags · 56 códigos comerciais
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
  VALUES (gen_random_uuid()::text, 'Alfa-hidroxiácidos', 'alfa-hidroxiacidos', 0, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos botânicos', 'ativos-botanicos', 1, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos cosméticos', 'ativos-cosmeticos', 2, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos de proteção cutânea', 'ativos-de-protecao-cutanea', 3, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos hidratantes', 'ativos-hidratantes', 4, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos para uniformização do tom', 'ativos-para-uniformizacao-do-tom', 5, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Bases lamelares', 'bases-lamelares', 6, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Esfoliantes e partículas cosméticas', 'esfoliantes-e-particulas-cosmeticas', 7, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extratos botânicos', 'extratos-botanicos', 8, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfatidilserinas', 'fosfatidilserinas', 9, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfolipídios PEGuilados', 'fosfolipidios-peguilados', 10, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lipídios catiônicos', 'lipidios-cationicos', 11, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Padrões analíticos', 'padroes-analiticos', 12, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteínas e peptídeos cosméticos', 'proteinas-e-peptideos-cosmeticos', 13, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sistemas de encapsulação', 'sistemas-de-encapsulacao', 14, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sistemas de solubilização', 'sistemas-de-solubilizacao', 15, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sistemas lipossomais', 'sistemas-lipossomais', 16, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vitaminas e carotenoides', 'vitaminas-e-carotenoides', 17, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();

  -- ---------- tags
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'AHA', 'aha', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Alfa-hidroxiácidos', 'alfa-hidroxiacidos', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Antioxidantes', 'antioxidantes', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Argan Oil', 'argan-oil', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Astaxantina', 'astaxantina', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativo botânico', 'ativo-botanico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativo cosmético', 'ativo-cosmetico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Bamboo', 'bamboo', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Base IPM', 'base-ipm', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Base lamelar', 'base-lamelar', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Citrolumine', 'citrolumine', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Coenzima Q10', 'coenzima-q10', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Colágeno', 'colageno', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Controle analítico', 'controle-analitico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'DOTAP', 'dotap', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Depigmentation Factor', 'depigmentation-factor', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Encapsulação', 'encapsulacao', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Esfoliação', 'esfoliacao', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Estrutura biomimética', 'estrutura-biomimetica', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Extrato botânico', 'extrato-botanico', now())
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
  VALUES (gen_random_uuid()::text, 'Fosfatidilserina', 'fosfatidilserina', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfolipídio PEGuilado', 'fosfolipidio-peguilado', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Fosfolipídios', 'fosfolipidios', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Herbasol', 'herbasol', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Hidratação', 'hidratacao', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Hydro-Gain', 'hydro-gain', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ingrediente tecnológico', 'ingrediente-tecnologico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Iogurte', 'iogurte', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Linha Eco', 'linha-eco', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lipossomas', 'lipossomas', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Lipídio catiônico', 'lipidio-cationico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Matico', 'matico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Origem natural', 'origem-natural', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'PEG 2000', 'peg-2000', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'PEGuilado', 'peguilado', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'PS', 'ps', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Padrão de referência', 'padrao-de-referencia', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Partículas naturais', 'particulas-naturais', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Peptídeos', 'peptideos', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'PhytoSolve', 'phytosolve', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteção cutânea', 'protecao-cutanea', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteína láctea', 'proteina-lactea', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Proteínas', 'proteinas', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Sistema de entrega', 'sistema-de-entrega', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Solubilização lipídica', 'solubilizacao-lipidica', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Tagua', 'tagua', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Trigo', 'trigo', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ultraspheres 8022 (Retinol)', 'ultraspheres-8022-retinol', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ultraspheres ACE', 'ultraspheres-ace', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Uniformização do tom', 'uniformizacao-do-tom', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vitamina C', 'vitamina-c', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vitamina F', 'vitamina-f', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vitaminas', 'vitaminas', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'usNeo', 'usneo', now())
  ON CONFLICT (slug) DO NOTHING;

  -- ---------- produtos

  --   1. LIPOID PS 18:1/18:1 (DOPS-NA)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID PS 18:1/18:1 (DOPS-NA)',
    'lipoid-ps-181181-dops-na',
    'LIPOID PS 18:1/18:1 (DOPS-NA) corresponde a 1,2-dioleoil-sn-glicero-3-fosfo-L-serina, sal de sódio.

Trata-se de um fosfolipídio do tipo fosfatidilserina aniônica, com composição molecular definida, característica que permite controlar de forma mais reprodutível a organização, a carga superficial e as propriedades da fase lipídica.

Na formulação, é utilizado em desenvolvimento de membranas definidas e sistemas lipídicos especializados. O comprimento e o grau de insaturação das cadeias influenciam fluidez, temperatura de transição e permeabilidade da membrana; esses parâmetros devem ser combinados com colesterol, lipídios auxiliares, tampão e método de processamento conforme o desempenho pretendido.

Código(s) comercial(is): 567600. A seleção do grau, a pureza, o perfil de impurezas e as condições de armazenamento devem seguir a documentação vigente, especialmente em aplicações farmacêuticas e nanoparticuladas.

Leve este ingrediente para a próxima etapa: preencha o Formulário de Atendimento e apresente o objetivo da sua formulação.

Base técnica: Lista de Produtos LIPID e Lipoid Product Finder. Confirmar grau, composição, limites analíticos e processo na ficha técnica e no CoA vigentes.

LIPID - Produtos tecnológicos Lipoid',
    'Fosfatidilserina aniônica com cadeias insaturadas para sistemas lipídicos de composição controlada',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfatidilserinas'),
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
  VALUES (gen_random_uuid()::text, '567600',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-ps-181181-dops-na'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-ps-181181-dops-na'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilserina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-ps-181181-dops-na'),
          (SELECT id FROM tags WHERE slug = 'ps'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-ps-181181-dops-na'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --   2. Lipoid S PC RS
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid S PC RS',
    'lipoid-s-pc-rs',
    'Lipoid S PC RS é um padrão de referência qualificado associado ao analito Lipoid S PC. Sua finalidade é fornecer um material rastreável para métodos de identificação, teor, pureza e perfil de componentes em matérias-primas e produtos que contenham fosfolipídios.

No laboratório, pode apoiar preparo de soluções padrão, curvas de calibração, adequabilidade do sistema e verificação de métodos cromatográficos ou outros procedimentos validados. O valor atribuído, a incerteza, a correção de teor e as condições de manuseio devem ser obtidos no certificado específico do lote.

Código comercial: 579209. Este material é destinado ao controle analítico e não à incorporação em formulações.

Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento para avançar.

Base técnica: Lista de Produtos LIPID e informações institucionais da Lipoid sobre padrões de referência qualificados. Usar o certificado específico do lote.

LIPID - Produtos tecnológicos Lipoid',
    'Padrão qualificado para controle analítico de fosfolipídios',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'padroes-analiticos'),
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
  VALUES (gen_random_uuid()::text, '579209',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-rs'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-rs'),
          (SELECT id FROM tags WHERE slug = 'padrao-de-referencia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-rs'),
          (SELECT id FROM tags WHERE slug = 'controle-analitico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-rs'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilcolina'))
  ON CONFLICT DO NOTHING;

  --   3. Lipoid S LPC RS
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid S LPC RS',
    'lipoid-s-lpc-rs',
    'Lipoid S LPC RS é um padrão de referência qualificado associado ao analito Lipoid S LPC. Sua finalidade é fornecer um material rastreável para métodos de identificação, teor, pureza e perfil de componentes em matérias-primas e produtos que contenham fosfolipídios.

No laboratório, pode apoiar preparo de soluções padrão, curvas de calibração, adequabilidade do sistema e verificação de métodos cromatográficos ou outros procedimentos validados. O valor atribuído, a incerteza, a correção de teor e as condições de manuseio devem ser obtidos no certificado específico do lote.

Código comercial: 586509. Este material é destinado ao controle analítico e não à incorporação em formulações.

Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e compartilhe os requisitos do projeto.

Base técnica: Lista de Produtos LIPID e informações institucionais da Lipoid sobre padrões de referência qualificados. Usar o certificado específico do lote.

LIPID - Produtos tecnológicos Lipoid',
    'Padrão qualificado para controle analítico de fosfolipídios',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'padroes-analiticos'),
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
  VALUES (gen_random_uuid()::text, '586509',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-s-lpc-rs'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-lpc-rs'),
          (SELECT id FROM tags WHERE slug = 'padrao-de-referencia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-lpc-rs'),
          (SELECT id FROM tags WHERE slug = 'controle-analitico'))
  ON CONFLICT DO NOTHING;

  --   4. LIPOID S PC-3 RS
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID S PC-3 RS',
    'lipoid-s-pc-3-rs',
    'LIPOID S PC-3 RS é um padrão de referência qualificado associado ao analito LIPOID S PC-3. Sua finalidade é fornecer um material rastreável para métodos de identificação, teor, pureza e perfil de componentes em matérias-primas e produtos que contenham fosfolipídios.

No laboratório, pode apoiar preparo de soluções padrão, curvas de calibração, adequabilidade do sistema e verificação de métodos cromatográficos ou outros procedimentos validados. O valor atribuído, a incerteza, a correção de teor e as condições de manuseio devem ser obtidos no certificado específico do lote.

Código comercial: 525609. Este material é destinado ao controle analítico e não à incorporação em formulações.

Transforme a necessidade técnica em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.

Base técnica: Lista de Produtos LIPID e informações institucionais da Lipoid sobre padrões de referência qualificados. Usar o certificado específico do lote.

LIPID - Produtos tecnológicos Lipoid',
    'Padrão qualificado para controle analítico de fosfolipídios',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'padroes-analiticos'),
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
  VALUES (gen_random_uuid()::text, '525609',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-3-rs'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-3-rs'),
          (SELECT id FROM tags WHERE slug = 'padrao-de-referencia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-pc-3-rs'),
          (SELECT id FROM tags WHERE slug = 'controle-analitico'))
  ON CONFLICT DO NOTHING;

  --   5. LIPOID S LPC-3 RS
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID S LPC-3 RS',
    'lipoid-s-lpc-3-rs',
    'LIPOID S LPC-3 RS é um padrão de referência qualificado associado ao analito LIPOID S LPC-3. Sua finalidade é fornecer um material rastreável para métodos de identificação, teor, pureza e perfil de componentes em matérias-primas e produtos que contenham fosfolipídios.

No laboratório, pode apoiar preparo de soluções padrão, curvas de calibração, adequabilidade do sistema e verificação de métodos cromatográficos ou outros procedimentos validados. O valor atribuído, a incerteza, a correção de teor e as condições de manuseio devem ser obtidos no certificado específico do lote.

Código comercial: 526309. Este material é destinado ao controle analítico e não à incorporação em formulações.

Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.

Base técnica: Lista de Produtos LIPID e informações institucionais da Lipoid sobre padrões de referência qualificados. Usar o certificado específico do lote.

LIPID - Produtos tecnológicos Lipoid',
    'Padrão qualificado para controle analítico de fosfolipídios',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'padroes-analiticos'),
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
  VALUES (gen_random_uuid()::text, '526309',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-s-lpc-3-rs'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-lpc-3-rs'),
          (SELECT id FROM tags WHERE slug = 'padrao-de-referencia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-s-lpc-3-rs'),
          (SELECT id FROM tags WHERE slug = 'controle-analitico'))
  ON CONFLICT DO NOTHING;

  --   6. LIPOID PE 18:0/18:0 - PEG 2000 RS
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID PE 18:0/18:0 - PEG 2000 RS',
    'lipoid-pe-180180-peg-2000-rs',
    'LIPOID PE 18:0/18:0 - PEG 2000 RS é um padrão de referência qualificado associado ao analito LIPOID PE 18:0/18:0 - PEG 2000. Sua finalidade é fornecer um material rastreável para métodos de identificação, teor, pureza e perfil de componentes em matérias-primas e produtos que contenham fosfolipídios.

No laboratório, pode apoiar preparo de soluções padrão, curvas de calibração, adequabilidade do sistema e verificação de métodos cromatográficos ou outros procedimentos validados. O valor atribuído, a incerteza, a correção de teor e as condições de manuseio devem ser obtidos no certificado específico do lote.

Código comercial: 588209. Este material é destinado ao controle analítico e não à incorporação em formulações.

Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o seu projeto.

Base técnica: Lista de Produtos LIPID e informações institucionais da Lipoid sobre padrões de referência qualificados. Usar o certificado específico do lote.

LIPID - Produtos tecnológicos Lipoid',
    'Padrão qualificado para controle analítico de fosfolipídios',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'padroes-analiticos'),
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
  VALUES (gen_random_uuid()::text, '588209',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-peg-2000-rs'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-peg-2000-rs'),
          (SELECT id FROM tags WHERE slug = 'padrao-de-referencia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-peg-2000-rs'),
          (SELECT id FROM tags WHERE slug = 'controle-analitico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-peg-2000-rs'),
          (SELECT id FROM tags WHERE slug = 'peguilado'))
  ON CONFLICT DO NOTHING;

  --   7. LIPOID PG 18:0/18:0 RS - DSPG-Na
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID PG 18:0/18:0 RS - DSPG-Na',
    'lipoid-pg-180180-rs-dspg-na',
    'LIPOID PG 18:0/18:0 RS - DSPG-Na é um padrão de referência qualificado associado ao analito LIPOID PG 18:0/18:0 - DSPG-Na. Sua finalidade é fornecer um material rastreável para métodos de identificação, teor, pureza e perfil de componentes em matérias-primas e produtos que contenham fosfolipídios.

No laboratório, pode apoiar preparo de soluções padrão, curvas de calibração, adequabilidade do sistema e verificação de métodos cromatográficos ou outros procedimentos validados. O valor atribuído, a incerteza, a correção de teor e as condições de manuseio devem ser obtidos no certificado específico do lote.

Código comercial: 560409. Este material é destinado ao controle analítico e não à incorporação em formulações.

Para discutir compatibilidade, grau e aplicação, preencha o Formulário de Atendimento.

Base técnica: Lista de Produtos LIPID e informações institucionais da Lipoid sobre padrões de referência qualificados. Usar o certificado específico do lote.

LIPID - Produtos tecnológicos Lipoid',
    'Padrão qualificado para controle analítico de fosfolipídios',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'padroes-analiticos'),
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
  VALUES (gen_random_uuid()::text, '560409',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pg-180180-rs-dspg-na'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-180180-rs-dspg-na'),
          (SELECT id FROM tags WHERE slug = 'padrao-de-referencia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-180180-rs-dspg-na'),
          (SELECT id FROM tags WHERE slug = 'controle-analitico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-180180-rs-dspg-na'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilglicerol'))
  ON CONFLICT DO NOTHING;

  --   8. LIPOID PG 18:0/0 RS - LSPG-Na
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID PG 18:0/0 RS - LSPG-Na',
    'lipoid-pg-1800-rs-lspg-na',
    'LIPOID PG 18:0/0 RS - LSPG-Na é um padrão de referência qualificado associado ao analito LIPOID PG 18:0/0 - LSPG-Na. Sua finalidade é fornecer um material rastreável para métodos de identificação, teor, pureza e perfil de componentes em matérias-primas e produtos que contenham fosfolipídios.

No laboratório, pode apoiar preparo de soluções padrão, curvas de calibração, adequabilidade do sistema e verificação de métodos cromatográficos ou outros procedimentos validados. O valor atribuído, a incerteza, a correção de teor e as condições de manuseio devem ser obtidos no certificado específico do lote.

Código comercial: 564409. Este material é destinado ao controle analítico e não à incorporação em formulações.

Aproxime este ingrediente da sua formulação. Envie o Formulário de Atendimento para iniciar a análise técnica.

Base técnica: Lista de Produtos LIPID e informações institucionais da Lipoid sobre padrões de referência qualificados. Usar o certificado específico do lote.

LIPID - Produtos tecnológicos Lipoid',
    'Padrão qualificado para controle analítico de fosfolipídios',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'padroes-analiticos'),
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
  VALUES (gen_random_uuid()::text, '564409',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pg-1800-rs-lspg-na'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-1800-rs-lspg-na'),
          (SELECT id FROM tags WHERE slug = 'padrao-de-referencia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-1800-rs-lspg-na'),
          (SELECT id FROM tags WHERE slug = 'controle-analitico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pg-1800-rs-lspg-na'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilglicerol'))
  ON CONFLICT DO NOTHING;

  --   9. LIPOID PC 16:0/0 RS - LPPC
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID PC 16:0/0 RS - LPPC',
    'lipoid-pc-1600-rs-lppc',
    'LIPOID PC 16:0/0 RS - LPPC é um padrão de referência qualificado associado ao analito LIPOID PC 16:0/0 - LPPC. Sua finalidade é fornecer um material rastreável para métodos de identificação, teor, pureza e perfil de componentes em matérias-primas e produtos que contenham fosfolipídios.

No laboratório, pode apoiar preparo de soluções padrão, curvas de calibração, adequabilidade do sistema e verificação de métodos cromatográficos ou outros procedimentos validados. O valor atribuído, a incerteza, a correção de teor e as condições de manuseio devem ser obtidos no certificado específico do lote.

Código comercial: 551309. Este material é destinado ao controle analítico e não à incorporação em formulações.

Compartilhe o desafio da sua formulação no Formulário de Atendimento e avance com o suporte da equipe Lipid.

Base técnica: Lista de Produtos LIPID e informações institucionais da Lipoid sobre padrões de referência qualificados. Usar o certificado específico do lote.

LIPID - Produtos tecnológicos Lipoid',
    'Padrão qualificado para controle analítico de fosfolipídios',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'padroes-analiticos'),
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
  VALUES (gen_random_uuid()::text, '551309',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pc-1600-rs-lppc'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-1600-rs-lppc'),
          (SELECT id FROM tags WHERE slug = 'padrao-de-referencia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-1600-rs-lppc'),
          (SELECT id FROM tags WHERE slug = 'controle-analitico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-1600-rs-lppc'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilcolina'))
  ON CONFLICT DO NOTHING;

  --  10. LIPOID PC 18:0/0 RS - LSPC
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID PC 18:0/0 RS - LSPC',
    'lipoid-pc-1800-rs-lspc',
    'LIPOID PC 18:0/0 RS - LSPC é um padrão de referência qualificado associado ao analito LIPOID PC 18:0/0 - LSPC. Sua finalidade é fornecer um material rastreável para métodos de identificação, teor, pureza e perfil de componentes em matérias-primas e produtos que contenham fosfolipídios.

No laboratório, pode apoiar preparo de soluções padrão, curvas de calibração, adequabilidade do sistema e verificação de métodos cromatográficos ou outros procedimentos validados. O valor atribuído, a incerteza, a correção de teor e as condições de manuseio devem ser obtidos no certificado específico do lote.

Código comercial: 551409. Este material é destinado ao controle analítico e não à incorporação em formulações.

Pronto para estudar esta solução? Preencha o Formulário de Atendimento e dê contexto ao seu desenvolvimento.

Base técnica: Lista de Produtos LIPID e informações institucionais da Lipoid sobre padrões de referência qualificados. Usar o certificado específico do lote.

LIPID - Produtos tecnológicos Lipoid',
    'Padrão qualificado para controle analítico de fosfolipídios',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'padroes-analiticos'),
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
  VALUES (gen_random_uuid()::text, '551409',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pc-1800-rs-lspc'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-1800-rs-lspc'),
          (SELECT id FROM tags WHERE slug = 'padrao-de-referencia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-1800-rs-lspc'),
          (SELECT id FROM tags WHERE slug = 'controle-analitico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pc-1800-rs-lspc'),
          (SELECT id FROM tags WHERE slug = 'fosfatidilcolina'))
  ON CONFLICT DO NOTHING;

  --  11. LIPOID PE 18:0/0-PEG 2000 RS
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'LIPOID PE 18:0/0-PEG 2000 RS',
    'lipoid-pe-1800-peg-2000-rs',
    'LIPOID PE 18:0/0-PEG 2000 RS é um padrão de referência qualificado associado ao analito LIPOID PE 18:0/0-PEG 2000. Sua finalidade é fornecer um material rastreável para métodos de identificação, teor, pureza e perfil de componentes em matérias-primas e produtos que contenham fosfolipídios.

No laboratório, pode apoiar preparo de soluções padrão, curvas de calibração, adequabilidade do sistema e verificação de métodos cromatográficos ou outros procedimentos validados. O valor atribuído, a incerteza, a correção de teor e as condições de manuseio devem ser obtidos no certificado específico do lote.

Código comercial: 584609. Este material é destinado ao controle analítico e não à incorporação em formulações.

Leve este ingrediente para a próxima etapa: preencha o Formulário de Atendimento e apresente o objetivo da sua formulação.

Base técnica: Lista de Produtos LIPID e informações institucionais da Lipoid sobre padrões de referência qualificados. Usar o certificado específico do lote.

LIPID - Produtos tecnológicos Lipoid',
    'Padrão qualificado para controle analítico de fosfolipídios',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'padroes-analiticos'),
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
  VALUES (gen_random_uuid()::text, '584609',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pe-1800-peg-2000-rs'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-1800-peg-2000-rs'),
          (SELECT id FROM tags WHERE slug = 'padrao-de-referencia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-1800-peg-2000-rs'),
          (SELECT id FROM tags WHERE slug = 'controle-analitico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-1800-peg-2000-rs'),
          (SELECT id FROM tags WHERE slug = 'peguilado'))
  ON CONFLICT DO NOTHING;

  --  12. Lipoid PE 18:0/18:0 - PEG 2000
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid PE 18:0/18:0 - PEG 2000',
    'lipoid-pe-180180-peg-2000',
    'Lipoid PE 18:0/18:0 - PEG 2000 integra a família “PEGylated Phospholipids”. Sua identidade técnica é dSPE-PEG 2000: fosfatidiletanolamina distearoilada conjugada a PEG 2000. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Lipídio PEGuilado para estabilização estérica de nanopartículas e lipossomas',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento para avançar.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'fosfolipidios-peguilados'),
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
  VALUES (gen_random_uuid()::text, '588200',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-peg-2000'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-peg-2000'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidio-peguilado'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-peg-2000'),
          (SELECT id FROM tags WHERE slug = 'peg-2000'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-pe-180180-peg-2000'),
          (SELECT id FROM tags WHERE slug = 'fosfatidiletanolamina'))
  ON CONFLICT DO NOTHING;

  --  13. Lipoid Dotap-CI
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lipoid Dotap-CI',
    'lipoid-dotap-ci',
    'Lipoid Dotap-CI integra a família “Cationic Lipids”. Sua identidade técnica é dOTAP cloreto, lipídio catiônico sintético. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Fosfolipídios são moléculas anfifílicas que se organizam em interfaces e bicamadas. Podem funcionar como emulsificantes, agentes molhantes, solubilizantes, formadores de lipossomas e componentes de matrizes lipídicas; o processo pode envolver dispersão, hidratação, homogeneização ou incorporação na fase oleosa, conforme a aplicação.',
    'Carga positiva para complexação e sistemas lipídicos de entrega',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e compartilhe os requisitos do projeto.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'lipidios-cationicos'),
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
  VALUES (gen_random_uuid()::text, '593510',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-dotap-ci'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '593500',
          (SELECT id FROM ingredients WHERE slug = 'lipoid-dotap-ci'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-dotap-ci'),
          (SELECT id FROM tags WHERE slug = 'lipidio-cationico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-dotap-ci'),
          (SELECT id FROM tags WHERE slug = 'dotap'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lipoid-dotap-ci'),
          (SELECT id FROM tags WHERE slug = 'fosfolipidios'))
  ON CONFLICT DO NOTHING;

  --  14. SLM 2026
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'SLM 2026',
    'slm-2026',
    'SLM 2026 integra a família “Lamellar Bases”. Sua identidade técnica é base com fosfatidilcolina hidrogenada e lipídios idênticos aos do estrato córneo. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

A base é utilizada como matriz emulsificante e lamelar em cremes e loções. Durante o preparo, os lipídios se organizam em estruturas semelhantes às da barreira cutânea, favorecendo sensorial, retenção de água e incorporação de fases oleosas; proporção, temperatura e cisalhamento devem ser ajustados ao sistema.',
    'Matriz biomimética para cremes de reparação e proteção da barreira',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'bases-lamelares'),
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
  VALUES (gen_random_uuid()::text, '589330',
          (SELECT id FROM ingredients WHERE slug = 'slm-2026'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'slm-2026'),
          (SELECT id FROM tags WHERE slug = 'base-lamelar'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'slm-2026'),
          (SELECT id FROM tags WHERE slug = 'estrutura-biomimetica'))
  ON CONFLICT DO NOTHING;

  --  15. SLM Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'SLM Eco',
    'slm-eco',
    'SLM Eco integra a família “Lamellar Bases”. Sua identidade técnica é base com fosfatidilcolina hidrogenada não transgênica e lipídios idênticos aos do estrato córneo. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A base é utilizada como matriz emulsificante e lamelar em cremes e loções. Durante o preparo, os lipídios se organizam em estruturas semelhantes às da barreira cutânea, favorecendo sensorial, retenção de água e incorporação de fases oleosas; proporção, temperatura e cisalhamento devem ser ajustados ao sistema.',
    'Matriz lamelar biomimética para formulações naturais de barreira',
    'Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o seu projeto.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'bases-lamelares'),
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
  VALUES (gen_random_uuid()::text, '511760',
          (SELECT id FROM ingredients WHERE slug = 'slm-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'slm-eco'),
          (SELECT id FROM tags WHERE slug = 'base-lamelar'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'slm-eco'),
          (SELECT id FROM tags WHERE slug = 'estrutura-biomimetica'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'slm-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  16. Phytocodine
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Phytocodine',
    'phytocodine',
    'PhytoCodine é um ativo cosmético baseado em peptídeos vegetais, desenvolvido para atuar como sistema de sinalização em projetos voltados à estrutura e à aparência da pele. Seu posicionamento técnico está relacionado à comunicação celular e ao suporte de componentes da matriz extracelular.

Pode ser incorporado em séruns, cremes e emulsões antienvelhecimento, com avaliação de estabilidade, compatibilidade e eficácia no produto acabado. Para preservar a fração peptídica, a etapa de adição e a temperatura devem seguir as orientações da ficha técnica vigente.

Código comercial: 410217. Alegações de firmeza, elasticidade ou reestruturação devem ser sustentadas pelos dados aplicáveis à formulação final.

Para discutir compatibilidade, grau e aplicação, preencha o Formulário de Atendimento.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Peptídeos mensageiros de origem vegetal para suporte à estrutura da pele',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'bases-lamelares'),
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
  VALUES (gen_random_uuid()::text, '410217',
          (SELECT id FROM ingredients WHERE slug = 'phytocodine'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytocodine'),
          (SELECT id FROM tags WHERE slug = 'base-lamelar'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytocodine'),
          (SELECT id FROM tags WHERE slug = 'estrutura-biomimetica'))
  ON CONFLICT DO NOTHING;

  --  17. PhytoSolve Astaxanthin
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'PhytoSolve Astaxanthin',
    'phytosolve-astaxanthin',
    'PhytoSolve Astaxanthin integra a família “Phospholipid Delivery Systems”. Sua identidade técnica é emulsão finamente dispersa com fosfolipídios e astaxantina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A apresentação pré-dispersa facilita a incorporação em sistemas aquosos ou emulsificados. Deve ser adicionada sob condições compatíveis com a estabilidade do ativo, seguida de avaliação de tamanho de partícula, cor, teor, oxidação e desempenho durante a vida útil.',
    'Sistema de entrega para incorporar astaxantina em formulações aquosas',
    'Aproxime este ingrediente da sua formulação. Envie o Formulário de Atendimento para iniciar a análise técnica.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'sistemas-de-solubilizacao'),
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
  VALUES (gen_random_uuid()::text, '512700.10000',
          (SELECT id FROM ingredients WHERE slug = 'phytosolve-astaxanthin'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '512700.25000',
          (SELECT id FROM ingredients WHERE slug = 'phytosolve-astaxanthin'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytosolve-astaxanthin'),
          (SELECT id FROM tags WHERE slug = 'phytosolve'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytosolve-astaxanthin'),
          (SELECT id FROM tags WHERE slug = 'solubilizacao-lipidica'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytosolve-astaxanthin'),
          (SELECT id FROM tags WHERE slug = 'astaxantina'))
  ON CONFLICT DO NOTHING;

  --  18. PhytoSolve Q10
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'PhytoSolve Q10',
    'phytosolve-q10',
    'PhytoSolve Q10 integra a família “Phospholipid Delivery Systems”. Sua identidade técnica é emulsão finamente dispersa com fosfolipídios e coenzima Q10. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

A apresentação pré-dispersa facilita a incorporação em sistemas aquosos ou emulsificados. Deve ser adicionada sob condições compatíveis com a estabilidade do ativo, seguida de avaliação de tamanho de partícula, cor, teor, oxidação e desempenho durante a vida útil.',
    'Coenzima Q10 pré-dispersa para sistemas cosméticos de base aquosa',
    'Compartilhe o desafio da sua formulação no Formulário de Atendimento e avance com o suporte da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'sistemas-de-solubilizacao'),
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
  VALUES (gen_random_uuid()::text, '548500.25000',
          (SELECT id FROM ingredients WHERE slug = 'phytosolve-q10'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytosolve-q10'),
          (SELECT id FROM tags WHERE slug = 'phytosolve'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytosolve-q10'),
          (SELECT id FROM tags WHERE slug = 'solubilizacao-lipidica'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'phytosolve-q10'),
          (SELECT id FROM tags WHERE slug = 'coenzima-q10'))
  ON CONFLICT DO NOTHING;

  --  19. Natipide II
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Natipide II',
    'natipide-ii',
    'Natipide II integra a família “Pre-liposomes”. Sua identidade técnica é pré-lipossomas vazios de fosfolipídios de soja. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

O material é hidratado na presença da fase aquosa e do ativo hidrofílico para gerar vesículas.

Eficiência de encapsulação, tamanho, distribuição, pH e estabilidade dependem da sequência de mistura, energia aplicada e composição da formulação.',
    'Plataforma para encapsulação de ativos hidrofílicos durante o preparo',
    'Pronto para estudar esta solução? Preencha o Formulário de Atendimento e dê contexto ao seu desenvolvimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'sistemas-lipossomais'),
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
  VALUES (gen_random_uuid()::text, '510180',
          (SELECT id FROM ingredients WHERE slug = 'natipide-ii'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natipide-ii'),
          (SELECT id FROM tags WHERE slug = 'lipossomas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natipide-ii'),
          (SELECT id FROM tags WHERE slug = 'sistema-de-entrega'))
  ON CONFLICT DO NOTHING;

  --  20. Liposome Basic
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Liposome Basic',
    'liposome-basic',
    'Liposome Basic integra a família “Pre-liposomes”. Sua identidade técnica é pré-lipossomas com fosfolipídios em glicerina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

O material é hidratado na presença da fase aquosa e do ativo hidrofílico para gerar vesículas.

Eficiência de encapsulação, tamanho, distribuição, pH e estabilidade dependem da sequência de mistura, energia aplicada e composição da formulação.',
    'Base pronta para formar lipossomas e encapsular ativos hidrofílicos',
    'Leve este ingrediente para a próxima etapa: preencha o Formulário de Atendimento e apresente o objetivo da sua formulação.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'sistemas-lipossomais'),
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
  VALUES (gen_random_uuid()::text, '511180',
          (SELECT id FROM ingredients WHERE slug = 'liposome-basic'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '511180.50000',
          (SELECT id FROM ingredients WHERE slug = 'liposome-basic'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'liposome-basic'),
          (SELECT id FROM tags WHERE slug = 'lipossomas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'liposome-basic'),
          (SELECT id FROM tags WHERE slug = 'sistema-de-entrega'))
  ON CONFLICT DO NOTHING;

  --  21. Liposome C Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Liposome C Eco',
    'liposome-c-eco',
    'Liposome C Eco integra a família “Liposome Dispersions”. Sua identidade técnica é dispersão lipossomal de fosfolipídios de soja com ascorbil-2-glicosídeo. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A apresentação pré-dispersa facilita a incorporação em sistemas aquosos ou emulsificados. Deve ser adicionada sob condições compatíveis com a estabilidade do ativo, seguida de avaliação de tamanho de partícula, cor, teor, oxidação e desempenho durante a vida útil.',
    'Vitamina C derivada em veículo lipossomal para formulações aquosas',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento para avançar.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'sistemas-lipossomais'),
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
  VALUES (gen_random_uuid()::text, '512390.10000',
          (SELECT id FROM ingredients WHERE slug = 'liposome-c-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '512390.25000',
          (SELECT id FROM ingredients WHERE slug = 'liposome-c-eco'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '512390.50000',
          (SELECT id FROM ingredients WHERE slug = 'liposome-c-eco'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'liposome-c-eco'),
          (SELECT id FROM tags WHERE slug = 'lipossomas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'liposome-c-eco'),
          (SELECT id FROM tags WHERE slug = 'sistema-de-entrega'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'liposome-c-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'liposome-c-eco'),
          (SELECT id FROM tags WHERE slug = 'vitamina-c'))
  ON CONFLICT DO NOTHING;

  --  22. Natipide Eco
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Natipide Eco',
    'natipide-eco',
    'Natipide Eco integra a família “Pre-liposomes”. Sua identidade técnica é pré-lipossomas vazios com lecitina de soja não transgênica. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

O material é hidratado na presença da fase aquosa e do ativo hidrofílico para gerar vesículas.

Eficiência de encapsulação, tamanho, distribuição, pH e estabilidade dependem da sequência de mistura, energia aplicada e composição da formulação.',
    'Encapsulação de ativos hidrofílicos em plataforma lipossomal de perfil natural',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e compartilhe os requisitos do projeto.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'sistemas-lipossomais'),
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
  VALUES (gen_random_uuid()::text, '512240',
          (SELECT id FROM ingredients WHERE slug = 'natipide-eco'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natipide-eco'),
          (SELECT id FROM tags WHERE slug = 'lipossomas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natipide-eco'),
          (SELECT id FROM tags WHERE slug = 'sistema-de-entrega'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natipide-eco'),
          (SELECT id FROM tags WHERE slug = 'linha-eco'))
  ON CONFLICT DO NOTHING;

  --  23. Ultraspheres 8022 (Retinol)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Ultraspheres 8022 (Retinol)',
    'ultraspheres-8022-retinol',
    'Ultraspheres 8022 (Retinol) é uma apresentação de retinol em sistema finamente disperso. A pré- dispersão facilita a distribuição do ativo e pode reduzir dificuldades de incorporação associadas à sua lipofilicidade, desde que a concentração e a composição exatas sejam confirmadas na documentação comercial.

O retinol é sensível a luz, oxigênio e temperatura. A formulação deve controlar exposição durante o processo, selecionar antioxidantes e embalagem adequados e verificar teor, cor, odor e produtos de degradação ao longo da estabilidade. Benefícios cosméticos devem respeitar a legislação e ser demonstrados no produto final.

Código comercial: 547900. Confirmar teor de retinol, veículo e condições de adição na ficha técnica vigente.

Transforme a necessidade técnica em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Retinol em dispersão fina para incorporação controlada em formulações cosméticas',
    NULL,
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
  VALUES (gen_random_uuid()::text, '547900',
          (SELECT id FROM ingredients WHERE slug = 'ultraspheres-8022-retinol'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ultraspheres-8022-retinol'),
          (SELECT id FROM tags WHERE slug = 'ultraspheres-8022-retinol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ultraspheres-8022-retinol'),
          (SELECT id FROM tags WHERE slug = 'encapsulacao'))
  ON CONFLICT DO NOTHING;

  --  24. Ultraspheres ACE
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Ultraspheres ACE',
    'ultraspheres-ace',
    'Ultraspheres ACE integra a família “Fine Dispersions”. Sua identidade técnica é emulsão finamente dispersa com vitaminas A, C e E e fosfatidilcolina de soja. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

A apresentação pré-dispersa facilita a incorporação em sistemas aquosos ou emulsificados. Deve ser adicionada sob condições compatíveis com a estabilidade do ativo, seguida de avaliação de tamanho de partícula, cor, teor, oxidação e desempenho durante a vida útil.',
    'Complexo vitamínico pré-disperso para sistemas cosméticos aquosos',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
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
  VALUES (gen_random_uuid()::text, '546000100',
          (SELECT id FROM ingredients WHERE slug = 'ultraspheres-ace'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ultraspheres-ace'),
          (SELECT id FROM tags WHERE slug = 'ultraspheres-ace'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ultraspheres-ace'),
          (SELECT id FROM tags WHERE slug = 'encapsulacao'))
  ON CONFLICT DO NOTHING;

  --  25. Citrolumine 8
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Citrolumine 8',
    'citrolumine-8',
    'Citrolumine 8 integra a família “Cosmetic Actives”. Sua identidade técnica é citroflavonoides concentrados e encapsulados em lipossomas. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A apresentação pré-dispersa facilita a incorporação em sistemas aquosos ou emulsificados. Deve ser adicionada sob condições compatíveis com a estabilidade do ativo, seguida de avaliação de tamanho de partícula, cor, teor, oxidação e desempenho durante a vida útil.',
    'Ativo vegetal para luminosidade, uniformidade e aparência de manchas',
    'Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o seu projeto.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-para-uniformizacao-do-tom'),
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
  VALUES (gen_random_uuid()::text, '400817.00.2',
          (SELECT id FROM ingredients WHERE slug = 'citrolumine-8'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'citrolumine-8'),
          (SELECT id FROM tags WHERE slug = 'uniformizacao-do-tom'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'citrolumine-8'),
          (SELECT id FROM tags WHERE slug = 'ativo-cosmetico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'citrolumine-8'),
          (SELECT id FROM tags WHERE slug = 'citrolumine'))
  ON CONFLICT DO NOTHING;

  --  26. Vitamin F
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Vitamin F',
    'vitamin-f',
    'Vitamin F integra a família “Natural Additives”. Sua identidade técnica é mistura de ácidos graxos essenciais poli-insaturados, tradicionalmente denominada vitamina F. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

É incorporado na fase compatível com a apresentação comercial para enriquecer a formulação com ácidos graxos essenciais. Pode apoiar emoliência, reposição lipídica e cuidado de pele seca ou couro cabeludo, com atenção à oxidação dos ácidos graxos poli-insaturados.',
    'Reposição lipídica, nutrição e proteção da pele e do couro cabeludo',
    'Para discutir compatibilidade, grau e aplicação, preencha o Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '170102.00.2',
          (SELECT id FROM ingredients WHERE slug = 'vitamin-f'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vitamin-f'),
          (SELECT id FROM tags WHERE slug = 'vitaminas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vitamin-f'),
          (SELECT id FROM tags WHERE slug = 'antioxidantes'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'vitamin-f'),
          (SELECT id FROM tags WHERE slug = 'vitamina-f'))
  ON CONFLICT DO NOTHING;

  --  27. Natural AHA Complex Liquid
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Natural AHA Complex Liquid',
    'natural-aha-complex-liquid',
    'Natural AHA Complex Liquid integra a família “Natural Additives”. Sua identidade técnica é combinação líquida e hidrossolúvel de ácidos cítrico, tartárico e lático. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

A solução é adicionada à fase aquosa de produtos de limpeza, séruns, géis ou emulsões. O pH final determina a fração de ácido livre e, portanto, a intensidade de esfoliação e o potencial de irritação; segurança, estabilidade e conformidade regulatória devem ser avaliadas.',
    'Sistema de alfa-hidroxiácidos para esfoliação e renovação superficial',
    'Aproxime este ingrediente da sua formulação. Envie o Formulário de Atendimento para iniciar a análise técnica.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'alfa-hidroxiacidos'),
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
  VALUES (gen_random_uuid()::text, '400995.00.2',
          (SELECT id FROM ingredients WHERE slug = 'natural-aha-complex-liquid'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natural-aha-complex-liquid'),
          (SELECT id FROM tags WHERE slug = 'aha'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natural-aha-complex-liquid'),
          (SELECT id FROM tags WHERE slug = 'alfa-hidroxiacidos'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natural-aha-complex-liquid'),
          (SELECT id FROM tags WHERE slug = 'origem-natural'))
  ON CONFLICT DO NOTHING;

  --  28. Alpha Hydroxy Acids AHA
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Alpha Hydroxy Acids AHA',
    'alpha-hydroxy-acids-aha',
    'Alpha Hydroxy Acids AHA é uma preparação da categoria de alfa-hidroxiácidos. A planilha não informa a composição individual ou a concentração dos ácidos nesta apresentação; esses dados são essenciais para calcular o teor de ácido livre e definir a segurança do produto final.

AHAs são usados em produtos de limpeza, peelings, séruns e emulsões para reduzir coesão entre corneócitos e melhorar textura e luminosidade. O efeito depende do tipo de ácido, concentração, pH e tempo de contato, exigindo controle de irritação, compatibilidade da embalagem e conformidade regulatória.

Código comercial: 150050.00.2. A formulação deve ser baseada na ficha técnica, no teor de ácidos e na avaliação de segurança da aplicação pretendida.

Compartilhe o desafio da sua formulação no Formulário de Atendimento e avance com o suporte da equipe Lipid.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Sistema de alfa-hidroxiácidos para esfoliação química e renovação superficial',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'alfa-hidroxiacidos'),
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
  VALUES (gen_random_uuid()::text, '150050.00.2',
          (SELECT id FROM ingredients WHERE slug = 'alpha-hydroxy-acids-aha'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'alpha-hydroxy-acids-aha'),
          (SELECT id FROM tags WHERE slug = 'aha'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'alpha-hydroxy-acids-aha'),
          (SELECT id FROM tags WHERE slug = 'alfa-hidroxiacidos'))
  ON CONFLICT DO NOTHING;

  --  29. usNeo
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'usNeo',
    'usneo',
    'usNeo integra a família “Cosmetic Actives”. Sua identidade técnica é extrato de Usnea barbata em propanodiol, sem conservantes adicionados. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Pode ser usado em desodorantes, produtos para pele com imperfeições e cuidados anticaspa. A formulação deve preservar a solubilidade do extrato e avaliar atividade antimicrobiana no contexto do produto, sem substituir o estudo do sistema conservante.',
    'Ativo para equilíbrio microbiano, odor, pele com imperfeições e caspa',
    'Pronto para estudar esta solução? Preencha o Formulário de Atendimento e dê contexto ao seu desenvolvimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-cosmeticos'),
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
  VALUES (gen_random_uuid()::text, '400937.00.2',
          (SELECT id FROM ingredients WHERE slug = 'usneo'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'usneo'),
          (SELECT id FROM tags WHERE slug = 'ativo-cosmetico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'usneo'),
          (SELECT id FROM tags WHERE slug = 'ingrediente-tecnologico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'usneo'),
          (SELECT id FROM tags WHERE slug = 'usneo'))
  ON CONFLICT DO NOTHING;

  --  30. Hydro-Gain
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Hydro-Gain',
    'hydro-gain',
    'Hydro-Gain integra a família “Cosmetic Actives”. Sua identidade técnica é sistema hidratante natural com extratos lipofílicos de bétula, óleo de figo-da-índia e lecitina hidrogenada. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Pode integrar cremes, loções, séruns e produtos para pele seca, combinando suporte à barreira lipídica com aumento da capacidade de retenção de água. A matriz glicerinada e a lecitina hidrogenada devem ser compatibilizadas com o sistema emulsificante e o sensorial pretendido.',
    'Hidratação de curto e longo prazo com suporte à barreira cutânea',
    'Leve este ingrediente para a próxima etapa: preencha o Formulário de Atendimento e apresente o objetivo da sua formulação.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-hidratantes'),
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
  VALUES (gen_random_uuid()::text, '401032.5000',
          (SELECT id FROM ingredients WHERE slug = 'hydro-gain'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '401032.10000',
          (SELECT id FROM ingredients WHERE slug = 'hydro-gain'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '401032.25000',
          (SELECT id FROM ingredients WHERE slug = 'hydro-gain'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'hydro-gain'),
          (SELECT id FROM tags WHERE slug = 'hidratacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'hydro-gain'),
          (SELECT id FROM tags WHERE slug = 'ativo-cosmetico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'hydro-gain'),
          (SELECT id FROM tags WHERE slug = 'hydro-gain'))
  ON CONFLICT DO NOTHING;

  --  31. Collagen Stimulation Factor MAP
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Collagen Stimulation Factor MAP',
    'collagen-stimulation-factor-map',
    'Collagen Stimulation Factor MAP é um ativo do portfólio cosmético direcionado a estratégias de suporte à síntese e à organização do colágeno. A planilha não apresenta a composição INCI ou o mecanismo detalhado, portanto a identidade completa deve ser confirmada na documentação técnica do produto.

Pode ser estudado em séruns, cremes e emulsões para firmeza e aparência de linhas, com incorporação compatível com sua natureza química. A construção de alegações deve utilizar os ensaios do ingrediente e, principalmente, resultados obtidos com a formulação acabada.

Código comercial: 160905. Confirmar INCI, faixa de uso, solubilidade, temperatura e pH recomendados antes do desenvolvimento.

Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento para avançar.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Ativo técnico para projetos cosméticos voltados à matriz extracelular',
    NULL,
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
  VALUES (gen_random_uuid()::text, '160905',
          (SELECT id FROM ingredients WHERE slug = 'collagen-stimulation-factor-map'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'collagen-stimulation-factor-map'),
          (SELECT id FROM tags WHERE slug = 'proteinas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'collagen-stimulation-factor-map'),
          (SELECT id FROM tags WHERE slug = 'peptideos'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'collagen-stimulation-factor-map'),
          (SELECT id FROM tags WHERE slug = 'colageno'))
  ON CONFLICT DO NOTHING;

  --  32. Depigmentation Factor 2U
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Depigmentation Factor 2U',
    'depigmentation-factor-2u',
    'Depigmentation Factor 2U é um ativo cosmético voltado a projetos de luminosidade e redução da aparência de hiperpigmentações. A planilha não informa sua composição INCI nem a via bioquímica específica, por isso o posicionamento final deve ser construído a partir da ficha técnica e dos estudos vigentes.

Na formulação, pode ser avaliado em séruns, géis e emulsões de uso facial ou localizado. O desenvolvimento deve considerar estabilidade à luz e à oxidação, pH, compatibilidade com filtros e outros agentes de uniformização, além de testes de tolerância e eficácia no produto acabado.

Código comercial: 161005.00.2. Confirmar identidade, concentração de uso e condições de processo antes da elaboração das alegações.

Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e compartilhe os requisitos do projeto.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Ativo para desenvolvimento de produtos de uniformização do tom',
    NULL,
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-para-uniformizacao-do-tom'),
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
  VALUES (gen_random_uuid()::text, '161005.00.2',
          (SELECT id FROM ingredients WHERE slug = 'depigmentation-factor-2u'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'depigmentation-factor-2u'),
          (SELECT id FROM tags WHERE slug = 'uniformizacao-do-tom'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'depigmentation-factor-2u'),
          (SELECT id FROM tags WHERE slug = 'ativo-cosmetico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'depigmentation-factor-2u'),
          (SELECT id FROM tags WHERE slug = 'depigmentation-factor'))
  ON CONFLICT DO NOTHING;

  --  33. Wheat Herbaprotein™
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Wheat Herbaprotein™',
    'wheat-herbaprotein',
    'Wheat Herbaprotein™ integra a família “Natural Additives”. Sua identidade técnica é preparação cosmética baseada em proteínas de trigo hidrolisadas. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

É usado em produtos para pele e cabelos para formação de filme, hidratação e condicionamento. Em sistemas capilares, pode contribuir para corpo e penteabilidade; a interação com tensoativos, eletrólitos e conservantes deve ser verificada.',
    'Peptídeos vegetais para condicionamento, hidratação e formação de filme',
    'Transforme a necessidade técnica em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
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
  VALUES (gen_random_uuid()::text, '400385.5000',
          (SELECT id FROM ingredients WHERE slug = 'wheat-herbaprotein'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400385.10000',
          (SELECT id FROM ingredients WHERE slug = 'wheat-herbaprotein'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400385.25000',
          (SELECT id FROM ingredients WHERE slug = 'wheat-herbaprotein'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400385.100000',
          (SELECT id FROM ingredients WHERE slug = 'wheat-herbaprotein'), 3)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wheat-herbaprotein'),
          (SELECT id FROM tags WHERE slug = 'proteinas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wheat-herbaprotein'),
          (SELECT id FROM tags WHERE slug = 'peptideos'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wheat-herbaprotein'),
          (SELECT id FROM tags WHERE slug = 'trigo'))
  ON CONFLICT DO NOTHING;

  --  34. Yogurtolin
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Yogurtolin',
    'yogurtolin',
    'Yogurtolin é uma preparação cosmética associada a componentes de iogurte. Esses materiais fornecem aminoácidos e peptídeos que podem contribuir para formação de filme, retenção de água e melhoria do sensorial em produtos para pele e cabelos.

Pode ser incorporado em xampus, condicionadores, máscaras, loções e cremes, respeitando solubilidade, sistema conservante e compatibilidade com tensoativos. A estabilidade microbiológica e a manutenção das características organolépticas são pontos centrais para matérias-primas de origem proteica.

Código(s) comercial(is): 410316. A composição INCI, o teor proteico e a faixa de uso devem ser confirmados na ficha técnica vigente.

Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Proteínas e peptídeos de origem láctea para hidratação e condicionamento',
    NULL,
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
  VALUES (gen_random_uuid()::text, '410316',
          (SELECT id FROM ingredients WHERE slug = 'yogurtolin'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'yogurtolin'),
          (SELECT id FROM tags WHERE slug = 'proteinas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'yogurtolin'),
          (SELECT id FROM tags WHERE slug = 'peptideos'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'yogurtolin'),
          (SELECT id FROM tags WHERE slug = 'iogurte'))
  ON CONFLICT DO NOTHING;

  --  35. Yoghurt Protein COS GBU
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Yoghurt Protein COS GBU',
    'yoghurt-protein-cos-gbu',
    'Yoghurt Protein COS GBU é uma preparação aquosa-glicerinada de proteína de iogurte ou leite hidrolisada. Esses materiais fornecem aminoácidos e peptídeos que podem contribuir para formação de filme, retenção de água e melhoria do sensorial em produtos para pele e cabelos.

Pode ser incorporado em xampus, condicionadores, máscaras, loções e cremes, respeitando solubilidade, sistema conservante e compatibilidade com tensoativos. A estabilidade microbiológica e a manutenção das características organolépticas são pontos centrais para matérias-primas de origem proteica.

Código(s) comercial(is): 400435.20000, 400435.100000. A composição INCI, o teor proteico e a faixa de uso devem ser confirmados na ficha técnica vigente.

Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o seu projeto.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Proteínas e peptídeos de origem láctea para hidratação e condicionamento',
    NULL,
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
  VALUES (gen_random_uuid()::text, '400435.20000',
          (SELECT id FROM ingredients WHERE slug = 'yoghurt-protein-cos-gbu'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '400435.100000',
          (SELECT id FROM ingredients WHERE slug = 'yoghurt-protein-cos-gbu'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'yoghurt-protein-cos-gbu'),
          (SELECT id FROM tags WHERE slug = 'proteinas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'yoghurt-protein-cos-gbu'),
          (SELECT id FROM tags WHERE slug = 'peptideos'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'yoghurt-protein-cos-gbu'),
          (SELECT id FROM tags WHERE slug = 'iogurte'))
  ON CONFLICT DO NOTHING;

  --  36. Lacto Pro™
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Lacto Pro™',
    'lacto-pro',
    'Lacto Pro™ é uma ingrediente funcional de origem láctea para condicionamento e hidratação. Esses materiais fornecem aminoácidos e peptídeos que podem contribuir para formação de filme, retenção de água e melhoria do sensorial em produtos para pele e cabelos.

Pode ser incorporado em xampus, condicionadores, máscaras, loções e cremes, respeitando solubilidade, sistema conservante e compatibilidade com tensoativos. A estabilidade microbiológica e a manutenção das características organolépticas são pontos centrais para matérias-primas de origem proteica.

Código(s) comercial(is): 141100. A composição INCI, o teor proteico e a faixa de uso devem ser confirmados na ficha técnica vigente.

Para discutir compatibilidade, grau e aplicação, preencha o Formulário de Atendimento.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Proteínas e peptídeos de origem láctea para hidratação e condicionamento',
    NULL,
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
  VALUES (gen_random_uuid()::text, '141100',
          (SELECT id FROM ingredients WHERE slug = 'lacto-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lacto-pro'),
          (SELECT id FROM tags WHERE slug = 'proteinas'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lacto-pro'),
          (SELECT id FROM tags WHERE slug = 'peptideos'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'lacto-pro'),
          (SELECT id FROM tags WHERE slug = 'proteina-lactea'))
  ON CONFLICT DO NOTHING;

  --  37. Natural Abrasive Blend Standard
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Natural Abrasive Blend Standard',
    'natural-abrasive-blend-standard',
    'Natural Abrasive Blend Standard é um abrasivo cosmético baseado em partículas naturais, com graduação padrão. Sua função é promover remoção mecânica de material superficial quando as partículas são friccionadas sobre a pele ou integradas a produtos de limpeza e polimento.

A escolha da granulometria deve equilibrar eficiência, sensorial e tolerância. O desenvolvimento precisa avaliar morfologia e dureza das partículas, sedimentação, compatibilidade com a base, risco de abrasão excessiva e desempenho em condições reais de uso.

Código comercial: 400747.00.2. Distribuição de tamanho, origem e especificações microbiológicas devem ser confirmadas na documentação vigente.

Pronto para estudar esta solução? Preencha o Formulário de Atendimento e dê contexto ao seu desenvolvimento.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Abrasivo natural de granulometria padrão para esfoliação mecânica controlada',
    NULL,
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
  VALUES (gen_random_uuid()::text, '400747.00.2',
          (SELECT id FROM ingredients WHERE slug = 'natural-abrasive-blend-standard'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natural-abrasive-blend-standard'),
          (SELECT id FROM tags WHERE slug = 'esfoliacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natural-abrasive-blend-standard'),
          (SELECT id FROM tags WHERE slug = 'particulas-naturais'))
  ON CONFLICT DO NOTHING;

  --  38. Natural Abrasive Coarse
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Natural Abrasive Coarse',
    'natural-abrasive-coarse',
    'Natural Abrasive Coarse é um abrasivo cosmético baseado em partículas naturais, com graduação grossa. Sua função é promover remoção mecânica de material superficial quando as partículas são friccionadas sobre a pele ou integradas a produtos de limpeza e polimento.

A escolha da granulometria deve equilibrar eficiência, sensorial e tolerância. O desenvolvimento precisa avaliar morfologia e dureza das partículas, sedimentação, compatibilidade com a base, risco de abrasão excessiva e desempenho em condições reais de uso.

Código comercial: 400749.00.2. Distribuição de tamanho, origem e especificações microbiológicas devem ser confirmadas na documentação vigente.

Leve este ingrediente para a próxima etapa: preencha o Formulário de Atendimento e apresente o objetivo da sua formulação.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Abrasivo natural de granulometria grossa para esfoliação mecânica controlada',
    NULL,
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
  VALUES (gen_random_uuid()::text, '400749.00.2',
          (SELECT id FROM ingredients WHERE slug = 'natural-abrasive-coarse'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natural-abrasive-coarse'),
          (SELECT id FROM tags WHERE slug = 'esfoliacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natural-abrasive-coarse'),
          (SELECT id FROM tags WHERE slug = 'particulas-naturais'))
  ON CONFLICT DO NOTHING;

  --  39. Natural Abrasive Blend Medium-Fine
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Natural Abrasive Blend Medium-Fine',
    'natural-abrasive-blend-medium-fine',
    'Natural Abrasive Blend Medium-Fine é um abrasivo cosmético baseado em partículas naturais, com graduação média-fina. Sua função é promover remoção mecânica de material superficial quando as partículas são friccionadas sobre a pele ou integradas a produtos de limpeza e polimento.

A escolha da granulometria deve equilibrar eficiência, sensorial e tolerância. O desenvolvimento precisa avaliar morfologia e dureza das partículas, sedimentação, compatibilidade com a base, risco de abrasão excessiva e desempenho em condições reais de uso.

Código comercial: 400748.00.2. Distribuição de tamanho, origem e especificações microbiológicas devem ser confirmadas na documentação vigente.

Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento para avançar.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Abrasivo natural de granulometria média-fina para esfoliação mecânica controlada',
    NULL,
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
  VALUES (gen_random_uuid()::text, '400748.00.2',
          (SELECT id FROM ingredients WHERE slug = 'natural-abrasive-blend-medium-fine'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natural-abrasive-blend-medium-fine'),
          (SELECT id FROM tags WHERE slug = 'esfoliacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'natural-abrasive-blend-medium-fine'),
          (SELECT id FROM tags WHERE slug = 'particulas-naturais'))
  ON CONFLICT DO NOTHING;

  --  40. Bamboo Abrasive GBU
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Bamboo Abrasive GBU',
    'bamboo-abrasive-gbu',
    'Bamboo Abrasive GBU é um abrasivo cosmético baseado em partículas de bambu, com graduação padrão. Sua função é promover remoção mecânica de material superficial quando as partículas são friccionadas sobre a pele ou integradas a produtos de limpeza e polimento.

A escolha da granulometria deve equilibrar eficiência, sensorial e tolerância. O desenvolvimento precisa avaliar morfologia e dureza das partículas, sedimentação, compatibilidade com a base, risco de abrasão excessiva e desempenho em condições reais de uso.

Código comercial: 400866.00.2. Distribuição de tamanho, origem e especificações microbiológicas devem ser confirmadas na documentação vigente.

Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Abrasivo natural de granulometria padrão para esfoliação mecânica controlada',
    NULL,
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
  VALUES (gen_random_uuid()::text, '400866.00.2',
          (SELECT id FROM ingredients WHERE slug = 'bamboo-abrasive-gbu'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-abrasive-gbu'),
          (SELECT id FROM tags WHERE slug = 'esfoliacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-abrasive-gbu'),
          (SELECT id FROM tags WHERE slug = 'particulas-naturais'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'bamboo-abrasive-gbu'),
          (SELECT id FROM tags WHERE slug = 'bamboo'))
  ON CONFLICT DO NOTHING;

  --  41. Argan Oil Herbasol® Extract IPM
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Argan Oil Herbasol® Extract IPM',
    'argan-oil-herbasol-extract-ipm',
    'Argan Oil Herbasol® Extract IPM integra a família “Lipophilic Botanical Extracts”. Sua identidade técnica é extrato lipofílico de argan em miristato de isopropila. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Como extrato ou concentrado botânico, é incorporado preferencialmente em condições moderadas de processo, preservando os constituintes vegetais. O formulador deve verificar cor, odor, pH, compatibilidade com conservantes e estabilidade frente a luz e oxidação.',
    'Componente oleoso para emoliência e incorporação em fases lipídicas',
    'Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o seu projeto.',
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
  VALUES (gen_random_uuid()::text, '40098425000',
          (SELECT id FROM ingredients WHERE slug = 'argan-oil-herbasol-extract-ipm'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'argan-oil-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'argan-oil'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'argan-oil-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'extrato-botanico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'argan-oil-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'herbasol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'argan-oil-herbasol-extract-ipm'),
          (SELECT id FROM tags WHERE slug = 'base-ipm'))
  ON CONFLICT DO NOTHING;

  --  42. Tagua Abrasive
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Tagua Abrasive',
    'tagua-abrasive',
    'Tagua Abrasive é um abrasivo cosmético baseado em partículas de tagua, com graduação padrão.

Sua função é promover remoção mecânica de material superficial quando as partículas são friccionadas sobre a pele ou integradas a produtos de limpeza e polimento.

A escolha da granulometria deve equilibrar eficiência, sensorial e tolerância. O desenvolvimento precisa avaliar morfologia e dureza das partículas, sedimentação, compatibilidade com a base, risco de abrasão excessiva e desempenho em condições reais de uso.

Código comercial: 410079.00.2. Distribuição de tamanho, origem e especificações microbiológicas devem ser confirmadas na documentação vigente.

Para discutir compatibilidade, grau e aplicação, preencha o Formulário de Atendimento.

Base técnica: Lista de Produtos LIPID e materiais institucionais da Lipoid Kosmetik. Confirmar INCI, composição, faixa de uso e processo na ficha técnica vigente.

LIPID - Produtos tecnológicos Lipoid',
    'Abrasivo natural de granulometria padrão para esfoliação mecânica controlada',
    NULL,
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
  VALUES (gen_random_uuid()::text, '410079.00.2',
          (SELECT id FROM ingredients WHERE slug = 'tagua-abrasive'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'tagua-abrasive'),
          (SELECT id FROM tags WHERE slug = 'esfoliacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'tagua-abrasive'),
          (SELECT id FROM tags WHERE slug = 'particulas-naturais'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'tagua-abrasive'),
          (SELECT id FROM tags WHERE slug = 'tagua'))
  ON CONFLICT DO NOTHING;

  --  43. Herbaprotect NOX
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Herbaprotect NOX',
    'herbaprotect-nox',
    'Herbaprotect NOX integra a família “Cosmetic Actives”. Sua identidade técnica é concentrado de flor de romã, folha de perilla e ameixa-kakadu em glicerina. Essa definição permite selecionar a matéria- prima com origem, composição e função tecnológica alinhadas ao projeto.

Como extrato ou concentrado botânico, é incorporado preferencialmente em condições moderadas de processo, preservando os constituintes vegetais. O formulador deve verificar cor, odor, pH, compatibilidade com conservantes e estabilidade frente a luz e oxidação.',
    'Proteção antioxidante contra estresse tardio associado à radiação',
    'Aproxime este ingrediente da sua formulação. Envie o Formulário de Atendimento para iniciar a análise técnica.',
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
  VALUES (gen_random_uuid()::text, '410077.00.2',
          (SELECT id FROM ingredients WHERE slug = 'herbaprotect-nox'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'herbaprotect-nox'),
          (SELECT id FROM tags WHERE slug = 'protecao-cutanea'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'herbaprotect-nox'),
          (SELECT id FROM tags WHERE slug = 'ativo-cosmetico'))
  ON CONFLICT DO NOTHING;

  --  44. Matico Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Matico Pro',
    'matico-pro',
    'Matico Pro integra a família “Substantiated Botanical Extracts”. Sua identidade técnica é extrato aquoso-glicerinado de folhas de matico com eficácia avaliada para regeneração. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

Como extrato ou concentrado botânico, é incorporado preferencialmente em condições moderadas de processo, preservando os constituintes vegetais. O formulador deve verificar cor, odor, pH, compatibilidade com conservantes e estabilidade frente a luz e oxidação.',
    'Botânico substanciado para conforto e recuperação da pele',
    'Compartilhe o desafio da sua formulação no Formulário de Atendimento e avance com o suporte da equipe Lipid.',
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
  VALUES (gen_random_uuid()::text, '410123.25000',
          (SELECT id FROM ingredients WHERE slug = 'matico-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'matico-pro'),
          (SELECT id FROM tags WHERE slug = 'matico'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'matico-pro'),
          (SELECT id FROM tags WHERE slug = 'ativo-botanico'))
  ON CONFLICT DO NOTHING;

  --  45. Herbashield URB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Herbashield URB',
    'herbashield-urb',
    'Herbashield URB integra a família “Cosmetic Actives”. Sua identidade técnica é sistema de agrião, cavalinha e urtiga em matriz de fosfolipídios e maltodextrina. Essa definição permite selecionar a matéria-prima com origem, composição e função tecnológica alinhadas ao projeto.

A matriz em pó pode ser dispersa em sistemas aquosos e emulsões, conforme a ficha técnica. Seu desempenho antipoluição é construído pela combinação de reforço de barreira, suporte à detoxificação celular e capacidade antioxidante, devendo ser confirmado no produto final.',
    'Ativo antipoluição para barreira, detoxificação e controle do estresse oxidativo',
    'Pronto para estudar esta solução? Preencha o Formulário de Atendimento e dê contexto ao seu desenvolvimento.',
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
  VALUES (gen_random_uuid()::text, '410148.00.2',
          (SELECT id FROM ingredients WHERE slug = 'herbashield-urb'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'herbashield-urb'),
          (SELECT id FROM tags WHERE slug = 'protecao-cutanea'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'herbashield-urb'),
          (SELECT id FROM tags WHERE slug = 'ativo-cosmetico'))
  ON CONFLICT DO NOTHING;

END $$;

COMMIT;
