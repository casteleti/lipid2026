-- Seed da página institucional nova (/institucional) — layout blocos alternados.
-- GERADO por scripts/seed-institucional/seed_institucional.py — não editar à mão.
-- Idempotente: reexecutar atualiza conteúdo (seções por slug), não duplica.

BEGIN;

-- ===== hero (institutional_hero) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'hero', 'institutional_hero', 0,
  'LIPID INGREDIENTS', 'Ingredientes especializados. Decisões técnicas mais bem fundamentadas.', 'Desde 2006, a Lipid Ingredients atua no Brasil conectando matérias-primas de alto padrão, conhecimento aplicado e suporte técnico para projetos farmacêuticos, cosméticos, nutricionais e veterinários.',
  'Nosso trabalho começa antes da compra e continua durante a avaliação do ingrediente, o desenvolvimento da formulação, a análise documental e a preparação para escala.', 'Tecnologia internacional, leitura técnica local e acompanhamento próximo de cada projeto.', NULL,
  'Falar com um especialista', '/contato',
  'Conhecer as soluções', '/produtos',
  'Composição abstrata de fundo: bicamada lipídica, membranas e partículas em suspensão, tom azul-profundo/verde-técnico. Não usar foto de bancada de laboratório genérica como peça principal — é pra ler como ciência, não estoque.', NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'hero');

-- ===== quem-somos (editorial_intro) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'quem-somos', 'editorial_intro', 1,
  'QUEM SOMOS', 'Uma empresa brasileira construída na interface entre ciência, indústria e aplicação.', NULL,
  'A Lipid Ingredients atua com pesquisa, desenvolvimento e fornecimento de ingredientes para diferentes segmentos produtivos. O portfólio reúne tecnologias voltadas a formulações farmacêuticas, cosméticas, nutricionais e veterinárias.

Mais do que apresentar uma lista de matérias-primas, a equipe busca compreender o objetivo do projeto, a via de aplicação, o processo produtivo, os requisitos documentais e os desafios de desempenho da formulação.

Essa abordagem aproxima fabricantes, equipes de desenvolvimento, universidades, centros de pesquisa e indústrias que precisam transformar conhecimento técnico em produtos viáveis.', NULL, 'Uma matéria-prima só se torna solução quando composição, aplicação, processo e documentação apontam na mesma direção.',
  NULL, NULL,
  NULL, NULL,
  'Foto real da equipe, do escritório ou do laboratório — horizontal, tom documental (retrato do dia a dia, não still de banco de imagens).', NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'quem-somos');
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'quem-somos'),
  0, NULL, 'atuação no mercado brasileiro', NULL,
  NULL, 'Desde 2006', NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'quem-somos'),
  1, NULL, 'farmacêutica, cosmética, nutricional e veterinária', NULL,
  NULL, '4 frentes', NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'quem-somos'),
  2, NULL, 'proximidade local com acesso ao portfólio do Grupo Lipoid', NULL,
  NULL, 'Brasil + tecnologia global', NULL,
  NULL, NULL, NULL, now()
);

-- ===== como-atuamos (process_story) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'como-atuamos', 'process_story', 2,
  'COMO ATUAMOS', 'O fornecimento é uma etapa. O desenvolvimento é o caminho inteiro.', 'Cada projeto exige perguntas diferentes. Por isso, a atuação da Lipid é organizada em etapas que ajudam a reduzir escolhas genéricas e a concentrar a análise no que realmente interfere no produto final.',
  NULL, 'Da bancada à escala industrial, a pergunta não é apenas “qual ingrediente usar?”, mas “qual ingrediente faz sentido neste sistema?”', NULL,
  NULL, NULL,
  NULL, NULL,
  'Diagrama abstrato de etapas conectadas por linhas finas — reforça a ideia de processo sem precisar de foto (a timeline de números já carrega a estrutura).', NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'como-atuamos');
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'como-atuamos'),
  0, NULL, 'Entender o objetivo', NULL,
  'Mapeamos aplicação, via de uso, forma farmacêutica ou cosmética, posicionamento do produto, processo previsto e requisitos prioritários.', '01', NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'como-atuamos'),
  1, NULL, 'Selecionar possibilidades', NULL,
  'Relacionamos o desafio da formulação às características tecnológicas, à origem, ao grau de qualidade e à documentação disponível para cada ingrediente.', '02', NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'como-atuamos'),
  2, NULL, 'Apoiar a avaliação', NULL,
  'A equipe auxilia na leitura técnica, na comparação entre alternativas e no planejamento dos testes necessários para verificar compatibilidade e desempenho.', '03', NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'como-atuamos'),
  3, NULL, 'Preparar a continuidade', NULL,
  'Quando o projeto avança, documentação, parâmetros de processo, fornecimento e escala passam a fazer parte da mesma conversa.', '04', NULL,
  NULL, NULL, NULL, now()
);

