
import React, { useState, useEffect, useRef } from 'react';
import { Problem, AlgorithmStep, VisualizationResponse } from '../types';
import { apiService } from '../services/api';
import CodePanel from '../components/CodePanel';
import ControlPanel from '../components/ControlPanel';
import StepProgressBar from '../components/StepProgressBar';
import ExplanationPanel from '../components/ExplanationPanel';
import VisualizationPanel from '../components/VisualizationPanel';
import { ArrowLeft, ZoomIn, ZoomOut, Sparkles, Search } from 'lucide-react';

interface ProblemPageProps {
  problem: Problem;
  onBack: () => void;
}

const ProblemPage: React.FC<ProblemPageProps> = ({ problem, onBack }) => {
  const [vizData, setVizData] = useState<VisualizationResponse | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [zoom, setZoom] = useState(1.0);
  const [showTutor, setShowTutor] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const load = async () => {
      setVizData(null);
      const data = await apiService.getVisualizationSteps(problem);
      setVizData({ total_steps: data.total_steps, steps: data.steps });
      setCurrentStepIndex(0);
    };
    load();
  }, [problem]);

  useEffect(() => {
    if (isPlaying && vizData) {
      const delay = 1000 / speed;
      timerRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < vizData.steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, delay);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, speed, vizData]);

  if (!vizData) return (
    <div className="flex flex-col items-center justify-center h-screen bg-canvas">
      <div className="w-12 h-12 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin mb-6" />
      <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Initialising Engine...</h2>
    </div>
  );

  const currentStep = vizData.steps[currentStepIndex] || vizData.steps[0];

  return (
    <div className="min-h-screen bg-canvas text-[var(--text-primary)] flex flex-col overflow-x-hidden transition-colors duration-300">
      
      {/* 1. SUB-HEADER (Breadcrumbs/Status) */}
      <div className="h-20 flex items-center justify-between px-10 shrink-0 border-b border-border">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-2.5 rounded-lg bg-surface border border-border text-slate-400 hover:text-white transition-all active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col uppercase tracking-tighter">
            <h2 className="text-sm font-black">{problem.title}</h2>
            <div className="flex gap-2 text-[9px] font-black mt-1">
              <span className={problem.difficulty === 'Easy' ? 'text-emerald-500' : 'text-amber-500'}>{problem.difficulty}</span>
              <span className="text-blue-500">{problem.category}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-canvas rounded-lg border border-border shadow-inner">
            <button onClick={() => setZoom(Math.max(0.4, zoom - 0.1))} className="text-slate-500 hover:text-[var(--text-primary)]"><ZoomOut size={14} /></button>
            <span className="text-[10px] font-black text-blue-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(Math.min(2.0, zoom + 0.1))} className="text-slate-500 hover:text-[var(--text-primary)]"><ZoomIn size={14} /></button>
          </div>
          <button 
            onClick={() => setShowTutor(!showTutor)}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-surface border border-border text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[var(--text-primary)] hover:bg-subtle transition-all"
          >
            <Sparkles size={14} /> Tutor
          </button>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-1 flex gap-6 p-8 min-h-0">
        
        {/* LEFT: Logic Hub */}
        <div className="w-[480px] flex flex-col gap-6 shrink-0">
          <div className="flex-1 rounded-[2rem] border border-border bg-surface overflow-hidden shadow-2xl flex flex-col">
            <CodePanel code={problem.code.javascript} currentLine={currentStep.line_number} />
          </div>

          <div className="h-[180px] rounded-[2rem] border border-border bg-surface p-8 flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute top-4 left-6 flex items-center gap-3">
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Logic Narrative</span>
            </div>
            <div className="absolute top-4 right-6">
              <span className="text-[9px] font-mono font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20 uppercase">Line {currentStep.line_number}</span>
            </div>
            <div className="mt-4 overflow-y-auto scrollbar-hide">
              <ExplanationPanel 
                explanation={currentStep.explanation} 
                opType={currentStep.operation_type} 
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Realtime State Engine */}
        <div className="flex-1 rounded-[3rem] border border-border bg-surface overflow-hidden flex flex-col relative shadow-2xl">
          <div className="absolute top-10 left-10 z-20">
            <div className="flex items-center gap-3 px-4 py-2 bg-canvas/40 border border-border rounded-xl backdrop-blur-md">
              <Search size={14} className="text-blue-500" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Realtime State Engine</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
             <div 
              style={{ transform: `scale(${zoom})` }} 
              className="transition-transform duration-500 ease-out flex items-center justify-center min-w-full h-full"
            >
              <VisualizationPanel step={currentStep} />
            </div>
          </div>
        </div>
      </main>

      {/* 3. FLOATING SCRUBBER */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[calc(100%-120px)] max-w-[1200px] z-[300]">
        <div className="bg-surface/90 backdrop-blur-3xl border border-border rounded-[3rem] p-5 px-10 shadow-[0_40px_100px_rgba(0,0,0,0.4)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex items-center justify-between gap-10">
          
          <div className="w-[300px] shrink-0">
             <StepProgressBar current={currentStepIndex} total={vizData.total_steps} />
          </div>

          <div className="flex-1 flex justify-center scale-110">
            <ControlPanel 
              isPlaying={isPlaying} 
              onTogglePlay={() => setIsPlaying(!isPlaying)} 
              onNext={() => { setIsPlaying(false); if(currentStepIndex < vizData.total_steps-1) setCurrentStepIndex(currentStepIndex+1); }} 
              onPrev={() => { setIsPlaying(false); if(currentStepIndex > 0) setCurrentStepIndex(currentStepIndex-1); }} 
              onReset={() => { setIsPlaying(false); setCurrentStepIndex(0); }} 
            />
          </div>

          <div className="flex items-center gap-2 bg-canvas/40 p-1.5 rounded-2xl border border-border">
            {[1, 2, 5].map(s => (
              <button 
                key={s} 
                onClick={() => setSpeed(s)} 
                className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all ${speed === s ? 'bg-blue-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-[var(--text-primary)]'}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
