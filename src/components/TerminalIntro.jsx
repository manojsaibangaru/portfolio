import { useState, useEffect } from 'react'

/**
 * Terminal Boot Sequence
 * 
 * Shows a dramatic terminal boot animation on first visit
 * Makes the user feel like they're accessing a secure system
 */

const BOOT_SEQUENCE = [
  { text: '> INITIALIZING SECURITY TERMINAL...', delay: 0 },
  { text: '> LOADING THREAT INTELLIGENCE DATABASE...', delay: 400 },
  { text: '> CONNECTING TO SIEM/SOAR INFRASTRUCTURE...', delay: 800 },
  { text: '> AUTHENTICATING USER SESSION...', delay: 1200 },
  { text: '> DECRYPTING PROFILE DATA...', delay: 1600 },
  { text: '> [OK] SECURITY CLEARANCE: GRANTED', delay: 2000, success: true },
  { text: '> WELCOME TO MANOJSAI\'S SECURITY OPERATIONS CENTER', delay: 2400, highlight: true },
  { text: '', delay: 2800 },
]

export default function TerminalIntro({ onComplete }) {
  const [lines, setLines] = useState([])
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Check if already seen
    const hasSeen = sessionStorage.getItem('bootSequenceSeen')
    if (hasSeen) {
      onComplete()
      return
    }

    // Add lines progressively
    BOOT_SEQUENCE.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line])
        
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => {
            setIsComplete(true)
            sessionStorage.setItem('bootSequenceSeen', 'true')
            setTimeout(onComplete, 800)
          }, 600)
        }
      }, line.delay)
    })

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [onComplete])

  // Skip on click or key
  const handleSkip = () => {
    sessionStorage.setItem('bootSequenceSeen', 'true')
    onComplete()
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center cursor-pointer"
      onClick={handleSkip}
      onKeyDown={(e) => e.key === 'Escape' && handleSkip()}
      tabIndex={0}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      
      {/* CRT glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,230,154,0.03)_0%,transparent_70%)]" />

      {/* Terminal window */}
      <div className={`w-full max-w-3xl mx-4 transition-opacity duration-500 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 rounded-t-xl border border-zinc-800 border-b-0">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-4 font-mono text-xs text-zinc-500">security-terminal — bash</span>
        </div>

        {/* Terminal body */}
        <div className="bg-black/90 p-6 rounded-b-xl border border-zinc-800 border-t-0 font-mono text-sm min-h-[300px]">
          {lines.map((line, i) => (
            <div 
              key={i} 
              className={`mb-1 ${
                line.success ? 'text-green-400' : 
                line.highlight ? 'text-cyan-400 font-bold' : 
                'text-zinc-300'
              }`}
            >
              {line.text}
            </div>
          ))}
          
          {/* Cursor */}
          <span className={`inline-block w-2.5 h-5 bg-green-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        {/* Skip hint */}
        <div className="text-center mt-4 font-mono text-xs text-zinc-600">
          Press any key or click to skip
        </div>
      </div>
    </div>
  )
}
