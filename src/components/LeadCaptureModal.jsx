import { useEffect, useMemo, useRef, useState } from "react"
import TerminalCard from "./TerminalCard.jsx"
import { submitLead } from "../utils/leadCapture.js"

function clampStr(s, max = 1200) {
  const v = (s || "").trim()
  if (v.length <= max) return v
  return v.slice(0, max)
}

export default function LeadCaptureModal({
  open,
  onClose,
  onSubmitted,
  toEmail,
  title = "SECURE INTAKE",
  subtitle = "Leave your details and I’ll get back to you.",
}) {
  const firstInputRef = useRef(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [consent, setConsent] = useState(false)
  const [hp, setHp] = useState("") // honeypot
  const [status, setStatus] = useState("idle") // idle | sending | success | error
  const [error, setError] = useState("")

  const disabled = useMemo(() => status === "sending" || status === "success", [status])

  useEffect(() => {
    if (!open) return

    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const t = window.setTimeout(() => firstInputRef.current?.focus(), 50)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const submit = async (e) => {
    e.preventDefault()
    setError("")

    const payload = {
      toEmail,
      name: clampStr(name, 120),
      email: clampStr(email, 160),
      company: clampStr(company, 120),
      message: clampStr(message, 1400),
      consent,
      hp: clampStr(hp, 120),
    }

    if (!payload.name) return setError("Please enter your name.")
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      return setError("Please enter a valid email address.")
    if (!payload.message) return setError("Please add a short message (what are you looking for?).")
    if (!payload.consent) return setError("Please check consent to submit.")

    setStatus("sending")
    const res = await submitLead(payload)
    if (res.ok) {
      setStatus("success")
      onSubmitted?.()
      return
    }
    setStatus("error")
    setError(res.error || "Failed to send.")
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={() => onClose?.()}
      />

      <div className="relative w-full max-w-xl">
        <TerminalCard title={title} icon=">">
          <div className="grid gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="terminal-muted">VISITOR_INTAKE::CLI</div>
                <div className="mt-2 text-sm text-zinc-200">{subtitle}</div>
              </div>

              <button
                type="button"
                onClick={() => onClose?.()}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-zinc-200 hover:bg-white/10"
              >
                EXIT
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
              <div className="terminal-line">
                <span className="terminal-prompt">visitor@company</span>
                <span className="text-zinc-500">:</span>
                <span className="text-zinc-400">~</span>
                <span className="text-zinc-500">$</span> connect --secure --to{" "}
                <span className="text-zinc-100">{toEmail}</span>
              </div>
              <div className="mt-2 terminal-muted">
                SPAM_SHIELD: ARMED • DELIVERY: FORMSPREE
              </div>
              <div className="mt-2 text-[12px] text-zinc-400">
                Tip: press <span className="text-zinc-200">ESC</span> to exit.
              </div>
            </div>

            <form className="grid gap-3" onSubmit={submit}>
              {/* honeypot (hidden from humans) */}
              <label className="hidden">
                Website
                <input value={hp} onChange={(e) => setHp(e.target.value)} autoComplete="off" tabIndex={-1} />
              </label>

              <label className="sr-only" htmlFor="lead-name">
                Name
              </label>
              <div className="terminal-underline flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="terminal-prompt">{">"}</span>
                <span className="terminal-muted">NAME</span>
                <span className="text-zinc-500">=</span>
                <input
                  id="lead-name"
                  ref={firstInputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={disabled}
                  placeholder="Jane Recruiter"
                  className="terminal-input"
                />
              </div>

              <label className="sr-only" htmlFor="lead-email">
                Email
              </label>
              <div className="terminal-underline flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="terminal-prompt">{">"}</span>
                <span className="terminal-muted">EMAIL</span>
                <span className="text-zinc-500">=</span>
                <input
                  id="lead-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={disabled}
                  placeholder="jane@company.com"
                  className="terminal-input"
                />
              </div>

              <label className="sr-only" htmlFor="lead-company">
                Company (optional)
              </label>
              <div className="terminal-underline flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="terminal-prompt">{">"}</span>
                <span className="terminal-muted">COMPANY</span>
                <span className="text-zinc-500">(optional)</span>
                <span className="text-zinc-500">=</span>
                <input
                  id="lead-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={disabled}
                  placeholder="Company / Team"
                  className="terminal-input"
                />
              </div>

              <label className="sr-only" htmlFor="lead-message">
                Message
              </label>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="terminal-muted">
                  <span className="terminal-prompt">{">"}</span> MESSAGE
                </div>
                <textarea
                  id="lead-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={disabled}
                  rows={4}
                  placeholder="What role / project are you reaching out about?"
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-2 font-mono text-[12px] text-zinc-200 outline-none focus:border-cyber-500/30"
                />
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={disabled}
                  className="mt-0.5 h-4 w-4 accent-[rgb(0,230,154)]"
                />
                <div className="text-[12px] text-zinc-300">
                  I consent to share these details so Manojsai can contact me back.
                </div>
              </label>

              {error ? (
                <div className="rounded-xl border border-threat-500/25 bg-threat-500/10 px-4 py-3 font-mono text-xs text-zinc-100">
                  <span className="terminal-prompt">{">"}</span> ERROR: {error}
                </div>
              ) : null}

              {status === "success" ? (
                <div className="rounded-xl border border-cyber-500/25 bg-cyber-500/10 px-4 py-3 font-mono text-xs text-cyber-100">
                  <span className="terminal-prompt">{">"}</span> SENT. Thanks — I’ll reply soon.
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={disabled}
                  className={[
                    "rounded-xl border px-4 py-2.5 font-mono text-xs shadow-glow transition",
                    disabled
                      ? "border-white/10 bg-white/5 text-zinc-400"
                      : "border-cyber-500/25 bg-cyber-500/12 text-cyber-100 hover:bg-cyber-500/18",
                  ].join(" ")}
                >
                  {status === "sending" ? "SUBMITTING..." : status === "success" ? "SENT" : "RUN submit"}
                </button>

                <div className="font-mono text-[11px] tracking-widest text-zinc-400">
                  COMMAND: visitor_intake --send
                </div>
              </div>
            </form>
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}

