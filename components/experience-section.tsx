"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, MapPin, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    title: "Software Engineer",
    company: "PT. Paramadaksa Teknologi Nusantara",
    companyShort: "nexSOFT",
    location: "Indonesia",
    period: "Sep 2020 - Sep 2024",
    description: [
      "Worked on various FMCG projects, including web applications and microservices",
      "Utilized technologies like ReactJS, Go, Docker, Elastic, Redis, WebSocket, and K8s",
      "Built scalable and efficient backend systems using Go and microservices architecture",
      "Implemented CI/CD pipelines and containerization for seamless deployments",
    ],
    technologies: ["Go", "React", "Docker", "Kubernetes", "Redis", "Elasticsearch", "RabbitMQ"],
  },
  {
    title: "Software Developer",
    company: "PT. Bimasakti Industri Teknologi",
    companyShort: "BIT",
    location: "Indonesia",
    period: "Oct 2024 - Feb 2025",
    description: [
      "Developed fraud detection and filtering application for banking transactions",
      "Built real-time monitoring system to identify and prevent fraudulent activities",
      "Implemented rule-based engine for transaction analysis and risk assessment",
      "Collaborated with banking clients to understand fraud patterns and improve detection accuracy",
    ],
    technologies: ["Java", "SQL", "Fraud Detection", "Banking Systems", "REST API"],
  },
    {
    title: "Middleware Developer",
    company: "PT. Bank CIMB Niaga Tbk",
    companyShort: "CIMB Niaga",
    location: "Indonesia",
    period: "Feb 2025 - Present",
    description: [
      "Developed middleware applications connecting frontend microservices (channels) to backend core banking systems",
      "Implemented TCP and HTTP connections for seamless communication between services",
      "Worked with IBM products (IBM Integration Bus/ACE, MQ) for enterprise integration",
      "Ensured high availability and reliability of middleware layer for banking transactions",
    ],
    technologies: ["IBM ACE", "IBM MQ", "TCP/IP", "HTTP", "Java", "Core Banking", "Microservices"],
  },
]

export function ExperienceSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [expandedCards, setExpandedCards] = useState<number[]>([0])
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate steps one by one with delay
            experiences.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => (prev.includes(index) ? prev : [...prev, index]))
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    setActiveStep(index)
  }

  return (
    <section id="experience" ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
          Work <span className="text-primary">Experience</span>
        </h2>
        <div className="h-1 w-20 bg-primary mb-8 sm:mb-12 rounded-full mx-auto" />

        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {experiences.map((exp, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveStep(index)
                if (!expandedCards.includes(index)) {
                  setExpandedCards((prev) => [...prev, index])
                }
                // Scroll to the card
                document.getElementById(`exp-${index}`)?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }}
              className="flex items-center gap-1 sm:gap-2 group"
            >
              {/* Step circle */}
              <div
                className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-500",
                  activeStep === index
                    ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/50"
                    : visibleSteps.includes(index)
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground border-2 border-border",
                )}
              >
                {index + 1}
              </div>
              {/* Connector line */}
              {index < experiences.length - 1 && (
                <div
                  className={cn(
                    "w-8 sm:w-16 h-1 rounded-full transition-all duration-500 delay-200",
                    visibleSteps.includes(index + 1) ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex justify-center items-start gap-4 mb-8 -mt-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
              style={{ width: index < experiences.length - 1 ? "calc(2.5rem + 4rem + 0.5rem)" : "2.5rem" }}
            >
              <span
                className={cn(
                  "text-xs font-medium truncate max-w-[80px] transition-colors duration-300",
                  activeStep === index ? "text-primary" : "text-muted-foreground",
                )}
              >
                {exp.companyShort}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-4 sm:space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              id={`exp-${index}`}
              className={cn(
                "relative pl-6 sm:pl-8 border-l-2 transition-all duration-500",
                activeStep === index ? "border-primary" : "border-primary/30",
                visibleSteps.includes(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot with pulse animation */}
              <div
                className={cn(
                  "absolute left-[-9px] top-0 w-4 h-4 rounded-full transition-all duration-300",
                  activeStep === index ? "bg-primary scale-125 shadow-lg shadow-primary/50" : "bg-primary/50",
                )}
              >
                {activeStep === index && (
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                )}
              </div>

              <div
                className={cn(
                  "bg-card border rounded-xl overflow-hidden transition-all duration-300",
                  activeStep === index
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border hover:border-primary/50",
                )}
              >
                {/* Card header - always visible, clickable */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">{exp.title}</h3>
                      <span className="hidden sm:inline text-muted-foreground">at</span>
                      <p className="text-primary font-semibold text-sm sm:text-base">{exp.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
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
                  <div
                    className={cn(
                      "p-2 rounded-full transition-all duration-300",
                      expandedCards.includes(index) ? "bg-primary/20 rotate-180" : "bg-muted",
                    )}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                </button>

                {/* Card content - expandable */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    expandedCards.includes(index) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-border/50 pt-4">
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground text-sm sm:text-base flex items-start gap-2"
                          style={{
                            animationDelay: `${i * 100}ms`,
                            animation: expandedCards.includes(index) ? "fadeInUp 0.3s ease forwards" : "none",
                            opacity: expandedCards.includes(index) ? 1 : 0,
                          }}
                        >
                          <span className="text-primary mt-1 sm:mt-1.5">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                          style={{
                            animationDelay: `${i * 50}ms`,
                            animation: expandedCards.includes(index) ? "fadeInUp 0.3s ease forwards" : "none",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
