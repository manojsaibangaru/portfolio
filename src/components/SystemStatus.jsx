import { useState, useEffect } from 'react'

/**
 * System Status Panel
 * 
 * Shows fake but realistic system metrics
 * Makes it feel like a real security dashboard
 */
export default function SystemStatus() {
  const [stats, setStats] = useState({
    threats: 0,
    blocked: 0,
    uptime: '99.97%',
    lastScan: 'Just now'
  })

  useEffect(() => {
    // Simulate updating stats
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        threats: prev.threats + (Math.random() > 0.7 ? 1 : 0),
        blocked: prev.blocked + Math.floor(Math.random() * 3),
      }))
    }, 5000)

    // Initial random values
    setStats({
      threats: Math.floor(Math.random() * 5),
      blocked: Math.floor(Math.random() * 50) + 100,
      uptime: '99.97%',
      lastScan: 'Just now'
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
      <div className="p-3 rounded-lg bg-black/40 border border-green-500/20">
        <div className="text-green-400 mb-1">● SYSTEM SECURE</div>
        <div className="text-zinc-500">Uptime: {stats.uptime}</div>
      </div>
      <div className="p-3 rounded-lg bg-black/40 border border-blue-500/20">
        <div className="text-blue-400 mb-1">◉ MONITORING</div>
        <div className="text-zinc-500">Last scan: {stats.lastScan}</div>
      </div>
      <div className="p-3 rounded-lg bg-black/40 border border-yellow-500/20">
        <div className="text-yellow-400 mb-1">⚠ THREATS TODAY</div>
        <div className="text-2xl text-zinc-200">{stats.threats}</div>
      </div>
      <div className="p-3 rounded-lg bg-black/40 border border-cyan-500/20">
        <div className="text-cyan-400 mb-1">🛡 ATTACKS BLOCKED</div>
        <div className="text-2xl text-zinc-200">{stats.blocked}</div>
      </div>
    </div>
  )
}
