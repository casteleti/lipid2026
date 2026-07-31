/**
 * Máscara de telefone brasileiro, aplicada conforme se digita.
 *
 * Os parênteses do DDD aparecem já no primeiro dígito. Aceita fixo (10 dígitos,
 * "(11) 3000-0000") e celular (11, "(11) 90000-0000") — o hífen só se move quando o
 * 11º dígito entra, então o campo não "pula" durante a digitação de um fixo.
 */
export function maskTelefone(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Só os dígitos — o que vai para o banco, sem formatação. */
export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, '');
}
