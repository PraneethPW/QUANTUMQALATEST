import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"

type Props = {
  input1?: string
  input2?: string
}

const EntanglementLines = ({
  input1 = "Input 1",
  input2 = "Input 2"
}: Props) => {

  const sphere1 = useRef<THREE.Mesh>(null!)
  const sphere2 = useRef<THREE.Mesh>(null!)

  // 🔥 KEYWORD EXTRACTION
  const extractKeywords = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .split(" ")
      .filter(word => word.length > 3)
      .slice(0, 3)
  }

  const keywords1 = extractKeywords(input1)
  const keywords2 = extractKeywords(input2)

  // line geometry
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(6) // 2 points (x,y,z * 2)
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  // create line ONCE (no TS issues)
  const lineRef = useRef(
    new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: "#22d3ee" })
    )
  )

  useFrame(() => {
    if (sphere1.current && sphere2.current) {

      const t = Date.now() * 0.001

      // floating animation
      sphere1.current.position.y = Math.sin(t) * 0.3
      sphere2.current.position.y = Math.cos(t) * 0.3

      // update line positions
      const pos = geometry.attributes.position.array as Float32Array

      pos[0] = sphere1.current.position.x
      pos[1] = sphere1.current.position.y
      pos[2] = sphere1.current.position.z

      pos[3] = sphere2.current.position.x
      pos[4] = sphere2.current.position.y
      pos[5] = sphere2.current.position.z

      geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>

      {/* 🔵 NODE 1 */}
      <mesh ref={sphere1} position={[-1.5, 0, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* 🟣 NODE 2 */}
      <mesh ref={sphere2} position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* 🔗 ENTANGLEMENT LINE (FIXED WAY) */}
      <primitive object={lineRef.current} />

      {/* 🏷️ KEYWORDS INPUT 1 */}
      <Html position={[-1.5, 0.6, 0]}>
        <div className="text-xs text-cyan-300 bg-black/60 px-3 py-2 rounded backdrop-blur-sm">
          {keywords1.map((word, i) => (
            <div key={i}>{word}</div>
          ))}
        </div>
      </Html>

      {/* 🏷️ KEYWORDS INPUT 2 */}
      <Html position={[1.5, 0.6, 0]}>
        <div className="text-xs text-purple-300 bg-black/60 px-3 py-2 rounded backdrop-blur-sm">
          {keywords2.map((word, i) => (
            <div key={i}>{word}</div>
          ))}
        </div>
      </Html>

    </>
  )
}

export default EntanglementLines