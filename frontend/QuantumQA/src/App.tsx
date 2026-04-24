import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import EmbeddingVisualizer from "./pages/EmbeddingVisualizer.tsx"

function App() {

  return (

    <Routes>

      <Route path="/" element={<Landing />} />

      <Route path="/visualize" element={<EmbeddingVisualizer />} />

    </Routes>

  )

}

export default App