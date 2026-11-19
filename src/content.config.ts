import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Arquivos que começam com "_" são modelos e não aparecem no site.

const criacoes = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/criacoes' }),
  schema: ({ image }) =>
    z.object({
      foto: image(),
      descricao: z.string(), // descrição da imagem, para leitores de tela
      ocasiao: z.enum(['noivas', 'debutantes', 'formandas', 'festa']).optional(),
      video: z.string().optional(), // nome do arquivo em public/videos (ex.: preto-passarela.mp4); a foto vira a capa
      titulo: z.string().optional(),
      legenda: z.string().optional(),
      ordem: z.number().default(100),
    }),
});

const prontaEntrega = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/pronta-entrega' }),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      foto: image(), // foto principal, usada na vitrine
      descricao: z.string(),
      fotos: z.array(z.object({ foto: image(), descricao: z.string() })).default([]), // fotos extras da página da peça
      loja: z.literal('Goiânia'),
      preco: z.string().optional(), // ex.: "R$ 4.800"; deixe vazio para não exibir
      tamanho: z.string().optional(),
      cor: z.string().optional(),
      ocasiao: z.enum(['debutantes', 'formandas', 'festa', 'noivas']).optional(),
      linkPagamento: z.string().url().optional(), // link do Mercado Pago ou PagBank; sem ele, o botão abre o WhatsApp
      ordem: z.number().default(100),
      disponivel: z.boolean().default(true),
    }),
});

const diario = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/diario' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumo: z.string(),
      data: z.coerce.date(),
      capa: image().optional(),
      descricaoCapa: z.string().optional(),
      rascunho: z.boolean().default(false),
    }),
});

export const collections = { criacoes, 'pronta-entrega': prontaEntrega, diario };
