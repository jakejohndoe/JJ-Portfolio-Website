import { Skeleton } from "@/components/ui/skeleton";
import useCounter from "@/hooks/useCounter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Code, Server, Palette, Database, Cloud, Zap, ExternalLink } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface Stats {
  completedProjects: number;
  satisfaction: number;
  experience: number;
}

interface ServicesSectionProps {
  services: Service[];
  stats: Stats;
  isLoading: {
    services: boolean;
    stats: boolean;
  };
}

const DEFAULT_STATS: Stats = {
  completedProjects: 3,
  satisfaction: 95,
  experience: 2
};

const ServicesSection = ({
  services = [],
  stats = DEFAULT_STATS,
  isLoading = { services: false, stats: false }
}: ServicesSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const counters = {
    projects: useCounter(stats.completedProjects, 2000),
    satisfaction: useCounter(stats.satisfaction, 2000),
    experience: useCounter(stats.experience, 2000)
  };

  // Map icon strings to Lucide icons
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'fas fa-react': Code,
      'fas fa-shield-alt': Server,
      'fas fa-cloud': Cloud,
      'fas fa-exchange-alt': Server,
      'fas fa-database': Database,
      'fas fa-tachometer-alt': Zap,
      'default': Code
    };
    return iconMap[iconName] || iconMap['default'];
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-background relative overflow-hidden"
      id="services"
    >
      {/* Background effects */}
      <div className="absolute inset-0 gradient-flow opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Services Column */}
          <div className="w-full lg:w-3/5">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="font-mono text-primary text-sm mb-2">&lt;section id="services"&gt;</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                What I <span className="text-gradient">Build</span>
              </h2>
              <p className="text-muted-foreground mb-12 max-w-2xl">
                Turning complex problems into elegant solutions with modern tech stacks.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {isLoading.services ? (
                Array(6).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                  >
                    <div className="glass p-6 rounded-xl">
                      <div className="flex items-start gap-4">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                services.map((service, index) => {
                  const Icon = getIconComponent(service.icon);
                  return (
                    <div
                      key={index}
                      className={`transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                    >
                      <div
                        className="group glass p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 214, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '';
                        }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* About Me Column */}
          <div className="w-full lg:w-2/5">
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <AboutSection
                isLoading={isLoading.stats}
                counters={counters}
                isVisible={isVisible}
              />
            </div>
          </div>
        </div>

        <div className={`font-mono text-primary text-sm mt-12 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          &lt;/section&gt;
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({
  isLoading,
  counters,
  isVisible
}: {
  isLoading: boolean;
  counters: { projects: number; satisfaction: number; experience: number };
  isVisible: boolean;
}) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-3xl font-bold text-foreground mb-4">About Me</h2>
      <p className="text-muted-foreground">
        As a full-stack developer, I bridge my past in high-stakes problem-solving (from kitchens to film sets)
        with crafting scalable systems. Metana Bootcamp showed me how code turns discipline into tools people use —
        whether it's designing APIs or pixel-perfect UIs, that end-to-end impact is what drives me.
      </p>
    </div>

    <StatsGrid isLoading={isLoading} counters={counters} isVisible={isVisible} />

    {/* Education & Certifications Section */}
    <div className="space-y-4">
      <div className="glass p-4 rounded-xl border-l-4 border-primary">
        <h3 className="text-lg font-semibold text-foreground">Education</h3>
        <div className="space-y-3 mt-2">
          <div>
            <p className="text-muted-foreground">
              <span className="text-primary">Metana Fullstack Development Bootcamp</span>
            </p>
            <p className="text-sm text-muted-foreground/80">
              2024 - 2025 • Modern web development and software engineering principles
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">
              <span className="text-secondary">Metana Solidity Development Bootcamp</span>
            </p>
            <p className="text-sm text-muted-foreground/80">
              2025 - 2026 • Smart contract development and Web3 technologies
            </p>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="glass p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-foreground mb-3">Certifications</h3>
        <div className="space-y-3">
          <a
            href="https://www.freecodecamp.org/certification/jakejohndoe/javascript-algorithms-and-data-structures-v8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group hover:bg-primary/5 p-2 -m-2 rounded-lg transition-all"
          >
            <div className="mt-1 p-1 bg-primary/10 rounded group-hover:bg-primary/20 transition-colors">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="text-foreground font-medium group-hover:text-primary transition-colors">
                JavaScript Algorithms and Data Structures
                <ExternalLink className="inline-block w-3 h-3 ml-2 opacity-70" />
              </h4>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>freeCodeCamp</span>
                <span className="mx-2">•</span>
                <span>Jan 2025</span>
              </div>
            </div>
          </a>
          <a
            href="https://www.freecodecamp.org/certification/jakejohndoe/responsive-web-design"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group hover:bg-primary/5 p-2 -m-2 rounded-lg transition-all"
          >
            <div className="mt-1 p-1 bg-primary/10 rounded group-hover:bg-primary/20 transition-colors">
              <Palette className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="text-foreground font-medium group-hover:text-primary transition-colors">
                Responsive Web Design
                <ExternalLink className="inline-block w-3 h-3 ml-2 opacity-70" />
              </h4>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span>freeCodeCamp</span>
                <span className="mx-2">•</span>
                <span>Dec 2024</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    {/* Mission Statement */}
    <div className="glass p-4 rounded-xl">
      <h3 className="text-xl font-semibold text-foreground mb-3">From Kitchens to Keyboards</h3>
      <p className="text-muted-foreground leading-relaxed">
        For 7+ years, I thrived in high-pressure environments as a Chef and Kitchen Manager —
        designing systems, leading teams, and turning chaos into seamless experiences.
        Later, I brought that same problem-solving mindset to the film industry, where I
        coordinated technical crews and negotiated equipment rentals, ensuring the right tools
        matched creative vision.
        <br /><br />
        These experiences taught me that great work — whether a dish, a film set, or an app —
        balances creativity with execution. Now, I build software with the same principles:{' '}
        <span className="italic text-primary">scalable, human-centered, and crafted to last</span>.
      </p>
    </div>
  </div>
);

const StatsGrid = ({
  isLoading,
  counters,
  isVisible
}: {
  isLoading: boolean;
  counters: { projects: number; satisfaction: number; experience: number };
  isVisible: boolean;
}) => (
  <div className="grid grid-cols-2 gap-6">
    {isLoading ? (
      Array(2).fill(0).map((_, index) => (
        <div key={index} className="glass p-4 rounded-xl text-center">
          <Skeleton className="h-8 w-16 mx-auto mb-2" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))
    ) : (
      <>
        <StatItem
          value={counters.projects}
          suffix=""
          label="Live Projects"
          isVisible={isVisible}
          delay={0}
        />
        <StatItem
          value={counters.experience}
          suffix="+"
          label="Years of Experience"
          isVisible={isVisible}
          delay={100}
        />
      </>
    )}
  </div>
);

const StatItem = ({
  value,
  suffix = "",
  label,
  isVisible,
  delay
}: {
  value: number;
  suffix?: string;
  label: string;
  isVisible: boolean;
  delay: number;
}) => (
  <div
    className={`glass p-4 rounded-xl text-center transform transition-all duration-700 delay-${delay} ${
      isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
    }`}
  >
    <div className="flex items-center justify-center">
      <span className="text-3xl font-bold text-foreground">{value}</span>
      {suffix && <span className="text-2xl font-bold text-primary ml-1">{suffix}</span>}
    </div>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </div>
);

export default ServicesSection;