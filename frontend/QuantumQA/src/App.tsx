import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import QuantumApp from "./pages/QuantumApp"

function App() {

  return (

    <Routes>

      <Route path="/" element={<Landing />} />

      <Route path="/app" element={<QuantumApp />} />

    </Routes>

  )

}

export default App