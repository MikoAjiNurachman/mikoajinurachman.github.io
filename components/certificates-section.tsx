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
    <section id="certificates" className="py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
          >
            Certificates & <span className="text-primary italic">Learning</span>
          </motion.h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-secondary/10 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Certificate Image/Placeholder */}
              <div className="relative h-48 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent pointer-events-none" />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 right-4 p-2 rounded-xl bg-background/80 backdrop-blur-md border border-white/10 shadow-lg">
                   <Award className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{cert.issuer}</span>
                </div>

                <h3 className="font-bold text-lg mb-6 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {cert.date}
                  </div>
                  <a
                    href={cert.credentialUrl}
                    className="p-2 rounded-full hover:bg-primary/10 text-primary transition-all duration-300"
                    aria-label="View credential"
                  >
                    <ExternalLink className="w-4 h-4" />
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
