"use client"

import { useState } from "react"
import { Calendar, MapPin, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const experiences = [
  {
    title: "Middleware Developer",
    company: "PT. Bank CIMB Niaga Tbk",
    period: "Feb 2025 - Present",
    description: [
      "Architecting enterprise middleware solutions connecting modern digital channels to core banking mainframes.",
      "Developing high-performance integration flows using IBM ACE (App Connect Enterprise) and MQ.",
      "Implementing resilient TCP/IP and HTTP/REST communication protocols for financial message routing.",
      "Ensuring 99.99% availability of the middleware layer for mission-critical banking transactions."
    ],
    technologies: ["IBM ACE", "IBM MQ", "TCP/IP", "ESQL", "Java", "Core Banking"],
  },
  {
    title: "Software Developer",
    company: "PT. Bringin Inti Teknologi (BIT)",
    period: "Oct 2024 - Feb 2025",
    description: [
      "Engineered a real-time Fraud Detection System to filter and monitor suspicious banking transactions.",
      "Built a rule-based engine for rapid risk assessment and transaction analysis across various payment gateways.",
      "Collaborated with security teams to identify fraud patterns and implement preventive filtering logic."
    ],
    technologies: ["Java", "SQL", "Elasticsearch", "Fraud Filtering", "Banking Systems"],
  },
  {
    title: "Software Engineer",
    company: "PT. Paramadaksa Teknologi Nusantara (nexSOFT)",
    period: "Sep 2020 - Sep 2024",
    description: [
      "Led the development of scalable microservices for a large-scale FMCG distribution platform.",
      "Optimized system performance using Redis caching and RabbitMQ message brokering.",
      "Managed containerized deployments across Kubernetes clusters, ensuring horizontal scalability.",
      "Built real-time data sync services using Go and WebSockets for inventory management."
    ],
    technologies: ["Go", "React", "Docker", "Kubernetes", "Redis", "RabbitMQ", "PostgreSQL"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
          >
            Professional <span className="text-primary italic">Journey</span>
          </motion.h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Vertical Line - Hidden on small, centered on desktop */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-secondary/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-center justify-between">
                
                {/* Side Content Wrapping (Desktop) */}
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={cn(
                    "w-full md:w-[45%] mb-8 md:mb-0",
                    index % 2 === 0 ? "md:order-1 md:text-right" : "md:order-3 md:text-left md:ml-auto"
                  )}
                >
                  <div className={cn(
                    "group p-6 sm:p-8 rounded-[2rem] bg-secondary/20 border border-white/5 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20",
                    index % 2 === 0 ? "md:mr-4" : "md:ml-4"
                  )}>
                    <div className={cn(
                      "flex flex-col gap-2 mb-6",
                      index % 2 === 0 ? "md:items-end" : "md:items-start"
                    )}>
                      <div className="flex items-center gap-2 text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-base font-medium text-muted-foreground">
                        {exp.company}
                      </p>
                    </div>

                    <ul className={cn(
                      "space-y-3 mb-8 text-sm text-muted-foreground/80 leading-relaxed font-light",
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    )}>
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-3 md:block">
                          <span className={cn(
                            "text-primary font-bold md:hidden shrink-0",
                            index % 2 === 0 ? "order-2" : "order-1"
                          )}>▹</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={cn(
                      "flex flex-wrap gap-2",
                      index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                    )}>
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest bg-primary/5 text-primary rounded-full border border-primary/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Center Point (Dot) */}
                <div className={cn(
                  "absolute z-10",
                  "left-4 md:left-1/2",
                  "top-0 md:top-1/2",
                  "-translate-x-1/2 -translate-y-1/2"
                )}>
                  <div className="w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_15px_rgba(0,242,254,0.3)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>

                {/* Empty Side (Desktop Spacer) */}
                <div className={cn(
                  "hidden md:block w-[45%]",
                  index % 2 === 0 ? "order-3" : "order-1"
                )} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
