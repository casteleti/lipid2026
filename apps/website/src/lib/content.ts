/** Rótulo da badge de card de conteúdo (`ContentSection` na home, `/blog`) pro tipo de arquivo de um DOWNLOAD. */
export function rotuloArquivo(mimetype: string | null): string {
  if (!mimetype) return 'ARQUIVO';
  if (mimetype.includes('pdf')) return 'PDF';
  if (mimetype.includes('presentation') || mimetype.includes('powerpoint')) return 'APRESENTAÇÃO';
  if (mimetype.includes('spreadsheet') || mimetype.includes('excel')) return 'PLANILHA';
  if (mimetype.includes('csv')) return 'CSV';
  return 'ARQUIVO';
}
