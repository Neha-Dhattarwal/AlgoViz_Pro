
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlgorithmStep } from '../types';

interface LinkedListVisualizerProps {
  step: AlgorithmStep;
}

const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ step }) => {
  const list = step.linkedList || [];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-x-auto px-20 scrollbar-hide">
      <div className="flex items-center gap-32 relative py-40">
        <AnimatePresence mode="popLayout">
          {list.map((node: any, idx: number) => {
            const isHighlighted = step.highlights.includes(idx);
            const activePointers = Object.entries(step.pointers)
              .filter(([_, pos]) => pos === idx)
              .map(([name]) => name);

            // Determine if an arrow should be drawn to a specific target
            const nextIdx = node.next;
            const hasNext = nextIdx !== null && nextIdx !== undefined;

            return (
              <div key={idx} className="relative flex items-center shrink-0">
                {/* Pointer Hub */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 h-24 justify-end z-30">
                  {activePointers.map((name) => (
                    <motion.div
                      key={name}
                      layoutId={`ptr-${name}`}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white shadow-lg ${
                        name === 'curr' ? 'bg-blue-600' : name === 'prev' ? 'bg-rose-600' : 'bg-emerald-600'
                      }`}
                    >
                      {name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-inherit" />
                    </motion.div>
                  ))}
                </div>

                {/* Node */}
                <motion.div
                  layout
                  animate={{ 
                    scale: isHighlighted ? 1.1 : 1,
                    borderColor: isHighlighted ? '#fff' : 'rgba(255,255,255,0.1)',
                    backgroundColor: isHighlighted ? '#2563eb' : '#0a0d14'
                  }}
                  className="w-24 h-24 rounded-3xl border-4 flex items-center justify-center text-2xl font-black font-mono transition-all z-20"
                >
                  {node.value}
                </motion.div>

                {/* Arrow to Next Node */}
                {hasNext && (
                  <div className={`absolute z-10 pointer-events-none transition-all duration-500 ${nextIdx < idx ? 'text-rose-500' : 'text-blue-500'}`}
                       style={{ 
                         left: nextIdx > idx ? '96px' : 'auto', 
                         right: nextIdx < idx ? '96px' : 'auto',
                         width: '128px',
                         transform: nextIdx < idx ? 'rotate(180deg)' : 'none'
                       }}>
                    <svg width="128" height="20" viewBox="0 0 128 20" className="overflow-visible">
                      <motion.line 
                        x1="0" y1="10" x2="120" y2="10" 
                        stroke="currentColor" strokeWidth="4" 
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      />
                      <path d="M115 2 L125 10 L115 18" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </div>
                )}
                
                {/* NULL Indicator */}
                {!hasNext && (
                  <div className="absolute left-32 flex flex-col items-center opacity-30">
                    <div className="w-8 h-1 bg-slate-500 rounded-full" />
                    <span className="text-[8px] font-black">NULL</span>
                  </div>
                )}
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
