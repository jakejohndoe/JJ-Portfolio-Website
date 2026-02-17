import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaPython,
  FaDocker,
  FaAws,
  FaLink,
  FaShieldAlt,
  FaPaintBrush,
  FaPlug
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
  SiNextdotjs,
  SiRedux,
  SiGraphql,
  SiPostgresql,
  SiRedis,
  SiSolidity,
  SiEthereum,
  SiWeb3Dotjs,
  SiIpfs,
  SiFirebase,
  SiFigma,
  SiVercel,
  SiJest,
  SiExpress
} from "react-icons/si";
import { GiAnvil, GiMiningHelmet } from "react-icons/gi";
import { MdDevices, MdDesignServices } from "react-icons/md";
import { IoRainy } from "react-icons/io5";
import { VscTerminal } from "react-icons/vsc";

interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string;
}

interface SkillsSectionProps {
  skills: Skill[];
  isLoading: boolean;
}

const SkillsSection = ({ skills, isLoading }: SkillsSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Map icon strings to React components
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'icon-react': <FaReact size={18} />,
      'icon-typescript': <SiTypescript size={18} />,
      'icon-javascript': <FaJs size={18} />,
      'icon-js': <FaJs size={18} />,
      'icon-mongodb': <SiMongodb size={18} />,
      'icon-tailwind-css': <SiTailwindcss size={18} />,
      'icon-html5': <FaHtml5 size={18} />,
      'icon-html': <FaHtml5 size={18} />,
      'icon-css3': <FaCss3Alt size={18} />,
      'icon-css3-alt': <FaCss3Alt size={18} />,
      'icon-css': <FaCss3Alt size={18} />,
      'icon-git': <FaGitAlt size={18} />,
      'icon-git-alt': <FaGitAlt size={18} />,
      'icon-github': <FaGithub size={18} />,
      'icon-nodejs': <FaNodeJs size={18} />,
      'icon-node-js': <FaNodeJs size={18} />,
      'icon-nextjs': <SiNextdotjs size={18} />,
      'icon-redux': <SiRedux size={18} />,
      'icon-graphql': <SiGraphql size={18} />,
      'icon-postgresql': <SiPostgresql size={18} />,
      'icon-redis': <SiRedis size={18} />,
      'icon-python': <FaPython size={18} />,
      'icon-docker': <FaDocker size={18} />,
      'icon-aws': <FaAws size={18} />,
      'icon-solidity': <SiSolidity size={18} />,
      'icon-ethereum': <SiEthereum size={18} />,
      'icon-web3': <SiWeb3Dotjs size={18} />,
      'icon-ipfs': <SiIpfs size={18} />,
      // New icon mappings
      'icon-foundry': <GiAnvil size={18} />,
      'icon-wagmi': <FaLink size={18} />,
      'icon-firebase': <SiFirebase size={18} />,
      'icon-hardhat': <GiMiningHelmet size={18} />,
      'icon-figma': <SiFigma size={18} />,
      'icon-vercel': <SiVercel size={18} />,
      'icon-jest': <SiJest size={18} />,
      'icon-api': <FaPlug size={18} />,
      'icon-responsive': <MdDevices size={18} />,
      'icon-design': <MdDesignServices size={18} />,
      'icon-viem': <SiEthereum size={18} />,
      'icon-ethers': <SiEthereum size={18} />,
      'icon-rainbow': <IoRainy size={18} />,
      'icon-openzeppelin': <FaShieldAlt size={18} />,
      'icon-express': <SiExpress size={18} />
    };

    return iconMap[iconName] || <VscTerminal size={18} />;
  };

  // Category filters
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'web3', name: 'Web3' },
    { id: 'tools', name: 'Tools' }
  ];

  // Group skills by category
  const skillsByCategory = {
    frontend: skills.filter(skill => skill.category.toLowerCase() === 'frontend'),
    backend: skills.filter(skill => skill.category.toLowerCase() === 'backend'),
    web3: skills.filter(skill => skill.category.toLowerCase() === 'web3'),
    tools: skills.filter(skill => skill.category.toLowerCase() === 'tools')
  };

  // Determine which categories to show
  const categoriesToShow = activeCategory === 'all'
    ? ['frontend', 'backend', 'web3', 'tools']
    : [activeCategory];

  const renderSkillPill = (skill: Skill, index: number) => (
    <div
      key={skill.id}
      className={`inline-flex items-center gap-2 px-4 py-2 glass border border-primary/10 rounded-full
        text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-primary/30
        hover:shadow-[0_0_20px_rgba(0,255,214,0.3)] cursor-default whitespace-nowrap
        transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{
        transitionDelay: `${index * 30}ms`
      }}
    >
      <span className="text-muted-foreground">
        {getIconComponent(skill.icon)}
      </span>
      <span className="text-foreground">{skill.name}</span>
    </div>
  );

  const renderCategoryRow = (categoryId: string, categorySkills: Skill[], rowIndex: number) => {
    const categoryName = categories.find(c => c.id === categoryId)?.name || categoryId;

    return (
      <div
        key={categoryId}
        className={`transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
        style={{ transitionDelay: `${rowIndex * 100}ms` }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category Label */}
          <div className="sm:w-32 flex-shrink-0">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
              {categoryName}
            </h3>
          </div>

          {/* Skills Pills Container */}
          <div className="flex-1 relative">
            {/* Fade edges for mobile scroll indication */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none sm:hidden" />

            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 sm:flex-wrap sm:overflow-x-visible">
              {categorySkills.map((skill, index) => renderSkillPill(skill, index))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="skills"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="font-mono text-primary text-sm mb-2">&lt;section id="skills"&gt;</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            From Web3 protocols to cloud infrastructure, here's my tech stack that powers the future.
          </p>
        </div>

        {/* Category filters */}
        <div className={`flex flex-wrap gap-2 mb-12 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'glass hover:bg-primary/10 text-foreground border border-primary/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills rows */}
        <div className="space-y-8">
          {!isLoading && categoriesToShow.map((categoryId, index) => {
            const categorySkills = skillsByCategory[categoryId as keyof typeof skillsByCategory];
            if (categorySkills && categorySkills.length > 0) {
              return renderCategoryRow(categoryId, categorySkills, index);
            }
            return null;
          })}
        </div>

        {/* Additional skills text */}
        <div className={`mt-12 text-center transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-muted-foreground font-mono text-sm">
            ... and always learning new technologies to stay on the cutting edge
          </p>
        </div>

        <div className={`font-mono text-primary text-sm mt-8 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          &lt;/section&gt;
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;