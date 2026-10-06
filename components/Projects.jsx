'use client'
import Image from 'next/image'
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react'
import { useLanguage } from '@/context/LanguageContext'
import { featuredProject, projects, studies, languageColors, links } from '@/data/content'
import { Reveal } from './Reveal'

function Languages({ items }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
      {items.map(lang => (
        <li key={lang} className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ background: languageColors[lang] }} aria-hidden="true" />
          {lang}
        </li>
      ))}
    </ul>
  )
}

function Stack({ items }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map(item => (
        <li key={item} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
          {item}
        </li>
      ))}
    </ul>
  )
}

function RepoLink({ href, label, title }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${title}`}
      className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
    >
      <GithubLogo size={16} aria-hidden="true" />
      {label}
    </a>
  )
}

function ProjectCard({ project, lang, labels, className = '', tone = 'bg-surface' }) {
  return (
    <Reveal
      as="article"
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line transition-transform duration-500 hover:-translate-y-1 ${tone} ${className}`}
    >
      {project.image && (
        <div className="relative aspect-video overflow-hidden border-b border-line bg-bg">
          <Image
            src={project.image}
            alt={project.imageAlt[lang]}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          <Languages items={project.languages} />
        </div>
        <p className="leading-relaxed text-muted">{project.description[lang]}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-2">
          <Stack items={project.stack} />
          <RepoLink href={project.repo} label={labels.repo} title={project.title} />
        </div>
      </div>
    </Reveal>
  )
}

export function Projects() {
  const { t, lang } = useLanguage()
  const labels = t.projects
  const [ecos, dashboard, api, chekpoint] = projects

  return (
    <section id="projects" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{labels.title}</h2>
          <p className="mt-4 max-w-[60ch] text-muted">{labels.intro}</p>
        </Reveal>

        {/* Featured project */}
        <Reveal
          as="article"
          className="mt-12 grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-12"
        >
          <div className="relative aspect-video border-b border-line lg:col-span-7 lg:aspect-auto lg:min-h-[380px] lg:border-r lg:border-b-0">
            <Image
              src={featuredProject.image}
              alt={featuredProject.imageAlt[lang]}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 p-6 md:p-8 lg:col-span-5">
            <div>
              <p className="text-sm font-medium text-accent">{featuredProject.kicker[lang]}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{featuredProject.title}</h3>
            </div>
            <p className="leading-relaxed text-muted">{featuredProject.description[lang]}</p>
            <Languages items={featuredProject.languages} />
            <Stack items={featuredProject.stack} />
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
              <a
                href={featuredProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {labels.live}
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
              </a>
              <a
                href={featuredProject.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg/40 active:scale-[0.98]"
              >
                <GithubLogo size={16} aria-hidden="true" />
                {labels.repo}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Bento: 4 + 2/2 on the first rows, 2 + 4 on the last */}
        <div className="mt-6 grid gap-6 md:grid-cols-6">
          <ProjectCard project={ecos} lang={lang} labels={labels} className="md:col-span-4 md:row-span-2" />
          <ProjectCard project={dashboard} lang={lang} labels={labels} className="md:col-span-2" tone="bg-accent-soft" />
          <ProjectCard project={api} lang={lang} labels={labels} className="md:col-span-2" />
          <ProjectCard project={chekpoint} lang={lang} labels={labels} className="md:col-span-2" />

          <Reveal className="flex flex-col rounded-2xl border border-dashed border-line p-6 md:col-span-4">
            <h3 className="text-lg font-semibold tracking-tight">{labels.studiesTitle}</h3>
            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {studies.map(study => (
                <li key={study.repo}>
                  <a
                    href={study.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-between gap-3 py-2.5 transition-colors hover:text-accent"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ background: languageColors[study.language] }}
                        aria-hidden="true"
                      />
                      {study.title}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-muted transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-accent hover:underline"
            >
              <GithubLogo size={16} aria-hidden="true" />
              {labels.all}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
