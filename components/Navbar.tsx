
import React from 'react';
import { Code2, Sun, Moon, Zap } from 'lucide-react';

interface NavbarProps {
  onHome: () => void;
  onToggleTheme?: () => void;
  theme?: 'light' | 'dark';
}

const Navbar: React.FC<NavbarProps> = ({ onHome, onToggleTheme, theme }) => {
  return (
    <nav className="h-16 border-b border-border bg-canvas/80 backdrop-blur-xl sticky top-0 z-[200] px-8 flex items-center justify-between transition-all duration-300">
      <div 
        onClick={onHome}
        className="flex items-center gap-4 cursor-pointer group"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 group-hover:scale-105 transition-all">
          <Code2 size={20} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-lg tracking-[-0.03em] text-[var(--text-primary)] leading-none">
            ALGO<span className="text-blue-500">VIZ</span>
          </span>
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Professional Edition</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-surface border border-border rounded-full">
          <Zap size={12} className="text-amber-500" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            V-Engine v4.0.2 Stable
          </span>
        </div>

        <div className="w-px h-6 bg-border mx-2 hidden sm:block"></div>

        <button 
          onClick={onToggleTheme}
          className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-slate-400 hover:text-blue-500 transition-all active:scale-95"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
