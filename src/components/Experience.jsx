import Section, { Reveal } from './Section'
import { experience } from '../data/content'

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Clinical and wellness practice."
      intro="Hospital rehabilitation, developmental care and fitness programming across three settings in India and the United States."
    >
      <div className="relative">
        {/* Timeline spine */}
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-ink-900/12 md:left-[calc(11rem+7px)]" />

        <div className="space-y-16">
          {experience.map((job, i) => (
            <Reveal key={`${job.org}-${job.period}`} delay={i * 0.06}>
              <article className="relative grid gap-6 pl-10 md:grid-cols-[11rem_1fr] md:gap-10 md:pl-0">
                <span className="absolute top-2 left-0 h-3.5 w-3.5 rounded-full border-2 border-sage-500 bg-ink-50 md:left-[11rem]" />

                <p className="text-sm font-semibold tracking-wide text-sage-600 md:pt-0.5 md:text-right md:pr-10">
                  {job.period}
                </p>

                <div className="md:pl-10">
                  <h3 className="font-display text-2xl font-semibold">
                    {job.role}
                  </h3>
                  <p className="mt-1.5 text-ink-500">
                    {job.org} <span className="text-ink-300">·</span>{' '}
                    {job.location}
                  </p>

                  <ul className="mt-6 space-y-3.5">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-6 leading-relaxed text-ink-700"
                      >
                        <span className="absolute top-[0.65em] left-0 h-1.5 w-1.5 rounded-full bg-sage-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
