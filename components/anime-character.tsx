"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { VRMLoaderPlugin, VRMUtils, type VRM } from "@pixiv/three-vrm"

/**
 * AnimeCharacter
 * ------------------------------------------------------------------
 * Loads a real character from `public/models/` (VRM or GLB).
 *   - VRM files use @pixiv/three-vrm for proper MToon shaders +
 *     humanoid bones (lets us pose the model away from T-pose).
 *   - GLB files load via standard GLTFLoader.
 *   - If neither is present OR load fails, falls back to a chibi
 *     character built from primitives.
 *
 * Drop a model at `public/models/character.vrm` (or .glb) and refresh.
 */

const DEFAULT_CANDIDATES = [
  "/models/character.vrm",
  "/models/character.glb",
]

type PoseName = "idle" | "point" | "pointRight" | "wave" | "peace" | "tpose"

type CharacterProps = {
  position?: [number, number, number]
  scale?: number
  /** Override the model file path. If unset, probes the defaults. */
  model?: string
  /** Pose preset for VRM models (no effect on plain GLB). */
  pose?: PoseName
  /** Force the chibi (skip GLTF loading entirely). */
  forceChibi?: boolean
  /** Skip the chibi fallback. While the GLTF/VRM is loading or on
      load failure, render nothing — avoids the chibi briefly flashing
      on refresh before the VRM scene is ready. */
  noFallback?: boolean
}

