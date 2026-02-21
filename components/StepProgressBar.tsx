
import React from 'react';

interface StepProgressBarProps {
  current: number;
  total: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ current, total }) => {
  const percentage = total > 1 ? (current / (total - 1)) * 100 : 100;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Trace Progress</span>
        <span className="text-[8px] font-mono font-bold text-blue-500">{current + 1} / {total}</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StepProgressBar;
