import { Injectable } from '@nestjs/common';
import { LeadSector } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreatePageViewDto } from './dto/create-page-view.dto';

const SEGMENT_SECTORS: LeadSector[] = [
  LeadSector.FARMACEUTICA,
  LeadSector.COSMETICO,
  LeadSector.NUTRICIONAL,
  LeadSector.VETERINARIO,
];

@Injectable()
export class PageViewsService {
  constructor(private db: DatabaseService) {}

  async create(data: CreatePageViewDto) {
    return this.db.pageView.create({ data });
  }

  /// "Acessos e leads gerados por tela" — uma linha por segmento com as duas contagens
  /// lado a lado, pro painel não precisar cruzar duas telas pra responder essa pergunta.
  async summaryBySegment() {
    const [viewCounts, leadCounts] = await Promise.all([
      this.db.pageView.groupBy({
        by: ['sector'],
        where: { sector: { in: SEGMENT_SECTORS } },
        _count: { _all: true },
      }),
      this.db.lead.groupBy({
        by: ['sector'],
        where: { sector: { in: SEGMENT_SECTORS }, active: true },
        _count: { _all: true },
      }),
    ]);

    const viewsBySector = new Map(viewCounts.map((v) => [v.sector, v._count._all]));
    const leadsBySector = new Map(leadCounts.map((l) => [l.sector, l._count._all]));

    return SEGMENT_SECTORS.map((sector) => {
      const views = viewsBySector.get(sector) || 0;
      const leads = leadsBySector.get(sector) || 0;
      return {
        sector,
        views,
        leads,
        conversionRate: views > 0 ? Number(((leads / views) * 100).toFixed(1)) : 0,
      };
    });
  }

  /// Mesma leitura, mas para as landings de /tecnologias/<slug>. Aqui o cruzamento é por
  /// ROTA, não por setor: uma página de tecnologia recebe visitante de qualquer indústria,
  /// então `sector` não identifica a página. O formulário grava `landingRoute` com o mesmo
  /// valor que o tracker grava em `route` — join exato, sem LIKE em URL completa.
  async summaryByTechnology() {
    const [viewCounts, leadCounts] = await Promise.all([
      this.db.pageView.groupBy({
        by: ['route'],
        where: { route: { startsWith: '/tecnologias/' } },
        _count: { _all: true },
      }),
      this.db.lead.groupBy({
        by: ['landingRoute'],
        where: { landingRoute: { startsWith: '/tecnologias/' }, active: true },
        _count: { _all: true },
      }),
    ]);

    const viewsByRoute = new Map(viewCounts.map((v) => [v.route, v._count._all]));
    const leadsByRoute = new Map(leadCounts.map((l) => [l.landingRoute as string, l._count._all]));
    const routes = [...new Set([...viewsByRoute.keys(), ...leadsByRoute.keys()])].sort();

    return routes.map((route) => {
      const views = viewsByRoute.get(route) || 0;
      const leads = leadsByRoute.get(route) || 0;
      return {
        route,
        slug: route.replace('/tecnologias/', ''),
        views,
        leads,
        conversionRate: views > 0 ? Number(((leads / views) * 100).toFixed(1)) : 0,
      };
    });
  }
}