// ───────── VRM pose presets ─────────
// VRM convention: Y up, +Z forward, character's left = +X.
// Bone rotations are in the bone's local frame; in normalized rest pose
// the upper-arm bone's local Y points along the bone (out toward the hand).
function applyVrmPose(vrm: VRM, pose: PoseName) {
  const h = vrm.humanoid
  if (!h) return

  // Disable auto-propagation from normalized → raw so the rotations we
  // write to RAW bones below actually persist (otherwise vrm.update()
  // copies normalized over our raw changes every frame, which on some
  // VRM 1.x rigs visibly resets arms back to T-pose).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(h as any).autoUpdateHumanBones = false

  // Reset both: normalized to its rest, raw to its rest, so previous
  // pose state doesn't bleed.
  h.resetNormalizedPose()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(h as any).resetRawPose?.()

  if (pose === "tpose") return

  // Apply rotations directly on RAW bones so they persist regardless of
  // normalized humanoid state. Falls back silently if a bone is missing.
  const set = (
    name: Parameters<typeof h.getNormalizedBoneNode>[0],
    x = 0,
    y = 0,
    z = 0
  ) => {
    const raw = h.getRawBoneNode(name)
    if (raw) raw.rotation.set(x, y, z)
  }

  // Soft A-pose baseline. NB: in normalized humanoid, arms in T-pose extend
  // along ±X. Negative Z rotation on leftUpperArm rotates +X toward -Y (down)
  // — i.e. arm hangs at the side. Positive Z does the same for the right.
  set("leftUpperArm", 0, 0, -1.15)
  set("rightUpperArm", 0, 0, 1.15)
  set("leftLowerArm", 0, -0.15, 0)
  set("rightLowerArm", 0, 0.15, 0)
  set("spine", 0, 0, 0)
  set("chest", 0, 0, 0)
  set("neck", 0, 0, 0)
  set("head", 0, 0, 0)

  // NB on rotation directions in three-vrm normalized humanoid:
  //   For RIGHT upper arm: rotation.z = + LOWERS, - RAISES.
  //   For LEFT  upper arm: rotation.z = + RAISES, - LOWERS.
  //   rotation.x = + tilts the arm forward (toward camera) for most rigs.
  //   rotation.y = twist along the arm.
  //   Lower-arm bend at the elbow is rotation.x = - (negative).

  if (pose === "point") {
    // LEFT arm raised + forward, index pointing
    set("leftUpperArm", -0.6, 0, 0.7)          // tilt forward + raise above horizontal
    set("leftLowerArm", -0.4, 0, 0)            // slight elbow bend
    // Index extended; others curled
    for (const f of ["Middle", "Ring", "Little"] as const) {
      set(`left${f}Proximal` as const, 1.4, 0, 0)
      set(`left${f}Intermediate` as const, 1.4, 0, 0)
      set(`left${f}Distal` as const, 1.4, 0, 0)
    }
    set("leftThumbMetacarpal", 0.6, 0.4, 0)
  } else if (pose === "pointRight") {
    // Mirror — RIGHT arm raised + forward, index pointing
    set("rightUpperArm", -0.6, 0, -0.7)        // tilt forward + raise
    set("rightLowerArm", -0.4, 0, 0)
    for (const f of ["Middle", "Ring", "Little"] as const) {
      set(`right${f}Proximal` as const, 1.4, 0, 0)
      set(`right${f}Intermediate` as const, 1.4, 0, 0)
      set(`right${f}Distal` as const, 1.4, 0, 0)
    }
    set("rightThumbMetacarpal", 0.6, -0.4, 0)
  } else if (pose === "wave") {
    // RIGHT arm raised high (overhead), elbow slightly bent
    set("rightUpperArm", -0.3, 0, -2.2)        // strong raise
    set("rightLowerArm", -0.4, 0, 0)
  } else if (pose === "peace") {
    // ── Sprawled-sit + V-sign at chest level ──

    // Less aggressive hip lean-back so head doesn't end up looking at the
    // ceiling. Spine + chest lean forward to keep the seated read.
    set("hips", -0.3, 0, 0)
    set("spine", 0.45, 0, 0)
    set("chest", 0.15, 0, 0)
    set("neck", -0.1, 0, 0)
    set("head", -0.25, 0, 0)              // tilt head down so face looks at camera

    // Legs: kick forward (knees bent toward camera), spread outward
    // upperLeg.x = - rotates leg forward (kick out toward camera)
    // upperLeg.z = ± spreads outward (left vs right gets opposite sign)
    set("leftUpperLeg", -1.4, 0, 0.45)
    set("leftLowerLeg", 1.6, 0, 0)             // bend at knee back
    set("leftFoot", -0.4, 0, 0)
    set("rightUpperLeg", -1.4, 0, -0.45)
    set("rightLowerLeg", 1.6, 0, 0)
    set("rightFoot", -0.4, 0, 0)

    // RIGHT arm: only slight raise above horizontal — the elbow bend does
    // most of the work to bring the V-sign up to face/chest level.
    set("rightUpperArm", -0.4, 0, -0.4)         // slight raise + slight forward
    set("rightLowerArm", -1.9, 0, 0)             // strong elbow bend → forearm vertical
    set("rightHand", 0, 0, 0)
    // Index + Middle extended (peace V); Ring/Little curled into fist
    set("rightMiddleProximal", 0, -0.12, 0)    // slight splay between index/middle
    for (const f of ["Ring", "Little"] as const) {
      set(`right${f}Proximal` as const, 1.5, 0, 0)
      set(`right${f}Intermediate` as const, 1.5, 0, 0)
      set(`right${f}Distal` as const, 1.5, 0, 0)
    }
    set("rightThumbMetacarpal", 0.7, -0.4, 0)
    set("rightThumbProximal", 0.6, 0, 0)

    // Left arm rests forward on lap with relaxed wrist + softly curled fingers
    set("leftUpperArm", 0.7, 0, -0.9)           // forward (toward lap) + at side
    set("leftLowerArm", -0.7, 0, 0)              // bend forward onto lap
    set("leftHand", 0.25, 0, 0)                  // wrist drops naturally
    // Soft relaxed hand curl — not a tight fist, just a comfortable rest
    for (const f of ["Index", "Middle", "Ring", "Little"] as const) {
      set(`left${f}Proximal` as const, 0.5, 0, 0)
      set(`left${f}Intermediate` as const, 0.7, 0, 0)
      set(`left${f}Distal` as const, 0.4, 0, 0)
    }
    set("leftThumbMetacarpal", 0.3, 0.3, 0)
    set("leftThumbProximal", 0.3, 0, 0)
  }
  // (idle = baseline only — raw bones already at rest from resetRawPose)
}

