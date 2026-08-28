import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-ink-100/10 bg-ink-950 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-ink-100/45 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-sage-400"
          >
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-sage-400"
          >
            LinkedIn
          </a>
          <a href="#top" className="transition-colors hover:text-sage-400">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
