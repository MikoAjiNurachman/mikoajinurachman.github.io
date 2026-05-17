"use client"

import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

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

// Apple dark tile — 4-column accessory-grid pattern: 1:1 image card with
// hairline border, image at sm radius, body labels below.
export function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="tile-dark dark relative w-full py-20 md:py-28 px-6"
    >
      <motion.div
        className="max-w-[1180px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mb-14 md:mb-20 max-w-[720px]">
          <p className="type-eyebrow text-[var(--apple-on-dark-muted)] mb-4">
            Credentials · 05
          </p>
          <h2 className="type-display-lg text-white mb-5">
            Certificates and continuous learning.
          </h2>
          <p className="type-lead-airy text-[var(--apple-on-dark-muted)]">
            Programs and platforms I've completed to stay sharp.
          </p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {certificates.map((cert, index) => (
            <motion.a
              key={index}
              variants={fadeUp}
              href={cert.credentialUrl}
              className="card-utility !p-5 flex flex-col group"
            >
              {/* Image with the system's 8px radius (inner image radius). */}
              <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-sm)] bg-black/40 mb-5">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <p className="type-caption text-[var(--apple-on-dark-muted)] mb-2">
                {cert.issuer} · {cert.date}
              </p>
              <h3 className="type-body-strong text-white mb-4 flex-grow leading-snug">
                {cert.title}
              </h3>
              <span className="text-link-apple type-caption-strong">
                View credential
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
