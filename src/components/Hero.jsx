import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { profile, stats } from '../data/content'

// The 3D scene is the heaviest thing on the page — keep it out of the
// initial bundle so text paints immediately.
const Scene3D = lazy(() => import('./Scene3D'))

const fade = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink-950"
    >
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Scrim keeps the copy readable over the moving scene. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      {/* On narrow screens the scene sits directly behind the copy, so add a vertical scrim too. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/55 to-ink-950/85 md:hidden" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-32 sm:px-10">
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-sage-400/30 bg-sage-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sage-400" />
          Open to full-time roles
        </motion.p>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="max-w-3xl font-display text-5xl leading-[1.03] font-semibold text-ink-50 sm:text-6xl lg:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-xl text-ink-100/85 sm:text-2xl"
        >
          {profile.title} &amp; MS Kinesiology candidate in {profile.location}.{' '}
          <span className="text-sage-400">{profile.tagline}</span>
        </motion.p>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="rounded-full bg-sage-500 px-7 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-sage-400"
          >
            Get in touch
          </a>
          <a
            href={`${import.meta.env.BASE_URL}${profile.resumeFile}`}
            download
            className="rounded-full border border-ink-100/25 px-7 py-3 text-sm font-semibold text-ink-50 transition-colors hover:border-sage-400 hover:text-sage-400"
          >
            Download résumé
          </a>
        </motion.div>

        <motion.dl
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-20 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 border-t border-ink-100/15 pt-10 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-3xl font-semibold text-sage-400">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm leading-snug text-ink-100/65">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
