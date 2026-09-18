# Operação e publicação — LIPID

Documento operacional do website LIPID. Não registre senhas, tokens, chaves SMTP ou
outros segredos neste arquivo.

## Estado atual

- Website de homologação: `https://lipid.daksa.online`
- API: `https://api.daksa.online`
- CMS: `https://cms.daksa.online`
- Produção planejada: `https://lipid.com.br` (canônico, sem `www`)
- Plataforma: Coolify em VPS Hetzner, com website, API, CMS e PostgreSQL no mesmo
  stack Compose.
- Um deploy da stack pode causar indisponibilidade curta do website e do CMS enquanto
  os respectivos containers são recriados. Não use apenas a resposta de aceite do
  Coolify como confirmação: valide as URLs públicas após a atualização.

## Domínio e SEO

O domínio de homologação deve permanecer operacional durante e após a virada inicial.
Não altere URLs canônicas, sitemap ou robots para `lipid.com.br` antes de o domínio
estar configurado no Coolify, com certificado válido e DNS apontado para a VPS.

No momento da virada, configurar `NEXT_PUBLIC_SITE_URL=https://lipid.com.br` como
argumento de build e variável de runtime do serviço website. Em seguida, validar:

```text
https://lipid.com.br/
https://lipid.com.br/contato
https://lipid.com.br/sitemap.xml
https://lipid.com.br/robots.txt
```

Configurar `www.lipid.com.br` para redirecionar permanentemente a
`https://lipid.com.br`, preferencialmente no proxy/Coolify para evitar cadeias de
redirect. O HTTP também deve redirecionar diretamente para a versão HTTPS canônica.

### Migração de URLs antigas

Os redirects estão em `apps/website/src/middleware.ts`. Eles preservam rotas
institucionais, variantes `/index.php/`, páginas de serviços e URLs de blog antigas.

O catálogo antigo foi removido intencionalmente. URLs antigas de produto são
redirecionadas por equivalência para setor ou tecnologia, e **não** para a home:

- farmacêutico → `/segmentos/farmaceutica`
- cosmético → `/segmentos/cosmetica`
- veterinário → `/segmentos/veterinaria`
- nutrição → `/tecnologias/fosfolipidios`
- sistemas de liberação → `/tecnologias/encapsulacao`

Rotas de spam/ataque, por exemplo `/spip.php`, devem continuar como `404`.

## Formulário de contato

O formulário público grava o lead no banco, deixa-o disponível no CMS e, somente para
envios originados em `/contato`, faz uma notificação SMTP assíncrona. Falha SMTP não
impede a gravação do lead.

Variáveis obrigatórias no ambiente do serviço API (valores devem ficar apenas no
Coolify/gestor de segredos):

```text
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
SMTP_FROM
CONTACT_NOTIFICATION_TO
```

O e-mail HTML inclui nome, empresa, e-mail, telefone, assunto, mensagem e URL de
origem. O e-mail do visitante é configurado como `Reply-To`. Após mudar credenciais,
realizar um único envio controlado, confirmar o lead no CMS e a entrega no destinatário.

## Métricas

- O container Google Tag Manager `GTM-P6HJ4QL` é carregado globalmente no layout raiz.
- A propriedade GA4 oficial é `G-3ECRGNWMB8` e deve ser publicada como tag dentro do
  próprio GTM.
- Não instalar diretamente o ID `G-404GXE7LR3`: ele foi encontrado apenas em um arquivo
  indevido do site antigo, não nas páginas oficiais.

Após publicar mudanças no GTM, validar no modo Preview/Tag Assistant e em uma sessão
anônima que há um pageview por carregamento, sem duplicidade.

## Cabeçalhos de segurança

O website envia HSTS, `Referrer-Policy` e `Permissions-Policy`. Os cabeçalhos existentes
`X-Content-Type-Options` e `X-Frame-Options` não devem ser removidos. Uma CSP definitiva
requer fase prévia em `Content-Security-Policy-Report-Only`, pois GTM, fontes Google e a
API precisam constar na política validada.

## Checklist mínimo após cada deploy

```text
GET https://lipid.daksa.online/              → 200
GET https://lipid.daksa.online/contato       → 200
GET https://api.daksa.online/health          → 200
GET https://cms.daksa.online/                → 200
```

Na produção, repetir o checklist no domínio canônico e testar uma URL antiga, por
exemplo `/index.php/contato`, que deve responder `301` para `/contato`.

## Rollback

Antes de alterar DNS, registrar o destino atual, TTL e horário da mudança. Se houver
falha crítica após a virada, restaurar o registro DNS anterior e aguardar a propagação.
Para um problema exclusivamente de aplicação, redeployar o commit Git anterior que
estava validado; não executar reset destrutivo no repositório ou no banco.
