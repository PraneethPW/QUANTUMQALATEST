import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    ResponsiveContainer
  } from "recharts"
  
  const pipelineData = [
    { step: "Embedding", value: 40 },
    { step: "Vector Search", value: 70 },
    { step: "LLM Reasoning", value: 95 }
  ]
  
  const throughputData = [
    { name: "Docs", value: 120 },
    { name: "Queries", value: 90 },
    { name: "Responses", value: 75 }
  ]
  
  const StatsChart = () => {
  
    return (
  
      <section className="px-20 py-24">
  
        <h2 className="text-5xl font-bold mb-16">
          Quantum Processing Pipeline
        </h2>
  
        <div className="grid grid-cols-3 gap-12">
  
          {/* Line Chart */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-white/10">
  
            <h3 className="mb-6 text-xl">
              Pipeline Efficiency
            </h3>
  
            <ResponsiveContainer width="100%" height={250}>
  
              <LineChart data={pipelineData}>
  
                <XAxis dataKey="step" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
  
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22d3ee"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
  
              </LineChart>
  
            </ResponsiveContainer>
  
          </div>
  
          {/* Bar Chart */}
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-xl border border-white/10">
  
            <h3 className="mb-6 text-xl">
              System Throughput
            </h3>
  
            <ResponsiveContainer width="100%" height={250}>
  
              <BarChart data={throughputData}>
  
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
  
                <Bar
                  dataKey="value"
                  fill="#22d3ee"
                  radius={[6,6,0,0]}
                />
  
              </BarChart>
  
            </ResponsiveContainer>
  
          </div>
  
          {/* Metrics */}
          <div className="flex flex-col gap-6">
  
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10">
  
              <p className="text-gray-400 text-sm">
                Average Query Latency
              </p>
  
              <h4 className="text-3xl font-bold text-cyan-400">
                42 ms
              </h4>
  
            </div>
  
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10">
  
              <p className="text-gray-400 text-sm">
                Embedding Dimensions
              </p>
  
              <h4 className="text-3xl font-bold text-cyan-400">
                384
              </h4>
  
            </div>
  
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10">
  
              <p className="text-gray-400 text-sm">
                Active Knowledge Nodes
              </p>
  
              <h4 className="text-3xl font-bold text-cyan-400">
                12,450
              </h4>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
  
    )
  
  }
  
  export default StatsChart