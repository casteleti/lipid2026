-- Seed das páginas de segmento (/segmentos/*)
-- GERADO por scripts/seed-segmentos/seed_segmentos.py — não editar à mão.
-- Idempotente: reexecutar atualiza conteúdo, não duplica.

BEGIN;


-- ===== farmaceutica (FARMACEUTICA) =====
INSERT INTO segment_pages (
  id, slug, sector, "order", eyebrow, h1, subheadline, "salesParagraphs",
  "applicationsTitle", "applicationsIntro", applications, "floatingHighlight",
  "ingredientExplorerHeadline", "ingredientExplorerSupportingText",
  "formEyebrow", "formTitle", "formDescription", "formValueProposition",
  "formCtaLabel", "formSuccessMessage", "formChallengeOptions",
  "seoTitle", "seoDescription", "seoKeywords", "updatedAt"
) VALUES (
  gen_random_uuid()::text, 'farmaceutica', 'FARMACEUTICA'::"LeadSector", 0,
  'SOLUÇÕES PARA A INDÚSTRIA FARMACÊUTICA', 'Tecnologia lipídica para formulações farmacêuticas de maior valor.', 'Ingredientes, sistemas lipídicos e suporte técnico para projetos que exigem controle, consistência, documentação e diferenciação.',
  '["Na indústria farmacêutica, um ingrediente não é apenas um componente da fórmula. Ele influencia estabilidade, processabilidade, compatibilidade, perfil de entrega e viabilidade industrial. A Lipid Ingredients aproxima sua equipe de fabricantes internacionais reconhecidos em fosfolipídios, lecitinas e tecnologias lipídicas, oferecendo uma seleção técnica orientada às exigências reais de cada projeto.", "Nossa atuação começa pelo entendimento da forma farmacêutica, da rota de administração, do ativo, do processo e dos requisitos regulatórios. A partir desse diagnóstico, ajudamos a identificar famílias de ingredientes, graus de qualidade e sistemas de entrega capazes de reduzir incertezas no desenvolvimento e sustentar uma formulação mais robusta, documentada e preparada para escala.", "O objetivo é agregar mais valor ao produto final. Isso significa apoiar soluções que possam melhorar o desempenho da formulação, facilitar o desenvolvimento, fortalecer o posicionamento técnico e criar diferenciais relevantes diante dos concorrentes. A Lipid Ingredients atua como ponte entre a inovação internacional e a aplicação prática na indústria brasileira."]'::jsonb,
  'Onde as soluções lipídicas podem ser aplicadas', 'Ideias de produtos e plataformas que podem utilizar ingredientes e sistemas representados pela Lipid Ingredients.',
  '[{"title": "Injetáveis e soluções parenterais", "description": "Sistemas que exigem elevada pureza, compatibilidade, controle de partículas e documentação técnica."}, {"title": "Formulações lipossomais", "description": "Veículos de encapsulação e entrega para ativos hidrofílicos, lipofílicos ou sensíveis."}, {"title": "Nanopartículas e sistemas de entrega", "description": "Plataformas lipídicas para desenvolvimento de produtos com arquitetura de entrega avançada."}, {"title": "Cápsulas moles e duras", "description": "Formulações que utilizam lipídios, fosfolipídios ou sistemas dispersantes para melhorar a apresentação do ativo."}, {"title": "Suspensões e emulsões farmacêuticas", "description": "Produtos que demandam estabilidade física, distribuição homogênea e desempenho consistente."}, {"title": "Produtos tópicos e transdérmicos", "description": "Cremes, géis, pomadas e sistemas de liberação para aplicação cutânea."}, {"title": "Produtos oftálmicos", "description": "Formulações que requerem seleção criteriosa de excipientes e alto controle de qualidade."}, {"title": "Medicamentos de baixa solubilidade", "description": "Estratégias de formulação para ativos com desafios de dispersão, solubilização ou biodisponibilidade."}, {"title": "Produtos biológicos e peptídicos", "description": "Sistemas de proteção e entrega para moléculas sensíveis, conforme viabilidade técnica e regulatória."}, {"title": "Formulações de liberação modificada", "description": "Projetos que buscam modular o comportamento do ativo por meio da composição e organização lipídica."}]'::jsonb,
  'Da seleção do excipiente à diferenciação do medicamento: tecnologia lipídica transforma formulação em vantagem competitiva.',
  'Conheça alguns ingredientes e sistemas buscados em projetos farmacêuticos:', 'Use os filtros para explorar famílias de ingredientes. A disponibilidade, o grau e a adequação devem ser confirmados com a equipe técnica.',
  'TRAGA SEU DESAFIO DE FORMULAÇÃO', 'Como podemos agregar mais valor ao seu produto farmacêutico?',
  'Compartilhe o estágio do projeto, o ativo, a forma farmacêutica e os principais desafios. Nossa equipe avaliará como ingredientes e tecnologias lipídicas podem ajudar a construir uma solução mais robusta, tecnicamente defensável e diferente das alternativas concorrentes.', 'Nosso foco é identificar onde a tecnologia pode elevar o valor percebido e técnico do seu produto, criando diferenciação que faça sentido para o mercado, para o processo e para a estratégia regulatória.',
  'Compartilhar meu projeto', 'Projeto recebido. Nossa equipe técnica fará uma análise inicial e entrará em contato pelos dados informados.',
  '["solubilidade", "estabilidade", "encapsulação", "entrega direcionada", "processabilidade", "compatibilidade", "escala industrial", "documentação", "outro"]'::jsonb,
  'Ingredientes e sistemas lipídicos para a indústria farmacêutica | Lipid Ingredients', 'Fosfolipídios, lecitinas e sistemas lipídicos de fabricantes internacionais para formulações farmacêuticas que exigem desempenho, documentação e consistência.', '["fosfolipídios farmacêuticos", "lipossomas", "excipientes lipídicos", "lecitina farmacêutica", "sistemas de entrega", "ingredientes para formulação farmacêutica"]'::jsonb,
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  sector = EXCLUDED.sector, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  h1 = EXCLUDED.h1, subheadline = EXCLUDED.subheadline, "salesParagraphs" = EXCLUDED."salesParagraphs",
  "applicationsTitle" = EXCLUDED."applicationsTitle", "applicationsIntro" = EXCLUDED."applicationsIntro",
  applications = EXCLUDED.applications, "floatingHighlight" = EXCLUDED."floatingHighlight",
  "ingredientExplorerHeadline" = EXCLUDED."ingredientExplorerHeadline",
  "ingredientExplorerSupportingText" = EXCLUDED."ingredientExplorerSupportingText",
  "formEyebrow" = EXCLUDED."formEyebrow", "formTitle" = EXCLUDED."formTitle",
  "formDescription" = EXCLUDED."formDescription", "formValueProposition" = EXCLUDED."formValueProposition",
  "formCtaLabel" = EXCLUDED."formCtaLabel", "formSuccessMessage" = EXCLUDED."formSuccessMessage",
  "formChallengeOptions" = EXCLUDED."formChallengeOptions",
  "seoTitle" = EXCLUDED."seoTitle", "seoDescription" = EXCLUDED."seoDescription",
  "seoKeywords" = EXCLUDED."seoKeywords", "updatedAt" = now();

-- ===== cosmetica (COSMETICO) =====
INSERT INTO segment_pages (
  id, slug, sector, "order", eyebrow, h1, subheadline, "salesParagraphs",
  "applicationsTitle", "applicationsIntro", applications, "floatingHighlight",
  "ingredientExplorerHeadline", "ingredientExplorerSupportingText",
  "formEyebrow", "formTitle", "formDescription", "formValueProposition",
  "formCtaLabel", "formSuccessMessage", "formChallengeOptions",
  "seoTitle", "seoDescription", "seoKeywords", "updatedAt"
) VALUES (
  gen_random_uuid()::text, 'cosmetica', 'COSMETICO'::"LeadSector", 1,
  'SOLUÇÕES PARA A INDÚSTRIA COSMÉTICA', 'Formulações cosméticas que transformam tecnologia em experiência.', 'Fosfolipídios, lecitinas e sistemas de encapsulação para produtos com melhor desempenho, narrativa técnica e valor percebido.',
  '["Em cosméticos, a diferenciação nasce da combinação entre ciência, sensorial, estabilidade e uma história de produto que o consumidor consiga perceber. A Lipid Ingredients representa fabricantes internacionais especializados em fosfolipídios, lecitinas e sistemas lipídicos, conectando tecnologias sofisticadas às necessidades práticas de skincare, haircare, higiene e cuidados pessoais.", "Nossa abordagem considera o ativo, a base cosmética, o processo, a textura desejada, o posicionamento da marca e a experiência de uso. Com esse contexto, ajudamos a selecionar ingredientes capazes de contribuir para emulsificação, dispersão, encapsulação, proteção de ativos e construção de sistemas biomiméticos, sempre respeitando os limites técnicos e regulatórios de cada formulação.", "Mais do que adicionar um ingrediente premium, buscamos agregar mais valor ao produto do cliente. O resultado esperado é uma formulação com argumento técnico consistente, melhor capacidade de diferenciação e maior potencial de ocupar um espaço próprio no mercado. A Lipid Ingredients ajuda a transformar complexidade molecular em uma proposta comercial mais clara e competitiva."]'::jsonb,
  'Produtos cosméticos que podem incorporar tecnologia lipídica', 'Possibilidades de aplicação para projetos que buscam desempenho, estabilidade e diferenciação.',
  '[{"title": "Séruns faciais", "description": "Sistemas leves para entrega e proteção de ativos em propostas de alta performance."}, {"title": "Cremes e emulsões", "description": "Produtos que exigem estabilidade, textura controlada e integração de ingredientes lipofílicos."}, {"title": "Hidratantes biomiméticos", "description": "Formulações inspiradas na organização lipídica natural da pele."}, {"title": "Protetores solares", "description": "Sistemas complexos que podem demandar dispersão, estabilidade e compatibilidade entre fases."}, {"title": "Produtos anti-idade", "description": "Veículos para ativos sensíveis e narrativas de tecnologia avançada."}, {"title": "Máscaras faciais", "description": "Produtos de tratamento intensivo com sistemas de entrega e texturas diferenciadas."}, {"title": "Shampoos e condicionadores", "description": "Aplicações capilares com foco em deposição, condicionamento e estabilidade."}, {"title": "Leave-ins e reparadores", "description": "Formulações para cuidado da fibra, brilho, toque e proteção."}, {"title": "Produtos para couro cabeludo", "description": "Séruns, loções e emulsões destinados a rotinas especializadas."}, {"title": "Dermocosméticos", "description": "Produtos que combinam posicionamento técnico, alta exigência de formulação e comunicação responsável."}]'::jsonb,
  'Quando a tecnologia fica invisível na fórmula, ela aparece no desempenho, no sensorial e no valor percebido.',
  'Conheça alguns ingredientes buscados em formulações cosméticas:', 'Explore famílias de fosfolipídios e lecitinas para diferentes bases, texturas e propostas de produto.',
  'DESENVOLVA UMA EXPERIÊNCIA DIFERENTE', 'Como podemos agregar mais valor ao seu cosmético?',
  'Conte qual produto está desenvolvendo, quais ativos deseja utilizar e que experiência pretende entregar. A Lipid Ingredients avaliará como a tecnologia lipídica pode reforçar desempenho, estabilidade, sensorial e diferenciação diante dos concorrentes.', 'O ingrediente certo deve resolver um desafio técnico e, ao mesmo tempo, fortalecer a proposta de valor do produto. Nosso trabalho é ajudar sua equipe a conectar esses dois lados.',
  'Compartilhar meu projeto cosmético', 'Recebemos seu projeto. Nossa equipe analisará o conceito, a formulação e os diferenciais buscados.',
  '["estabilidade", "sensorial", "encapsulação", "proteção de ativo", "dispersão", "emulsificação", "posicionamento premium", "diferenciação", "outro"]'::jsonb,
  'Fosfolipídios e tecnologia de formulação para cosméticos | Lipid Ingredients', 'Ingredientes e sistemas lipídicos internacionais para skincare, haircare, higiene e cosméticos que buscam estabilidade, sensorial e diferenciação.', '["fosfolipídios cosméticos", "lecitina cosmética", "lipossomas cosméticos", "encapsulação de ativos", "ingredientes para skincare", "sistemas lipídicos cosméticos"]'::jsonb,
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  sector = EXCLUDED.sector, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  h1 = EXCLUDED.h1, subheadline = EXCLUDED.subheadline, "salesParagraphs" = EXCLUDED."salesParagraphs",
  "applicationsTitle" = EXCLUDED."applicationsTitle", "applicationsIntro" = EXCLUDED."applicationsIntro",
  applications = EXCLUDED.applications, "floatingHighlight" = EXCLUDED."floatingHighlight",
  "ingredientExplorerHeadline" = EXCLUDED."ingredientExplorerHeadline",
  "ingredientExplorerSupportingText" = EXCLUDED."ingredientExplorerSupportingText",
  "formEyebrow" = EXCLUDED."formEyebrow", "formTitle" = EXCLUDED."formTitle",
  "formDescription" = EXCLUDED."formDescription", "formValueProposition" = EXCLUDED."formValueProposition",
  "formCtaLabel" = EXCLUDED."formCtaLabel", "formSuccessMessage" = EXCLUDED."formSuccessMessage",
  "formChallengeOptions" = EXCLUDED."formChallengeOptions",
  "seoTitle" = EXCLUDED."seoTitle", "seoDescription" = EXCLUDED."seoDescription",
  "seoKeywords" = EXCLUDED."seoKeywords", "updatedAt" = now();

-- ===== nutricional (NUTRICIONAL) =====
INSERT INTO segment_pages (
  id, slug, sector, "order", eyebrow, h1, subheadline, "salesParagraphs",
  "applicationsTitle", "applicationsIntro", applications, "floatingHighlight",
  "ingredientExplorerHeadline", "ingredientExplorerSupportingText",
  "formEyebrow", "formTitle", "formDescription", "formValueProposition",
  "formCtaLabel", "formSuccessMessage", "formChallengeOptions",
  "seoTitle", "seoDescription", "seoKeywords", "updatedAt"
) VALUES (
  gen_random_uuid()::text, 'nutricional', 'NUTRICIONAL'::"LeadSector", 2,
  'SOLUÇÕES PARA A INDÚSTRIA NUTRICIONAL', 'Ingredientes lipídicos para produtos nutricionais com mais função e mais valor.', 'Lecitinas, fosfolipídios purificados e sistemas funcionais para suplementos, alimentos e bebidas que precisam se destacar.',
  '["O mercado nutricional exige produtos que sejam tecnicamente consistentes, industrialmente viáveis e fáceis de compreender. A Lipid Ingredients representa fabricantes internacionais reconhecidos em lecitinas, fosfolipídios e sistemas lipídicos, oferecendo à indústria acesso a ingredientes capazes de apoiar formulações mais funcionais e propostas de produto mais relevantes.", "Nossa equipe analisa a matriz do alimento ou suplemento, a dose, a forma de apresentação, o processo, a estabilidade e o posicionamento comercial. Esse olhar permite selecionar ingredientes adequados para cápsulas, pós, bebidas, emulsões e alimentos funcionais, considerando tanto o desempenho na formulação quanto a documentação necessária para o projeto.", "A meta é agregar mais valor ao produto do cliente e ajudá-lo a sair da comparação puramente por preço. Quando a tecnologia do ingrediente sustenta uma função clara, uma composição diferenciada ou uma experiência superior, o produto conquista argumentos mais fortes para competir. A Lipid Ingredients transforma o portfólio internacional em oportunidades de inovação aplicáveis ao mercado local."]'::jsonb,
  'Produtos nutricionais que podem utilizar ingredientes lipídicos', 'Ideias para desenvolvimento, reformulação ou diferenciação de linhas nutricionais.',
  '[{"title": "Suplementos em cápsulas", "description": "Produtos mono ou multingredientes com fosfolipídios e componentes funcionais."}, {"title": "Pós para preparo", "description": "Misturas nutricionais que demandam dispersão, estabilidade e facilidade de uso."}, {"title": "Bebidas funcionais", "description": "Sistemas líquidos ou reconstituíveis com desafios de emulsificação e compatibilidade."}, {"title": "Nutrição esportiva", "description": "Produtos voltados a rotinas de desempenho, recuperação e conveniência, conforme enquadramento permitido."}, {"title": "Nutrição para longevidade", "description": "Formulações destinadas a consumidores que buscam composição sofisticada e respaldo técnico."}, {"title": "Produtos para cognição e foco", "description": "Suplementos com fosfolipídios específicos, respeitando requisitos regulatórios e alegações autorizadas."}, {"title": "Fórmulas nutricionais completas", "description": "Produtos complexos que requerem integração entre lipídios, proteínas, carboidratos e micronutrientes."}, {"title": "Alimentos funcionais", "description": "Barras, snacks, cremes, pastas e outras matrizes com ingredientes de valor agregado."}, {"title": "Nutrição clínica", "description": "Formulações especializadas com alta exigência de qualidade, consistência e documentação."}, {"title": "Produtos plant-based", "description": "Soluções com lecitinas e fosfolipídios de origem vegetal para propostas alinhadas ao posicionamento da marca."}]'::jsonb,
  'Valor nutricional também é arquitetura de produto: o ingrediente certo conecta função, formulação e posicionamento.',
  'Conheça alguns ingredientes buscados em suplementos e alimentos:', 'Navegue por fontes, concentrações e funcionalidades. Confirme a adequação ao enquadramento regulatório do produto.',
  'CRIE UM PRODUTO NUTRICIONAL MAIS RELEVANTE', 'Como podemos agregar mais valor à sua formulação nutricional?',
  'Compartilhe o público, o formato, a proposta funcional e o desafio técnico do projeto. A Lipid Ingredients ajudará a identificar ingredientes capazes de melhorar a formulação e criar uma diferenciação clara diante dos concorrentes.', 'Queremos ajudar seu produto a competir por valor, não apenas por preço. Isso começa com uma composição tecnicamente coerente e um diferencial que possa ser explicado ao mercado.',
  'Compartilhar meu projeto nutricional', 'Projeto recebido. Nossa equipe avaliará as possibilidades de ingredientes, aplicação e diferenciação.',
  '["dispersão", "estabilidade", "sabor", "dose", "origem vegetal", "rotulagem", "diferenciação", "escala", "outro"]'::jsonb,
  'Lecitinas e fosfolipídios para suplementos e alimentos | Lipid Ingredients', 'Ingredientes lipídicos de fabricantes internacionais para suplementos, alimentos funcionais, bebidas, pós e produtos nutricionais diferenciados.', '["fosfolipídios nutricionais", "lecitina de girassol", "fosfatidilcolina", "fosfatidilserina", "ingredientes para suplementos", "sistemas lipídicos nutricionais"]'::jsonb,
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  sector = EXCLUDED.sector, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  h1 = EXCLUDED.h1, subheadline = EXCLUDED.subheadline, "salesParagraphs" = EXCLUDED."salesParagraphs",
  "applicationsTitle" = EXCLUDED."applicationsTitle", "applicationsIntro" = EXCLUDED."applicationsIntro",
  applications = EXCLUDED.applications, "floatingHighlight" = EXCLUDED."floatingHighlight",
  "ingredientExplorerHeadline" = EXCLUDED."ingredientExplorerHeadline",
  "ingredientExplorerSupportingText" = EXCLUDED."ingredientExplorerSupportingText",
  "formEyebrow" = EXCLUDED."formEyebrow", "formTitle" = EXCLUDED."formTitle",
  "formDescription" = EXCLUDED."formDescription", "formValueProposition" = EXCLUDED."formValueProposition",
  "formCtaLabel" = EXCLUDED."formCtaLabel", "formSuccessMessage" = EXCLUDED."formSuccessMessage",
  "formChallengeOptions" = EXCLUDED."formChallengeOptions",
  "seoTitle" = EXCLUDED."seoTitle", "seoDescription" = EXCLUDED."seoDescription",
  "seoKeywords" = EXCLUDED."seoKeywords", "updatedAt" = now();

-- ===== veterinaria (VETERINARIO) =====
INSERT INTO segment_pages (
  id, slug, sector, "order", eyebrow, h1, subheadline, "salesParagraphs",
  "applicationsTitle", "applicationsIntro", applications, "floatingHighlight",
  "ingredientExplorerHeadline", "ingredientExplorerSupportingText",
  "formEyebrow", "formTitle", "formDescription", "formValueProposition",
  "formCtaLabel", "formSuccessMessage", "formChallengeOptions",
  "seoTitle", "seoDescription", "seoKeywords", "updatedAt"
) VALUES (
  gen_random_uuid()::text, 'veterinaria', 'VETERINARIO'::"LeadSector", 3,
  'SOLUÇÕES PARA A INDÚSTRIA VETERINÁRIA', 'Tecnologia lipídica para produtos de saúde e nutrição animal mais competitivos.', 'Ingredientes e sistemas para formulações que precisam considerar espécie, administração, estabilidade, desempenho e aceitação.',
  '["O desenvolvimento veterinário exige uma visão integrada da espécie, da forma de administração, da estabilidade e da rotina de uso. A Lipid Ingredients representa fabricantes internacionais de lecitinas, fosfolipídios e sistemas lipídicos, disponibilizando tecnologias que podem apoiar projetos de saúde, suplementação e nutrição animal.", "Nossa equipe trabalha a partir do desafio concreto do cliente: proteger um ativo, melhorar sua dispersão, viabilizar uma forma de apresentação, facilitar o processo ou estruturar uma proposta de maior valor. A seleção considera requisitos técnicos, documentação, escala, compatibilidade e particularidades do produto veterinário, sem aplicar soluções genéricas a contextos distintos.", "O propósito é agregar mais valor ao produto do cliente e diferenciá-lo dos concorrentes de maneira tecnicamente defensável. Uma formulação mais bem construída pode ampliar a confiança do canal, fortalecer o posicionamento da marca e melhorar a experiência de uso para tutores, produtores e profissionais. A Lipid Ingredients conecta inovação internacional a aplicações veterinárias comercialmente relevantes."]'::jsonb,
  'Produtos veterinários que podem utilizar soluções lipídicas', 'Possibilidades para saúde, suplementação e nutrição de diferentes espécies.',
  '[{"title": "Suplementos para animais de companhia", "description": "Cápsulas, pós, líquidos, pastas e petiscos funcionais."}, {"title": "Produtos para saúde articular", "description": "Formulações de suporte nutricional com ingredientes e sistemas de entrega diferenciados."}, {"title": "Produtos para pele e pelagem", "description": "Suplementos e formulações tópicas com foco em composição lipídica e experiência de uso."}, {"title": "Formulações orais veterinárias", "description": "Suspensões, emulsões, soluções e pastas que precisam de estabilidade e facilidade de administração."}, {"title": "Produtos injetáveis veterinários", "description": "Formulações de maior exigência técnica, documental e de qualidade."}, {"title": "Nutrição para animais de produção", "description": "Ingredientes funcionais para rações, premixes e suplementos, conforme a espécie e o objetivo."}, {"title": "Produtos para aquicultura", "description": "Soluções para matrizes e processos específicos de alimentação e suplementação aquática."}, {"title": "Encapsulação de ativos sensíveis", "description": "Sistemas destinados à proteção e incorporação de componentes em diferentes matrizes."}, {"title": "Petiscos funcionais", "description": "Produtos de conveniência que combinam palatabilidade, estabilidade e proposta nutricional."}, {"title": "Dermatológicos veterinários", "description": "Cremes, loções, sprays e sistemas tópicos com requisitos de formulação específicos."}]'::jsonb,
  'Na saúde animal, diferenciação nasce quando tecnologia, aplicação e rotina de uso funcionam como um único sistema.',
  'Conheça alguns ingredientes buscados em projetos veterinários:', 'Explore famílias de ingredientes e sistemas. A adequação depende da espécie, da dose, da via de administração e do enquadramento regulatório.',
  'CONTE-NOS O DESAFIO DO SEU PRODUTO', 'Como podemos agregar mais valor ao seu produto veterinário?',
  'Informe a espécie, a forma de administração, o objetivo do produto e os principais desafios técnicos. A Lipid Ingredients avaliará como ingredientes e sistemas lipídicos podem apoiar uma solução mais consistente e diferenciada dos concorrentes.', 'Buscamos diferenciais que tenham utilidade prática, coerência técnica e força comercial. O objetivo é transformar tecnologia de formulação em valor percebido pelo canal e pelo cliente final.',
  'Compartilhar meu projeto veterinário', 'Recebemos seu projeto. Nossa equipe fará uma avaliação inicial considerando espécie, aplicação e requisitos técnicos.',
  '["estabilidade", "dispersão", "palatabilidade", "encapsulação", "dose", "administração", "escala", "diferenciação", "outro"]'::jsonb,
  'Ingredientes e sistemas lipídicos para saúde e nutrição animal | Lipid Ingredients', 'Lecitinas, fosfolipídios e tecnologias lipídicas para formulações veterinárias e nutricionais voltadas a diferentes espécies e formas de administração.', '["fosfolipídios veterinários", "lecitina para nutrição animal", "sistemas lipídicos veterinários", "ingredientes para saúde animal", "encapsulação veterinária", "formulação veterinária"]'::jsonb,
  now()
)
ON CONFLICT (slug) DO UPDATE SET
  sector = EXCLUDED.sector, "order" = EXCLUDED."order", eyebrow = EXCLUDED.eyebrow,
  h1 = EXCLUDED.h1, subheadline = EXCLUDED.subheadline, "salesParagraphs" = EXCLUDED."salesParagraphs",
  "applicationsTitle" = EXCLUDED."applicationsTitle", "applicationsIntro" = EXCLUDED."applicationsIntro",
  applications = EXCLUDED.applications, "floatingHighlight" = EXCLUDED."floatingHighlight",
  "ingredientExplorerHeadline" = EXCLUDED."ingredientExplorerHeadline",
  "ingredientExplorerSupportingText" = EXCLUDED."ingredientExplorerSupportingText",
  "formEyebrow" = EXCLUDED."formEyebrow", "formTitle" = EXCLUDED."formTitle",
  "formDescription" = EXCLUDED."formDescription", "formValueProposition" = EXCLUDED."formValueProposition",
  "formCtaLabel" = EXCLUDED."formCtaLabel", "formSuccessMessage" = EXCLUDED."formSuccessMessage",
  "formChallengeOptions" = EXCLUDED."formChallengeOptions",
  "seoTitle" = EXCLUDED."seoTitle", "seoDescription" = EXCLUDED."seoDescription",
  "seoKeywords" = EXCLUDED."seoKeywords", "updatedAt" = now();

COMMIT;