// ───────── Shared interaction hook ─────────
// Drives a wrapper group's scale (hover) + position/rotation (click bounce).
function useCharacterInteraction(
  wrapperRef: React.RefObject<THREE.Group | null>,
  basePosition: [number, number, number],
  baseScale: number
) {
  const [hovered, setHovered] = useState(false)
  const clickedRef = useRef(false)
  const clickProgRef = useRef(0)

  useFrame((_, delta) => {
    const w = wrapperRef.current
    if (!w) return

    // Smooth hover scale
    const targetScale = hovered ? baseScale * 1.10 : baseScale
    const next = THREE.MathUtils.lerp(w.scale.x, targetScale, 0.15)
    w.scale.set(next, next, next)

    // Click bounce — Y arc + full Y spin over 0.85 s
    if (clickedRef.current) {
      clickProgRef.current += delta / 0.85
      const p = Math.min(clickProgRef.current, 1)
      w.position.set(
        basePosition[0],
        basePosition[1] + Math.sin(p * Math.PI) * 0.6,
        basePosition[2]
      )
      w.rotation.y = p * Math.PI * 2
      if (p >= 1) {
        clickedRef.current = false
        clickProgRef.current = 0
        w.position.set(...basePosition)
        w.rotation.y = 0
      }
    }
  })

  const handlers = {
    onPointerOver: (e: React.PointerEvent) => {
      e.stopPropagation()
      setHovered(true)
      if (typeof document !== "undefined") document.body.style.cursor = "pointer"
    },
    onPointerOut: (e: React.PointerEvent) => {
      e.stopPropagation()
      setHovered(false)
      if (typeof document !== "undefined") document.body.style.cursor = "auto"
    },
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      clickedRef.current = true
      clickProgRef.current = 0
    },
  }

  return { handlers, hovered }
}

// ───────── Real GLTF / VRM loader ─────────
function GltfCharacter({
  url,
  position = [0, -1.2, 0],
  scale = 1.4,
  pose = "idle",
}: { url: string } & CharacterProps) {
  const wrapperRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)
  const { handlers } = useCharacterInteraction(wrapperRef, position, scale)

  // Register the VRM plugin on the underlying GLTFLoader so .vrm files get
  // proper materials (MToon) + humanoid bones via gltf.userData.vrm.
  // useGLTF (drei) accepts an extendLoader callback as 4th arg. drei's loader
  // type comes from three-stdlib, three-vrm types target three; the casts
  // here just bridge that difference.
  const gltf = useGLTF(url, undefined, undefined, (loader) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(loader as any).register((parser: any) => new VRMLoaderPlugin(parser))
  })

  const vrm = gltf.userData?.vrm as VRM | undefined

  // One-time scene optimizations + the chosen pose
  useEffect(() => {
    if (!vrm) return
    try {
      VRMUtils.removeUnnecessaryVertices(gltf.scene)
      VRMUtils.combineSkeletons(gltf.scene)
    } catch {
      /* combineSkeletons fails on some models; non-fatal */
    }
    // VRM 0.x faces -Z (away from camera). Re-orient so the character looks
    // toward the camera (+Z) for a portfolio.
    if (vrm.meta?.metaVersion === "0") {
      VRMUtils.rotateVRM0(vrm)
    }
    applyVrmPose(vrm, pose)
    vrm.update(0)

    // ── DEBUG: dump which humanoid bones the model has mapped ──
    // Helps diagnose pose issues when arm/leg/finger rotations don't take.
    // Remove once the pose is dialed in.
    if (typeof window !== "undefined") {
      const bones: Array<Parameters<NonNullable<VRM["humanoid"]>["getNormalizedBoneNode"]>[0]> = [
        "hips", "spine", "chest", "neck", "head",
        "leftShoulder", "leftUpperArm", "leftLowerArm", "leftHand",
        "rightShoulder", "rightUpperArm", "rightLowerArm", "rightHand",
        "leftUpperLeg", "leftLowerLeg", "leftFoot",
        "rightUpperLeg", "rightLowerLeg", "rightFoot",
      ]
      const present: string[] = []
      const missing: string[] = []
      for (const name of bones) {
        const node = vrm.humanoid?.getNormalizedBoneNode(name)
        if (node) present.push(name)
        else missing.push(name)
      }
      // eslint-disable-next-line no-console
      console.log(
        `[VRM ${url}]\n  metaVersion: ${vrm.meta?.metaVersion}\n  present (${present.length}): ${present.join(", ")}\n  missing (${missing.length}): ${missing.join(", ") || "(none)"}`
      )
    }
  }, [vrm, gltf, pose, url])

  // Per-frame: only update VRM internals (spring bones, look-at, etc).
  // The pose itself is set on the normalized humanoid in useEffect below
  // and persists because autoUpdateHumanBones = true (default) copies
  // normalized → raw each update().
  useFrame((_, delta) => {
    if (vrm) vrm.update(delta)
  })

  // Use vrm.scene if present, otherwise the raw glTF scene
  const sceneToRender = useMemo(() => (vrm ? vrm.scene : gltf.scene), [vrm, gltf])

  return (
    <group ref={wrapperRef} position={position} scale={scale} {...handlers}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <group ref={innerRef}>
          <primitive object={sceneToRender} />
        </group>
      </Float>
    </group>
  )
}

