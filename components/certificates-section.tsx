"use client"

import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const certificates = [
  {
    title: "Go (Golang) Programming",
    issuer: "Udemy",
    date: "2023",
    credentialUrl: "https://github.com/mikoajinurachman",
    image: "/golang-programming-certificate.jpg",
  },
  {
    title: "Docker & Kubernetes",
    issuer: "Coursera",
    date: "2022",
    credentialUrl: "#",
    image: "/docker-kubernetes-certification.jpg",
  },
  {
    title: "React Advanced Patterns",
    issuer: "Frontend Masters",
    date: "2022",
    credentialUrl: "#",
    image: "/react-advanced-certification.jpg",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2021",
    credentialUrl: "#",
    image: "/aws-cloud-certification.jpg",
  },
]

export function CertificatesSection() {
  return (
    <section id="certificates" className="py-28 sm:py-36 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight"
          >
            Certificates &amp; <span className="text-anime italic font-light">learning</span>
          </motion.h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative glass neon-border rounded-3xl overflow-hidden hover:bg-foreground/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/30 to-transparent" />

                <div className="absolute top-3 right-3 p-2 rounded-2xl glass-strong">
                  <Award className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="p-6 -mt-2 relative">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-[0.2em]">
                    {cert.issuer}
                  </span>
                </div>

                <h3 className="font-semibold text-base mb-5 text-foreground group-hover:text-anime transition-colors leading-snug">
                  {cert.title}
                </h3>

                <div className="flex items-center justify-between pt-4 border-t border-foreground/8">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-foreground/50">
                    <Calendar className="w-3 h-3" />
                    {cert.date}
                  </div>
                  <a
                    href={cert.credentialUrl}
                    className="p-2 rounded-full hover:bg-primary/10 text-primary transition-all duration-300"
                    aria-label="View credential"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
