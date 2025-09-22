"use client"

import { useEffect, useRef } from "react"
import { Server, Globe, Zap, Shield } from "lucide-react"

interface NetworkNode {
  x: number
  y: number
  type: "server" | "globe" | "zap" | "shield"
  pulsePhase: number
  connections: number[]
}

interface DataPacket {
  x: number
  y: number
  targetX: number
  targetY: number
  progress: number
  speed: number
  fromNode: number
  toNode: number
}

export default function HeroEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<NetworkNode[]>([])
  const packetsRef = useRef<DataPacket[]>([])
  const animationRef = useRef<number>(1)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Crear nodos de red
    const createNodes = () => {
      const nodes: NetworkNode[] = [
        // Servidor principal (centro-izquierda)
        { x: canvas.width * 0.15, y: canvas.height * 0.3, type: "server", pulsePhase: 0, connections: [1, 2, 3] },
        // Globo (centro-derecha)
        { x: canvas.width * 0.85, y: canvas.height * 0.4, type: "globe", pulsePhase: Math.PI, connections: [0, 2] },
        // Velocidad (arriba-centro)
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.15,
          type: "zap",
          pulsePhase: Math.PI * 0.5,
          connections: [0, 1, 3],
        },
        // Seguridad (abajo-centro)
        {
          x: canvas.width * 0.6,
          y: canvas.height * 0.7,
          type: "shield",
          pulsePhase: Math.PI * 1.5,
          connections: [0, 2],
        },
      ]
      nodesRef.current = nodes
    }

    createNodes()

    // Crear paquetes de datos
    const createDataPacket = (fromIndex: number, toIndex: number) => {
      const fromNode = nodesRef.current[fromIndex]
      const toNode = nodesRef.current[toIndex]

      return {
        x: fromNode.x,
        y: fromNode.y,
        targetX: toNode.x,
        targetY: toNode.y,
        progress: 0,
        speed: 0.008 + Math.random() * 0.004,
        fromNode: fromIndex,
        toNode: toIndex,
      }
    }

    // Función de animación
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar conexiones
      nodesRef.current.forEach((node, index) => {
        node.connections.forEach((targetIndex) => {
          const target = nodesRef.current[targetIndex]

          // Línea de conexión
          ctx.save()
          ctx.globalAlpha = 0.2
          ctx.strokeStyle = "#00FFFF"
          ctx.lineWidth = 1
          ctx.setLineDash([5, 5])
          ctx.lineDashOffset = -time * 0.05
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.stroke()
          ctx.restore()
        })
      })

      // Dibujar nodos
      nodesRef.current.forEach((node, index) => {
        const pulseIntensity = Math.sin(time * 0.003 + node.pulsePhase) * 0.3 + 0.7

        // Glow exterior
        ctx.save()
        ctx.globalAlpha = pulseIntensity * 0.3
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 25)
        gradient.addColorStop(0, node.type === "server" || node.type === "zap" ? "#00FFFF" : "#00BFFF")
        gradient.addColorStop(1, "transparent")
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, 25, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Círculo del nodo
        ctx.save()
        ctx.globalAlpha = pulseIntensity
        ctx.fillStyle = node.type === "server" || node.type === "zap" ? "#00FFFF" : "#00BFFF"
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Anillo exterior
        ctx.save()
        ctx.globalAlpha = pulseIntensity * 0.6
        ctx.strokeStyle = node.type === "server" || node.type === "zap" ? "#00FFFF" : "#00BFFF"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      })

      // Gestionar paquetes de datos
      packetsRef.current = packetsRef.current.filter((packet) => {
        packet.progress += packet.speed

        if (packet.progress >= 1) {
          return false // Eliminar paquete completado
        }

        // Calcular posición actual
        packet.x = packet.x + (packet.targetX - packet.x) * packet.speed * 10
        packet.y = packet.y + (packet.targetY - packet.y) * packet.speed * 10

        // Dibujar paquete
        ctx.save()
        ctx.globalAlpha = Math.sin(packet.progress * Math.PI) // Fade in/out
        ctx.fillStyle = "#84CC16" // Verde lima para los datos
        ctx.beginPath()
        ctx.arc(packet.x, packet.y, 3, 0, Math.PI * 2)
        ctx.fill()

        // Estela del paquete
        ctx.globalAlpha = 0.3
        ctx.fillStyle = "#84CC16"
        ctx.beginPath()
        ctx.arc(
          packet.x - (packet.targetX - packet.x) * 0.1,
          packet.y - (packet.targetY - packet.y) * 0.1,
          2,
          0,
          Math.PI * 2,
        )
        ctx.fill()
        ctx.restore()

        return true
      })

      // Crear nuevos paquetes ocasionalmente
      if (Math.random() < 0.02) {
        const fromIndex = Math.floor(Math.random() * nodesRef.current.length)
        const fromNode = nodesRef.current[fromIndex]
        if (fromNode.connections.length > 0) {
          const toIndex = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)]
          packetsRef.current.push(createDataPacket(fromIndex, toIndex))
        }
      }

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
    <div ref={containerRef} className="absolute inset-0 pointer-events-none h-[100%]" style={{ top: "50%", transform: "translateY(-40%)" }}>
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />

      {/* Iconos estáticos para referencia visual */}
      <div className="absolute inset-0 -z-1">
        <div className="absolute" style={{ left: "15%", top: "30%", transform: "translate(-50%, -50%)" }}>
          <div className="w-8 h-8 flex items-center justify-center bg-cyan-400/10 rounded-full backdrop-blur-sm">
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        <div className="absolute" style={{ left: "85%", top: "40%", transform: "translate(-50%, -50%)" }}>
          <div className="w-8 h-8 flex items-center justify-center bg-blue-400/10 rounded-full backdrop-blur-sm">
            <Globe className="w-4 h-4 text-blue-400" />
          </div>
        </div>

        <div className="absolute" style={{ left: "50%", top: "15%", transform: "translate(-50%, -50%)" }}>
          <div className="w-8 h-8 flex items-center justify-center bg-cyan-400/10 rounded-full backdrop-blur-sm">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        <div className="absolute" style={{ left: "60%", top: "70%", transform: "translate(-50%, -50%)" }}>
          <div className="w-8 h-8 flex items-center justify-center bg-blue-400/10 rounded-full backdrop-blur-sm">
            <Shield className="w-4 h-4 text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
