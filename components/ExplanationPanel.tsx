
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Info, AlertTriangle } from 'lucide-react';

interface ExplanationPanelProps {
  explanation: string;
  opType: string;
  // Added optional metadata fields to support detailed algorithm explanations and reasoning
  why?: string;
  warning?: string;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ explanation, opType, why, warning }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={explanation}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-start gap-6">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
            <Terminal size={18} className="text-blue-500" />
          </div>
          <div className="flex-1 pt-1">
            <p className="text-[14px] font-bold text-white leading-relaxed tracking-tight">
              {explanation}
            </p>

            {/* Display supplementary logic or warnings if they exist in the current step */}
            {(why || warning) && (
              <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
                {/* Explanation of the 'why' behind the current algorithmic decision */}
                {why && (
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <Info size={14} className="text-emerald-500" />
                    </div>
                    <p className="text-[12px] font-medium text-emerald-400/80 italic leading-relaxed">
                      {why}
                    </p>
                  </div>
                )}
                
                {/* Important warnings about complexity or edge case handling */}
                {warning && (
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      <AlertTriangle size={14} className="text-rose-500" />
                    </div>
                    <p className="text-[12px] font-medium text-rose-400/80 leading-relaxed">
                      {warning}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExplanationPanel;
