import { Link, useLocation } from "react-router-dom"
import { Cpu, Activity } from "lucide-react"

const Navbar = () => {
  const location = useLocation()

  return (

    <nav className="flex items-center justify-between px-12 py-6">

      {/* Logo */}

      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold text-cyan-400">
          QuantumQA
        </Link>

        <div className="hidden md:flex items-center gap-3 text-sm">
          <Link
            to="/visualize"
            className={`rounded-lg px-3 py-1.5 border ${
              location.pathname === "/visualize"
                ? "border-cyan-400/60 text-cyan-200 bg-cyan-500/10"
                : "border-white/10 text-gray-300 hover:bg-white/5"
            }`}
          >
            Embedding Map
          </Link>
        </div>
      </div>


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