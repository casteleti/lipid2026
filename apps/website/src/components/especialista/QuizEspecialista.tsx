'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { HiArrowLeft, HiCheck, HiOutlineCheckCircle } from 'react-icons/hi2';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { submitContact } from '@/lib/api';
import { maskTelefone } from '@/lib/mask';
import {
  SEGMENTOS_QUIZ,
  SETOR_API,
  type OpcaoQuiz,
  type PerguntaQuiz,
  type SegmentoId,
} from './quiz-data';

/**
 * Quiz do "Fale com um especialista": uma pergunta por tela, tipografia maior que o
 * resto do site, resposta única avança sozinha. 5 passos — segmento, 3 perguntas do
 * segmento e contato.
 *
 * A transição de slide é feita em duas fases controladas por estado (`fase`): a tela
 * atual sai para cima com fade, o passo troca, a nova entra de baixo. Quem prefere
 * menos movimento (prefers-reduced-motion) vê só o fade.
 *
 * O envio grava na tabela de leads da API com `landingRoute='/especialista'` (vira
 * source 'quiz' no painel). A integração com o RD Station Marketing entra depois,
 * plugada no mesmo ponto do submit.
 */

const TOTAL_PASSOS = 5;

/** Tempo entre o clique na opção e a troca de slide — dá pra ver a seleção marcar. */
const PAUSA_SELECAO_MS = 350;

type Fase = 'entrando' | 'parado' | 'saindo';

interface Contato {
  name: string;
  company: string;
  email: string;
  phone: string;
  privacy: boolean;
}

const CONTATO_VAZIO: Contato = { name: '', company: '', email: '', phone: '', privacy: false };

