-- Catálogo de ingredientes — READLINE Biotech
-- GERADO por scripts/import-catalogo/importar_catalogo.py — não editar à mão.
-- Fontes: Orientação para Cadastrar no Site.xlsx + READLINE_Produtos_01-10_de_19.pdf
-- 14 produtos · 9 categorias · 27 tags · 19 códigos comerciais
--
-- Idempotente: reexecutar atualiza conteúdo, não duplica. Rode dentro de transação.

BEGIN;

DO $$
DECLARE
  v_partner_id text;
BEGIN
  SELECT id INTO v_partner_id FROM partners WHERE slug = 'readline-biotech';
  IF v_partner_id IS NULL THEN
    RAISE EXCEPTION 'Parceiro % nao encontrado — cadastre-o antes de importar o catalogo', 'readline-biotech';
  END IF;


  -- ---------- categorias (taxonomia global, compartilhada entre fabricantes)
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Antioxidantes', 'antioxidantes', 0, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos antiglicação', 'ativos-antiglicacao', 1, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos antissinais', 'ativos-antissinais', 2, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos capilares', 'ativos-capilares', 3, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos hidratantes', 'ativos-hidratantes', 4, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos para pigmentação', 'ativos-para-pigmentacao', 5, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativos reparadores', 'ativos-reparadores', 6, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cofatores e metabolismo celular', 'cofatores-e-metabolismo-celular', 7, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();
  INSERT INTO ingredient_categories (id, name, slug, "order", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Vitaminas e pró-vitaminas', 'vitaminas-e-pro-vitaminas', 8, now())
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, "updatedAt" = now();

  -- ---------- tags
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Aminoácido', 'aminoacido', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'AntiGly', 'antigly', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'AntiOxd', 'antioxd', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Antiglicação', 'antiglicacao', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Antioxidante', 'antioxidante', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativo antissinais', 'ativo-antissinais', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativo capilar', 'ativo-capilar', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ativo cosmético', 'ativo-cosmetico', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Biotecnologia', 'biotecnologia', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Coenzima', 'coenzima', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Cosméticos', 'cosmeticos', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'D-pantenol', 'd-pantenol', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Ergotioneína', 'ergotioneina', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Glutationa', 'glutationa', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Hidratação', 'hidratacao', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'HydraFix', 'hydrafix', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Metabolismo celular', 'metabolismo-celular', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'NAD+', 'nad', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'NMN', 'nmn', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Pigmentação', 'pigmentacao', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Pró-vitamina B5', 'pro-vitamina-b5', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'ReGrow', 'regrow', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Reparação cutânea', 'reparacao-cutanea', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Repigard', 'repigard', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'Tripeptídeo', 'tripeptideo', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'UltraHeal', 'ultraheal', now())
  ON CONFLICT (slug) DO NOTHING;
  INSERT INTO tags (id, name, slug, "updatedAt")
  VALUES (gen_random_uuid()::text, 'WrinFix', 'wrinfix', now())
  ON CONFLICT (slug) DO NOTHING;

  -- ---------- produtos

  --   1. D-Panthenol
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'D-Panthenol',
    'd-panthenol',
    'D-Panthenol, também denominado dexpanthenol, é a forma dextrógira do panthenol, um análogo alcoólico do ácido pantotênico (vitamina B5). Em sistemas biológicos, pode ser convertido em ácido pantotênico, componente relacionado ao metabolismo da coenzima A. No desenvolvimento cosmético, é empregado como agente condicionante para pele e cabelos, umectante e componente de suporte à hidratação.

Na prática, pode integrar formulações tópicas leave-on e rinse-off quando o objetivo é favorecer condicionamento, retenção de água e percepção de maciez. Entre as aplicações possíveis estão séruns, loções, cremes, máscaras e sistemas capilares. O resultado depende da concentração, do veículo, do sistema conservante e da compatibilidade com os demais componentes da formulação.',
    'Pro-vitamina B5 para condicionamento e suporte à hidratação cosmética',
    'Apresente sua formulação no Formulário de Atendimento e avance com o suporte técnico da equipe Lipid.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'vitaminas-e-pro-vitaminas'),
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
  VALUES (gen_random_uuid()::text, '040723.100000',
          (SELECT id FROM ingredients WHERE slug = 'd-panthenol'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'd-panthenol'),
          (SELECT id FROM tags WHERE slug = 'd-pantenol'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'd-panthenol'),
          (SELECT id FROM tags WHERE slug = 'pro-vitamina-b5'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'd-panthenol'),
          (SELECT id FROM tags WHERE slug = 'ativo-cosmetico'))
  ON CONFLICT DO NOTHING;

  --   2. ReGrow-Ex
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'ReGrow-Ex',
    'regrow-ex',
    'ReGrow-Ex é o Biotinoyl Tripeptide-1 da READLINE, um tripeptídeo formado pela associação de biotina com a sequência GHK. O ativo foi desenvolvido para cuidados capilares e para formulações destinadas a cílios e sobrancelhas, com foco no suporte ao folículo e à estrutura do fio.

Sua proposta técnica envolve vias relacionadas à 5-alfa-redutase, ao receptor de andrógeno e à sinalização por di-hidrotestosterona, além do estímulo à expressão de colágeno tipo IV e laminina-5 na região folicular. Esses mecanismos sustentam sua aplicação em projetos voltados à densidade, ao crescimento aparente e ao espessamento dos fios. As alegações do produto final devem ser confirmadas por ensaios compatíveis com a formulação e o mercado de destino.',
    'Peptídeo biotinilado para formulações capilares, cílios e sobrancelhas',
    'Conte à equipe Lipid o que você pretende desenvolver. Preencha o Formulário de Atendimento.',
    'Biotinoyl Tripeptide-1',
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-capilares'),
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
  VALUES (gen_random_uuid()::text, '873645.10',
          (SELECT id FROM ingredients WHERE slug = 'regrow-ex'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '873645.100',
          (SELECT id FROM ingredients WHERE slug = 'regrow-ex'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '873645.1000',
          (SELECT id FROM ingredients WHERE slug = 'regrow-ex'), 2)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'regrow-ex'),
          (SELECT id FROM tags WHERE slug = 'ativo-capilar'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'regrow-ex'),
          (SELECT id FROM tags WHERE slug = 'biotecnologia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'regrow-ex'),
          (SELECT id FROM tags WHERE slug = 'regrow'))
  ON CONFLICT DO NOTHING;

  --   3. WrinFix-Px
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'WrinFix-Px',
    'wrinfix-px',
    'WrinFix-Px é o Hydroxypropyl Tetrahydropyrantriol da READLINE, um derivado de xilose desenvolvido para estratégias cosméticas de hidratação, firmeza, suavização da superfície cutânea e redução da aparência de rugas.

O ativo favorece a produção de glicosaminoglicanos solúveis, contribuindo para a retenção de água na matriz extracelular. Também está relacionado ao suporte à produção de colágeno e laminina na junção dermoepidérmica, ajudando a reforçar a coesão entre a epiderme e sua estrutura de sustentação. Essa combinação fundamenta seu uso em formulações voltadas à firmeza e à elasticidade da pele.',
    'Derivado de xilose para suporte à matriz extracelular e à firmeza cutânea',
    'Leve este ingrediente para a próxima etapa: compartilhe o objetivo do projeto no Formulário de Atendimento.',
    'Hydroxypropyl Tetrahydropyrantriol',
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-antissinais'),
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
  VALUES (gen_random_uuid()::text, '873646.1000',
          (SELECT id FROM ingredients WHERE slug = 'wrinfix-px'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '873646.10000',
          (SELECT id FROM ingredients WHERE slug = 'wrinfix-px'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wrinfix-px'),
          (SELECT id FROM tags WHERE slug = 'ativo-antissinais'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wrinfix-px'),
          (SELECT id FROM tags WHERE slug = 'biotecnologia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wrinfix-px'),
          (SELECT id FROM tags WHERE slug = 'wrinfix'))
  ON CONFLICT DO NOTHING;

  --   4. WrinFix H8
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'WrinFix H8',
    'wrinfix-h8',
    'WrinFix H8 é o Acetyl Hexapeptide-8 da READLINE, um peptídeo desenvolvido para formulações cosméticas voltadas à aparência de linhas de expressão, especialmente em produtos faciais e para a região periocular.

O mecanismo cosmético proposto baseia-se na mimetização de um domínio estrutural da proteína SNAP-25 e na competição por posição no complexo SNARE. Esse processo reduz a liberação de acetilcolina e a transmissão do sinal neuromuscular, contribuindo temporariamente para suavizar a aparência de padrões dinâmicos da pele. As alegações devem permanecer no campo cosmético e ser sustentadas pela avaliação do produto acabado.',
    'Hexapeptídeo para formulações voltadas a linhas de expressão',
    'Descreva sua aplicação no Formulário de Atendimento e converse com a equipe Lipid sobre os próximos passos.',
    'Acetyl Hexapeptide-8',
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-antissinais'),
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
  VALUES (gen_random_uuid()::text, '873653.100',
          (SELECT id FROM ingredients WHERE slug = 'wrinfix-h8'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wrinfix-h8'),
          (SELECT id FROM tags WHERE slug = 'ativo-antissinais'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wrinfix-h8'),
          (SELECT id FROM tags WHERE slug = 'biotecnologia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'wrinfix-h8'),
          (SELECT id FROM tags WHERE slug = 'wrinfix'))
  ON CONFLICT DO NOTHING;

  --   5. HydraFix-Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'HydraFix-Pro',
    'hydrafix-pro',
    'HydraFix-Pro é a ectoína da READLINE, um derivado cíclico de aminoácido associado à adaptação de microrganismos halófilos a ambientes de alta salinidade. Em cosméticos, atua como ativo de hidratação e proteção biomolecular diante de fatores de estresse ambiental.

A ectoína organiza moléculas de água ao redor de biomoléculas, contribuindo para a estabilização de proteínas, lipídios e membranas. Esse mecanismo sustenta aplicações voltadas à proteção contra desidratação, radiação UV, irritantes e poluentes, além de apoiar o conforto cutâneo e a manutenção da condição global da pele.',
    'Ectoína para proteção biomolecular e hidratação prolongada',
    'Quer avaliar este produto no seu sistema? Preencha o Formulário de Atendimento e envie os requisitos técnicos.',
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
  VALUES (gen_random_uuid()::text, '873647.1000',
          (SELECT id FROM ingredients WHERE slug = 'hydrafix-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'hydrafix-pro'),
          (SELECT id FROM tags WHERE slug = 'hidratacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'hydrafix-pro'),
          (SELECT id FROM tags WHERE slug = 'biotecnologia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'hydrafix-pro'),
          (SELECT id FROM tags WHERE slug = 'hydrafix'))
  ON CONFLICT DO NOTHING;

  --   6. UltraHeal-Pro
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'UltraHeal-Pro',
    'ultraheal-pro',
    'UltraHeal-Pro é o Copper Tripeptide-1 da READLINE, um complexo coordenado entre o tripeptídeo Gly- His-Lys (GHK) e um íon cobre. A coordenação metálica confere coloração azul ao material e exige atenção específica à compatibilidade durante o desenvolvimento da formulação.

O ativo apresenta ação sobre queratinócitos e fibroblastos e está relacionado ao suporte à síntese de componentes da matriz extracelular, como colágeno e glicosaminoglicanos. A documentação técnica também associa o ingrediente à modulação de mediadores inflamatórios e à atividade antioxidante, fundamentos para sua aplicação em produtos voltados à firmeza, linhas finas, conforto e recuperação da aparência da pele.',
    'Peptídeo de cobre para suporte à matriz extracelular e ao conforto cutâneo',
    'Inclua este produto na sua avaliação técnica: preencha o Formulário de Atendimento e detalhe o projeto.',
    'Copper Tripeptide-1',
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-reparadores'),
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
  VALUES (gen_random_uuid()::text, '873648.1000',
          (SELECT id FROM ingredients WHERE slug = 'ultraheal-pro'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ultraheal-pro'),
          (SELECT id FROM tags WHERE slug = 'reparacao-cutanea'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ultraheal-pro'),
          (SELECT id FROM tags WHERE slug = 'biotecnologia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ultraheal-pro'),
          (SELECT id FROM tags WHERE slug = 'ultraheal'))
  ON CONFLICT DO NOTHING;

  --   7. AntiGly-Ex
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'AntiGly-Ex',
    'antigly-ex',
    'AntiGly-Ex é o Decarboxy Carnosine HCl da READLINE, um pseudodipeptídeo composto por beta-alanina e histamina. Sua estrutura difere da carnosina e apresenta maior resistência à hidrólise por carnosinase, característica relevante para estratégias cosméticas antiglicação.

O ativo reage com açúcares redutores e interfere na glicação não enzimática entre açúcares e proteínas.

Esse mecanismo está relacionado à redução da formação de produtos finais de glicação avançada (AGEs) e à limitação de ligações cruzadas anormais do colágeno na matriz extracelular. Em cosméticos, pode integrar formulações voltadas à manutenção da elasticidade, da função de barreira e da aparência uniforme da pele.',
    'Pseudodipeptídeo para estratégias cosméticas antiglicação',
    'Transforme a necessidade técnica em um plano de desenvolvimento. Comece pelo Formulário de Atendimento.',
    'Decarboxy Carnosine HCl',
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-antiglicacao'),
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
  VALUES (gen_random_uuid()::text, '873649.1000',
          (SELECT id FROM ingredients WHERE slug = 'antigly-ex'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'antigly-ex'),
          (SELECT id FROM tags WHERE slug = 'antiglicacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'antigly-ex'),
          (SELECT id FROM tags WHERE slug = 'biotecnologia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'antigly-ex'),
          (SELECT id FROM tags WHERE slug = 'antigly'))
  ON CONFLICT DO NOTHING;

  --   8. AntiOxd-Ex
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'AntiOxd-Ex',
    'antioxd-ex',
    'AntiOxd-Ex é a ergothioneine da READLINE, um derivado de histidina contendo enxofre, reconhecido por sua capacidade de interagir com diferentes espécies reativas de oxigênio. Em projetos cosméticos, o ingrediente é utilizado como componente antioxidante para formulações voltadas à proteção da pele diante de radiação, poluição e outros fatores associados ao estresse oxidativo.

A documentação técnica relaciona a ergothioneine à redução de ROS induzidas por UV, à modulação de respostas inflamatórias e à preservação da homeostase do colágeno em modelos celulares. Na formulação, o objetivo é incorporá-la em sistemas nos quais sua estabilidade, disponibilidade e compatibilidade com antioxidantes, metais, pH e sistema conservante sejam avaliadas no produto acabado.',
    'Ergothioneine para proteção antioxidante e suporte contra o estresse fotoinduzido',
    'Compartilhe o desafio da formulação no Formulário de Atendimento e avance com a equipe Lipid.',
    'Ergothioneine',
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'antioxidantes'),
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
  VALUES (gen_random_uuid()::text, '873650.100',
          (SELECT id FROM ingredients WHERE slug = 'antioxd-ex'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'antioxd-ex'),
          (SELECT id FROM tags WHERE slug = 'antioxidante'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'antioxd-ex'),
          (SELECT id FROM tags WHERE slug = 'biotecnologia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'antioxd-ex'),
          (SELECT id FROM tags WHERE slug = 'antioxd'))
  ON CONFLICT DO NOTHING;

  --   9. β-Nicotinamide Mononucleotide
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'β-Nicotinamide Mononucleotide',
    'beta-nicotinamide-mononucleotide',
    'β-Nicotinamide Mononucleotide, ou β-NMN, é um nucleotídeo formado por nicotinamida, ribose e fosfato.

Em sistemas biológicos, participa da rota de biossíntese do NAD+, coenzima central em reações de oxirredução, metabolismo energético e processos celulares associados à manutenção e ao reparo.

Em cosméticos, o β-NMN pode ser estudado em formulações orientadas a conceitos de vitalidade, recuperação e envelhecimento saudável da pele. A tradução desses mecanismos para benefícios tópicos depende da concentração efetivamente disponível, da estabilidade do nucleotídeo no veículo e de estudos específicos com o produto final; por isso, alegações devem ser construídas com base em dados aplicáveis à formulação.',
    'Nucleotídeo precursor de NAD+ para conceitos cosméticos de metabolismo e vitalidade celular',
    'Aproxime este ingrediente da sua formulação. Envie o Formulário de Atendimento para iniciar a análise técnica.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'cofatores-e-metabolismo-celular'),
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
  VALUES (gen_random_uuid()::text, '873651.1000',
          (SELECT id FROM ingredients WHERE slug = 'beta-nicotinamide-mononucleotide'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '873651.10000',
          (SELECT id FROM ingredients WHERE slug = 'beta-nicotinamide-mononucleotide'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'beta-nicotinamide-mononucleotide'),
          (SELECT id FROM tags WHERE slug = 'nmn'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'beta-nicotinamide-mononucleotide'),
          (SELECT id FROM tags WHERE slug = 'nad'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'beta-nicotinamide-mononucleotide'),
          (SELECT id FROM tags WHERE slug = 'metabolismo-celular'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'beta-nicotinamide-mononucleotide'),
          (SELECT id FROM tags WHERE slug = 'biotecnologia'))
  ON CONFLICT DO NOTHING;

  --  10. Glutathione
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Glutathione',
    'glutathione',
    'Glutathione é o tripeptídeo γ-glutamil-cisteinil-glicina, presente em sistemas biológicos nas formas reduzida e oxidada. O grupo tiol da cisteína participa de reações de oxirredução, tornando o ingrediente relevante para projetos cosméticos que buscam suporte antioxidante e proteção contra espécies reativas.

Em formulações para pele, o glutathione também é estudado em conceitos de luminosidade e uniformização do tom, sempre com a necessidade de sustentar as alegações no produto final. Por ser sensível à oxidação, o desenvolvimento deve controlar exposição ao ar, metais, agentes oxidantes, pH, temperatura e condições de armazenamento.',
    'Tripeptídeo redox para sistemas antioxidantes e de uniformização do tom',
    'Para discutir compatibilidade, concentração e processo, preencha o Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'antioxidantes'),
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
  VALUES (gen_random_uuid()::text, '873652.1000',
          (SELECT id FROM ingredients WHERE slug = 'glutathione'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredient_codes (id, code, "ingredientId", "order")
  VALUES (gen_random_uuid()::text, '873652.10000',
          (SELECT id FROM ingredients WHERE slug = 'glutathione'), 1)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'glutathione'),
          (SELECT id FROM tags WHERE slug = 'glutationa'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'glutathione'),
          (SELECT id FROM tags WHERE slug = 'antioxidante'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'glutathione'),
          (SELECT id FROM tags WHERE slug = 'tripeptideo'))
  ON CONFLICT DO NOTHING;

  --  11. Ergothioneine
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Ergothioneine',
    'ergothioneine',
    'Ergothioneine é um derivado de histidina contendo enxofre, produzido na natureza por determinados microrganismos. Sua química favorece a interação com espécies reativas e sustenta seu uso como antioxidante em formulações cosméticas voltadas à proteção contra estresse ambiental e fotoinduzido.

No desenvolvimento, pode ser associada a sistemas de cuidado facial, corporal e periocular, desde que sua estabilidade e compatibilidade sejam demonstradas. A seleção do veículo deve considerar pH, temperatura, presença de metais, agentes oxidantes e a capacidade da embalagem de limitar degradação durante a vida útil.',
    'Aminoácido sulfurado para proteção celular diante de estressores ambientais',
    'Leve os requisitos da sua formulação à equipe Lipid pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'antioxidantes'),
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
  VALUES (gen_random_uuid()::text, '873655.1000',
          (SELECT id FROM ingredients WHERE slug = 'ergothioneine'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ergothioneine'),
          (SELECT id FROM tags WHERE slug = 'ergotioneina'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ergothioneine'),
          (SELECT id FROM tags WHERE slug = 'antioxidante'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'ergothioneine'),
          (SELECT id FROM tags WHERE slug = 'aminoacido'))
  ON CONFLICT DO NOTHING;

  --  12. Repigard-II
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Repigard-II',
    'repigard-ii',
    'Repigard-II é a Ceramide NS/NG da READLINE, um lipídio estrutural relacionado às ceramidas presentes em barreiras biológicas. Em cuidados capilares, ceramidas são utilizadas para complementar a matriz lipídica da cutícula e apoiar formulações destinadas a fios danificados, porosos ou submetidos a processos químicos e térmicos.

Sua aplicação exige dispersão adequada em sistemas lipídicos, emulsões ou veículos capazes de manter o ingrediente distribuído e disponível sobre a fibra. O desempenho deve ser avaliado por parâmetros como penteabilidade, resistência, fricção, perda proteica, brilho e integridade cuticular no produto acabado.',
    'Ceramide NS/NG para reposição lipídica e reparação da superfície capilar',
    'Dê continuidade ao desenvolvimento: registre sua necessidade no Formulário de Atendimento.',
    'Ceramide NS/NG',
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-para-pigmentacao'),
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
  VALUES (gen_random_uuid()::text, '873660.100',
          (SELECT id FROM ingredients WHERE slug = 'repigard-ii'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'repigard-ii'),
          (SELECT id FROM tags WHERE slug = 'pigmentacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'repigard-ii'),
          (SELECT id FROM tags WHERE slug = 'biotecnologia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'repigard-ii'),
          (SELECT id FROM tags WHERE slug = 'repigard'))
  ON CONFLICT DO NOTHING;

  --  13. Repigard-IIIB
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'Repigard-IIIB',
    'repigard-iiib',
    'Repigard-IIIB é a Ceramide NP da READLINE. Ceramidas são componentes fundamentais da organização lipídica do estrato córneo e também podem ser empregadas em sistemas de cuidado capilar, nos quais contribuem para estratégias de reposição de lipídios e melhoria da condição superficial.

O ingrediente pode ser estudado em cremes, loções, bálsamos, máscaras e condicionadores, com um sistema de dispersão compatível com sua baixa afinidade pela fase aquosa. A eficácia depende da deposição, da organização no veículo e da interação com outros lipídios, emulsificantes e agentes condicionantes.',
    'Ceramide NP para reforço da barreira e cuidado de pele e cabelos',
    'Avalie a aplicação deste ingrediente com a equipe Lipid. Preencha o Formulário de Atendimento.',
    'Ceramide NP',
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'ativos-para-pigmentacao'),
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
  VALUES (gen_random_uuid()::text, '873661.100',
          (SELECT id FROM ingredients WHERE slug = 'repigard-iiib'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'repigard-iiib'),
          (SELECT id FROM tags WHERE slug = 'pigmentacao'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'repigard-iiib'),
          (SELECT id FROM tags WHERE slug = 'biotecnologia'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'repigard-iiib'),
          (SELECT id FROM tags WHERE slug = 'repigard'))
  ON CONFLICT DO NOTHING;

  --  14. NAD+ (Cosméticos)
  INSERT INTO ingredients (id, name, slug, description, excerpt, cta, inci, "partnerId", "categoryId", active, "updatedAt")
  VALUES (
    gen_random_uuid()::text,
    'NAD+ (Cosméticos)',
    'nad-cosmeticos',
    'NAD+ é a forma oxidada da nicotinamida adenina dinucleotídeo, coenzima essencial em reações de oxirredução e no metabolismo energético. Também participa como substrato de enzimas relacionadas a sinalização e reparo celular, o que fundamenta seu interesse em pesquisa de cosméticos orientados à longevidade e à resiliência da pele.

A incorporação direta de NAD+ em produtos tópicos demanda avaliação rigorosa de estabilidade, disponibilidade e compatibilidade, pois se trata de uma molécula polar e estruturalmente complexa. O desenvolvimento deve demonstrar a manutenção do teor ao longo da vida útil e relacionar qualquer benefício cosmético a ensaios realizados com a formulação final.',
    'Coenzima redox para pesquisa cosmética em energia, reparo e resiliência celular',
    'Comece a análise técnica do seu projeto pelo Formulário de Atendimento.',
    NULL,
    v_partner_id,
    (SELECT id FROM ingredient_categories WHERE slug = 'cofatores-e-metabolismo-celular'),
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
  VALUES (gen_random_uuid()::text, '873662.1000',
          (SELECT id FROM ingredients WHERE slug = 'nad-cosmeticos'), 0)
  ON CONFLICT (code) DO UPDATE SET "ingredientId" = EXCLUDED."ingredientId", "order" = EXCLUDED."order";
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'nad-cosmeticos'),
          (SELECT id FROM tags WHERE slug = 'nad'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'nad-cosmeticos'),
          (SELECT id FROM tags WHERE slug = 'coenzima'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'nad-cosmeticos'),
          (SELECT id FROM tags WHERE slug = 'metabolismo-celular'))
  ON CONFLICT DO NOTHING;
  INSERT INTO ingredients_on_tags ("ingredientId", "tagId")
  VALUES ((SELECT id FROM ingredients WHERE slug = 'nad-cosmeticos'),
          (SELECT id FROM tags WHERE slug = 'cosmeticos'))
  ON CONFLICT DO NOTHING;

END $$;

COMMIT;
