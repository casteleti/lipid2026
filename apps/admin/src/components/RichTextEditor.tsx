'use client';

import { useEffect, useRef, useState } from 'react';
import { uploadFile, resolveMediaUrl } from '@/lib/api-client';

interface RichTextEditorProps {
  label?: string;
  hint?: string;
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
}

/**
 * Editor de texto do artigo.
 *
 * Feito à mão em vez de trazer TipTap/Quill: o admin hoje depende só de next/react/
 * react-icons, e um editor completo somaria centenas de KB e uma árvore de dependências
 * inteira para um punhado de comandos de formatação. Usa `document.execCommand`, que é
 * marcado como obsoleto mas segue implementado em todos os navegadores atuais e é a única
 * API nativa que faz isto sem biblioteca.
 *
 * O botão "HTML" alterna para edição do fonte — quem sabe HTML corrige o que a barra de
 * ferramentas não alcança, sem precisar de outro campo.
 */

type Bloco = { valor: string; rotulo: string };

const BLOCOS: Bloco[] = [
  { valor: 'p', rotulo: 'Parágrafo' },
  { valor: 'h2', rotulo: 'Título 2' },
  { valor: 'h3', rotulo: 'Título 3' },
  { valor: 'h4', rotulo: 'Título 4' },
  { valor: 'blockquote', rotulo: 'Citação' },
  { valor: 'pre', rotulo: 'Código' },
];

const TAMANHOS = [
  { valor: '2', rotulo: 'Pequeno' },
  { valor: '3', rotulo: 'Normal' },
  { valor: '5', rotulo: 'Grande' },
  { valor: '6', rotulo: 'Enorme' },
];

export function RichTextEditor({ label, hint, value, onChange, disabled }: RichTextEditorProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const inputImagemRef = useRef<HTMLInputElement>(null);
  const [modoHtml, setModoHtml] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  // Só escreve no DOM quando o valor externo diverge do que já está lá. Reescrever a cada
  // tecla jogaria o cursor para o começo a cada caractere digitado.
  useEffect(() => {
    const el = areaRef.current;
    if (el && !modoHtml && el.innerHTML !== value) {
      el.innerHTML = value || '';
    }
  }, [value, modoHtml]);

  const sincronizar = () => {
    if (areaRef.current) onChange(areaRef.current.innerHTML);
  };

  const comando = (cmd: string, arg?: string) => {
    if (disabled) return;
    areaRef.current?.focus();
    document.execCommand(cmd, false, arg);
    sincronizar();
  };

  const inserirLink = () => {
    const selecao = window.getSelection()?.toString();
    if (!selecao) {
      setErro('Selecione o texto que vai virar link antes de clicar aqui.');
      return;
    }
    const url = window.prompt('Endereço do link (https://...)');
    if (!url) return;
    setErro('');
    comando('createLink', url);
    // Link externo sempre em nova aba, para não tirar o leitor do artigo.
    areaRef.current?.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (/^https?:\/\//i.test(href) && !href.includes('daksa')) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });
    sincronizar();
  };

  const enviarImagem = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEnviando(true);
    setErro('');
    try {
      const res = await uploadFile(file);
      comando('insertHTML', `<img src="${resolveMediaUrl(res.url)}" alt="" />`);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Falha no upload');
    } finally {
      setEnviando(false);
      if (inputImagemRef.current) inputImagemRef.current.value = '';
    }
  };

  const botao = (titulo: string, conteudo: React.ReactNode, aoClicar: () => void) => (
    <button
      type="button"
      title={titulo}
      aria-label={titulo}
      onMouseDown={(e) => e.preventDefault()} // preserva a seleção ao clicar
      onClick={aoClicar}
      disabled={disabled}
      className="flex h-8 min-w-8 items-center justify-center rounded px-2 text-sm text-gray-700 transition-colors hover:bg-white hover:text-primary-700 disabled:opacity-40"
    >
      {conteudo}
    </button>
  );

  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-semibold text-gray-900">{label}</label>}

      <div className="overflow-hidden rounded-lg border border-gray-300">
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
          <select
            onChange={(e) => comando('formatBlock', e.target.value)}
            disabled={disabled || modoHtml}
            defaultValue=""
            className="h-8 rounded border border-gray-300 bg-white px-2 text-sm disabled:opacity-40"
          >
            <option value="" disabled>
              Estilo
            </option>
            {BLOCOS.map((b) => (
              <option key={b.valor} value={b.valor}>
                {b.rotulo}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => comando('fontSize', e.target.value)}
            disabled={disabled || modoHtml}
            defaultValue=""
            className="h-8 rounded border border-gray-300 bg-white px-2 text-sm disabled:opacity-40"
          >
            <option value="" disabled>
              Tamanho
            </option>
            {TAMANHOS.map((t) => (
              <option key={t.valor} value={t.valor}>
                {t.rotulo}
              </option>
            ))}
          </select>

          <span className="mx-1 h-5 w-px bg-gray-300" />

          {!modoHtml && (
            <>
              {botao('Negrito', <strong>B</strong>, () => comando('bold'))}
              {botao('Itálico', <em>I</em>, () => comando('italic'))}
              {botao('Sublinhado', <u>U</u>, () => comando('underline'))}

              <span className="mx-1 h-5 w-px bg-gray-300" />

              {botao('Alinhar à esquerda', '⇤', () => comando('justifyLeft'))}
              {botao('Centralizar', '↔', () => comando('justifyCenter'))}
              {botao('Alinhar à direita', '⇥', () => comando('justifyRight'))}

              <span className="mx-1 h-5 w-px bg-gray-300" />

              {botao('Lista com marcadores', '• —', () => comando('insertUnorderedList'))}
              {botao('Lista numerada', '1.', () => comando('insertOrderedList'))}

              <span className="mx-1 h-5 w-px bg-gray-300" />

              {botao('Inserir link', '🔗', inserirLink)}
              {botao('Remover link', '⛓️‍💥', () => comando('unlink'))}
              {botao('Inserir imagem', enviando ? '…' : '🖼️', () => inputImagemRef.current?.click())}
              {botao('Limpar formatação', '⌫', () => comando('removeFormat'))}
            </>
          )}

          <button
            type="button"
            onClick={() => setModoHtml((m) => !m)}
            disabled={disabled}
            className={`ml-auto h-8 rounded px-3 text-xs font-semibold transition-colors ${
              modoHtml
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-white hover:text-primary-700'
            }`}
          >
            HTML
          </button>
        </div>

        {modoHtml ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            rows={18}
            spellCheck={false}
            className="w-full resize-y bg-gray-900 p-4 font-mono text-xs leading-relaxed text-gray-100 focus:outline-none"
          />
        ) : (
          <div
            ref={areaRef}
            contentEditable={!disabled}
            suppressContentEditableWarning
            onInput={sincronizar}
            onBlur={sincronizar}
            data-placeholder="Escreva o artigo aqui..."
            className="editor-conteudo min-h-[22rem] max-w-none overflow-y-auto bg-white p-5 text-sm leading-relaxed text-gray-800 focus:outline-none"
          />
        )}
      </div>

      <input
        ref={inputImagemRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={enviarImagem}
        className="hidden"
      />

      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {erro && <p className="mt-1 text-sm text-red-600">{erro}</p>}
    </div>
  );
}
