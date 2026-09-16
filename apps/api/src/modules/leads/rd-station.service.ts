import { Injectable, Logger } from '@nestjs/common';
import { Lead } from '@prisma/client';

/**
 * Envia a conversão para o RD Station Marketing (Evento de Conversão via API Key).
 *
 * Fail-safe de propósito: o lead já foi salvo no banco antes desta chamada ser feita.
 * Se o RD Station estiver fora do ar, com a chave errada, ou mudar o contrato da API,
 * o formulário do site não pode quebrar nem perder o lead por causa disso — por isso
 * qualquer falha aqui só é logada, nunca propagada.
 */
@Injectable()
export class RdStationService {
  private readonly logger = new Logger(RdStationService.name);
  private readonly endpoint = 'https://api.rd.services/platform/conversions';

  async sendConversion(lead: Lead) {
    const apiKey = process.env.RD_STATION_API_KEY;
    if (!apiKey) {
      this.logger.warn('RD_STATION_API_KEY não configurada — conversão não enviada ao RD Station.');
      return;
    }

    const payload = {
      event_type: 'CONVERSION',
      event_family: 'CDP',
      payload: {
        conversion_identifier: this.identifierFor(lead),
        email: lead.email,
        name: lead.name ?? undefined,
        mobile_phone: lead.phone ?? undefined,
        cf_empresa: lead.company ?? undefined,
        cf_setor: lead.sector ?? undefined,
        cf_mensagem: lead.message ?? undefined,
        cf_pagina_origem: lead.pageUrl ?? undefined,
        cf_landing_route: lead.landingRoute ?? undefined,
      },
    };

    try {
      const res = await fetch(`${this.endpoint}?api_key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        this.logger.error(`RD Station recusou a conversão (${res.status}): ${body}`);
      }
    } catch (err) {
      this.logger.error('Falha ao enviar conversão para o RD Station', err as Error);
    }
  }

  /**
   * Identificador estável por "tipo de formulário" (não por lead individual) — é o que
   * aparece nos relatórios de conversão e nas automações do RD Station. Detalhe mais fino
   * (qual tecnologia, qual segmento, qual material) vira campo personalizado, não
   * identificador — senão cada página vira uma "conversão" diferente no funil do RD.
   */
  private identifierFor(lead: Lead): string {
    if (lead.contentId) return 'download-material';
    if (lead.landingRoute === '/especialista') return 'quiz-especialista';
    if (lead.landingRoute === '/contato') return 'formulario-contato';
    if (lead.landingRoute === '/sobre') return 'formulario-institucional';
    if (lead.landingRoute?.startsWith('/tecnologias/')) return 'formulario-tecnologia';
    if (lead.landingRoute?.startsWith('/segmentos/')) return 'formulario-segmento';
    return 'formulario-website';
  }
}
