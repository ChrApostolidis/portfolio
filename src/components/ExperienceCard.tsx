import { motion } from "framer-motion";
import TechStackCard from "./TechStackCard";

export type ExperienceCardProps = {
  role: string;
  company: string;
  companyLink: string;
  type: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  techStack: string[];
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ExperienceCard({
  role,
  company,
  companyLink,
  type,
  period,
  location,
  summary,
  highlights,
  techStack,
}: ExperienceCardProps) {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid gap-8 lg:short:gap-6 lg:grid-cols-[240px_1fr]"
    >
      <motion.div
        variants={itemVariants}
        className="space-y-2 text-center lg:text-left lg:border-r lg:border-accent lg:pr-8"
      >
        <p className="text-sm uppercase tracking-widest text-muted">{period}</p>
        <h4 className="text-2xl lg:text-3xl lg:short:text-2xl font-bold tracking-tight">
          {role}
        </h4>
        <a
          href={companyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-lg text-primary font-semibold hover:text-accent transition-colors duration-300"
        >
          {company}
        </a>
        <p className="text-gray-400">
          {type} · {location}
        </p>
      </motion.div>

      <div className="space-y-5 lg:short:space-y-3">
        <motion.p variants={itemVariants} className="text-lg lg:short:text-base leading-snug">
          {summary}
        </motion.p>

        <motion.ul variants={itemVariants} className="space-y-2 lg:short:space-y-1.5">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-gray-400 lg:short:text-sm">
              <span className="mt-2.5 lg:short:mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed lg:short:leading-snug">{highlight}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-3 justify-center lg:justify-start"
        >
          {techStack.map((tech) => (
            <TechStackCard key={tech} techStack={tech} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
