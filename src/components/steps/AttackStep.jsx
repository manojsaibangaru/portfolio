import CodeBlock from "../ui/CodeBlock.jsx"

/**
 * Attack Step - Terminal/Cybersecurity Aesthetic
 */
export default function AttackStep({ attack }) {
  if (!attack) return null

  return (
    <div className="space-y-6 font-mono text-sm">
      {/* Header */}
      <div className="flex items-center gap-3 text-red-400 border-b border-zinc-800 pb-4">
        <span className="text-2xl">⚠</span>
        <div>
          <div className="text-lg">THREAT_ANALYSIS</div>
          <div className="text-xs text-zinc-600">// Initial attack vector identification</div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
        <div className="text-xs text-zinc-600 mb-2">$ cat incident_description.txt</div>
        <p className="text-zinc-300 leading-relaxed">{attack.description}</p>
      </div>

      {/* IOCs */}
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
        <div className="flex items-center gap-2 text-red-400 mb-3">
          <span>▸</span>
          <span>INDICATORS_OF_COMPROMISE</span>
        </div>
        <ul className="space-y-2">
          {attack.indicators.map((indicator, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-400">
              <span className="text-red-500 shrink-0">[!]</span>
              <span className="break-all">{indicator}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Artifacts */}
      {attack.artifacts?.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-zinc-500 mb-3">
            <span>▸</span>
            <span>EVIDENCE_ARTIFACTS</span>
          </div>
          <div className="space-y-3">
            {attack.artifacts.map((artifact, i) => (
              <CodeBlock
                key={i}
                title={artifact.type}
                code={artifact.content}
                language="IOC"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
