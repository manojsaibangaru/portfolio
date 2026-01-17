import CodeBlock from "../ui/CodeBlock.jsx"

/**
 * Detect Step - Terminal/Cybersecurity Aesthetic
 */
export default function DetectStep({ detect }) {
  if (!detect) return null

  return (
    <div className="space-y-6 font-mono text-sm">
      {/* Header */}
      <div className="flex items-center gap-3 text-blue-400 border-b border-zinc-800 pb-4">
        <span className="text-2xl">🔍</span>
        <div>
          <div className="text-lg">DETECTION_ANALYSIS</div>
          <div className="text-xs text-zinc-600">// SIEM correlation and threat hunting</div>
        </div>
      </div>

      {/* Platform */}
      <div className="flex items-center justify-between p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
        <span className="text-zinc-500">SIEM_PLATFORM:</span>
        <span className="text-blue-400">{detect.siem}</span>
      </div>

      {/* Alerts */}
      <div>
        <div className="flex items-center gap-2 text-zinc-500 mb-3">
          <span>▸</span>
          <span>TRIGGERED_ALERTS</span>
        </div>
        <div className="space-y-2">
          {detect.alerts.map((alert, i) => (
            <div key={i} className="rounded-lg border border-zinc-800 bg-black/40 p-4">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-white">{alert.name}</span>
                <div className="flex items-center gap-3">
                  <span className={`
                    px-2 py-0.5 rounded text-[10px]
                    ${alert.severity === 'CRITICAL' || alert.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : ''}
                    ${alert.severity === 'HIGH' || alert.severity === 'High' ? 'bg-orange-500/20 text-orange-400' : ''}
                    ${alert.severity === 'MEDIUM' || alert.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                    ${alert.severity === 'LOW' || alert.severity === 'Low' ? 'bg-green-500/20 text-green-400' : ''}
                  `}>
                    {alert.severity}
                  </span>
                  <span className="text-zinc-600 text-xs">{alert.time}</span>
                </div>
              </div>
              <p className="text-zinc-500 text-xs">{alert.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Queries */}
      <div>
        <div className="flex items-center gap-2 text-cyan-400 mb-3">
          <span>▸</span>
          <span>DETECTION_QUERIES</span>
        </div>
        <div className="space-y-3">
          {detect.queries.map((query, i) => (
            <div key={i}>
              <div className="text-xs text-cyan-400 mb-1">// {query.name}</div>
              <CodeBlock code={query.code} language={query.language} />
            </div>
          ))}
        </div>
      </div>

      {/* Analysis */}
      <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
        <div className="flex items-center gap-2 text-blue-400 mb-3">
          <span>▸</span>
          <span>ANALYSIS_FINDINGS</span>
        </div>
        <ul className="space-y-2">
          {detect.analysis.map((finding, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-400">
              <span className="text-blue-500 shrink-0">[+]</span>
              <span>{finding}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
