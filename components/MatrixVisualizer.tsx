
import React from 'react';
import { AlgorithmStep } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface MatrixVisualizerProps {
  step: AlgorithmStep;
}

const MatrixVisualizer: React.FC<MatrixVisualizerProps> = ({ step }) => {
  if (!step.grid || step.grid.length === 0) return null;

  const rows = step.grid.length;
  const cols = step.grid[0].length;

  return (
    <div className="w-full h-full flex items-center justify-center p-16">
      <div 
        className="grid gap-6 bg-black/50 p-10 rounded-[3rem] border border-white/10 shadow-2xl relative"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          width: 'fit-content'
        }}
      >
        <AnimatePresence mode="popLayout">
          {step.grid.map((row, rIdx) => (
            row.map((val, cIdx) => {
              const flatIdx = rIdx * cols + cIdx;
              const isHigh = step.highlights.includes(flatIdx);
              
              return (
                <motion.div
                  key={`${rIdx}-${cIdx}`}
                  layout
                  animate={{
                    scale: isHigh ? 1.1 : 1,
                    backgroundColor: isHigh ? '#2563eb' : 'rgba(255,255,255,0.03)',
                    borderColor: isHigh ? '#fff' : 'rgba(255,255,255,0.08)',
                    boxShadow: isHigh ? '0 0 60px rgba(37,99,235,0.4)' : 'none'
                  }}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-[2rem] border-4 flex items-center justify-center font-mono transition-all z-10 relative`}
                >
                  <span className={`text-3xl font-black ${isHigh ? 'text-white' : 'text-slate-600'}`}>
                    {val}
                  </span>
                  
                  {/* Local Cell Address - Large and visible */}
                  <div className="absolute -bottom-2 -right-2 text-[9px] font-black text-slate-800 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/5">
                    {rIdx},{cIdx}
                  </div>
                  
                  {/* Visual Pointer/Scanner - Scaled up */}
                  {isHigh && (
                    <motion.div 
                      layoutId="matrix-ptr"
                      className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    >
                      <div className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-2xl border border-white/20">
                        CURSOR
                      </div>
                      <div className="w-1 h-4 bg-blue-500 rounded-full" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MatrixVisualizer;
