"use client"

import { Award, ExternalLink, Calendar } from "lucide-react"

const certificates = [
  {
    title: "Go (Golang) Programming",
    issuer: "Udemy",
    date: "2023",
    credentialUrl: "#",
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
    <section id="certificates" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
          Certificates & <span className="text-primary">Achievements</span>
        </h2>
        <div className="h-1 w-20 bg-primary mb-8 sm:mb-12 rounded-full mx-auto" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Certificate Image */}
              <div className="relative h-32 sm:h-40 overflow-hidden">
                <img
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{cert.issuer}</span>
                </div>

                <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                  <a
                    href={cert.credentialUrl}
                    className="text-primary hover:text-primary/80 transition-colors"
                    aria-label="View credential"
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
