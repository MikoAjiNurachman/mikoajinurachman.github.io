"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Suspense } from "react"
import { motion } from "framer-motion"

function AnimatedSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00f2fe"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={1}
          emissive="#00f2fe"
          emissiveIntensity={1}
        />
      </Sphere>
    </Float>
  )
}

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }

  const fadeIn = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section id="about" className="py-24 sm:py-32 px-6 relative overflow-hidden bg-background/50">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* 3D Element & Background Decoration */}
          <motion.div 
            className="h-[300px] sm:h-[400px] lg:h-[500px] relative order-2 lg:order-1"
            variants={fadeIn}
          >
            <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} color="#4facfe" intensity={1} />
                <AnimatedSphere />
              </Suspense>
            </Canvas>
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
               <div className="w-[80%] h-[80%] border border-primary/20 rounded-full blur-2xl opacity-20" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div variants={fadeIn} className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
               Professional Profile
            </motion.div>
            
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
              Crafting <span className="text-primary italic">High-Performance</span> Solutions
            </motion.h2>

            <motion.div variants={fadeIn} className="space-y-6 text-muted-foreground/90 lg:text-lg leading-relaxed font-light">
              <p>
                I am a seasoned Software Engineer with over{" "}
                <span className="text-foreground font-semibold border-b border-primary/30">6+ years of experience</span> specializing in{" "}
                <span className="text-primary font-semibold">Banking and Financial Technology</span>.
              </p>

              <p>
                My core expertise lies in <span className="text-foreground font-semibold">Go (Golang)</span>,{" "}
                <span className="text-foreground font-semibold">React.js</span>, and heavy-duty 
                <span className="text-foreground font-semibold"> IBM Integration Middleware</span>. I specialize 
                in building mission-critical bridges between modern microservices and traditional legacy cores.
              </p>

              <p>
                I am a firm believer that <span className="italic text-primary font-medium">"The message is always right, but the application must be resilient."</span> I've spent years hardening systems against fraud, ensuring sub-second latencies, and orchestrating massive-scale container clusters.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 mt-12">
              {[
                { value: "6+", label: "Years Exp", gradient: "from-primary/10 to-accent/10" },
                { value: "3", label: "Companies", gradient: "from-accent/10 to-primary/10" },
                { value: "10+", label: "Projects", gradient: "from-primary/10 to-accent/10" }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeIn}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-white/5 backdrop-blur-sm hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/5`}
                >
                  <div className="text-3xl lg:text-4xl font-black text-primary mb-1">{stat.value}</div>
                  <div className="text-xs lg:text-sm text-muted-foreground/80 font-medium tracking-wide border-t border-primary/10 pt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
