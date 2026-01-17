import { Link } from "react-router-dom"
import { profile } from "../data/profile.js"
import MatrixRain from '../components/MatrixRain.jsx'

/**
 * About Page - Hardcore Cybersecurity Aesthetic
 * 
 * Profile displayed like a terminal readout / dossier
 */

const ASCII_PROFILE = `
╔═══════════════════════════════════════════╗
║           ANALYST PROFILE                  ║
║           SECURITY CLEARANCE: GRANTED      ║
╚═══════════════════════════════════════════╝
`

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Matrix rain background */}
      <MatrixRain />
      
      {/* Overlays */}
      <div className="fixed inset-0 -z-10 scanlines opacity-10 pointer-events-none" />
      <div className="fixed inset-0 -z-10 noise pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-green-500/20 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between font-mono text-sm">
            <Link to="/" className="flex items-center gap-3 text-green-400 hover:text-green-300">
              <span className="text-green-500">$</span>
              <span className="text-zinc-500">cd</span>
              <span className="text-blue-400">~/profile</span>
              <span className="animate-pulse">▊</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-zinc-400 hover:text-green-400 transition-colors">
                ./home
              </Link>
              <Link to="/scenarios" className="text-zinc-400 hover:text-green-400 transition-colors">
                ./scenarios
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
        <div className="mx-auto max-w-5xl px-6">
          {/* ASCII Header */}
          <pre className="text-green-500/60 text-[10px] leading-tight mb-8 hidden sm:block">
            {ASCII_PROFILE}
          </pre>

          {/* Breadcrumb */}
          <div className="text-sm text-zinc-600 mb-8">
            <span className="text-green-400">$</span> cat /home/analyst/profile.md
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Identity Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Profile card */}
                <div className="rounded-xl border border-zinc-800 bg-black/60 p-6 backdrop-blur">
                  {/* Avatar */}
                  <div className="text-center mb-6">
                    <div className="inline-block p-1 border border-green-500/30 rounded-lg">
                      <div className="h-24 w-24 rounded-lg bg-green-500/10 flex items-center justify-center text-3xl text-green-400 font-bold">
                        {profile.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] bg-green-500/20 text-green-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  {/* Identity info */}
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between border-b border-zinc-800 pb-2">
                      <span className="text-zinc-600">NAME</span>
                      <span className="text-white">{profile.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-800 pb-2">
                      <span className="text-zinc-600">ROLE</span>
                      <span className="text-cyan-400">Security Analyst</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-800 pb-2">
                      <span className="text-zinc-600">TIER</span>
                      <span className="text-yellow-400">SOC II</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-800 pb-2">
                      <span className="text-zinc-600">EXP</span>
                      <span className="text-white">4+ years</span>
                    </div>
                  </div>
                </div>

                {/* Contact links */}
                <div className="rounded-xl border border-zinc-800 bg-black/60 p-4 backdrop-blur space-y-2">
                  <div className="text-xs text-zinc-600 mb-3">// SECURE_CHANNELS</div>
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="flex items-center gap-3 p-2 rounded border border-zinc-800 hover:border-green-500/30 hover:bg-green-500/5 transition-colors text-sm"
                  >
                    <span className="text-green-400">→</span>
                    <span className="text-zinc-400 truncate">{profile.contact.email}</span>
                  </a>
                  {profile.contact.linkedInUrl && (
                    <a
                      href={profile.contact.linkedInUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-2 rounded border border-zinc-800 hover:border-blue-500/30 hover:bg-blue-500/5 transition-colors text-sm"
                    >
                      <span className="text-blue-400">→</span>
                      <span className="text-zinc-400">LinkedIn</span>
                    </a>
                  )}
                  <a
                    href={`tel:${profile.contact.phone?.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3 p-2 rounded border border-zinc-800 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-colors text-sm"
                  >
                    <span className="text-cyan-400">→</span>
                    <span className="text-zinc-400">{profile.contact.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Summary */}
              <section className="rounded-xl border border-zinc-800 bg-black/60 p-6 backdrop-blur">
                <div className="flex items-center gap-2 text-green-400 text-sm mb-4">
                  <span>▸</span>
                  <span>ANALYST_SUMMARY</span>
                </div>
                <div className="space-y-3 text-sm text-zinc-400">
                  {profile.summary.slice(0, 4).map((item, i) => (
                    <p key={i} className="flex gap-3">
                      <span className="text-zinc-700 shrink-0">[{String(i).padStart(2, '0')}]</span>
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </section>

              {/* Experience */}
              <section className="rounded-xl border border-zinc-800 bg-black/60 p-6 backdrop-blur">
                <div className="flex items-center gap-2 text-cyan-400 text-sm mb-6">
                  <span>▸</span>
                  <span>OPERATION_HISTORY</span>
                </div>
                <div className="space-y-6">
                  {profile.experience.map((role, i) => (
                    <div key={i} className="border-l-2 border-zinc-800 pl-4 hover:border-green-500/50 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="text-white">{role.title}</div>
                          <div className="text-xs text-zinc-600">{role.location}</div>
                        </div>
                        <div className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded shrink-0">
                          {role.dates}
                        </div>
                      </div>
                      <ul className="space-y-1 text-xs text-zinc-500">
                        {role.bullets.slice(0, 3).map((bullet, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-zinc-700">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section className="rounded-xl border border-zinc-800 bg-black/60 p-6 backdrop-blur">
                <div className="flex items-center gap-2 text-yellow-400 text-sm mb-4">
                  <span>▸</span>
                  <span>VERIFIED_CREDENTIALS</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {profile.certifications.map((cert, i) => (
                    <div 
                      key={i}
                      className="p-3 rounded border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-300 flex items-center gap-2"
                    >
                      <span className="text-green-500">✓</span>
                      {cert}
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section className="rounded-xl border border-zinc-800 bg-black/60 p-6 backdrop-blur">
                <div className="flex items-center gap-2 text-purple-400 text-sm mb-4">
                  <span>▸</span>
                  <span>TECHNICAL_CAPABILITIES</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(profile.skills).map(([group, categories]) => (
                    <div key={group} className="p-4 rounded border border-zinc-800 bg-zinc-900/30">
                      <div className="text-xs text-zinc-600 mb-3">{group}</div>
                      {Object.entries(categories).map(([category, items]) => (
                        <div key={category} className="mb-2">
                          <div className="text-[10px] text-zinc-500 mb-1">{category}:</div>
                          <div className="flex flex-wrap gap-1">
                            {items.slice(0, 4).map((item) => (
                              <span
                                key={item}
                                className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section className="rounded-xl border border-zinc-800 bg-black/60 p-6 backdrop-blur">
                <div className="flex items-center gap-2 text-blue-400 text-sm mb-4">
                  <span>▸</span>
                  <span>TRAINING_BACKGROUND</span>
                </div>
                <div className="space-y-4">
                  {profile.education.map((edu, i) => (
                    <div key={i} className="flex justify-between items-start border-b border-zinc-800 pb-3 last:border-0">
                      <div>
                        <div className="text-white text-sm">{edu.degree}</div>
                        <div className="text-xs text-zinc-600">{edu.school}</div>
                      </div>
                      <div className="text-xs text-zinc-500">{edu.dates}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div className="text-center py-8">
                <Link
                  to="/scenarios"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/50 text-green-400 rounded hover:bg-green-500/20 transition-all"
                >
                  <span className="text-green-600">$</span>
                  <span>./view_incident_reports.sh</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 font-mono text-xs">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-zinc-600">
            <div>© {new Date().getFullYear()} {profile.name} // EOF</div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              ENCRYPTED_CONNECTION
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
