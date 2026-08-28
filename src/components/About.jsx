import Section, { Reveal } from './Section'
import { profile } from '../data/content'

const pillars = [
  {
    title: 'Assess',
    body: 'Comprehensive evaluations that pinpoint the real source of pain and limitation, not just the symptom.',
  },
  {
    title: 'Treat',
    body: 'Manual therapy and evidence-based modalities delivered with careful attention to each patient\u2019s tolerance.',
  },
  {
    title: 'Educate',
    body: 'Home programs and clear explanations so patients and families can carry recovery forward on their own.',
  },
]

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Rehabilitation grounded in listening first."
    >
      <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <p className="text-lg leading-relaxed text-ink-700">{profile.summary}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            {[profile.location, 'BPT', 'MS Kinesiology 2026', 'CPR Certified'].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink-900/10 bg-white px-4 py-2 text-sm font-medium text-ink-700"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </Reveal>

        <div className="space-y-px overflow-hidden rounded-2xl bg-ink-900/10">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="bg-white p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm font-semibold text-sage-600">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl font-semibold">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-3 leading-relaxed text-ink-500">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
