import { Link } from "react-router-dom"
import ScenarioCard from "../components/ScenarioCard.jsx"
import scenarios from "../data/scenarios.json"
import { profile } from "../data/profile.js"
import MatrixRain from '../components/MatrixRain.jsx'

/**
 * Scenarios Page - Terminal/Cybersecurity Aesthetic
 * 
 * Displayed like a case management system / threat database
 * Matches the home and about page terminal style
 */
export default function ScenariosPage() {
  const criticalCount = scenarios.filter(s => s.severity === 'Critical').length
  const highCount = scenarios.filter(s => s.severity === 'High').length

  return (
    <div className="relative min-h-screen">
      {/* Matrix rain background */}
      <MatrixRain />
      
      {/* Overlays */}
      <div className="fixed inset-0 -z-10 scanlines opacity-10 pointer-events-none" />
      <div className="fixed inset-0 -z-10 noise pointer-events-none" />

      {/* Terminal Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-green-500/20 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between font-mono text-sm">
            <Link to="/" className="flex items-center gap-2 text-green-400 hover:text-green-300">
              <span className="text-green-500">$</span>
              <span className="text-zinc-500">cd</span>
              <span className="text-blue-400">~/incidents</span>
              <span className="animate-pulse">▊</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-zinc-400 hover:text-green-400 transition-colors">
                ./home
              </Link>
              <Link to="/about" className="text-zinc-400 hover:text-green-400 transition-colors">
                ./about
              </Link>
              <a
                href={`mailto:${profile.contact.email}`}
                className="px-4 py-1.5 rounded border border-green-500/50 text-green-400 hover:bg-green-500/10 transition-colors"
              >
                --contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 font-mono">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-green-400 transition-colors mb-6"
            >
              <span>←</span>
              <span>cd ..</span>
            </Link>

            <div className="text-sm text-zinc-600 mb-4">
              <span className="text-green-400">$</span> ls -la ./incident_database/
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              INCIDENT <span className="text-green-400">DATABASE</span>
            </h1>
            
            <p className="text-zinc-500 max-w-2xl text-sm">
              Real-world security incidents documented from detection to remediation. 
              Each case demonstrates threat analysis, SIEM correlation, and response actions.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-4 mt-8 text-xs">
              <div className="px-4 py-2 rounded border border-zinc-800 bg-black/40">
                <span className="text-zinc-500">TOTAL:</span>
                <span className="text-white ml-2">{scenarios.length}</span>
              </div>
              <div className="px-4 py-2 rounded border border-red-500/30 bg-red-500/5">
                <span className="text-red-400">CRITICAL:</span>
                <span className="text-white ml-2">{criticalCount}</span>
              </div>
              <div className="px-4 py-2 rounded border border-orange-500/30 bg-orange-500/5">
                <span className="text-orange-400">HIGH:</span>
                <span className="text-white ml-2">{highCount}</span>
              </div>
            </div>
          </div>

          {/* Scenario grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario, i) => (
              <div 
                key={scenario.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <ScenarioCard scenario={scenario} />
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-16 py-8 border-t border-zinc-900">
            <div className="text-zinc-600 text-xs mb-4">// EOF incident_database</div>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-sm text-zinc-400 hover:text-green-400 transition-colors"
            >
              <span className="text-zinc-600">$</span>
              <span>cat analyst_profile.txt</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 font-mono text-xs">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-zinc-600">
            <div>© {new Date().getFullYear()} {profile.name} // {scenarios.length} records loaded</div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              DATABASE_SYNCED
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
