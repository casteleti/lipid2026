import { Injectable } from '@nestjs/common';
import { LeadSector, Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private db: DatabaseService) {}

  create(data: CreateLeadDto) {
    // A origem diz ao comercial o que a pessoa já demonstrou querer antes de falar com
    // alguém: um ingrediente específico, um material baixado, ou o contato genérico.
    const source = data.ingredientId
      ? 'ingrediente'
      : data.contentId
        ? 'material'
        : data.landingRoute?.startsWith('/tecnologias/')
          ? 'tecnologia'
          : 'website';

    return this.db.lead.create({ data: { ...data, source } });
  }

  /**
   * Filtros aplicados no banco, não no cliente: com paginação, filtrar depois de buscar
   * mostraria "10 por página" de um recorte errado e um total que não bate com a lista.
   *
   * - `q`      → nome, e-mail ou empresa
   * - `pagina` → o que originou o lead: título/URL da página, rota da landing, nome do
   *              ingrediente da ficha ou título do material baixado
   * - `sector` / `source` → filtros exatos
   * - `dias`   → janela a partir de hoje (7, 30, 90...); ausente = tudo
   */
  async findAll(
    skip = 0,
    take = 30,
    filtros: { q?: string; pagina?: string; sector?: string; source?: string; dias?: number } = {},
  ) {
    const { q, pagina, sector, source, dias } = filtros;
    const contem = (value: string) => ({ contains: value, mode: 'insensitive' as const });

    // Busca de contato ignora acento ("joao" acha "João"): ILIKE sozinho não faz isso.
    // Resolve com `unaccent` numa consulta à parte, cujo resultado entra como filtro de id
    // — mantém os includes e a paginação do Prisma. Se a extensão não existir no banco,
    // cai no contains normal em vez de derrubar a tela inteira.
    let idsPorContato: string[] | null = null;
    if (q) {
      try {
        const linhas = await this.db.$queryRaw<{ id: string }[]>`
          SELECT id FROM leads
          WHERE unaccent(coalesce(name, '') || ' ' || email || ' ' || coalesce(company, ''))
                ILIKE unaccent(${`%${q}%`})
        `;
        idsPorContato = linhas.map((l) => l.id);
      } catch {
        idsPorContato = null;
      }
    }

    const where: Prisma.LeadWhereInput = {
      active: true,
      ...(sector ? { sector: sector as LeadSector } : {}),
      ...(source ? { source } : {}),
      ...(dias && dias > 0
        ? { createdAt: { gte: new Date(Date.now() - dias * 24 * 60 * 60 * 1000) } }
        : {}),
      // Os dois filtros de texto entram como AND de ORs. Espalhar duas chaves `OR` no
      // mesmo objeto faria a segunda apagar a primeira — o filtro sumiria em silêncio.
      AND: [
        ...(q
          ? idsPorContato !== null
            ? [{ id: { in: idsPorContato } }]
            : [{ OR: [{ name: contem(q) }, { email: contem(q) }, { company: contem(q) }] }]
          : []),
        ...(pagina
          ? [
              {
                OR: [
                  { pageTitle: contem(pagina) },
                  { pageUrl: contem(pagina) },
                  { landingRoute: contem(pagina) },
                  { ingredient: { name: contem(pagina) } },
                  { content: { title: contem(pagina) } },
                ],
              },
            ]
          : []),
      ],
    };

    const [data, total] = await Promise.all([
      this.db.lead.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          ingredient: { select: { id: true, name: true, slug: true } },
          content: { select: { id: true, title: true, slug: true, type: true } },
        },
      }),
      this.db.lead.count({ where }),
    ]);

    return {
      data,
      total,
      page: Math.floor(skip / take) + 1,
      pageSize: take,
      totalPages: Math.ceil(total / take),
    };
  }

  /**
   * Opções reais para os selects de filtro — origem e setor saem do que já foi gravado,
   * em vez de uma lista fixa no front que envelhece toda vez que nasce um formulário novo.
   */
  async filterOptions() {
    const [origens, setores] = await Promise.all([
      this.db.lead.groupBy({
        by: ['source'],
        where: { active: true },
        _count: { _all: true },
        orderBy: { _count: { source: 'desc' } },
      }),
      this.db.lead.groupBy({
        by: ['sector'],
        where: { active: true, sector: { not: null } },
        _count: { _all: true },
      }),
    ]);

    return {
      origens: origens.map((o) => ({ valor: o.source, total: o._count._all })),
      setores: setores.map((s) => ({ valor: s.sector as string, total: s._count._all })),
    };
  }

  /**
   * Números do painel.
   *
   * Traz visitas E leads por ingrediente porque as duas isoladas enganam: um ingrediente
   * muito visitado e sem lead é problema de página, e um com poucos acessos convertendo
   * bem merece mais tráfego. O ranking sai por visitas, com a conversão ao lado.
   */
  async stats() {
    const [totalLeads, porSetor, porOrigem, maisAcessados, materiaisMaisBaixados, leadsPorIngrediente] =
      await Promise.all([
        this.db.lead.count({ where: { active: true } }),

        this.db.lead.groupBy({
          by: ['sector'],
          where: { active: true },
          _count: { _all: true },
        }),

        this.db.lead.groupBy({
          by: ['source'],
          where: { active: true },
          _count: { _all: true },
        }),

        this.db.ingredient.findMany({
          where: { active: true },
          orderBy: [{ views: 'desc' }, { name: 'asc' }],
          take: 20,
          select: {
            id: true,
            name: true,
            slug: true,
            views: true,
            _count: { select: { leads: true } },
          },
        }),

        // Conteúdo ranqueado por visita, com quantos leads o material converteu.
        this.db.content.findMany({
          where: { status: 'PUBLISHED' },
          orderBy: [{ views: 'desc' }, { title: 'asc' }],
          take: 20,
          select: {
            id: true,
            title: true,
            slug: true,
            type: true,
            views: true,
            _count: { select: { leads: true } },
          },
        }),

        this.db.lead.groupBy({
          by: ['ingredientId'],
          where: { active: true, ingredientId: { not: null } },
          _count: { _all: true },
          orderBy: { _count: { ingredientId: 'desc' } },
          take: 10,
        }),
      ]);

    // groupBy devolve só o id; buscamos os nomes num único select em vez de N queries.
    const ids = leadsPorIngrediente.map((l) => l.ingredientId).filter((i): i is string => !!i);
    const nomes = await this.db.ingredient.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, slug: true, views: true },
    });
    const porId = new Map(nomes.map((n) => [n.id, n]));

    return {
      totalLeads,
      porSetor: porSetor.map((s) => ({ setor: s.sector, total: s._count._all })),
      porOrigem: porOrigem.map((s) => ({ origem: s.source, total: s._count._all })),
      maisAcessados: maisAcessados.map((i) => ({
        id: i.id,
        name: i.name,
        slug: i.slug,
        views: i.views,
        leads: i._count.leads,
      })),
      conteudosMaisAcessados: materiaisMaisBaixados.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        type: c.type,
        views: c.views,
        leads: c._count.leads,
      })),
      maisConvertem: leadsPorIngrediente
        .map((l) => {
          const ing = l.ingredientId ? porId.get(l.ingredientId) : undefined;
          return ing ? { ...ing, leads: l._count._all } : null;
        })
        .filter(Boolean),
    };
  }
}
