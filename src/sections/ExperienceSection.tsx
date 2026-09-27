import ExperienceCard from "../components/ExperienceCard";
import { ExperienceData } from "../data/ExperienceData";

export default function ExperienceSection() {
  return (
    <div id="Experience" className="mt-10 lg:short:mt-0 max-w-5xl">
      <div className="relative flex text-left lg:justify-start items-center ml-4 mb-4 lg:mb-0">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Experience<span className="text-accent text-2xl">.</span>
        </h3>
      </div>
      <div className="mt-6 lg:short:mt-3 lg:mx-20 mx-5 space-y-12">
        {ExperienceData.map((experience) => (
          <ExperienceCard key={experience.company} {...experience} />
        ))}
      </div>
    </div>
  );
}
