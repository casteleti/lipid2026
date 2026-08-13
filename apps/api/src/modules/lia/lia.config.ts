/**
 * Parâmetros do modelo e dos limites operacionais da Lia. Concentrados aqui para poder
 * ajustar custo/latência/comportamento sem tocar na lógica do serviço.
 */
export const LIA_CONFIG = {
  /** Sonnet: melhor custo-benefício para um assistente de tool-use, não precisa do Opus. */
  model: process.env.LIA_MODEL || 'claude-sonnet-5',
  maxTokens: 1024,
  /**
   * Limite de idas-e-voltas de tool use por mensagem do usuário. Evita loop indefinido caso
   * o modelo insista em chamar ferramentas sem nunca produzir uma resposta final.
   */
  maxToolRounds: 4,
  /** Mensagens de histórico mantidas na conversa (contexto), além da mensagem atual. */
  maxHistoryMessages: 20,
  rateLimit: {
    /** Mensagens permitidas por IP dentro da janela abaixo. */
    maxRequests: 20,
    windowMs: 10 * 60 * 1000,
  },
} as const;
