import { Link } from "react-router-dom"
import MitreTag from "./ui/MitreTag.jsx"

/**
 * Scenario Card - Terminal/Cybersecurity Aesthetic
 * 
 * Matches the hardcore SOC dashboard look
 */

const SEVERITY_STYLES = {
  Critical: "border-red-500/30 bg-red-500/5 text-red-400",
  High: "border-orange-500/30 bg-orange-500/5 text-orange-400",
  Medium: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
  Low: "border-green-500/30 bg-green-500/5 text-green-400",
}

export default function ScenarioCard({ scenario }) {
  const severityStyle = SEVERITY_STYLES[scenario.severity] || SEVERITY_STYLES.Medium

  return (
    <Link
      to={`/scenarios/${scenario.id}`}
      className="group block rounded-xl border border-zinc-800 bg-black/60 p-5 font-mono hover:border-green-500/30 hover:bg-black/80 transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className={`px-2 py-1 rounded text-[10px] font-bold border ${severityStyle}`}>
          {scenario.severity.toUpperCase()}
        </span>
        <span className="text-[10px] text-zinc-600">{scenario.id}</span>
      </div>

      {/* Title */}
      <h3 className="text-white group-hover:text-green-400 transition-colors mb-2">
        {scenario.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-2">
        {scenario.shortDescription}
      </p>

      {/* MITRE Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {scenario.mitre.map((technique) => (
          <MitreTag 
            key={technique} 
            techniqueId={technique} 
            name={scenario.mitreName}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 text-xs text-green-400 group-hover:text-green-300">
        <span className="text-zinc-600">$</span>
        <span>./investigate.sh</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
      </div>
    </Link>
  )
}