-- ===== attention (attention_panel) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'attention', 'attention_panel', 3,
  'PONTOS DE ATENÇÃO', 'O que precisa ser considerado antes de escolher uma matéria-prima', 'Produtos com nomes semelhantes podem apresentar diferenças relevantes de origem, composição, concentração, grau, sistema solvente, preservação ou documentação. A seleção deve ser feita pelo conjunto de requisitos do projeto.',
  NULL, 'A documentação orienta. O desenvolvimento confirma.', NULL,
  NULL, NULL,
  NULL, NULL,
  'Textura de fundo abstrata e discreta (bicamada lipídica em baixo contraste sobre azul profundo) — decorativa, não precisa de foto real aqui.', NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'attention');
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'attention'),
  0, 'route', 'Aplicação e via de uso', NULL,
  'A mesma família de ingredientes pode ter apresentações destinadas a usos e níveis de exigência diferentes.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'attention'),
  1, 'file-check-2', 'Grau e documentação', NULL,
  'Ficha técnica, especificação, certificado de análise e documentação regulatória devem ser avaliados conforme o mercado e a finalidade do produto.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'attention'),
  2, 'flask-conical', 'Compatibilidade na formulação', NULL,
  'Solubilidade, dispersão, pH, temperatura, eletrólitos, oxidação, cisalhamento e interação com outros componentes precisam ser verificados no sistema final.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'attention'),
  3, 'factory', 'Processo e escala', NULL,
  'Um resultado de bancada não elimina a necessidade de avaliar transferência de processo, equipamentos, ordem de adição e estabilidade em escala.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'attention'),
  4, 'shield-check', 'Validação responsável', NULL,
  'Propriedades, alegações e parâmetros de uso não devem ser extrapolados sem documentação vigente e testes adequados ao produto final.', NULL, NULL,
  NULL, NULL, NULL, now()
);

