import { motion } from "framer-motion"
import {
  Cpu,
  Database,
  Brain,
  Network,
  Layers,
  Activity,
  Shield,
  Zap
} from "lucide-react"

const features = [
  {
    title: "Quantum Embeddings",
    description:
      "Vector representations inspired by quantum states enabling richer semantic relationships.",
    icon: Cpu
  },
  {
    title: "Vector Search Engine",
    description:
      "High-dimensional similarity search powered by pgvector and fast retrieval pipelines.",
    icon: Database
  },
  {
    title: "OpenRouter LLM",
    description:
      "Access powerful language models through OpenRouter for reasoning and answer generation.",
    icon: Brain
  },
  {
    title: "Real-Time Entanglement",
    description:
      "Visualize knowledge connections through interactive quantum graphs.",
    icon: Network
  },
  {
    title: "RAG Knowledge Retrieval",
    description:
      "Retrieve relevant knowledge chunks from vector databases for precise responses.",
    icon: Layers
  },
  {
    title: "Live Query Analytics",
    description:
      "Monitor system throughput, embeddings performance and inference latency.",
    icon: Activity
  },
  {
    title: "Secure Data Handling",
    description:
      "Ensure encrypted communication between frontend, backend and AI services.",
    icon: Shield
  },
  {
    title: "High-Speed Processing",
    description:
      "Optimized pipelines ensure rapid query resolution and real-time reasoning.",
    icon: Zap
  }
]

const Features = () => {

  return (

    <section className="px-20 py-24 relative">

      <h2 className="text-5xl font-bold mb-16 text-white">
        Platform Capabilities
      </h2>

      <div className="grid grid-cols-4 gap-10">

        {features.map((f, i) => {

          const Icon = f.icon

          return (

            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative group p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden cursor-pointer"
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl border border-cyan-400/40" />

              <Icon
                className="text-cyan-400 mb-6 group-hover:scale-125 transition"
                size={36}
              />

              <h3 className="text-xl font-semibold mb-3">
                {f.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {f.description}
              </p>

            </motion.div>

          )

        })}

      </div>

    </section>

  )

}

export default Features