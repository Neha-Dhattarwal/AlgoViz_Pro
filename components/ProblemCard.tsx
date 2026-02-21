
import React from 'react';
import { Problem } from '../types';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Code, Binary } from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
  onClick: () => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onClick }) => {
  const getDiffStyles = (diff: string) => {
    if (diff === 'Easy') return 'text-emerald-400 bg-emerald-400/5 border-emerald-400/20';
    if (diff === 'Medium') return 'text-amber-400 bg-amber-400/5 border-amber-400/20';
    return 'text-rose-400 bg-rose-400/5 border-rose-400/20';
  };

  const getCatIcon = () => {
    if (problem.category === 'Linked List') return <Binary size={12} className="text-blue-500" />;
    if (problem.category === 'Matrix') return <Database size={12} className="text-indigo-400" />;
    return <Code size={12} className="text-blue-500" />;
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group bg-surface border border-border rounded-[2rem] p-7 cursor-pointer hover:border-blue-500/40 transition-all relative overflow-hidden flex flex-col justify-between h-[300px] shadow-xl"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.03] blur-[60px] group-hover:bg-blue-500/[0.07] transition-all duration-700" />
      
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-lg border ${getDiffStyles(problem.difficulty || 'Easy')}`}>
            {problem.difficulty || 'Easy'}
          </span>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.03] rounded-lg border border-border">
            {getCatIcon()}
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{problem.category || 'Logic'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-[var(--text-primary)] group-hover:text-blue-400 transition-colors tracking-[-0.02em] leading-tight">
            {problem.title || 'Untitled Problem'}
          </h3>
          <p className="text-[12px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed font-medium">
            {problem.description || 'No description available for this problem.'}
          </p>
        </div>
      </div>

      <div className="pt-6 flex items-center justify-between border-t border-border mt-auto relative z-10">
        <div className="flex gap-5">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Complexity</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold text-[var(--text-primary)]">{problem.complexity?.time || 'O(N)'}</span>
            </div>
          </div>
          <div className="w-px h-6 bg-border my-auto"></div>
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Space</span>
            <span className="text-[10px] font-mono font-bold text-[var(--text-primary)]">{problem.complexity?.space || 'O(1)'}</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <ArrowRight size={18} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemCard;