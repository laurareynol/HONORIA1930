// Gera uma prévia com links relativos (para abrir fora do GitHub Pages).
// Uso: PREVIEW=1 npx astro build --outDir previa && node scripts/previa.mjs previa
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';

const raiz = process.argv[2] || 'previa';
const arquivos = [];
(function andar(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) andar(p);
    else if (/\.(html|css)$/.test(n)) arquivos.push(p);
  }
})(raiz);

for (const arq of arquivos) {
  const prof = relative(raiz, dirname(arq)).split(/[\\/]/).filter(Boolean).length;
  const prefixo = prof ? '../'.repeat(prof) : './';
  let s = readFileSync(arq, 'utf8');
  const rel = (url) => {
    if (url === '/') return prefixo + 'index.html';
    return prefixo + url.slice(1);
  };
  s = s.replace(/(href|src|action|poster)="(\/(?!\/)[^"]*)"/g, (_, a, u) => `${a}="${rel(u)}"`);
  s = s.replace(/srcset="([^"]*)"/g, (_, v) => `srcset="${v.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g, (m, sep, u) => sep + rel(u))}"`);
  s = s.replace(/url\((["']?)(\/(?!\/)[^)"']+)\1\)/g, (_, q, u) => `url(${q}${arq.endsWith('.css') ? '../' + u.slice(1) : rel(u)}${q})`);
  s = s.replace(/(import\s*["']|from\s*["'])(\/arquivos\/[^"']+)/g, (_, a, u) => a + rel(u));
  writeFileSync(arq, s);
}
// A página inicial da prévia vira o corpo do artefato (sem doctype/html/head/body próprios).
{
  const ini = join(raiz, 'index.html');
  let h = readFileSync(ini, 'utf8');
  const head = h.match(/<head>([\s\S]*?)<\/head>/)[1].replace(/<meta charset[^>]*>|<meta name="viewport"[^>]*>/g, '').replace(/<title>[^<]*<\/title>/, '<title>Site Honōria 1930</title>');
  const body = h.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];
  writeFileSync(join(raiz, '_inicio.html'), `${head.trim().replace(/^/, '')}\n${body}`.replace(/^(?!<title>)/, ''));
}
console.log(`Prévia pronta em ${raiz}/ (${arquivos.length} arquivos ajustados)`);
