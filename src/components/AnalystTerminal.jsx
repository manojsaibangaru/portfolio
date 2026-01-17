import { useEffect, useState } from "react"

const BOOT_LINES = [
  { text: "$ ssh analyst@soc-ops.internal", delay: 0 },
  { text: "Authenticating...", delay: 400, muted: true },
  { text: "Access granted. Loading profile...", delay: 800, muted: true },
  { text: "", delay: 1100 },
]

const PROFILE_LINES = [
  { label: "ANALYST", value: "Manojsai Bangaru", accent: true },
  { label: "ROLE", value: "Security Analyst — Blue Team" },
  { label: "CLEARANCE", value: "SOC_TIER_2 • SIEM/SOAR/EDR" },
  { label: "STATUS", value: "ACTIVE", accent: true },
]

const STATS = [
  { label: "YRS_EXP", value: "4+" },
  { label: "PLAYBOOKS", value: "50+" },
  { label: "CASES", value: "500+" },
  { label: "CERTS", value: "4" },
]

function TermLine({ children, muted, accent }) {
  return (
    <div
      className={[
        "font-mono text-[11px] leading-relaxed",
        muted ? "text-zinc-500" : accent ? "text-cyber-200" : "text-zinc-200",
      ].join(" ")}
    >
      {children}
    </div>
  )
}

export default function AnalystTerminal({ onOpenCli, onOpenConsole }) {
  const [bootIndex, setBootIndex] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Boot sequence
  useEffect(() => {
    if (bootIndex >= BOOT_LINES.length) {
      const t = setTimeout(() => setShowProfile(true), 300)
      return () => clearTimeout(t)
    }
    const next = BOOT_LINES[bootIndex]
    const t = setTimeout(() => setBootIndex((i) => i + 1), next.delay + 280)
    return () => clearTimeout(t)
  }, [bootIndex])

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="gradient-border rounded-2xl bg-panel-900/70 backdrop-blur shadow-glow relative overflow-hidden">
      <div className="absolute inset-x-0 -top-24 h-40 opacity-25 blur-2xl bg-gradient-to-r from-cyber-500/40 via-transparent to-threat-500/30" />

      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-cyber-400 shadow-[0_0_18px_rgba(0,230,154,0.32)]" />
          <div className="font-mono text-xs text-zinc-300">
            <span className="text-cyber-300/80">&gt; </span>
            <span className="text-zinc-200">ANALYST_TERMINAL</span>
          </div>
        </div>
        <div className="hidden font-mono text-[10px] tracking-widest text-zinc-400 md:block">
          SECURE_SESSION
        </div>
      </div>

      <div className="relative px-5 py-4 min-h-[220px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 scanlines" />

        {/* Boot sequence */}
        <div className="grid gap-1 mb-4">
          {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
            <TermLine key={i} muted={line.muted}>
              {line.text}
            </TermLine>
          ))}
        </div>

        {/* Profile (after boot) */}
        {showProfile && (
          <div className="animate-fadeIn">
            <div className="rounded-xl border border-cyber-500/20 bg-cyber-500/5 px-4 py-3 mb-4">
              <div className="grid gap-2">
                {PROFILE_LINES.map((p) => (
                  <div key={p.label} className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-widest text-zinc-500">{p.label}</span>
                    <span
                      className={[
                        "font-mono text-[11px]",
                        p.accent ? "text-cyber-200" : "text-zinc-200",
                      ].join(" ")}
                    >
                      {p.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center"
                >
                  <div className="font-mono text-[10px] tracking-widest text-zinc-500">{s.label}</div>
                  <div className="font-mono text-sm text-cyber-200">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="font-mono text-[11px] text-zinc-400 mb-3">
              $ <span className="text-zinc-200">ready</span>
              <span
                className="inline-block w-2 h-4 ml-1 bg-cyber-400/80 align-middle"
                style={{ opacity: cursorVisible ? 1 : 0 }}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onOpenConsole}
                className="rounded-xl border border-cyber-500/25 bg-cyber-500/12 px-4 py-2 font-mono text-xs text-cyber-100 shadow-glow hover:bg-cyber-500/18 transition"
              >
                ENTER CONSOLE
              </button>
              <button
                type="button"
                onClick={onOpenCli}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-zinc-200 hover:bg-white/10 transition"
              >
                OPEN CLI
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
