import type Anthropic from '@anthropic-ai/sdk';

/**
 * As 4 ferramentas do MVP. Poucas e bem definidas — a própria Anthropic recomenda
 * consolidar operações relacionadas em vez de multiplicar microferramentas ambíguas.
 * Cada uma só devolve dados que já existem no banco (nunca texto livre gerado por Claude),
 * o que é a barreira estrutural contra produto/dado inventado.
 */
export const LIA_TOOLS: Anthropic.Tool[] = [
  {
    name: 'search_ingredients',
    description:
      'Busca ingredientes no catálogo da LIPID por texto livre e/ou filtros estruturados. ' +
      'Use para descobrir candidatos quando o usuário descreve uma necessidade, aplicação ou ' +
      'característica desejada. Retorna apenas ingredientes que existem de fato no catálogo — ' +
      'nunca invente um resultado se a busca vier vazia, apenas informe que não encontrou nada.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description:
            'Texto livre para buscar por nome, INCI, código comercial ou resumo do ingrediente.',
        },
        categoria: {
          type: 'string',
          description: 'Slug ou nome aproximado da categoria técnica (ex.: "antioxidantes").',
        },
        fabricante: {
          type: 'string',
          description: 'Slug ou nome aproximado do fabricante (ex.: "lipoid", "readline-biotech").',
        },
        tecnologia: {
          type: 'string',
          description: 'Slug ou nome aproximado da tecnologia (ex.: "lipossomas").',
        },
        aplicacao: {
          type: 'string',
          description: 'Slug ou nome aproximado da aplicação (ex.: "serum-facial").',
        },
        limite: {
          type: 'integer',
          description: 'Máximo de resultados a retornar. Padrão 8, máximo 20.',
        },
      },
    },
  },
  {
    name: 'get_ingredient',
    description:
      'Retorna o registro completo e validado de um único ingrediente pelo id — descrição, ' +
      'INCI, fabricante, categoria, tags, tecnologias, aplicações e documentos disponíveis. ' +
      'Use antes de explicar ou detalhar qualquer ingrediente específico.',
    input_schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Id do ingrediente, obtido previamente via search_ingredients.',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'compare_ingredients',
    description:
      'Retorna os registros normalizados de 2 a 4 ingredientes lado a lado, para comparação. ' +
      'Compare apenas campos que vierem preenchidos no retorno — nunca complete uma diferença ' +
      'que os dados não sustentam.',
    input_schema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          items: { type: 'string' },
          minItems: 2,
          maxItems: 4,
          description: 'Ids dos ingredientes a comparar, obtidos previamente via search_ingredients.',
        },
      },
      required: ['ids'],
    },
  },
  {
    name: 'get_documents',
    description:
      'Retorna a lista de documentos técnicos anexados a um ingrediente (ficha técnica, ' +
      'especificação, certificado). Use quando o usuário pedir documentação ou uma fonte para ' +
      'uma afirmação técnica.',
    input_schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Id do ingrediente, obtido previamente via search_ingredients.',
        },
      },
      required: ['id'],
    },
  },
];
