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

// Apple navbar: ultra-thin black bar pinned to the top, 44px height, nav-link
// type (12px / 400 / tight tracking). Right-aligned utility actions. No
// shadow, no border, no rounded corners — the whole bar is the divider.
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 nav-global-black h-11 flex items-center justify-center",
          // Subtle frosted blur once you start scrolling — keeps the bar
          // present without competing with hero photography.
          isScrolled && "backdrop-blur-md backdrop-saturate-150",
        )}
      >
        <div className="w-full max-w-[1024px] mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center type-nav-link text-white hover:text-white/70 transition-colors">
            <span className="font-semibold tracking-tight text-[15px]">MIKO</span>
          </a>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="type-nav-link text-white/85 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right utility (mobile menu trigger) */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Desktop right-aligned spacer to balance logo */}
          <div className="hidden md:block w-[48px]" />
        </div>
      </nav>

      {/* Mobile sheet — drops down from the global bar. Apple style: full-width
          panel, parchment surface, single-column nav stack. */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-11 left-0 right-0 z-40 nav-global-black border-t border-white/10 md:hidden"
          >
            <div className="px-6 py-4 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="type-body-strong text-white/90 hover:text-white py-3 border-b border-white/5 last:border-b-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
