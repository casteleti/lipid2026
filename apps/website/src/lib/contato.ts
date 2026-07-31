/**
 * Dados de contato da Lipid — FONTE ÚNICA.
 *
 * Copiados de https://lipid.com.br (site no ar) em 2026-07-31. Antes disso estavam
 * repetidos e divergentes pelo código, com e-mail de outro domínio (@daksa.app.br) e
 * links de rede social apontando para a raiz do LinkedIn. Qualquer tela que precise
 * mostrar contato deve importar daqui, nunca escrever de novo.
 *
 * CNPJ e horário de atendimento não constam no site atual — ficam de fora até que o
 * Renato confirme, em vez de serem preenchidos por suposição.
 */
export const CONTATO = {
  nome: 'LIPID Ingredients',

  email: 'contato@lipid.com.br',

  /** Como é exibido na tela. */
  telefone: '+55 16 3315-9925',
  /** Formato para o atributo href do link tel:. */
  telefoneLink: '+551633159925',

  endereco: {
    logradouro: 'Av. Doutora Nadir Aguiar, 1805',
    complemento: 'Supera Parque de Inovação e Tecnologia',
    bairro: 'Jamil Seme Cury',
    cidade: 'Ribeirão Preto',
    estado: 'SP',
    cep: '14056-667',
    pais: 'Brasil',
  },

  redes: {
    linkedin: 'https://www.linkedin.com/company/lipid-ingredients-&-technologies',
    instagram: 'https://instagram.com/lipidingredients',
    facebook: 'https://www.facebook.com/Lipid-Ingredients-107359831005882/',
  },
} as const;

/** Endereço numa linha só, para rodapé e cartões. */
export const ENDERECO_LINHA = `${CONTATO.endereco.logradouro} — ${CONTATO.endereco.bairro}, ${CONTATO.endereco.cidade}/${CONTATO.endereco.estado} · CEP ${CONTATO.endereco.cep}`;
