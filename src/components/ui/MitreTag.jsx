/**
 * MITRE ATT&CK Tag - Terminal/Cybersecurity Aesthetic
 */
export default function MitreTag({ techniqueId, name }) {
  const url = `https://attack.mitre.org/techniques/${techniqueId.replace('.', '/')}/`
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded border border-cyan-500/30 bg-cyan-500/10 text-[10px] text-cyan-400 font-mono hover:bg-cyan-500/20 transition-colors"
      title={name}
    >
      <span className="text-cyan-600">⬡</span>
      <span>{techniqueId}</span>
    </a>
  )
}
