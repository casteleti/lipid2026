-- =============================================================================
-- Conteúdo editorial das landings /tecnologias/<slug>
--
-- Base técnica: "Lipid Ingredients — Tecnologias lipídicas em escala industrial"
-- (documento interno, julho/2026), que por sua vez cita FDA (Liposome Drug Products
-- CMC), Phospholipid Research Center, LIPOID GmbH, Liu P. et al. (Int J Nanomedicine,
-- 2022) e Nsairat H. et al. (Heliyon, 2022).
--
-- Idempotente: só faz UPDATE nas 3 tecnologias já cadastradas, por slug. Rodar de novo
-- reescreve o conteúdo com o que está aqui — nenhuma linha é criada ou apagada.
--
--   psql -h localhost -p 5432 -d lipid_development -f seed_tecnologias.sql
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 01 · LIPOSSOMAS
-- -----------------------------------------------------------------------------
UPDATE technologies SET
  eyebrow      = 'Tecnologia lipídica',
  h1           = 'O lipossoma não é uma cápsula. É uma decisão de engenharia.',
  subheadline  = 'Composição, processo e caracterização definem o que a vesícula realmente entrega. Trabalhamos essas três variáveis com fosfolipídios de origem rastreada e fabricantes internacionais de referência — entre eles o grupo alemão LIPOID.',
  "heroCtaLabel" = 'Discutir meu projeto liposomal',

  "imageOneUrl"     = '/tecnologias/lipossomas-arquitetura.svg',
  "imageOneAlt"     = 'Corte esquemático de um lipossoma: núcleo aquoso, bicamada fosfolipídica e interface',
  "imageOneCaption" = 'Três regiões, três destinos possíveis para o ativo — e é a afinidade química que decide qual deles é viável.',

  "imageTwoUrl"     = '/tecnologias/lipossomas-populacao.svg',
  "imageTwoAlt"     = 'Vesículas unilamelares, multilamelares e populações heterogêneas, com os atributos que compõem a especificação',
  "imageTwoCaption" = 'Uma especificação liposomal descreve uma população inteira. Um número isolado descreve pouco.',

  "essenceTitle" = 'Onde os projetos liposomais são ganhos ou perdidos',
  "essenceIntro" = 'Lipossoma é fácil de anunciar e difícil de sustentar. A distância entre um claim defensável e uma promessa frágil está em decisões tomadas antes do primeiro lote piloto — e é exatamente aí que entramos.',

  pillars = '[
    {
      "title": "A arquitetura é definida pelo ativo",
      "description": "Hidrossolúvel no núcleo aquoso, lipossolúvel na bicamada, anfifílico na interface. A afinidade entre ingrediente e lipídio, a proporção entre fases, o pH e a força iônica determinam a carga real — não a intenção descrita no fluxograma."
    },
    {
      "title": "Especificação vai muito além do tamanho médio",
      "description": "Distribuição de tamanho, índice de polidispersidade, carga superficial, morfologia e proporção entre ativo livre e encapsulado. É o conjunto que sustenta o dossiê, e ele precisa ser definido a partir do objetivo do produto."
    },
    {
      "title": "Escala pensada desde a bancada",
      "description": "Hidratação, cisalhamento, homogeneização, extrusão e filtração mudam de comportamento entre o laboratório e a planta. Matéria-prima com identidade, pureza e perfil de ácidos graxos consistentes reduz variabilidade e encurta validação."
    },
    {
      "title": "Estabilidade até o fim do prazo de validade",
      "description": "Fusão de vesículas, sedimentação, hidrólise, oxidação e perda de material encapsulado são riscos de prateleira e de transporte. Antioxidantes, pH, atmosfera e embalagem fazem parte da estratégia — e nunca substituem o estudo de estabilidade."
    }
  ]'::jsonb,

  "authorityStatement" = 'Tecnologia liposomal séria não se prova na imagem de uma esfera perfeita. Prova-se em vesículas caracterizadas, processo reprodutível e evidência compatível com o benefício comunicado.',

  "criteriaTitle" = 'O que colocamos na mesa',
  criteria = '[
    {
      "label": "Seleção de fosfolipídios",
      "description": "Grau, origem e pureza escolhidos pela via de uso e pelo mercado de destino — não pelo nome da matéria-prima."
    },
    {
      "label": "Concentrados e sistemas pré-formulados",
      "description": "Acesso a materiais prontos para uso quando o cronograma não comporta desenvolvimento do zero."
    },
    {
      "label": "Documentação para mercado regulado",
      "description": "Especificações, métodos analíticos e rastreabilidade que acompanham o produto no registro e na auditoria."
    },
    {
      "label": "Leitura crítica de alegações",
      "description": "O que a sua formulação final sustenta hoje — e o que precisaria ser demonstrado para sustentar mais."
    }
  ]'::jsonb,

  "formEyebrow"          = 'Projeto liposomal',
  "formTitle"            = 'Traga o ativo. A arquitetura a gente discute junto.',
  "formDescription"      = 'Descreva o ativo, a forma pretendida e o mercado de destino. Retornamos com uma leitura técnica inicial: caminhos de lipídio viáveis, o que exige teste e o que já existe pronto para uso.',
  "formValueProposition" = 'Cada decisão bem tomada na escolha do lipídio economiza semanas de tentativa e erro na bancada.',
  "formCtaLabel"         = 'Enviar meu projeto',
  "formSuccessMessage"   = 'Projeto recebido. Nossa equipe técnica fará uma leitura inicial e retorna com os caminhos possíveis para o seu ativo.',
  "formChallengeOptions" = '["Ativo instável","Baixa solubilidade","Escalonamento","Estabilidade em prateleira","Definição de especificação","Documentação regulatória"]'::jsonb,

  "seoTitle"       = 'Lipossomas: tecnologia liposomal para indústria',
  "seoDescription" = 'Fosfolipídios, concentrados liposomais e sistemas pré-formulados de fabricantes internacionais de referência, com suporte técnico da formulação à escala industrial.',
  "seoKeywords"    = '["lipossomas","tecnologia liposomal","fosfolipídios","encapsulação lipídica","LIPOID","formulação farmacêutica"]'::jsonb
