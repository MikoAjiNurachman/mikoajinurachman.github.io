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
    image: "/placeholder.jpg"
  },
  {
    title: "Enterprise Banking Middleware",
    description:
      "Engineered a critical integration layer connecting modern web portals to legacy IBM core systems. Specialized in ISO8583 message parsing and high-security TCP/IP communication.",
    technologies: ["Go", "IBM MQ", "ACE", "Docker", "TCP/IP"],
    github: "https://github.com/mikoajinurachman",
    live: "#",
    featured: true,
    image: "/placeholder.jpg"
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
    description: "Interactive real-time monitoring dashboard with WebSocket integration for tracking financial health and system metrics.",
    technologies: ["React", "TypeScript", "Recharts", "Tailwind"],
    github: "https://github.com/mikoajinurachman",
    live: "#",
    featured: false,
  },
]

export function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  }

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
            >
              Selected <span className="text-primary italic">Engineering</span> Works
            </motion.h2>
            <p className="text-muted-foreground lg:text-lg font-light">
              A collection of systems architecture, middleware integration, and frontend experiences I've built over the years.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="https://github.com/mikoajinurachman" target="_blank" className="text-primary font-bold flex items-center gap-2 group border-b border-primary/20 pb-1">
              View All on GitHub <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative bg-background border border-white/5 rounded-3xl overflow-hidden hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
            >
              <div className="p-8 sm:p-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-3 rounded-2xl bg-secondary/50 border border-white/5 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors duration-500">
                    <Folder className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} className="text-muted-foreground/60 hover:text-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={project.live} className="text-muted-foreground/60 hover:text-primary transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground/80 font-light leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-secondary/30 text-muted-foreground/80 rounded-full border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Subtle hover background effect */}
              <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
