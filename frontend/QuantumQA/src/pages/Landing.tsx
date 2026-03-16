import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import StatsChart from "../components/StatsChart"
import Footer from "../components/Footer"

const Landing = () => {

    return (
  
      <div className="min-h-screen bg-[#020617] text-white">
  
        <Navbar/>
  
        <Hero/>
  
        <Features/>
  
        <StatsChart/>
  
        <Footer/>
  
      </div>
  
    )
  
  }
export default Landing