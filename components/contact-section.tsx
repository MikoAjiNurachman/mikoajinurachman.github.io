"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

  return (
    <section id="contact" className="py-28 sm:py-36 px-6 relative overflow-hidden">
      {/* Soft halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side */}
          <div className="lg:sticky lg:top-32">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight leading-[1.05]"
            >
              Let's <span className="text-anime italic font-light">connect.</span>
            </motion.h2>

            <p className="text-foreground/65 lg:text-lg font-light mb-12 max-w-md leading-relaxed">
              Currently open to new opportunities, technical collaborations, or just a virtual coffee
              to talk about{" "}
              <span className="text-foreground/90 underline decoration-primary/40 underline-offset-4">
                system architecture
              </span>
              .
            </p>

            <div className="space-y-4">
              <a
                href="mailto:mikoajin14@gmail.com"
                className="group flex items-center gap-5 p-4 rounded-3xl glass neon-border hover:bg-foreground/5 transition-all hover:-translate-y-0.5"
              >
                <div className="p-3.5 rounded-2xl bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-1">
                    Email Me
                  </p>
                  <p className="text-base font-medium text-foreground">mikoajin14@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-5 p-4 rounded-3xl glass neon-border">
                <div className="p-3.5 rounded-2xl bg-accent/15 text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-1">
                    Based In
                  </p>
                  <p className="text-base font-medium text-foreground">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-12 px-1">
              {[
                { icon: Github, href: "https://github.com/mikoajinurachman" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/miko-nurachman-9927a4369/" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="p-3.5 rounded-2xl glass neon-border hover:bg-primary/10 hover:text-primary transition-all hover:-translate-y-0.5"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-[2rem] glass-strong neon-border shadow-2xl shadow-primary/10 relative"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 ml-1">
                  Full Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-foreground/5 border-foreground/10 focus:border-primary/50 focus:bg-foreground/8 h-13 rounded-2xl px-4 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 ml-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-foreground/5 border-foreground/10 focus:border-primary/50 focus:bg-foreground/8 h-13 rounded-2xl px-4 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 ml-1">
                  Your Message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-foreground/5 border-foreground/10 focus:border-primary/50 focus:bg-foreground/8 min-h-[160px] rounded-2xl p-4 transition-colors"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground text-base font-semibold hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <AnimatePresence>
              {submitStatus !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "absolute inset-0 z-20 rounded-[2rem] backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center",
                    submitStatus === "success"
                      ? "bg-primary/85 text-primary-foreground"
                      : "bg-destructive/85 text-destructive-foreground"
                  )}
                >
                  {submitStatus === "success" ? (
                    <>
                      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <h3 className="text-3xl font-semibold mb-2">Message Sent!</h3>
                      <p className="opacity-90 font-light">I'll get back to you as soon as possible.</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl font-semibold">Something went wrong.</h3>
                      <p className="mt-2 font-light">Please try reaching out via email directly.</p>
                      <Button
                        variant="outline"
                        className="mt-6 font-medium rounded-full"
                        onClick={() => setSubmitStatus("idle")}
                      >
                        Try Again
                      </Button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-28 pt-10 border-t border-foreground/8 flex flex-col md:flex-row items-center justify-between gap-6 text-foreground/50">
          <p className="text-xs font-mono tracking-tight">
            © {new Date().getFullYear()} MIKO AJI NURACHMAN — AI NATIVE ENGINEER
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
            <a href="#home" className="hover:text-primary transition-colors">
              Top
            </a>
            <a
              href="https://github.com/mikoajinurachman"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/miko-nurachman-9927a4369/"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
