import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LIA_CONFIG } from './lia.config';

/**
 * Limitador simples por IP, em memória. Suficiente para uma única instância (é o que roda
 * hoje) — se um dia a API escalar horizontalmente isso precisa virar Redis. Existe porque a
 * página é pública e sem login: sem isso, qualquer visitante pode gerar custo ilimitado na
 * API da Anthropic só de martelar mensagens.
 */
@Injectable()
export class LiaRateLimitGuard implements CanActivate {
  private acessos = new Map<string, number[]>();

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.headers['x-forwarded-for'] || 'desconhecido';
    const agora = Date.now();
    const janela = LIA_CONFIG.rateLimit.windowMs;

    const timestamps = (this.acessos.get(ip) || []).filter((t) => agora - t < janela);

    if (timestamps.length >= LIA_CONFIG.rateLimit.maxRequests) {
      throw new HttpException(
        'Muitas mensagens em pouco tempo. Aguarde alguns minutos antes de continuar.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    timestamps.push(agora);
    this.acessos.set(ip, timestamps);
    return true;
  }
}
