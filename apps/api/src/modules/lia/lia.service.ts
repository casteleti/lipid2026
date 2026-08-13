import { Injectable, Logger } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { LIA_CONFIG } from './lia.config';
import { LIA_SYSTEM_PROMPT } from './lia.prompt';
import { LIA_TOOLS } from './lia.tools';
import { ChatMessageDto } from './dto/chat.dto';

/** Campos expostos ao modelo — nunca `active`, `createdAt` etc., é ruído de contexto. */
const INGREDIENT_SELECT = {
  id: true,
  name: true,
  slug: true,
  excerpt: true,
  description: true,
  inci: true,
  partner: { select: { name: true, slug: true } },
  category: { select: { name: true, slug: true } },
  tags: { select: { tag: { select: { name: true, slug: true } } } },
  technologies: { select: { technology: { select: { name: true, slug: true } } } },
  applications: { select: { application: { select: { name: true, slug: true } } } },
  codes: { select: { code: true } },
  files: { select: { id: true, label: true } },
} satisfies Prisma.IngredientSelect;

@Injectable()
export class LiaService {
  private readonly logger = new Logger(LiaService.name);
  private readonly client: Anthropic;

  constructor(private db: DatabaseService) {
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  async chat(messages: ChatMessageDto[]): Promise<{ reply: string }> {
    const historico: Anthropic.MessageParam[] = messages
      .slice(-LIA_CONFIG.maxHistoryMessages)
      .map((m) => ({ role: m.role, content: m.content }));

    for (let rodada = 0; rodada < LIA_CONFIG.maxToolRounds; rodada++) {
      const resposta = await this.client.messages.create({
        model: LIA_CONFIG.model,
        max_tokens: LIA_CONFIG.maxTokens,
        system: LIA_SYSTEM_PROMPT,
        tools: LIA_TOOLS,
        messages: historico,
      });

      const chamadasDeFerramenta = resposta.content.filter(
        (bloco): bloco is Anthropic.ToolUseBlock => bloco.type === 'tool_use',
      );

      if (chamadasDeFerramenta.length === 0) {
        const texto = resposta.content
          .filter((bloco): bloco is Anthropic.TextBlock => bloco.type === 'text')
          .map((bloco) => bloco.text)
          .join('\n')
          .trim();

        return { reply: texto || 'Não consegui montar uma resposta a partir dos dados disponíveis.' };
      }

      historico.push({ role: 'assistant', content: resposta.content });

      const resultados = await Promise.all(
        chamadasDeFerramenta.map(async (chamada) => ({
          type: 'tool_result' as const,
          tool_use_id: chamada.id,
          content: JSON.stringify(await this.executarFerramenta(chamada.name, chamada.input)),
        })),
      );

      historico.push({ role: 'user', content: resultados });
    }

    this.logger.warn('Limite de rodadas de tool use atingido sem resposta final.');
    return {
      reply: 'Preciso consultar mais dados do que consigo neste momento — pode reformular a pergunta de forma mais específica?',
    };
  }

  /**
   * Executa a ferramenta pedida por Claude. Toda ferramenta só lê do banco — nunca há
   * caminho pelo qual um id ou dado "inventado" pelo modelo vire uma resposta ao usuário,
   * porque o que volta aqui é sempre o que existe (ou nada).
   */
  private async executarFerramenta(nome: string, input: unknown): Promise<unknown> {
    try {
      switch (nome) {
        case 'search_ingredients':
          return await this.searchIngredients(input as Record<string, unknown>);
        case 'get_ingredient':
          return await this.getIngredient((input as { id?: string })?.id);
        case 'compare_ingredients':
          return await this.compareIngredients((input as { ids?: string[] })?.ids);
        case 'get_documents':
          return await this.getDocuments((input as { id?: string })?.id);
        default:
          return { erro: `Ferramenta desconhecida: ${nome}` };
      }
    } catch (erro) {
      this.logger.error(`Falha ao executar ferramenta ${nome}`, erro instanceof Error ? erro.stack : erro);
      return { erro: 'Falha ao consultar o catálogo. Tente novamente.' };
    }
  }

  private async searchIngredients(input: Record<string, unknown>) {
    const query = typeof input.query === 'string' ? input.query : undefined;
    const categoria = typeof input.categoria === 'string' ? input.categoria : undefined;
    const fabricante = typeof input.fabricante === 'string' ? input.fabricante : undefined;
    const tecnologia = typeof input.tecnologia === 'string' ? input.tecnologia : undefined;
    const aplicacao = typeof input.aplicacao === 'string' ? input.aplicacao : undefined;
    const limite = Math.min(Math.max(Number(input.limite) || 8, 1), 20);

    const where: Prisma.IngredientWhereInput = {
      active: true,
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { inci: { contains: query, mode: 'insensitive' } },
              { excerpt: { contains: query, mode: 'insensitive' } },
              { codes: { some: { code: { contains: query, mode: 'insensitive' } } } },
            ],
          }
        : {}),
      ...(categoria
        ? { category: { OR: [{ slug: categoria }, { name: { contains: categoria, mode: 'insensitive' } }] } }
        : {}),
      ...(fabricante
        ? { partner: { OR: [{ slug: fabricante }, { name: { contains: fabricante, mode: 'insensitive' } }] } }
        : {}),
      ...(tecnologia
        ? {
            technologies: {
              some: {
                technology: {
                  OR: [{ slug: tecnologia }, { name: { contains: tecnologia, mode: 'insensitive' } }],
                },
              },
            },
          }
        : {}),
      ...(aplicacao
        ? {
            applications: {
              some: {
                application: {
                  OR: [{ slug: aplicacao }, { name: { contains: aplicacao, mode: 'insensitive' } }],
                },
              },
            },
          }
        : {}),
    };

    const ingredientes = await this.db.ingredient.findMany({
      where,
      take: limite,
      orderBy: { name: 'asc' },
      select: INGREDIENT_SELECT,
    });

    return { total: ingredientes.length, ingredientes: ingredientes.map(formatarIngrediente) };
  }

  private async getIngredient(id?: string) {
    if (!id) return { erro: 'id é obrigatório' };

    const ingrediente = await this.db.ingredient.findFirst({
      where: { id, active: true },
      select: INGREDIENT_SELECT,
    });

    if (!ingrediente) return { encontrado: false };

    return { encontrado: true, ingrediente: formatarIngrediente(ingrediente) };
  }

  private async compareIngredients(ids?: string[]) {
    if (!ids || ids.length < 2 || ids.length > 4) {
      return { erro: 'informe entre 2 e 4 ids' };
    }

    const ingredientes = await this.db.ingredient.findMany({
      where: { id: { in: ids }, active: true },
      select: INGREDIENT_SELECT,
    });

    const idsNaoEncontrados = ids.filter((id) => !ingredientes.some((i) => i.id === id));

    return {
      ingredientes: ingredientes.map(formatarIngrediente),
      idsNaoEncontrados: idsNaoEncontrados.length ? idsNaoEncontrados : undefined,
    };
  }

  private async getDocuments(id?: string) {
    if (!id) return { erro: 'id é obrigatório' };

    const ingrediente = await this.db.ingredient.findFirst({
      where: { id, active: true },
      select: { name: true, files: { select: { label: true, url: true }, orderBy: { order: 'asc' } } },
    });

    if (!ingrediente) return { encontrado: false };

    return {
      encontrado: true,
      ingrediente: ingrediente.name,
      documentos: ingrediente.files,
      temDocumentos: ingrediente.files.length > 0,
    };
  }
}

function formatarIngrediente(ingrediente: Prisma.IngredientGetPayload<{ select: typeof INGREDIENT_SELECT }>) {
  return {
    id: ingrediente.id,
    nome: ingrediente.name,
    slug: ingrediente.slug,
    resumo: ingrediente.excerpt,
    descricao: ingrediente.description,
    inci: ingrediente.inci,
    fabricante: ingrediente.partner?.name ?? null,
    categoria: ingrediente.category?.name ?? null,
    tags: ingrediente.tags.map((t) => t.tag.name),
    tecnologias: ingrediente.technologies.map((t) => t.technology.name),
    aplicacoes: ingrediente.applications.map((a) => a.application.name),
    codigos: ingrediente.codes.map((c) => c.code),
    quantidadeDocumentos: ingrediente.files.length,
  };
}
