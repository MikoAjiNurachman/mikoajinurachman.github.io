"use client"

import { ExternalLink, Github, Folder, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "FMCG Microservices Platform",
    description:
      "A high-throughput microservices architecture built for the FMCG industry. Integrated real-time inventory management with automated supply chain triggers using Go and RabbitMQ.",
    technologies: ["Go", "Kubernetes", "Redis", "RabbitMQ", "PostgreSQL"],
    github: "https://github.com/mikoajinurachman",
    live: "#",
    featured: true,
  },
  {
    title: "Enterprise Banking Middleware",
    description:
      "Engineered a critical integration layer connecting modern web portals to legacy IBM core systems. Specialized in ISO8583 message parsing and high-security TCP/IP communication.",
    technologies: ["Go", "IBM MQ", "ACE", "Docker", "TCP/IP"],
    github: "https://github.com/mikoajinurachman",
    live: "#",
    featured: true,
  },
  {
    title: "Fraud Detection Engine",
    description:
      "Real-time transaction filtering system utilizing Elasticsearch for rapid pattern matching and threat detection in financial transactions.",
    technologies: ["Go", "Elasticsearch", "Redis", "Docker"],
    github: "https://github.com/mikoajinurachman",
    live: "#",
    featured: false,
  },
  {
    title: "FinTech Dashboard",
    description:
      "Interactive real-time monitoring dashboard with WebSocket integration for tracking financial health and system metrics.",
    technologies: ["React", "TypeScript", "Recharts", "Tailwind"],
    github: "https://github.com/mikoajinurachman",
    live: "#",
    featured: false,
  },
]

export function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const cardVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section id="projects" className="py-28 sm:py-36 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight"
            >
              Selected <span className="text-gradient italic font-light">engineering</span> works
            </motion.h2>
            <p className="text-foreground/60 lg:text-lg font-light">
              A collection of systems architecture, middleware integration, and frontend experiences
              I've built over the years.
            </p>
          </div>
          <motion.a
            href="https://github.com/mikoajinurachman"
            target="_blank"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass gradient-border text-primary text-sm font-medium hover:bg-primary/10 transition-colors group whitespace-nowrap"
          >
            View All on GitHub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative glass gradient-border rounded-3xl overflow-hidden hover:bg-foreground/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Hover aurora */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,oklch(0.80_0.14_295/0.15),transparent_60%),radial-gradient(circle_at_70%_80%,oklch(0.85_0.10_195/0.12),transparent_60%)]" />

              <div className="relative p-8 sm:p-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-3 rounded-2xl glass gradient-border group-hover:bg-primary/10 transition-colors duration-500">
                    <Folder className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      className="p-2 rounded-full text-foreground/50 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.live}
                      className="p-2 rounded-full text-foreground/50 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-foreground group-hover:text-gradient transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-foreground/65 font-light leading-relaxed mb-8 flex-grow text-sm sm:text-base">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] font-medium tracking-wider bg-foreground/5 text-foreground/70 rounded-full border border-foreground/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
