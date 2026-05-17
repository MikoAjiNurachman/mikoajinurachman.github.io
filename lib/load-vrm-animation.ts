import * as THREE from "three"
import type { VRM, VRMHumanBoneName } from "@pixiv/three-vrm"

// ───────── Bone name mapping tables ─────────
// Different rigs name their bones differently. We try several conventions in
// order so the same retargeter works whether the FBX came from Mixamo, a
// VRoid export, a Blender re-export, or a Mixamo-rigged custom skeleton.

// Mixamo (Adobe / Mixamo.com export).
const MIXAMO_MAP: Record<string, VRMHumanBoneName> = {
  mixamorigHips: "hips",
  mixamorigSpine: "spine",
  mixamorigSpine1: "chest",
  mixamorigSpine2: "upperChest",
  mixamorigNeck: "neck",
  mixamorigHead: "head",
  mixamorigLeftShoulder: "leftShoulder",
  mixamorigLeftArm: "leftUpperArm",
  mixamorigLeftForeArm: "leftLowerArm",
  mixamorigLeftHand: "leftHand",
  mixamorigRightShoulder: "rightShoulder",
  mixamorigRightArm: "rightUpperArm",
  mixamorigRightForeArm: "rightLowerArm",
  mixamorigRightHand: "rightHand",
  mixamorigLeftUpLeg: "leftUpperLeg",
  mixamorigLeftLeg: "leftLowerLeg",
  mixamorigLeftFoot: "leftFoot",
  mixamorigLeftToeBase: "leftToes",
  mixamorigRightUpLeg: "rightUpperLeg",
  mixamorigRightLeg: "rightLowerLeg",
  mixamorigRightFoot: "rightFoot",
  mixamorigRightToeBase: "rightToes",
}

// VRoid Studio convention — what character1.vrm itself almost certainly uses
// internally, and what a Blender FBX export usually preserves.
const VROID_MAP: Record<string, VRMHumanBoneName> = {
  J_Bip_C_Hips: "hips",
  J_Bip_C_Spine: "spine",
  J_Bip_C_Chest: "chest",
  J_Bip_C_UpperChest: "upperChest",
  J_Bip_C_Neck: "neck",
  J_Bip_C_Head: "head",
  J_Bip_L_Shoulder: "leftShoulder",
  J_Bip_L_UpperArm: "leftUpperArm",
  J_Bip_L_LowerArm: "leftLowerArm",
  J_Bip_L_Hand: "leftHand",
  J_Bip_R_Shoulder: "rightShoulder",
  J_Bip_R_UpperArm: "rightUpperArm",
  J_Bip_R_LowerArm: "rightLowerArm",
  J_Bip_R_Hand: "rightHand",
  J_Bip_L_UpperLeg: "leftUpperLeg",
  J_Bip_L_LowerLeg: "leftLowerLeg",
  J_Bip_L_Foot: "leftFoot",
  J_Bip_L_ToeBase: "leftToes",
  J_Bip_R_UpperLeg: "rightUpperLeg",
  J_Bip_R_LowerLeg: "rightLowerLeg",
  J_Bip_R_Foot: "rightFoot",
  J_Bip_R_ToeBase: "rightToes",
}

// PascalCase generic — common when re-exported from Blender / various engines.
const GENERIC_PASCAL_MAP: Record<string, VRMHumanBoneName> = {
  Hips: "hips",
  Spine: "spine",
  Chest: "chest",
  UpperChest: "upperChest",
  Neck: "neck",
  Head: "head",
  LeftShoulder: "leftShoulder",
  LeftUpperArm: "leftUpperArm",
  LeftLowerArm: "leftLowerArm",
  LeftHand: "leftHand",
  RightShoulder: "rightShoulder",
  RightUpperArm: "rightUpperArm",
  RightLowerArm: "rightLowerArm",
  RightHand: "rightHand",
  LeftUpperLeg: "leftUpperLeg",
  LeftLowerLeg: "leftLowerLeg",
  LeftFoot: "leftFoot",
  LeftToes: "leftToes",
  RightUpperLeg: "rightUpperLeg",
  RightLowerLeg: "rightLowerLeg",
  RightFoot: "rightFoot",
  RightToes: "rightToes",
}

const VRM_HUMAN_BONE_NAMES = new Set<VRMHumanBoneName>([
  ...Object.values(MIXAMO_MAP),
])

function resolveVrmBoneName(rawName: string): VRMHumanBoneName | null {
  // Some exporters prefix bones with the armature, e.g. "Armature|J_Bip_C_Hips"
  // — strip everything before the last separator before lookup.
  const stripped = rawName.split(/[|:]/).pop() ?? rawName

  return (
    MIXAMO_MAP[stripped] ??
    VROID_MAP[stripped] ??
    GENERIC_PASCAL_MAP[stripped] ??
    (VRM_HUMAN_BONE_NAMES.has(stripped as VRMHumanBoneName)
      ? (stripped as VRMHumanBoneName)
      : null)
  )
}

// Pick the source hips bone by trying each known convention. Used to compute
// the hip-height ratio for translation scaling.
function findSourceHips(asset: THREE.Group): THREE.Object3D | null {
  for (const candidate of [
    "mixamorigHips",
    "J_Bip_C_Hips",
    "Hips",
    "hips",
    "Armature|Hips",
  ]) {
    const node = asset.getObjectByName(candidate)
    if (node) return node
  }
  // Last resort: walk the tree for any object whose stripped name resolves to
  // "hips" via our resolver.
  let found: THREE.Object3D | null = null
  asset.traverse((obj) => {
    if (found || !obj.name) return
    if (resolveVrmBoneName(obj.name) === "hips") found = obj
  })
  return found
}

