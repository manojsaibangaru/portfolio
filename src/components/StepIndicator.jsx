/**
 * Step Indicator
 * 
 * Visual timeline showing progress through IR phases:
 * Attack → Detect → Respond → Lessons
 * 
 * Each step can be: complete, active, or pending.
 * This is the core navigation for the scenario detail page.
 */

const STEPS = [
  { id: "attack", label: "Attack", icon: "⚠️" },
  { id: "detect", label: "Detect", icon: "🔍" },
  { id: "respond", label: "Respond", icon: "🛡️" },
  { id: "lessons", label: "Lessons", icon: "📝" },
]

export default function StepIndicator({ currentStep, onStepClick }) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep)

  return (
    <div className="relative">
      {/* Desktop: Horizontal timeline */}
      <div className="hidden md:flex items-center justify-between gap-4">
        {STEPS.map((step, index) => {
          const isComplete = index < currentIndex
          const isActive = index === currentIndex
          const isPending = index > currentIndex

          return (
            <div key={step.id} className="flex-1 flex items-center">
              {/* Step Node */}
              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className={[
                  "relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all w-full",
                  isActive
                    ? "bg-cyber-500/20 border-2 border-cyber-400"
                    : isComplete
                    ? "bg-cyber-500/10 border border-cyber-500/30 hover:bg-cyber-500/15"
                    : "bg-white/5 border border-white/10 hover:bg-white/10",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-lg text-lg",
                    isActive
                      ? "bg-cyber-500/30"
                      : isComplete
                      ? "bg-cyber-500/20"
                      : "bg-white/10",
                  ].join(" ")}
                >
                  {isComplete ? (
                    <svg className="h-5 w-5 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </div>
                <div className="text-left">
                  <div
                    className={[
                      "font-mono text-[10px] tracking-widest",
                      isActive ? "text-cyber-300" : "text-zinc-500",
                    ].join(" ")}
                  >
                    STEP {index + 1}
                  </div>
                  <div
                    className={[
                      "font-semibold",
                      isActive
                        ? "text-cyber-100"
                        : isComplete
                        ? "text-zinc-200"
                        : "text-zinc-400",
                    ].join(" ")}
                  >
                    {step.label}
                  </div>
                </div>
                {isActive && (
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-cyber-400 animate-pulse" />
                )}
              </button>

              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div className="flex-shrink-0 w-8 h-0.5 mx-2">
                  <div
                    className={[
                      "h-full rounded-full transition-all",
                      isComplete ? "bg-cyber-500" : "bg-white/10",
                    ].join(" ")}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: Compact horizontal */}
      <div className="md:hidden flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isComplete = index < currentIndex
          const isActive = index === currentIndex

          return (
            <div key={step.id} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className={[
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-all flex-1",
                  isActive ? "bg-cyber-500/20" : "hover:bg-white/5",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-lg text-sm",
                    isActive
                      ? "bg-cyber-500/30 ring-2 ring-cyber-400"
                      : isComplete
                      ? "bg-cyber-500/20"
                      : "bg-white/10",
                  ].join(" ")}
                >
                  {isComplete ? (
                    <svg className="h-4 w-4 text-cyber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs">{step.icon}</span>
                  )}
                </div>
                <span
                  className={[
                    "font-mono text-[9px] tracking-wider",
                    isActive ? "text-cyber-200" : "text-zinc-500",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </button>
              {index < STEPS.length - 1 && (
                <div
                  className={[
                    "w-4 h-0.5 rounded-full flex-shrink-0",
                    isComplete ? "bg-cyber-500" : "bg-white/10",
                  ].join(" ")}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
