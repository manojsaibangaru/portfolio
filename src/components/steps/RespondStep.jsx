/**
 * Respond Step - Terminal/Cybersecurity Aesthetic
 */
export default function RespondStep({ respond }) {
  if (!respond) return null

  return (
    <div className="space-y-6 font-mono text-sm">
      {/* Header */}
      <div className="flex items-center gap-3 text-green-400 border-b border-zinc-800 pb-4">
        <span className="text-2xl">🛡</span>
        <div>
          <div className="text-lg">INCIDENT_RESPONSE</div>
          <div className="text-xs text-zinc-600">// Containment and remediation actions</div>
        </div>
      </div>

      {/* Containment Status */}
      {respond.containmentStatus && (
        <div className="flex items-center justify-between p-3 rounded-lg border border-green-500/20 bg-green-500/5">
          <span className="text-zinc-500">CONTAINMENT_STATUS:</span>
          <span className="text-green-400">{respond.containmentStatus}</span>
        </div>
      )}

      {/* Response Actions */}
      <div>
        <div className="flex items-center gap-2 text-zinc-500 mb-3">
          <span>▸</span>
          <span>RESPONSE_TIMELINE</span>
        </div>
        <div className="border-l border-zinc-800 pl-4 space-y-4">
          {respond.timeline?.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border border-zinc-700 bg-black" />
              <div className="flex items-center gap-3 mb-1">
                <span className="text-green-400 text-xs">{item.time}</span>
                {item.automated && (
                  <span className="px-2 py-0.5 rounded text-[9px] bg-green-500/20 text-green-400">AUTOMATED</span>
                )}
              </div>
              <p className="text-zinc-400">{item.action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SOAR */}
      {respond.soar && (
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <div className="flex items-center gap-2 text-green-400 mb-4">
            <span>▸</span>
            <span>SOAR_ORCHESTRATION</span>
          </div>
          <div className="flex items-center justify-between mb-4 text-xs">
            <span className="text-zinc-500">Platform: <span className="text-white">{respond.soar.platform}</span></span>
            <span className="text-zinc-500">Playbook: <span className="text-green-400">{respond.soar.playbook}</span></span>
          </div>
          {/* Integrations */}
          {respond.soar.integrations && (
            <div className="flex flex-wrap gap-2 mb-4">
              {respond.soar.integrations.map((integration, i) => (
                <span key={i} className="px-2 py-1 rounded text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {integration}
                </span>
              ))}
            </div>
          )}
          <div className="space-y-2">
            {respond.soar.automations?.map((automation, i) => (
              <div key={i} className="p-3 rounded border border-zinc-800 bg-black/40">
                <div className="text-white mb-1">{automation.name}</div>
                <div className="text-xs text-zinc-500 mb-2">{automation.description}</div>
                {automation.result && (
                  <div className="text-[10px] text-green-400 bg-black/50 rounded p-2">
                    → {automation.result}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