// Lower-body bones — skipping these during retarget leaves the legs in the
// VRM's rest pose (straight, symmetric stance), while the upper body still
// animates from the FBX clip. Useful when an animation has contrapposto /
// weight-shift baked in but the visual context (a portfolio standing shot)
// reads cleaner with planted feet.
export const LEG_BONES: VRMHumanBoneName[] = [
  "leftUpperLeg", "leftLowerLeg", "leftFoot", "leftToes",
  "rightUpperLeg", "rightLowerLeg", "rightFoot", "rightToes",
]

type RetargetOptions = {
  /** Skip these VRM humanoid bones during retargeting — they keep their
      rest-pose rotation. Hip-translation track is also dropped if hips are
      excluded to keep the character planted. */
  excludeBones?: ReadonlySet<VRMHumanBoneName> | readonly VRMHumanBoneName[]
}

/**
 * Retarget animations from an FBX humanoid clip onto a VRM humanoid skeleton.
 *
 * Returns a new THREE.AnimationClip whose tracks reference VRM bone node names
 * — feed it directly to an AnimationMixer bound to `vrm.scene`.
 *
 * Implementation follows the official @pixiv/three-vrm `loadMixamoAnimation`
 * sample: bake out the source's rest-pose orientation per-bone, scale hip
 * translation by the hip-height ratio, and (for VRM 0.x) flip X/Z to account
 * for the 180° world rotation on legacy rigs.
 */
export function retargetFbxToVrm(
  asset: THREE.Group,
  vrm: VRM,
  options: RetargetOptions = {},
): THREE.AnimationClip | null {
  const exclude = new Set<VRMHumanBoneName>(options.excludeBones ?? [])
  const sourceClip = asset.animations[0]
  if (!sourceClip) {
    console.warn("[retargetFbxToVrm] FBX has no animation clips")
    return null
  }

  const tracks: THREE.KeyframeTrack[] = []
  const seenBones = new Set<string>()
  const mappedBones = new Set<string>()

  const restRotationInverse = new THREE.Quaternion()
  const parentRestWorldRotation = new THREE.Quaternion()
  const tmpQuat = new THREE.Quaternion()

  const sourceHips = findSourceHips(asset)
  const motionHipsHeight = sourceHips?.position.y ?? 1
  const vrmHipsNode = vrm.humanoid?.getNormalizedBoneNode("hips")
  const vrmHipsWorldY =
    vrmHipsNode?.getWorldPosition(new THREE.Vector3()).y ?? 1
  const vrmRootWorldY = vrm.scene.getWorldPosition(new THREE.Vector3()).y
  const vrmHipsHeight = Math.abs(vrmHipsWorldY - vrmRootWorldY) || 1
  const hipsPositionScale = vrmHipsHeight / motionHipsHeight

  const isVRM0 = vrm.meta?.metaVersion === "0"

  for (const sourceTrack of sourceClip.tracks) {
    const [rawName, property] = sourceTrack.name.split(".")
    seenBones.add(rawName)

    const vrmBoneName = resolveVrmBoneName(rawName)
    if (!vrmBoneName) continue
    // Locked bones — keep VRM rest pose, skip the FBX track entirely.
    if (exclude.has(vrmBoneName)) continue

    const vrmBoneNode = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName)
    if (!vrmBoneNode) continue

    const sourceBoneNode = asset.getObjectByName(rawName)
    if (!sourceBoneNode) continue

    mappedBones.add(rawName)

    sourceBoneNode.getWorldQuaternion(restRotationInverse).invert()
    sourceBoneNode.parent?.getWorldQuaternion(parentRestWorldRotation)

    if (sourceTrack instanceof THREE.QuaternionKeyframeTrack) {
      const values = sourceTrack.values.slice()
      for (let i = 0; i < values.length; i += 4) {
        tmpQuat.fromArray(values, i)
        tmpQuat
          .premultiply(parentRestWorldRotation)
          .multiply(restRotationInverse)
        tmpQuat.toArray(values, i)

        if (isVRM0) {
          // VRM 0.x is rotated 180° around Y → flip X + Z components of the
          // quaternion (indices 0 and 2 inside each 4-tuple).
          values[i] = -values[i]
          values[i + 2] = -values[i + 2]
        }
      }
      tracks.push(
        new THREE.QuaternionKeyframeTrack(
          `${vrmBoneNode.name}.${property}`,
          [...sourceTrack.times],
          values,
        ),
      )
    } else if (sourceTrack instanceof THREE.VectorKeyframeTrack) {
      if (vrmBoneName !== "hips" || property !== "position") continue
      const values = sourceTrack.values.map((v, i) => {
        const flipped = isVRM0 && i % 3 !== 1 ? -v : v
        return flipped * hipsPositionScale
      })
      tracks.push(
        new THREE.VectorKeyframeTrack(
          `${vrmBoneNode.name}.${property}`,
          [...sourceTrack.times],
          values,
        ),
      )
    }
  }

  if (tracks.length === 0) {
    console.warn(
      "[retargetFbxToVrm] No tracks retargeted. Source bone names found in clip:",
      Array.from(seenBones).sort(),
    )
    return null
  }

  console.info(
    `[retargetFbxToVrm] Retargeted ${tracks.length} tracks across ${mappedBones.size} bones.`,
  )
  return new THREE.AnimationClip(
    sourceClip.name || "vrm-clip",
    sourceClip.duration,
    tracks,
  )
}