WHERE slug = 'lipossomas';

-- -----------------------------------------------------------------------------
-- 02 · FOSFOLIPÍDIOS
-- -----------------------------------------------------------------------------
UPDATE technologies SET
  eyebrow      = 'Tecnologia lipídica',
  h1           = 'Fosfolipídio não é commodity. É especificação.',
  subheadline  = 'Origem, grau de pureza, perfil de ácidos graxos e forma de apresentação mudam o que a molécula faz dentro da sua formulação. Conectamos sua indústria a fabricantes internacionais que dominam essa química — entre eles o grupo alemão LIPOID.',
  "heroCtaLabel" = 'Comparar alternativas com critério',

  "imageOneUrl"     = '/tecnologias/fosfolipidios-molecula.svg',
  "imageOneAlt"     = 'Estrutura anfifílica de um fosfolipídio: região polar e cadeias apolares, e as principais classes',
  "imageOneCaption" = 'Uma região com afinidade por água, outra por óleo. Dessa dupla natureza vem tudo o que o fosfolipídio faz na formulação.',

  "imageTwoUrl"     = '/tecnologias/fosfolipidios-organizacao.svg',
  "imageTwoAlt"     = 'Monocamada, micela, bicamada e vesícula formadas por fosfolipídios',
  "imageTwoCaption" = 'A mesma família de moléculas assume estruturas diferentes conforme concentração, hidratação e processo.',

  "essenceTitle" = 'Por que dois fosfolipídios com o mesmo nome se comportam de formas diferentes',
  "essenceIntro" = 'Uma lecitina enriquecida, um fosfolipídio altamente purificado e uma molécula sintética definida podem aparecer sob a mesma palavra em uma cotação — e entregar desempenho, estabilidade e status regulatório completamente distintos.',

  pillars = '[
    {
      "title": "É uma família, não um ingrediente",
      "description": "Fosfatidilcolina, fosfatidiletanolamina, fosfatidilglicerol e fosfatidilserina têm carga, hidratação, temperatura de transição e interação molecular próprias. A escolha começa pelo papel funcional desejado, não pela nomenclatura."
    },
    {
      "title": "A origem decide mais do que o rótulo",
      "description": "Soja, girassol, gema de ovo, rotas semissintéticas e sintéticas mudam junto composição, alergênicos, estabilidade oxidativa, posicionamento de mercado e o pacote documental disponível."
    },
    {
      "title": "Pureza é comportamento, não adjetivo",
      "description": "Concentração do componente principal, perfil de fosfolipídios secundários, umidade, solventes residuais, metais, índice de peróxidos e carga microbiana são o que separa dois materiais que o comercial trata como equivalentes."
    },
    {
      "title": "Grau correto para a via de uso",
      "description": "Compêndios aplicáveis, status de excipiente, rastreabilidade, certificações e limites de impurezas. Material destinado a alimentos não se torna adequado a uso parenteral por conveniência de projeto."
    }
  ]'::jsonb,

  "authorityStatement" = 'Quando o fornecedor troca de fonte no meio do projeto, quem paga a conta é o dossiê. Consistência entre lotes e gestão de mudanças fazem parte da tecnologia — não são detalhe de compras.',

  "criteriaTitle" = 'Como conduzimos a escolha',
  criteria = '[
    {
      "label": "Comparação por atributo, não por preço de tabela",
      "description": "Composição, origem, pureza, funcionalidade e exigência regulatória lado a lado, para a decisão sair de critérios objetivos."
    },
    {
      "label": "Portfólio do natural ao sintético",
      "description": "Materiais naturais, enriquecidos, altamente purificados, sintéticos e sistemas fosfolipídicos prontos para uso, conforme o mercado e a aplicação."
    },
    {
      "label": "Especificação e método, não só nome",
      "description": "Ficha completa, grau de purificação, método de produção e consistência entre lotes — o que sustenta a reprodutibilidade em escala."
    },
    {
      "label": "Fornecimento com pacote documental",
      "description": "Disponibilidade física é o mínimo. O que sustenta um produto de longo ciclo é histórico de qualidade, suporte técnico e capacidade de manter a especificação até o fim do projeto."
    }
  ]'::jsonb,

  "formEyebrow"          = 'Seleção de fosfolipídio',
  "formTitle"            = 'Diga o que a formulação precisa fazer. Indicamos o material.',
  "formDescription"      = 'Conte a função pretendida, a via de uso e o mercado de destino. Retornamos com as alternativas coerentes com esses requisitos e o que diferencia uma da outra na prática.',
  "formValueProposition" = 'Especificar bem na entrada evita reformulação, retrabalho de dossiê e troca de fornecedor no meio do caminho.',
  "formCtaLabel"         = 'Solicitar orientação técnica',
  "formSuccessMessage"   = 'Solicitação recebida. Vamos analisar os requisitos e retornar com as alternativas que atendem à sua aplicação.',
  "formChallengeOptions" = '["Definir grau e pureza","Origem e alergênicos","Estabilidade oxidativa","Exigência regulatória","Consistência entre lotes","Substituição de fornecedor"]'::jsonb,

  "seoTitle"       = 'Fosfolipídios: seleção técnica por grau, origem e pureza',
  "seoDescription" = 'Fosfatidilcolina e demais fosfolipídios naturais, enriquecidos, purificados e sintéticos de fabricantes internacionais de referência, com suporte de especificação e documentação.',
  "seoKeywords"    = '["fosfolipídios","fosfatidilcolina","lecitina purificada","excipiente lipídico","LIPOID","grau farmacêutico"]'::jsonb
