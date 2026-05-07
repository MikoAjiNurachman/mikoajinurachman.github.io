"use client"

import { Canvas } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei"
import { Suspense } from "react"
import { motion } from "framer-motion"

function GlassBlob() {
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh>
        <sphereGeometry args={[1.6, 96, 96]} />
        <MeshDistortMaterial
          color="#c8b6ff"
          attach="material"
          distort={0.45}
          speed={1.4}
          roughness={0.15}
          metalness={0.1}
          emissive="#a6e3e9"
          emissiveIntensity={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Inner soft core */}
      <mesh scale={0.8}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#ffd6c2" transparent opacity={0.18} />
      </mesh>
    </Float>
  )
}

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, when: "beforeChildren" as const },
    },
  }

  const fadeIn = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
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
          {/* 3D blob */}
          <motion.div
            className="h-[340px] sm:h-[440px] lg:h-[520px] relative order-2 lg:order-1"
            variants={fadeIn}
          >
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.6]}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e7d9ff" />
                <pointLight position={[-5, -5, -3]} color="#a6e3e9" intensity={1} />
                <pointLight position={[5, -3, 4]} color="#ffd6c2" intensity={0.8} />
                <GlassBlob />
                <Environment preset="dawn" />
              </Suspense>
            </Canvas>

            {/* Soft glow ring overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[70%] h-[70%] rounded-full border border-primary/15 blur-2xl" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full glass mb-6 text-[10px] font-bold uppercase tracking-[0.25em] text-primary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Professional Profile
            </motion.div>

            <motion.h2
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-8 tracking-tight leading-[1.1]"
            >
              Crafting{" "}
              <span className="text-gradient italic font-light">high-performance</span>{" "}
              solutions
            </motion.h2>

            <motion.div
              variants={fadeIn}
              className="space-y-6 text-foreground/70 lg:text-lg leading-relaxed font-light"
            >
              <p>
                I am a seasoned Software Engineer with over{" "}
                <span className="text-foreground font-medium">6+ years of experience</span>{" "}
                specializing in{" "}
                <span className="text-primary font-medium">Banking and Financial Technology</span>.
              </p>

              <p>
                My core expertise lies in <span className="text-foreground font-medium">Go (Golang)</span>,{" "}
                <span className="text-foreground font-medium">React.js</span>, and heavy-duty{" "}
                <span className="text-foreground font-medium">IBM Integration Middleware</span> —
                building mission-critical bridges between modern microservices and traditional legacy cores.
              </p>

              <p className="italic text-foreground/80 border-l-2 border-primary/40 pl-4">
                "The message is always right, but the application must be resilient."
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
                  variants={fadeIn}
                  className="relative p-5 lg:p-6 rounded-2xl glass gradient-border hover:scale-[1.03] transition-transform duration-300"
                >
                  <div className="text-3xl lg:text-4xl font-semibold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] lg:text-xs text-foreground/60 font-medium tracking-[0.15em] uppercase">
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
