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

const experiences = [
  {
    title: "Middleware Developer",
    company: "PT. Bank CIMB Niaga Tbk",
    period: "Feb 2025 — Present",
    description: [
      "Architecting enterprise middleware solutions connecting modern digital channels to core banking mainframes.",
      "Developing high-performance integration flows using IBM ACE (App Connect Enterprise) and MQ.",
      "Implementing resilient TCP/IP and HTTP/REST communication protocols for financial message routing.",
      "Ensuring 99.99% availability of the middleware layer for mission-critical banking transactions.",
    ],
    technologies: ["IBM ACE", "IBM MQ", "TCP/IP", "ESQL", "Java", "Core Banking"],
  },
  {
    title: "Software Developer",
    company: "PT. Bringin Inti Teknologi (BIT)",
    period: "Oct 2024 — Feb 2025",
    description: [
      "Engineered a real-time Fraud Detection System to filter and monitor suspicious banking transactions.",
      "Built a rule-based engine for rapid risk assessment and transaction analysis across various payment gateways.",
      "Collaborated with security teams to identify fraud patterns and implement preventive filtering logic.",
    ],
    technologies: ["Java", "SQL", "Elasticsearch", "Fraud Filtering", "Banking Systems"],
  },
  {
    title: "Software Engineer",
    company: "PT. Paramadaksa Teknologi Nusantara (nexSOFT)",
    period: "Sep 2020 — Sep 2024",
    description: [
      "Led the development of scalable microservices for a large-scale FMCG distribution platform.",
      "Optimized system performance using Redis caching and RabbitMQ message brokering.",
      "Managed containerized deployments across Kubernetes clusters, ensuring horizontal scalability.",
      "Built real-time data sync services using Go and WebSockets for inventory management.",
    ],
    technologies: ["Go", "React", "Docker", "Kubernetes", "Redis", "RabbitMQ", "PostgreSQL"],
  },
]

// Apple dark tile — alternating from the previous parchment about-section
// to a near-black surface, providing the section divider through color
// change alone. Inline content: eyebrow, display-lg headline, stack of
// utility cards (one per role).
export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="tile-dark dark relative w-full py-20 md:py-28 px-6"
    >
      <motion.div
        className="max-w-[1180px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mb-14 md:mb-20 max-w-[720px]">
          <p className="type-eyebrow text-[var(--apple-on-dark-muted)] mb-4">
            Timeline · 02
          </p>
          <h2 className="type-display-lg text-white mb-5">
            Professional journey.
          </h2>
          <p className="type-lead-airy text-[var(--apple-on-dark-muted)]">
            Six years across banking middleware, fraud detection, and FMCG-scale microservices.
          </p>
        </motion.div>

        {/* Stack of utility cards — Apple grammar: hairline border, 18px
            radius, 24px padding, no shadow. */}
        <motion.ol variants={stagger} className="space-y-4 md:space-y-5">
          {experiences.map((exp, index) => (
            <motion.li key={index} variants={fadeUp} className="card-utility !p-7 md:!p-9">
              <div className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-10">
                {/* Left meta column */}
                <div>
                  <p className="type-caption text-[var(--apple-on-dark-muted)] mb-3">
                    {exp.period}
                  </p>
                  <h3 className="type-display-md text-white mb-1">
                    {exp.title}
                  </h3>
                  <p className="type-body-apple text-[var(--apple-primary-on-dark)]">
                    {exp.company}
                  </p>
                </div>

                {/* Right content column */}
                <div>
                  <ul className="space-y-2.5 type-body-apple text-[var(--apple-on-dark-muted)] mb-5">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-[var(--apple-primary-on-dark)] shrink-0">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="type-caption text-[var(--apple-on-dark)] bg-white/8 border border-white/10 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {index !== experiences.length - 1 && (
                <div className="mt-6 -mx-7 md:-mx-9 border-b border-white/5" />
              )}
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  )
}
