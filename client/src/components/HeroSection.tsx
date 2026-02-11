import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showResumeDropdown, setShowResumeDropdown] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowResumeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default anchor behavior

    const targetId = e.currentTarget.getAttribute("href") || "";
    
    if (targetId && targetId.startsWith("#")) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen pt-24 flex items-center bg-background relative overflow-hidden"
    >
      {/* Animated background gradient that follows mouse */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 214, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-5" />

      {/* Gradient flow overlay */}
      <div className="absolute inset-0 gradient-flow" />

      {/* Matrix rain effect elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary opacity-10 font-mono text-xs"
            style={{
              left: `${20 + i * 15}%`,
              animation: `matrixRain ${10 + i * 2}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          >
            {["0x00FF", "await", "const", "=>>", "0xFF"][i]}
          </div>
        ))}
      </div>

      {/* Floating tech elements */}
      <div className="absolute right-8 top-1/6 opacity-20 text-primary font-mono hidden lg:block z-0 floating-code">
        /* Web3 Builder */
      </div>

      <div className="absolute left-16 bottom-10 opacity-20 text-secondary font-mono transform rotate-2 hidden lg:block z-0 floating-code">
        // Building the future
      </div>

      {/* Floating Code Symbols with glow */}
      <div className="code-symbols z-0">
        <div className="absolute left-1/4 top-20 text-primary opacity-24 text-xl font-mono glow-cyan floating-code">&#123;&#125;</div>
        <div className="absolute right-1/3 top-40 text-secondary opacity-24 text-xl font-mono glow-purple floating-code">&#40;&#41; =&gt;</div>
        <div className="absolute left-1/5 bottom-20 text-accent opacity-24 text-2xl font-mono floating-code">0x</div>
        <div className="absolute right-1/4 bottom-40 text-primary opacity-24 text-xl font-mono glow-cyan floating-code">&amp;&amp;</div>
        <div className="absolute left-1/3 top-60 text-secondary opacity-20 text-lg font-mono glow-purple floating-code">async</div>
        <div className="absolute right-1/5 top-80 text-accent opacity-22 text-xl font-mono floating-code">deploy()</div>
        <div className="absolute left-16 bottom-40 text-primary opacity-18 text-lg font-mono glow-cyan floating-code">0xDEAD</div>
        <div className="absolute right-16 bottom-60 text-secondary opacity-20 text-lg font-mono glow-purple floating-code">import</div>
        <div className="absolute left-1/3 bottom-10 text-accent opacity-22 text-lg font-mono floating-code">.sol</div>
        <div className="absolute right-1/2 top-10 text-primary opacity-18 text-lg font-mono glow-cyan floating-code">pragma</div>
        <div className="absolute left-10 top-1/2 text-secondary opacity-20 text-lg font-mono glow-purple floating-code">mapping</div>
        <div className="absolute right-10 top-1/2 text-accent opacity-22 text-lg font-mono floating-code">require()</div>
        <div className="absolute left-1/2 bottom-80 text-primary opacity-18 text-lg font-mono glow-cyan floating-code">emit</div>
        <div className="absolute right-1/3 bottom-20 text-secondary opacity-20 text-lg font-mono glow-purple floating-code">msg.sender</div>
        <div className="absolute left-1/6 top-40 text-accent opacity-22 text-lg font-mono floating-code">keccak256</div>
      </div>

      {/* Large decorative elements with glow */}
      <div className="absolute -left-10 top-1/3 text-primary opacity-20 text-9xl transform -rotate-6 z-0 glow-cyan">
        &lt;
      </div>
      <div className="absolute -right-10 top-2/3 text-secondary opacity-20 text-9xl transform rotate-6 z-0 glow-purple">
        &gt;
      </div>



      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-0">
        {/* Left side content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="font-mono text-primary text-sm mb-2 opacity-80">&lt;h1&gt;</div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2">
              Hey, I'm <span className="text-gradient">Jake</span>
            </h1>
            <div className="font-mono text-primary text-sm opacity-80">&lt;/h1&gt;</div>
          </div>
          <div className={`my-6 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-2">
              Web3 Developer & Builder
            </h2>
            <p className="text-lg text-muted-foreground font-mono">
              <span className="text-primary">Building</span> on the{' '}
              <span className="text-secondary glitch-text">frontier</span> of tech
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-mono text-muted-foreground">Available for hire</span>
              </div>
            </div>
          </div>
          <div className={`mt-8 flex flex-wrap gap-4 relative z-30 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button
              className="enhanced-button px-8 py-4 h-auto bg-primary text-primary-foreground font-medium rounded-lg hover:bg-opacity-90 transition-all relative group"
              onClick={() => {
                const contactSection = document.querySelector("#contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="relative z-10 font-mono">Let's Build Together →</span>
            </Button>
            {/* Resume Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="outline"
                className="enhanced-button px-8 py-4 h-auto border border-primary/30 text-foreground font-medium rounded-lg hover:border-primary hover:bg-primary/10 transition-all relative backdrop-blur-sm"
                onClick={() => setShowResumeDropdown(!showResumeDropdown)}
              >
                <span className="relative z-10 font-mono flex items-center gap-2">
                  View Resume
                  <ChevronDown className={`w-4 h-4 transition-transform ${showResumeDropdown ? 'rotate-180' : ''}`} />
                </span>
              </Button>

              {/* Dropdown Menu */}
              {showResumeDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 glass border border-primary/20 rounded-lg overflow-hidden z-50 backdrop-blur-lg">
                  <a
                    href="/JakobJohnsonResumeWeb3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-foreground hover:bg-primary/10 transition-colors border-b border-primary/10"
                    onClick={() => setShowResumeDropdown(false)}
                  >
                    <div className="font-mono text-sm font-medium text-primary">Web3 / Blockchain Resume</div>
                    <div className="text-xs text-muted-foreground mt-1">Smart contracts, DeFi, Web3 development</div>
                  </a>
                  <a
                    href="/JakobJohnsonResumeWeb2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-foreground hover:bg-primary/10 transition-colors"
                    onClick={() => setShowResumeDropdown(false)}
                  >
                    <div className="font-mono text-sm font-medium text-secondary">Full Stack Resume</div>
                    <div className="text-xs text-muted-foreground mt-1">React, Node.js, full-stack development</div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side profile image with enhanced styling */}
        <div className={`md:w-1/2 flex justify-center md:justify-end relative transform transition-all duration-1000 delay-600 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-3xl opacity-20 animate-pulse" />
            <div className="profile-circle rounded-full overflow-hidden h-64 w-64 md:h-80 md:w-80 border border-primary/30 relative backdrop-blur-sm">
              <img
                src="/assets/jj-headshot.jpeg"
                alt="Jakob Johnson"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
            <div className="absolute -bottom-2 right-0 glass px-3 py-1 rounded-md">
              <span className="text-primary font-mono text-sm">&lt;web3.builder /&gt;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs font-mono text-muted-foreground">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;