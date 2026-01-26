import MainButton from "../components/MainButton";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function HeroSection() {
  return (
    <div id="Hero" className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-5xl text-center tracking-wider lg:text-7xl">I'm Christos Apostolidis</h1>
        <h2 className="text-3xl lg:text-4xl tracking-wide">Web Developer</h2>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-lg lg:text-xl text-center text-text-main">
          I love turning complex ideas to working web experiences.
        </p>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <MainButton className="bg-primary hover:bg-secondary border-black">
          Contact Me
        </MainButton>
        <div className="flex gap-4">
          <FaGithub size={30} className="hover:text-primary cursor-pointer" />
          <FaLinkedin
            size={30}
            className="hover:text-primary cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
