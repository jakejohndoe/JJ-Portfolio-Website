export interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  icon: string;
}

export const skills: Skill[] = [
  // Frontend
  { id: 1, name: 'React', level: 95, category: 'Frontend', icon: 'icon-react' },
  { id: 2, name: 'TypeScript', level: 95, category: 'Frontend', icon: 'icon-typescript' },
  { id: 3, name: 'JavaScript', level: 95, category: 'Frontend', icon: 'icon-javascript' },
  { id: 4, name: 'Next.js', level: 85, category: 'Frontend', icon: 'icon-nextjs' },
  { id: 5, name: 'HTML5', level: 95, category: 'Frontend', icon: 'icon-html5' },
  { id: 6, name: 'CSS3', level: 95, category: 'Frontend', icon: 'icon-css3' },
  { id: 7, name: 'Tailwind CSS', level: 95, category: 'Frontend', icon: 'icon-tailwind-css' },
  { id: 8, name: 'Responsive Design', level: 95, category: 'Frontend', icon: 'icon-responsive' },
  { id: 9, name: 'UI/UX Design', level: 85, category: 'Frontend', icon: 'icon-design' },

  // Backend
  { id: 10, name: 'Node.js', level: 85, category: 'Backend', icon: 'icon-nodejs' },
  { id: 11, name: 'Express.js', level: 85, category: 'Backend', icon: 'icon-express' },
  { id: 12, name: 'MongoDB', level: 85, category: 'Backend', icon: 'icon-mongodb' },
  { id: 13, name: 'PostgreSQL', level: 85, category: 'Backend', icon: 'icon-postgresql' },
  { id: 14, name: 'REST APIs', level: 85, category: 'Backend', icon: 'icon-api' },
  { id: 15, name: 'Firebase', level: 75, category: 'Backend', icon: 'icon-firebase' },

  // Web3
  { id: 16, name: 'Solidity', level: 85, category: 'Web3', icon: 'icon-solidity' },
  { id: 17, name: 'Foundry', level: 85, category: 'Web3', icon: 'icon-foundry' },
  { id: 18, name: 'wagmi', level: 85, category: 'Web3', icon: 'icon-wagmi' },
  { id: 19, name: 'viem', level: 85, category: 'Web3', icon: 'icon-viem' },
  { id: 20, name: 'ethers.js', level: 85, category: 'Web3', icon: 'icon-ethers' },
  { id: 21, name: 'EVM / Ethereum', level: 85, category: 'Web3', icon: 'icon-ethereum' },
  { id: 22, name: 'Hardhat', level: 75, category: 'Web3', icon: 'icon-hardhat' },
  { id: 23, name: 'RainbowKit', level: 85, category: 'Web3', icon: 'icon-rainbow' },
  { id: 24, name: 'OpenZeppelin', level: 85, category: 'Web3', icon: 'icon-openzeppelin' },

  // Tools
  { id: 25, name: 'Git/GitHub', level: 95, category: 'Tools', icon: 'icon-git' },
  { id: 26, name: 'Docker', level: 75, category: 'Tools', icon: 'icon-docker' },
  { id: 27, name: 'Vercel', level: 85, category: 'Tools', icon: 'icon-vercel' },
  { id: 28, name: 'Figma', level: 75, category: 'Tools', icon: 'icon-figma' },
  { id: 29, name: 'Jest', level: 75, category: 'Tools', icon: 'icon-jest' }
];