import { useState, useEffect, useMemo } from 'react'
import CommandPalette from './CommandPalette.jsx'

/**
 * Command Launcher
 * 
 * Global wrapper that:
 * - Listens for keyboard shortcuts (Ctrl+K, `)
 * - Shows floating launcher button
 * - Shows "Back to Top" button when scrolled down
 * - Renders the command palette when opened
 */
export default function CommandLauncher() {
  const [isOpen, setIsOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Detect if user is on Mac for keyboard shortcut display
  const isMac = useMemo(() => {
    if (typeof navigator !== 'undefined') {
      return navigator.platform.toUpperCase().includes('MAC') || 
             navigator.userAgent.toUpperCase().includes('MAC')
    }
    return false
  }, [])

  const shortcutKey = isMac ? '⌘K' : 'Ctrl+K'

  // Show hint on first visit
  useEffect(() => {
    if (!sessionStorage.getItem('commandHintSeen')) {
      setTimeout(() => {
        setShowHint(true)
        sessionStorage.setItem('commandHintSeen', 'true')
        setTimeout(() => setShowHint(false), 5000)
      }, 3000)
    }
  }, [])

  // Track scroll position for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than 400px
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      // Backtick
      if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Don't trigger if typing in an input
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          setIsOpen(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Floating buttons - positioned above footer */}
      <div className="fixed bottom-20 right-6 z-[100] flex items-center gap-2">
        {/* Back to Top button - compact circle */}
        <button
          onClick={scrollToTop}
          className={`
            group flex items-center justify-center w-11 h-11 rounded-full
            bg-black border-2 border-zinc-700 
            shadow-xl shadow-black/80 hover:border-green-500/50 
            hover:shadow-green-500/20 transition-all duration-300
            ${showBackToTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
          `}
          aria-label="Scroll to top"
        >
          <span className="text-green-400 text-lg group-hover:text-green-300 transition-colors">↑</span>
        </button>

        {/* CLI Launcher button - compact with strong border */}
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-black border-2 border-green-500/40 shadow-xl shadow-black/80 hover:border-green-500 hover:shadow-green-500/30 transition-all duration-300"
          aria-label="Open command palette"
        >
          {/* Hint tooltip */}
          {showHint && (
            <div className="absolute bottom-full right-0 mb-3 px-3 py-2 rounded-lg bg-black border border-green-500/30 text-green-400 text-xs font-mono whitespace-nowrap animate-fadeIn shadow-xl">
              <div className="flex items-center gap-2">
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-green-500/30">{shortcutKey}</kbd>
              </div>
              <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-black border-r border-b border-green-500/30" />
            </div>
          )}

          <span className="text-green-400 font-mono text-sm font-bold">$</span>
          <span className="text-green-500 animate-pulse font-mono text-sm">▊</span>
          
          {/* Keyboard shortcut - always visible, OS-aware */}
          <kbd className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-700">
            {shortcutKey}
          </kbd>
        </button>
      </div>

      {/* Command Palette */}
      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
