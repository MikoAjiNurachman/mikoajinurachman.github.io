"use client"

import { Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

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

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 sm:py-36 px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight"
          >
            Professional <span className="text-gradient italic font-light">journey</span>
          </motion.h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto" />
        </div>

        <div className="relative">
          {/* Soft vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={cn(
                    "w-full md:w-[46%] mb-8 md:mb-0 pl-12 md:pl-0",
                    index % 2 === 0 ? "md:order-1 md:text-right" : "md:order-3 md:text-left md:ml-auto"
                  )}
                >
                  <div
                    className={cn(
                      "group p-6 sm:p-8 rounded-3xl glass gradient-border hover:bg-foreground/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10",
                      index % 2 === 0 ? "md:mr-4" : "md:ml-4"
                    )}
                  >
                    <div
                      className={cn(
                        "flex flex-col gap-2 mb-5",
                        index % 2 === 0 ? "md:items-end" : "md:items-start"
                      )}
                    >
                      <div className="flex items-center gap-2 text-primary/90 font-mono text-[10px] tracking-[0.2em] uppercase">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-gradient transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-medium text-foreground/70">{exp.company}</p>
                    </div>

                    <ul
                      className={cn(
                        "space-y-2.5 mb-6 text-sm text-foreground/65 leading-relaxed font-light",
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      )}
                    >
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-2 md:block">
                          <span
                            className={cn(
                              "text-primary md:hidden shrink-0",
                              index % 2 === 0 ? "order-2" : "order-1"
                            )}
                          >
                            ◆
                          </span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className={cn(
                        "flex flex-wrap gap-1.5",
                        index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      )}
                    >
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[10px] font-medium tracking-wider bg-primary/8 text-primary/90 rounded-full border border-primary/15"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Center dot */}
                <div className="absolute z-10 left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2">
                  <div className="relative w-4 h-4">
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-md animate-pulse" />
                    <div className="relative w-4 h-4 rounded-full bg-background border border-primary/60 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary to-accent" />
                    </div>
                  </div>
                </div>

                {/* Spacer */}
                <div
                  className={cn(
                    "hidden md:block w-[46%]",
                    index % 2 === 0 ? "order-3" : "order-1"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
