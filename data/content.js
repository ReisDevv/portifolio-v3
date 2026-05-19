export const content = {
  pt: {
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
      skills: 'Habilidades',
      contact: 'Contato',
      langLabel: 'EN 🇺🇸',
    },
    hero: {
      eyebrow: 'Backend Developer @ PRODAM',
      title: 'Nelson Reis',
      subtitle: 'Desenvolvedor BackEnd',
      cta: 'Sobre Mim',
      scrollHint: 'Role para baixo',
    },
    about: {
      title: 'Sobre mim',
      headline: 'Eu construo os motores por trás dos produtos digitais.',
      paragraphs: [
        'Sou desenvolvedor backend em estágio na PRODAM, onde cuido do sistema de estoque de saúde da Prefeitura de São Paulo — fazendo consultas em banco de dados, modernizando APIs e mantendo sistemas legados em ASP.NET. Participo de weekly meetings com o time e entrego mudanças que impactam diretamente a gestão de saúde pública.',
        'Trabalho com C# e SQL Server no dia a dia, aplicando Clean Architecture e Entity Framework para construir sistemas robustos e escaláveis. Tenho experiência com Azure no ambiente corporativo e colaboro com squads multidisciplinares.',
        'Estudo Análise e Desenvolvimento de Sistemas na FECAP, represento a faculdade nas maratonas de programação da SBC e tenho nível B2 de inglês. Acredito que backend sólido é a base de qualquer produto digital que funciona de verdade.',
      ],
      stats: [
        { value: '2+', label: 'anos de experiência' },
        { value: 'PRODAM', label: 'empresa atual' },
        { value: '8+', label: 'projetos' },
        { value: 'B2', label: 'nível de inglês' },
      ],
    },
    projects: {
      title: 'Projetos',
      eyebrow: 'TRABALHOS',
      viewRepo: 'Ver no GitHub',
      items: [
        {
          title: 'Dashboard Smart Cities',
          description: 'Dashboard desktop para controle de energia de casas inteligentes, desenvolvido no 1º semestre com C# e WinForms. Exibe consumo em tempo real e alertas por cômodo.',
          language: 'C#',
          url: 'https://github.com/ReisDevv/Dashboard-Smart-Cities-',
        },
        {
          title: 'ChekPoint',
          description: 'Sistema de controle de ponto com C# seguindo boas práticas de desenvolvimento — separação em camadas, validações e persistência de dados.',
          language: 'C#',
          url: 'https://github.com/ReisDevv/ChekPoint',
        },
        {
          title: 'API Node',
          description: 'API RESTful construída com Node.js para praticar desenvolvimento backend com JavaScript — autenticação, rotas e integração com banco.',
          language: 'JavaScript',
          url: 'https://github.com/ReisDevv/api-node',
        },
        {
          title: 'Projeto Integrador',
          description: 'Projeto interdisciplinar do 3º semestre incluindo site para ONG — integrando front-end, back-end e banco de dados para uma causa social real.',
          language: null,
          url: 'https://github.com/ReisDevv/PROJETO-PI-3SEM',
        },
        {
          title: 'Dev Web Fullstack',
          description: 'Aplicação web fullstack da faculdade, cobrindo front e backend. Foco em boas práticas de HTML, CSS e integração com servidor.',
          language: 'HTML',
          url: 'https://github.com/ReisDevv/Desenvolvimento-Web-Fullstack',
        },
        {
          title: 'Estrutura de Algoritmos',
          description: 'Exercícios e desafios de estruturas de dados e algoritmos em C# — listas, pilhas, filas, árvores e problemas de complexidade, base para a maratona SBC.',
          language: 'C#',
          url: 'https://github.com/ReisDevv/Structure-of-Algorithms',
        },
      ],
    },
    skills: {
      title: 'Habilidades',
      eyebrow: 'TECNOLOGIAS',
      hardSkills: {
        label: 'Hard skills',
        items: [
          {
            name: 'C#',
            description: 'Linguagem principal que uso na PRODAM. Aprendi aplicando no trabalho real, construindo APIs e sistemas que atendem a rede de saúde da Prefeitura de São Paulo.',
          },
          {
            name: 'ASP.NET / Legacy ASP',
            description: 'Trabalho diretamente com sistemas legados em ASP.NET na PRODAM — realizando manutenção, correção de bugs e modernização de aplicações críticas do governo.',
          },
          {
            name: 'SQL Server',
            description: 'Banco principal que uso na PRODAM para consultas complexas no sistema de estoque de saúde do governo de SP. Domínio de T-SQL, stored procedures e otimização de queries.',
          },
          {
            name: 'Java',
            description: 'Aprendi Java nos estudos e aplico na maratona de programação da SBC, onde resolvo desafios algorítmicos complexos. Sólida compreensão de OOP e estruturas de dados.',
          },
          {
            name: 'Azure',
            description: 'Uso Azure no ambiente de trabalho na PRODAM para serviços de cloud, gestão de recursos e integração de sistemas da infraestrutura corporativa.',
          },
          {
            name: 'Web API REST',
            description: 'Desenvolvo APIs seguindo boas práticas RESTful — design, versionamento e documentação. Aprendi integrando sistemas legados e novos no ambiente corporativo.',
          },
          {
            name: 'Entity Framework',
            description: 'ORM que uso para modelar e manipular dados relacionais em C#, aplicando junto com Clean Architecture para manter separação entre domínio e infraestrutura.',
          },
          {
            name: 'WinForms',
            description: 'Utilizei WinForms para criar um dashboard desktop de controle de energia para casas inteligentes — meu primeiro projeto real de interface em C#.',
          },
          {
            name: 'Clean Architecture',
            description: 'Padrão que busco aplicar em todos os projetos para separar responsabilidades, facilitar testes e tornar o código mais sustentável a longo prazo.',
          },
          {
            name: 'LINQ',
            description: 'Uso LINQ para simplificar operações sobre coleções e consultas em C#, tornando o código mais legível e eficiente nas rotinas do dia a dia na PRODAM.',
          },
          {
            name: 'JavaScript / TypeScript',
            description: 'Desenvolvo projetos fullstack com JS e TS — incluindo APIs com Node.js e interfaces com React e Next.js, aplicando tipagem para melhorar a manutenibilidade.',
          },
          {
            name: 'Docker',
            description: 'Uso containers para padronizar ambientes de desenvolvimento e facilitar o deploy de aplicações, garantindo consistência entre local e produção.',
          },
          {
            name: 'MySQL / PostgreSQL',
            description: 'Bancos relacionais que uso em projetos acadêmicos e pessoais. Aprendi nos semestres da faculdade e aprofundei modelando dados em projetos integradores.',
          },
          {
            name: 'Git',
            description: 'Ferramenta de controle de versão que uso diariamente para colaborar em equipe, manter histórico do código e gerenciar branches em projetos reais.',
          },
        ],
      },
      softSkills: {
        label: 'Soft skills',
        items: [
          {
            name: 'Trabalho em equipe',
            description: 'Desenvolvida atuando em projetos colaborativos na PRODAM com weekly meetings, onde comunicação e coordenação com outros times é essencial para entregar valor.',
          },
          {
            name: 'Inglês B2',
            description: 'Nível certificado por teste na faculdade. Consigo ler documentações técnicas, participar de reuniões em inglês e me comunicar com equipes internacionais.',
          },
          {
            name: 'Resolução de problemas',
            description: 'Treinada nas maratonas de programação da SBC e no dia a dia — diagnosticar sistemas legados, otimizar queries e entregar soluções sob pressão de tempo.',
          },
        ],
      },
    },
    contact: {
      eyebrow: 'CONTATO',
      headline: 'Vamos construir algo.',
      title: 'Me contate!',
      downloadCta: 'Baixar Currículo',
      items: [
        { icon: 'linkedin', label: 'LinkedIn', value: '/nelsonreisgomes', url: 'https://www.linkedin.com/in/nelsonreisgomes/' },
        { icon: 'email', label: 'Email', value: 'nelsondosreisgomessouza@gmail.com', url: 'mailto:nelsondosreisgomessouza@gmail.com' },
        { icon: 'phone', label: 'Telefone', value: '+55 11 98551-6950', url: 'tel:+5511985516950' },
      ],
    },
    footer: {
      role: 'Backend Developer',
      nav: {
        about: 'Sobre',
        projects: 'Projetos',
        skills: 'Habilidades',
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
    },
  },

  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      langLabel: 'PT 🇧🇷',
    },
    hero: {
      eyebrow: 'Backend Developer @ PRODAM',
      title: 'Nelson Reis',
      subtitle: 'Backend Developer',
      cta: 'About me',
      scrollHint: 'Scroll down',
    },
    about: {
      title: 'About me',
      headline: 'I build the engines behind digital products.',
      paragraphs: [
        "I'm a backend developer interning at PRODAM, where I maintain the health inventory system for the São Paulo City Hall — writing database queries, modernizing APIs, and maintaining legacy ASP.NET applications. I join weekly team meetings and ship changes that directly impact public health management.",
        'Day to day I work with C# and SQL Server, applying Clean Architecture and Entity Framework to build robust, scalable systems. I also have hands-on experience with Azure in a corporate setting and collaborate with multidisciplinary squads.',
        'I study Systems Analysis and Development at FECAP, compete in SBC programming marathons, and hold a B2 English level. I believe solid backend engineering is the foundation of any digital product that truly works.',
      ],
      stats: [
        { value: '2+', label: 'years of experience' },
        { value: 'PRODAM', label: 'current company' },
        { value: '8+', label: 'projects' },
        { value: 'B2', label: 'english level' },
      ],
    },
    projects: {
      title: 'Projects',
      eyebrow: 'WORK',
      viewRepo: 'View on GitHub',
      items: [
        {
          title: 'Dashboard Smart Cities',
          description: 'Desktop dashboard for smart home energy control, built in the 1st semester with C# and WinForms. Displays real-time consumption and room-level alerts.',
          language: 'C#',
          url: 'https://github.com/ReisDevv/Dashboard-Smart-Cities-',
        },
        {
          title: 'ChekPoint',
          description: 'Time tracking system built with C# following best practices — layered separation, input validation, and data persistence.',
          language: 'C#',
          url: 'https://github.com/ReisDevv/ChekPoint',
        },
        {
          title: 'API Node',
          description: 'RESTful API built with Node.js to practice backend development — authentication, routing, and database integration.',
          language: 'JavaScript',
          url: 'https://github.com/ReisDevv/api-node',
        },
        {
          title: 'Integrative Project',
          description: "3rd semester interdisciplinary project including a website for an NGO — integrating front-end, back-end and a database for a real social cause.",
          language: null,
          url: 'https://github.com/ReisDevv/PROJETO-PI-3SEM',
        },
        {
          title: 'Fullstack Web Dev',
          description: 'Fullstack web application from university, covering front and backend with a focus on HTML, CSS best practices and server integration.',
          language: 'HTML',
          url: 'https://github.com/ReisDevv/Desenvolvimento-Web-Fullstack',
        },
        {
          title: 'Algorithm Structures',
          description: 'Data structures and algorithm exercises in C# — lists, stacks, queues, trees and complexity problems. Foundation for the SBC programming marathon.',
          language: 'C#',
          url: 'https://github.com/ReisDevv/Structure-of-Algorithms',
        },
      ],
    },
    skills: {
      title: 'Skills',
      eyebrow: 'TECHNOLOGIES',
      hardSkills: {
        label: 'Hard skills',
        items: [
          {
            name: 'C#',
            description: 'My primary language at PRODAM. Learned by doing real work — building APIs and systems that serve the São Paulo City Hall health network.',
          },
          {
            name: 'ASP.NET / Legacy ASP',
            description: 'I work directly with legacy ASP.NET systems at PRODAM — performing maintenance, bug fixes and modernization of critical government applications.',
          },
          {
            name: 'SQL Server',
            description: "Primary database at PRODAM. I write complex queries for the São Paulo government's health inventory system — T-SQL, stored procedures, and query optimization.",
          },
          {
            name: 'Java',
            description: 'Studied Java and apply it in the SBC programming marathon, solving complex algorithmic challenges. Solid understanding of OOP and data structures.',
          },
          {
            name: 'Azure',
            description: "I use Azure at PRODAM for cloud services, resource management, and integration of the corporation's infrastructure.",
          },
          {
            name: 'Web API REST',
            description: 'I build APIs following RESTful best practices — design, versioning, and documentation — learned through integrating legacy and modern systems in a corporate environment.',
          },
          {
            name: 'Entity Framework',
            description: 'ORM I use to model and manipulate relational data in C#, applied alongside Clean Architecture to keep domain and infrastructure separate.',
          },
          {
            name: 'WinForms',
            description: 'Used WinForms to build a desktop dashboard for smart home energy control — my first real C# desktop application with a full UI.',
          },
          {
            name: 'Clean Architecture',
            description: 'A pattern I apply across projects to separate responsibilities, make testing easier, and keep code maintainable over time.',
          },
          {
            name: 'LINQ',
            description: 'I use LINQ to simplify operations on collections and queries in C#, making everyday code at PRODAM more readable and efficient.',
          },
          {
            name: 'JavaScript / TypeScript',
            description: 'I build fullstack projects with JS and TS — Node.js APIs and React/Next.js interfaces — using TypeScript for better type safety and maintainability.',
          },
          {
            name: 'Docker',
            description: 'I use containers to standardize development environments and streamline application deployments, ensuring consistency from local to production.',
          },
          {
            name: 'MySQL / PostgreSQL',
            description: 'Relational databases used in academic and personal projects. Deepened my knowledge modeling data in integrative semester projects.',
          },
          {
            name: 'Git',
            description: 'Version control tool I use daily to collaborate with teams, maintain code history, and manage branches across real-world projects.',
          },
        ],
      },
      softSkills: {
        label: 'Soft skills',
        items: [
          {
            name: 'Teamwork',
            description: 'Developed through collaborative work at PRODAM with weekly meetings, where communication and coordination across teams is essential to deliver value.',
          },
          {
            name: 'English B2',
            description: 'Certified level by a university placement test. I can read technical documentation, join meetings in English, and communicate with international teams.',
          },
          {
            name: 'Problem Solving',
            description: 'Sharpened in SBC programming marathons and daily work — diagnosing legacy systems, optimizing queries, and shipping solutions under time pressure.',
          },
        ],
      },
    },
    contact: {
      eyebrow: 'CONTACT',
      headline: "Let's build something.",
      title: 'Get in touch!',
      downloadCta: 'Download Resume',
      items: [
        { icon: 'linkedin', label: 'LinkedIn', value: '/nelsonreisgomes', url: 'https://www.linkedin.com/in/nelsonreisgomes/' },
        { icon: 'email', label: 'Email', value: 'nelsondosreisgomessouza@gmail.com', url: 'mailto:nelsondosreisgomessouza@gmail.com' },
        { icon: 'phone', label: 'Phone', value: '+55 11 98551-6950', url: 'tel:+5511985516950' },
      ],
    },
    footer: {
      role: 'Backend Developer',
      nav: {
        about: 'About',
        projects: 'Projects',
        skills: 'Skills',
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
    },
  },
}
