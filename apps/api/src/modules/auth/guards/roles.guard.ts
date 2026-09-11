import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from '../decorators/roles.decorator';

/**
 * Roda depois do JwtAuthGuard (sempre usar os dois juntos: `@UseGuards(JwtAuthGuard, RolesGuard)`).
 * Sem `@Roles(...)` na rota, libera para qualquer usuário autenticado — mesmo comportamento
 * de antes desta guard existir, então não quebra rota nenhuma por omissão.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Você não tem permissão para executar esta ação.');
    }

    return true;
  }
}
