import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
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
  FaAws
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
  SiIpfs
} from "react-icons/si";

interface Skill {
  id: number;
  name: string;
  level: number;
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
      'icon-react': <FaReact size={32} />,
      'icon-typescript': <SiTypescript size={32} />,
      'icon-javascript': <FaJs size={32} />,
      'icon-js': <FaJs size={32} />,
      'icon-mongodb': <SiMongodb size={32} />,
      'icon-tailwind-css': <SiTailwindcss size={32} />,
      'icon-html5': <FaHtml5 size={32} />,
      'icon-html': <FaHtml5 size={32} />,
      'icon-css3': <FaCss3Alt size={32} />,
      'icon-css3-alt': <FaCss3Alt size={32} />,
      'icon-css': <FaCss3Alt size={32} />,
      'icon-git': <FaGitAlt size={32} />,
      'icon-git-alt': <FaGitAlt size={32} />,
      'icon-github': <FaGithub size={32} />,
      'icon-nodejs': <FaNodeJs size={32} />,
      'icon-node-js': <FaNodeJs size={32} />,
      'icon-nextjs': <SiNextdotjs size={32} />,
      'icon-redux': <SiRedux size={32} />,
      'icon-graphql': <SiGraphql size={32} />,
      'icon-postgresql': <SiPostgresql size={32} />,
      'icon-redis': <SiRedis size={32} />,
      'icon-python': <FaPython size={32} />,
      'icon-docker': <FaDocker size={32} />,
      'icon-aws': <FaAws size={32} />,
      'icon-solidity': <SiSolidity size={32} />,
      'icon-ethereum': <SiEthereum size={32} />,
      'icon-web3': <SiWeb3Dotjs size={32} />,
      'icon-ipfs': <SiIpfs size={32} />
    };

    return iconMap[iconName] || null;
  };

  // Categorize skills
  const categories = [
    { id: 'all', name: 'All', gradient: 'from-primary to-secondary' },
    { id: 'frontend', name: 'Frontend', gradient: 'from-primary to-accent' },
    { id: 'backend', name: 'Backend', gradient: 'from-secondary to-primary' },
    { id: 'web3', name: 'Web3', gradient: 'from-accent to-secondary' },
    { id: 'tools', name: 'Tools', gradient: 'from-primary to-secondary' }
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category.toLowerCase() === activeCategory);

  // Get skill level description
  const getSkillLevel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Proficient';
    if (level >= 40) return 'Intermediate';
    return 'Learning';
  };

  // Get glow color based on skill level
  const getGlowColor = (level: number) => {
    if (level >= 90) return 'rgba(0, 255, 214, 0.5)'; // Cyan for expert
    if (level >= 75) return 'rgba(142, 68, 255, 0.5)'; // Purple for advanced
    if (level >= 60) return 'rgba(0, 255, 125, 0.5)'; // Green for proficient
    return 'rgba(0, 255, 214, 0.3)'; // Dimmer cyan for learning
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
                  : 'glass hover:bg-primary/10 text-foreground'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {isLoading ? (
            // Skeleton loading state
            Array(12).fill(0).map((_, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 delay-${index * 50} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <div className="glass p-4 rounded-xl text-center">
                  <Skeleton className="h-12 w-12 mx-auto mb-3 rounded-lg" />
                  <Skeleton className="h-4 w-16 mx-auto mb-2" />
                  <Skeleton className="h-3 w-12 mx-auto" />
                </div>
              </div>
            ))
          ) : (
            // Display skills with enhanced design
            filteredSkills.map((skill, index) => {
              const level = getSkillLevel(skill.level);
              const glowColor = getGlowColor(skill.level);

              return (
                <div
                  key={skill.id}
                  className={`transform transition-all duration-700 delay-${index * 50} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  <div
                    className="group glass p-4 rounded-xl text-center cursor-pointer transition-all duration-300 hover:scale-105 relative overflow-hidden"
                    style={{
                      boxShadow: `0 0 20px ${glowColor}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 40px ${glowColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${glowColor}`;
                    }}
                  >
                    {/* Skill level indicator */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Icon */}
                    <div className="flex justify-center items-center mb-3 h-12 text-muted-foreground group-hover:text-primary transition-all duration-300">
                      {getIconComponent(skill.icon)}
                    </div>

                    {/* Skill name */}
                    <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                      {skill.name}
                    </h4>

                    {/* Skill level */}
                    <div className="flex items-center justify-center gap-1">
                      <div className="text-xs font-mono text-muted-foreground">
                        {level}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 h-1 bg-background/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
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
    </section>
  );
};

export default SkillsSection;