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
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center",
        isScrolled ? "py-3 px-4 md:px-12" : "py-6 px-4 md:px-12"
      )}
    >
      <div
        className={cn(
          "w-full max-w-6xl flex items-center justify-between transition-all duration-500 rounded-full",
          isScrolled
            ? "glass-strong gradient-border px-5 h-14 shadow-2xl shadow-primary/10"
            : "glass px-5 h-14"
        )}
      >
        <a href="#home" className="group flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-full overflow-hidden gradient-border bg-card/50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-tertiary/30" />
            <span className="relative text-sm font-bold text-foreground">M</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground/90">
            AJI<span className="text-gradient">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-full transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full glass text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="absolute top-20 left-4 right-4 md:hidden glass-strong gradient-border rounded-3xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors py-3 px-4 rounded-2xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
