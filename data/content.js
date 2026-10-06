// All copy lives here. Project data mirrors the public repos at github.com/ReisDevv.

export const links = {
  github: 'https://github.com/ReisDevv',
  linkedin: 'https://www.linkedin.com/in/nelsonreisgomes/',
  email: 'nelsondosreisgomessouza@gmail.com',
  phone: '+55 11 98551-6950',
  phoneHref: 'tel:+5511985516950',
  resume: '/assets/resume.pdf',
}

// GitHub linguist colors, so each language reads the same as on the repo page.
export const languageColors = {
  'C#': '#178600',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Java: '#b07219',
  HTML: '#e34c26',
}

const repo = name => `https://github.com/ReisDevv/${name}`

export const featuredProject = {
  title: 'Maya RPG',
  repo: repo('maya-rpg'),
  live: 'https://maya-rpg-web.vercel.app',
  image: '/projects/maya-rpg.webp',
  imageAlt: { pt: 'Tela de login do painel da Clínica Maya', en: 'Login screen of the Maya Clinic panel' },
  languages: ['TypeScript', 'Java'],
  stack: ['NestJS', 'TypeORM', 'PostgreSQL', 'JWT', 'React 19', 'Vite', 'Tailwind', 'Android', 'Firebase', 'Docker'],
  kicker: {
    pt: 'Plataforma para clínica de fisioterapia',
    en: 'Platform for a physiotherapy clinic',
  },
  description: {
    pt: 'Monorepo com API em NestJS, painel web em React e app Android para uma clínica de RPG. Cobre pacientes, prontuários, prescrições de exercícios, agenda, check-ins, chat e notificações push.',
    en: 'Monorepo with a NestJS API, a React web panel and an Android app for a postural therapy clinic. Covers patients, medical records, exercise prescriptions, scheduling, check-ins, chat and push notifications.',
  },
}

export const projects = [
  {
    title: 'Ecos do Santuário',
    repo: repo('MonoDailyLife'),
    image: '/projects/ecos-do-santuario.webp',
    imageAlt: { pt: 'Menu inicial do jogo Ecos do Santuário', en: 'Title screen of the game Ecos do Santuário' },
    languages: ['JavaScript'],
    stack: ['Canvas API', 'HTML', 'CSS'],
    description: {
      pt: 'Jogo 2D de navegador em JavaScript puro e Canvas, com ciclo de tempo, clima, inventário, crafting, narrativa e controles de toque.',
      en: 'Browser 2D game in plain JavaScript and Canvas, with a day cycle, weather, inventory, crafting, narrative and touch controls.',
    },
  },
  {
    title: 'Dashboard Smart Cities',
    repo: repo('Dashboard-Smart-Cities-'),
    languages: ['C#'],
    stack: ['WinForms', '.NET', 'MySQL'],
    description: {
      pt: 'Painel desktop para acompanhar o consumo de energia de uma casa inteligente, com visão por cômodo, metas e ranking.',
      en: 'Desktop panel that tracks energy use in a smart home, with per-room views, goals and a ranking.',
    },
  },
  {
    title: 'API Node',
    repo: repo('api-node'),
    languages: ['JavaScript'],
    stack: ['Express 5', 'MySQL'],
    description: {
      pt: 'API REST de usuários em Express e MySQL, separada em rotas, controllers e services.',
      en: 'User REST API in Express and MySQL, split into routes, controllers and services.',
    },
  },
  {
    title: 'ChekPoint',
    repo: repo('ChekPoint'),
    languages: ['C#'],
    stack: ['WinForms', '.NET'],
    description: {
      pt: 'Registro de ponto em WinForms. Cada entrada e saída é gravada com data e hora em arquivos mensais.',
      en: 'WinForms time clock. Every clock-in and clock-out is saved with date and time to monthly files.',
    },
  },
]

export const studies = [
  { title: 'Object-Oriented Programming', repo: repo('Object-Oriented-Programming'), language: 'C#' },
  { title: 'Structure of Algorithms', repo: repo('Structure-of-Algorithms'), language: 'C#' },
  { title: 'Desenvolvimento Web Full Stack', repo: repo('Desenvolvimento-Web-Fullstack'), language: 'HTML' },
  { title: 'Programming exercises', repo: repo('Programming-exercise-codes'), language: 'Java' },
]

