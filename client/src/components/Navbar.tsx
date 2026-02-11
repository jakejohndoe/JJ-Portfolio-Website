import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollAnimation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [location] = useLocation();
  const scrollProgress = useScrollProgress();

  // Check if we're on an admin page or home page
  const isAdminPage = location.startsWith('/admin');
  const isHomePage = location === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'services', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If not on homepage, don't prevent default - let it navigate to home page + anchor
    if (!isHomePage) {
      setIsOpen(false);
      return;
    }

    // Original smooth scrolling behavior for homepage
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href") || "";

    if (targetId.startsWith("#")) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
          behavior: "smooth",
        });
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100]">
        <div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "py-3 glass" : "py-4 bg-background/80 backdrop-blur-sm"}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            href="/"
            onClick={() => {
              if (!isAdminPage) {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
              setIsOpen(false);
            }}
            className="text-foreground text-xl font-bold cursor-pointer group flex items-center gap-2"
          >
            <span className="text-primary font-mono">&lt;</span>
            <span className="group-hover:text-primary transition-colors">JJ</span>
            <span className="text-primary font-mono">/&gt;</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {isAdminPage ? (
              // Admin Navigation Links
              <>
                <Link href="/" className="text-foreground hover:text-primary transition">
                  View Site
                </Link>
                <Link href="/admin" className={`text-foreground hover:text-primary transition ${location === '/admin' ? 'text-primary' : ''}`}>
                  Dashboard
                </Link>
                <Link href="/admin/blogs" className={`text-foreground hover:text-primary transition ${location === '/admin/blogs' ? 'text-primary' : ''}`}>
                  Manage Blogs
                </Link>
                <Link href="/admin/users" className={`text-foreground hover:text-primary transition ${location === '/admin/users' ? 'text-primary' : ''}`}>
                  Manage Users
                </Link>
              </>
            ) : (
              // Regular Site Navigation
              <>
                <a
                  href={isHomePage ? "#home" : "/#home"}
                  onClick={handleNavClick}
                  className={`font-mono text-sm hover:text-primary transition-colors relative ${
                    activeSection === 'home' && isHomePage ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="text-muted-foreground">01.</span> Home
                  {activeSection === 'home' && isHomePage && (
                    <div className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
                  )}
                </a>
                <a
                  href={isHomePage ? "#services" : "/#services"}
                  onClick={handleNavClick}
                  className={`font-mono text-sm hover:text-primary transition-colors relative ${
                    activeSection === 'services' && isHomePage ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="text-muted-foreground">02.</span> About
                  {activeSection === 'services' && isHomePage && (
                    <div className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
                  )}
                </a>
                <a
                  href={isHomePage ? "#projects" : "/#projects"}
                  onClick={handleNavClick}
                  className={`font-mono text-sm hover:text-primary transition-colors relative ${
                    activeSection === 'projects' && isHomePage ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="text-muted-foreground">03.</span> Projects
                  {activeSection === 'projects' && isHomePage && (
                    <div className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
                  )}
                </a>
                <a
                  href={isHomePage ? "#contact" : "/#contact"}
                  onClick={handleNavClick}
                  className={`font-mono text-sm hover:text-primary transition-colors relative ${
                    activeSection === 'contact' && isHomePage ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="text-muted-foreground">04.</span> Contact
                  {activeSection === 'contact' && isHomePage && (
                    <div className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
                  )}
                </a>
              </>
            )}
          </div>

          <button
            className="md:hidden text-foreground relative z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
                }`}
              >
                <Menu size={24} />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  isOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'
                }`}
              >
                <X size={24} />
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
            isOpen ? 'visible' : 'invisible'
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsOpen(false)}
          />

          {/* Menu panel */}
          <div
            className={`absolute right-0 top-0 h-full w-64 glass border-l border-primary/20 transform transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-8 pt-20 flex flex-col space-y-6">
              {isAdminPage ? (
                // Admin Mobile Navigation
                <>
                  <Link
                    href="/"
                    className="text-foreground hover:text-primary transition py-2 px-4"
                    onClick={() => setIsOpen(false)}
                  >
                    View Site
                  </Link>
                  <Link
                    href="/admin"
                    className={`text-foreground hover:text-primary transition py-2 px-4 ${location === '/admin' ? 'text-primary' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/blogs"
                    className={`text-foreground hover:text-primary transition py-2 px-4 ${location === '/admin/blogs' ? 'text-primary' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Manage Blogs
                  </Link>
                  <Link
                    href="/admin/users"
                    className={`text-foreground hover:text-primary transition py-2 px-4 ${location === '/admin/users' ? 'text-primary' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Manage Users
                  </Link>
                </>
              ) : (
                // Regular Mobile Navigation
                <>
                  <a
                    href={isHomePage ? "#home" : "/#home"}
                    onClick={handleNavClick}
                    className="font-mono text-foreground hover:text-primary transition-colors block"
                  >
                    <span className="text-muted-foreground">01.</span> Home
                  </a>
                  <a
                    href={isHomePage ? "#services" : "/#services"}
                    onClick={handleNavClick}
                    className="font-mono text-foreground hover:text-primary transition-colors block"
                  >
                    <span className="text-muted-foreground">02.</span> About
                  </a>
                  <a
                    href={isHomePage ? "#projects" : "/#projects"}
                    onClick={handleNavClick}
                    className="font-mono text-foreground hover:text-primary transition-colors block"
                  >
                    <span className="text-muted-foreground">03.</span> Projects
                  </a>
                  <a
                    href={isHomePage ? "#contact" : "/#contact"}
                    onClick={handleNavClick}
                    className="font-mono text-foreground hover:text-primary transition-colors block"
                  >
                    <span className="text-muted-foreground">04.</span> Contact
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;