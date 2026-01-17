import { useEffect, useMemo, useState } from "react"

function useTyping(lines, intervalMs = 42) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (idx >= lines.length) return
    const t = window.setTimeout(() => setIdx((v) => v + 1), intervalMs)
    return () => window.clearTimeout(t)
  }, [idx, lines.length, intervalMs])

  return lines.slice(0, idx)
}

export default function BootSequence({ open, onDone }) {
  const steps = useMemo(
    () => [
      "INIT: secure_channel::handshake()",
      "LOAD: profile_manifest.json",
      "LOAD: threat_intel_feed (simulated)",
      "CHECK: integrity_ok ✅",
      "CHECK: transport_tls ✅",
      "ARM: defense_mode=ACTIVE",
      "STATUS: ACCESS GRANTED",
    ],
    [],
  )

  const shown = useTyping(steps, 55)
  const progress = Math.min(100, Math.round((shown.length / steps.length) * 100))

  useEffect(() => {
    if (!open) return
    if (shown.length !== steps.length) return
    const t = window.setTimeout(() => onDone?.(), 650)
    return () => window.clearTimeout(t)
  }, [open, shown.length, steps.length, onDone])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") onDone?.()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onDone])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <div className="absolute inset-0 pointer-events-none scanlines opacity-20" />

      <div className="relative w-full max-w-xl">
        <div className="gradient-border rounded-2xl bg-panel-900/85 backdrop-blur shadow-glow overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-cyber-400 shadow-[0_0_18px_rgba(0,230,154,0.32)]" />
              <div className="font-mono text-xs text-zinc-300">
                <span className="text-cyber-300/80">{">"} </span>
                <span className="text-zinc-200">BOOT_SEQUENCE</span>
              </div>
            </div>
            <div className="font-mono text-[10px] tracking-widest text-zinc-400">SECURE_CHANNEL</div>
          </div>

          <div className="relative px-5 py-4 font-mono text-[12px] text-zinc-200">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 noise" />

            <div className="grid gap-2">
              {shown.map((l) => (
                <div key={l} className="flex gap-2">
                  <span className="text-cyber-300/80">{">"}</span>
                  <span className="min-w-0 break-words">{l}</span>
                </div>
              ))}
              <div className="flex gap-2">
                <span className="text-cyber-300/80">{">"}</span>
                <span className="terminal-cursor">_</span>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] tracking-widest text-zinc-400">PROGRESS</div>
                <div className="font-mono text-[10px] tracking-widest text-zinc-400">{progress}%</div>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyber-500/70 via-cyber-400/70 to-threat-500/50"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 text-[11px] tracking-widest text-zinc-400">
              Tip: press <span className="text-zinc-200">ESC</span> to skip.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

