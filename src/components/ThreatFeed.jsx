import { useState, useEffect } from 'react'

/**
 * Simulated Threat Feed
 * 
 * Shows realistic-looking security events scrolling by
 * Makes the portfolio feel like a live SOC dashboard
 */

const THREAT_EVENTS = [
  { type: 'INFO', source: 'Azure AD', message: 'User authentication successful from known IP' },
  { type: 'LOW', source: 'Firewall', message: 'Outbound connection blocked: suspicious port 4444' },
  { type: 'MEDIUM', source: 'EDR', message: 'PowerShell execution detected: encoded command' },
  { type: 'HIGH', source: 'SIEM', message: 'Multiple failed logins from foreign IP detected' },
  { type: 'INFO', source: 'Proxy', message: 'Web traffic scan complete: 0 threats detected' },
  { type: 'LOW', source: 'Email GW', message: 'Spam email quarantined: Nigerian prince scam' },
  { type: 'MEDIUM', source: 'IDS', message: 'Signature match: potential SQL injection attempt' },
  { type: 'INFO', source: 'SOAR', message: 'Playbook executed: User account enrichment' },
  { type: 'HIGH', source: 'Sentinel', message: 'Impossible travel alert: US to Russia in 5min' },
  { type: 'LOW', source: 'DNS', message: 'Query to known ad-tracking domain blocked' },
  { type: 'CRITICAL', source: 'EDR', message: 'Mimikatz signature detected on endpoint' },
  { type: 'INFO', source: 'Vault', message: 'Secret rotation completed successfully' },
  { type: 'MEDIUM', source: 'WAF', message: 'XSS attempt blocked: reflected payload' },
  { type: 'INFO', source: 'SIEM', message: 'Correlation rule triggered: brute force pattern' },
  { type: 'LOW', source: 'Firewall', message: 'Port scan detected from external IP' },
]

const SEVERITY_COLORS = {
  INFO: 'text-blue-400 bg-blue-500/10',
  LOW: 'text-green-400 bg-green-500/10',
  MEDIUM: 'text-yellow-400 bg-yellow-500/10',
  HIGH: 'text-orange-400 bg-orange-500/10',
  CRITICAL: 'text-red-400 bg-red-500/10 animate-pulse',
}

export default function ThreatFeed() {
  const [events, setEvents] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Initialize with a few events
    const initial = THREAT_EVENTS.slice(0, 4).map((e, i) => ({
      ...e,
      id: i,
      time: new Date(Date.now() - (3 - i) * 3000)
    }))
    setEvents(initial)

    // Add new events periodically
    let eventId = 4
    const eventInterval = setInterval(() => {
      const randomEvent = THREAT_EVENTS[Math.floor(Math.random() * THREAT_EVENTS.length)]
      setEvents(prev => [
        { ...randomEvent, id: eventId++, time: new Date() },
        ...prev.slice(0, 5)
      ])
    }, 4000)

    // Update time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(eventInterval)
      clearInterval(timeInterval)
    }
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: false })
  }

  return (
    <div className="font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span>LIVE THREAT FEED</span>
        </div>
        <span>{formatTime(currentTime)} UTC</span>
      </div>

      {/* Events */}
      <div className="space-y-2">
        {events.map((event) => (
          <div 
            key={event.id}
            className="flex items-start gap-3 p-2 rounded-lg bg-black/30 border border-white/5 animate-fadeIn"
          >
            <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold ${SEVERITY_COLORS[event.type]}`}>
              {event.type}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-zinc-500">[{formatTime(event.time)}]</span>
                <span className="text-cyan-400">{event.source}</span>
              </div>
              <div className="text-zinc-300 truncate">{event.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
