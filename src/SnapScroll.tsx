import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import NavBar from "./components/NavBar";

gsap.registerPlugin(ScrollTrigger);

const sections = ["One", "Two", "Three", "Four"];

export default function SnapScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
      <NavBar />
      {sections.map((text, i) => (
        <section className={`content panel h-screen w-full flex items-center justify-center text-lg`} key={i}>
          <h1>{text}</h1>
        </section>
      ))}
    </div>
  );
}