// ───────── Error boundary so a bad model file falls back gracefully ─────────
class ModelErrorBoundary extends React.Component<
  { fallback: React.ReactNode; onError?: () => void; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    this.props.onError?.()
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

// ───────── Chibi fallback (built from primitives) ─────────
function ChibiCharacter({
  position = [0, -0.4, 0],
  scale = 1.3,
}: CharacterProps) {
  const wrapperRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)
  const leftArm = useRef<THREE.Mesh>(null)
  const { handlers, hovered } = useCharacterInteraction(wrapperRef, position, scale)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (innerRef.current) {
      // ambient bob + sway, applied on the INNER group so it doesn't fight
      // the wrapper's hover-scale / click-bounce transforms.
      innerRef.current.position.y = Math.sin(t * 1.2) * 0.08
      innerRef.current.rotation.y = Math.sin(t * 0.5) * 0.25
    }
    if (leftArm.current) {
      // pointing pose; gentle sway by default, more energetic on hover
      const speed = hovered ? 6 : 2
      const amp = hovered ? 0.18 : 0.05
      leftArm.current.rotation.z = 1.25 + Math.sin(t * speed) * amp
    }
  })

  // Spiky hair clusters around the head
  const hairSpikes = []
  const spikeCount = 9
  for (let i = 0; i < spikeCount; i++) {
    const angle = (i / spikeCount) * Math.PI * 2
    const r = 0.42
    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r
    hairSpikes.push(
      <mesh
        key={i}
        position={[x, 0.38, z]}
        rotation={[Math.PI * 0.05, -angle, 0.6]}
      >
        <coneGeometry args={[0.16, 0.42, 4]} />
        <meshToonMaterial color="#1d4ed8" />
      </mesh>
    )
  }

  return (
    <group ref={wrapperRef} position={position} scale={scale} {...handlers}>
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.5}>
        <group ref={innerRef}>
          {/* ground glow brightens on hover via a separate mesh below */}
          {hovered && (
            <mesh position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.25, 1.2, 48]} />
              <meshBasicMaterial color="#7ad7ff" transparent opacity={0.35} side={THREE.DoubleSide} />
            </mesh>
          )}
        {/* Head */}
        <group position={[0, 0.2, 0]}>
          <mesh scale={1.06}>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshBasicMaterial color="#0a0a1a" side={THREE.BackSide} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshToonMaterial color="#fce5d0" />
          </mesh>

          {hairSpikes}
          <mesh position={[0, 0.55, 0]}>
            <coneGeometry args={[0.28, 0.55, 5]} />
            <meshToonMaterial color="#1d4ed8" />
          </mesh>
          <mesh position={[0, 0.32, 0.4]} rotation={[Math.PI * 0.1, 0, 0]}>
            <coneGeometry args={[0.28, 0.4, 5]} />
            <meshToonMaterial color="#1d4ed8" />
          </mesh>
          <mesh position={[-0.18, 0.3, 0.42]} rotation={[Math.PI * 0.15, 0, -0.4]}>
            <coneGeometry args={[0.18, 0.32, 4]} />
            <meshToonMaterial color="#1d4ed8" />
          </mesh>
          <mesh position={[0.18, 0.3, 0.42]} rotation={[Math.PI * 0.15, 0, 0.4]}>
            <coneGeometry args={[0.18, 0.32, 4]} />
            <meshToonMaterial color="#1d4ed8" />
          </mesh>

          {/* Eyes */}
          <mesh position={[-0.18, -0.02, 0.5]}>
            <sphereGeometry args={[0.10, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.18, -0.02, 0.5]}>
            <sphereGeometry args={[0.10, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.18, -0.02, 0.56]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#7ad7ff" />
          </mesh>
          <mesh position={[0.18, -0.02, 0.56]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#7ad7ff" />
          </mesh>
          <mesh position={[-0.18, -0.02, 0.6]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#0a0a1a" />
          </mesh>
          <mesh position={[0.18, -0.02, 0.6]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color="#0a0a1a" />
          </mesh>
          <mesh position={[-0.155, 0.005, 0.62]}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.205, 0.005, 0.62]}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          <mesh position={[0, -0.18, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.045, 0.008, 8, 16, Math.PI]} />
            <meshBasicMaterial color="#3a2a25" />
          </mesh>

          <mesh position={[-0.32, -0.1, 0.4]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#ffb3c1" transparent opacity={0.55} />
          </mesh>
          <mesh position={[0.32, -0.1, 0.4]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#ffb3c1" transparent opacity={0.55} />
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.12, 16]} />
          <meshToonMaterial color="#fce5d0" />
        </mesh>

        {/* Body / Jacket */}
        <group position={[0, -0.78, 0]}>
          <mesh scale={[1.06, 1.06, 1.06]}>
            <capsuleGeometry args={[0.32, 0.5, 8, 16]} />
            <meshBasicMaterial color="#0a0a1a" side={THREE.BackSide} />
          </mesh>
          <mesh>
            <capsuleGeometry args={[0.32, 0.5, 8, 16]} />
            <meshToonMaterial color="#4facfe" />
          </mesh>
          <mesh position={[0, 0.05, 0.3]}>
            <boxGeometry args={[0.04, 0.5, 0.02]} />
            <meshBasicMaterial color="#7ad7ff" />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <torusGeometry args={[0.18, 0.025, 8, 24]} />
            <meshBasicMaterial color="#7ad7ff" />
          </mesh>
        </group>

        {/* Arms */}
        {/* LEFT ARM — POINTING up-left toward the avatar */}
        {/* Pivot the arm at the shoulder by wrapping it in a group; the leftArm
            ref drives the wave reaction on hover via its Z rotation. */}
        <group position={[-0.42, -0.55, 0]}>
          <mesh ref={leftArm} position={[-0.30, 0.18, 0.05]} rotation={[0, 0, 1.25]}>
            <capsuleGeometry args={[0.075, 0.5, 8, 16]} />
            <meshToonMaterial color="#4facfe" />
          </mesh>
          {/* Hand at the tip of the pointing arm */}
          <mesh position={[-0.62, 0.42, 0.08]}>
            <sphereGeometry args={[0.085, 16, 16]} />
            <meshToonMaterial color="#fce5d0" />
          </mesh>
          {/* Index finger — small cone pointing up-left */}
          <mesh position={[-0.74, 0.55, 0.08]} rotation={[0, 0, Math.PI / 3.2]}>
            <coneGeometry args={[0.025, 0.14, 8]} />
            <meshToonMaterial color="#fce5d0" />
          </mesh>
        </group>

        {/* RIGHT ARM — relaxed at the side */}
        <mesh position={[0.45, -0.85, 0]} rotation={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
          <meshToonMaterial color="#4facfe" />
        </mesh>
        <mesh position={[0.55, -1.15, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshToonMaterial color="#fce5d0" />
        </mesh>

        {/* Ground glow (always-on, subtle) */}
        <mesh position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.9, 32]} />
          <meshBasicMaterial color="#7ad7ff" transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>
        </group>
      </Float>
    </group>
  )
}

// ───────── Public component ─────────
export function AnimeCharacter({
  position,
  scale,
  model,
  pose,
  forceChibi,
  noFallback,
}: CharacterProps = {}) {
  const [modelUrl, setModelUrl] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    if (forceChibi) {
      setModelUrl(null)
      return
    }
    let cancelled = false
    const candidates = model ? [model] : DEFAULT_CANDIDATES
    ;(async () => {
      for (const path of candidates) {
        try {
          const res = await fetch(path, { method: "HEAD" })
          if (cancelled) return
          if (res.ok) {
            setModelUrl(path)
            return
          }
        } catch {
          // try next
        }
      }
      if (!cancelled) setModelUrl(null)
    })()
    return () => {
      cancelled = true
    }
  }, [model, forceChibi])

  // Render nothing while waiting if noFallback — avoids chibi flash.
  const fallback = noFallback ? null : <ChibiCharacter position={position} scale={scale} />

  if (modelUrl) {
    return (
      <ModelErrorBoundary fallback={fallback} onError={() => setModelUrl(null)}>
        <Suspense fallback={fallback}>
          <GltfCharacter url={modelUrl} position={position} scale={scale} pose={pose} />
        </Suspense>
      </ModelErrorBoundary>
    )
  }

  // Probe still pending OR no model found.
  // - If noFallback: render nothing (Hero will just stay empty until VRM is ready)
  // - Else: render the chibi
  return noFallback ? null : <ChibiCharacter position={position} scale={scale} />
}
