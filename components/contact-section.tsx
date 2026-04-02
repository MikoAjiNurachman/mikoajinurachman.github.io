"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle, Loader2, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
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
    <section id="contact" className="py-24 sm:py-32 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Call to Action */}
          <div className="lg:sticky lg:top-32">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 tracking-tight"
            >
              Let's <span className="text-primary italic">Connect.</span>
            </motion.h2>
            
            <p className="text-muted-foreground lg:text-xl font-light mb-12 max-w-md leading-relaxed">
              Currently open to new opportunities, technical collaborations, or just a virtual coffee to talk about <span className="text-foreground border-b border-primary/30">system architecture</span>.
            </p>

            <div className="space-y-8">
              <a href="mailto:mikoajin14@gmail.com" className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-secondary/50 transition-colors">
                <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email Me</p>
                  <p className="text-lg font-medium text-foreground">mikoajin14@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-6 p-4 rounded-3xl transition-colors">
                <div className="p-4 rounded-2xl bg-secondary/50">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Based In</p>
                  <p className="text-lg font-medium text-foreground">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-16 px-4">
               {[
                 { icon: Github, href: "https://github.com/mikoajinurachman" },
                 { icon: Linkedin, href: "https://www.linkedin.com/in/miko-nurachman-9927a4369/" }
               ].map((social, i) => (
                 <a 
                   key={i} 
                   href={social.href} 
                   target="_blank" 
                   className="p-4 rounded-2xl bg-secondary/30 hover:bg-primary/10 hover:text-primary border border-white/5 transition-all"
                  >
                   <social.icon className="w-5 h-5" />
                 </a>
               ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-[2.5rem] bg-secondary/20 border border-white/5 backdrop-blur-sm shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/50 border-white/5 focus:border-primary/50 h-14 rounded-2xl"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background/50 border-white/5 focus:border-primary/50 h-14 rounded-2xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background/50 border-white/5 focus:border-primary/50 min-h-[160px] rounded-2xl p-4"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-16 rounded-2xl bg-primary text-primary-foreground text-lg font-bold hover:scale-[1.02] active:scale-95 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <Send className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <AnimatePresence>
              {submitStatus !== "idle" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={cn(
                    "absolute inset-0 z-20 rounded-[2.5rem] backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center",
                    submitStatus === "success" ? "bg-primary/90 text-primary-foreground" : "bg-destructive/90 text-destructive-foreground"
                  )}
                >
                  {submitStatus === "success" ? (
                    <>
                      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                      <p className="opacity-90">I'll get back to you as soon as possible.</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-12 h-12 mb-4" />
                      <h3 className="text-2xl font-bold">Something went wrong.</h3>
                      <p className="mt-2">Please try reaching out via email directly.</p>
                      <Button variant="outline" className="mt-6 font-bold" onClick={() => setSubmitStatus("idle")}>Try Again</Button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-50">
          <p className="text-sm font-mono tracking-tighter">
            © {new Date().getFullYear()} MIKO AJI NURACHMAN — SYSTEMS ARCHITECT
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <a href="#home" className="hover:text-primary transition-colors">Top</a>
            <a href="https://github.com/mikoajinurachman" target="_blank" className="hover:text-primary transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/miko-nurachman-9927a4369/" target="_blank" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  )
}
