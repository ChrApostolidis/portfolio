import MainButton from "./MainButton";

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-7xl">I'm Christos Apostolidis</h1>
        <h2 className="text-4xl">Web Developer</h2>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-lg text-text-main">I love turning complex ideas to working web experiences.</p>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <MainButton className="bg-primary hover:bg-secondary border-black">Contact Me</MainButton>
        <MainButton>Download CV</MainButton>
      </div>
    </div>
  );
}
