import { Injectable, Logger } from '@nestjs/common';
import { Lead } from '@prisma/client';
import nodemailer from 'nodemailer';

/**
 * Notificação interna exclusiva do formulário público de contato.
 *
 * O lead é persistido antes desta chamada. SMTP é deliberadamente best-effort:
 * indisponibilidade ou credenciais erradas nunca podem impedir o atendimento de
 * aparecer no CMS ou a resposta de sucesso do formulário.
 */
@Injectable()
export class ContactEmailService {
  private readonly logger = new Logger(ContactEmailService.name);

  async sendContactNotification(lead: Lead) {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const from = process.env.SMTP_FROM;
    const to = process.env.CONTACT_NOTIFICATION_TO;

    if (!host || !user || !pass || !from || !to) {
      this.logger.warn('SMTP não configurado integralmente — notificação de contato não enviada.');
      return;
    }

    const port = Number(process.env.SMTP_PORT || 587);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      this.logger.error('SMTP_PORT inválida — notificação de contato não enviada.');
      return;
    }

    const escapeHtml = (value?: string | null) =>
      (value || 'Não informado')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const text = [
      'Novo contato recebido pelo site Lipid.',
      '',
      `Nome: ${lead.name || 'Não informado'}`,
      `E-mail: ${lead.email}`,
      `Telefone: ${lead.phone || 'Não informado'}`,
      `Empresa: ${lead.company || 'Não informado'}`,
      `Página: ${lead.pageUrl || '/contato'}`,
      '',
      'Mensagem:',
      lead.message || 'Não informada',
    ].join('\n');

    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from,
        to,
        replyTo: lead.email,
        subject: `Novo contato do site — ${lead.name || lead.email}`,
        text,
        html: `<h2>Novo contato recebido pelo site Lipid</h2>
<p><strong>Nome:</strong> ${escapeHtml(lead.name)}</p>
<p><strong>E-mail:</strong> ${escapeHtml(lead.email)}</p>
<p><strong>Telefone:</strong> ${escapeHtml(lead.phone)}</p>
<p><strong>Empresa:</strong> ${escapeHtml(lead.company)}</p>
<p><strong>Página:</strong> ${escapeHtml(lead.pageUrl || '/contato')}</p>
<p><strong>Mensagem:</strong></p><pre>${escapeHtml(lead.message)}</pre>`,
      });
    } catch (error) {
      this.logger.error('Falha ao enviar notificação SMTP de contato', error as Error);
    }
  }
}