-- ===== areas (sector_bento_grid) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'areas', 'sector_bento_grid', 4,
  'ÁREAS ATENDIDAS', 'Conhecimento que atravessa diferentes mercados, sem tratar todos os projetos da mesma forma.', NULL,
  NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  NULL, NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'areas');
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'areas'),
  0, NULL, 'Farmacêutica', 'Ingredientes e sistemas lipídicos para formulações que exigem controle, consistência e documentação.',
  'Atuação com lecitinas, fosfolipídios e sistemas relacionados a aplicações tópicas, orais e parenterais, sempre considerando o grau e os requisitos específicos do projeto.', NULL, 'Ver soluções farmacêuticas',
  '/produtos/farmaceutico', 'Still técnico de formulação farmacêutica (cápsulas, ampola, sistema de entrega) — tom clínico, não estoque genérico.', '{"anchorId": "farmaceutica"}'::jsonb, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'areas'),
  1, NULL, 'Cosmética', 'Tecnologia de formulação, ativos, extratos botânicos e fosfolipídios para cuidado pessoal.',
  'Soluções para projetos de skincare, haircare, higiene e outras categorias cosméticas, com atenção à forma de apresentação, ao processo e ao posicionamento da formulação.', NULL, 'Ver soluções cosméticas',
  '/produtos/cosmetico', 'Foto de textura ou aplicação cosmética (creme, sérum, emulsão) com iluminação clean, still de produto ou mão aplicando.', '{"anchorId": "cosmetica"}'::jsonb, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'areas'),
  2, NULL, 'Nutricional', 'Lecitinas, fosfolipídios purificados e sistemas funcionais para suplementos e alimentos.',
  'Ingredientes voltados a aplicações nutricionais, incluindo fontes de fosfatidilcolina, fosfatidilserina, glicerofosfocolina e formulações lipídicas.', NULL, 'Ver soluções nutricionais',
  '/produtos/nutricao', 'Still de suplemento/cápsulas nutricionais ou da matéria-prima de origem (ex. grão, lecitina) — tom técnico-alimentício.', '{"anchorId": "nutricional"}'::jsonb, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'areas'),
  3, NULL, 'Veterinária', 'Tecnologias aplicáveis à saúde, à formulação e à nutrição animal.',
  'Seleção de ingredientes com avaliação técnica alinhada à espécie, à forma de administração, ao processo e aos requisitos do produto veterinário.', NULL, 'Ver soluções veterinárias',
  '/produtos/veterinario', 'Imagem relacionada a nutrição/saúde animal em tom técnico — evitar clichê ''fofo'', manter o mesmo registro editorial das outras três.', '{"anchorId": "veterinaria"}'::jsonb, now()
);

-- ===== group-bridge (statement_break) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'group-bridge', 'statement_break', 5,
  NULL, NULL, 'Essa ponte reduz ruído entre o catálogo internacional e as decisões concretas de formulação, documentação e fornecimento.',
  'A Lipid aproxima o acesso a tecnologias globais da realidade regulatória, produtiva e técnica de quem desenvolve no Brasil.', NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'Grafismo abstrato de conexão Brasil–Europa — linhas finas ligando dois nós/pontos, sem mapa literal (conforme instrução de design da fonte).', NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'group-bridge');

-- ===== grupo-lipoid (dual_company_feature) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'grupo-lipoid', 'dual_company_feature', 6,
  'GRUPO LIPOID', 'Uma relação construída sobre especialização em fosfolipídios, ativos e ingredientes de alta qualidade.', 'A Lipid Ingredients se apresenta como representante exclusivo no Brasil do Grupo Lipoid. O grupo reúne operações especializadas em fosfolipídios para aplicações farmacêuticas, nutricionais e cosméticas, além de ativos e extratos botânicos para cuidados pessoais.',
  NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  NULL, '{"disclaimer": "Certificações, documentos regulatórios, graus disponíveis e condições de fornecimento variam conforme produto e aplicação. A documentação vigente deve ser confirmada durante o atendimento."}'::jsonb, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'grupo-lipoid');
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'grupo-lipoid'),
  0, NULL, 'Lipoid', 'Fosfolipídios e sistemas lipídicos',
  'Fundada em 1977, a Lipoid desenvolve e fabrica fosfolipídios naturais, hidrogenados e sintéticos em diferentes graus e apresentações. Seu portfólio atende aplicações farmacêuticas, nutricionais e cosméticas, incluindo sistemas de entrega baseados em lipídios.', NULL, 'Conhecer a Lipoid',
  'https://lipoid.com/en/', 'Imagem institucional da Lipoid — planta produtiva (Ludwigshafen) ou still de produto/embalagem, se houver material cedido pelo fabricante.', '{"keyPoints": ["Portfólio amplo de fosfolipídios.", "Atuação internacional e produção em escala industrial.", "Unidades produtivas com sistemas de qualidade voltados às exigências farmacêuticas.", "Suporte documental disponível para diferentes produtos e aplicações."], "externalLink": true}'::jsonb, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'grupo-lipoid'),
  1, NULL, 'Lipoid Kosmetik', 'Ativos, botânicos e fosfolipídios cosméticos',
  'A Lipoid Kosmetik atua no desenvolvimento e fornecimento de ativos de alta qualidade, extratos botânicos e produtos fosfolipídicos para a indústria cosmética e de cuidados pessoais.', NULL, 'Conhecer a Lipoid Kosmetik',
  'https://www.lipoid-kosmetik.com/', 'Imagem institucional da Lipoid Kosmetik — ativo botânico, extrato ou aplicação cosmética, se houver material cedido pelo fabricante.', '{"keyPoints": ["Mais de cinco décadas de experiência no mercado cosmético.", "Portfólio de ativos, extratos botânicos e tecnologias fosfolipídicas.", "Foco em produtos funcionais, naturais e tecnicamente documentados.", "Aplicações em diferentes categorias de cuidados pessoais."], "externalLink": true}'::jsonb, now()
);

