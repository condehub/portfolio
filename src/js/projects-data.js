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
  // ────────────────────────────────────────────
  // Adicione seus projetos aqui!
  // Exemplo comentado abaixo:
  //
  // {
  //   id: 'meu-projeto',
  //   title: 'Nome do Projeto',
  //   desc: 'Breve descrição do problema que este projeto resolve.',
  //   icon: '🚀',
  //   category: ['fullstack'],
  //   stack: ['React', 'Node.js', 'PostgreSQL'],
  //   demo: 'https://meu-projeto.vercel.app',
  //   repo: 'https://github.com/jvcon/meu-projeto',
  //   highlight: true,
  // },
  // ────────────────────────────────────────────
];
