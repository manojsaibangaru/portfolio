import { useEffect, useState } from "react"

function formatTime(ms) {
  const mins = Math.floor(ms / 60000)
  const secs = Math.floor((ms % 60000) / 1000)
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
}

function CaseCard({ caseData, isLatest }) {
  const { caseId, title, severity, status, playbook, mttr } = caseData

  return (
    <div
      className={[
        "rounded-xl border bg-panel-900/50 backdrop-blur px-4 py-3 transition-all duration-500",
        isLatest ? "border-cyber-500/30 ring-1 ring-cyber-500/20" : "border-white/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="font-mono text-[10px] tracking-widest text-zinc-500">
          {caseId}
        </div>
        <div
          className={[
            "rounded-full px-2 py-0.5 font-mono text-[9px] tracking-widest",
            status === "CONTAINED"
              ? "bg-cyber-500/15 text-cyber-200 border border-cyber-500/25"
              : status === "CLOSED"
              ? "bg-zinc-500/15 text-zinc-400 border border-zinc-500/25"
              : "bg-warning-500/15 text-amber-200 border border-warning-500/25",
          ].join(" ")}
        >
          {status}
        </div>
      </div>

      <div className="text-sm text-zinc-200 mb-2 line-clamp-1">{title}</div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={[
              "rounded px-1.5 py-0.5 font-mono text-[9px]",
              severity === "HIGH"
                ? "bg-threat-500/15 text-rose-200"
                : "bg-warning-500/15 text-amber-200",
            ].join(" ")}
          >
            {severity}
          </span>
          <span className="font-mono text-[10px] text-zinc-500 truncate">{playbook}</span>
        </div>
        <div className="font-mono text-[10px] text-cyber-300">
          {formatTime(mttr)}
        </div>
      </div>
    </div>
  )
}

export default function CaseFiles({ completedCases = [] }) {
  const [displayCases, setDisplayCases] = useState([])

  useEffect(() => {
    // Keep last 4 cases
    setDisplayCases(completedCases.slice(-4))
  }, [completedCases])

  if (displayCases.length === 0) {
    return (
      <div className="gradient-border rounded-2xl bg-panel-900/70 backdrop-blur shadow-glow">
        <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
            <div className="font-mono text-xs text-zinc-300">
              <span className="text-zinc-500">&gt; </span>
              <span className="text-zinc-400">CASE_FILES</span>
            </div>
          </div>
          <div className="font-mono text-[10px] tracking-widest text-zinc-500">
            AWAITING_DATA
          </div>
        </div>
        <div className="px-5 py-8 text-center">
          <div className="font-mono text-[11px] text-zinc-500">
            Resolved cases will appear here...
          </div>
        </div>
      </div>
    )
  }

  const totalMttr = displayCases.reduce((sum, c) => sum + c.mttr, 0)
  const avgMttr = totalMttr / displayCases.length

  return (
    <div className="gradient-border rounded-2xl bg-panel-900/70 backdrop-blur shadow-glow">
      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-cyber-400 shadow-[0_0_12px_rgba(0,230,154,0.25)]" />
          <div className="font-mono text-xs text-zinc-300">
            <span className="text-cyber-300/80">&gt; </span>
            <span className="text-zinc-200">CASE_FILES</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-[9px] tracking-widest text-zinc-500">RESOLVED</div>
            <div className="font-mono text-sm text-cyber-200">{displayCases.length}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] tracking-widest text-zinc-500">AVG MTTR</div>
            <div className="font-mono text-sm text-cyber-200">{formatTime(avgMttr)}</div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="grid gap-3 md:grid-cols-2">
          {displayCases.map((c, i) => (
            <CaseCard
              key={c.caseId}
              caseData={c}
              isLatest={i === displayCases.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
