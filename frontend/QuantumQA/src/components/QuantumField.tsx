import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import ParticleSystem from "./ParticleSystem"
import EntanglementLines from "./EntanglementLines"

type Props = {
  input1?: string
  input2?: string
}

const QuantumField = ({ input1, input2 }: Props) => {

  return (

    <Canvas camera={{ position: [0, 0, 5] }}>

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />

      {/* Background particle field */}
      <ParticleSystem />

      {/* 🔥 Entanglement Nodes + Connection */}
      <EntanglementLines input1={input1} input2={input2} />

      {/* Controls */}
      <OrbitControls enableZoom={false} />

    </Canvas>

  )

}

export default QuantumField