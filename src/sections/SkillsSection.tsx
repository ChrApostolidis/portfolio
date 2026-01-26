import { AnimatePresence, motion, type Variants } from "framer-motion";
import { SkillsData } from "../data";
export default function SkillsSection() {
  const cardVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div id="Skills">
      <div>
        <h3 className="relative -top-3.5 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Skills<span className="text-accent text-2xl">.</span>
        </h3>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl text-center font-bold">My Main Stack</h3>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          className="mt-4 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SkillsData["MainStack"].map((skill) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                variants={cardVariants}
                key={skill.name}
                className="flex items-center justify-center w-24 h-24 rounded-xl 
                  border border-primary/50
                  shadow-md shadow-black/40
                  hover:border-primary/80 hover:shadow-lg
                  transition-all duration-300"
              >
                <IconComponent size={skill.size} color={skill.color} />
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="mt-4 text-3xl text-center font-bold">
            Experience With
          </h3>
        </motion.div>
        <motion.div
          className="mt-4 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SkillsData["Experience"].map((skill) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                variants={cardVariants}
                key={skill.name}
                className="flex items-center justify-center w-24 h-24 rounded-xl 
                  border border-primary/50
                  shadow-md shadow-black/40
                  hover:border-primary/80 hover:shadow-lg
                  transition-all duration-300"
              >
                {skill.render === "icon" ? (
                  <IconComponent size={skill.size} color={skill.color} />
                ) : (
                  <img alt={skill.name} width={skill.size} src={skill.icon} />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
