import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { CertificatesSection } from "@/components/certificates-section"
import { ContactSection } from "@/components/contact-section"
import { Navbar } from "@/components/navbar"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Footer } from "@/components/footer"

// Apple-style alternating tile rhythm — each section owns its surface color
// (light / parchment / dark). Surface change itself is the section divider.
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white text-[var(--apple-ink)]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
