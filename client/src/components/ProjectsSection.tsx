import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Zap, Users, Brain } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Technology {
  name: string;
}

interface Project {
  title: string;
  description: string;
  image?: string;
  technologies?: Technology[];
  tech?: string[];
  link?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  isLoading: boolean;
}

const ProjectsSection = ({ projects, isLoading }: ProjectsSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  // Normalize projects to ensure they have the correct format
  const normalizedProjects = projects.map(project => {
    const technologies = project.technologies ||
      (project.tech ? project.tech.map(name => ({ name })) : []);

    return {
      ...project,
      technologies,
      image: project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNvZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    };
  });

  // Project-specific themes
  const projectThemes = [
    {
      title: "Trustless Academy",
      gradient: "from-primary/20 to-accent/20",
      borderColor: "border-primary/30",
      glowColor: "rgba(0, 255, 214, 0.3)",
      icon: Zap,
      tagline: "Web3 Education Platform"
    },
    {
      title: "Welp Network",
      gradient: "from-secondary/20 to-primary/20",
      borderColor: "border-secondary/30",
      glowColor: "rgba(142, 68, 255, 0.3)",
      icon: Users,
      tagline: "Community Network Hub"
    },
    {
      title: "ReWork",
      gradient: "from-accent/20 to-secondary/20",
      borderColor: "border-accent/30",
      glowColor: "rgba(0, 255, 125, 0.3)",
      icon: Brain,
      tagline: "AI-Powered Solutions"
    }
  ];

  const getProjectTheme = (projectTitle: string) => {
    return projectThemes.find(theme => theme.title === projectTitle) || projectThemes[0];
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="projects"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="font-mono text-primary text-sm mb-2">&lt;section id="projects"&gt;</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Building the future of Web3, one project at a time. Each represents a unique solution to real-world challenges.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array(3).fill(0).map((_, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <div className="glass rounded-xl overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Enhanced project cards with unique identities
            normalizedProjects.map((project, index) => {
              const theme = getProjectTheme(project.title);
              const Icon = theme.icon;

              return (
                <div
                  key={index}
                  className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                  <a
                    href={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <div
                      className={`relative h-full glass rounded-xl overflow-hidden border ${theme.borderColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
                      style={{
                        boxShadow: `0 0 30px ${theme.glowColor}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 50px ${theme.glowColor}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 30px ${theme.glowColor}`;
                      }}
                    >
                      {/* Project image with gradient overlay */}
                      <div className="relative h-48 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} z-10 opacity-60`} />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          width="1200"
                          height="675"
                        />

                        {/* Project icon overlay */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className="p-2 glass rounded-lg">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>

                        {/* External link indicator */}
                        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="p-6 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                          </div>
                          <p className="text-xs font-mono text-primary mb-3">{theme.tagline}</p>
                          <p className="text-muted-foreground text-sm line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 text-xs font-mono rounded-md bg-background/50 text-primary border border-primary/20 hover:border-primary/50 transition-colors"
                            >
                              {tech.name}
                            </span>
                          ))}
                          {project.technologies && project.technologies.length > 4 && (
                            <span className="px-2 py-1 text-xs font-mono rounded-md bg-background/50 text-muted-foreground">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })
          )}
        </div>

        {/* View all projects button */}
        <div className={`mt-16 text-center transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Button
            className="enhanced-button px-8 py-4 h-auto bg-primary text-primary-foreground font-mono rounded-lg hover:bg-opacity-90 transition-all relative"
            asChild
          >
            <a href="https://github.com/jakejohndoe" target="_blank" rel="noopener noreferrer">
              <span className="relative z-10">Explore All Projects →</span>
            </a>
          </Button>
        </div>

        <div className={`font-mono text-primary text-sm mt-12 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          &lt;/section&gt;
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;