import { Cpu, Activity } from "lucide-react"

const Navbar = () => {

  return (

    <nav className="flex items-center justify-between px-12 py-6">

      {/* Logo */}

      <h1 className="text-2xl font-bold text-cyan-400">
        QuantumQA
      </h1>


      {/* Right Side Indicators */}

      <div className="flex items-center gap-8 text-sm text-gray-400">

        {/* AI Status */}

        <div className="flex items-center gap-2">

          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

          <span>AI Online</span>

        </div>


        {/* Engine */}

        <div className="flex items-center gap-2">

          <Cpu size={16} />

          <span>Quantum Engine</span>

        </div>


        {/* Activity */}

        <div className="flex items-center gap-2">

          <Activity size={16} />

          <span>Live Nodes</span>

        </div>

      </div>

    </nav>

  )

}

export default Navbar