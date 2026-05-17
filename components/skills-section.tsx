"use client"

import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const skills = {
  Languages: [
    { name: "Go", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "SQL", level: 85 },
    { name: "Java", level: 75 },
  ],
  Frontend: [
    { name: "React", level: 90 },
    { name: "Next.js", level: 80 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Framer Motion", level: 80 },
  ],
  Infrastructure: [
    { name: "Docker", level: 85 },
    { name: "Kubernetes", level: 80 },
    { name: "Redis", level: 85 },
    { name: "PostgreSQL", level: 85 },
  ],
  Middleware: [
    { name: "IBM MQ", level: 80 },
    { name: "IBM ACE", level: 75 },
    { name: "TCP/IP", level: 80 },
    { name: "RabbitMQ", level: 75 },
  ],
}

// Apple parchment tile — utility card grid (2×2 on tablet+, single column
// on mobile). No 3D decoration; the design spec disallows ornamental WebGL.
export function SkillsSection() {
  return (
    <section
      id="skills"
      className="tile-parchment relative w-full py-20 md:py-28 px-6"
    >
      <motion.div
        className="max-w-[1180px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mb-14 md:mb-20 max-w-[720px]">
          <p className="type-eyebrow text-[var(--apple-ink-muted-48)] mb-4">
            Loadout · 03
          </p>
          <h2 className="type-display-lg text-[var(--apple-ink)] mb-5">
            Technical arsenal.
          </h2>
          <p className="type-lead-airy text-[var(--apple-ink-muted-80)]">
            Languages, frontend, infrastructure, and integration middleware.
          </p>
        </motion.div>

        <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {Object.entries(skills).map(([category, items]) => (
            <motion.div key={category} variants={fadeUp} className="card-utility">
              <h3 className="type-caption-strong text-[var(--apple-ink-muted-48)] uppercase tracking-[0.1em] mb-5 pb-4 border-b border-[var(--apple-divider-soft)]">
                {category}
              </h3>
              <ul className="space-y-3.5">
                {items.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between">
                    <span className="type-body-strong text-[var(--apple-ink)]">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-3">
                      {/* Proficiency bar — single Action Blue, no gradient. */}
                      <div className="h-1 w-24 sm:w-28 bg-[var(--apple-divider-soft)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--apple-primary)] rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="type-caption text-[var(--apple-ink-muted-48)] tabular-nums w-9 text-right">
                        {skill.level}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
