"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { Suspense } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"
import { AnimeCharacter } from "@/components/anime-character"

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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

function AboutScene() {
  const { viewport } = useThree()
  const halfH = viewport.height / 2
  // Bumped ceiling for desktop: character reads as a confident centerpiece.
  const charScale = THREE.MathUtils.clamp(viewport.height * 0.75, 1.8, 3.4)
  const footRoom = charScale * 0.7
  const minYToFit = -halfH + footRoom
  const charY = Math.max(minYToFit, -2.0)

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 6, 6]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-4, 2, 4]} intensity={0.35} color="#ffffff" />

      <AnimeCharacter
        model="/models/character1.vrm"
        animationUrl="/models/Sitting-character1.fbx"
        position={[0, charY, 0]}
        rotation={[-0.4, 0, 0]}
        scale={charScale}
        noFallback
      />
    </>
  )
}

// Apple parchment tile — two-column on desktop, stacks on mobile.
export function AboutSection() {
  return (
    <section
      id="about"
      className="tile-parchment relative w-full py-20 md:py-28 px-6"
    >
      <motion.div
        className="max-w-[1180px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 3D — bare canvas, no decorative frame. Heights bumped so the
              bigger model has room without clipping. */}
          <motion.div
            variants={fadeUp}
            className="h-[480px] sm:h-[560px] lg:h-[680px] relative order-2 lg:order-1"
          >
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.6]}>
              <Suspense fallback={null}>
                <AboutScene />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Content — Apple hierarchy: eyebrow → display-lg → body → stats */}
          <div className="order-1 lg:order-2">
            <motion.p variants={fadeUp} className="type-eyebrow text-[var(--apple-ink-muted-48)] mb-4">
              Profile · 01
            </motion.p>

            <motion.h2 variants={fadeUp} className="type-display-lg text-[var(--apple-ink)] mb-6">
              Crafting high-performance solutions.
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-5 type-body-apple text-[var(--apple-ink-muted-80)]">
              <p>
                I am an{" "}
                <span className="text-[var(--apple-ink)] font-semibold">AI Native Engineer</span>{" "}
                with over{" "}
                <span className="text-[var(--apple-ink)] font-semibold">6+ years</span>{" "}
                shipping production systems across Banking and Financial Technology.
              </p>

              <p>
                My toolkit blends <span className="text-[var(--apple-ink)] font-semibold">Go</span>,{" "}
                <span className="text-[var(--apple-ink)] font-semibold">React.js</span>, and{" "}
                IBM Integration Middleware with LLM-driven workflows, agentic tooling,
                and AI-assisted code generation — building mission-critical bridges
                between modern microservices, legacy cores, and emerging AI capabilities.
              </p>

              <p className="type-lead-airy text-[var(--apple-ink)] pt-2">
                “The message is always right, but the application must be resilient —
                and the model only as good as the system around it.”
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-3 gap-3 mt-10">
              {[
                { value: "6+", label: "Years Exp" },
                { value: "3", label: "Companies" },
                { value: "10+", label: "Projects" },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} className="card-utility text-center !p-5">
                  <div className="type-display-md text-[var(--apple-ink)] mb-1">
                    {stat.value}
                  </div>
                  <div className="type-caption text-[var(--apple-ink-muted-48)]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
