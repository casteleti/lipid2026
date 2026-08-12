import type { IconType } from 'react-icons';
import { HiOutlineBeaker, HiOutlineSparkles, HiOutlineHeart } from 'react-icons/hi2';
import { PiPawPrint } from 'react-icons/pi';

/**
 * Roteiro do quiz "Fale com um especialista" (/especialista).
 *
 * O vocabulário das opções vem do conteúdo real das landings de segmento
 * (scripts/seed-segmentos/seed.sql — campos `applications` e `formChallengeOptions`)
 * para o lead chegar ao comercial falando a mesma língua das páginas que ele viu.
 *
 * Fluxo: 1) segmento → 2) produto (por segmento) → 3) experiência com a tecnologia
 * lipídica (igual nos 4 fluxos) → 4) desafio (por segmento) → contato.
 */

export type SegmentoId = 'farmaceutica' | 'cosmetica' | 'nutricional' | 'veterinaria';

/** Valor do enum `LeadSector` da API correspondente a cada segmento do quiz. */
export const SETOR_API: Record<SegmentoId, string> = {
  farmaceutica: 'FARMACEUTICA',
  cosmetica: 'COSMETICO',
  nutricional: 'NUTRICIONAL',
  veterinaria: 'VETERINARIO',
};

export interface OpcaoQuiz {
  id: string;
  label: string;
  /** Linha de apoio menor sob o label — só nos cards que pedem contexto. */
  hint?: string;
}

export interface PerguntaQuiz {
  id: string;
  titulo: string;
  /** Frase curta sob o título, quando a pergunta pede enquadramento. */
  apoio?: string;
  opcoes: OpcaoQuiz[];
}

export interface SegmentoQuiz {
  id: SegmentoId;
  label: string;
  icone: IconType;
  perguntas: [PerguntaQuiz, PerguntaQuiz, PerguntaQuiz];
}

/**
 * Pergunta de maturidade — a que mais qualifica o lead: separa conversa de
 * especificação/grau (quem já produz) de conversa de conceito (quem quer entender).
 * Igual nos 4 segmentos.
 */
const PERGUNTA_EXPERIENCIA: PerguntaQuiz = {
  id: 'experiencia',
  titulo: 'Qual a sua experiência com tecnologia lipossomal e fosfolipídios?',
  opcoes: [
    { id: 'produz', label: 'Já produzimos com essa tecnologia', hint: 'Produto lipossomal ou com encapsulação no portfólio' },
    { id: 'usa-fosfolipidios', label: 'Usamos fosfolipídios ou lecitinas', hint: 'Na formulação, mas ainda sem encapsulação' },
    { id: 'avaliando', label: 'Estamos avaliando adotar', hint: 'Há um projeto em estudo' },
    { id: 'novo', label: 'Ainda não trabalhamos', hint: 'Queremos entender o potencial' },
  ],
};

export const SEGMENTOS_QUIZ: SegmentoQuiz[] = [
  {
    id: 'farmaceutica',
    label: 'Farmacêutica',
    icone: HiOutlineBeaker,
    perguntas: [
      {
        id: 'produto',
        titulo: 'Qual forma farmacêutica está no seu radar?',
        opcoes: [
          { id: 'injetaveis', label: 'Injetáveis e parenterais' },
          { id: 'capsulas', label: 'Cápsulas moles ou duras' },
          { id: 'topicos', label: 'Tópicos e transdérmicos' },
          { id: 'orais-liquidos', label: 'Suspensões e emulsões orais' },
          { id: 'liberacao-nano', label: 'Liberação modificada / sistemas nano' },
        ],
      },
      PERGUNTA_EXPERIENCIA,
      {
        id: 'desafio',
        titulo: 'Qual é o principal desafio do projeto hoje?',
        opcoes: [
          { id: 'solubilidade', label: 'Solubilidade e biodisponibilidade' },
          { id: 'estabilidade', label: 'Estabilidade' },
          { id: 'encapsulacao', label: 'Encapsulação e proteção do ativo' },
          { id: 'escala', label: 'Escala e processabilidade' },
          { id: 'regulatorio', label: 'Documentação e regulatório' },
        ],
      },
    ],
  },
  {
    id: 'cosmetica',
    label: 'Cosmética',
    icone: HiOutlineSparkles,
    perguntas: [
      {
        id: 'produto',
        titulo: 'Que tipo de produto está desenvolvendo?',
        opcoes: [
          { id: 'seruns', label: 'Séruns e anti-idade' },
          { id: 'cremes', label: 'Cremes e emulsões' },
          { id: 'capilares', label: 'Produtos capilares' },
          { id: 'solares', label: 'Protetores solares' },
          { id: 'dermocosmeticos', label: 'Dermocosméticos' },
        ],
      },
      PERGUNTA_EXPERIENCIA,
      {
        id: 'desafio',
        titulo: 'Qual é o principal desafio da formulação hoje?',
        opcoes: [
          { id: 'estabilidade', label: 'Estabilidade' },
          { id: 'sensorial', label: 'Sensorial' },
          { id: 'protecao-ativo', label: 'Proteção do ativo' },
          { id: 'emulsificacao', label: 'Emulsificação e dispersão' },
          { id: 'diferenciacao', label: 'Diferenciação premium' },
        ],
      },
    ],
  },
  {
    id: 'nutricional',
    label: 'Nutricional / Suplementos',
    icone: HiOutlineHeart,
    perguntas: [
      {
        id: 'produto',
        titulo: 'Em qual formato o produto vai chegar ao consumidor?',
        opcoes: [
          { id: 'capsulas', label: 'Cápsulas ou softgel' },
          { id: 'liquido', label: 'Líquido ou gotas' },
          { id: 'po', label: 'Pó ou sachê' },
          { id: 'indefinido', label: 'Ainda em definição' },
        ],
      },
      PERGUNTA_EXPERIENCIA,
      {
        id: 'desafio',
        titulo: 'Qual é o principal desafio do produto hoje?',
        opcoes: [
          { id: 'biodisponibilidade', label: 'Biodisponibilidade' },
          { id: 'sabor', label: 'Sabor e palatabilidade' },
          { id: 'estabilidade', label: 'Estabilidade' },
          { id: 'claim', label: 'Sustentar o claim "lipossomal"' },
          { id: 'escala', label: 'Escala de produção' },
        ],
      },
    ],
  },
  {
    id: 'veterinaria',
    label: 'Saúde e Nutrição Animal',
    icone: PiPawPrint,
    perguntas: [
      {
        id: 'produto',
        titulo: 'Para qual público é o produto?',
        opcoes: [
          { id: 'pets', label: 'Pets (cães e gatos)' },
          { id: 'producao', label: 'Animais de produção' },
          { id: 'ambos', label: 'Ambos / linha ampla' },
        ],
      },
      PERGUNTA_EXPERIENCIA,
      {
        id: 'desafio',
        titulo: 'Qual é o principal desafio do produto hoje?',
        opcoes: [
          { id: 'palatabilidade', label: 'Palatabilidade' },
          { id: 'dispersao', label: 'Dispersão' },
          { id: 'estabilidade', label: 'Estabilidade' },
          { id: 'dose', label: 'Dose e administração' },
          { id: 'encapsulacao', label: 'Encapsulação' },
        ],
      },
    ],
  },
];
