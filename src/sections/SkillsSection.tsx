import { motion } from "framer-motion";
import { SkillsData } from "../data/data";
export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div id="Skills" className="mt-10 max-w-5xl">
      <div className="relative flex text-left lg:justify-start items-center ml-4 mb-4 lg:mb-0">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Skills<span className="text-accent text-2xl">.</span>
        </h3>
      </div>
      <div className="mx-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.8 }}
        >
          <h3 className="text-3xl text-center font-bold">My Main Stack</h3>
        </motion.div>
        <motion.div
          className="mx-10 mt-4 grid gap-12 lg:gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-7 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
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
          viewport={{ once: true, amount: 0.8 }}
        >
          <h3 className="mt-4 text-3xl text-center font-bold">
            Experience With
          </h3>
        </motion.div>
        <motion.div
          className="mx-10 mt-4 grid gap-12 lg:gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-7 justify-items-center transition transform duration-200"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
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
      </div>
    </div>
  );
}
