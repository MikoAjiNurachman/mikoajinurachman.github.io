"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { ChevronDown } from "lucide-react"
import { Suspense } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"
import { AnimeCharacter } from "@/components/anime-character"

// Apple-style entrance — subtle 12px translate + opacity fade, ease-out
// cubic-bezier. No springs, no scale, no rotation. Reusable across sections.
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

// Apple-style hero scene: characters render as "product imagery" on a
// parchment surface. No decorative rings, no sparkles, no orbiting shards —
// the design spec forbids decorative chrome. Just the subjects + soft lighting.
function HeroScene() {
  const { viewport } = useThree()
  const halfW = viewport.width / 2

  // Continuous responsive — scale + position track viewport so characters
  // never clip at any aspect ratio. Ceiling bumped to 1.1 so they read at a
  // confident size on desktop.
  const charScale = THREE.MathUtils.clamp(viewport.width * 0.11, 0.32, 1.1)
  const lateralBuffer = charScale * 1.0 + 0.2
  const charX = Math.max(0.6, Math.min(halfW - lateralBuffer, 3.8))
  const charY = THREE.MathUtils.lerp(
    -2.0,
    -1.6,
    THREE.MathUtils.smoothstep(viewport.width, 5, 9),
  )

  return (
    <>
      {/* Soft photographic lighting — neutral whites, no colored gels. */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 6, 6]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-4, 2, 4]} intensity={0.35} color="#ffffff" />

      <AnimeCharacter
        model="/models/character.vrm"
        animationUrl="/models/Female Laying Pose-left.fbx"
        position={[-charX, charY, 0]}
        rotation={[-0.5, 0.9, 0.2]}
        scale={charScale}
        noFallback
      />
      <AnimeCharacter
        model="/models/character.vrm?n=2"
        animationUrl="/models/Hand Raising-right.fbx"
        position={[charX, charY, 0]}
        rotation={[-0.25, -0.3, 0]}
        scale={charScale}
        noFallback
      />
    </>
  )
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="tile-light relative w-full flex flex-col items-center pt-24 md:pt-28 pb-0 overflow-hidden"
    >
      {/* Headline stack — Apple centered hero: eyebrow, name, tagline, CTAs. */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-[980px] mx-auto pt-12 md:pt-20 pb-10 md:pb-14"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUp} className="type-eyebrow text-[var(--apple-ink-muted-48)] mb-5">
          AI Native Engineer · Banking & Fintech
        </motion.p>

        <motion.h1 variants={fadeUp} className="type-hero-display text-[var(--apple-ink)] mb-4 md:mb-5">
          Miko Aji Nurachman
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="type-lead text-[var(--apple-ink-muted-80)] max-w-[680px] mx-auto mb-8 md:mb-10"
        >
          High-performance systems with Go, React, and enterprise middleware.
          Six years shipping mission-critical infrastructure.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
          <a href="#experience" className="btn-pill">See journey</a>
          <a href="#contact" className="btn-pill-ghost">Get in touch ›</a>
        </motion.div>
      </motion.div>

      {/* 3D character "render" — the spec reserves the product shadow for
          imagery; here the characters are the photographic subject. The Canvas
          fills the lower band of the hero so the headline keeps its breathing
          room above. Bumped heights so the bigger character has room. */}
      <motion.div
        className="relative w-full h-[480px] md:h-[600px] lg:h-[700px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.6]}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>

        {/* Soft bottom edge into the next tile — no gradient, just a thin
            hairline. The next section's parchment provides the contrast. */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--apple-hairline)]" />
      </motion.div>

      {/* Quiet "scroll" hint, Apple style — small chevron, no animation drama. */}
      <a
        href="#about"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[var(--apple-ink-muted-48)] hover:text-[var(--apple-primary)] transition-colors"
        aria-label="Scroll to about"
      >
        <ChevronDown size={18} strokeWidth={1.5} />
      </a>
    </section>
  )
}

