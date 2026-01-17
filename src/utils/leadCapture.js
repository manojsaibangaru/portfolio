const DEFAULT_SUBJECT = "New portfolio visitor"

function buildMailto({ to, name, email, company, message, pageUrl }) {
  const lines = [
    "New portfolio submission",
    "",
    `Name: ${name || "-"}`,
    `Email: ${email || "-"}`,
    `Company: ${company || "-"}`,
    `Page: ${pageUrl || "-"}`,
    "",
    "Message:",
    message || "-",
  ]

  const subject = encodeURIComponent(DEFAULT_SUBJECT)
  const body = encodeURIComponent(lines.join("\n"))
  return `mailto:${encodeURIComponent(to)}?subject=${subject}&body=${body}`
}

/**
 * Sends lead capture submission.
 *
 * Recommended: configure `VITE_FORMSPREE_ENDPOINT` (e.g. https://formspree.io/f/xxxxxxx)
 * so the site can send you an email without exposing secrets.
 */
export async function submitLead({ toEmail, name, email, company, message, consent, hp }) {
  // Honeypot: bots fill hidden inputs; we silently accept but do nothing.
  if (hp) return { ok: true, noop: true }

  if (!consent) return { ok: false, error: "Consent is required." }

  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
  const pageUrl = typeof window !== "undefined" ? window.location.href : ""

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          pageUrl,
          _subject: DEFAULT_SUBJECT,
          _replyto: email,
        }),
      })

      if (res.ok) return { ok: true }
      return { ok: false, error: "Message failed to send. Please try again." }
    } catch {
      return { ok: false, error: "Network error. Please try again." }
    }
  }

  // Fallback: open visitor's email client (not automatic sending).
  try {
    window.location.href = buildMailto({ to: toEmail, name, email, company, message, pageUrl })
    return { ok: true, fallback: "mailto" }
  } catch {
    return { ok: false, error: "Email client could not be opened." }
  }
}

