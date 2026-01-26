import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import SkillsSection from "./sections/SkillsSection";
import ContactSection from "./sections/ContactSection";
import AboutSection from "./sections/AboutSection";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  <HeroSection />,
  <AboutSection />,
  <SkillsSection />,
  "Four",
  <ContactSection />,
];

export default function SnapScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (sectionId: string) => {
    const sectionIndex = sections.findIndex((_, i) => {
      if (sectionId === "Hero" && i === 0) return true;
      if (sectionId === "About" && i === 1) return true;
      if (sectionId === "Skills" && i === 2) return true;
      if (sectionId === "Contact" && i === 4) return true;
      return false;
    });

    if (sectionIndex !== -1) {
      const scrollPosition = window.innerHeight * sectionIndex;
      gsap.to(window, {
        scrollTo: scrollPosition,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".panel", {
        yPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.3,
            ease: "power2.inOut",
          },
          end: () => `+=${window.innerHeight * sections.length}`,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero" ref={containerRef}>
      <NavBar onNavigate={scrollToSection} />
      {sections.map((section, i) => (
        <section
          className={`content panel h-screen w-full flex items-center justify-center`}
          key={i}
        >
          <div>{section}</div>
        </section>
      ))}
    </div>
  );
}
