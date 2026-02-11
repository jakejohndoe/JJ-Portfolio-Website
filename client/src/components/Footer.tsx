import { Github, Linkedin, Twitter, Instagram, Code2, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/jakejohndoe',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jakejohndoe/',
      icon: Linkedin,
    },
    {
      name: 'Twitter',
      url: 'https://x.com/yaekyon',
      icon: Twitter,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/jakejohndoe/',
      icon: Instagram,
    },
  ];

  return (
    <footer className="relative py-12 bg-background border-t border-primary/10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-flow opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright & Branding */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm text-foreground">
                <span className="text-primary">&lt;</span>
                JJ
                <span className="text-primary">/&gt;</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Jake John. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1 font-mono">
              Built with <Heart className="inline w-3 h-3 text-primary" /> and React
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 glass rounded-lg hover:bg-primary/10 transition-all duration-300"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="text-xs font-mono text-primary bg-background/90 glass px-2 py-1 rounded whitespace-nowrap">
                      {link.name}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="flex gap-4 text-sm font-mono">
            <a
              href="#home"
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Back to top ↑
            </a>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-8 pt-4 border-t border-primary/5">
          <p className="text-center text-xs font-mono text-muted-foreground/40">
            &lt;/portfolio&gt;
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;