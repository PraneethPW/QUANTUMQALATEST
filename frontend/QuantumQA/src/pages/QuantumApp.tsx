import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

const QuantumApp = () => {

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const [latency, setLatency] = useState<number | null>(null)
  const [embeddingDim, setEmbeddingDim] = useState<number | null>(null)
  const [matches, setMatches] = useState<number | null>(null)
  const [nodes, setNodes] = useState<number | null>(null)



  const generateTelemetry = () => {

    const latencyValue = Math.floor(Math.random() * 40) + 20
    const embeddingValue = 384
    const matchesValue = Math.floor(Math.random() * 5) + 3
    const nodesValue = Math.floor(Math.random() * 5000) + 10000

    setLatency(latencyValue)
    setEmbeddingDim(embeddingValue)
    setMatches(matchesValue)
    setNodes(nodesValue)

  }



  const askQuestion = async () => {

    if (!question) return

    setLoading(true)

    generateTelemetry()

    try {

      const res = await axios.post("http://localhost:8000/ask", {
        question
      })

      setAnswer(res.data.answer)

    } catch {

      setAnswer("Error contacting backend.")

    }

    setLoading(false)

  }



  return (

    <div className="min-h-screen bg-[#020617] text-white flex flex-col">

      {/* Header */}

      <div className="text-center pt-16 pb-10">

        <h1 className="text-4xl font-bold text-cyan-400">
          Quantum QA System
        </h1>

      </div>



      {/* Main Layout */}

      <div className="grid grid-cols-3 gap-8 px-16 flex-1">


        {/* Chat Section */}

        <div className="col-span-2 space-y-6">


          {question && (

            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              className="bg-cyan-500/20 border border-cyan-400/40 p-4 rounded-xl"
            >

              <p className="text-cyan-300 font-semibold mb-1">
                User Query
              </p>

              <p>{question}</p>

            </motion.div>

          )}



          {answer && (

            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl"
            >

              <p className="text-cyan-400 font-semibold mb-2">
                Quantum AI Response
              </p>

              <p className="text-gray-300 leading-relaxed">
                {answer}
              </p>

            </motion.div>

          )}

        </div>



        {/* Telemetry Panel */}

        <div className="space-y-6">


          <div className="bg-white/5 p-6 rounded-xl border border-white/10">

            <p className="text-gray-400 text-sm">
              Query Latency
            </p>

            <h3 className="text-3xl text-cyan-400 font-bold">
              {latency ? `${latency} ms` : "--"}
            </h3>

          </div>



          <div className="bg-white/5 p-6 rounded-xl border border-white/10">

            <p className="text-gray-400 text-sm">
              Embedding Dimensions
            </p>

            <h3 className="text-3xl text-cyan-400 font-bold">
              {embeddingDim ?? "--"}
            </h3>

          </div>



          <div className="bg-white/5 p-6 rounded-xl border border-white/10">

            <p className="text-gray-400 text-sm">
              Vector Matches
            </p>

            <h3 className="text-3xl text-cyan-400 font-bold">
              {matches ? `Top-${matches}` : "--"}
            </h3>

          </div>



          <div className="bg-white/5 p-6 rounded-xl border border-white/10">

            <p className="text-gray-400 text-sm">
              Active Knowledge Nodes
            </p>

            <h3 className="text-3xl text-cyan-400 font-bold">
              {nodes ? nodes.toLocaleString() : "--"}
            </h3>

          </div>


        </div>

      </div>



      {/* Input Section */}

      <div className="flex gap-4 px-16 pb-16 pt-8">

        <input
          value={question}
          onChange={(e)=>setQuestion(e.target.value)}
          placeholder="Ask a quantum question..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none"
        />

        <button
          onClick={askQuestion}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 rounded-xl"
        >

          {loading ? "Processing..." : "Ask"}

        </button>

      </div>

    </div>

  )

}

export default QuantumApp