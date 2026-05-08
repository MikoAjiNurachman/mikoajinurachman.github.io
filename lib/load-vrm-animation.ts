import * as THREE from "three"
import type { VRM, VRMHumanBoneName } from "@pixiv/three-vrm"

// Mixamo bone name → VRM humanoid bone name. Covers the bones a sitting / idle
// animation actually drives; fingers are intentionally skipped (sitting clips
// from Mixamo rarely animate them and we don't want them overriding the VRM
// rest pose).
const mixamoVRMRigMap: Record<string, VRMHumanBoneName> = {
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

const VRM_HUMAN_BONE_NAMES = new Set<VRMHumanBoneName>(
  Object.values(mixamoVRMRigMap),
)

// Resolve a track's source bone name (the part before the first '.') to a VRM
// humanoid bone name. Tries the Mixamo map first; if the FBX was exported with
// already-VRM bone names (e.g. rigged in Blender against the character1 rig),
// fall back to a direct match.
function resolveVrmBoneName(rawName: string): VRMHumanBoneName | null {
  const mapped = mixamoVRMRigMap[rawName]
  if (mapped) return mapped
  if (VRM_HUMAN_BONE_NAMES.has(rawName as VRMHumanBoneName)) {
    return rawName as VRMHumanBoneName
  }
  return null
}

/**
 * Retarget animations from a Mixamo-style FBX onto a VRM humanoid skeleton.
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
): THREE.AnimationClip | null {
  const sourceClip = asset.animations[0]
  if (!sourceClip) return null

  const tracks: THREE.KeyframeTrack[] = []

  const restRotationInverse = new THREE.Quaternion()
  const parentRestWorldRotation = new THREE.Quaternion()
  const tmpQuat = new THREE.Quaternion()

  // Hips height ratio — lets us scale the source's hip translation track so
  // the character doesn't sink through the floor / float in the air.
  const sourceHips = asset.getObjectByName("mixamorigHips") ?? asset.getObjectByName("Hips")
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
    const vrmBoneName = resolveVrmBoneName(rawName)
    if (!vrmBoneName) continue

    const vrmBoneNode = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName)
    if (!vrmBoneNode) continue

    const sourceBoneNode = asset.getObjectByName(rawName)
    if (!sourceBoneNode) continue

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
      // Only hips position drives root motion; other VRM bones don't have
      // animatable translation, so skip them.
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

  if (tracks.length === 0) return null

  return new THREE.AnimationClip(sourceClip.name || "vrm-clip", sourceClip.duration, tracks)
}
