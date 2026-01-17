import { useEffect, useMemo, useRef, useState } from "react"
import { getPlaybook, listPlaybooks } from "../data/playbooks.js"

function nowTs() {
  const d = new Date()
  return d.toISOString().replace("T", " ").slice(0, 19)
}

function makeCaseId() {
  const y = new Date().getFullYear()
  return `IR-${y}-${String(Math.floor(1000 + Math.random() * 9000))}`
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeIncidentSummary() {
  const titles = [
    "Suspicious auth burst from new ASN",
    "Possible credential access pattern observed",
    "Unusual child process chain (PowerShell)",
    "Email threat: malicious URL detected",
    "Privilege escalation heuristic matched",
    "Service principal activity deviates from baseline",
  ]
  return pick(titles)
}

export default function PlaybookConsole({
  paused = false,
  requestedPlaybookId,
  incident,
  onConsumeRequest,
}) {
  const scrollerRef = useRef(null)
  const [activeRun, setActiveRun] = useState(null)
  const [lines, setLines] = useState(() => [
    { kind: "sys", ts: nowTs(), text: "SOAR_ORCHESTRATOR online. Awaiting cases…" },
    { kind: "sys", ts: nowTs(), text: "Tip: run a playbook from CLI: playbooks / run PHISHING_TRIAGE" },
  ])

  const available = useMemo(() => listPlaybooks(), [])

  const push = (kind, text) => {
    setLines((prev) => [...prev, { kind, ts: nowTs(), text }].slice(-240))
  }

  // autoscroll
  useEffect(() => {
    scrollerRef.current?.scrollTo?.({ top: scrollerRef.current.scrollHeight, behavior: "smooth" })
  }, [lines.length])

  const startRun = (playbookId, incidentCtx) => {
    const pb = getPlaybook(playbookId)
    if (!pb) {
      push("err", `Unknown playbook: ${playbookId}`)
      return
    }
    const caseId = makeCaseId()
    const summary = incidentCtx?.detail || incidentCtx?.signal || makeIncidentSummary()
    const source = incidentCtx?.subsystem ? `source=${incidentCtx.subsystem}` : "source=telemetry"

    setActiveRun({
      id: `${caseId}-${Date.now()}`,
      caseId,
      incident: summary,
      playbookId,
      stepIdx: -1,
    })

    push("sys", `AUTO_RESPONSE TRIGGERED • severity=HIGH • ${source}`)
    push("sys", `CASE_OPENED ${caseId} • ${summary}`)
    push("cmd", `soar run ${pb.title} --case ${caseId} --mode clean`)
    push("out", `PLAYBOOK ${pb.title}: ${pb.description}`)
  }

  // external request from CLI
  useEffect(() => {
    if (!requestedPlaybookId) return
    if (paused) return
    if (activeRun) {
      push("err", `BUSY: playbook already running (${activeRun.playbookId}). Try again in a moment.`)
      onConsumeRequest?.()
      return
    }
    startRun(requestedPlaybookId, incident)
    onConsumeRequest?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedPlaybookId])

  // No background autonomous runs — keep it clean: playbooks run only from triggers/requests.

  // step execution
  useEffect(() => {
    if (paused) return
    if (!activeRun) return
    const pb = getPlaybook(activeRun.playbookId)
    if (!pb) return

    const nextIdx = activeRun.stepIdx + 1
    if (nextIdx >= pb.steps.length) {
      push("out", `CASE_STATUS ${activeRun.caseId}: containment=enacted • evidence=collected • next=review`)
      push("sys", `CASE_CLOSED ${activeRun.caseId} • playbook=${activeRun.playbookId}`)
      setActiveRun(null)
      return
    }

    const step = pb.steps[nextIdx]
    push("out", `STEP ${String(nextIdx + 1).padStart(2, "0")}/${pb.steps.length} ${step.name}`)
    push("out", `  tool=${step.tool}`)
    const t = window.setTimeout(() => {
      push("ok", `  result=${step.output}`)
      setActiveRun((r) => (r ? { ...r, stepIdx: nextIdx } : r))
    }, step.ms)
    return () => window.clearTimeout(t)
  }, [paused, activeRun])

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="terminal-muted">
          STATUS:{" "}
          <span className={paused ? "text-zinc-400" : "text-cyber-200"}>{paused ? "PAUSED" : "RUNNING"}</span>
          {activeRun ? (
            <>
              {" "}
              • ACTIVE_CASE: <span className="text-zinc-200">{activeRun.caseId}</span> • PLAYBOOK:{" "}
              <span className="text-zinc-200">{activeRun.playbookId}</span>
            </>
          ) : (
            " • IDLE"
          )}
        </div>
        <div className="terminal-muted">
          AVAILABLE: <span className="text-zinc-200">{available.join(" · ")}</span>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="h-[360px] overflow-auto rounded-xl border border-white/10 bg-black/25 px-4 py-3"
      >
        <div className="grid gap-1">
          {lines.map((l, i) => (
            <div key={`${l.ts}-${i}`} className="grid grid-cols-[auto_1fr] gap-x-3">
              <div className="font-mono text-[10px] text-zinc-500">{l.ts.slice(11)}</div>
              <div
                className={[
                  "font-mono text-[12px] break-words",
                  l.kind === "err"
                    ? "text-rose-200"
                    : l.kind === "cmd"
                      ? "text-zinc-200"
                      : l.kind === "sys"
                        ? "text-cyber-200"
                        : l.kind === "ok"
                          ? "text-cyber-100"
                          : "text-zinc-300",
                ].join(" ")}
              >
                {l.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

