import { motion } from 'framer-motion'

/** Section shell: consistent rhythm, eyebrow + heading, and a scroll reveal. */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
  dark = false,
}) {
  return (
    <section
      id={id}
      className={`relative px-6 py-24 sm:px-10 lg:py-32 ${
        dark ? 'bg-ink-950 text-ink-50' : 'bg-ink-50 text-ink-900'
      } ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <p
              className={`mb-4 text-xs font-semibold uppercase tracking-[0.24em] ${
                dark ? 'text-sage-400' : 'text-sage-600'
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-4xl leading-[1.1] font-semibold sm:text-5xl">
            {title}
          </h2>
          {intro && (
            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                dark ? 'text-ink-100/80' : 'text-ink-700'
              }`}
            >
              {intro}
            </p>
          )}
        </motion.div>

        <div className="mt-14">{children}</div>
      </div>
    </section>
  )
}

/** Reveal wrapper for individual items inside a section. */
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
