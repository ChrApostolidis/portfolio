import MainButton from "../components/MainButton";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

interface HeroSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div
      id="Hero"
      className="flex flex-col justify-center items-center gap-4 pt-25 lg:pt-0"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-5xl text-center tracking-wider lg:text-7xl">
          I'm Christos Apostolidis
        </h1>
        <h2 className="text-3xl lg:text-4xl tracking-wide">Web Developer</h2>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-lg lg:text-xl text-center text-text-main">
          I love turning complex ideas to working web experiences.
        </p>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <MainButton
          className="bg-primary hover:bg-[#4F96F0] text-black border-black"
          onClick={() => onNavigate && onNavigate("Contact")}
        >
          <a href="#Contact">Contact Me</a>
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
            href="https://www.linkedin.com/in/xristos-apostolidis-5aa0912ab/"
          >
            <FaLinkedin
              size={30}
              className="hover:text-primary cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