WHERE slug = 'fosfolipidios';

-- -----------------------------------------------------------------------------
-- 03 · ENCAPSULAÇÃO
-- -----------------------------------------------------------------------------
UPDATE technologies SET
  eyebrow      = 'Tecnologia lipídica',
  h1           = 'Encapsular é resolver um problema mensurável.',
  subheadline  = 'Proteger, incorporar ou controlar liberação são objetivos diferentes, e cada um leva a um sistema diferente. Lipossomas, emulsões, partículas lipídicas, complexos e pós obtidos por secagem são meios — a escolha nasce do problema.',
  "heroCtaLabel" = 'Levar meu desafio de formulação',

  "imageOneUrl"     = '/tecnologias/encapsulacao-protecao.svg',
  "imageOneAlt"     = 'Comparação entre ativo exposto ao ambiente e ativo encapsulado em um carreador lipídico',
  "imageOneCaption" = 'O carreador não esconde o ativo: constrói ao redor dele um microambiente compatível com suas propriedades.',

  "imageTwoUrl"     = '/tecnologias/encapsulacao-liberacao.svg',
  "imageTwoAlt"     = 'Curvas ilustrativas de liberação imediata, prolongada e retardada',
  "imageTwoCaption" = 'Disponibilidade do ativo é uma variável de projeto — e o perfil pretendido precisa ser demonstrado, não presumido.',

  "essenceTitle" = 'Da intenção ao sistema certo',
  "essenceIntro" = 'Encapsulação é um conjunto amplo de estratégias, e a mais elegante na bancada raramente é a mais adequada na planta. O trabalho técnico está em traduzir o problema do produto no sistema que o resolve com processo viável e claim defensável.',

  pillars = '[
    {
      "title": "O problema define a tecnologia",
      "description": "Degradação por oxigênio, luz ou umidade? Incompatibilidade entre ingredientes? Sabor e odor? Dispersibilidade? Perfil de liberação? Cada resposta leva a uma arquitetura diferente — e descarta outras."
    },
    {
      "title": "Microambiente, não esconderijo",
      "description": "Solubilidade, coeficiente de partição, ionização, tamanho molecular e sensibilidade química definem onde o ativo se aloja e como ele se comporta dentro do carreador ao longo do tempo."
    },
    {
      "title": "O processo é metade do resultado",
      "description": "Hidratação de filme lipídico, alta pressão, microfluidização, extrusão, complexação e atomização geram estruturas muito diferentes. Capacidade de equipamento, produtividade e perdas entram na conta desde as primeiras etapas."
    },
    {
      "title": "Claim nasce de caracterização",
      "description": "Eficiência de encapsulação, ativo livre, tamanho e distribuição, potencial zeta, umidade, redispersibilidade e velocidade de liberação. Uma etapa declarada no fluxograma não é evidência de nada."
    }
  ]'::jsonb,

  "authorityStatement" = 'Nenhum carreador é uma muralha absoluta. O que se pode demonstrar — e é o que sustenta um produto — é que a versão encapsulada preserva melhor seus atributos ao longo do tempo.',

  "criteriaTitle" = 'Como reduzimos experimentação sem direção',
  criteria = '[
    {
      "label": "Definição do sistema antes do ensaio",
      "description": "Coerência entre ativo, matriz, processo disponível e alegação pretendida, antes de queimar tempo de bancada."
    },
    {
      "label": "Acesso a plataformas já industrializadas",
      "description": "Ingredientes e sistemas de fabricantes internacionais de referência, incluindo o grupo alemão LIPOID, em vez de reinventar cada etapa."
    },
    {
      "label": "Soluções prontas para uso quando cabe",
      "description": "Matérias-primas especializadas que encurtam desenvolvimento quando o cronograma não comporta um projeto do zero."
    },
    {
      "label": "Transferência de escala considerada desde o início",
      "description": "Parâmetros críticos, faixas operacionais e controles em processo definidos antes de o volume mudar as regras do jogo."
    }
  ]'::jsonb,

  "formEyebrow"          = 'Desafio de formulação',
  "formTitle"            = 'Diga o que precisa proteger. Nós dizemos o que é possível.',
  "formDescription"      = 'Descreva o ativo, o comportamento indesejado e a forma final pretendida. Retornamos com os sistemas de encapsulação coerentes com esse cenário e o que cada um exige em processo e comprovação.',
  "formValueProposition" = 'Um diagnóstico técnico honesto no início vale mais do que seis meses testando a tecnologia errada.',
  "formCtaLabel"         = 'Enviar meu desafio',
  "formSuccessMessage"   = 'Desafio recebido. Nossa equipe técnica vai avaliar o cenário e retornar com os caminhos de encapsulação aplicáveis.',
  "formChallengeOptions" = '["Degradação do ativo","Incompatibilidade entre ingredientes","Sabor ou odor","Dispersibilidade","Perfil de liberação","Transferência de escala"]'::jsonb,

  "seoTitle"       = 'Encapsulação: proteção, incorporação e liberação de ativos',
  "seoDescription" = 'Sistemas lipídicos de encapsulação — lipossomas, emulsões, partículas e pós — selecionados a partir do problema do produto, com suporte técnico e materiais qualificados.',
  "seoKeywords"    = '["encapsulação","sistemas lipídicos","liberação controlada","estabilidade de ativos","microencapsulação","carreadores lipídicos"]'::jsonb
WHERE slug = 'encapsulacao';

COMMIT;

-- Conferência rápida
SELECT slug, left(h1, 48) AS h1, jsonb_array_length(pillars) AS pilares,
       jsonb_array_length(criteria) AS criterios, "imageOneUrl" IS NOT NULL AS img1,
       "imageTwoUrl" IS NOT NULL AS img2
FROM technologies WHERE slug IN ('lipossomas', 'fosfolipidios', 'encapsulacao') ORDER BY "order";
