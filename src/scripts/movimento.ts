// Movimentos do site: letras que se decifram, imagens que surgem pixeladas
// e blocos que preenchem a tela antes das seções pretas.

const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Letras que se decifram ---------- */

const MAIUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz';

export function decifrar(el: HTMLElement, duracao = 900) {
  const final = el.dataset.textoFinal ?? el.textContent ?? '';
  el.dataset.textoFinal = final;
  el.setAttribute('aria-label', final);
  const inicio = performance.now();
  const passo = (agora: number) => {
    const t = Math.min(1, (agora - inicio) / duracao);
    const revelados = Math.floor(t * final.length);
    let saida = '';
    for (let i = 0; i < final.length; i++) {
      const c = final[i];
      if (i < revelados || !/[A-Za-zÀ-ÿ]/.test(c)) { saida += c; continue; }
      const fonte = c === c.toUpperCase() ? MAIUSCULAS : MINUSCULAS;
      saida += fonte[Math.floor(Math.random() * fonte.length)];
    }
    el.textContent = saida;
    if (t < 1) requestAnimationFrame(passo);
    else { el.textContent = final; el.removeAttribute('aria-label'); }
  };
  requestAnimationFrame(passo);
}

/* ---------- Imagens que surgem pixeladas ---------- */

function posicao(valor: string, livre: number) {
  if (valor.endsWith('%')) return (parseFloat(valor) / 100) * livre;
  if (valor === 'left' || valor === 'top') return 0;
  if (valor === 'right' || valor === 'bottom') return livre;
  if (valor.endsWith('px')) return parseFloat(valor);
  return livre / 2;
}

export function pixelar(img: HTMLImageElement, duracao = 750) {
  const caixa = img.parentElement;
  if (!caixa || !img.naturalWidth) return;
  const w = caixa.clientWidth;
  const h = caixa.clientHeight;
  if (!w || !h) return;
  const tela = document.createElement('canvas');
  tela.className = 'pixel-tela';
  tela.width = w;
  tela.height = h;
  tela.setAttribute('aria-hidden', 'true');
  const ctx = tela.getContext('2d');
  if (!ctx) return;
  caixa.appendChild(tela);

  // Recorte equivalente ao object-fit: cover da imagem.
  const escala = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * escala;
  const dh = img.naturalHeight * escala;
  const [px = '50%', py = '50%'] = getComputedStyle(img).objectPosition.split(' ');
  const dx = -posicao(px, dw - w);
  const dy = -posicao(py, dh - h);

  const temp = document.createElement('canvas');
  const tctx = temp.getContext('2d');
  if (!tctx) return;
  const etapas = [64, 40, 24, 14, 8, 4];
  const inicio = performance.now();
  let ultima = -1;
  const desenhar = (agora: number) => {
    const t = (agora - inicio) / duracao;
    const i = Math.min(etapas.length - 1, Math.floor(t * etapas.length));
    if (i !== ultima) {
      ultima = i;
      const bloco = etapas[i];
      const sw = Math.max(1, Math.ceil(w / bloco));
      const sh = Math.max(1, Math.ceil(h / bloco));
      temp.width = sw;
      temp.height = sh;
      tctx.drawImage(img, dx / bloco, dy / bloco, dw / bloco, dh / bloco);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(temp, 0, 0, sw, sh, 0, 0, sw * bloco, sh * bloco);
    }
    if (t < 1) requestAnimationFrame(desenhar);
    else {
      tela.classList.add('some');
      setTimeout(() => tela.remove(), 400);
    }
  };
  requestAnimationFrame(desenhar);
}

function quandoCarregar(img: HTMLImageElement, fn: () => void) {
  if (img.complete && img.naturalWidth) fn();
  else img.addEventListener('load', fn, { once: true });
}

/* ---------- Blocos em degraus ---------- */

function montarDegraus(faixa: HTMLElement) {
  const montar = () => {
    const colunas = window.innerWidth < 640 ? 10 : 20;
    const linhas = 4;
    faixa.style.setProperty('--colunas', String(colunas));
    faixa.innerHTML = '';
    const meio = (colunas - 1) / 2;
    for (let r = 0; r < linhas; r++) {
      for (let c = 0; c < colunas; c++) {
        const cel = document.createElement('span');
        const distancia = Math.abs(c - meio) / meio;
        const altura = (linhas - 1 - r) / linhas;
        cel.dataset.limite = String(0.08 + altura * 0.6 + distancia * 0.3);
        faixa.appendChild(cel);
      }
    }
  };
  montar();
  let largura = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth !== largura) { largura = window.innerWidth; montar(); atualizar(); }
  });
  const atualizar = () => {
    const r = faixa.getBoundingClientRect();
    const h = window.innerHeight;
    const p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.75)));
    faixa.querySelectorAll<HTMLElement>('span').forEach((cel) => {
      cel.classList.toggle('cheio', p >= Number(cel.dataset.limite));
    });
  };
  return atualizar;
}

