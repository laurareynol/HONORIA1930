// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL e BASE_PATH são definidos na publicação (GitHub Actions).
// Quando o domínio próprio estiver ligado, BASE_PATH passa a ser "/".
const preview = process.env.PREVIEW === '1';

export default defineConfig({
  site: process.env.SITE_URL || 'https://honoriaoficial.com',
  base: process.env.BASE_PATH || '/',
  trailingSlash: preview ? 'ignore' : 'always',
  build: { format: preview ? 'file' : 'directory', assets: preview ? 'arquivos' : '_astro' },
  i18n: {
    locales: ['pt'],
    defaultLocale: 'pt',
  },
});
