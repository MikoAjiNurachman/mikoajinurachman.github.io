"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center",
        isScrolled ? "py-3 px-4 md:px-12" : "py-6 px-4 md:px-12"
      )}
    >
      <div
        className={cn(
          "w-full max-w-6xl flex items-center justify-between transition-all duration-500 rounded-full",
          isScrolled
            ? "glass-strong neon-border px-5 h-14 shadow-2xl shadow-primary/15"
            : "glass neon-border px-5 h-14"
        )}
      >
        <a href="#home" className="group flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden neon-border bg-card/50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/30 to-tertiary/40" />
            <span className="relative text-sm font-bold text-foreground">M</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground/95">
            AJI<span className="text-anime">.</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/65 hover:text-foreground transition-colors group"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 rounded-full bg-primary/10 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200" />
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 rounded-full glass text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="absolute top-20 left-4 right-4 md:hidden glass-strong neon-border rounded-3xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-foreground/85 hover:text-primary hover:bg-primary/5 transition-colors py-3 px-4 rounded-2xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
