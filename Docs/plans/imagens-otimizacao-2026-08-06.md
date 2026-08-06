# Otimização e publicação das imagens do site — de-para e execução

Data: 2026-08-06 · Status: **executado, aguardando revisão e aprovação de commit**

Fontes: varredura `imagens-site-lipid.pdf` (05/08) + `img/imagens-originais/` (43 arquivos, 91 MB).

**Resultado:** 24 peças publicadas · 48,6 MB de originais → **1,52 MB** em WebP · nenhuma imagem
inventada · type-check limpo · `/parceiros` corrigido.

---

## 1. Decisões tomadas (Renato, 06/08)

| # | Decisão | Escolha |
|---|---|---|
| D1 | `/sobre` "Quem somos" | `laboratorio-001.png` — foto real, atende o brief "tom documental" |
| D2 | Diagramas de tecnologia | **Manter os SVGs**; renders 3D entram como ambientação de fundo do hero |
| D3 | Cards da Home e `/segmentos` | **Estático por slug** — sem migration, sem admin |
| D4 | `/sobre` "Como atuamos" | `2-4.png` (etapas com seta) |

---

## 2. Tabela de-para

Legenda de destino: **E** = asset estático versionado · **B** = campo do banco apontando para asset
estático (ver §4).

### 2.1 `/sobre` — 8 peças (destino B)

| PDF | Slot | Original | Dim origem | Arquivo publicado | Saída | Peso |
|---|---|---|---|---|---|---|
| 2.1 | Hero 469×587 | `2-1.png` | 1122×1402 | `public/sobre/sobre-hero-bicamada-lipidica.webp` | 938×1174 | 101 KB |
| 2.2 | Quem somos | `laboratorio-001.png` | 1448×1086 | `…/sobre-equipe-laboratorio-controle-qualidade.webp` | 868×1086 | 135 KB |
| 2.3 | Como atuamos | `2-4.png` | 4096×2304 | `…/sobre-processo-etapas-desenvolvimento.webp` | 938×1174 | 79 KB |
| 2.4 | Mini farmacêutica 284×96 | `2-3-b.png` | 4096×2304 | `…/sobre-segmento-farmaceutica-frasco-capsulas.webp` | 568×192 | 5 KB |
| 2.5 | Mini cosmética | `2-5.png` | 2172×724 | `…/sobre-segmento-cosmetica-creme-gel.webp` | 568×192 | 7 KB |
| 2.6 | Mini nutricional | `2-6-b.jpeg` | 3552×1184 | `…/sobre-segmento-nutricional-lecitina-soja.webp` | 568×192 | 7 KB |
| 2.7 | Mini veterinária | `2-7.png` | 2172×724 | `…/sobre-segmento-veterinaria-nutricao-animal.webp` | 568×192 | 14 KB |
| 2.8 | Qualidade | `2-8.png` | 1536×2752 | `…/sobre-qualidade-documentacao-tecnica.webp` | 938×1174 | 77 KB |

`quem-somos` saiu em 868×1086 e não 938×1174 porque a origem é 1448 px de largura e o corte 4:5
consome parte dela — preferi não fazer upscale.

### 2.2 Home — cards de segmento 278×160 (destino E)

| PDF | Original | Arquivo publicado | Saída | Peso |
|---|---|---|---|---|
| 1.1 Cosmética | `1-1.png` | `public/segmentos/card-cosmetica.webp` | 556×320 | 16 KB |
| 1.2 Farmacêutica | `1-2.png` | `public/segmentos/card-farmaceutica.webp` | 556×320 | 15 KB |
| 1.3 Nutricional | `1-3.png` | `public/segmentos/card-nutricional.webp` | 556×320 | 11 KB |
| 1.4 Veterinária | `1-4.png` | `public/segmentos/card-veterinaria.webp` | 556×320 | 28 KB |

### 2.3 Home + `/tecnologias` — cards 323×128 (destino E)

| PDF | Original | Arquivo publicado | Saída | Peso |
|---|---|---|---|---|
| 1.5 Lipossomas | `1-5.jpg` | `public/tecnologias/card-lipossomas.webp` | 646×256 | 22 KB |
| 1.6 Fosfolipídios | `1-6-b.png` | `public/tecnologias/card-fosfolipidios.webp` | 646×256 | 22 KB |
| 1.7 Encapsulação | `1-7.png` | `public/tecnologias/card-encapsulacao.webp` | 646×256 | 22 KB |

