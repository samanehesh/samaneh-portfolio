import Image from "next/image";
import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { Link, getPathname } from "../i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import type { PortfolioProject } from "./project-card";
import { projects } from "../lib/projects";

export async function ProjectDetails({ project: p, locale }: { project: PortfolioProject; locale: string }) {
  const t = await getTranslations({ locale });
  const otherLocale = locale === "fa" ? "en" : "fa";
  const featured = projects.filter(project => project.featured);
  const next = featured[(featured.findIndex(project => project.id === p.id) + 1) % featured.length];
  return <>
    <a className="skip" href="#project-main">{t("skip")}</a>
    <header className="header project-header wrap">
      <Link className="brand" href="/"><span className="terminal" aria-hidden="true">&gt;_</span>{t("brand")}</Link>
      <div className="tools">
        <NextLink className="language" href={getPathname({ locale: otherLocale, href: `/projects/${p.id}/` })} lang={otherLocale} hrefLang={otherLocale}>{t("switchLanguage")}</NextLink>
        <ThemeToggle label={t("theme")} />
      </div>
    </header>
    <main id="project-main" className="project-detail wrap">
      <Link className="text-link" href="/#projects"><span aria-hidden="true">←</span>{t("backToProjects")}</Link>
      <div className="case-study-intro">
        <p className="eyebrow">{t("caseStudy.label")}</p>
        <h1>{p.liveUrl ? <a className="project-title-link" href={p.liveUrl} target="_blank" rel="noopener noreferrer">{t(`projects.${p.id}.title`)}<span aria-hidden="true"> ↗</span></a> : t(`projects.${p.id}.title`)}</h1>
        <p className="intro">{t(`projects.${p.id}.description`)}</p>
        {p.repoUrl && <div className="project-links"><a className="button secondary" href={p.repoUrl} target="_blank" rel="noopener noreferrer">{t("viewCode")}<span aria-hidden="true">↗</span></a></div>}
      </div>
      <dl className="case-study-facts">
        <div><dt>{t("caseStudy.role")}</dt><dd>{t(`projects.${p.id}.role`)}</dd></div>
        <div><dt>{t("caseStudy.context")}</dt><dd>{t(`projects.${p.id}.context`)}</dd></div>
        <div><dt>{t("technologies")}</dt><dd><ul className="case-study-tags" dir="ltr">{p.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></dd></div>
      </dl>
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
