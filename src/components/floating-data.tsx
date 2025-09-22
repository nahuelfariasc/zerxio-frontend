"use client"

import { useEffect, useState } from "react"

interface DataIndicator {
  id: number
  x: number
  y: number
  text: string
  opacity: number
  direction: number
}

export default function FloatingData() {
  const [indicators, setIndicators] = useState<DataIndicator[]>([])

  useEffect(() => {
    const dataTypes = [
      "99.9% Uptime",
      "SSD",
      "CDN Global",
      "SSL Gratuito",
      "Soporte 24/7",
      "Auto Backup",
      "Instalacion en 1 click",
    ]

    const createIndicator = (): DataIndicator => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      text: dataTypes[Math.floor(Math.random() * dataTypes.length)],
      opacity: 0,
      direction: -1,
    })

    const interval = setInterval(() => {
      setIndicators((prev) => {
        // Limpiar indicadores que ya salieron de pantalla
        const filtered = prev.filter((indicator) => indicator.y > -10)

        // Añadir nuevo indicador ocasionalmente
        if (Math.random() < 0.3 && filtered.length < 3) {
          return [...filtered, createIndicator()]
        }

        return filtered
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIndicators((prev) =>
        prev.map((indicator) => ({
          ...indicator,
          y: indicator.y + indicator.direction * 0.5,
          opacity: indicator.y > 80 ? Math.max(0, indicator.opacity - 0.02) : Math.min(0.6, indicator.opacity + 0.02),
        })),
      )
    }, 50)

    return () => clearInterval(animationInterval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-1">
      {indicators.map((indicator) => (
        <div
          key={indicator.id}
          className="absolute text-xs font-mono text-cyan-400 bg-slate-900/80 px-2 py-1 rounded border border-cyan-400/30 backdrop-blur-sm"
          style={{
            left: `${indicator.x}%`,
            top: `${indicator.y}%`,
            opacity: indicator.opacity,
            transform: "translateX(-50%)",
            transition: "all 0.1s ease-out",
          }}
        >
          {indicator.text}
        </div>
      ))}
    </div>
  )
}
