import { useEffect, useState, useRef } from "react"

const RESPONSE_STEPS = {
  CRED_ACCESS: [
    { id: 1, action: "Validate alert", tool: "SIEM::splunk", duration: 800 },
    { id: 2, action: "Enrich user context", tool: "IAM::azure_ad", duration: 600 },
    { id: 3, action: "Check for lateral movement", tool: "EDR::defender", duration: 900 },
    { id: 4, action: "Disable compromised account", tool: "IAM::disable_user", duration: 500 },
    { id: 5, action: "Notify security manager", tool: "ITSM::servicenow", duration: 400 },
    { id: 6, action: "Document and close case", tool: "SOAR::phantom", duration: 600 },
  ],
  PHISHING: [
    { id: 1, action: "Extract URLs and hashes", tool: "SOAR::phantom", duration: 700 },
    { id: 2, action: "Detonate in sandbox", tool: "Sandbox::any_run", duration: 1200 },
    { id: 3, action: "Check URL reputation", tool: "Intel::urlscan", duration: 600 },
    { id: 4, action: "Identify all recipients", tool: "SIEM::splunk", duration: 800 },
    { id: 5, action: "Quarantine emails", tool: "Email::m365", duration: 500 },
    { id: 6, action: "Reset affected credentials", tool: "IAM::azure_ad", duration: 700 },
    { id: 7, action: "Update case and notify", tool: "ITSM::servicenow", duration: 400 },
  ],
  CLOUD_ANOMALY: [
    { id: 1, action: "Correlate CloudTrail events", tool: "SIEM::splunk", duration: 900 },
    { id: 2, action: "Identify anomalous actions", tool: "UEBA::baseline", duration: 700 },
    { id: 3, action: "Revoke suspicious sessions", tool: "Cloud::aws_iam", duration: 600 },
    { id: 4, action: "Rotate access keys", tool: "Cloud::aws_iam", duration: 500 },
    { id: 5, action: "Enable MFA enforcement", tool: "IAM::policy", duration: 400 },
    { id: 6, action: "Document and close", tool: "SOAR::phantom", duration: 500 },
  ],
  PRIV_ESC: [
    { id: 1, action: "Isolate endpoint", tool: "EDR::defender", duration: 600 },
    { id: 2, action: "Capture forensic image", tool: "DFIR::velociraptor", duration: 1100 },
    { id: 3, action: "Remove malicious account", tool: "IAM::local_admin", duration: 500 },
    { id: 4, action: "Scan for persistence", tool: "EDR::autoruns", duration: 800 },
    { id: 5, action: "Reimage if needed", tool: "IT::sccm", duration: 400 },
    { id: 6, action: "Update IOCs and close", tool: "SOAR::phantom", duration: 500 },
  ],
}

function StepIcon({ status }) {
  if (status === "done") {
    return (
      <div className="h-6 w-6 rounded-full bg-cyber-500/20 border border-cyber-500/50 flex items-center justify-center">
        <svg className="h-3 w-3 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )
  }
  if (status === "running") {
    return (
      <div className="h-6 w-6 rounded-full bg-cyber-500/30 border-2 border-cyber-400 flex items-center justify-center animate-pulse">
        <div className="h-2 w-2 rounded-full bg-cyber-400" />
      </div>
    )
  }
  return (
    <div className="h-6 w-6 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
      <div className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
    </div>
  )
}

export default function ResponseTimeline({ threat, paused = false, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [status, setStatus] = useState("idle") // idle | running | complete
  const stepsRef = useRef([])

  const steps = threat?.id ? RESPONSE_STEPS[threat.id] || RESPONSE_STEPS.CRED_ACCESS : RESPONSE_STEPS.CRED_ACCESS

  // Reset when threat changes
  useEffect(() => {
    setCurrentStep(0)
    setStatus("running")
  }, [threat?.caseId])

  // Run through steps
  useEffect(() => {
    if (paused || status !== "running" || currentStep >= steps.length) {
      if (currentStep >= steps.length && status === "running") {
        setStatus("complete")
        onComplete?.(threat)
      }
      return
    }

    const step = steps[currentStep]
    const t = setTimeout(() => {
      setCurrentStep((s) => s + 1)
    }, step.duration)

    return () => clearTimeout(t)
  }, [currentStep, paused, status, steps, threat, onComplete])

  const progress = status === "complete" ? 100 : Math.round((currentStep / steps.length) * 100)

  return (
    <div className="gradient-border rounded-2xl bg-panel-900/70 backdrop-blur shadow-glow relative overflow-hidden">
      <div className="absolute inset-x-0 -top-24 h-40 opacity-25 blur-2xl bg-gradient-to-r from-cyber-500/40 via-transparent to-cyber-500/20" />

      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={[
              "h-2.5 w-2.5 rounded-full shadow-[0_0_18px_rgba(0,230,154,0.32)]",
              status === "running" ? "bg-cyber-400 animate-pulse" : "bg-cyber-500",
            ].join(" ")}
          />
          <div className="font-mono text-xs text-zinc-300">
            <span className="text-cyber-300/80">&gt; </span>
            <span className="text-zinc-200">RESPONSE_ACTIVE</span>
          </div>
        </div>
        <div className="font-mono text-[10px] tracking-widest text-zinc-400">
          {status === "complete" ? "CONTAINED" : "IN_PROGRESS"}
        </div>
      </div>

      <div className="relative px-5 py-5">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 scanlines opacity-5" />

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-widest text-zinc-500">PLAYBOOK PROGRESS</span>
            <span className="font-mono text-[11px] text-cyber-200">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyber-500 to-cyber-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps timeline */}
        <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2">
          {steps.map((step, i) => {
            const stepStatus = i < currentStep ? "done" : i === currentStep && status === "running" ? "running" : "pending"
            return (
              <div
                key={step.id}
                className={[
                  "flex items-start gap-3 rounded-lg px-3 py-2 transition-all duration-300",
                  stepStatus === "running" ? "bg-cyber-500/10 border border-cyber-500/20" : "bg-transparent",
                ].join(" ")}
              >
                <StepIcon status={stepStatus} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={[
                        "font-mono text-[11px]",
                        stepStatus === "done" ? "text-zinc-400" : stepStatus === "running" ? "text-zinc-100" : "text-zinc-500",
                      ].join(" ")}
                    >
                      {step.action}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-600 shrink-0">
                      {String(i + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500 truncate">
                    tool={step.tool}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Complete status */}
        {status === "complete" && (
          <div className="mt-4 rounded-xl border border-cyber-500/25 bg-cyber-500/10 px-4 py-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <div className="font-mono text-xs text-cyber-100">THREAT CONTAINED</div>
                <div className="font-mono text-[10px] text-zinc-400">Case {threat?.caseId} closed</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
