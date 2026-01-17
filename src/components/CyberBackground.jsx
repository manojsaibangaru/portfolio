import { useEffect, useRef } from "react"

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function CyberBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const state = {
      dpr: 1,
      w: 0,
      h: 0,
      t: 0,
      mouseX: 0.5,
      mouseY: 0.3,
      particles: [],
    }

    const createParticles = (count) => {
      const arr = []
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random(),
          y: Math.random(),
          vx: rand(-0.05, 0.05),
          vy: rand(0.02, 0.08),
          r: rand(0.6, 1.8),
          a: rand(0.18, 0.55),
        })
      }
      return arr
    }

    const resize = () => {
      state.dpr = clamp(window.devicePixelRatio || 1, 1, 2)
      state.w = Math.floor(window.innerWidth)
      state.h = Math.floor(window.innerHeight)
      canvas.width = Math.floor(state.w * state.dpr)
      canvas.height = Math.floor(state.h * state.dpr)
      canvas.style.width = `${state.w}px`
      canvas.style.height = `${state.h}px`
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0)

      const density = state.w * state.h
      const target = clamp(Math.floor(density / 28000), 28, 120)
      state.particles = createParticles(target)
    }

    const onMove = (e) => {
      const x = e.clientX / Math.max(1, state.w)
      const y = e.clientY / Math.max(1, state.h)
      state.mouseX = clamp(x, 0, 1)
      state.mouseY = clamp(y, 0, 1)
      document.documentElement.style.setProperty("--mx", `${state.mouseX * 100}%`)
      document.documentElement.style.setProperty("--my", `${state.mouseY * 100}%`)
    }

    let raf = 0
    const draw = () => {
      state.t += 1
      ctx.clearRect(0, 0, state.w, state.h)

      // vignette
      const g = ctx.createRadialGradient(
        state.w * state.mouseX,
        state.h * state.mouseY,
        0,
        state.w * 0.5,
        state.h * 0.5,
        Math.max(state.w, state.h) * 0.8,
      )
      g.addColorStop(0, "rgba(0, 230, 154, 0.12)")
      g.addColorStop(0.35, "rgba(0, 230, 154, 0.06)")
      g.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, state.w, state.h)

      // grid
      const spacing = 56
      const ox = (state.t * 0.25) % spacing
      const oy = (state.t * 0.18) % spacing
      ctx.lineWidth = 1
      ctx.strokeStyle = "rgba(0, 230, 154, 0.07)"
      ctx.beginPath()
      for (let x = -spacing; x < state.w + spacing; x += spacing) {
        ctx.moveTo(x + ox, 0)
        ctx.lineTo(x + ox, state.h)
      }
      for (let y = -spacing; y < state.h + spacing; y += spacing) {
        ctx.moveTo(0, y + oy)
        ctx.lineTo(state.w, y + oy)
      }
      ctx.stroke()

      // particles
      for (const p of state.particles) {
        p.x += p.vx * 0.7
        p.y += p.vy * 0.7
        if (p.y > 1.08) {
          p.y = -0.08
          p.x = Math.random()
        }
        if (p.x < -0.08) p.x = 1.08
        if (p.x > 1.08) p.x = -0.08

        const x = p.x * state.w
        const y = p.y * state.h
        ctx.fillStyle = `rgba(0, 230, 154, ${p.a})`
        ctx.beginPath()
        ctx.arc(x, y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize, { passive: true })
    window.addEventListener("mousemove", onMove, { passive: true })

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-20 opacity-90"
    />
  )
}

