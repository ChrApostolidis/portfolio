import { FaGithub, FaLinkedin } from "react-icons/fa";
import MainButton from "../components/MainButton";
import { motion } from "framer-motion";

interface AboutSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="About" className="mt-10 max-w-5xl">
      <div className="relative flex text-left lg:justify-start items-center ml-4 mb-4 lg:mb-0">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          About Me<span className="text-accent text-2xl">.</span>
        </h3>
      </div>
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className="mt-6 lg:mx-20 mx-5 space-y-5 max-w-3xl"
      >
        <p className="border-b pb-4  border-accent text-lg lg:text-2xl font-medium leading-snug">
          Full Stack Developer who completed an internship at{" "}
          <a
            href="https://ilo.com.gr/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-300"
          >
            Ilo Share Your
          </a>
          , a lead capture SaaS with 5,000+ users, where I{" "}
          <span className="text-primary font-semibold">
            shipped features end to end using Next.js, React, and Laravel.
          </span>
        </p>
        <motion.p variants={itemVariants}>
          My main stack includes
          <span className="ml-0.5 text-primary font-medium">
            React, Next.js, Node.js, and Laravel
          </span>
          .
        </motion.p>

        <motion.p variants={itemVariants}>
          I started coding at 18 out of curiosity about how websites work, and
          it quickly became a habit of building, breaking, and rebuilding things
          until I understood them.
        </motion.p>
        <motion.p variants={itemVariants}>
          I treat my projects as real products rather than exercises, breaking
          problems down, thinking through the details, and improving them with
          every iteration.
        </motion.p>

        <motion.p variants={itemVariants}>
          Currently focused on building production ready applications and
          taking features from idea to launch.
        </motion.p>
      </motion.div>

      <div className="my-12 lg:mx-10 mx-5 flex justify-between items-center gap-4">
        <MainButton 
          onClick={() => onNavigate && onNavigate("Contact")}
          className="bg-primary hover:bg-[#4F96F0] text-black border-black"
        >
          Contact Me
        </MainButton>
        <div className="flex gap-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ChrApostolidis"
          >
            <FaGithub size={30} className="hover:text-primary cursor-pointer" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/christos-apostolidis/"
          >
            <FaLinkedin
              size={30}
              className="hover:text-primary cursor-pointer"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
