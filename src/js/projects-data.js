/**
 * projects-data.js
 * Edite este arquivo para adicionar, remover ou atualizar projetos.
 * Cada objeto representa um card na seção de Projetos.
 *
 * Campos disponíveis:
 *  - id        (string)   : identificador único
 *  - title     (string)   : nome do projeto
 *  - desc      (string)   : descrição curta (problema que resolve)
 *  - icon      (string)   : emoji ou símbolo para o card header
 *  - category  (string[]) : ['frontend','backend','fullstack','security']
 *  - stack     (string[]) : tecnologias usadas
 *  - demo      (string)   : URL do demo ao vivo ('' = sem link)
 *  - repo      (string)   : URL do repositório GitHub ('' = sem link)
 *  - highlight (boolean)  : destaca o card (bento principal)
 */

const PROJECTS = [
  {
    id: 'routinum',
    title: 'Routinum',
    desc: 'App de rotinas visuais que aplica a Teoria das Colheres para ajudar pessoas com TEA e TDAH a planejar o dia e dosar a energia.',
    icon: '🥄',
    category: ['fullstack'],
    stack: ['React', 'TypeScript', 'Node.js'],
    demo: '',
    repo: '',
    highlight: false,
  },
  {
    id: 'vstructures',
    title: 'vStructures',
    desc: 'Plataforma interativa para aprender estruturas de dados com exemplos visuais em JavaScript, Python e C++.',
    icon: '🌳',
    category: ['fullstack'],
    stack: ['React', 'JavaScript', 'Python', 'C++'],
    demo: '',
    repo: '',
    highlight: false,
  },
  {
    id: 'tcc-libras',
    title: 'Libras Cotidiano',
    desc: 'TCC em elaboração — plataforma de aprendizado de Libras com situações do cotidiano para conectar surdos e ouvintes.',
    icon: '🤟',
    category: ['fullstack'],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    demo: '',
    repo: '',
    highlight: true,
  },
];
