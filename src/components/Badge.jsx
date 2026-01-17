export default function Badge({ children, tone = "cyber" }) {
  const tones = {
    cyber: "border-cyber-500/20 bg-cyber-500/10 text-cyber-200",
    neutral: "border-white/10 bg-white/5 text-zinc-200",
    threat: "border-threat-500/25 bg-threat-500/10 text-rose-100",
    warning: "border-warning-500/25 bg-warning-500/10 text-amber-100",
  }

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1",
        "font-mono text-[11px] leading-none tracking-wide",
        tones[tone] ?? tones.cyber,
      ].join(" ")}
    >
      {children}
    </span>
  )
}

