
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CallStackProps {
  stack: string[];
}

const CallStack: React.FC<CallStackProps> = ({ stack }) => {
  return (
    <div className="flex flex-col gap-1.5 overflow-y-auto scrollbar-hide px-2">
      <AnimatePresence mode="popLayout">
        {[...stack].reverse().map((func, i) => {
          const isTop = i === 0;
          return (
            <motion.div
              key={`${func}-${stack.length - 1 - i}`}
              layout
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`px-3 py-2 rounded-xl border flex items-center justify-between transition-all ${
                isTop ? 'bg-rose-500/10 border-rose-500/30' : 'bg-white/5 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                 <div className={`w-1 h-1 rounded-full ${isTop ? 'bg-rose-500 animate-pulse' : 'bg-zinc-600'}`} />
                 <span className={`text-[10px] font-mono font-bold truncate ${isTop ? 'text-white' : 'text-zinc-500'}`}>
                   {func}
                 </span>
              </div>
              {isTop && <span className="text-[7px] font-black text-rose-500/50 uppercase tracking-tighter">Active</span>}
            </motion.div>
          );
        })}
      </AnimatePresence>
      {stack.length === 0 && (
        <div className="text-[8px] text-zinc-700 font-bold uppercase text-center py-6 italic tracking-[0.2em]">Void</div>
      )}
    </div>
  );
};

export default CallStack;
