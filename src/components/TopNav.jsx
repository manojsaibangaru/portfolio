import { useEffect, useMemo, useState } from "react"
import Badge from "./Badge.jsx"
import { useActiveSection } from "./useActiveSection.js"

function NavLink({ href, active, children }) {
  return (
    <a
      href={href}
      className={[
        "rounded-full px-3 py-1.5 font-mono text-xs tracking-wide transition",
        active
          ? "bg-cyber-500/15 text-cyber-100 border border-cyber-500/20 shadow-glow"
          : "text-zinc-300 hover:text-zinc-100 hover:bg-white/5 border border-transparent",
      ].join(" ")}
    >
      {children}
    </a>
  )
}

export default function TopNav({ name = "Portfolio", sections = [] }) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections])
  const activeId = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    const onScroll = () => setOpen(false)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-white/6 bg-bg-950/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-cyber-400 shadow-[0_0_18px_rgba(0,230,154,0.35)]" />
            <a href="#top" className="font-mono text-sm text-zinc-200">
              {name}
            </a>
            <div className="hidden md:block">
              <Badge>SOCCONSOLE</Badge>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {sections.map((s) => (
              <NavLink key={s.id} href={`#${s.id}`} active={activeId === s.id}>
                {s.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-zinc-200 hover:bg-white/10"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            MENU
          </button>
        </div>

        {open ? (
          <div className="mt-3 grid gap-2 md:hidden">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={[
                  "rounded-xl border px-3 py-2 font-mono text-xs",
                  activeId === s.id
                    ? "border-cyber-500/20 bg-cyber-500/12 text-cyber-100"
                    : "border-white/10 bg-white/5 text-zinc-200",
                ].join(" ")}
              >
                {s.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  )
}

