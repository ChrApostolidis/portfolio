import { FaGithub, FaLinkedin } from "react-icons/fa";
import MainButton from "../components/MainButton";
import { motion } from "framer-motion";

export default function AboutSection() {
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
      <div className="mx-10 lg:mx-0">
        <h3 className="relative -top-1.5 text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          About Me<span className="text-accent text-2xl">.</span>
        </h3>
      </div>
      <motion.div
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 1 }}
        className="mt-6 mx-20 space-y-5 max-w-3xl"
      >
        <p className="border-b pb-4  border-accent text-lg lg:text-2xl font-medium leading-snug">
          Entry-level Web Developer focused on{" "}
          <span className="text-primary font-semibold">
            full-stack development, modern UI, and building real-world
            applications
          </span>
          .
        </p>
        <motion.p variants={itemVariants}>
          My main stack includes
          <span className="ml-0.5 text-primary font-medium">
            React, Node.js, Tailwind CSS, MongoDB, and TypeScript
          </span>
          .
        </motion.p>

        <motion.p variants={itemVariants}>
          What started two years ago as curiosity about how websites work
          gradually became a habit of building, breaking, and rebuilding things
          to understand them better.
        </motion.p>
        <motion.p variants={itemVariants}>
          I approach problems with an engineering mindset breaking them down,
          thinking critically, and continuously improving my solutions.
        </motion.p>

        <motion.p variants={itemVariants}>
          Currently focused on building production-ready projects and sharpening
          my full-stack skills.
        </motion.p>
      </motion.div>

      <div className="my-12 mx-10 flex justify-between items-center gap-4">
        <MainButton className="bg-primary hover:bg-secondary border-black">
          Contact Me
        </MainButton>
        <div className="flex gap-4">
          <FaGithub size={30} className="hover:text-primary cursor-pointer" />
          <FaLinkedin size={30} className="hover:text-primary cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
