import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/content'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-900/10 bg-ink-50/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#top"
          className={`font-display text-lg font-semibold tracking-tight transition-colors ${
            scrolled ? 'text-ink-900' : 'text-ink-50'
          }`}
        >
          Amrutha <span className="text-sage-500">R.</span> Kankipati
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-sage-500 ${
                  scrolled ? 'text-ink-700' : 'text-ink-100'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`${import.meta.env.BASE_URL}${profile.resumeFile}`}
              download
              className="rounded-full bg-sage-500 px-5 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-sage-400"
            >
              Résumé
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className={`md:hidden ${scrolled ? 'text-ink-900' : 'text-ink-50'}`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-900/10 bg-ink-50/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-ink-700 hover:bg-sage-200/50"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`${import.meta.env.BASE_URL}${profile.resumeFile}`}
                download
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-sage-500 px-3 py-2.5 text-center text-base font-semibold text-ink-950"
              >
                Download Résumé
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
