
import React, { useEffect, useRef } from 'react';

interface CodePanelProps {
  code: string;
  currentLine: number;
}

const CodePanel: React.FC<CodePanelProps> = ({ code, currentLine }) => {
  const lines = code.split('\n');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Robust scrolling logic for the Logic Kernel
    if (activeLineRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const element = activeLineRef.current;
      
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Only scroll if the element is not clearly visible
      if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [currentLine]);

  const highlightToken = (token: string) => {
    if (/^(function|return|let|const|var|if|else|while|for|class|def|pass|yield|elif|import|from|in|public|static|void|int|new|async|await|res|push|Set|Map|has|get|set|delete|add|Math|max|floor)$/.test(token)) 
      return <span className="text-pink-500 font-bold">{token}</span>;
    if (/^(true|false|null|undefined|None|self|this|Infinity)$/.test(token)) 
      return <span className="text-amber-500 font-bold">{token}</span>;
    if (/^\d+$/.test(token)) 
      return <span className="text-orange-400 font-mono font-bold">{token}</span>;
    if (/^["'].*["']$/.test(token)) 
      return <span className="text-emerald-400 font-medium italic">{token}</span>;
    if (/^(solve|process|console|log|twoSum|maxProfit|climbStairs|search|reverseList|hasCycle|spiralOrder|maxDepth|isAnagram)$/.test(token))
      return <span className="text-blue-400 font-bold">{token}</span>;
    return <span className="text-[var(--text-secondary)]">{token}</span>;
  };

  const renderLine = (line: string) => {
    const tokens = line.split(/(\s+|[.,;(){}[\]])/);
    return tokens.map((t, i) => <React.Fragment key={i}>{highlightToken(t)}</React.Fragment>);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--kernel-bg)] font-mono transition-colors duration-300">
      <div className="h-16 bg-[var(--kernel-header)] border-b border-border flex items-center justify-between px-8 shrink-0 transition-colors">
        <div className="flex items-center gap-4">
           <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
           </div>
           <span className="ml-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Logic Kernel v5.1</span>
        </div>
        <div className="px-3 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-[8px] font-black text-blue-500 uppercase tracking-widest">
          Active Trace
        </div>
      </div>
      
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-0.5 bg-[var(--kernel-bg)] transition-colors">
        {lines.map((line, i) => {
          const isCurrent = currentLine === i + 1;
          return (
            <div 
              key={i} 
              ref={isCurrent ? activeLineRef : null}
              className={`flex items-start gap-6 px-4 py-1.5 rounded-lg transition-all duration-300 relative ${
                isCurrent 
                  ? 'bg-blue-600/15 border-l-4 border-blue-500 -ml-1' 
                  : 'opacity-40 hover:opacity-100 hover:bg-white/5'
              }`}
            >
              {isCurrent && (
                <div className="absolute left-[-2px] top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse" />
              )}
              <span className={`w-8 text-[9px] font-bold text-right pt-1 shrink-0 ${isCurrent ? 'text-blue-500 font-black' : 'text-slate-800'}`}>
                {i + 1}
              </span>
              <code className={`text-[12px] whitespace-pre font-medium leading-relaxed font-mono ${isCurrent ? 'text-[var(--text-primary)] font-bold' : 'text-slate-400'}`}>
                {renderLine(line)}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CodePanel;
