import { Test } from '@nestjs/testing';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database/database.service';

describe('AuthService', () => {
  let service: AuthService;
  let db: { user: Record<string, jest.Mock> };
  let jwt: { sign: jest.Mock };

  beforeEach(async () => {
    db = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };
    jwt = { sign: jest.fn().mockReturnValue('signed-jwt-token') };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: DatabaseService, useValue: db },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe('login', () => {
    it('retorna token quando email e senha estao corretos', async () => {
      const passwordHash = await bcrypt.hash('senha12345', 10);
      db.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'admin@daksa.app.br',
        name: 'Admin',
        password: passwordHash,
        role: 'ADMIN',
        active: true,
      });
      db.user.update.mockResolvedValue({});

      const result = await service.login({ email: 'admin@daksa.app.br', password: 'senha12345' });

      expect(result.access_token).toBe('signed-jwt-token');
      expect(result.user.email).toBe('admin@daksa.app.br');
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'admin@daksa.app.br', role: 'ADMIN' }),
      );
    });

    it('lanca UnauthorizedException quando usuario nao existe', async () => {
      db.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'inexistente@daksa.app.br', password: 'qualquer123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('lanca UnauthorizedException quando a senha esta incorreta', async () => {
      const passwordHash = await bcrypt.hash('senha-correta', 10);
      db.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'admin@daksa.app.br',
        password: passwordHash,
        role: 'ADMIN',
        active: true,
      });

      await expect(
        service.login({ email: 'admin@daksa.app.br', password: 'senha-errada' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('lanca UnauthorizedException quando a conta esta inativa', async () => {
      const passwordHash = await bcrypt.hash('senha12345', 10);
      db.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'admin@daksa.app.br',
        password: passwordHash,
        role: 'ADMIN',
        active: false,
      });

      await expect(
        service.login({ email: 'admin@daksa.app.br', password: 'senha12345' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('cria usuario e retorna token quando email nao existe ainda', async () => {
      db.user.findUnique.mockResolvedValue(null);
      db.user.create.mockResolvedValue({
        id: 'user-2',
        email: 'novo@daksa.app.br',
        name: 'Novo Usuario',
        role: 'USER',
      });

      const result = await service.register({
        email: 'novo@daksa.app.br',
        name: 'Novo Usuario',
        password: 'senha12345',
      });

      expect(result.access_token).toBe('signed-jwt-token');
      expect(db.user.create).toHaveBeenCalled();
    });

    it('lanca BadRequestException quando o email ja esta cadastrado', async () => {
      db.user.findUnique.mockResolvedValue({ id: 'user-1', email: 'ja-existe@daksa.app.br' });

      await expect(
        service.register({ email: 'ja-existe@daksa.app.br', name: 'X', password: 'senha12345' }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
