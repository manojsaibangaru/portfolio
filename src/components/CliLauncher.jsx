import { useEffect, useState } from "react"

const HINT_KEY = "msai_cli_hint_seen_v1"

export default function CliLauncher({ onOpen }) {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    try {
      const seen = window.localStorage.getItem(HINT_KEY)
      if (seen) return
      setShowHint(true)
      const t = window.setTimeout(() => {
        setShowHint(false)
        try {
          window.localStorage.setItem(HINT_KEY, "1")
        } catch {
          // ignore
        }
      }, 8500)
      return () => window.clearTimeout(t)
    } catch {
      setShowHint(true)
      const t = window.setTimeout(() => setShowHint(false), 8500)
      return () => window.clearTimeout(t)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-[55] flex flex-col items-end gap-2">
      {showHint ? (
        <div className="max-w-[320px] rounded-xl border border-cyber-500/25 bg-cyber-500/10 px-3 py-2 shadow-glow">
          <div className="font-mono text-[11px] tracking-widest text-cyber-100">
            TIP: OPEN CLI ANYTIME
          </div>
          <div className="mt-1 text-[12px] text-zinc-200">
            Press <span className="font-mono text-cyber-100">Ctrl/⌘ + K</span> or click{" "}
            <span className="font-mono text-cyber-100">CLI</span>.
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onOpen}
        className={[
          "rounded-2xl border px-4 py-3 font-mono text-xs shadow-glow transition",
          "border-cyber-500/25 bg-cyber-500/12 text-cyber-100 hover:bg-cyber-500/18",
        ].join(" ")}
        title="Open CLI (Ctrl/Cmd+K)"
      >
        {"CLI  >_"}
      </button>
    </div>
  )
}

