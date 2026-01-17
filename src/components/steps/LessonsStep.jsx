/**
 * Lessons Step - Terminal/Cybersecurity Aesthetic
 */
export default function LessonsStep({ lessons }) {
  if (!lessons) return null

  return (
    <div className="space-y-6 font-mono text-sm">
      {/* Header */}
      <div className="flex items-center gap-3 text-yellow-400 border-b border-zinc-800 pb-4">
        <span className="text-2xl">📝</span>
        <div>
          <div className="text-lg">POST_INCIDENT_REVIEW</div>
          <div className="text-xs text-zinc-600">// Lessons learned and improvements</div>
        </div>
      </div>

      {/* Metrics */}
      {lessons.metrics && (
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(lessons.metrics).map(([key, value]) => (
            <div key={key} className="p-4 rounded-lg border border-zinc-800 bg-black/40 text-center">
              <div className="text-2xl text-yellow-400">{value}</div>
              <div className="text-[10px] text-zinc-600 uppercase mt-1">{key}</div>
            </div>
          ))}
        </div>
      )}

      {/* Findings */}
      <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
        <div className="flex items-center gap-2 text-yellow-400 mb-3">
          <span>▸</span>
          <span>KEY_FINDINGS</span>
        </div>
        <ul className="space-y-2">
          {lessons.findings.map((finding, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-400">
              <span className="text-yellow-500 shrink-0">[*]</span>
              <span>{finding}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex items-center gap-2 text-zinc-500 mb-3">
          <span>▸</span>
          <span>RECOMMENDATIONS</span>
        </div>
        <div className="space-y-2">
          {lessons.recommendations.map((rec, i) => (
            <div key={i} className="p-3 rounded-lg border border-zinc-800 bg-black/40">
              <div className="flex items-center justify-between mb-2">
                <span className={`
                  px-2 py-0.5 rounded text-[10px]
                  ${rec.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : ''}
                  ${rec.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : ''}
                  ${rec.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                  ${rec.priority === 'Low' ? 'bg-blue-500/20 text-blue-400' : ''}
                `}>
                  {rec.priority}
                </span>
                <span className={`
                  px-2 py-0.5 rounded text-[10px]
                  ${rec.status === 'Implemented' || rec.status === 'Completed' ? 'bg-green-500/20 text-green-400' : ''}
                  ${rec.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                  ${rec.status === 'Planned' || rec.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${rec.status === 'Testing' || rec.status === 'Under Review' ? 'bg-purple-500/20 text-purple-400' : ''}
                `}>
                  {rec.status}
                </span>
              </div>
              <div className="text-zinc-300 text-xs">{rec.action}</div>
              {rec.owner && (
                <div className="text-[10px] text-zinc-600 mt-1">Owner: {rec.owner}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
