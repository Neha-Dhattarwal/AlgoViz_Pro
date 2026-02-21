
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ isPlaying, onTogglePlay, onNext, onPrev, onReset }) => {
  return (
    <div className="flex items-center gap-8">
      <button 
        onClick={onReset}
        className="text-slate-500 hover:text-white transition-all active:scale-90"
        title="Reset"
      >
        <RotateCcw size={18} />
      </button>
      
      <div className="h-8 w-px bg-white/10" />

      <button 
        onClick={onPrev}
        className="text-slate-400 hover:text-white transition-all active:scale-90"
      >
        <SkipBack size={22} fill="currentColor" />
      </button>

      <button 
        onClick={onTogglePlay}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-blue-600 shadow-xl shadow-blue-500/30 transition-all hover:scale-110 active:scale-95"
      >
        {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
      </button>

      <button 
        onClick={onNext}
        className="text-slate-400 hover:text-white transition-all active:scale-90"
      >
        <SkipForward size={22} fill="currentColor" />
      </button>
    </div>
  );
};

export default ControlPanel;
