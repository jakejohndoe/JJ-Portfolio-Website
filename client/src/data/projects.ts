export interface Technology {
  name: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: Technology[];
  image: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Trustless Academy',
    description: 'Interactive Web3 learning platform where blockchain concepts click when you click things. Features hands-on lessons like On-Chain Kitchen and DeFi Garden for learning through experience.',
    technologies: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Web3.js' },
      { name: 'Ethereum' },
      { name: 'Smart Contracts' },
      { name: 'TailwindCSS' }
    ],
    image: 'https://trustless.academy/og-image.png',
    link: 'https://trustless.academy'
  },
  {
    id: 2,
    title: 'Welp Network',
    description: 'Decentralized review platform reimagining how businesses and customers interact through blockchain-verified feedback and reputation systems.',
    technologies: [
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Solidity' },
      { name: 'IPFS' },
      { name: 'GraphQL' },
      { name: 'PostgreSQL' }
    ],
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NzUiIHZpZXdCb3g9IjAgMCAxMjAwIDY3NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwRkZENiIgLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiM4RTQ0RkYiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwRkY3RCIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NzUiIGZpbGw9InVybCgjZ3JhZCkiIG9wYWNpdHk9IjAuMiIvPgo8dGV4dCB4PSI2MDAiIHk9IjM1MCIgZmlsbD0iIzAwRkZENiIgZm9udC1mYW1pbHk9IkpldEJyYWlucyBNb25vLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5XZWxwIE5ldHdvcms8L3RleHQ+Cjx0ZXh0IHg9IjYwMCIgeT0iNDEwIiBmaWxsPSIjOEU0NEZGIiBmb250LWZhbWlseT0iSmV0QnJhaW5zIE1vbm8sIG1vbm9zcGFjZSIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RGVjZW50cmFsaXplZCBSZXZpZXcgUGxhdGZvcm08L3RleHQ+Cjwvc3ZnPg==',
    link: 'https://welp.network'
  },
  {
    id: 3,
    title: 'ReWork Solutions',
    description: 'AI-powered resume optimization SaaS with real-time color customization, structured data collection, and ATS-friendly formatting to help job seekers stand out.',
    technologies: [
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'OpenAI API' },
      { name: 'MongoDB' },
      { name: 'Stripe' },
      { name: 'Material-UI' }
    ],
    image: 'https://rework.solutions/og-image.png',
    link: 'https://rework.solutions'
  }
];

// Additional projects to showcase (can be uncommented if needed)
export const additionalProjects: Project[] = [
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'The website you\'re viewing right now. Built with modern web technologies and a focus on performance, accessibility, and user experience.',
    technologies: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Vite' },
      { name: 'TailwindCSS' },
      { name: 'Framer Motion' },
      { name: 'Vercel' }
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    link: 'https://hellojakejohn.com'
  }
];