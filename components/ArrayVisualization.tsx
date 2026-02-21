
import React from 'react';
import { AlgorithmStep } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ArrayVisualizationProps {
  step: AlgorithmStep;
}

const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({ step }) => {
  if (!step.array) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-10 p-20 min-w-full">
      <AnimatePresence mode="popLayout">
        {step.array.map((val, idx) => {
          const isHighlighted = step.highlights.includes(idx);
          const activePointers = Object.entries(step.pointers)
            .filter(([_, pos]) => pos === idx)
            .map(([name]) => name);
          
          let stateClass = 'bg-surface border-border text-slate-400 shadow-2xl';
          if (isHighlighted) {
            stateClass = 'bg-surface border-blue-500 shadow-[0_0_80px_rgba(37,99,235,0.2)] scale-105';
            if (step.operation_type === 'match') stateClass = 'bg-subtle border-emerald-500 shadow-[0_0_80px_rgba(16,185,129,0.3)] scale-110';
          }

          return (
            <motion.div 
              key={idx} 
              layout 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex flex-col items-center shrink-0"
            >
              {/* Pointer Bubbles (Bottom in screenshot) */}
              <div className="absolute -bottom-12 flex items-center gap-1.5 z-30">
                <AnimatePresence>
                  {activePointers.map(ptr => (
                    <motion.div 
                      key={ptr}
                      layoutId={`ptr-${ptr}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-xl ${
                        ptr === 'L' || ptr === 'i' ? 'bg-blue-600' : 
                        ptr === 'R' || ptr === 'j' ? 'bg-rose-600' : 'bg-slate-700'
                      }`}
                    >
                      {ptr}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Large Rounded Data Cell */}
              <div className={`w-32 h-32 rounded-[3rem] border-[6px] flex items-center justify-center transition-all duration-500 ${stateClass} z-10`}>
                <span className={`text-5xl font-black font-mono tracking-tighter transition-colors ${isHighlighted ? 'text-[var(--text-primary)]' : 'text-slate-500 opacity-40'}`}>
                   {val}
                </span>
              </div>
              
              {/* Index Sublabel */}
              <div className="absolute -bottom-8 text-[9px] font-black text-slate-700 font-mono tracking-widest uppercase bg-canvas/40 px-2 rounded-full border border-border">
                {idx}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ArrayVisualization;
