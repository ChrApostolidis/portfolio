import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import SkillsSection from "./sections/SkillsSection";
import ContactSection from "./sections/ContactSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import {
  ProjectsDataFirstSection,
  ProjectsDataSecondSection,
} from "./data/ProjectsData";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  <HeroSection />,
  <AboutSection />,
  <SkillsSection />,
  <ProjectsSection projectData={ProjectsDataFirstSection} showHeader={true} />,
  <ProjectsSection
    projectData={ProjectsDataSecondSection}
    showHeader={false}
  />,
  <ContactSection />,
];

export default function SnapScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const isNavigatingRef = useRef(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Setup for Desktop snap scrolling
  useEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.to(".panel", {
        yPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            duration: 0.3,
            ease: "power2.inOut",
            snapTo: (value: number) => {
              // Skip snapping if navigation is in progress
              if (isNavigatingRef.current) {
                return value;
              }
              // Otherwise snap to nearest section
              return (
                Math.round(value * (sections.length - 1)) /
                (sections.length - 1)
              );
            },
          },
          end: () => `+=${window.innerHeight * (sections.length - 1)}`,
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  // Function to scroll to a specific section through NavBar
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (isDesktop) {
        const sectionIndex = sections.findIndex((_, i) => {
          if (sectionId === "Hero" && i === 0) return true;
          if (sectionId === "About" && i === 1) return true;
          if (sectionId === "Skills" && i === 2) return true;
          if (sectionId === "Projects" && i === 3) return true;
          if (sectionId === "Contact" && i === 5) return true;
          return false;
        });

        if (sectionIndex !== -1) {
          // Disable snapping during navigation
          isNavigatingRef.current = true;

          const scrollPosition = window.innerHeight * sectionIndex;
          gsap.to(window, {
            scrollTo: scrollPosition,
            duration: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
              // Re-enable snapping after navigation
              setTimeout(() => {
                isNavigatingRef.current = false;
              }, 100);
            },
          });
        }
      } else {
        // For mobile, use default smooth scroll
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="hero" ref={containerRef}>
      <NavBar onNavigate={scrollToSection} />
      {sections.map((section, i) => (
        <section
          className="content panel lg:h-screen w-full flex justify-center items-center"
          key={i}
        >
          <div>{section}</div>
        </section>
      ))}
    </div>
  );
}
