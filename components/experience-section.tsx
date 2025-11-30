"use client"

import { Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "Software Engineer",
    company: "PT. Paramadaksa Teknologi Nusantara",
    companyShort: "nexSOFT",
    location: "Indonesia",
    period: "2020 - Present",
    description: [
      "Worked on various FMCG projects, including web applications and microservices",
      "Utilized technologies like ReactJS, Go, Docker, Elastic, Redis, WebSocket, and K8s",
      "Built scalable and efficient backend systems using Go and microservices architecture",
      "Implemented CI/CD pipelines and containerization for seamless deployments",
    ],
    technologies: ["Go", "React", "Docker", "Kubernetes", "Redis", "Elasticsearch", "RabbitMQ"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
          Work <span className="text-primary">Experience</span>
        </h2>
        <div className="h-1 w-20 bg-primary mb-8 sm:mb-12 rounded-full mx-auto" />

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-6 sm:pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50" />

              <div className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{exp.title}</h3>
                    <p className="text-primary font-semibold text-sm sm:text-base">{exp.company}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col sm:items-end gap-2 sm:gap-1 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground text-sm sm:text-base flex items-start gap-2">
                      <span className="text-primary mt-1 sm:mt-1.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
