"use client";

import { useTranslations } from "next-intl";

const skills = ["Next.js", "React", "TypeScript", "CSS", "Python", "Django", "C#", "ASP.NET Core", "Node.js", "REST APIs", "SQL", "PostgreSQL"];

export function SkillsCarousel() {
  const t = useTranslations();

  return <div className="skills-carousel">
    <div className="skills-window" dir="ltr">
      <div className="skills-track">
        {[0, 1].map((copy) => <ul className="skills-group" key={copy}
          aria-label={copy === 0 ? t("skillsLabel") : undefined}
          aria-hidden={copy === 1 ? true : undefined}>
          {skills.map((skill) => <li key={skill}><span>{skill}</span><span className="skill-divider" aria-hidden="true">✦</span></li>)}
        </ul>)}
      </div>
    </div>
  </div>;
}
