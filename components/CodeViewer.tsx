
import React from 'react';

interface CodeViewerProps {
  code: string;
  activeLineIndex?: number;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, activeLineIndex }) => {
  const lines = code.split('\n');

  return (
    <div className="flex-1 bg-[#010409] rounded-2xl border border-white/5 overflow-y-auto scrollbar-hide p-4 font-mono">
      {lines.map((line, i) => (
        <div 
          key={i} 
          className={`group flex items-center gap-6 px-4 py-1.5 rounded-lg transition-all ${
            activeLineIndex === i 
              ? 'bg-blue-600/20 border-l-4 border-blue-600 -ml-1' 
              : 'hover:bg-white/5'
          }`}
        >
          <span className={`w-8 text-[10px] font-bold text-right shrink-0 ${activeLineIndex === i ? 'text-blue-500' : 'text-slate-700'}`}>
            {i + 1}
          </span>
          <code className={`text-[13px] whitespace-pre-wrap leading-relaxed ${activeLineIndex === i ? 'text-white font-black' : 'text-slate-400'}`}>
            {line}
          </code>
        </div>
      ))}
    </div>
  );
};

export default CodeViewer;
