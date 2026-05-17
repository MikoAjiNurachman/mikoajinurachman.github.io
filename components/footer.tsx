"use client"

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Work",
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Profile", href: "#about" },
      { label: "Certificates", href: "#certificates" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Email", href: "mailto:mikoajin14@gmail.com" },
      { label: "GitHub", href: "https://github.com/mikoajinurachman" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/miko-nurachman-9927a4369/" },
    ],
  },
]

// Apple footer: parchment surface, dense link columns, fine-print legal row.
// Relaxed line-height (handled via .type-body-apple) makes the dense columns
// breathe — the spec's signature footer behavior.
export function Footer() {
  return (
    <footer className="tile-parchment border-t border-[var(--apple-hairline)] w-full px-6 pt-14 pb-10">
      <div className="max-w-[1180px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <p className="type-body-strong text-[var(--apple-ink)] mb-2">Miko Aji Nurachman</p>
            <p className="type-caption text-[var(--apple-ink-muted-48)] leading-relaxed">
              AI Native Engineer building resilient banking and fintech systems with
              Go, React, and enterprise middleware.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="type-caption-strong text-[var(--apple-ink)] mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="type-caption text-[var(--apple-ink-muted-80)] hover:text-[var(--apple-primary)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[var(--apple-hairline)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="type-fine-print text-[var(--apple-ink-muted-48)]">
            Copyright © {new Date().getFullYear()} Miko Aji Nurachman. All rights reserved.
          </p>
          <p className="type-fine-print text-[var(--apple-ink-muted-48)]">
            Built with Next.js, React Three Fiber, and lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  )
}
