import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import scenarios from '../data/scenarios.json'
import { profile } from '../data/profile.js'

/**
 * Command Palette - Real CLI Experience
 * 
 * Actual command parsing with output display
 * Commands: open, display, goto, help, etc.
 */

export default function CommandPalette({ isOpen, onClose }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [output, setOutput] = useState([
    { type: 'system', text: 'Security Operations Terminal v2.0' },
    { type: 'system', text: 'Type "help" for available commands.' },
    { type: 'system', text: '─'.repeat(50) },
  ])
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setInput('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Scroll output to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  // Handle ESC key globally
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown, true)
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [isOpen, onClose])

  // Add output line
  const addOutput = (type, text) => {
    setOutput(prev => [...prev, { type, text }])
  }

  // Execute command
  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const parts = trimmedCmd.split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1).join(' ')

    // Add command to output
    addOutput('command', `$ ${cmd}`)

    // Add to history
    setHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)

    if (!trimmedCmd) return

    switch (command) {
      case 'help':
      case '?':
        showHelp()
        break

      case 'open':
      case 'goto':
      case 'cd':
        handleOpen(args)
        break

      case 'display':
      case 'show':
      case 'cat':
        handleDisplay(args)
        break

      case 'ls':
      case 'list':
        handleList(args)
        break

      case 'clear':
      case 'cls':
        setOutput([
          { type: 'system', text: 'Terminal cleared.' },
        ])
        break

      case 'whoami':
        addOutput('info', `visitor@${window.location.hostname}`)
        addOutput('info', '')
        addOutput('info', 'You are viewing the portfolio of:')
        addOutput('success', profile.name)
        addOutput('info', 'Security Analyst | SOC Tier II')
        break

      case 'sudo':
        if (args.includes('hire')) {
          addOutput('info', '[sudo] password for hiring-manager: ********')
          addOutput('success', '✓ AUTHORIZATION GRANTED')
          addOutput('success', '✓ hire-me executed successfully')
          addOutput('info', '')
          addOutput('info', `📧 Contact: ${profile.contact.email}`)
          addOutput('info', '🔗 LinkedIn: /in/manojsaibangaru')
          addOutput('success', '')
          addOutput('success', 'Thanks for considering me! 🚀')
        } else {
          addOutput('error', `sudo: ${args || 'command'}: command not found`)
        }
        break

      case 'exit':
      case 'quit':
      case 'close':
        addOutput('system', 'Closing terminal...')
        setTimeout(() => onClose(), 500)
        break

      case 'contact':
      case 'email':
        handleOpen('contact')
        break

      case 'resume':
      case 'cv':
        addOutput('info', 'Opening resume...')
        window.open('/legacy_assets/Manojsai_Bangaru_Resume.pdf', '_blank')
        break

      case 'linkedin':
        addOutput('info', 'Opening LinkedIn profile...')
        window.open(profile.contact.linkedInUrl, '_blank')
        break

      default:
        addOutput('error', `Command not found: ${command}`)
        addOutput('info', 'Type "help" for available commands.')
    }
  }

  // Show help
  const showHelp = () => {
    const helpText = [
      '',
      '┌─────────────────────────────────────────────────┐',
      '│           AVAILABLE COMMANDS                    │',
      '├─────────────────────────────────────────────────┤',
      '│ NAVIGATION                                      │',
      '│   open home        Go to homepage               │',
      '│   open about       View analyst profile         │',
      '│   open scenarios   Browse all incidents         │',
      '│   open contact     Scroll to contact form       │',
      '│   open skills      Jump to skills section       │',
      '│   open <scenario>  View specific incident       │',
      '│                                                 │',
      '│ DISPLAY                                         │',
      '│   display skills   Show technical skills        │',
      '│   display profile  Show analyst summary         │',
      '│   display certs    Show certifications          │',
      '│   display exp      Show work experience         │',
      '│   display edu      Show education               │',
      '│   display scenarios  List all incidents         │',
      '│                                                 │',
      '│ ACTIONS                                         │',
      '│   resume           Download CV                  │',
      '│   linkedin         Open LinkedIn                │',
      '│   contact          Open contact form            │',
      '│                                                 │',
      '│ OTHER                                           │',
      '│   whoami           Show visitor info            │',
      '│   ls               List available sections      │',
      '│   clear            Clear terminal               │',
      '│   exit             Close terminal               │',
      '│   help             Show this help               │',
      '└─────────────────────────────────────────────────┘',
      '',
    ]
    helpText.forEach(line => addOutput('info', line))
  }

  // Handle open/goto commands
  const handleOpen = (target) => {
    if (!target) {
      addOutput('error', 'Usage: open <target>')
      addOutput('info', 'Targets: home, about, scenarios, contact, skills, cases')
      return
    }

    const t = target.toLowerCase()

    // Check if it's a scenario
    const scenario = scenarios.find(s => 
      s.id.toLowerCase().includes(t) || 
      s.title.toLowerCase().includes(t)
    )

    if (scenario) {
      addOutput('success', `Opening scenario: ${scenario.title}`)
      setTimeout(() => {
        navigate(`/scenarios/${scenario.id}`)
        onClose()
      }, 300)
      return
    }

    // Handle page navigation
    switch (t) {
      case 'home':
      case 'index':
      case 'main':
        addOutput('success', 'Navigating to homepage...')
        onClose()
        setTimeout(() => {
          navigate('/')
          // Force scroll to top
          setTimeout(() => {
            window.scrollTo(0, 0)
          }, 50)
        }, 100)
        break

      case 'about':
      case 'profile':
      case 'bio':
        addOutput('success', 'Opening analyst profile...')
        onClose()
        setTimeout(() => {
          navigate('/about')
          setTimeout(() => {
            window.scrollTo(0, 0)
          }, 50)
        }, 100)
        break

      case 'scenarios':
      case 'incidents':
      case 'cases':
        addOutput('success', 'Opening incident database...')
        onClose()
        setTimeout(() => {
          navigate('/scenarios')
          setTimeout(() => {
            window.scrollTo(0, 0)
          }, 50)
        }, 100)
        break

      case 'contact':
      case 'email':
      case 'hire':
        addOutput('success', 'Opening contact form...')
        onClose()
        setTimeout(() => {
          if (location.pathname !== '/') {
            navigate('/')
            setTimeout(() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }, 300)
          } else {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
        break

      case 'skills':
      case 'stack':
      case 'tech':
        addOutput('success', 'Navigating to skills section...')
        setTimeout(() => {
          if (location.pathname !== '/') {
            navigate('/')
          }
          onClose()
          setTimeout(() => {
            // Find skills section (THREAT DETECTION STACK)
            const sections = document.querySelectorAll('section')
            sections.forEach(section => {
              if (section.textContent.includes('THREAT DETECTION STACK')) {
                section.scrollIntoView({ behavior: 'smooth' })
              }
            })
          }, 100)
        }, 300)
        break

      default:
        addOutput('error', `Unknown target: ${target}`)
        addOutput('info', 'Available: home, about, scenarios, contact, skills')
    }
  }

  // Handle display commands
  const handleDisplay = (target) => {
    if (!target) {
      addOutput('error', 'Usage: display <target>')
      addOutput('info', 'Targets: skills, profile, certs, exp, scenarios')
      return
    }

    const t = target.toLowerCase()

    switch (t) {
      case 'skills':
      case 'stack':
      case 'tech':
        addOutput('info', '')
        addOutput('info', '╔══════════════════════════════════════╗')
        addOutput('info', '║        TECHNICAL SKILLS              ║')
        addOutput('info', '╠══════════════════════════════════════╣')
        addOutput('success', '║ [SIEM]                               ║')
        addOutput('info', '║   → Splunk, Wazuh, Kibana, Sentinel  ║')
        addOutput('success', '║ [SOAR]                               ║')
        addOutput('info', '║   → Cortex XSOAR, Phantom            ║')
        addOutput('info', '║   → Custom Python Playbooks          ║')
        addOutput('success', '║ [DETECTION]                          ║')
        addOutput('info', '║   → MITRE ATT&CK Framework           ║')
        addOutput('info', '║   → Sigma Rules, IDS/IPS             ║')
        addOutput('success', '║ [CLOUD]                              ║')
        addOutput('info', '║   → AWS, Azure, GCP Security         ║')
        addOutput('info', '╚══════════════════════════════════════╝')
        addOutput('info', '')
        break

      case 'profile':
      case 'summary':
      case 'bio':
        addOutput('info', '')
        addOutput('success', `═══ ${profile.name} ═══`)
        addOutput('info', '')
        addOutput('info', 'Role: Security Analyst | SOC Tier II')
        addOutput('info', 'Experience: 4+ years')
        addOutput('info', '')
        profile.summary.forEach((line, i) => {
          addOutput('info', `[${String(i).padStart(2, '0')}] ${line}`)
        })
        addOutput('info', '')
        break

      case 'certs':
      case 'certifications':
        addOutput('info', '')
        addOutput('success', '═══ CERTIFICATIONS ═══')
        addOutput('info', '')
        profile.certifications.forEach(cert => {
          addOutput('info', `✓ ${cert}`)
        })
        addOutput('info', '')
        break

      case 'exp':
      case 'experience':
      case 'work':
        addOutput('info', '')
        addOutput('success', '═══ WORK EXPERIENCE ═══')
        addOutput('info', '')
        profile.experience.forEach(exp => {
          addOutput('success', `▸ ${exp.title}`)
          addOutput('info', `  ${exp.location} | ${exp.dates}`)
          exp.bullets.slice(0, 2).forEach(h => {
            addOutput('info', `  • ${h.substring(0, 60)}...`)
          })
          addOutput('info', '')
        })
        break

      case 'scenarios':
      case 'incidents':
      case 'cases':
        addOutput('info', '')
        addOutput('success', '═══ INCIDENT CASE FILES ═══')
        addOutput('info', '')
        scenarios.forEach((s, i) => {
          const severity = s.severity.toUpperCase().padEnd(8)
          addOutput(
            s.severity === 'Critical' ? 'error' : s.severity === 'High' ? 'warning' : 'info',
            `[${severity}] ${s.id}`
          )
          addOutput('info', `           ${s.title}`)
          addOutput('info', `           MITRE: ${s.mitre.join(', ')}`)
          addOutput('info', '')
        })
        break

      case 'contact':
        addOutput('info', '')
        addOutput('success', '═══ CONTACT INFORMATION ═══')
        addOutput('info', '')
        addOutput('info', `📧 Email: ${profile.contact.email}`)
        addOutput('info', `📱 Phone: ${profile.contact.phone}`)
        addOutput('info', `🔗 LinkedIn: ${profile.contact.linkedInUrl}`)
        addOutput('info', '')
        break

      case 'education':
      case 'edu':
        addOutput('info', '')
        addOutput('success', '═══ EDUCATION ═══')
        addOutput('info', '')
        profile.education.forEach(edu => {
          addOutput('success', `▸ ${edu.degree}`)
          addOutput('info', `  ${edu.school}`)
          addOutput('info', `  ${edu.dates}`)
          addOutput('info', '')
        })
        break

      default:
        addOutput('error', `Unknown target: ${target}`)
        addOutput('info', 'Available: skills, profile, certs, exp, scenarios, contact')
    }
  }

  // Handle ls command
  const handleList = (args) => {
    addOutput('info', '')
    addOutput('info', 'drwxr-xr-x  ./home')
    addOutput('info', 'drwxr-xr-x  ./about')
    addOutput('info', 'drwxr-xr-x  ./scenarios')
    addOutput('info', 'drwxr-xr-x  ./skills')
    addOutput('info', 'drwxr-xr-x  ./contact')
    addOutput('info', '-rw-r--r--  resume.pdf')
    addOutput('info', '-rw-r--r--  certifications.txt')
    addOutput('info', '')
  }

  // Handle key events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex] || '')
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-black/90"
        onClick={onClose}
      />

      {/* Terminal Window */}
      <div className="fixed inset-x-4 top-[10%] z-[101] mx-auto max-w-3xl">
        <div className="rounded-lg border border-green-500/30 bg-black shadow-2xl shadow-green-500/20 overflow-hidden font-mono text-sm">
          
          {/* Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-green-500/20">
            <div className="flex items-center gap-2">
              {/* Window buttons */}
              <button 
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                title="Close (ESC)"
              />
              <button 
                className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors opacity-50 cursor-not-allowed"
                title="Minimize (disabled)"
              />
              <button 
                className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors opacity-50 cursor-not-allowed"
                title="Maximize (disabled)"
              />
            </div>
            <span className="text-xs text-zinc-500">soc_terminal.sh — bash</span>
            <span className="text-[10px] text-zinc-600">ESC to close</span>
          </div>

          {/* Terminal Output */}
          <div 
            ref={outputRef}
            className="h-[400px] overflow-y-auto p-4 bg-black"
          >
            {output.map((line, i) => (
              <div 
                key={i} 
                className={`whitespace-pre-wrap leading-relaxed ${
                  line.type === 'command' ? 'text-green-400' :
                  line.type === 'error' ? 'text-red-400' :
                  line.type === 'warning' ? 'text-yellow-400' :
                  line.type === 'success' ? 'text-green-400' :
                  line.type === 'system' ? 'text-cyan-400' :
                  'text-zinc-400'
                }`}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Input Line */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-green-500/20 bg-zinc-900/50">
            <span className="text-green-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command..."
              className="flex-1 bg-transparent text-green-400 placeholder:text-zinc-600 outline-none caret-green-500"
              autoComplete="off"
              spellCheck="false"
            />
            <span className="text-green-500 animate-pulse">▊</span>
          </div>

          {/* Quick Commands Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-800 bg-zinc-900/80 text-[10px] text-zinc-600">
            <div className="flex items-center gap-3">
              <span>↑↓ history</span>
              <span>↵ execute</span>
              <span>ESC close</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-zinc-700">|</span>
              <span className="hover:text-green-400 cursor-pointer" onClick={() => { setInput('help'); executeCommand('help'); }}>help</span>
              <span className="hover:text-green-400 cursor-pointer" onClick={() => { setInput('ls'); executeCommand('ls'); }}>ls</span>
              <span className="hover:text-green-400 cursor-pointer" onClick={() => { setInput('clear'); executeCommand('clear'); }}>clear</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
