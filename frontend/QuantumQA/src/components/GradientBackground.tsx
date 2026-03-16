const GradientBackground = () => {

    return (
  
      <div className="absolute inset-0 -z-10 overflow-hidden">
  
        {/* Purple glow */}
        <div className="absolute w-[900px] h-[900px] bg-purple-700 opacity-40 blur-[220px] rounded-full top-[-300px] left-[10%]" />
  
        {/* Cyan glow */}
        <div className="absolute w-[700px] h-[700px] bg-cyan-500 opacity-40 blur-[200px] rounded-full bottom-[-200px] right-[10%]" />
  
        {/* Blue glow */}
        <div className="absolute w-[800px] h-[800px] bg-blue-600 opacity-30 blur-[240px] rounded-full top-[200px] left-[50%]" />
  
      </div>
  
    )
  
  }
  
  export default GradientBackground