-- ===== qualidade (quality_framework) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'qualidade', 'quality_framework', 7,
  'QUALIDADE E DOCUMENTAÇÃO', 'Qualidade não é uma frase de rodapé. É parte da arquitetura do projeto.', 'A seleção de um ingrediente especializado envolve mais do que identidade comercial. Origem, composição, especificações, grau, método analítico, rastreabilidade e documentação precisam acompanhar a finalidade pretendida.',
  NULL, NULL, 'Em projetos regulados, escolher bem o ingrediente também significa saber exatamente qual documentação acompanha essa escolha.',
  NULL, NULL,
  NULL, NULL,
  'Still de documentação técnica (ficha técnica, CoA, laudo) sobre mesa, ou textura de laboratório de controle de qualidade — reforça ''documentação real'', não decoração.', NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'qualidade');
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'qualidade'),
  0, NULL, 'Especificação adequada', NULL,
  'A escolha deve considerar o nível de pureza, a composição e os limites definidos para a aplicação.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'qualidade'),
  1, NULL, 'Documentação vigente', NULL,
  'Ficha técnica, CoA, declarações, métodos e documentos regulatórios devem ser confirmados para o produto e lote aplicáveis.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'qualidade'),
  2, NULL, 'Consistência de fornecimento', NULL,
  'Planejamento de demanda, apresentação comercial e continuidade de fornecimento fazem parte da avaliação industrial.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'qualidade'),
  3, NULL, 'Suporte técnico', NULL,
  'Dúvidas de aplicação e documentação precisam chegar à equipe certa antes de se tornarem problemas no desenvolvimento.', NULL, NULL,
  NULL, NULL, NULL, now()
);

-- ===== important-topics (important_topics) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'important-topics', 'important_topics', 8,
  'TÓPICOS IMPORTANTES', 'O que a equipe pode ajudar a organizar durante o desenvolvimento', NULL,
  NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  NULL, NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'important-topics');
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'important-topics'),
  0, NULL, 'Seleção de ingredientes', NULL,
  'Comparação entre famílias, fontes, concentrações, apresentações e graus de qualidade.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'important-topics'),
  1, NULL, 'Desenvolvimento de produto', NULL,
  'Discussão de aplicação, arquitetura da formulação, estratégia de incorporação e testes necessários.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'important-topics'),
  2, NULL, 'Escalonamento', NULL,
  'Avaliação de processo, ordem de adição, equipamentos, condições térmicas e pontos críticos.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'important-topics'),
  3, NULL, 'Documentação técnica', NULL,
  'Orientação sobre fichas, especificações, certificados, métodos e documentos disponíveis.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'important-topics'),
  4, NULL, 'Pesquisa e inovação', NULL,
  'Apoio a universidades, centros de pesquisa e empresas na avaliação de tecnologias especializadas.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'important-topics'),
  5, NULL, 'Fornecimento', NULL,
  'Alinhamento de apresentação comercial, demanda, disponibilidade e continuidade do projeto.', NULL, NULL,
  NULL, NULL, NULL, now()
);

