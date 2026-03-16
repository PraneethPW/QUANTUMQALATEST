import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const ParticleSystem = () => {

const mesh = useRef<THREE.Points>(null!)

const count = 500

const positions = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10
}

useFrame(() => {
  if(mesh.current){
    mesh.current.rotation.y += 0.001
    mesh.current.rotation.x += 0.0005
  }
})

return (

<points ref={mesh}>

<bufferGeometry>

<bufferAttribute
 attach="attributes-position"
 args={[positions, 3]}
/>

</bufferGeometry>

<pointsMaterial
 color="#00F5FF"
 size={0.03}
/>

</points>

)

}

export default ParticleSystem