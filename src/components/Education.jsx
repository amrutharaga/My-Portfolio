import Section, { Reveal } from './Section'
import { certifications, education } from '../data/content'

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education & Credentials"
      title="Training and certification."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.degree} delay={i * 0.07}>
            <div className="h-full rounded-2xl border border-ink-900/10 bg-white p-8">
              <p className="text-sm font-semibold text-sage-600">{item.period}</p>
              <h3 className="mt-4 font-display text-2xl leading-snug font-semibold">
                {item.degree}
              </h3>
              <p className="mt-3 text-ink-500">
                {item.school}
                <br />
                <span className="text-ink-300">{item.location}</span>
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <h3 className="mt-20 font-display text-2xl font-semibold">
          Certifications
        </h3>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {certifications.map((cert, i) => {
          const inProgress = cert.status === 'In progress'

          return (
            <Reveal key={cert.name} delay={i * 0.07}>
              <div
                className={`h-full rounded-2xl border p-8 ${
                  inProgress
                    ? 'border-clay-500/40 bg-clay-300/20'
                    : 'border-sage-500/30 bg-sage-200/30'
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-sage-600">
                    {cert.period}
                  </span>
                  {cert.status && (
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${
                        inProgress
                          ? 'bg-clay-500/20 text-clay-500'
                          : 'bg-sage-500/20 text-sage-600'
                      }`}
                    >
                      {cert.status}
                    </span>
                  )}
                </div>

                <h4 className="mt-4 font-display text-xl leading-snug font-semibold">
                  {cert.name}
                </h4>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
