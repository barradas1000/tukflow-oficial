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
