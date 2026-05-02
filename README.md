# TukFlow — Página de Marketing

Descrição
- Página de marketing de apresentação do TukFlow (gestão de TukTuks). Contém versões locais em `oficial/index.html` e `oficial/index-3.html`.

Estrutura principal
- `oficial/` — HTML, CSS e assets da página de marketing.
  - `index.html`, `index-3.html`, `index-4.html` — variações da landing page.
  - `pagina-marketing-apresenta-sistema.css` — estilos principais.
  - `pagina-marketing-apresenta-sistema.js` — scripts (se existir).
- `languages/` — ficheiros de tradução: `pt.js`, `en.js`, `es.js` (definem `window.translations`).
- `public/` — imagens e ícones usados na página.

Como visualizar localmente
1. Abrir uma linha de comando na pasta do projeto:

PowerShell (recomendado):

```powershell
cd c:\codigo\Marketing-tuktuk\paginas-marketing-tukflow-stitch
python -m http.server 8000
```

ou, se preferir Node.js (instalar `serve`):

```powershell
npx serve -s . -l 8000
```

2. Abrir no browser: `http://localhost:8000/oficial/index-3.html` (ou `index.html` conforme desejar).

Notas sobre traduções (i18n)
- As traduções ficam em `languages/pt.js`, `languages/en.js`, `languages/es.js` como um objeto global `window.translations = { ... }`.
- Para adicionar/editar chaves, abra o ficheiro correspondente e coloque as novas entradas dentro do objeto `window.translations`.
- Após editar, recarregue a página; o selector de idioma carrega o ficheiro dinamicamente.

Problema conhecido e correção aplicada (nav móvel)
- Problema: o menu móvel (`#mobileMenu`) estava dentro do `<header>` que usa `backdrop-filter`. Isso fazia com que `position:fixed` do overlay ficasse contido ao header (overlay não cobria toda a viewport).
- Solução: o `#mobileMenu` foi movido para o nível do `body` (fora do `header`) e o `z-index` foi aumentado para garantir cobertura total. Se notar comportamento estranho no mobile, verifique se há `backdrop-filter` em elementos pais e confirme que `#mobileMenu` está fora deles.

Boas práticas locais
- Use o Live Server do VS Code ou o comando `python -m http.server` para testar sem problemas de CORS ou caminhos relativos.
- Ao editar traduções, mantenha o JSON/JS bem formatado e valide que todas as chaves estão dentro de `window.translations = { ... }` para evitar que o seletor de idioma quebre.

Créditos / Contato
- Desenvolvido no diretório local do projeto. Para alterações maiores (ex.: adicionar pricing, tabelas de comparação ou vídeos), diga o que pretende e eu implemento.

Arquivo criado: `README.md`
[{
	"resource": "/c:/codigo/Marketing-tuktuk/paginas-marketing-tukflow-stitch/.github/workflows/vercel-deploy.yml",
	"owner": "_generated_diagnostic_collection_name_#5",
	"severity": 8,
	"message": "Invalid action input 'prod'",
	"startLineNumber": 27,
	"startColumn": 11,
	"endLineNumber": 27,
	"endColumn": 15,
	"modelVersionId": 1,
	"origin": "extHost1"
}]
**Deploy no Vercel**

Passos rápidos:

1. Se ainda não tiver conta, crie em https://vercel.com e instale o CLI localmente:

```bash
npm i -g vercel
```

2. Fazer login e ligar ao projeto (dentro da pasta do projeto):

```bash
cd c:\codigo\Marketing-tuktuk\paginas-marketing-tukflow-stitch
vercel login
vercel
```

3. Ou fazer deploy direto (produção):

```bash
vercel --prod
```

Observações sobre a configuração incluída:
- O ficheiro `vercel.json` já está preparado para servir ficheiros estáticos e mapeia `/` para `/oficial/index-3.html`.
- Use o script `npm run start` para pré-visualizar localmente (usa `serve` via `npx`).

Se preferir, eu posso: configurar um ficheiro `.env` com variáveis públicas, adicionar um domínio personalizado no vercel.json, ou automatizar o processo com um workflow GitHub Actions. Diga o que prefere.

**CI: Deploy automático com GitHub Actions**

Adicione o workflow que já colocámos em `.github/workflows/vercel-deploy.yml` para fazer deploy automático à `main`.

1. Crie um token de deploy em https://vercel.com/account -> Tokens (guarde o token uma vez só).
2. Vá ao repositório no GitHub → Settings → Secrets and variables → Actions → New repository secret e adicione:
  - `VERCEL_TOKEN` — o token criado no Vercel
  - `VERCEL_ORG_ID` — ID da organização (Project Settings → General → Environment → Organization ID no Vercel)
  - `VERCEL_PROJECT_ID` — ID do projeto (Project Settings → General → Project ID)

3. Após push para a branch `main`, o workflow executa e publica o site em produção (usa `vercel` com `prod: true`).

Se preferir que o workflow faça deploy apenas em tags ou em outra branch, diga qual o seu fluxo preferido e eu adapto o ficheiro.
