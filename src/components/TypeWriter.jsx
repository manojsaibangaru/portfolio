import { useState, useEffect } from 'react'

/**
 * Typewriter Effect
 * 
 * Types out text character by character
 * Classic hacker movie aesthetic
 */
export default function TypeWriter({ 
  text, 
  speed = 50, 
  delay = 0,
  className = '',
  onComplete = () => {}
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout
    let charIndex = 0

    const startTyping = () => {
      timeout = setTimeout(function type() {
        if (charIndex < text.length) {
          setDisplayedText(text.substring(0, charIndex + 1))
          charIndex++
          timeout = setTimeout(type, speed)
        } else {
          setIsComplete(true)
          onComplete()
        }
      }, speed)
    }

    timeout = setTimeout(startTyping, delay)

    return () => clearTimeout(timeout)
  }, [text, speed, delay, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">▊</span>}
    </span>
  )
}