`1-6-b` (2,523) e `1-7` (2,520) batem exato no ratio do slot — foram feitos sob medida. Só `1-5`
(1,792) precisou de corte, e sobreviveu bem porque a vesícula está centralizada.

### 2.4 `/tecnologias/[slug]` — ambientação do hero (destino E)

| PDF | Original | Arquivo publicado | Saída | Peso |
|---|---|---|---|---|
| 4.1 Lipossomas | `4-1.png` | `public/tecnologias/hero-lipossomas.webp` | 1152×718 | 85 KB |
| 5.1 Fosfolipídios | `5-1.png` | `public/tecnologias/hero-fosfolipidios.webp` | 1152×718 | 86 KB |
| 6.1 Encapsulação | `vesicula-com-principio-ativo.png` | `public/tecnologias/hero-encapsulacao.webp` | 1152×718 | 132 KB |

⚠️ **Não existia arquivo `6-1`** para a encapsulação. Usei `vesicula-com-principio-ativo.png` (peça
sem numeração, lipossoma em corte com o ativo visível no núcleo) — é a que melhor responde ao brief.
Confirme se aceita ou se prefere gerar uma peça própria.

### 2.5 `/segmentos/[slug]` — composição de produto (destino E)

| PDF | Original | Arquivo publicado | Saída | Peso |
|---|---|---|---|---|
| 8.1 | `8-1.png` | `public/segmentos/farmaceutica.webp` | 1400×901 | 84 KB |
| 9.1 | `9-1.png` | `public/segmentos/cosmetica.webp` | 1400×901 | 71 KB |
| 10.1 | `10-1.png` | `public/segmentos/nutricional.webp` | 1400×901 | 108 KB |
| 11.1 | `11-1.png` | `public/segmentos/veterinaria.webp` | 1400×901 | 86 KB |

O PDF marcava essas páginas como "0 imagens faltantes" — não havia slot algum. Criei um hero de duas
colunas (texto 7 / arte 5) que degrada para o layout antigo se o slug não tiver arte.

### 2.6 Parceiros — foto institucional (destino B)

| PDF | Original | Arquivo publicado | Saída | Peso |
|---|---|---|---|---|
| 18.1 | `18-1.png` | `public/parceiros/lipoid-equipe-lipid-feira.webp` | 1190×700 | 154 KB |
| 19.1 | `19-1.png` | `public/parceiros/readline-biotech-estande-feira.webp` | 1190×700 | 191 KB |

O campo `Partner.image` já existia, estava `null` e é editável no admin.

---

## 3. O bug de `/parceiros` — diagnóstico e correção

**Sintoma:** os dois logos quebrados em `/parceiros`, funcionando na Home.

**Diagnóstico (reproduzido ao vivo):**

```
GET /_next/image?url=https%3A%2F%2Fapi.daksa.app.br%2Fuploads%2F2d764d94-….png&w=1080&q=75
→ 400  "url" parameter is not allowed
```

Descartei as hipóteses fáceis: os dados estão corretos na API, o arquivo responde `200 image/png`,
e o `next.config.js` deployado **é o atual** — provado porque o redirect `/aplicacoes → /segmentos`
(308) e os headers `X-Frame-Options`, do mesmo arquivo, estão ativos em produção. Ou seja, o bloco
`remotePatterns` com `api.daksa.app.br` está no build e mesmo assim o otimizador recusa a origem.

A diferença real era a tag: a Home usa `<img>` cru, `/parceiros` usava `<Image fill>` do `next/image`
— só o segundo passa pelo otimizador `/_next/image`.

**Correção aplicada:** trocar por `<img>` em `parceiros/page.tsx` e `parceiros/[slug]/page.tsx`
(este último tinha o mesmo defeito latente no logo **e** na foto). É o padrão que o site já usa em
todo asset vindo da API — `PartnersSection`, `ContentSection`, `Figura()` das tecnologias. Resolve
independentemente da causa raiz do 400 e não depende de `sharp`, que não está nas dependências.

