import React from 'react'

const Enchanting: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden font-comfortaa">
      {/* Animation de vagues */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-blue-600 via-teal-500 to-cyan-400 opacity-60 animate-wave"></div>

      Enchanting
    </section>
  )
}

export default Enchanting;