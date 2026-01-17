import { useEffect, useMemo, useRef, useState } from "react"

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

const SEVERITIES = ["INFO", "LOW", "MED", "HIGH"]

function severityRank(s) {
  return SEVERITIES.indexOf(s)
}

function colorForSeverity(s) {
  switch (s) {
    case "HIGH":
      return "text-rose-200"
    case "MED":
      return "text-amber-100"
    case "LOW":
      return "text-cyber-200"
    default:
      return "text-zinc-200"
  }
}

function makeEvent(now = new Date()) {
  const subsystems = [
    "SPLUNK_SIEM",
    "SOAR_PLAYBOOK",
    "MDE_EDR",
    "AZURE_AD",
    "AWS_CLOUDTRAIL",
    "WAZUH_AGENT",
    "IDS_SENSOR",
  ]
  const signals = [
    "CORRELATION_MATCH",
    "ANOMALY_SCORE_SPIKE",
    "RULE_TUNE_SUGGESTION",
    "CASE_OPENED",
    "CASE_ENRICHMENT",
    "IOC_LOOKUP",
    "ALERT_TRIAGE",
    "HUNT_QUERY_RUN",
    "PLAYBOOK_RUN",
    "CONTAINMENT_ACTION",
  ]
  const details = [
    "Potential credential access pattern observed (MITRE:T1110)",
    "Suspicious auth burst from new ASN (rate anomaly)",
    "Service principal activity deviates from baseline (Entra ID)",
    "Endpoint spawned unusual child process chain (parent=Powershell)",
    "Email indicator enrichment completed (URL+hash+sender)",
    "Firewall deny burst correlated with host telemetry (east-west)",
    "Privilege escalation heuristic matched (admin_group_change)",
  ]

  const sev = pick(["INFO", "LOW", "LOW", "MED", "MED", "HIGH"])
  const sub = pick(subsystems)
  const sig = pick(signals)
  const det = pick(details)
  const caseId = `IR-${now.getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`
  const playbook = pick(["PHISHING_TRIAGE", "ALERT_ENRICH", "CONTAINMENT", "IOC_SWEEP", "ACCOUNT_LOCKDOWN"])
  const query = pick([
    'index=auth event=fail user=* | stats count dc(src_ip) by user | where count>40',
    'index=cloudtrail eventName=ConsoleLogin errorMessage!=success | stats count by userIdentity.arn',
    'index=edr process=* parent_process IN ("powershell.exe","cmd.exe") | stats count by host,user',
  ])
  const id = `${now.getTime()}-${Math.random().toString(16).slice(2)}`

  return {
    id,
    ts: now.toISOString().replace("T", " ").slice(0, 19),
    severity: sev,
    subsystem: sub,
    signal: sig,
    detail:
      sig === "CASE_OPENED"
        ? `${caseId} opened • ${det}`
        : sig === "HUNT_QUERY_RUN"
          ? `hunt executed • ${query}`
          : sig === "PLAYBOOK_RUN"
            ? `playbook=${playbook} • ${det}`
            : sig === "CONTAINMENT_ACTION"
              ? `containment=${pick(["isolate_endpoint", "disable_account", "block_ioc"])} • ${det}`
              : det,
  }
}

export default function LiveFeed({
  paused = false,
  minSeverity = "INFO",
  intervalMs = 1200,
  maxItems = 10,
  title = "LIVE_FEED (SIMULATED)",
  onEvent,
}) {
  const reduced = prefersReducedMotion()
  const [items, setItems] = useState(() => {
    const now = new Date()
    return Array.from({ length: 6 }).map((_, i) => makeEvent(new Date(now.getTime() - (6 - i) * 850)))
  })
  const minRank = useMemo(() => severityRank(minSeverity), [minSeverity])
  const itemsRef = useRef(items)
  itemsRef.current = items

  useEffect(() => {
    if (reduced) return
    if (paused) return
    const t = window.setInterval(() => {
      const next = makeEvent(new Date())
      const merged = [next, ...itemsRef.current].slice(0, clamp(maxItems, 3, 24))
      setItems(merged)
      try {
        onEvent?.(next)
      } catch {
        // ignore
      }
    }, clamp(intervalMs, 600, 4000))
    return () => window.clearInterval(t)
  }, [paused, intervalMs, maxItems, reduced, onEvent])

  const filtered = items.filter((e) => severityRank(e.severity) >= minRank)

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="font-mono text-[10px] tracking-widest text-zinc-400">{title}</div>
        <div className="font-mono text-[10px] tracking-widest text-zinc-500">
          {reduced ? "REDUCED_MOTION" : paused ? "PAUSED" : "STREAMING"}
        </div>
      </div>
      <div className="grid gap-1.5">
        {filtered.length ? (
          filtered.map((e) => (
            <div key={e.id} className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
              <div className="font-mono text-[10px] text-zinc-500">{e.ts.slice(11)}</div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className={["font-mono text-[10px] tracking-widest", colorForSeverity(e.severity)].join(" ")}>
                    {e.severity}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400">{e.subsystem}</span>
                  <span className="font-mono text-[10px] text-zinc-300">{e.signal}</span>
                </div>
                <div className="truncate font-mono text-[10px] text-zinc-400">{e.detail}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="font-mono text-[11px] text-zinc-400">No events at this threshold.</div>
        )}
      </div>
    </div>
  )
}

export { SEVERITIES }

