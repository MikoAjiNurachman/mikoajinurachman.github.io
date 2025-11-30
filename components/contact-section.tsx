"use client"

import type React from "react"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Float, Torus, MeshDistortMaterial } from "@react-three/drei"
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Suspense } from "react"

function FloatingTorus() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Torus args={[1, 0.4, 16, 100]}>
        <MeshDistortMaterial
          color="#4fd1c5"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Torus>
    </Float>
  )
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <div className="h-1 w-20 bg-primary mb-3 sm:mb-4 rounded-full mx-auto" />
        <p className="text-muted-foreground text-center mb-8 sm:mb-12 max-w-xl mx-auto text-sm sm:text-base px-4">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to
          reach out!
        </p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 3D Element - hidden on smaller screens */}
          <div className="h-[300px] lg:h-[400px] hidden md:block">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <FloatingTorus />
              </Suspense>
            </Canvas>
          </div>

          {/* Contact Form */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              <a
                href="mailto:mikoaji@example.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="p-2.5 sm:p-3 rounded-lg bg-primary/10">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-foreground text-sm sm:text-base">mikoaji@example.com</p>
                </div>
              </a>

              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2.5 sm:p-3 rounded-lg bg-primary/10">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-foreground text-sm sm:text-base">Indonesia</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-secondary border-border focus:border-primary text-sm sm:text-base"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-secondary border-border focus:border-primary text-sm sm:text-base"
                />
              </div>
              <Textarea
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-secondary border-border focus:border-primary resize-none text-sm sm:text-base"
              />
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>

            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <span className="text-xs sm:text-sm text-muted-foreground">Find me on:</span>
              <a
                href="https://github.com/mikoajinurachman"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com/in/mikoajinurachman"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-xs sm:text-sm">
            © {new Date().getFullYear()} Miko Aji Nurachman. Built with <span className="text-primary">Next.js</span> &{" "}
            <span className="text-primary">Three.js</span>
          </p>
        </div>
      </div>
    </section>
  )
}
