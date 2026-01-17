import { useEffect, useMemo, useRef, useState } from "react"
import TerminalCard from "./TerminalCard.jsx"

function nowTs() {
  const d = new Date()
  return d.toISOString().replace("T", " ").slice(0, 19)
}

function normalize(s) {
  return (s || "").trim()
}

function tokenize(input) {
  // simple tokenizer: supports quoted strings
  const s = normalize(input)
  if (!s) return []
  const out = []
  let cur = ""
  let quote = null
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (quote) {
      if (ch === quote) {
        quote = null
      } else {
        cur += ch
      }
      continue
    }
    if (ch === '"' || ch === "'") {
      quote = ch
      continue
    }
    if (/\s/.test(ch)) {
      if (cur) out.push(cur)
      cur = ""
      continue
    }
    cur += ch
  }
  if (cur) out.push(cur)
  return out
}

function isUrl(s) {
  return /^https?:\/\//i.test(s)
}

export default function CommandConsole({
  open,
  onClose,
  profile,
  sections,
  // integrations with existing state
  setSkillsQuery,
  setFeedPaused,
  setMinSeverity,
  requestPlaybookRun,
}) {
  const inputRef = useRef(null)
  const scrollerRef = useRef(null)

  const [input, setInput] = useState("")
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const [lines, setLines] = useState(() => [
    { kind: "sys", ts: nowTs(), text: "OPS_SHELL ready. Type 'help'." },
  ])

  const sectionIds = useMemo(() => (sections || []).map((s) => s.id), [sections])

  const print = (kind, text) => {
    setLines((prev) => [...prev, { kind, ts: nowTs(), text }].slice(-250))
  }

  const printBlock = (kind, arr) => {
    setLines((prev) => {
      const next = [...prev]
      for (const t of arr) next.push({ kind, ts: nowTs(), text: t })
      return next.slice(-250)
    })
  }

  const runCommand = async (raw) => {
    const cmdline = normalize(raw)
    if (!cmdline) return

    setHistory((h) => [cmdline, ...h].slice(0, 50))
    setHistIdx(-1)
    print("cmd", `msai@ops-console:~$ ${cmdline}`)

    const args = tokenize(cmdline)
    const cmd = (args[0] || "").toLowerCase()
    const rest = args.slice(1)

    const help = () =>
      printBlock("out", [
        "Commands:",
        "  help                         Show this help",
        "  sections                     List section ids",
        "  open <sectionId>             Jump to a section (e.g. open skills)",
        "  whoami                       Show profile summary",
        "  contact                      Show contact methods",
        "  email | phone | linkedin     Open a contact method",
        "  resume                       Open resume PDF",
        "  copy email|phone             Copy email/phone to clipboard",
        "  playbooks                    List available SOAR playbooks",
        "  run <PLAYBOOK_ID>            Run a playbook (e.g. run PHISHING_TRIAGE)",
        "  skills <query>               Filter skills by keyword",
        "  feed pause|resume            Control simulated live feed",
        "  severity <INFO|LOW|MED|HIGH> Set min severity",
        "  clear                        Clear console output",
        "  exit                         Close CLI",
        "",
        "Tips:",
        "  - Use quotes for multi-word queries: skills \"incident response\"",
        "  - Press ↑/↓ for history, Esc to close.",
      ])

    const jumpTo = (id) => {
      const el = document.getElementById(id)
      if (!el) return false
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      return true
    }

    const openUrl = (url) => {
      if (!url) return false
      if (!isUrl(url) && !url.startsWith("mailto:") && !url.startsWith("tel:")) return false
      window.open(url, "_blank", "noreferrer")
      return true
    }

    const copyText = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch {
        return false
      }
    }

    switch (cmd) {
      case "help":
      case "?":
        return help()

      case "exit":
      case "quit":
        onClose?.()
        return

      case "clear":
        setLines([{ kind: "sys", ts: nowTs(), text: "OPS_SHELL cleared. Type 'help'." }])
        return

      case "sections":
        print("out", sectionIds.length ? sectionIds.join("  ") : "(no sections)")
        return

      case "open": {
        const id = (rest[0] || "").toLowerCase()
        if (!id) return print("err", "Usage: open <sectionId>")
        if (!sectionIds.includes(id)) return print("err", `Unknown section: ${id}. Try: sections`)
        // Update hash (helps on some browsers) + smooth scroll.
        try {
          window.location.hash = `#${id}`
        } catch {
          // ignore
        }
        const ok = jumpTo(id)
        if (ok) {
          print("out", `OK: opened #${id}`)
          // Close immediately so the visitor sees the page move.
          onClose?.()
        } else print("err", `Failed to open #${id}`)
        return
      }

      case "whoami":
        printBlock("out", [
          `NAME: ${profile?.name || "-"}`,
          `HEADLINE: ${profile?.headline || "-"}`,
          "MODE: DEFENSE::ACTIVE",
        ])
        return

      case "contact":
        printBlock("out", [
          `EMAIL: ${profile?.contact?.email || "-"}`,
          `PHONE: ${profile?.contact?.phone || "-"}`,
          `LINKEDIN: ${profile?.contact?.linkedInUrl || "-"}`,
          "Try: email | phone | linkedin | copy email",
        ])
        return

      case "email":
        if (openUrl(`mailto:${profile?.contact?.email || ""}`)) print("out", "OK: opening email client")
        else print("err", "No email configured")
        return

      case "phone":
        if (openUrl(`tel:${(profile?.contact?.phone || "").replace(/\s+/g, "")}`))
          print("out", "OK: opening phone dialer")
        else print("err", "No phone configured")
        return

      case "linkedin":
        if (openUrl(profile?.contact?.linkedInUrl)) print("out", "OK: opening LinkedIn")
        else print("err", "No LinkedIn URL configured")
        return

      case "resume": {
        const url = "./legacy_assets/Manojsai_Bangaru_Resume.pdf"
        if (openUrl(url)) print("out", "OK: opening resume")
        else print("err", "Failed to open resume")
        return
      }

      case "copy": {
        const what = (rest[0] || "").toLowerCase()
        if (what === "email") {
          const ok = await copyText(profile?.contact?.email || "")
          return print(ok ? "out" : "err", ok ? "COPIED: email" : "Copy failed")
        }
        if (what === "phone") {
          const ok = await copyText(profile?.contact?.phone || "")
          return print(ok ? "out" : "err", ok ? "COPIED: phone" : "Copy failed")
        }
        return print("err", "Usage: copy email|phone")
      }

      case "skills": {
        const q = rest.join(" ").trim()
        if (!q) return print("err", "Usage: skills <query>")
        setSkillsQuery?.(q)
        try {
          window.location.hash = "#skills"
        } catch {
          // ignore
        }
        const ok = jumpTo("skills")
        print("out", `OK: skills filter applied: "${q}"`)
        if (ok) print("out", "OK: opened #skills")
        onClose?.()
        return
      }

      case "feed": {
        const action = (rest[0] || "").toLowerCase()
        if (action !== "pause" && action !== "resume") return print("err", "Usage: feed pause|resume")
        setFeedPaused?.(action === "pause")
        print("out", `OK: feed ${action}d`)
        return
      }

      case "severity": {
        const s = (rest[0] || "").toUpperCase()
        if (!["INFO", "LOW", "MED", "HIGH"].includes(s)) return print("err", "Usage: severity INFO|LOW|MED|HIGH")
        setMinSeverity?.(s)
        print("out", `OK: min severity set to ${s}`)
        return
      }

      case "playbooks": {
        print("out", "Available: PHISHING_TRIAGE  ALERT_ENRICH  ACCOUNT_LOCKDOWN  CONTAINMENT")
        print("out", "Run: run PHISHING_TRIAGE")
        return
      }

      case "run": {
        const id = (rest[0] || "").toUpperCase()
        if (!id) return print("err", "Usage: run <PLAYBOOK_ID>")
        requestPlaybookRun?.(id)
        print("out", `OK: requested playbook run: ${id}`)
        // Show the result in the page — jump to console and close CLI.
        try {
          window.location.hash = "#console"
        } catch {
          // ignore
        }
        document.getElementById("console")?.scrollIntoView?.({ behavior: "smooth", block: "start" })
        onClose?.()
        return
      }

      default:
        print("err", `Unknown command: ${cmd}. Try: help`)
        return
    }
  }

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 50)
    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" })
  }, [open, lines.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const onKeyDownInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const cmdline = input
      setInput("")
      runCommand(cmdline)
      return
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const nextIdx = Math.min(history.length - 1, histIdx + 1)
      if (nextIdx >= 0) {
        setHistIdx(nextIdx)
        setInput(history[nextIdx] || "")
      }
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      const nextIdx = Math.max(-1, histIdx - 1)
      setHistIdx(nextIdx)
      setInput(nextIdx === -1 ? "" : history[nextIdx] || "")
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[65] flex items-end justify-center px-4 pb-5 pt-8">
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        aria-label="Close CLI"
        onClick={() => onClose?.()}
      />

      <div className="relative w-full max-w-3xl">
        <TerminalCard title="OPS_CLI" icon=">">
          <div className="grid gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="terminal-muted">
                SHORTCUT: <span className="text-zinc-200">Ctrl+K</span> • EXIT:{" "}
                <span className="text-zinc-200">Esc</span>
              </div>
              <button
                type="button"
                onClick={() => onClose?.()}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-zinc-200 hover:bg-white/10"
              >
                CLOSE
              </button>
            </div>

            <div
              ref={scrollerRef}
              className="h-[40vh] max-h-[420px] overflow-auto rounded-xl border border-white/10 bg-black/25 px-4 py-3"
            >
              <div className="grid gap-1">
                {lines.map((l, i) => (
                  <div key={`${l.ts}-${i}`} className="grid grid-cols-[auto_1fr] gap-x-3">
                    <div className="font-mono text-[10px] text-zinc-500">{l.ts.slice(11)}</div>
                    <div
                      className={[
                        "font-mono text-[12px] break-words",
                        l.kind === "err"
                          ? "text-rose-200"
                          : l.kind === "cmd"
                            ? "text-zinc-200"
                            : l.kind === "sys"
                              ? "text-cyber-200"
                              : "text-zinc-300",
                      ].join(" ")}
                    >
                      {l.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="terminal-underline flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="terminal-prompt">{">"}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDownInput}
                className="terminal-input"
                placeholder="Type a command… (help, open skills, resume, linkedin)"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <span className="terminal-cursor">_</span>
            </div>
          </div>
        </TerminalCard>
      </div>
    </div>
  )
}

