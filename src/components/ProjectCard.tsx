import { useEffect, useState } from "react";
import TechStackCard from "./TechStackCard";
import { motion } from "framer-motion";

export type ProjectCardProps = {
  url: string;
  title: string;
  description: string;
  techStack: string[];
  demoLink: string;
  githubLink: string;
  alingLeftOrRight: string;
};

const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const textVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

export default function ProjectCard({
  url,
  title,
  description,
  techStack,
  demoLink,
  githubLink,
  alingLeftOrRight,
}: ProjectCardProps) {
  const [viewportAmount, setViewportAmount] = useState(1);

  // updating the viewport for animations based on screen size
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setViewportAmount(media.matches ? 0.4 : 1);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const viewportSettings = { once: true, amount: viewportAmount };

  return (
    <>
      {alingLeftOrRight === "left" ? (
        <>
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="relative max-w-md mx-auto lg:mx-0"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/20 to-transparent rounded-2xl blur-2xl"></div>
            <img
              className="relative w-full rounded-2xl shadow-xl border border-white/10"
              src={url}
              alt={`Image of the ${title}`}
            />
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="space-y-6 text-center lg:text-left"
          >
            <h4 className="text-3xl font-bold tracking-tight">{title}</h4>

            <p className="text-gray-400 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {techStack.map((techStack) => (
                <TechStackCard key={techStack} techStack={techStack} />
              ))}
            </div>

            <div className="flex gap-4 justify-center lg:justify-start pt-2">
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/80 text-black font-semibold hover:bg-primary transition"
              >
                View Demo
              </a>

              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white hover:bg-white/5 transition"
              >
                View GitHub
              </a>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="space-y-6 text-center lg:text-left"
          >
            <h4 className="text-3xl font-bold tracking-tight">{title}</h4>

            <p className="text-gray-400 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {techStack.map((techStack) => (
                <TechStackCard key={techStack} techStack={techStack} />
              ))}
            </div>

            <div className="flex gap-4 justify-center lg:justify-start pt-2">
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/80 text-black font-semibold hover:bg-primary transition"
              >
                View Demo
              </a>

              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white hover:bg-white/5 transition"
              >
                View GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="relative max-w-md mx-auto lg:mx-0"
          >
            <div className="absolute inset-0 bg-linear-to-tl from-cyan-500/20 to-transparent rounded-2xl blur-2xl"></div>
            <img
              className="relative w-full rounded-2xl shadow-xl border border-white/10"
              src={url}
              alt={`Image of the ${title}`}
            />
          </motion.div>
        </>
      )}
    </>
  );
}
