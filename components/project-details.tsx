import { LanguageSwitcher } from "./language-switcher";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "../i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import type { PortfolioProject } from "./project-card";
import { projects } from "../lib/projects";

export async function ProjectDetails({ project: p, locale }: { project: PortfolioProject; locale: string }) {
  const t = await getTranslations({ locale });
  const featured = projects.filter(project => project.featured);
  const next = featured[(featured.findIndex(project => project.id === p.id) + 1) % featured.length];
  const titleUrl = p.liveUrl ?? p.repoUrl;
  return <>
    <div className="aurora" aria-hidden="true" />
    <a className="skip" href="#project-main">{t("skip")}</a>
    <header className="header project-header wrap">
      <Link className="brand" href="/"><span className="terminal" aria-hidden="true">&gt;_</span>{t("brand")}</Link>
      <div className="tools">
        <LanguageSwitcher locale={locale} href={`/projects/${p.id}/`} />
        <ThemeToggle label={t("theme")} />
      </div>
    </header>
    <main id="project-main" className="project-detail wrap">
      <Link className="text-link" href="/#projects"><span aria-hidden="true">←</span>{t("backToProjects")}</Link>
      <div className="case-study-intro">
        <p className="eyebrow">{t("caseStudy.label")}</p>
        <h1>{titleUrl ? <a className="project-title-link" href={titleUrl} target="_blank" rel="noopener noreferrer">{t(`projects.${p.id}.title`)} <span aria-hidden="true">↗</span></a> : t(`projects.${p.id}.title`)}</h1>
        <p className="intro">{t(`projects.${p.id}.description`)}</p>
      </div>
      <ul className="case-study-tags project-technologies" dir="ltr" aria-label={t("technologies")}>
        {p.tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
      {p.image && <figure className="case-study-figure"><div className="project-detail-image"><Image src={p.image} alt={t("projectScreenshot", { title: t(`projects.${p.id}.title`) })} fill sizes="(max-width: 720px) calc(100vw - 40px), 1000px" preload /></div><figcaption>{t(`projects.${p.id}.screenshotCaption`)}</figcaption></figure>}
      <div className="case-study-body">
        {(["problem", "contribution", "decision", "outcome"] as const).map((field, index) => <section className="case-study-section" key={field} aria-labelledby={`case-${field}`}>
          <span className="case-study-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div><h2 id={`case-${field}`}>{t(`caseStudy.${field}`)}</h2><p>{t(`projects.${p.id}.${field}`)}</p></div>
        </section>)}
      </div>
      <nav className="case-study-navigation" aria-label={t("caseStudy.next")}>
        <Link className="text-link" href="/#projects">{t("backToProjects")}</Link>
        <Link className="case-study-next" href={`/projects/${next.id}/`}><span>{t("caseStudy.next")}</span><strong>{t(`projects.${next.id}.title`)}<span aria-hidden="true"> ↗</span></strong></Link>
      </nav>
    </main>
  </>;
}
