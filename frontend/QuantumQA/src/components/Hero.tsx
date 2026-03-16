import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import QuantumField from "./QuantumField"
import GradientBackground from "./GradientBackground"

const Hero = () => {

  const navigate = useNavigate()

  return (

    <section className="relative h-screen grid grid-cols-2 items-center px-20">

      <GradientBackground />

      <div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold leading-tight"
        >

          Quantum Language Model

          <br />

          <span className="text-primary">

            Entanglement Embeddings

          </span>

        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-gray-300 text-lg max-w-xl"
        >

          Explore a next-generation AI system powered by quantum-inspired
          embeddings, vector databases, and intelligent reasoning.

        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/app")}
          className="mt-10 bg-primary text-black px-8 py-4 rounded-xl text-lg font-medium shadow-lg"
        >

          Launch Quantum QA

        </motion.button>

      </div>

      <div className="h-[600px]">

        <QuantumField />

      </div>

    </section>

  )

}

export default Hero