**Verificado:** os dois logos renderizam. `17-1.png` e `17-2.png` não foram usados, como o PDF previa.

---

## 4. Por que asset estático dentro de campo de CMS

`apps/api/uploads/` está no `.gitignore` — um upload pelo painel **não chega em produção pelo git**.
Como as peças de `/sobre` e as fotos de parceiro são fixas e devem viajar com o deploy, gravei os
arquivos em `apps/website/public/` e apontei o campo do banco para esse caminho. É o padrão que o
projeto já adotou nas tecnologias (`imageOneUrl = '/tecnologias/*.svg'`).

Para isso, `ImageSlot` precisou parar de usar `resolveMediaUrl` (que prefixa **tudo** com a URL da
API e quebraria o caminho estático). Extraí `resolveAssetUrl` em `lib/api.ts`, generalizando a lógica
que já existia isolada em `urlDaFigura()`. Trocar a arte pelo painel continua funcionando e
sobrescreve o valor.

SQL idempotente em [`scripts/seed-imagens/seed_imagens.sql`](../../scripts/seed-imagens/seed_imagens.sql).
⚠️ Rodar **depois** de `seed-institucional/seed.sql`, que apaga e reinsere os itens das seções.

---

## 5. Arquivos tocados

| Arquivo | Mudança |
|---|---|
| `lib/api.ts` | novo `resolveAssetUrl` |
| `components/sections/institucional-novo/ImageSlot.tsx` | usa `resolveAssetUrl` |
| `components/sections/SegmentsSection.tsx` | mapa `ARTES` + imagem no card + véu para legibilidade do badge |
| `components/sections/TechnologiesSection.tsx` | exporta `ARTES_TECNOLOGIA` + imagem no card |
| `app/tecnologias/page.tsx` | usa `ARTES_TECNOLOGIA` no lugar do ícone genérico |
| `app/tecnologias/[slug]/page.tsx` | `AMBIENTE_HERO` — render 3D esmaecido ao fundo |
| `app/segmentos/[slug]/page.tsx` | `ARTES_SEGMENTO` + hero em duas colunas |
| `app/parceiros/page.tsx` | `<Image>` → `<img>` (bug §3) |
| `app/parceiros/[slug]/page.tsx` | idem, logo e foto |
| `.gitignore` | ignora `img/imagens-originais/` (91 MB) |
| `scripts/seed-imagens/seed_imagens.sql` | novo |

---

## 6. Não usados / pendências

| Item | Situação |
|---|---|
| `1-8`, `1-9`, `1-10` | capas dos posts de teste que serão apagados — mesma regra dos itens 12–16 |
| `12 13 14 15 - Blog.png` | print do próprio PDF de varredura |
| `17-1`, `17-2` | logos — era bug de código, corrigido em §3 |
| `3-1.png` | duplica o conteúdo de `4-1` (lipossoma), sem slot próprio |
| `2-1-b`, `2-2`, `2-2-b`, `2-3`, `2-5-b`, `fosfolipidio-01` | alternativas não escolhidas |
| `20-1.png` | recepção Lipid — otimizado em `img/otimizadas/`, `/contato` não tem slot |
| `supera-001/003` | Supera Parque — otimizados em `img/otimizadas/`, sem destino definido |
| `supera-002`, `supera-004` | variações do mesmo prédio, redundantes |

**Alternativa pronta:** `2-3.jpg` (esferas encadeadas na diagonal) preenche o slot 4:5 de "Como
atuamos" com bem menos violência de corte que `2-4.png`, que é uma composição panorâmica de quatro
painéis e perde dois deles no recorte. Já convertida em
`img/otimizadas/alternativa-como-atuamos-esferas-encadeadas.webp` (938×1174, 56 KB). Para trocar,
copiar por cima de `public/sobre/sobre-processo-etapas-desenvolvimento.webp` — nenhum código nem
registro do banco muda.

**Sem campo de alt no schema:** `Partner` não tem `imageAlt`/`logoAlt`. Os alts hoje são derivados do
nome (`Logo Lipoid`, `Lipoid — registro institucional`). Se as fotos forem trocadas pelo painel, o
alt não acompanha. Vale uma migration futura.
