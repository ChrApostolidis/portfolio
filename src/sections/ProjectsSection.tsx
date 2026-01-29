import ProjectCard, { type ProjectCardProps } from "../components/ProjectCard";


export default function ProjectsSection({
  projectData,
  showHeader = true,
}: {
  projectData: ProjectCardProps[];
  showHeader: boolean;
}) {
  return (
    <div id="Projects" className="lg:mx-40">
      {showHeader && (
        <div className="relative flex text-left lg:justify-start items-center ml-4 mb-4 lg:mb-0">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            Projects<span className="text-accent text-2xl">.</span>
          </h3>
        </div>
      )}
      <div className="mx-5 lg:mx-20 py-3">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {projectData.map((project) => (
            <ProjectCard
              key={project.title}
              url={project.url}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              demoLink={project.demoLink}
              githubLink={project.githubLink}
              alingLeftOrRight={project.alingLeftOrRight}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
