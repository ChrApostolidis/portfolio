import { IoLogoJavascript } from "react-icons/io5";
import {
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import type { IconType } from "react-icons";
import { GrMysql } from "react-icons/gr";

interface SkillWithIcon {
  name: string;
  render: "icon";
  icon: IconType;
  size: number;
  color: string;
}

interface SkillWithImage {
  name: string;
  render: "image";
  icon: string;
  size: number;
  color?: string;
}

type Skill = SkillWithIcon | SkillWithImage;

export const SkillsData: Record<string, Skill[]> = {
  MainStack: [
    {
      name: "HTML5",
      icon: FaHtml5,
      color: "#E34F26",
      size: 60,
      render: "icon",
    },
    {
      name: "CSS3",
      icon: FaCss3Alt,
      color: "#1572B6",
      size: 60,
      render: "icon",
    },
    {
      name: "Tailwind CSS",
      icon: RiTailwindCssFill,
      color: "#06B6D4",
      size: 60,
      render: "icon",
    },
    {
      name: "JavaScript",
      icon: IoLogoJavascript,
      color: "#F7DF1E",
      size: 60,
      render: "icon",
    },
    {
      name: "TypeScript",
      icon: BiLogoTypescript,
      color: "#3178C6",
      size: 75,
      render: "icon",
    },
    {
      name: "React",
      icon: FaReact,
      color: "#61DAFB",
      size: 60,
      render: "icon",
    },
    {
      name: "Node.js",
      icon: FaNodeJs,
      color: "#339933",
      size: 60,
      render: "icon",
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      color: "#47A248",
      size: 60,
      render: "icon",
    },
    {
      name: "PostgreSQL",
      icon: BiLogoPostgresql,
      color: "#336791",
      size: 60,
      render: "icon",
    },
    {
      name: "Git",
      icon: FaGitAlt,
      color: "#E34F26",
      size: 65,
      render: "icon",
    },
  ],
  Experience: [
    {
      name: "Next.js",
      icon: RiNextjsFill,
      color: "#ffffff",
      size: 60,
      render: "icon",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      size: 60,
      render: "image",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      size: 60,
      render: "image",
    },
    {
      name: "MySQL",
      icon: GrMysql,
      color: "#4479A1",
      size: 60,
      render: "icon",
    },
    {
      name: "Express.js",
      icon: SiExpress,
      color: "#ffffff",
      size: 60,
      render: "icon",
    },
    {
      name: "AWS",
      icon: "https://skillicons.dev/icons?i=aws",
      size: 60,
      render: "image",
    },
  ],
};
