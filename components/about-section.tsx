"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles, Edges } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"

function AnimePolyhedron() {
  const inner = useRef<THREE.Mesh>(null)
  const outline = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (inner.current) {
      inner.current.rotation.x = t * 0.3
      inner.current.rotation.y = t * 0.45
    }
    if (outline.current) {
      outline.current.rotation.x = t * 0.3
      outline.current.rotation.y = t * 0.45
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.7}>
      <group>
        {/* Outline back-face */}
        <mesh ref={outline} scale={1.06}>
          <dodecahedronGeometry args={[1.4, 0]} />
          <meshBasicMaterial color="#0a0a1a" side={THREE.BackSide} />
        </mesh>

        {/* Toon body */}
        <mesh ref={inner}>
          <dodecahedronGeometry args={[1.4, 0]} />
          <meshToonMaterial color="#a98bff" />
          <Edges threshold={15} color="#bfe6ff" />
        </mesh>

        {/* Inner accent sphere */}
        <mesh scale={0.55}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#ff6fbf" transparent opacity={0.5} />
        </mesh>

        {/* Soft outer glow */}
        <mesh scale={1.7}>
          <sphereGeometry args={[1.3, 32, 32]} />
          <meshBasicMaterial color="#a98bff" transparent opacity={0.10} depthWrite={false} />
        </mesh>
      </group>
    </Float>
  )
}

function AboutScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#bfe6ff" />
      <pointLight position={[-5, -5, -3]} color="#ff6fbf" intensity={1} />
      <pointLight position={[5, -3, 4]} color="#ffe27a" intensity={0.8} />

      <AnimePolyhedron />

      <Sparkles count={50} scale={[6, 6, 6]} size={4} speed={0.5} color="#bfe6ff" opacity={0.85} />
    </>
  )
}

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, when: "beforeChildren" as const } },
  }
  const fadeIn = {
    hidden: { y: 24, opacity: 0, filter: "blur(6px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    },
  }
  const popIn = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
  }

  return (
    <section id="about" className="py-28 sm:py-36 px-6 relative overflow-hidden">
      {/* Soft gradient halos */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* 3D */}
          <motion.div
            className="h-[360px] sm:h-[460px] lg:h-[540px] relative order-2 lg:order-1"
            variants={fadeIn}
          >
            {/* Decorative orbital rings (CSS) */}
            <div className="absolute inset-8 rounded-full border border-primary/15 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-accent/15 animate-spin-slow [animation-direction:reverse] [animation-duration:24s] pointer-events-none" />

            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.6]}>
              <Suspense fallback={null}>
                <AboutScene />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full glass neon-border mb-6 text-[10px] font-bold uppercase tracking-[0.28em] text-primary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Profile / 01
              <span className="text-foreground/40">— SYS</span>
            </motion.div>

            <motion.h2
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-[1.05]"
            >
              Crafting{" "}
              <span className="text-anime italic font-light">high-performance</span>{" "}
              solutions
            </motion.h2>

            <motion.div
              variants={fadeIn}
              className="space-y-6 text-foreground/75 lg:text-lg leading-relaxed font-light"
            >
              <p>
                I am an{" "}
                <span className="text-primary font-semibold">AI Native Engineer</span> with over{" "}
                <span className="text-foreground font-medium">6+ years of experience</span>{" "}
                shipping production systems across{" "}
                <span className="text-foreground font-medium">Banking and Financial Technology</span>.
              </p>

              <p>
                My toolkit blends <span className="text-foreground font-medium">Go (Golang)</span>,{" "}
                <span className="text-foreground font-medium">React.js</span>, and heavy-duty{" "}
                <span className="text-foreground font-medium">IBM Integration Middleware</span> with{" "}
                <span className="text-accent font-medium">LLM-driven workflows</span>,{" "}
                agentic tooling, and AI-assisted code generation — building mission-critical bridges
                between modern microservices, traditional legacy cores, and emerging AI capabilities.
              </p>

              <p className="italic text-foreground/85 border-l-2 border-accent pl-4">
                "The message is always right, but the application must be resilient — and the model
                only as good as the system around it."
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-3 lg:gap-4 mt-12"
            >
              {[
                { value: "6+", label: "Years Exp" },
                { value: "3", label: "Companies" },
                { value: "10+", label: "Projects" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={popIn}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="relative p-5 lg:p-6 rounded-2xl glass neon-border transition-shadow hover:neon-glow"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-anime mb-1">{stat.value}</div>
                  <div className="text-[10px] lg:text-xs text-foreground/60 font-medium tracking-[0.18em] uppercase">
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
