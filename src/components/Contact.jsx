import Section, { Reveal } from './Section'
import { profile } from '../data/content'

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`,
  },
  {
    label: 'LinkedIn',
    value: profile.linkedinLabel,
    href: profile.linkedin,
    external: true,
  },
  {
    label: 'Location',
    value: profile.location,
  },
]

export default function Contact() {
  return (
    <Section
      id="contact"
      dark
      eyebrow="Contact"
      title={`Let’s talk about your team.`}
      intro="Available for full-time physical therapy, rehabilitation and wellness roles in the Greenville, SC area and beyond."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {channels.map((channel, i) => {
          const inner = (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage-400">
                {channel.label}
              </p>
              <p className="mt-3 font-display text-xl break-words text-ink-50 sm:text-2xl">
                {channel.value}
              </p>
            </>
          )

          return (
            <Reveal key={channel.label} delay={i * 0.06}>
              {channel.href ? (
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                  className="block h-full rounded-2xl border border-ink-100/12 bg-ink-900/50 p-8 transition-colors hover:border-sage-400/50 hover:bg-ink-900/80"
                >
                  {inner}
                </a>
              ) : (
                <div className="h-full rounded-2xl border border-ink-100/12 bg-ink-900/50 p-8">
                  {inner}
                </div>
              )}
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col items-start gap-6 rounded-2xl border border-sage-400/25 bg-sage-400/[0.07] p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-ink-100/80">
            Prefer the full document? Download the complete résumé with detailed
            clinical experience and coursework.
          </p>
          <a
            href={`${import.meta.env.BASE_URL}${profile.resumeFile}`}
            download
            className="shrink-0 rounded-full bg-sage-500 px-7 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-sage-400"
          >
            Download résumé
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
