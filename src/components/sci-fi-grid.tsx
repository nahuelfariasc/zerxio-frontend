"use client"

export default function SciFiGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-1 opacity-10">
      {/* Grid horizontal */}
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              top: `${(i + 1) * 5}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Grid vertical */}
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent"
            style={{
              left: `${(i + 1) * 5}%`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}