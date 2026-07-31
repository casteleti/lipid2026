import type { ContentFormValues } from '@/components/ContentForm';

/**
 * Traduz o estado do formulário para o corpo que a API espera.
 *
 * Fica separado porque "novo" e "editar" precisam da mesma tradução, e porque há duas
 * regras que não são óbvias no formulário:
 *
 * 1. Campo de texto vazio vira `undefined`, não string vazia — string vazia gravaria ''
 *    no banco e o site trataria como conteúdo existente (renderizando um bloco em branco).
 * 2. Um DOWNLOAD não carrega tópicos/FAQ do artigo se o autor trocou o tipo depois de
 *    escrever; e um ARTIGO não leva arquivos de material. Sem essa limpeza, dados órfãos
 *    do tipo anterior ficariam salvos e voltariam a aparecer numa futura troca de tipo.
 */
export function montarPayload(v: ContentFormValues) {
  const ehDownload = v.type === 'DOWNLOAD';

  return {
    type: v.type,
    title: v.title,
    content: v.content,
    excerpt: v.excerpt || undefined,
    author: v.author || undefined,
    featured: v.featured || undefined,
    featuredAlt: v.featuredAlt || undefined,
    status: v.status,
    seoTitle: v.seoTitle || undefined,
    seoDescription: v.seoDescription || undefined,
    categoryIds: v.categoryIds,
    summaryPoints: v.summaryPoints.filter((p) => p.text.trim()),
    faqs: v.faqs.filter((f) => f.question.trim() && f.answer.trim()),
    files: ehDownload ? v.files : [],
  };
}
