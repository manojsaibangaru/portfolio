/**
 * Severity Badge - Terminal/Cybersecurity Aesthetic
 */
const SEVERITY_STYLES = {
  Critical: "border-red-500/50 bg-red-500/10 text-red-400",
  High: "border-orange-500/50 bg-orange-500/10 text-orange-400",
  Medium: "border-yellow-500/50 bg-yellow-500/10 text-yellow-400",
  Low: "border-green-500/50 bg-green-500/10 text-green-400",
}

export default function SeverityBadge({ severity, size = "md" }) {
  const style = SEVERITY_STYLES[severity] || SEVERITY_STYLES.Medium
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[9px]" : "px-3 py-1 text-[10px]"
  
  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded border font-mono font-bold
      ${style} ${sizeClass}
    `}>
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      {severity.toUpperCase()}
    </span>
  )
}
