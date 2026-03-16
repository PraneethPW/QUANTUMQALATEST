import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import ParticleSystem from "./ParticleSystem"
import EntanglementLines from "./EntanglementLines"

const QuantumField = () => {

return (

<Canvas camera={{position:[0,0,5]}}>

<ambientLight intensity={0.5} />

<ParticleSystem />

<EntanglementLines />

<OrbitControls enableZoom={false} />

</Canvas>

)

}

export default QuantumField