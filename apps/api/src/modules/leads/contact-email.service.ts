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

    // O formulário público persiste o assunto no início da mensagem para não alterar
    // o schema do lead. Se vier de outra origem, mantém a mensagem inteira sem inventar.
    const subjectMatch = lead.message?.match(/^Assunto:\s*([^\n]+)\n\n([\s\S]*)$/);
    const subject = subjectMatch?.[1] || 'Não informado';
    const message = subjectMatch?.[2] || lead.message || 'Não informada';
    const pageUrl = safeUrl(lead.pageUrl) || 'https://lipid.com.br/contato';

    const text = [
      'Novo contato recebido pelo site Lipid.',
      '',
      `Nome: ${lead.name || 'Não informado'}`,
      `E-mail: ${lead.email}`,
      `Telefone: ${lead.phone || 'Não informado'}`,
      `Empresa: ${lead.company || 'Não informado'}`,
      `Página: ${lead.pageUrl || '/contato'}`,
      '',
      `Assunto: ${subject}`,
      '',
      'Mensagem:',
      message,
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
        html: `<!doctype html>
<html><body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;color:#1f2937;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 16px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">
<tr><td style="padding:32px;background:#123a63;color:#ffffff;"><div style="font-size:13px;opacity:.8;margin-bottom:8px;">LIPID</div><div style="font-size:24px;font-weight:700;">Novo contato recebido</div><div style="font-size:14px;margin-top:8px;opacity:.9;">Uma nova solicitação foi enviada pelo site.</div></td></tr>
<tr><td style="padding:32px;"><div style="font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:20px;">Dados do contato</div>
<table width="100%" cellpadding="8" cellspacing="0">
<tr><td width="120" style="color:#6b7280;">Nome</td><td><strong>${escapeHtml(lead.name)}</strong></td></tr>
<tr><td style="color:#6b7280;">Empresa</td><td>${escapeHtml(lead.company)}</td></tr>
<tr><td style="color:#6b7280;">E-mail</td><td><a href="mailto:${escapeHtml(lead.email)}" style="color:#123a63;">${escapeHtml(lead.email)}</a></td></tr>
<tr><td style="color:#6b7280;">Telefone</td><td>${escapeHtml(lead.phone)}</td></tr>
<tr><td style="color:#6b7280;">Assunto</td><td>${escapeHtml(subject)}</td></tr>
</table>
<div style="margin-top:32px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Mensagem</div>
<div style="margin-top:12px;padding:20px;background:#f7f8fa;border-left:4px solid #123a63;line-height:1.6;border-radius:4px;white-space:pre-wrap;">${escapeHtml(message)}</div>
<div style="margin-top:32px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Página de origem</div>
<div style="margin-top:8px;font-size:14px;"><a href="${escapeHtml(pageUrl)}" style="color:#123a63;">${escapeHtml(pageUrl)}</a></div>
</td></tr>
<tr><td style="padding:20px 32px;background:#f7f8fa;font-size:12px;color:#6b7280;">Mensagem enviada pelo formulário do site LIPID.</td></tr>
</table></td></tr></table></body></html>`,
      });
    } catch (error) {
      this.logger.error('Falha ao enviar notificação SMTP de contato', error as Error);
    }
  }
}

function safeUrl(value?: string | null): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}
