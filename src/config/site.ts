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

// Para retirar uma loja do site, basta apagar o bloco dela.
export const lojas = [
  {
    cidade: 'Goiânia',
    uf: 'GO',
    papel: 'Loja e ateliê',
    endereco: 'R. 1131, 412, St. Marista',
    cep: '74180-100',
  },
  {
    cidade: 'São Paulo',
    uf: 'SP',
    papel: 'Loja',
    endereco: 'Alameda Itu, 1618, Jardim Paulista',
    cep: '04191-080',
  },
];

// Atendimento com a Tata: agendado, pago uma única vez, sem devolução e sem abatimento.
export const atendimentoTata = {
  online: 'R$ 350',
  presencial: 'R$ 500',
};

// Etapas do Sob Medida, na ordem em que acontecem.
export const etapasSobMedida: [string, string][] = [
  ['Reunião com a Tata', 'Uma conversa sobre a ocasião, os seus desejos e a forma como você quer se sentir vestida.'],
  ['Criação conjunta', 'O desenho nasce dessa conversa. Silhueta, matéria e detalhes são decididos juntos.'],
  ['Tiragem de medidas', 'O seu corpo é a referência de tudo o que vem depois.'],
  ['Modelagem', 'O desenho ganha molde, construído a partir das suas medidas.'],
  ['Corte', 'A matéria escolhida é cortada com a precisão que o molde pede.'],
  ['Costura', 'No ateliê, a peça ganha forma pelas mãos das costureiras.'],
  ['Arremate', 'Os acabamentos que só quem faz percebe, e que sustentam a peça por dentro.'],
  ['Provas', 'Quantas forem necessárias, até tudo estar alinhado.'],
  ['Entrega', 'A peça segue para a sua ocasião.'],
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
