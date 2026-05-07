"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Sparkles, Trail } from "@react-three/drei"
import { Github, Linkedin, Mail, ChevronDown, Zap } from "lucide-react"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"
import { AnimeCharacter } from "@/components/anime-character"


function EnergyRing({
  radius = 2.4,
  tilt = Math.PI / 2.4,
  speed = 0.4,
  color = "#7ad7ff",
  thickness = 0.018,
}: {
  radius?: number
  tilt?: number
  speed?: number
  color?: string
  thickness?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * speed
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  )
}

function OrbitingShard({
  radius,
  speed,
  color,
  yOffset = 0,
  scale = 0.18,
  trail = false,
}: {
  radius: number
  speed: number
  color: string
  yOffset?: number
  scale?: number
  trail?: boolean
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = yOffset + Math.sin(t * 1.5) * 0.15
    ref.current.rotation.y = t
    ref.current.rotation.x = t * 0.6
  })

  const body = (
    <mesh ref={ref} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshToonMaterial color={color} />
    </mesh>
  )

  return trail ? (
    <Trail width={0.5} length={4} color={new THREE.Color(color)} attenuation={(t) => t * t}>
      {body}
    </Trail>
  ) : (
    body
  )
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#bfe6ff" />
      <directionalLight position={[-5, -3, 4]} intensity={0.7} color="#5b8bff" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#a8e6ff" />

      {/* Two mirrored characters flanking the centered hero text.
          The two `model` props differ by query string so useGLTF caches them
          as separate scene instances (otherwise three.js reparents the same
          object and only one is visible).
          noFallback: skip the chibi placeholder so refreshing doesn't flash a
          different model briefly before the VRM finishes loading. */}
      <AnimeCharacter
        model="/models/character.vrm"
        position={[-3.6, -1.6, 0]}
        scale={0.8}
        pose="point"
        noFallback
      />
      <AnimeCharacter
        model="/models/character.vrm?n=2"
        position={[3.6, -1.6, 0]}
        scale={0.8}
        pose="pointRight"
        noFallback
      />

      {/* Energy rings tightened so they hug the avatar — characters at x=±3.6
          stay clear of the outermost ring (radius 2.4). */}
      <EnergyRing radius={1.9} tilt={Math.PI / 2.5} speed={0.4} color="#7ad7ff" />
      <EnergyRing radius={2.15} tilt={Math.PI / 3} speed={-0.25} color="#4facfe" thickness={0.012} />
      <EnergyRing radius={2.4} tilt={Math.PI / 2.2} speed={0.18} color="#5b8bff" thickness={0.008} />

      {/* Orbit shards stay inside the ring zone, away from the characters */}
      <OrbitingShard radius={1.9} speed={0.7} color="#7ad7ff" yOffset={0.1} trail />
      <OrbitingShard radius={2.1} speed={-0.5} color="#4facfe" yOffset={-0.3} scale={0.14} />
      <OrbitingShard radius={1.7} speed={0.6} color="#a8e6ff" yOffset={0.4} scale={0.16} />

      <Sparkles count={60} scale={[6, 6, 6]} size={5} speed={0.6} color="#bfe6ff" opacity={0.9} />
    </>
  )
}

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.25 } },
  }
  const itemVariants = {
    hidden: { y: 28, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden grain pt-36 pb-12 md:pt-44 md:pb-16"
    >
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.6]}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* HUD-style corner brackets — anime UI flavor */}
      <CornerBrackets />

      {/* Soft vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,oklch(0.10_0.04_265/0.75)_100%)]" />

      {/* Content — pointer-events:none so empty padding doesn't block clicks
          on the 3D character behind. Interactive children re-enable pointer
          events with pointer-events-auto. */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 flex justify-center pointer-events-auto">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="absolute -inset-4 rounded-full border border-primary/40 animate-spin-slow" />
            <div className="absolute -inset-8 rounded-full border border-accent/20 animate-spin-slow [animation-direction:reverse] [animation-duration:30s]" />
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary/40 via-accent/30 to-tertiary/40 blur-xl opacity-80 animate-pulse-glow" />

            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden neon-border bg-card/40 backdrop-blur-md neon-glow">
              <img
                src="/professional-portrait-asian-male-software-engineer.jpg"
                alt="Miko Aji Nurachman"
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass neon-border mb-6 text-[11px] font-medium tracking-[0.28em] uppercase text-primary pointer-events-auto"
        >
          <Zap className="w-3.5 h-3.5 text-highlight" />
          AI Native Engineer
          <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight leading-[1.02] pointer-events-auto"
        >
          <span className="block text-foreground/95">Miko Aji</span>
          <span className="block text-anime">Nurachman</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-foreground/75 mb-10 max-w-2xl mx-auto font-light leading-relaxed pointer-events-auto"
        >
          Forging resilient systems with{" "}
          <span className="text-primary font-semibold">Go</span>,{" "}
          <span className="text-accent font-semibold">React</span>, and{" "}
          <span className="text-foreground/95 underline decoration-primary/50 underline-offset-4">
            Enterprise Middleware
          </span>{" "}
          for banking platforms.
        </motion.p>

        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-14 pointer-events-auto">
          {[
            { icon: Github, href: "https://github.com/mikoajinurachman", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/miko-nurachman-9927a4369/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:mikoajin14@gmail.com", label: "Email" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3.5 rounded-2xl glass neon-border hover:bg-primary/15 hover:text-primary hover:-translate-y-0.5 hover:neon-glow transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="pointer-events-auto inline-block">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-foreground/60 hover:text-primary transition-colors group"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] font-medium">Discover</span>
            <div className="p-2 rounded-full glass animate-bounce">
              <ChevronDown className="w-4 h-4" />
            </div>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none" />
    </section>
  )
}

function CornerBrackets() {
  const corner =
    "absolute w-12 h-12 border-primary/60 pointer-events-none"
  return (
    <>
      <div className={`${corner} top-24 left-6 border-l-2 border-t-2 rounded-tl-2xl`} />
      <div className={`${corner} top-24 right-6 border-r-2 border-t-2 rounded-tr-2xl`} />
      <div className={`${corner} bottom-6 left-6 border-l-2 border-b-2 rounded-bl-2xl`} />
      <div className={`${corner} bottom-6 right-6 border-r-2 border-b-2 rounded-br-2xl`} />
    </>
  )
}
