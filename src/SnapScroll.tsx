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

const PANEL_COUNT = 6;

// Panel each nav target lands on (panel 4 is the second projects page).
const SECTION_INDEX: Record<string, number> = {
  Hero: 0,
  About: 1,
  Skills: 2,
  Projects: 3,
  Contact: 5,
};

// Keys that scroll the page. Anything else (Tab, shortcuts) is not a
// scroll gesture and must not cancel a navigation.
const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

export default function SnapScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  // Progress (0-1) a nav click is heading for, or null when the user has
  // control. While set, snapping targets it instead of the nearest panel.
  const navTargetRef = useRef<number | null>(null);
  const navTweenRef = useRef<gsap.core.Tween | null>(null);
  // Token so stale callbacks (a killed tween, an old timer) can tell they
  // no longer own the guard.
  const navIdRef = useRef(0);

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
      const tween = gsap.to(".panel", {
        yPercent: -100 * (PANEL_COUNT - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            duration: 0.3,
            ease: "power2.inOut",
            snapTo: (value: number) => {
              if (navTargetRef.current !== null) return navTargetRef.current;
              return Math.round(value * (PANEL_COUNT - 1)) / (PANEL_COUNT - 1);
            },
          },
          end: () => `+=${window.innerHeight * (PANEL_COUNT - 1)}`,
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });

      triggerRef.current = tween.scrollTrigger ?? null;
    }, containerRef);

    const handleGesture = () => {
      if (navTweenRef.current?.isActive()) return;
      navIdRef.current++;
      navTargetRef.current = null;
    };
    const handleKeydown = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) handleGesture();
    };

    window.addEventListener("wheel", handleGesture, { passive: true });
    window.addEventListener("touchstart", handleGesture, { passive: true });
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("wheel", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("keydown", handleKeydown);
      navTweenRef.current?.kill();
      navTweenRef.current = null;
      handleGesture();
      triggerRef.current = null;
      ctx.revert();
    };
  }, [isDesktop]);

  // Function to scroll to a specific section through NavBar
  const scrollToSection = (sectionId: string) => {
    if (!isDesktop) {
      // For mobile, use default smooth scroll
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const trigger = triggerRef.current;
    const sectionIndex = SECTION_INDEX[sectionId];
    if (!trigger || sectionIndex === undefined) return;

    const progress = sectionIndex / (PANEL_COUNT - 1);
    // Take the destination from the trigger's own range rather than assuming
    // each panel is exactly window.innerHeight tall.
    const scrollPosition =
      trigger.start + (trigger.end - trigger.start) * progress;

    navTargetRef.current = progress;
    const navId = ++navIdRef.current;

    const snapTween = trigger.getTween(true);
    if (snapTween) snapTween.kill();
    gsap.killTweensOf(window);

    const panelsTravelled = Math.abs(
      trigger.progress * (PANEL_COUNT - 1) - sectionIndex,
    );

    navTweenRef.current = gsap.to(window, {
      scrollTo: scrollPosition,
      duration: 0.5 + 0.1 * panelsTravelled,
      ease: "power2.inOut",
      overwrite: true,
      onComplete: () => {
        gsap.delayedCall(1, () => {
          if (navIdRef.current !== navId) return;
          navTargetRef.current = null;
        });
      },
      onInterrupt: () => {
        if (navIdRef.current !== navId) return;
        navIdRef.current++;
        navTargetRef.current = null;
      },
    });
  };

  const sectionsWithProps = [
    <HeroSection key={0} onNavigate={scrollToSection} />,
    <AboutSection key={1} onNavigate={scrollToSection} />,
    <SkillsSection key={2} />,
    <ProjectsSection
      key={3}
      projectData={ProjectsDataFirstSection}
      showHeader={true}
    />,
    <ProjectsSection
      key={4}
      projectData={ProjectsDataSecondSection}
      showHeader={false}
    />,
    <ContactSection key={5} />,
  ];

  return (
    <div className="hero" ref={containerRef}>
      <NavBar onNavigate={scrollToSection} />
      {sectionsWithProps.map((section, i) => (
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
