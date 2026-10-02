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
      ocasiao: z.enum(['noivas', 'festa', 'tata']),
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
      foto: image(),
      descricao: z.string(),
      loja: z.enum(['Goiânia', 'São Paulo', 'Goiânia e São Paulo']),
      preco: z.string().optional(), // ex.: "R$ 4.800"; deixe vazio para não exibir
      tamanho: z.string().optional(),
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
