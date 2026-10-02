# Site Honōria 1930

Site estático feito com [Astro](https://astro.build). Publicado pelo GitHub Pages a cada alteração no ramo `main`.

## Onde mudar cada coisa

| O quê | Arquivo |
|---|---|
| WhatsApp, e-mail, Instagram, horário, endereços das lojas, valores do atendimento com a Tata, menu | `src/config/site.ts` |
| Peças de pronta entrega | `src/content/pronta-entrega/` |
| Criações (galeria) | `src/content/criacoes/` |
| Textos do Diário | `src/content/diario/` |
| Fotos | `src/assets/fotos/` |
| Cores, fontes, espaçamentos | `src/styles/global.css` |

Cada pasta de conteúdo tem um arquivo `_modelo.md`. Para criar algo novo, copie o modelo, renomeie (sem o `_` no início, ex.: `vestido-azul.md`) e preencha. Arquivos que começam com `_` não aparecem no site.

## Adicionar uma peça de pronta entrega

1. Coloque a foto em `src/assets/fotos/` (JPG, de preferência com pelo menos 1600 px de altura).
2. Copie `src/content/pronta-entrega/_modelo.md` para um novo arquivo, ex.: `vestido-azul.md`.
3. Preencha nome, foto, descrição e loja (`goiania` ou `sao-paulo`). O preço é opcional: se ficar em branco, a peça aparece sem valor.
4. Quando a peça for vendida, mude `disponivel: false` ou apague o arquivo.

## Publicar

Qualquer alteração salva no ramo `main` do GitHub é publicada sozinha em alguns minutos (aba **Actions** mostra o andamento). Dá para editar direto pelo site do GitHub: abra o arquivo, clique no lápis, salve com "Commit changes".

Na primeira vez, em **Settings → Pages**, escolha **Source: GitHub Actions**.

## Rodar no computador (opcional)

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera a versão final em dist/
```

## Regras da marca

- Somente preto e branco.
- Nunca publicar preço, prazo, estoque ou depoimento que não tenha sido confirmado.
- Fotos: modelos; costureiras apenas em detalhes das mãos.
