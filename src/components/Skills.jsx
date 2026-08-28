import Section, { Reveal } from './Section'
import { skillGroups } from '../data/content'

export default function Skills() {
  return (
    <Section
      id="skills"
      dark
      eyebrow="Expertise"
      title="Core competencies."
      intro="Clinical training, specialized modalities and wellness programming — the full range of care from acute treatment through long-term prevention."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.07}>
            <div className="group h-full rounded-2xl border border-ink-100/12 bg-ink-900/50 p-8 transition-colors hover:border-sage-400/40">
              <h3 className="font-display text-2xl font-semibold text-ink-50">
                {group.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-100/55">
                {group.blurb}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-sage-400/25 bg-sage-400/[0.07] px-3.5 py-1.5 text-sm text-sage-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
