export default function Section({ id, title, kicker, children }) {
  const cmd = `open ${id} --view`
  return (
    <section id={id} className="scroll-mt-24 py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="terminal-muted">
            <span className="terminal-prompt">msai@ops-console</span>
            <span className="text-zinc-500">:</span>
            <span className="text-zinc-400">~</span>
            <span className="text-zinc-500">$</span> {cmd}
            <span className="terminal-cursor">_</span>
          </div>
          {kicker ? (
            <div className="font-mono text-xs tracking-widest text-cyber-300/80">
              {kicker}
            </div>
          ) : null}
          <h2 className="text-balance text-2xl font-semibold text-zinc-50 md:text-3xl">
            <span className="text-glow">{title}</span>
          </h2>
        </div>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-cyber-500/30 via-cyber-500/10 to-transparent md:block" />
      </div>
      {children}
    </section>
  )
}

