import { useEffect, useState, useCallback } from "react"
import { IR_PHASES, IR_SCENARIOS } from "../data/irScenarios.js"

function PhaseNode({ phase, status, isCurrent }) {
  const getStatusStyles = () => {
    if (status === "complete") {
      return "border-cyber-500/50 bg-cyber-500/15 text-cyber-200"
    }
    if (status === "active") {
      return "border-cyber-400 bg-cyber-500/25 text-cyber-100 ring-2 ring-cyber-400/30 animate-pulse"
    }
    return "border-white/10 bg-white/5 text-zinc-500"
  }

  const getIcon = () => {
    if (status === "complete") {
      return (
        <svg className="h-4 w-4 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )
    }
    if (status === "active") {
      return <div className="h-2.5 w-2.5 rounded-full bg-cyber-400 animate-ping" />
    }
    return <div className="h-2 w-2 rounded-full bg-zinc-600" />
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-xl border-2 transition-all duration-500",
          getStatusStyles(),
        ].join(" ")}
      >
        {getIcon()}
        {status === "active" && (
          <div className="absolute inset-0 rounded-xl bg-cyber-400/10 animate-pulse" />
        )}
      </div>
      <div className="text-center">
        <div
          className={[
            "font-mono text-[10px] md:text-xs font-semibold tracking-wider",
            status === "complete" ? "text-cyber-300" : status === "active" ? "text-cyber-200" : "text-zinc-500",
          ].join(" ")}
        >
          {phase.label}
        </div>
        <div className="font-mono text-[8px] md:text-[9px] text-zinc-600 hidden md:block">
          {phase.description}
        </div>
      </div>
    </div>
  )
}

function PhaseConnector({ status }) {
  return (
    <div className="flex-1 flex items-center px-1 md:px-2">
      <div
        className={[
          "h-0.5 w-full rounded-full transition-all duration-500",
          status === "complete"
            ? "bg-gradient-to-r from-cyber-500 to-cyber-400"
            : "bg-white/10",
        ].join(" ")}
      />
    </div>
  )
}

function PhaseDetails({ scenario, currentPhaseId, phaseData }) {
  if (!phaseData) return null

  return (
    <div className="mt-4 rounded-xl border border-cyber-500/20 bg-cyber-500/5 p-4 animate-fadeIn">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="font-mono text-[10px] tracking-widest text-cyber-300/70">
            PHASE: {currentPhaseId?.toUpperCase()}
          </div>
          <div className="font-mono text-sm text-zinc-200 mt-1">
            {phaseData.action}
          </div>
        </div>
        <div className="shrink-0 rounded-lg border border-white/10 bg-black/30 px-2 py-1">
          <div className="font-mono text-[9px] text-zinc-500">TOOL</div>
          <div className="font-mono text-[11px] text-cyber-200">{phaseData.tool}</div>
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
        <div className="font-mono text-[9px] tracking-widest text-zinc-500 mb-1">OUTPUT</div>
        <div className="font-mono text-[11px] text-zinc-300">{phaseData.output}</div>
      </div>
    </div>
  )
}

function ScenarioHeader({ scenario, caseId, status }) {
  return (
    <div className="mb-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={[
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-widest",
                scenario.severity === "CRITICAL"
                  ? "bg-threat-500/20 text-rose-200 border border-threat-500/30"
                  : "bg-threat-500/15 text-rose-300 border border-threat-500/25",
              ].join(" ")}
            >
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full",
                  status === "complete" ? "bg-cyber-400" : "bg-threat-500 animate-pulse",
                ].join(" ")}
              />
              {scenario.severity}
            </span>
            <span className="font-mono text-[10px] text-zinc-500">{caseId}</span>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100">{scenario.title}</h3>
        </div>
        <div
          className={[
            "rounded-lg px-3 py-1.5 font-mono text-[10px] tracking-widest",
            status === "complete"
              ? "bg-cyber-500/15 text-cyber-200 border border-cyber-500/25"
              : "bg-warning-500/15 text-amber-200 border border-warning-500/25",
          ].join(" ")}
        >
          {status === "complete" ? "RESOLVED" : "IN PROGRESS"}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5">
          <span className="font-mono text-[9px] text-zinc-500">SOURCE: </span>
          <span className="font-mono text-[11px] text-zinc-300">{scenario.source}</span>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5">
          <span className="font-mono text-[9px] text-zinc-500">MITRE: </span>
          <span className="font-mono text-[11px] text-cyber-200">{scenario.mitre}</span>
        </div>
      </div>
    </div>
  )
}

