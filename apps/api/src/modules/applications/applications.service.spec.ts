import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { DatabaseService } from '../database/database.service';

describe('ApplicationsService', () => {
  let service: ApplicationsService;
  let db: { application: Record<string, jest.Mock> };

  beforeEach(async () => {
    db = {
      application: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    const module = await Test.createTestingModule({
      providers: [ApplicationsService, { provide: DatabaseService, useValue: db }],
    }).compile();

    service = module.get(ApplicationsService);
  });

  describe('findAll', () => {
    it('retorna lista paginada de aplicacoes ativas', async () => {
      db.application.findMany.mockResolvedValue([{ id: '1', name: 'Cosméticos' }]);
      db.application.count.mockResolvedValue(1);

      const result = await service.findAll(0, 10);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(db.application.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { active: true } }),
      );
    });
  });

  describe('findOne', () => {
    it('lanca NotFoundException quando a aplicacao nao existe', async () => {
      db.application.findUnique.mockResolvedValue(null);

      await expect(service.findOne('inexistente')).rejects.toThrow(NotFoundException);
    });

    it('lanca NotFoundException quando a aplicacao esta inativa', async () => {
      db.application.findUnique.mockResolvedValue({ id: '1', active: false });

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });

    it('retorna a aplicacao quando ela existe e esta ativa', async () => {
      db.application.findUnique.mockResolvedValue({ id: '1', active: true, name: 'Cosméticos' });

      const result = await service.findOne('1');

      expect(result.name).toBe('Cosméticos');
    });
  });

  describe('create', () => {
    it('gera slug a partir do nome e cria a aplicacao', async () => {
      db.application.findFirst.mockResolvedValue(null); // slug ainda nao existe
      db.application.create.mockResolvedValue({ id: '1', name: 'Nutracêutico', slug: 'nutraceutico' });

      const result = await service.create({
        name: 'Nutracêutico',
        description: 'Descrição de teste com mais de dez caracteres',
      });

      expect(result.slug).toBe('nutraceutico');
      expect(db.application.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ slug: 'nutraceutico' }) }),
      );
    });

    it('adiciona sufixo numerico quando o slug ja existe', async () => {
      db.application.findFirst
        .mockResolvedValueOnce({ id: 'outro', slug: 'cosmeticos' }) // "cosmeticos" ja existe
        .mockResolvedValueOnce(null); // "cosmeticos-1" esta livre
      db.application.create.mockResolvedValue({ id: '2', name: 'Cosméticos', slug: 'cosmeticos-1' });

      const result = await service.create({
        name: 'Cosméticos',
        description: 'Descrição de teste com mais de dez caracteres',
      });

      expect(result.slug).toBe('cosmeticos-1');
    });
  });

  describe('update', () => {
    it('mantem o mesmo slug ao editar sem trocar o nome (nao deve se auto-colidir)', async () => {
      db.application.findUnique.mockResolvedValue({ id: '1', active: true, name: 'Cosméticos' });
      db.application.findFirst.mockResolvedValue(null); // exclude self => nenhuma colisao real
      db.application.update.mockResolvedValue({ id: '1', name: 'Cosméticos', slug: 'cosmeticos' });

      await service.update('1', {
        name: 'Cosméticos',
        description: 'Descrição de teste com mais de dez caracteres',
      });

      expect(db.application.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ id: { not: '1' } }) }),
      );
      expect(db.application.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ slug: 'cosmeticos' }) }),
      );
    });
  });

  describe('remove', () => {
    it('desativa a aplicacao em vez de apagar (soft delete)', async () => {
      db.application.findUnique.mockResolvedValue({ id: '1', active: true });
      db.application.update.mockResolvedValue({ id: '1', active: false });

      await service.remove('1');

      expect(db.application.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { active: false },
      });
    });
  });
});
