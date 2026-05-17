"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
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

// Apple parchment tile — split layout: contact card on the left, form on the
// right. Form uses native inputs with hairline borders (no glass, no glow).
export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "88e66dea-d0b4-4055-a1ee-7d699379ca7c",
          ...formData,
          subject: `Portfolio Contact: ${formData.name}`,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const inputClass =
    "w-full h-12 px-4 rounded-[var(--radius-md)] bg-white border border-[var(--apple-hairline)] type-body-apple text-[var(--apple-ink)] placeholder:text-[var(--apple-ink-muted-48)] focus:outline-none focus:border-[var(--apple-primary)] transition-colors"

  return (
    <section
      id="contact"
      className="tile-parchment relative w-full py-20 md:py-28 px-6"
    >
      <motion.div
        className="max-w-[1180px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mb-14 md:mb-20 max-w-[820px]">
          <p className="type-eyebrow text-[var(--apple-ink-muted-48)] mb-4">
            Contact · 06
          </p>
          <h2 className="type-display-lg text-[var(--apple-ink)] mb-5">
            Let's connect.
          </h2>
          <p className="type-lead-airy text-[var(--apple-ink-muted-80)]">
            Open to new opportunities, technical collaborations, or a virtual coffee
            on system architecture.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 items-start">
          {/* Left — quick channels */}
          <motion.div variants={fadeUp} className="space-y-3">
            <a
              href="mailto:mikoajin14@gmail.com"
              className="card-utility flex items-center gap-4 !p-5 group"
            >
              <Mail className="w-5 h-5 text-[var(--apple-primary)] shrink-0" />
              <div>
                <p className="type-caption text-[var(--apple-ink-muted-48)]">Email</p>
                <p className="type-body-strong text-[var(--apple-ink)]">mikoajin14@gmail.com</p>
              </div>
            </a>

            <div className="card-utility flex items-center gap-4 !p-5">
              <MapPin className="w-5 h-5 text-[var(--apple-primary)] shrink-0" />
              <div>
                <p className="type-caption text-[var(--apple-ink-muted-48)]">Based in</p>
                <p className="type-body-strong text-[var(--apple-ink)]">South Tangerang, Indonesia</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              {[
                { icon: Github, href: "https://github.com/mikoajinurachman", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/miko-nurachman-9927a4369/", label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="btn-icon-circular"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form — Apple search-input grammar applied to text fields, ghost
              pill submit, no shadow on the container. */}
          <motion.div variants={fadeUp} className="card-utility !p-7 md:!p-9 relative">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="type-caption-strong text-[var(--apple-ink)]">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="type-caption-strong text-[var(--apple-ink)]">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="type-caption-strong text-[var(--apple-ink)]">
                  Your message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className={cn(inputClass, "h-auto py-3 resize-y min-h-[140px]")}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-pill w-full md:w-auto"
                disabled={isSubmitting}
                // Prevent the browser from auto-focusing the button on mouse-
                // down. Click still fires (mousedown→mouseup→click). This kills
                // any post-click focus halo that some browsers persist.
                onMouseDown={(e) => e.preventDefault()}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Send message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {submitStatus !== "idle" && (
              <div
                className={cn(
                  "mt-5 flex items-center gap-3 type-body-apple px-4 py-3 rounded-[var(--radius-md)]",
                  submitStatus === "success"
                    ? "bg-[var(--apple-primary)] text-white"
                    : "bg-[var(--destructive)] text-white",
                )}
              >
                {submitStatus === "success" ? (
                  <>
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    Message sent — I'll get back to you as soon as possible.
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    Something went wrong. Please try email directly.
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
