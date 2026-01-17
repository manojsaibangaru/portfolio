import { useEffect, useRef } from 'react'

/**
 * Matrix Rain Effect
 * 
 * Canvas-based falling code animation
 * Gives that classic "hacker" aesthetic
 */
export default function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Characters to display
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|;:<>?/~`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const charArray = chars.split('')
    
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    
    // Array to track y position of each column
    const drops = Array(columns).fill(1)

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(5, 7, 12, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Green text
      ctx.fillStyle = '#00e69a'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        
        // Draw character
        ctx.fillStyle = Math.random() > 0.98 ? '#fff' : 'rgba(0, 230, 154, 0.6)'
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        // Reset drop to top randomly after it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 45)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 opacity-[0.15]"
      style={{ pointerEvents: 'none' }}
    />
  )
}