export const content = {
  pt: {
    nav: { experience: 'Experiência', projects: 'Projetos', stack: 'Stack', contact: 'Contato', switchTo: 'EN', switchLabel: 'Switch to English' },
    hero: {
      eyebrow: 'Disponível para oportunidades',
      headline: 'Backend em C# e .NET para serviços públicos.',
      sub: 'Sou Nelson Reis, dev backend na PRODAM. Construo APIs e sistemas que mantêm a rede de saúde de São Paulo funcionando.',
      primary: 'Ver projetos',
      secondary: 'Contato',
      photoAlt: 'Nelson Reis na FECAP',
    },
    experience: {
      title: 'Onde eu trabalho e estudo',
      items: [
        {
          org: 'PRODAM',
          role: 'Desenvolvedor Backend',
          period: 'Atual',
          text: 'Mantenho o sistema de estoque da rede de saúde da Prefeitura de São Paulo: consultas em T-SQL, APIs em C# e manutenção de aplicações ASP.NET legadas.',
          tags: ['C#', 'ASP.NET', 'SQL Server', 'Azure'],
        },
        {
          org: 'FECAP',
          role: 'Análise e Desenvolvimento de Sistemas',
          period: 'Em curso',
          text: 'Programação orientada a objetos, estruturas de dados, desenvolvimento web full stack e projetos integradores em equipe.',
          tags: ['C#', 'Java', 'Web'],
        },
        {
          org: 'Maratona de Programação SBC',
          role: 'Competidor pela FECAP',
          period: 'Competição',
          text: 'Resolução de problemas de algoritmos em equipe, com tempo contado.',
          tags: ['Algoritmos', 'Java'],
        },
      ],
    },
    projects: {
      title: 'Projetos',
      intro: 'O que está público no meu GitHub, do mais completo ao mais simples.',
      repo: 'Código',
      live: 'Ver online',
      studiesTitle: 'Repositórios de estudo',
      all: 'Todos os repositórios',
    },
    stack: {
      title: 'Ferramentas que uso',
      groups: [
        { name: 'Backend', items: ['C#', '.NET', 'ASP.NET', 'Entity Framework', 'LINQ', 'NestJS', 'Node.js', 'Express'] },
        { name: 'Dados', items: ['SQL Server', 'T-SQL', 'PostgreSQL', 'MySQL', 'TypeORM'] },
        { name: 'Front e mobile', items: ['TypeScript', 'React', 'Next.js', 'Tailwind', 'Android'] },
        { name: 'Infra', items: ['Azure', 'Docker', 'Firebase', 'Git'] },
      ],
      languagesLabel: 'Idiomas',
      languages: 'Português nativo, inglês B2',
    },
    contact: {
      title: 'Vamos conversar.',
      sub: 'Estou aberto a vagas de backend e projetos com C#, .NET ou Node. Respondo por email ou LinkedIn.',
      copy: 'Copiar email',
      copied: 'Email copiado',
      resume: 'Baixar currículo',
      phone: 'Telefone',
    },
    footer: { built: 'Feito com Next.js e Tailwind.' },
  },

  en: {
    nav: { experience: 'Experience', projects: 'Projects', stack: 'Stack', contact: 'Contact', switchTo: 'PT', switchLabel: 'Mudar para português' },
    hero: {
      eyebrow: 'Open to opportunities',
      headline: 'C# and .NET backend for public services.',
      sub: "I'm Nelson Reis, backend developer at PRODAM. I build the APIs and systems that keep São Paulo's health network running.",
      primary: 'View projects',
      secondary: 'Contact',
      photoAlt: 'Nelson Reis at FECAP',
    },
    experience: {
      title: 'Where I work and study',
      items: [
        {
          org: 'PRODAM',
          role: 'Backend Developer',
          period: 'Current',
          text: "I maintain the health network inventory system for São Paulo City Hall: T-SQL queries, C# APIs and upkeep of legacy ASP.NET applications.",
          tags: ['C#', 'ASP.NET', 'SQL Server', 'Azure'],
        },
        {
          org: 'FECAP',
          role: 'Systems Analysis and Development',
          period: 'In progress',
          text: 'Object-oriented programming, data structures, full stack web development and team capstone projects.',
          tags: ['C#', 'Java', 'Web'],
        },
        {
          org: 'SBC Programming Marathon',
          role: 'Competitor for FECAP',
          period: 'Competition',
          text: 'Solving algorithm problems as a team, against the clock.',
          tags: ['Algorithms', 'Java'],
        },
      ],
    },
    projects: {
      title: 'Projects',
      intro: "What's public on my GitHub, from the most complete to the simplest.",
      repo: 'Code',
      live: 'Live site',
      studiesTitle: 'Study repositories',
      all: 'All repositories',
    },
    stack: {
      title: 'Tools I use',
      groups: [
        { name: 'Backend', items: ['C#', '.NET', 'ASP.NET', 'Entity Framework', 'LINQ', 'NestJS', 'Node.js', 'Express'] },
        { name: 'Data', items: ['SQL Server', 'T-SQL', 'PostgreSQL', 'MySQL', 'TypeORM'] },
        { name: 'Front end and mobile', items: ['TypeScript', 'React', 'Next.js', 'Tailwind', 'Android'] },
        { name: 'Infra', items: ['Azure', 'Docker', 'Firebase', 'Git'] },
      ],
      languagesLabel: 'Languages',
      languages: 'Portuguese (native), English B2',
    },
    contact: {
      title: "Let's talk.",
      sub: "I'm open to backend roles and projects with C#, .NET or Node. Reach me by email or LinkedIn.",
      copy: 'Copy email',
      copied: 'Email copied',
      resume: 'Download resume',
      phone: 'Phone',
    },
    footer: { built: 'Built with Next.js and Tailwind.' },
  },
}
