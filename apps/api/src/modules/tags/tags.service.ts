import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { generateUniqueSlug } from '../../common/slugify';

@Injectable()
export class TagsService {
  constructor(private db: DatabaseService) {}

  /**
   * `comUso` devolve só tags que têm ingrediente ativo — é o que a nuvem de filtros do
   * site deve mostrar, pra não oferecer filtro que resulta em lista vazia.
   */
  async findAll(comUso = false) {
    return this.db.tag.findMany({
      where: comUso ? { ingredients: { some: { ingredient: { active: true } } } } : {},
      orderBy: { name: 'asc' },
      include: { _count: { select: { ingredients: true } } },
    });
  }

  async findOne(id: string) {
    const tag = await this.db.tag.findUnique({ where: { id } });
    if (!tag) throw new NotFoundException(`Tag ${id} não encontrada`);
    return tag;
  }

  async create(data: CreateTagDto) {
    const slug = await generateUniqueSlug(data.name, async (candidato) =>
      !!(await this.db.tag.findFirst({ where: { slug: candidato } })),
    );
    return this.db.tag.create({ data: { ...data, slug } });
  }

  async update(id: string, data: UpdateTagDto) {
    await this.findOne(id);

    const updateData: UpdateTagDto & { slug?: string } = { ...data };
    if (data.name) {
      updateData.slug = await generateUniqueSlug(data.name, async (candidato) =>
        !!(await this.db.tag.findFirst({ where: { slug: candidato, id: { not: id } } })),
      );
    }

    return this.db.tag.update({ where: { id }, data: updateData });
  }

  /** Hard delete: Tag não tem flag active — os vínculos caem por cascade. */
  async remove(id: string) {
    await this.findOne(id);
    return this.db.tag.delete({ where: { id } });
  }
}
