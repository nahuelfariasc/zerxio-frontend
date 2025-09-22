"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  pulseSpeed: number
  pulsePhase: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Crear partículas
    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000) // Densidad adaptativa

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, // Velocidad horizontal lenta
          vy: (Math.random() - 0.5) * 0.5, // Velocidad vertical lenta
          size: Math.random() * 3 + 1, // Tamaño entre 1 y 4
          opacity: Math.random() * 0.6 + 0.2, // Opacidad entre 0.2 y 0.8
          color: Math.random() > 0.5 ? "#00FFFF" : "#00BFFF", // Cian o azul eléctrico
          pulseSpeed: Math.random() * 0.02 + 0.01, // Velocidad de pulso
          pulsePhase: Math.random() * Math.PI * 2, // Fase inicial del pulso
        })
      }

      particlesRef.current = particles
    }

    createParticles()

    // Función de animación
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Actualizar posición
        particle.x += particle.vx
        particle.y += particle.vy

        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Mantener dentro de los límites
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Efecto de pulso
        const pulseOpacity = particle.opacity + Math.sin(time * particle.pulseSpeed + particle.pulsePhase) * 0.3

        // Dibujar partícula
        ctx.save()
        ctx.globalAlpha = Math.max(0.1, Math.min(1, pulseOpacity))

        // Crear gradiente radial para efecto glow
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Núcleo sólido
        ctx.globalAlpha = Math.max(0.3, Math.min(1, pulseOpacity))
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()

        // Conectar partículas cercanas
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.save()
            const lineOpacity = ((120 - distance) / 120) * 0.2
            ctx.globalAlpha = lineOpacity
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-2 w-full h-full" style={{ background: "transparent" }} />
  )
}