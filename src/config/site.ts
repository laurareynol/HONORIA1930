// Informações da Honōria usadas em todo o site.
// Para mudar um contato, endereço, horário ou valor, altere aqui: o site inteiro acompanha.

export const contato = {
  atendente: 'Cris',
  whatsapp: '5562999681930',
  whatsappExibicao: '62 99968-1930',
  email: 'cliente.honoriaoficial@gmail.com',
  instagram: 'honoriaoficial',
};

export const horario = [
  { dias: 'Segunda a sexta', horas: '9h às 18h' },
  { dias: 'Sábado', horas: '9h às 13h' },
];

export const contatoSaoPaulo = {
  whatsapp: '5511924606664',
  whatsappExibicao: '(11) 92460-6664',
};

export const producao = {
  whatsapp: '5562998741001',
  whatsappExibicao: '(62) 99874-1001',
};

export function linkWhatsAppProducao(mensagem = 'Olá! Vim pelo site da Honōria e gostaria de começar minha criação Sob Medida.') {
  return `https://wa.me/${producao.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export function linkWhatsAppSaoPaulo() {
  const mensagem = 'Olá! Vim pelo site da Honōria e gostaria de agendar um atendimento online ou presencial em São Paulo.';
  return `https://wa.me/${contatoSaoPaulo.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

// Para retirar uma loja do site, basta apagar o bloco dela.
export const lojas = [
  {
    cidade: 'Goiânia',
    uf: 'GO',
    papel: 'Loja e ateliê',
    endereco: 'R. 1131, 412, St. Marista',
    cep: '74180-100',
  },
];

// Atendimento com a Tata: agendado, pago uma única vez, sem devolução e sem abatimento.
export const atendimentoTata = {
  online: 'R$ 350',
  presencial: 'R$ 500',
};

// Os três momentos da experiência Sob Medida.
export const etapasSobMedida: [string, string][] = [
  ['Uma conversa com a estilista', 'Sua ocasião, seus desejos e a forma como você quer se sentir dão início à criação.'],
  ['O desenho ganha forma', 'Silhueta, tecidos e detalhes são definidos com você. No ateliê em Goiânia, a peça é construída a partir das suas medidas.'],
  ['As provas e os detalhes finais', 'O caimento é acompanhado nas provas, com os ajustes necessários até a entrega.'],
];

export function linkWhatsApp(mensagem = 'Olá, Cris! Vim pelo site da Honōria.') {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export function linkMapa(loja: (typeof lojas)[number]) {
  const q = `${loja.endereco}, ${loja.cidade} - ${loja.uf}, ${loja.cep}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export const navegacao = [
  { rotulo: 'Sob Medida', href: 'sob-medida' },
  { rotulo: 'Honoria para Casar', href: 'honoria-para-casar' },
  { rotulo: 'Criações', href: 'criacoes' },
  { rotulo: 'Pronta entrega', href: 'pronta-entrega' },
  { rotulo: 'Ateliê', href: 'atelie' },
  { rotulo: 'Diário', href: 'diario' },
];

// Monta links internos respeitando o endereço de publicação.
export function url(caminho = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const limpo = caminho.replace(/^\/|\/$/g, '');
  if (!limpo) return `${base}/`;
  if (import.meta.env.PREVIEW === '1' || process.env.PREVIEW === '1') return `${base}/${limpo}.html`;
  return `${base}/${limpo}/`;
}
