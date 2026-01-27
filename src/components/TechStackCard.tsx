export default function TechStackCard({ techStack }: { techStack: string }) {
  return (
    <span className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 hover:scale-110 transition cursor-default transform duration-200">
      {techStack}
    </span>
  );
}
