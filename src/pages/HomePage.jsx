import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScenarioCard from '../components/ScenarioCard.jsx'
import MatrixRain from '../components/MatrixRain.jsx'
import TerminalIntro from '../components/TerminalIntro.jsx'
import ThreatFeed from '../components/ThreatFeed.jsx'
import SystemStatus from '../components/SystemStatus.jsx'
import GlitchText from '../components/GlitchText.jsx'
import ContactTerminal from '../components/ContactTerminal.jsx'
import scenarios from '../data/scenarios.json'
import { profile } from '../data/profile.js'

/**
 * Home Page - Hardcore Cybersecurity Aesthetic
 * 
 * This screams "I live and breathe security"
 * - Terminal boot sequence
 * - Matrix rain background
 * - Live threat feed
 * - Glitch effects
 * - SOC dashboard feel
 */

const ASCII_ART = `
 ██████╗██╗   ██╗██████╗ ███████╗██████╗ 
██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗
██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝
██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗
╚██████╗   ██║   ██████╔╝███████╗██║  ██║
 ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝
    S E C U R I T Y   O P E R A T I O N S
`

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const featuredScenarios = scenarios.slice(0, 3)

  useEffect(() => {
    // Check if intro was already shown
    if (sessionStorage.getItem('bootSequenceSeen')) {
      setShowIntro(false)
      setLoaded(true)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setTimeout(() => setLoaded(true), 100)
  }

  return (
    <>
      {/* Boot sequence overlay */}
      {showIntro && <TerminalIntro onComplete={handleIntroComplete} />}

      <div className="relative min-h-screen">
        {/* Matrix rain background */}
        <MatrixRain />
        
        {/* Scan lines overlay */}
        <div className="fixed inset-0 -z-10 scanlines opacity-10 pointer-events-none" />
        
        {/* Grid pattern */}
        <div className="fixed inset-0 -z-10 grid-pattern opacity-10 pointer-events-none" />
        
        {/* Noise texture */}
        <div className="fixed inset-0 -z-10 noise pointer-events-none" />

        {/* Navigation - Terminal style */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-green-500/20 bg-black/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex h-16 items-center justify-between font-mono text-sm">
              <Link to="/" className="flex items-center gap-3 text-green-400 hover:text-green-300">
                <span className="text-green-500">$</span>
                <span className="hidden sm:inline">root@soc</span>
                <span className="text-zinc-500">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-zinc-500">#</span>
                <span className="animate-pulse">▊</span>
              </Link>
              <div className="flex items-center gap-6">
                <Link to="/about" className="text-zinc-400 hover:text-green-400 transition-colors">
                  ./about
                </Link>
                <Link to="/scenarios" className="text-zinc-400 hover:text-green-400 transition-colors">
                  ./scenarios
                </Link>
                <a
                  href="#contact"
                  className="px-4 py-1.5 rounded border border-green-500/50 text-green-400 hover:bg-green-500/10 transition-colors"
                >
                  --contact
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center pt-16">
            <div className="mx-auto max-w-7xl px-6 py-20 w-full">
              <div className="grid lg:grid-cols-5 gap-12 items-center">
                {/* Left - Main content */}
                <div className="lg:col-span-3 space-y-8">
                  {/* ASCII Art */}
                  <pre className="text-green-500/60 text-[8px] sm:text-[10px] leading-tight font-mono hidden sm:block">
                    {ASCII_ART}
                  </pre>

                  {/* Status indicator */}
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <span className="flex items-center gap-2 text-green-400">
                      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      SYSTEM ACTIVE
                    </span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-zinc-500">ROLE: XSOAR ENGINEER</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-blue-400">SOAR IMPLEMENTATION</span>
                  </div>

                  {/* Main headline with glitch */}
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    <GlitchText>SECURITY</GlitchText>
                    <br />
                    <span className="text-green-400">OPERATIONS</span>
                    <br />
                    <span className="text-zinc-500 text-2xl md:text-4xl">CENTER</span>
                  </h1>

                  {/* Description - Terminal style */}
                  <div className="font-mono text-sm text-zinc-400 space-y-2">
                    <p>
                      <span className="text-green-400">&gt;</span> Engineer: <span className="text-cyan-400">{profile.name}</span>
                    </p>
                    <p>
                      <span className="text-green-400">&gt;</span> Specialization: Cortex XSOAR, Splunk SIEM, CrowdStrike EDR, Security Automation
                    </p>
                    <p>
                      <span className="text-green-400">&gt;</span> Status: <span className="text-green-400">Available for new engagements</span>
                    </p>
                  </div>

                  {/* CTA Buttons - Terminal commands */}
                  <div className="flex flex-wrap gap-4 font-mono">
                    <Link
                      to="/scenarios"
                      className="group px-6 py-3 bg-green-500/10 border border-green-500/50 text-green-400 rounded hover:bg-green-500/20 transition-all flex items-center gap-3"
                    >
                      <span className="text-green-600">$</span>
                      <span>./view_incidents.sh</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">↵</span>
                    </Link>
                    <Link
                      to="/about"
                      className="group px-6 py-3 border border-zinc-700 text-zinc-400 rounded hover:border-zinc-500 hover:text-zinc-300 transition-all flex items-center gap-3"
                    >
                      <span className="text-zinc-600">$</span>
                      <span>cat profile.txt</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">↵</span>
                    </Link>
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-800 font-mono">
                    <div>
                      <div className="text-3xl text-green-400">4+</div>
                      <div className="text-xs text-zinc-500">YEARS_EXP</div>
                    </div>
                    <div>
                      <div className="text-3xl text-cyan-400">50+</div>
                      <div className="text-xs text-zinc-500">PLAYBOOKS_DEPLOYED</div>
                    </div>
                    <div>
                      <div className="text-3xl text-yellow-400">10+</div>
                      <div className="text-xs text-zinc-500">INTEGRATIONS_BUILT</div>
                    </div>
                  </div>
                </div>

                {/* Right - Live panels */}
                <div className="lg:col-span-2 space-y-6">
                  {/* System Status */}
                  <div className="rounded-xl border border-zinc-800 bg-black/60 p-4 backdrop-blur">
                    <div className="flex items-center gap-2 mb-4 font-mono text-xs text-zinc-500">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      SYSTEM_STATUS
                    </div>
                    <SystemStatus />
                  </div>

                  {/* Live Threat Feed */}
                  <div className="rounded-xl border border-zinc-800 bg-black/60 p-4 backdrop-blur max-h-[300px] overflow-hidden">
                    <ThreatFeed />
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs text-zinc-600 animate-bounce">
              <span>SCROLL_DOWN</span>
              <div className="text-center mt-2">↓</div>
            </div>
          </section>

          {/* Featured Scenarios */}
          <section className="py-24 border-t border-zinc-900">
            <div className="mx-auto max-w-7xl px-6">
              {/* Section header - Terminal style */}
              <div className="mb-12 font-mono">
                <div className="text-green-400 mb-2">
                  <span className="text-zinc-600">$</span> ls -la ./incident_reports/
                </div>
                <h2 className="text-3xl font-bold text-white">
                  ACTIVE <span className="text-green-400">CASE FILES</span>
                </h2>
                <p className="text-zinc-500 mt-2">
                  Real-world security incidents // Response documentation
                </p>
              </div>

              {/* Scenario grid */}
              <div className="grid gap-6 md:grid-cols-3">
                {featuredScenarios.map((scenario, i) => (
                  <div 
                    key={scenario.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <ScenarioCard scenario={scenario} />
                  </div>
                ))}
              </div>

              {/* View all link */}
              <div className="text-center mt-12">
                <Link
                  to="/scenarios"
                  className="inline-flex items-center gap-2 font-mono text-sm text-zinc-400 hover:text-green-400 transition-colors"
                >
                  <span className="text-zinc-600">$</span>
                  <span>./show_all_cases.sh</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Skills Overview */}
          <section className="py-24 border-t border-zinc-900 bg-black/40">
            <div className="mx-auto max-w-7xl px-6">
              <div className="font-mono mb-12">
                <div className="text-cyan-400 mb-2">
                  <span className="text-zinc-600">$</span> cat /etc/xsoar/capabilities.conf
                </div>
                <h2 className="text-3xl font-bold text-white">
                  SECURITY <span className="text-cyan-400">AUTOMATION</span> STACK
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
                {[
                  { 
                    label: 'SOAR', 
                    items: ['Cortex XSOAR', 'Playbook Design', 'Custom Integrations'],
                    color: 'green'
                  },
                  { 
                    label: 'SIEM', 
                    items: ['Splunk', 'Alert Ingestion', 'SPL Queries'],
                    color: 'cyan'
                  },
                  { 
                    label: 'EDR', 
                    items: ['CrowdStrike Falcon', 'Host Isolation', 'IOC Response'],
                    color: 'yellow'
                  },
                  { 
                    label: 'SCRIPTING', 
                    items: ['Python', 'REST APIs', 'Automation'],
                    color: 'purple'
                  },
                ].map((category) => (
                  <div 
                    key={category.label}
                    className="rounded-xl border border-zinc-800 bg-black/60 p-5 font-mono hover:border-zinc-700 transition-colors"
                  >
                    <div className={`text-${category.color}-400 text-xs mb-4 flex items-center gap-2`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {category.label}
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="text-zinc-700">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 border-t border-zinc-900">
            <div className="mx-auto max-w-4xl px-6">
              {/* Header */}
              <div className="text-center font-mono mb-12">
                <div className="inline-block px-4 py-2 rounded border border-green-500/30 bg-green-500/5 text-green-400 text-sm mb-8">
                  CONNECTION_REQUEST_AVAILABLE
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  INITIATE <span className="text-green-400">CONTACT</span>
                </h2>
                
                <p className="text-zinc-500 max-w-xl mx-auto">
                  Looking for an XSOAR engineer who delivers security automation, 
                  SOAR implementation, and incident response efficiency? Open a secure channel.
                </p>
              </div>

              {/* Contact Terminal Form */}
              <ContactTerminal />

              {/* Alternative contact */}
              <div className="mt-8 text-center font-mono text-sm text-zinc-600">
                <p className="mb-4">// Alternative channels:</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="text-zinc-500 hover:text-green-400 transition-colors"
                  >
                    [email] {profile.contact.email}
                  </a>
                  {profile.contact.linkedInUrl && (
                    <a
                      href={profile.contact.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-500 hover:text-blue-400 transition-colors"
                    >
                      [linkedin] /in/manojsaibangaru
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 py-8 font-mono text-xs">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 text-zinc-600">
              <div>
                © {new Date().getFullYear()} {profile.name} // All systems operational
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  SECURE CONNECTION
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
