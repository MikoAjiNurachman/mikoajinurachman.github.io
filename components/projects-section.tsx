"use client"

import { ExternalLink, Github, Folder } from "lucide-react"

const projects = [
  {
    title: "FMCG Microservices Platform",
    description:
      "Built scalable microservices architecture for FMCG industry handling high-volume transactions with real-time inventory management.",
    technologies: ["Go", "Kubernetes", "Redis", "RabbitMQ", "PostgreSQL"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Real-time Dashboard",
    description:
      "Interactive analytics dashboard with WebSocket integration for real-time data visualization and monitoring.",
    technologies: ["React", "TypeScript", "WebSocket", "Elasticsearch", "Docker"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "API Gateway Service",
    description:
      "High-performance API gateway built with Go, handling authentication, rate limiting, and request routing.",
    technologies: ["Go", "Redis", "Docker", "Nginx"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "E-commerce Backend",
    description: "Robust e-commerce backend system with payment integration, order management, and inventory tracking.",
    technologies: ["Go", "PostgreSQL", "Redis", "Docker"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "Mobile App - Android",
    description: "Native Android application built with Kotlin and Jetpack Compose for seamless user experience.",
    technologies: ["Kotlin", "Jetpack Compose", "Room", "Retrofit"],
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "CI/CD Pipeline Automation",
    description:
      "Automated deployment pipelines using GitHub Actions and Kubernetes for continuous integration and delivery.",
    technologies: ["GitHub Actions", "Kubernetes", "Docker", "Helm"],
    github: "#",
    live: "#",
    featured: false,
  },
]

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <div className="h-1 w-20 bg-primary mb-8 sm:mb-12 rounded-full mx-auto" />

        {/* Featured Projects */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-xl p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <Folder className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                <div className="flex gap-2 sm:gap-3">
                  <a
                    href={project.github}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="View GitHub"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href={project.live}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="View Live"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-mono text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <h3 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6 text-muted-foreground">
          Other Noteworthy Projects
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {otherProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-lg p-3 sm:p-4 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="View GitHub"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>

              <h4 className="font-semibold mb-1.5 sm:mb-2 text-foreground group-hover:text-primary transition-colors text-sm">
                {project.title}
              </h4>
              <p className="text-muted-foreground text-xs mb-2 sm:mb-3 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs font-mono text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
