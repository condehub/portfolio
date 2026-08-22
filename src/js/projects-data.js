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
    id: 'vstructures',
    title: 'vStructures',
    desc: 'Plataforma interativa para aprender estruturas de dados com exemplos visuais em JavaScript, Python e C++.',
    icon: '🌳',
    category: ['fullstack'],
    stack: ['React', 'JavaScript', 'Python', 'C++'],
    demo: '',
    repo: 'https://github.com/condehub/vStructures',
    highlight: false,
  },
  {
    id: 'calmspace-planner',
    title: 'CalmSpace Planner',
    desc: 'Plataforma de planejamento e produtividade minimalista com foco em bem-estar e organização mental.',
    icon: '🌿',
    category: ['fullstack'],
    stack: ['React', 'TypeScript', 'Node.js'],
    demo: '',
    repo: 'https://github.com/condehub/calmspace-planner',
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
  {
    id: 'amazon-clone',
    title: 'Amazon Clone',
    desc: 'Clone da página inicial da Amazon com layout responsivo, carrossel de produtos e menu interativo.',
    icon: '🛒',
    category: ['frontend'],
    stack: ['HTML', 'CSS', 'JavaScript'],
    demo: '',
    repo: '',
    highlight: false,
  },
  {
    id: 'rock-paper-scissors',
    title: 'Rock Paper Scissors',
    desc: 'Jogo de pedra, papel e tesoura contra o computador, com placar e interações em tempo real.',
    icon: '✊',
    category: ['frontend'],
    stack: ['HTML', 'CSS', 'JavaScript'],
    demo: '',
    repo: '',
    highlight: false,
  },
  {
    id: 'youtube-clone',
    title: 'YouTube Clone',
    desc: 'Réplica da interface do YouTube — grid de vídeos, sidebar e barra de busca — feita apenas com HTML e CSS.',
    icon: '▶️',
    category: ['frontend'],
    stack: ['HTML', 'CSS'],
    demo: '',
    repo: '',
    highlight: false,
  },
];
