import { useState, useRef, useEffect } from 'react'

/**
 * Contact Terminal - Cybersecurity Themed Contact Form
 * 
 * Styled like a terminal session initiating a secure connection.
 * Fields appear one by one like a command prompt.
 */

const FIELDS = [
  { id: 'name', label: 'IDENTITY', placeholder: 'Your name', type: 'text', required: true },
  { id: 'company', label: 'ORGANIZATION', placeholder: 'Company (optional)', type: 'text', required: false },
  { id: 'email', label: 'RETURN_CHANNEL', placeholder: 'your@email.com', type: 'email', required: true },
  { id: 'subject', label: 'SUBJECT', placeholder: 'Job opportunity / Collaboration / etc.', type: 'text', required: true },
  { id: 'message', label: 'PAYLOAD', placeholder: 'Your message...', type: 'textarea', required: true },
]

export default function ContactTerminal() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle, sending, success, error, fallback_success
  const [currentField, setCurrentField] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false) // Track if user has interacted
  const formRef = useRef(null)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleKeyDown = (e, fieldIndex) => {
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
      e.preventDefault()
      if (fieldIndex < FIELDS.length - 1) {
        setCurrentField(fieldIndex + 1)
      }
    }
  }

  useEffect(() => {
    // Only focus if user has already interacted with the form
    // This prevents auto-scrolling to the form on page load
    if (!hasInteracted) return
    
    const input = formRef.current?.querySelector(`[name="${FIELDS[currentField]?.id}"]`)
    if (input) {
      input.focus()
    }
  }, [currentField, hasInteracted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Formspree endpoint for contact form
      const formspreeEndpoint = 'https://formspree.io/f/xvgklazo'
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company || 'Not specified',
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[Portfolio Contact] ${formData.subject}`,
        })
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', company: '', email: '', subject: '', message: '' })
        setCurrentField(0)
      } else {
        throw new Error('Failed to send')
      }
    } catch (error) {
      setStatus('error')
      // Fallback to mailto
      setTimeout(() => {
        const mailtoLink = `mailto:manojsaibangaru@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
          `Name: ${formData.name}\nCompany: ${formData.company || 'N/A'}\nEmail: ${formData.email}\n\n${formData.message}`
        )}`
        window.open(mailtoLink, '_blank')
        // Show success after opening email client
        setTimeout(() => {
          setStatus('fallback_success')
          setFormData({ name: '', company: '', email: '', subject: '', message: '' })
          setCurrentField(0)
        }, 500)
      }, 1500)
    }
  }

  const getTimestamp = () => {
    return new Date().toLocaleTimeString('en-US', { hour12: false })
  }

  return (
    <div className="rounded-xl border border-green-500/30 bg-black/80 backdrop-blur overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/20 bg-green-500/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-zinc-500 ml-3">secure_channel.sh</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          ENCRYPTED
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-6 font-mono text-sm">
        {/* Connection sequence */}
        <div className="space-y-1 text-xs text-zinc-600 mb-6">
          <div><span className="text-zinc-500">[{getTimestamp()}]</span> Initializing secure channel...</div>
          <div><span className="text-zinc-500">[{getTimestamp()}]</span> <span className="text-green-400">✓</span> TLS 1.3 handshake complete</div>
          <div><span className="text-zinc-500">[{getTimestamp()}]</span> <span className="text-green-400">✓</span> Identity verification ready</div>
          <div><span className="text-zinc-500">[{getTimestamp()}]</span> Awaiting transmission data...</div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {FIELDS.map((field, index) => (
            <div 
              key={field.id}
              className={`
                transition-all duration-300
                ${index <= currentField ? 'opacity-100' : 'opacity-30'}
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-500">$</span>
                <span className="text-zinc-500">set</span>
                <span className="text-cyan-400">{field.label}</span>
                {field.required && <span className="text-red-400 text-[10px]">*</span>}
                {formData[field.id] && index < currentField && (
                  <span className="text-green-400 text-xs ml-auto">✓</span>
                )}
              </div>
              
              {field.type === 'textarea' ? (
                <textarea
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  onFocus={() => { setHasInteracted(true); setCurrentField(index) }}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={4}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/20 resize-none"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  onFocus={() => { setHasInteracted(true); setCurrentField(index) }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500/20"
                />
              )}
            </div>
          ))}

          {/* Submit section */}
          <div className="pt-4 border-t border-zinc-800">
            {status === 'idle' && (
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg border border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all group"
              >
                <span className="text-zinc-500 group-hover:text-green-400">$</span>
                <span>./transmit.sh --secure</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
              </button>
            )}

            {status === 'sending' && (
              <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 text-yellow-400">
                <div className="h-4 w-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                <span>Transmitting encrypted payload...</span>
              </div>
            )}

            {status === 'success' && (
              <div className="px-6 py-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 text-center">
                <div className="text-lg mb-2">✓ TRANSMISSION_COMPLETE</div>
                <div className="text-xs text-zinc-400 mb-1">Message received successfully.</div>
                <div className="text-xs text-zinc-500 mb-4">Expect response within 24-48 hours.</div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2 text-xs border border-zinc-700 rounded hover:border-green-500/30 hover:text-green-400 transition-colors"
                >
                  $ ./new_transmission.sh
                </button>
              </div>
            )}

            {status === 'error' && (
              <div className="px-6 py-4 rounded-lg border border-orange-500/30 bg-orange-500/10 text-orange-400 text-center">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <div className="h-4 w-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-lg">FALLBACK_INITIATED</span>
                </div>
                <div className="text-xs text-zinc-500">Opening secure email channel...</div>
              </div>
            )}

            {status === 'fallback_success' && (
              <div className="px-6 py-4 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 text-center">
                <div className="text-lg mb-2">✓ EMAIL_CLIENT_OPENED</div>
                <div className="text-xs text-zinc-400 mb-3">
                  Your message has been prepared in your email client.
                </div>
                <div className="text-xs text-zinc-500">
                  Please send the email to complete transmission.
                </div>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-4 py-2 text-xs border border-zinc-700 rounded hover:border-green-500/30 hover:text-green-400 transition-colors"
                >
                  $ ./new_transmission.sh
                </button>
              </div>
            )}
          </div>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-zinc-800/50 text-[10px] text-zinc-600 space-y-1">
          <div className="flex items-center justify-between">
            <span>SESSION_ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
            <span>PROTOCOL: HTTPS/TLS1.3</span>
          </div>
          <div className="flex items-center justify-between">
            <span>ENCRYPTION: AES-256-GCM</span>
            <span>STATUS: <span className="text-green-400">SECURE</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}
