// Mapa do site para o Google: todas as páginas públicas, geradas a cada publicação.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const paginas = ['', 'debutantes/', 'sob-medida/', 'criacoes/', 'honoria-para-casar/', 'pronta-entrega/', 'atelie/', 'atendimento/', 'perguntas-frequentes/', 'imprensa/', 'privacidade/'];

export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pecas = await getCollection('pronta-entrega', (p) => p.data.disponivel);
  const enderecos = [...paginas, ...pecas.map((p) => `pronta-entrega/${p.id}/`)].map((p) => new URL(`${base}/${p}`, site).href);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${enderecos.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
