export default function TerminalCard({ title, icon, children, className = "" }) {
  return (
    <div
      className={[
        "gradient-border rounded-2xl bg-panel-900/70 backdrop-blur",
        "shadow-glow",
        "relative overflow-hidden",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="absolute inset-0 bg-radial-glow" />
      </div>
      <div className="absolute inset-x-0 -top-24 h-40 opacity-25 blur-2xl bg-gradient-to-r from-cyber-500/40 via-transparent to-threat-500/30" />

      <div className="flex items-center justify-between gap-3 border-b border-white/6 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-cyber-400 shadow-[0_0_18px_rgba(0,230,154,0.32)]" />
          <div className="font-mono text-xs text-zinc-300">
            {icon ? <span className="text-cyber-300/80">{icon} </span> : null}
            <span className="text-zinc-200">{title}</span>
          </div>
        </div>
        <div className="hidden font-mono text-[10px] tracking-widest text-zinc-400 md:block">
          SECURE_CHANNEL
        </div>
      </div>

      <div className="relative px-5 py-4">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 scanlines" />
        {children}
      </div>
    </div>
  )
}

