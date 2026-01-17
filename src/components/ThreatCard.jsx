import { useEffect, useState } from "react"

const THREAT_SCENARIOS = [
  {
    id: "CRED_ACCESS",
    title: "Credential Access Attempt",
    description: "Kerberoasting detected on domain controller",
    source: "DC01.corp.local",
    target: "svc_backup (service account)",
    mitre: "T1558.003",
    severity: "HIGH",
  },
  {
    id: "PHISHING",
    title: "Phishing Campaign Detected",
    description: "Malicious URL clicked by 3 users",
    source: "External: 185.234.x.x",
    target: "finance-team@corp.com",
    mitre: "T1566.002",
    severity: "HIGH",
  },
  {
    id: "CLOUD_ANOMALY",
    title: "Cloud IAM Anomaly",
    description: "Unusual API calls from new geographic location",
    source: "AWS us-east-1",
    target: "iam:CreateAccessKey",
    mitre: "T1078.004",
    severity: "HIGH",
  },
  {
    id: "PRIV_ESC",
    title: "Privilege Escalation",
    description: "Local admin created via suspicious process",
    source: "WKS-042.corp.local",
    target: "net localgroup administrators",
    mitre: "T1136.001",
    severity: "HIGH",
  },
]

function SeverityBadge({ severity }) {
  const isHigh = severity === "HIGH" || severity === "CRITICAL"
  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs tracking-widest",
        isHigh
          ? "border border-threat-500/30 bg-threat-500/15 text-rose-200"
          : "border border-warning-500/30 bg-warning-500/15 text-amber-200",
      ].join(" ")}
    >
      <span
        className={[
          "h-2 w-2 rounded-full animate-pulse",
          isHigh ? "bg-threat-500" : "bg-warning-500",
        ].join(" ")}
      />
      {severity}
    </div>
  )
}

export default function ThreatCard({ onThreatChange, paused = false }) {
  const [threat, setThreat] = useState(() => THREAT_SCENARIOS[0])
  const [caseId, setCaseId] = useState(() => `IR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`)
  const [pulse, setPulse] = useState(true)

  // Cycle threats
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      const next = THREAT_SCENARIOS[Math.floor(Math.random() * THREAT_SCENARIOS.length)]
      const newCaseId = `IR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      setThreat(next)
      setCaseId(newCaseId)
      setPulse(true)
      onThreatChange?.({ ...next, caseId: newCaseId })
    }, 12000)
    return () => clearInterval(t)
  }, [paused, onThreatChange])

  // Initial emit
  useEffect(() => {
    onThreatChange?.({ ...threat, caseId })
  }, [])

  // Pulse effect
  useEffect(() => {
    if (!pulse) return
    const t = setTimeout(() => setPulse(false), 600)
    return () => clearTimeout(t)
  }, [pulse])

  return (
    <div
      className={[
        "gradient-border rounded-2xl bg-panel-900/70 backdrop-blur shadow-threat relative overflow-hidden transition-all duration-300",
        pulse ? "ring-2 ring-threat-500/40" : "",
      ].join(" ")}
    >
      <div className="absolute inset-x-0 -top-24 h-40 opacity-30 blur-2xl bg-gradient-to-r from-threat-500/50 via-transparent to-warning-500/30" />

      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-threat-500 shadow-[0_0_18px_rgba(255,59,114,0.5)] animate-pulse" />
          <div className="font-mono text-xs text-zinc-300">
            <span className="text-threat-500/80">! </span>
            <span className="text-zinc-200">THREAT_DETECTED</span>
          </div>
        </div>
        <div className="font-mono text-[10px] tracking-widest text-zinc-400">
          REQUIRES_RESPONSE
        </div>
      </div>

      <div className="relative px-5 py-5">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 scanlines opacity-5" />

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="font-mono text-[10px] tracking-widest text-zinc-500">
            CASE: {caseId}
          </div>
          <SeverityBadge severity={threat.severity} />
        </div>

        <h3 className="text-lg font-semibold text-zinc-50 mb-2">
          {threat.title}
        </h3>
        <p className="text-sm text-zinc-300 mb-4">
          {threat.description}
        </p>

        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <span className="font-mono text-[10px] tracking-widest text-zinc-500">SOURCE</span>
            <span className="font-mono text-[11px] text-zinc-200 truncate">{threat.source}</span>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <span className="font-mono text-[10px] tracking-widest text-zinc-500">TARGET</span>
            <span className="font-mono text-[11px] text-zinc-200 truncate">{threat.target}</span>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <span className="font-mono text-[10px] tracking-widest text-zinc-500">MITRE ATT&CK</span>
            <span className="font-mono text-[11px] text-cyber-200">{threat.mitre}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
