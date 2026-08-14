# João Victor Conde — Portfolio (Meu portfolio)

Um portfolio pessoal estático, bonito e acessível, feito em HTML, CSS e JavaScript. Focado em apresentar projetos, experiência, certificações e formas de contato — com animações sutis, efeito de cursor personalizado e um canvas interativo no hero.

Principais linguagens: CSS, HTML, JavaScript.

---

## Demo
Abra o conteúdo da pasta `src/` em um servidor estático (ex.: http-server, Live Server) para ver o site completo.

---

## Recursos principais
- Navegação de uma página (single-page) com seções: Hero, Sobre, Projetos, Experiência, Certificações, Formação, Habilidades e Contato.
- Efeitos: preloader, cursor customizado, typewriter, animações de entrada (IntersectionObserver), canvas animado no hero.
- Renderização dinâmica dos cards de projeto a partir de `src/js/projects-data.js`.
- Formulário de contato que envia para Web3Forms (chave via variável de ambiente / arquivo de configuração).
- Estrutura de ícones organizada em `src/assets/icons/` com READMEs para convenção de nomes.

---

## Stack
- Language(s): CSS, HTML, JavaScript
- Runtime: Navegador — site estático
- Notable libs/tools: http-server (para servir localmente)

---

## Como o projeto está organizado
Estrutura resumida (arquivos e pastas que importam):

```
src/
  index.html                 # Página principal (entrada)
  js/
    env.js                   # (opcional) configura variáveis de ambiente em runtime
    main.js                  # Lógica principal (preloader, nav, canvas, projetos, formulário)
    projects-data.js         # Dados dos projetos exibidos na página
  css/
    reset.css
    tokens.css
    animations.css
    layout.css
    components.css
    sections/                 # estilos por seção (hero, about, projects, skills, ...)
  assets/
    certificates/             # PDFs dos certificados (link "Ver certificado →")
    icons/
      tech/                   # logos de tecnologias (README dentro da pasta explica convenção)
      certs/                  # logos de plataformas de certificação
      companies/              # logos de empresas
      education/              # logos de instituições de ensino
  image/
    foto formatura.jpg        # foto usada no hero
.env.example                  # exemplo de configuração (existente no repositório)
package.json                  # dependencia: http-server
```

Como se encaixa: O site é um SPA estático — `index.html` carrega os estilos em `src/css/*` e o JavaScript em `src/js/*`. `main.js` injeta os cards de projetos lendo `PROJECTS` (definido em `projects-data.js`), controla interações e envia o formulário de contato usando a chave definida em `window.__ENV.WEB3FORMS_KEY` (ou outra variável equivalente definida em `src/js/env.js`).

---

## Executando localmente (rápido)
Recomendado: usar um servidor estático para evitar problemas com CORS e carregamento local.

1. Clone o repositório:
```bash
git clone https://github.com/condehub/portfolio.git
cd portfolio
```

2. Instale dependências (opcional — apenas para `http-server` se desejar instalar localmente):
```bash
npm install
```

3. Sirva a pasta `src/`:
- Com npx/http-server (rápido):
```bash
npx http-server ./src -p 8080
# ou
npx http-server src -o -p 8080
```

- Ou use a extensão Live Server do VS Code: abra a pasta `src/` e clique em "Open with Live Server".

Abra http://localhost:8080 (ou a porta escolhida) no navegador.

---

## Configuração do formulário de contato
O formulário de contato envia para Web3Forms (endpoint em `main.js`). Para ativá-lo:

1. Obtenha uma chave em web3forms.com (ou use seu método de envio preferido).
2. Crie o arquivo `src/js/env.js` (não versionar credenciais) contendo:
```javascript
window.__ENV = {
  WEB3FORMS_KEY: 'SUA_CHAVE_AQUI'
};
```

Ou edite `.env.example` / pipeline conforme seu fluxo de deploy para injetar `window.__ENV`.

Observação: se o arquivo `src/js/env.js` não existir ou a chave estiver ausente, o formulário poderá retornar erro ao enviar.

---

## Como adicionar / modificar conteúdo rápido
- Adicionar projeto: edite `src/js/projects-data.js` (cada projeto aparece automaticamente na grade).
- Trocar foto do hero: substitua `src/image/foto formatura.jpg` (ou atualize `index.html`).
- Adicionar logos/ícones: coloque SVGs/PNGs em `src/assets/icons/tech/`, `certs/`, `companies/` ou `education/`. Há READMEs dentro dessas pastas explicando convenções de nomes e integração.
- Adicionar certificados (PDF): coloque em `src/assets/certificates/` e vincule pelo link "Ver certificado →" no card correspondente.
- Ajustar estilos: `src/css/sections/` contém arquivos separados por seção para facilitar manutenção.

---

## Boas práticas e melhorias sugeridas
- Adicionar um script npm em package.json, ex.:
```json
"scripts": {
  "start": "http-server ./src -p 8080"
}
```
- Migrar projetos para JSON externo ou CMS headless se quiser gerenciar sem deploy.
- Adicionar testes básicos de acessibilidade e validação do formulário.
- Automatizar injeção de variáveis de ambiente para deploys (Netlify, Vercel, GitHub Pages com build step).

---

## Contribuição
Contribuições são bem-vindas: abra uma issue descrevendo o que deseja melhorar (ex.: otimização de imagens, acessibilidade, novas seções). Para alterações maiores, envie um PR com mudanças isoladas e descrição clara do que foi feito.

---

## Licença
Nenhuma licença especificada no repositório. Se quiser tornar este projeto utilizável por terceiros, adicione um arquivo `LICENSE` (MIT ou outra conforme preferir).

---

## Contato
- GitHub: https://github.com/condehub
- LinkedIn: https://linkedin.com/in/jvconde
- E-mail: joao.vbconde@gmail.com (presente no site)

---

## Perguntas úteis para seguir
- Como eu adiciono um novo projeto passo a passo no `src/js/projects-data.js`?
- Qual a melhor forma de proteger a chave do Web3Forms em produção (ex.: deploy no Netlify/Vercel)?
- Onde substituir os ícones das tecnologias para usar SVGs personalizados (qual convenção de nomes seguir)?

---

Feito com foco em estilo e simplicidade — personalize cores, tipografia e conteúdos para deixar com a sua cara.
```
