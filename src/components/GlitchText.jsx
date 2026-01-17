/**
 * Glitch Text Effect
 * 
 * CSS-based glitch animation for headlines
 * Gives that "system malfunction" cyberpunk feel
 */
export default function GlitchText({ children, className = '' }) {
  return (
    <span 
      className={`glitch-text relative inline-block ${className}`}
      data-text={children}
    >
      {children}
      <style jsx>{`
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        .glitch-text::before {
          animation: glitch-1 2s infinite linear alternate-reverse;
          color: #00e69a;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          transform: translateX(-2px);
        }
        .glitch-text::after {
          animation: glitch-2 3s infinite linear alternate-reverse;
          color: #6366f1;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          transform: translateX(2px);
        }
        @keyframes glitch-1 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); transform: translateX(-2px); }
          25% { clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%); transform: translateX(2px); }
          50% { clip-path: polygon(0 5%, 100% 5%, 100% 25%, 0 25%); transform: translateX(-1px); }
          75% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translateX(1px); }
        }
        @keyframes glitch-2 {
          0%, 100% { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); transform: translateX(2px); }
          25% { clip-path: polygon(0 70%, 100% 70%, 100% 85%, 0 85%); transform: translateX(-2px); }
          50% { clip-path: polygon(0 75%, 100% 75%, 100% 95%, 0 95%); transform: translateX(1px); }
          75% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translateX(-1px); }
        }
      `}</style>
    </span>
  )
}
