import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateIngredientCategoryDto } from './dto/create-ingredient-category.dto';
import { UpdateIngredientCategoryDto } from './dto/update-ingredient-category.dto';
import { generateUniqueSlug } from '../../common/slugify';

@Injectable()
export class IngredientCategoriesService {
  constructor(private db: DatabaseService) {}

  /**
   * Sem paginação de propósito: é taxonomia (dezenas de linhas), consumida para montar
   * combo no CMS e filtro no site — ambos precisam da lista inteira de uma vez.
   * `_count` alimenta o contador de "N ingredientes" no filtro.
   */
  async findAll() {
    return this.db.ingredientCategory.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { ingredients: { where: { active: true } } } } },
    });
  }

  async findOne(id: string) {
    const categoria = await this.db.ingredientCategory.findUnique({ where: { id } });
    if (!categoria || !categoria.active) {
      throw new NotFoundException(`Categoria ${id} não encontrada`);
    }
    return categoria;
  }

  async create(data: CreateIngredientCategoryDto) {
    const slug = await generateUniqueSlug(data.name, async (candidato) =>
      !!(await this.db.ingredientCategory.findFirst({ where: { slug: candidato } })),
    );
    return this.db.ingredientCategory.create({ data: { ...data, slug } });
  }

  async update(id: string, data: UpdateIngredientCategoryDto) {
    await this.findOne(id);

    const updateData: UpdateIngredientCategoryDto & { slug?: string } = { ...data };
    if (data.name) {
      updateData.slug = await generateUniqueSlug(data.name, async (candidato) =>
        !!(await this.db.ingredientCategory.findFirst({
          where: { slug: candidato, id: { not: id } },
        })),
      );
    }

    return this.db.ingredientCategory.update({ where: { id }, data: updateData });
  }

  /** Soft delete: os ingredientes ficam com categoryId apontando pra linha inativa. */
  async remove(id: string) {
    await this.findOne(id);
    return this.db.ingredientCategory.update({ where: { id }, data: { active: false } });
  }
}
