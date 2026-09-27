import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import SkillsSection from "./sections/SkillsSection";
import ContactSection from "./sections/ContactSection";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import {
  ProjectsDataFirstSection,
  ProjectsDataSecondSection,
} from "./data/ProjectsData";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Section each panel belongs to, in order. Projects spans two panels; nav
// clicks land on the first one.
const PANEL_SECTIONS = [
  "Hero",
  "About",
  "Experience",
  "Skills",
  "Projects",
  "Projects",
  "Contact",
];

const PANEL_COUNT = PANEL_SECTIONS.length;

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
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(PANEL_SECTIONS[0]);
  // Section a mobile nav click is heading for, so the panels it scrolls
  // past don't flash as active on the way.
  const mobileNavTargetRef = useRef<string | null>(null);

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
          onUpdate: (self) => {
            // A nav click already marked its destination active.
            if (navTargetRef.current !== null) return;
            const panel = Math.round(self.progress * (PANEL_COUNT - 1));
            setActiveSection(PANEL_SECTIONS[panel]);
          },
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

  // On mobile the page scrolls normally, so track the panel crossing the
  // middle of the viewport instead.
  useEffect(() => {
    if (isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const panel = panelRefs.current.indexOf(entry.target as HTMLElement);
          if (panel === -1) return;
          const section = PANEL_SECTIONS[panel];
          const navTarget = mobileNavTargetRef.current;
          if (navTarget !== null) {
            if (section !== navTarget) return;
            mobileNavTargetRef.current = null;
          }
          setActiveSection(section);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    // The user taking over the scroll cancels the pending nav target.
    const handleGesture = () => {
      mobileNavTargetRef.current = null;
    };

    panelRefs.current.forEach((panel) => panel && observer.observe(panel));
    window.addEventListener("touchstart", handleGesture, { passive: true });
    window.addEventListener("wheel", handleGesture, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("wheel", handleGesture);
      mobileNavTargetRef.current = null;
    };
  }, [isDesktop]);

  // Function to scroll to a specific section through NavBar
  const scrollToSection = (sectionId: string) => {
    if (!PANEL_SECTIONS.includes(sectionId)) return;
    setActiveSection(sectionId);

    if (!isDesktop) {
      mobileNavTargetRef.current = sectionId;
      // For mobile, use default smooth scroll
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const trigger = triggerRef.current;
    const sectionIndex = PANEL_SECTIONS.indexOf(sectionId);
    if (!trigger) return;

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
    <ExperienceSection key={2} />,
    <SkillsSection key={3} />,
    <ProjectsSection
      key={4}
      projectData={ProjectsDataFirstSection}
      showHeader={true}
    />,
    <ProjectsSection
      key={5}
      projectData={ProjectsDataSecondSection}
      showHeader={false}
    />,
    <ContactSection key={6} />,
  ];

  return (
    <div className="hero" ref={containerRef}>
      <NavBar onNavigate={scrollToSection} activeSection={activeSection} />
      {sectionsWithProps.map((section, i) => (
        <section
          className="content panel lg:h-screen w-full flex justify-center items-center"
          key={i}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
        >
          <div>{section}</div>
        </section>
      ))}
    </div>
  );
}
