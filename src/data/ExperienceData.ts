import type { ExperienceCardProps } from "../components/ExperienceCard";

export const ExperienceData: ExperienceCardProps[] = [
  {
    role: "Full Stack Developer",
    company: "Ilo Share Your",
    companyLink: "https://ilo.com.gr/",
    type: "Internship",
    period: "Mar 2026 - Sep 2026",
    location: "Thessaloniki, Greece",
    summary:
      "Worked across the full stack on a digital business card and lead capture SaaS used by 5,000+ users, shipping features end to end from database design to UI.",
    highlights: [
      "Redesigned the CRM integrations from a single company wide connection into independent per team integrations, with data isolation and routing logic.",
      "Built a visitor business card scanner that uses the device camera and data extraction to create contacts automatically.",
      "Implemented a dynamic translation system with per card language selection and automatic browser based translation.",
      "Added vCard export so digital cards save directly to a phone's contacts.",
      "Migrated a shared toolbox (email signatures, virtual backgrounds) into personalized per profile tools.",
    ],
    techStack: ["Next.js", "React", "Laravel"],
  },
];