/* ---------- Início ---------- */

export function iniciarMovimento() {
  const decifraveis = [...document.querySelectorAll<HTMLElement>('[data-decifra], .olho, .h-hero, .h-1')]
    .filter((el) => el.childElementCount === 0 && !el.closest('[data-vitrine]') || el.hasAttribute('data-decifra'));
  const pixelaveis = document.querySelectorAll<HTMLElement>('[data-pixela]');
  const faixas = document.querySelectorAll<HTMLElement>('.degraus');

  if (reduzir || !('IntersectionObserver' in window)) {
    faixas.forEach((f) => f.classList.add('estatica'));
    pixelaveis.forEach((el) => el.classList.add('pixelada'));
    return;
  }

  const obs = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      obs.unobserve(el);
      if (decifraveis.includes(el)) {
        const grande = el.matches('.h-hero, .h-1');
        if (grande) {
          el.style.minHeight = `${el.offsetHeight}px`;
          setTimeout(() => { el.style.minHeight = ''; }, 1300);
        }
        decifrar(el, Number(el.dataset.decifra) || (grande ? 1100 : 700));
      }
      if (el.hasAttribute('data-pixela')) {
        const img = el.querySelector('img');
        if (!img) { el.classList.add('pixelada'); continue; }
        quandoCarregar(img, () => { pixelar(img); el.classList.add('pixelada'); });
      }
    }
  }, { rootMargin: '0px 0px -12% 0px' });

  decifraveis.forEach((el) => obs.observe(el));
  pixelaveis.forEach((el) => obs.observe(el));

  const atualizadores = [...faixas].map(montarDegraus);
  if (atualizadores.length) {
    let pedido = 0;
    const tudo = () => atualizadores.forEach((a) => a());
    window.addEventListener('scroll', () => { cancelAnimationFrame(pedido); pedido = requestAnimationFrame(tudo); }, { passive: true });
    tudo();
  }

  // Itens de grade que entram um depois do outro.
  document.querySelectorAll<HTMLElement>('[data-escalona]').forEach((grade) => {
    [...grade.children].forEach((filho, i) => {
      (filho as HTMLElement).style.transitionDelay = `${(i % 4) * 90}ms`;
    });
  });
}

/* ---------- Vitrine de criações ---------- */

export function iniciarVitrines() {
  document.querySelectorAll<HTMLElement>('[data-vitrine]').forEach((v) => {
    const itens = [...v.querySelectorAll<HTMLElement>('.vitrine__item')];
    const numero = v.querySelector<HTMLElement>('[data-vitrine-numero]');
    const titulo = v.querySelector<HTMLElement>('[data-vitrine-titulo]');
    const texto = v.querySelector<HTMLElement>('[data-vitrine-texto]');
    const fundo = v.querySelector<HTMLElement>('.vitrine__fundo');
    const total = String(itens.length).padStart(2, '0');
    let atual = 0;

    const mostrar = (i: number) => {
      atual = (i + itens.length) % itens.length;
      itens.forEach((it, j) => it.classList.toggle('ativo', j === atual));
      const it = itens[atual];
      const img = it.querySelector('img');
      if (img && !reduzir) {
        if (img.loading === 'lazy') img.loading = 'eager';
        quandoCarregar(img, () => pixelar(img, 600));
      }
      if (numero) numero.textContent = `Nº ${String(atual + 1).padStart(2, '0')} / ${total}`;
      if (titulo) {
        titulo.textContent = it.dataset.legenda ?? '';
        delete titulo.dataset.textoFinal;
        if (!reduzir) decifrar(titulo, 600);
      }
      if (texto) texto.textContent = it.dataset.texto ?? '';
    };
    v.querySelector('[data-vitrine-voltar]')?.addEventListener('click', () => mostrar(atual - 1));
    v.querySelector('[data-vitrine-avancar]')?.addEventListener('click', () => mostrar(atual + 1));

    if (fundo && !reduzir) {
      const deslizar = () => {
        const r = v.getBoundingClientRect();
        const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        fundo.style.setProperty('--deslize', `${(-p * 40).toFixed(2)}vw`);
      };
      window.addEventListener('scroll', () => requestAnimationFrame(deslizar), { passive: true });
      deslizar();
    }
  });
}
