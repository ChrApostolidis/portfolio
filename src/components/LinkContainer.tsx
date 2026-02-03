import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";

import LinkComponent from "./LinkComponent";

export default function LinkContainer() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="mt-10">
      <motion.ul
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 1 }}
      >
        <div className="flex flex-col lg:flex-row gap-2">
          <LinkComponent
            href="https://www.linkedin.com/in/xristos-apostolidis-5aa0912ab/"
            icon={FaLinkedin}
            label="Linkedin"
            downloadLink={false}
          />
          <LinkComponent
            href="https://github.com/ChrApostolidis"
            icon={FaGithub}
            label="Github"
            downloadLink={false}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <LinkComponent
            href="mailto:xrsapostolidis@gmail.com"
            icon={MdEmail}
            label="Email"
            downloadLink={false}
          />
          <LinkComponent
            href="/files/resume.pdf"
            icon={IoDocumentText}
            label="Resume"
            downloadLink={true}
          />
        </div>
      </motion.ul>
    </div>
  );
}
