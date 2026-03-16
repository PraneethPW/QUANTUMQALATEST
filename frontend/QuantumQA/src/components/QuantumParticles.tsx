import { Canvas } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useMemo } from "react"

const QuantumParticles = () => {

  const particles = useMemo(() => {
    const arr = new Float32Array(3000)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  return (
    <Canvas className="absolute inset-0 -z-10">
      <Points positions={particles} stride={3}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.02}
          sizeAttenuation
        />
      </Points>
    </Canvas>
  )
}

export default QuantumParticles