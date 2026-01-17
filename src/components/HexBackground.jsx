/**
 * Hex/Binary Background Pattern
 * 
 * Subtle hexadecimal code in the background
 * Reinforces the cybersecurity theme
 */
export default function HexBackground() {
  // Generate random hex strings
  const hexLines = Array(20).fill(0).map(() => 
    Array(60).fill(0).map(() => 
      Math.random().toString(16).substring(2, 4).toUpperCase()
    ).join(' ')
  )

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-950/50 to-bg-950" />
      <div className="font-mono text-[10px] text-white/[0.03] leading-relaxed whitespace-pre overflow-hidden">
        {hexLines.map((line, i) => (
          <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}
