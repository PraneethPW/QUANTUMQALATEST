import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

type ParticleProps = {
position:[number,number,number]
}

const Particle = ({position}:ParticleProps) => {

return(

<mesh position={position}>
<sphereGeometry args={[0.1,32,32]} />
<meshStandardMaterial color="#00F5FF" />
</mesh>

)

}

const QuantumCanvas = () => {

return(

<Canvas>

<ambientLight intensity={0.5}/>

<pointLight position={[10,10,10]}/>

<Particle position={[0,0,0]}/>
<Particle position={[1,1,0]}/>
<Particle position={[-1,-1,0]}/>
<Particle position={[2,0,-1]}/>

<OrbitControls/>

</Canvas>

)

}

export default QuantumCanvas