-- ===== service-proof (compact_service_list) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'service-proof', 'compact_service_list', 9,
  'ATUAÇÃO PRÁTICA', 'Onde o suporte técnico encontra o trabalho cotidiano', NULL,
  NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  NULL, NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'service-proof');
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'service-proof'),
  0, NULL, NULL, NULL,
  'Auxílio no desenvolvimento de novos produtos.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'service-proof'),
  1, NULL, NULL, NULL,
  'Discussão de soluções personalizadas conforme o projeto.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'service-proof'),
  2, NULL, NULL, NULL,
  'Acompanhamento da pesquisa à preparação para escala industrial.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'service-proof'),
  3, NULL, NULL, NULL,
  'Fornecimento de matérias-primas com documentação correspondente.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'service-proof'),
  4, NULL, NULL, NULL,
  'Suporte em documentação e métodos analíticos disponíveis.', NULL, NULL,
  NULL, NULL, NULL, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'service-proof'),
  5, NULL, NULL, NULL,
  'Atendimento técnico para dúvidas de aplicação.', NULL, NULL,
  NULL, NULL, NULL, now()
);

-- ===== closing-manifesto (closing_manifesto) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'closing-manifesto', 'closing_manifesto', 10,
  NULL, 'Boas formulações começam com perguntas melhores.', NULL,
  'Conte à equipe o que você está desenvolvendo, quais requisitos precisa atender e onde estão as principais incertezas. A partir desse contexto, a conversa deixa de ser apenas sobre catálogo e passa a ser sobre decisão técnica.', 'O ingrediente certo não é o mais conhecido. É o que melhor responde ao projeto.', NULL,
  'Preencher o Formulário de Atendimento', '/contato',
  NULL, NULL,
  'Fundo escuro com grafismo de partícula/membrana lipídica em destaque, sutil — dá profundidade ao bloco de fechamento sem competir com o CTA.', NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'closing-manifesto');

-- ===== contact (contact_strip) =====
INSERT INTO institutional_sections
  (id, slug, type, "order", eyebrow, title, subtitle, body, highlight, quote,
   "ctaLabel", "ctaHref", "secondaryCtaLabel", "secondaryCtaHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text, 'contact', 'contact_strip', 11,
  NULL, 'Fale com a Lipid Ingredients', 'Apresente sua aplicação, o estágio do desenvolvimento e os requisitos técnicos prioritários.',
  NULL, NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'Foto real da sede da Lipid Ingredients em Ribeirão Preto (fachada ou recepção), ou mapa estilizado de localização.', NULL, now()
)
ON CONFLICT (slug) DO UPDATE SET
  type = EXCLUDED.type, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  title = EXCLUDED.title, subtitle = EXCLUDED.subtitle, body = EXCLUDED.body,
  highlight = EXCLUDED.highlight, quote = EXCLUDED.quote,
  "ctaLabel" = EXCLUDED."ctaLabel", "ctaHref" = EXCLUDED."ctaHref",
  "secondaryCtaLabel" = EXCLUDED."secondaryCtaLabel", "secondaryCtaHref" = EXCLUDED."secondaryCtaHref",
  "imageHint" = EXCLUDED."imageHint", extra = EXCLUDED.extra, "updatedAt" = now();
DELETE FROM institutional_section_items WHERE "sectionId" = (SELECT id FROM institutional_sections WHERE slug = 'contact');
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'contact'),
  0, NULL, 'Localização', NULL,
  'Supera Parque de Inovação e Tecnologia de Ribeirão Preto, Ribeirão Preto/SP', NULL, NULL,
  NULL, NULL, '{"type": "location"}'::jsonb, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'contact'),
  1, NULL, 'Telefone', NULL,
  '+55 16 3315-9925', NULL, NULL,
  'tel:+551633159925', NULL, '{"type": "phone"}'::jsonb, now()
);
INSERT INTO institutional_section_items
  (id, "sectionId", "order", icon, title, subtitle, text, value, "linkLabel", "linkHref", "imageHint", extra, "updatedAt")
VALUES (
  gen_random_uuid()::text,
  (SELECT id FROM institutional_sections WHERE slug = 'contact'),
  2, NULL, 'E-mail', NULL,
  'contato@lipid.com.br', NULL, NULL,
  'mailto:contato@lipid.com.br', NULL, '{"type": "email"}'::jsonb, now()
);

COMMIT;