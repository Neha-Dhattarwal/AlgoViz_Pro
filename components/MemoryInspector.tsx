
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeapObject } from '../types';
import { Box } from 'lucide-react';

interface MemoryInspectorProps {
  stack?: Record<string, any>;
  heap?: Record<string, HeapObject>;
  highlights: (string | number)[];
}

const MemoryInspector: React.FC<MemoryInspectorProps> = ({ stack = {}, heap = {}, highlights }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide h-full">
        <AnimatePresence mode="popLayout">
          {Object.entries(heap).length > 0 ? Object.entries(heap).map(([addr, objVal]) => {
            const obj = objVal as HeapObject;
            const isHigh = highlights.includes(addr);
            return (
              <motion.div
                key={addr}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: isHigh ? 1.05 : 1,
                  borderColor: isHigh ? 'rgba(59,130,246,0.3)' : 'var(--border-default)',
                }}
                className={`min-w-[140px] max-w-[180px] rounded-xl p-3 border bg-canvas/40 flex flex-col gap-2 shrink-0 h-full transition-all ${isHigh ? 'shadow-[0_0_20px_rgba(59,130,246,0.1)]' : ''}`}
              >
                <div className="flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <Box size={10} className="text-indigo-400" />
                    <span className="text-[8px] font-bold text-indigo-400 font-mono">{addr}</span>
                  </div>
                </div>
                <div className="flex-1 bg-black/30 p-2 rounded-lg border border-border text-[10px] font-mono flex flex-col justify-center">
                  <span className="text-slate-600 text-[8px] uppercase block mb-1">Value</span>
                  <span className="text-white font-bold truncate">
                    {typeof obj.value === 'object' ? 'Object' : String(obj.value)}
                  </span>
                </div>
              </motion.div>
            );
          }) : (
            <div className="flex-1 flex items-center justify-center border border-dashed border-border rounded-xl opacity-20">
              <span className="text-[9px] uppercase font-bold tracking-widest">No Heap Data</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryInspector;
