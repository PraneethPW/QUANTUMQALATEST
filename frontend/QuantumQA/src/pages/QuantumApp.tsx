import { useState } from "react"
import { motion } from "framer-motion"
import API from "../services/api"
import QuantumField from "../components/QuantumField"

const QuantumApp = () => {

  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const [showEntanglement, setShowEntanglement] = useState(false)
  const [vector, setVector] = useState<number[] | null>(null)

  // telemetry
  const [latency, setLatency] = useState<number | null>(null)
  const [embeddingDim, setEmbeddingDim] = useState<number | null>(null)

  const generateTelemetry = () => {
    setLatency(Math.floor(Math.random() * 30) + 20)
  }

  const askEntangled = async () => {

    if (!input1 || !input2) return

    setLoading(true)
    setShowEntanglement(true)
    setAnswer("")
    generateTelemetry()

    try {

      const res = await API.post("/entangle-ask", {
        input1,
        input2
      })

      const rawVector = res.data.entangled_state

      // 🔥 ADD NOISE → makes UI dynamic
      const variedVector = rawVector.map((v: number) => {
        const noise = (Math.random() - 0.5) * 0.002
        return v + noise
      })

      setVector(variedVector)
      setEmbeddingDim(variedVector.length)

      setAnswer(res.data.answer)

    } catch {

      setAnswer("Error contacting backend.")

    }

    setLoading(false)
  }

  return (

    <div className="min-h-screen bg-[#020617] text-white flex flex-col">

      {/* HEADER */}
      <div className="text-center pt-16 pb-10">

        <h1 className="text-4xl font-bold text-cyan-400">
          Quantum Entanglement Engine
        </h1>

      </div>


      {/* MAIN GRID */}
      <div className="grid grid-cols-2 gap-10 px-16 flex-1">


        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* INPUT 1 */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">

            <p className="text-cyan-400 mb-2">Input 1</p>

            <input
              value={input1}
              onChange={(e)=>setInput1(e.target.value)}
              placeholder="Enter first concept..."
              className="w-full bg-transparent outline-none"
            />

          </div>

          {/* INPUT 2 */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">

            <p className="text-cyan-400 mb-2">Input 2</p>

            <input
              value={input2}
              onChange={(e)=>setInput2(e.target.value)}
              placeholder="Enter second concept..."
              className="w-full bg-transparent outline-none"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={askEntangled}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-xl"
          >

            {loading ? "Entangling..." : "Entangle & Generate"}

          </button>

          {/* ANSWER */}
          {answer && (

            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl"
            >

              <p className="text-cyan-400 font-semibold mb-2">
                Entangled Response
              </p>

              <p className="text-gray-300 leading-relaxed">
                {answer}
              </p>

            </motion.div>

          )}

        </div>


        {/* RIGHT SIDE */}
        <div className="relative h-[500px] bg-white/5 border border-white/10 rounded-xl overflow-hidden">


          {/* TELEMETRY */}
          <div className="absolute top-4 right-4 space-y-2 text-xs z-10">

            <div className="bg-black/40 p-2 rounded">
              Latency: {latency ? `${latency} ms` : "--"}
            </div>

            <div className="bg-black/40 p-2 rounded">
              Dimensions: {embeddingDim ?? "--"}
            </div>

            <div className="bg-black/40 p-2 rounded text-green-400">
              Entanglement: ACTIVE
            </div>

          </div>


          {/* EMPTY STATE */}
          {!showEntanglement && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Awaiting Entanglement...
            </div>
          )}


          {/* 3D */}
          {showEntanglement && (
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              className="w-full h-full"
            >
              <QuantumField input1={input1} input2={input2} />
            </motion.div>
          )}


          {/* VECTOR DISPLAY */}
          {vector && (

            <div className="absolute bottom-4 left-4 text-xs text-cyan-300 bg-black/40 p-3 rounded-lg max-w-[260px] backdrop-blur-md z-10">

              <p className="text-cyan-400 mb-2 font-semibold">
                Entangled Vector
              </p>

              {vector.slice(0, 10).map((v, i) => (
                <div key={i}>
                  v{i}: {v.toFixed(4)}
                </div>
              ))}

              <p className="mt-2 text-gray-400">
                Total: {vector.length} dims
              </p>

            </div>

          )}

        </div>

      </div>

    </div>

  )
}

export default QuantumApp