export function QuizEspecialista() {
  /** 0 = segmento · 1..3 = perguntas do segmento · 4 = contato. */
  const [passo, setPasso] = useState(0);
  const [fase, setFase] = useState<Fase>('entrando');
  const [segmentoId, setSegmentoId] = useState<SegmentoId | null>(null);
  /** Respostas das perguntas 1..3 do segmento, por id da pergunta. */
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  /** Opção recém-clicada — marca o card durante a pausa antes da transição. */
  const [selecionada, setSelecionada] = useState<string | null>(null);

  const [contato, setContato] = useState<Contato>(CONTATO_VAZIO);
  const [erros, setErros] = useState<Partial<Record<keyof Contato, string>>>({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState('');

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const segmento = useMemo(
    () => SEGMENTOS_QUIZ.find((s) => s.id === segmentoId) ?? null,
    [segmentoId],
  );

  const perguntaAtual: PerguntaQuiz | null =
    passo >= 1 && passo <= 3 && segmento ? segmento.perguntas[passo - 1] : null;

  /** Troca de slide em duas fases: sai → muda o passo → entra. */
  const irPara = useCallback((proximo: number) => {
    setFase('saindo');
    timeoutRef.current = setTimeout(() => {
      setPasso(proximo);
      setSelecionada(null);
      setFase('entrando');
      // 'entrando' → 'parado' no próximo frame para a CSS animar a entrada.
      requestAnimationFrame(() => requestAnimationFrame(() => setFase('parado')));
    }, 250);
  }, []);

  useEffect(() => {
    // Primeiro slide também entra animando.
    requestAnimationFrame(() => requestAnimationFrame(() => setFase('parado')));
  }, []);

  const responder = useCallback(
    (opcao: OpcaoQuiz) => {
      if (selecionada) return; // já em transição
      setSelecionada(opcao.id);
      timeoutRef.current = setTimeout(() => {
        if (passo === 0) {
          const novoSegmento = opcao.id as SegmentoId;
          setSegmentoId(novoSegmento);
          // Trocar de segmento no meio invalida as respostas das perguntas seguintes.
          if (novoSegmento !== segmentoId) setRespostas({});
        } else if (perguntaAtual) {
          setRespostas((prev) => ({ ...prev, [perguntaAtual.id]: opcao.id }));
        }
        irPara(passo + 1);
      }, PAUSA_SELECAO_MS);
    },
    [selecionada, passo, segmentoId, perguntaAtual, irPara],
  );

  const voltar = useCallback(() => {
    if (passo === 0 || selecionada || fase === 'saindo') return;
    setErroEnvio('');
    irPara(passo - 1);
  }, [passo, selecionada, fase, irPara]);

  // Teclado: 1..9 escolhe a opção, Backspace/← volta. Só fora de campos de texto.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement;
      if (alvo.tagName === 'INPUT' || alvo.tagName === 'TEXTAREA' || enviado) return;

      if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
        e.preventDefault();
        voltar();
        return;
      }
      const opcoes = passo === 0 ? SEGMENTOS_QUIZ : perguntaAtual?.opcoes;
      if (!opcoes) return;
      const indice = Number(e.key) - 1;
      if (indice >= 0 && indice < opcoes.length) {
        e.preventDefault();
        const opcao = opcoes[indice];
        responder(passo === 0 ? { id: opcao.id, label: opcao.label } : (opcao as OpcaoQuiz));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [passo, perguntaAtual, responder, voltar, enviado]);

  /** Resumo legível das respostas — vira chips na tela final e o corpo do lead. */
  const resumo = useMemo(() => {
    if (!segmento) return [];
    const linhas: { rotulo: string; valor: string }[] = [
      { rotulo: 'Segmento', valor: segmento.label },
    ];
    for (const pergunta of segmento.perguntas) {
      const opcao = pergunta.opcoes.find((o) => o.id === respostas[pergunta.id]);
      if (!opcao) continue;
      const rotulo =
        pergunta.id === 'produto' ? 'Produto' : pergunta.id === 'experiencia' ? 'Experiência' : 'Desafio';
      linhas.push({ rotulo, valor: opcao.label });
    }
    return linhas;
  }, [segmento, respostas]);

  const validar = (): boolean => {
    const next: Partial<Record<keyof Contato, string>> = {};
    if (!contato.name.trim()) next.name = 'Nome é obrigatório';
    if (!contato.company.trim()) next.company = 'Empresa é obrigatória';
    if (!contato.email.trim()) next.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato.email)) next.email = 'Email inválido';
    if (!contato.privacy) next.privacy = 'Você deve aceitar a política de privacidade';
    setErros(next);
    return Object.keys(next).length === 0;
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroEnvio('');
    if (!validar() || !segmento) return;

    setEnviando(true);
    try {
      const corpo = resumo.map((l) => `${l.rotulo}: ${l.valor}`).join('\n');
      await submitContact({
        name: contato.name,
        email: contato.email,
        phone: contato.phone || undefined,
        company: contato.company,
        sector: SETOR_API[segmento.id],
        message: `[Quiz Fale com um especialista]\n${corpo}`,
        pageUrl: window.location.href,
        pageTitle: document.title,
        landingRoute: '/especialista',
      });
      setEnviado(true);
    } catch {
      setErroEnvio('Não foi possível enviar. Tente novamente em instantes.');
    } finally {
      setEnviando(false);
    }
  };

  const aoMudarContato =
    (campo: keyof Contato) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const valor =
        campo === 'privacy'
          ? e.target.checked
          : campo === 'phone'
            ? maskTelefone(e.target.value)
            : e.target.value;
      setContato((prev) => ({ ...prev, [campo]: valor }));
      if (erros[campo]) setErros((prev) => ({ ...prev, [campo]: undefined }));
    };

  // ---------------------------------------------------------------------------

  if (enviado) {
    return (
      <div className="quiz-slide-parado mx-auto max-w-2xl px-6 py-16 text-center" role="status">
        <HiOutlineCheckCircle className="mx-auto h-20 w-20 text-green-600" aria-hidden />
        <h1 className="mt-6 text-3xl font-bold text-gray-900 md:text-4xl">
          Recebido, {contato.name.trim().split(' ')[0]}.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-gray-600">
          Um especialista da Lipid Ingredients vai analisar seu cenário e retornar pelos
          contatos informados.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {resumo.map((l) => (
            <span
              key={l.rotulo}
              className="rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700"
            >
              {l.valor}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/ingredientes" variant="outline" size="lg">Explorar ingredientes</Button>
          <Button href="/" variant="primary" size="lg">Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const classeSlide = clsx(
    'quiz-slide',
    fase === 'entrando' && 'quiz-slide-entrando',
    fase === 'parado' && 'quiz-slide-parado',
    fase === 'saindo' && 'quiz-slide-saindo',
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-6">
      {/* Progresso */}
      <div className="pt-10">
        <div className="flex items-center justify-between text-sm font-medium text-gray-500">
          <button
            type="button"
            onClick={voltar}
            disabled={passo === 0}
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors',
              passo === 0
                ? 'invisible'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            )}
          >
            <HiArrowLeft className="h-4 w-4" aria-hidden />
            Voltar
          </button>
          <span aria-live="polite">{Math.min(passo + 1, TOTAL_PASSOS)} de {TOTAL_PASSOS}</span>
        </div>
        <div
          className="mt-3 h-1 overflow-hidden rounded-full bg-gray-200"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL_PASSOS}
          aria-valuenow={Math.min(passo + 1, TOTAL_PASSOS)}
          aria-label="Progresso do questionário"
        >
          <div
            className="h-full rounded-full bg-primary-600 transition-[width] duration-500 ease-brand"
            style={{ width: `${((passo + 1) / TOTAL_PASSOS) * 100}%` }}
          />
        </div>
      </div>

      <div className={classeSlide}>
        {/* Passo 0 — segmento */}
        {passo === 0 && (
          <fieldset className="pb-16 pt-10">
            <legend className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Em qual mercado sua empresa atua?
            </legend>
            <p className="mt-3 text-lg text-gray-600">
              Vamos direcionar as próximas perguntas para o seu segmento.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SEGMENTOS_QUIZ.map((s, i) => {
                const Icone = s.icone;
                const ativa = selecionada === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => responder({ id: s.id, label: s.label })}
                    className={clsx('quiz-opcao flex-col items-start gap-4 p-6', ativa && 'quiz-opcao-ativa')}
                  >
                    <span
                      className={clsx(
                        'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                        ativa ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600',
                      )}
                    >
                      <Icone className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="text-lg font-semibold leading-snug">{s.label}</span>
                    <kbd className="quiz-tecla" aria-hidden>{i + 1}</kbd>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* Passos 1..3 — perguntas do segmento */}
        {perguntaAtual && (
          <fieldset className="pb-16 pt-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              {segmento?.label}
            </p>
            <legend className="mt-2 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              {perguntaAtual.titulo}
            </legend>
            {perguntaAtual.apoio && <p className="mt-3 text-lg text-gray-600">{perguntaAtual.apoio}</p>}
            <div className="mt-8 space-y-3">
              {perguntaAtual.opcoes.map((o, i) => {
                const ativa = selecionada === o.id || (!selecionada && respostas[perguntaAtual.id] === o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => responder(o)}
                    className={clsx('quiz-opcao w-full items-center justify-between gap-4 px-6 py-5', ativa && 'quiz-opcao-ativa')}
                  >
                    <span className="text-left">
                      <span className="block text-lg font-semibold leading-snug">{o.label}</span>
                      {o.hint && <span className="mt-1 block text-sm text-gray-500">{o.hint}</span>}
                    </span>
                    <span className="flex items-center gap-3">
                      {ativa && <HiCheck className="h-6 w-6 text-primary-600" aria-hidden />}
                      <kbd className="quiz-tecla" aria-hidden>{i + 1}</kbd>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* Passo 4 — contato */}
        {passo === 4 && segmento && (
          <div className="pb-16 pt-10">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Perfeito. Falta só o seu contato.
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Um especialista da Lipid vai analisar suas respostas e retornar.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {resumo.map((l) => (
                <span
                  key={l.rotulo}
                  className="rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700"
                >
                  {l.valor}
                </span>
              ))}
            </div>

            <form onSubmit={enviar} noValidate className="mt-8 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  id="quiz-name"
                  label="Nome"
                  value={contato.name}
                  onChange={aoMudarContato('name')}
                  error={erros.name}
                  placeholder="Seu nome"
                  autoComplete="name"
                  required
                />
                <Input
                  id="quiz-company"
                  label="Empresa"
                  value={contato.company}
                  onChange={aoMudarContato('company')}
                  error={erros.company}
                  placeholder="Sua empresa"
                  autoComplete="organization"
                  required
                />
                <Input
                  id="quiz-email"
                  type="email"
                  label="E-mail corporativo"
                  value={contato.email}
                  onChange={aoMudarContato('email')}
                  error={erros.email}
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                  required
                />
                <Input
                  id="quiz-phone"
                  type="tel"
                  inputMode="numeric"
                  label="WhatsApp"
                  value={contato.phone}
                  onChange={aoMudarContato('phone')}
                  placeholder="(11) 90000-0000"
                  autoComplete="tel"
                />
              </div>

              <Checkbox
                id="quiz-privacy"
                label="Li e concordo com a Política de Privacidade"
                checked={contato.privacy}
                onChange={aoMudarContato('privacy')}
                error={erros.privacy}
                required
              />

              {erroEnvio && (
                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {erroEnvio}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" disabled={enviando} className="w-full sm:w-auto">
                {enviando ? 'Enviando...' : 'Receber retorno do especialista'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
