
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VariablePanelProps {
  variables: Record<string, any>;
  visualFocus: string;
}

const VariablePanel: React.FC<VariablePanelProps> = ({ variables, visualFocus }) => {
  const formatValue = (val: any) => {
    if (val === null) return 'NULL';
    if (typeof val === 'object') {
      if (Array.isArray(val)) return `LIST[${val.length}]`;
      return '{OBJ}';
    }
    return String(val);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {Object.entries(variables).map(([key, val]) => {
          const isFocus = visualFocus === key;
          return (
            <motion.div 
              key={key}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`px-6 py-5 rounded-[2rem] border transition-all duration-300 flex justify-between items-center group ${
                isFocus 
                  ? 'bg-blue-600/10 border-blue-500/40 shadow-xl ring-8 ring-blue-500/5' 
                  : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex flex-col min-w-0">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 truncate ${isFocus ? 'text-blue-400' : 'text-slate-500'}`}>
                  {key}
                </span>
                <span className={`text-[24px] font-mono font-black truncate ${isFocus ? 'text-white' : 'text-slate-300'}`}>
                  {formatValue(val)}
                </span>
              </div>
              {isFocus && (
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] animate-pulse shrink-0 ml-4" />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      {Object.keys(variables).length === 0 && (
        <div className="col-span-full py-12 text-center opacity-20 text-[11px] uppercase font-black tracking-[0.5em] italic">
          No Registered Variables
        </div>
      )}
    </div>
  );
};

export default VariablePanel;