export default function IRCycleVisual({ paused = false, onCaseComplete }) {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(-1)
  const [status, setStatus] = useState("idle") // idle | running | complete
  const [caseId, setCaseId] = useState("")
  const [completedCases, setCompletedCases] = useState([])

  const scenario = IR_SCENARIOS[scenarioIndex]
  const currentPhase = IR_PHASES[currentPhaseIndex]
  const currentPhaseData = currentPhase ? scenario.phases[currentPhase.id] : null

  const generateCaseId = () => {
    const year = new Date().getFullYear()
    const num = Math.floor(1000 + Math.random() * 9000)
    return `IR-${year}-${num}`
  }

  const startNewScenario = useCallback(() => {
    const nextIndex = (scenarioIndex + 1) % IR_SCENARIOS.length
    setScenarioIndex(nextIndex)
    setCaseId(generateCaseId())
    setCurrentPhaseIndex(-1)
    setStatus("running")
  }, [scenarioIndex])

  // Initial start
  useEffect(() => {
    if (status === "idle") {
      setCaseId(generateCaseId())
      setStatus("running")
    }
  }, [status])

  // Phase progression
  useEffect(() => {
    if (paused || status !== "running") return

    if (currentPhaseIndex >= IR_PHASES.length - 1) {
      // All phases complete
      setStatus("complete")
      const completedCase = {
        caseId,
        title: scenario.title,
        severity: scenario.severity,
        mitre: scenario.mitre,
      }
      setCompletedCases((prev) => [...prev.slice(-3), completedCase])
      onCaseComplete?.(completedCase)

      // Start next scenario after delay
      const t = setTimeout(() => {
        startNewScenario()
      }, 4000)
      return () => clearTimeout(t)
    }

    // Progress to next phase
    const nextPhaseIndex = currentPhaseIndex + 1
    const nextPhase = IR_PHASES[nextPhaseIndex]
    const phaseData = scenario.phases[nextPhase.id]
    const duration = phaseData?.duration || 1000

    const t = setTimeout(() => {
      setCurrentPhaseIndex(nextPhaseIndex)
    }, currentPhaseIndex === -1 ? 500 : duration)

    return () => clearTimeout(t)
  }, [currentPhaseIndex, status, paused, scenario, caseId, startNewScenario, onCaseComplete])

  const getPhaseStatus = (index) => {
    if (index < currentPhaseIndex) return "complete"
    if (index === currentPhaseIndex) return "active"
    return "pending"
  }

  const progress = status === "complete" 
    ? 100 
    : Math.round(((currentPhaseIndex + 1) / IR_PHASES.length) * 100)

  return (
    <div className="gradient-border rounded-2xl bg-panel-900/70 backdrop-blur shadow-glow overflow-hidden">
      <div className="absolute inset-x-0 -top-24 h-40 opacity-25 blur-2xl bg-gradient-to-r from-threat-500/30 via-transparent to-cyber-500/30" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={[
              "h-2.5 w-2.5 rounded-full shadow-[0_0_12px]",
              status === "complete"
                ? "bg-cyber-400 shadow-cyber-400/40"
                : "bg-threat-500 shadow-threat-500/40 animate-pulse",
            ].join(" ")}
          />
          <div className="font-mono text-xs text-zinc-300">
            <span className="text-cyber-300/80">&gt; </span>
            <span className="text-zinc-200">INCIDENT_RESPONSE_CYCLE</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-[10px] tracking-widest text-zinc-500">
            {progress}% COMPLETE
          </div>
        </div>
      </div>

      <div className="relative px-5 py-5">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 scanlines opacity-5" />

        {/* Scenario Header */}
        <ScenarioHeader scenario={scenario} caseId={caseId} status={status} />

        {/* Progress Bar */}
        <div className="mb-5">
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className={[
                "h-full rounded-full transition-all duration-700",
                status === "complete"
                  ? "bg-gradient-to-r from-cyber-500 to-cyber-400"
                  : "bg-gradient-to-r from-threat-500 via-warning-500 to-cyber-500",
              ].join(" ")}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* IR Cycle Flowchart */}
        <div className="flex items-start justify-between gap-1 mb-4 overflow-x-auto pb-2">
          {IR_PHASES.map((phase, index) => (
            <div key={phase.id} className="flex items-center flex-1 min-w-0">
              <PhaseNode
                phase={phase}
                status={getPhaseStatus(index)}
                isCurrent={index === currentPhaseIndex}
              />
              {index < IR_PHASES.length - 1 && (
                <PhaseConnector status={index < currentPhaseIndex ? "complete" : "pending"} />
              )}
            </div>
          ))}
        </div>

        {/* Current Phase Details */}
        {currentPhaseData && status === "running" && (
          <PhaseDetails
            scenario={scenario}
            currentPhaseId={currentPhase?.id}
            phaseData={currentPhaseData}
          />
        )}

        {/* Completion Message */}
        {status === "complete" && (
          <div className="mt-4 rounded-xl border border-cyber-500/25 bg-cyber-500/10 p-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cyber-500/20 border border-cyber-500/30 flex items-center justify-center">
                <svg className="h-5 w-5 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-sm text-cyber-100">INCIDENT RESOLVED</div>
                <div className="font-mono text-[11px] text-zinc-400">
                  {caseId} • All phases complete • Loading next scenario...
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resolved Cases Footer */}
      {completedCases.length > 0 && (
        <div className="border-t border-white/6 px-5 py-3 bg-black/20">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-[9px] tracking-widest text-zinc-500">
              RESOLVED THIS SESSION
            </div>
            <div className="flex items-center gap-2">
              {completedCases.map((c) => (
                <div
                  key={c.caseId}
                  className="rounded-lg border border-cyber-500/20 bg-cyber-500/10 px-2 py-1"
                  title={c.title}
                >
                  <span className="font-mono text-[9px] text-cyber-200">{c.caseId}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
