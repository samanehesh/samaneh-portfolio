import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "../i18n/navigation";

export type PortfolioProject = {
  id: string;
  art: string;
  tags: readonly string[];
  repoUrl: string | null;
  liveUrl: string | null;
  image: string | null;
};


export async function ProjectCard({ project: p, featured = false }: { project: PortfolioProject; index?: number; featured?: boolean }) {
  const t = await getTranslations();
  return <article className={`project project-preview${featured ? " featured-project" : ""}`}>
    <Link className="project-card-link" href={`/projects/${p.id}/`} aria-label={t(`projects.${p.id}.title`)}>
      <div className="project-gallery-image">
        {p.image && <Image src={p.image} alt={t("projectScreenshot", { title: t(`projects.${p.id}.title`) })} fill sizes="(max-width: 720px) calc(100vw - 40px), 550px" />}

        <span className="project-gallery-arrow" aria-hidden="true">↗</span>
      </div>

    </Link>
  </article>;
}
