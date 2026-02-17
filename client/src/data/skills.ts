export interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string;
}

export const skills: Skill[] = [
  // Frontend
  { id: 1, name: 'React', category: 'Frontend', icon: 'icon-react' },
  { id: 2, name: 'TypeScript', category: 'Frontend', icon: 'icon-typescript' },
  { id: 3, name: 'JavaScript', category: 'Frontend', icon: 'icon-javascript' },
  { id: 4, name: 'Next.js', category: 'Frontend', icon: 'icon-nextjs' },
  { id: 5, name: 'HTML5', category: 'Frontend', icon: 'icon-html5' },
  { id: 6, name: 'CSS3', category: 'Frontend', icon: 'icon-css3' },
  { id: 7, name: 'Tailwind CSS', category: 'Frontend', icon: 'icon-tailwind-css' },
  { id: 8, name: 'Responsive Design', category: 'Frontend', icon: 'icon-responsive' },
  { id: 9, name: 'UI/UX Design', category: 'Frontend', icon: 'icon-design' },

  // Backend
  { id: 10, name: 'Node.js', category: 'Backend', icon: 'icon-nodejs' },
  { id: 11, name: 'Express.js', category: 'Backend', icon: 'icon-express' },
  { id: 12, name: 'MongoDB', category: 'Backend', icon: 'icon-mongodb' },
  { id: 13, name: 'PostgreSQL', category: 'Backend', icon: 'icon-postgresql' },
  { id: 14, name: 'REST APIs', category: 'Backend', icon: 'icon-api' },
  { id: 15, name: 'Firebase', category: 'Backend', icon: 'icon-firebase' },

  // Web3
  { id: 16, name: 'Solidity', category: 'Web3', icon: 'icon-solidity' },
  { id: 17, name: 'Foundry', category: 'Web3', icon: 'icon-foundry' },
  { id: 18, name: 'wagmi', category: 'Web3', icon: 'icon-wagmi' },
  { id: 19, name: 'viem', category: 'Web3', icon: 'icon-viem' },
  { id: 20, name: 'ethers.js', category: 'Web3', icon: 'icon-ethers' },
  { id: 21, name: 'EVM / Ethereum', category: 'Web3', icon: 'icon-ethereum' },
  { id: 22, name: 'Hardhat', category: 'Web3', icon: 'icon-hardhat' },
  { id: 23, name: 'RainbowKit', category: 'Web3', icon: 'icon-rainbow' },
  { id: 24, name: 'OpenZeppelin', category: 'Web3', icon: 'icon-openzeppelin' },

  // Tools
  { id: 25, name: 'Git/GitHub', category: 'Tools', icon: 'icon-git' },
  { id: 26, name: 'Docker', category: 'Tools', icon: 'icon-docker' },
  { id: 27, name: 'Vercel', category: 'Tools', icon: 'icon-vercel' },
  { id: 28, name: 'Figma', category: 'Tools', icon: 'icon-figma' },
  { id: 29, name: 'Jest', category: 'Tools', icon: 'icon-jest' }
];