import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

// Lazy load below-the-fold components
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Services data
const services = [
  {
    id: 1,
    title: 'React & Modern Frontend',
    description: 'Enterprise-grade applications with React, Redux, and Next.js that deliver exceptional user experiences while maintaining robust architecture.',
    icon: 'fab fa-react'
  },
  {
    id: 2,
    title: 'Full-Stack TypeScript',
    description: 'End-to-end type safety with TypeScript across frontend and backend, reducing bugs by up to 40% and accelerating development velocity for business-critical applications.',
    icon: 'fas fa-shield-alt'
  },
  {
    id: 3,
    title: 'Cloud-Native Development',
    description: 'Scalable, resilient applications built for AWS, Azure, or GCP using container orchestration, microservices architecture, and infrastructure as code.',
    icon: 'fas fa-cloud'
  },
  {
    id: 4,
    title: 'API Development & Integration',
    description: 'RESTful and GraphQL APIs that connect seamlessly with third-party services, legacy systems, and microservices while maintaining industry-standard documentation.',
    icon: 'fas fa-exchange-alt'
  },
  {
    id: 5,
    title: 'Database Architecture',
    description: 'Strategic data management with MongoDB, PostgreSQL, and Redis, implementing advanced patterns like CQRS and event sourcing for optimal performance at scale.',
    icon: 'fas fa-database'
  },
  {
    id: 6,
    title: 'Performance Optimization',
    description: 'Sub-second loading times through advanced bundling techniques, SSR/SSG implementation, and Web Vitals optimization that directly impact conversion rates and SEO.',
    icon: 'fas fa-tachometer-alt'
  }
];

// Stats data
const statsData = {
  completedProjects: 5,
  satisfaction: 0, // Will be handled by removing this stat in ServicesSection
  experience: 2
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary text-background px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <HeroSection />

      <main id="main-content">
        <Suspense fallback={<div className="h-96 animate-pulse bg-background" />}>
        <SkillsSection skills={skills} isLoading={false} />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-background" />}>
        <ServicesSection
          services={services}
          stats={statsData}
          isLoading={{ services: false, stats: false }}
        />
      </Suspense>

      <Suspense fallback={<div className="h-96 animate-pulse bg-background" />}>
        <ProjectsSection projects={projects} isLoading={false} />
      </Suspense>

        <Suspense fallback={<div className="h-96 animate-pulse bg-background" />}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-32 animate-pulse bg-background" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;