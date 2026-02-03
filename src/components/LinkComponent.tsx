import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

type LinkComponentProps = {
  href: string;
  icon: React.ComponentType<{ size: number }>;
  label: string;
  downloadLink: boolean;
};

export default function LinkComponent({
  href,
  icon: Icon,
  label,
  downloadLink,
}: LinkComponentProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.li
      variants={itemVariants}
      className="w-full border border-primary p-4 rounded-lg mb-4 cursor-pointer hover:bg-primary/10 transition"
    >
      <a
        href={href}
        {...(downloadLink
          ? { download: true }
          : { target: "_blank", rel: "noopener noreferrer" })}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon size={30} />
            <p>{label}</p>
          </div>
          <div className="flex items-center">
            <FiExternalLink size={30} />
          </div>
        </div>
      </a>
    </motion.li>
  );
}
