import TechStackCard from "./TechStackCard";

type ProjectCardProps = {
  url: string;
  title: string;
  description: string;
  techStack: string[];
  demoLink: string;
  githubLink: string;
  alingLeftOrRight: "left" | "right";
};

export default function ProjectCard({
  url,
  title,
  description,
  techStack,
  demoLink,
  githubLink,
  alingLeftOrRight,
}: ProjectCardProps) {
  return (
    <>
      {alingLeftOrRight === "left" ? (
        <>
          <div className="relative max-w-lg mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/20 to-transparent rounded-2xl blur-2xl"></div>
            <img
              className="relative w-full rounded-2xl shadow-xl border border-white/10"
              src={url}
              alt={`Image of the ${title}`}
            />
          </div>

          <div className="space-y-6 text-center lg:text-left">
            <h4 className="text-3xl font-bold tracking-tight">{title}</h4>

            <p className="text-gray-400 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {techStack.map((techStack) => (
                <TechStackCard key={techStack} techStack={techStack} />
              ))}
            </div>

            <div className="flex gap-4 justify-center lg:justify-start pt-2">
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/80 text-black font-semibold hover:bg-primary transition"
              >
                View Demo
              </a>

              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white hover:bg-white/5 transition"
              >
                View GitHub
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-6 text-center lg:text-left">
            <h4 className="text-3xl font-bold tracking-tight">{title}</h4>

            <p className="text-gray-400 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {techStack.map((techStack) => (
                <TechStackCard key={techStack} techStack={techStack} />
              ))}
            </div>

            <div className="flex gap-4 justify-center lg:justify-start pt-2">
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/80 text-black font-semibold hover:bg-primary transition"
              >
                View Demo
              </a>

              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-white hover:bg-white/5 transition"
              >
                View GitHub
              </a>
            </div>
          </div>

          <div className="relative max-w-lg mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/20 to-transparent rounded-2xl blur-2xl"></div>
            <img
              className="relative w-full rounded-2xl shadow-xl border border-white/10"
              src={url}
              alt={`Image of the ${title}`}
            />
          </div>
        </>
      )}
    </>
  );
}
