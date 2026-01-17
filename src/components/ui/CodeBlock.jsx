/**
 * Code Block - Terminal/Cybersecurity Aesthetic
 * 
 * Displays SIEM queries, log samples, and code artifacts
 */
export default function CodeBlock({ code, language, title }) {
  return (
    <div className="rounded-lg border border-zinc-800 overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-zinc-700" />
            <div className="h-2 w-2 rounded-full bg-zinc-700" />
            <div className="h-2 w-2 rounded-full bg-zinc-700" />
          </div>
          <span className="text-zinc-600 text-[10px]">{title || "output"}</span>
        </div>
        {language && (
          <span className="text-[10px] text-cyan-400">{language}</span>
        )}
      </div>
      
      {/* Code content */}
      <div className="p-3 bg-black/60 overflow-x-auto">
        <pre className="text-zinc-300 whitespace-pre-wrap break-words leading-relaxed">
          {code}
        </pre>
      </div>
    </div>
  )
}
