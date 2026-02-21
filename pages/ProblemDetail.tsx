import React, { useState, useEffect, useRef } from 'react';
import { Problem, VisualizationData, AlgorithmStep } from '../types';
import { apiService } from '../services/api';
import CodeViewer from '../components/CodeViewer';
import VisualizationPanel from '../components/VisualizationPanel';
import ControlPanel from '../components/ControlPanel';
import StepProgressBar from '../components/StepProgressBar';
import ExplanationPanel from '../components/ExplanationPanel';
import VariablePanel from '../components/VariablePanel';
import { ArrowLeft, Maximize2 } from 'lucide-react';

interface ProblemDetailProps {
  problem: Problem;
  onBack: () => void;
}

const ProblemDetail: React.FC<ProblemDetailProps> = ({ problem, onBack }) => {
  const [vizData, setVizData] = useState<VisualizationData | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const load = async () => {
      setVizData(null);
      const data = await apiService.getVisualizationSteps(problem);
      setVizData(data);
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
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading Visualization...</span>
    </div>
  );

  const currentStep = vizData.steps[currentStepIndex] || vizData.steps[0];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-40">
      {/* Header Area */}
      <div className="flex items-center justify-between sticky top-0 bg-[#040609]/80 backdrop-blur-md z-[60] py-2">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors shadow-xl"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-white">{problem.title}</h1>
            <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
               <span>Complexity: {problem.complexity.time}</span>
               <span className="text-blue-500">Pattern: {problem.category}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${
            problem.difficulty === 'Easy' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' :
            problem.difficulty === 'Medium' ? 'border-amber-500/30 text-amber-400 bg-amber-400/5' :
            'border-rose-500/30 text-rose-400 bg-rose-500/5'
          }`}>
            {problem.difficulty}
          </span>
          <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 min-h-[850px]">
        {/* Left Column: Docs & Code */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#0a0d14] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col h-[750px] shadow-2xl">
            <div className="p-8 space-y-4 border-b border-white/5 bg-white/5 shrink-0">
              <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em]">Description</h3>
              <p className="text-sm text-slate-400 leading-relaxed scrollbar-hide overflow-y-auto max-h-[120px]">
                {problem.description}
              </p>
            </div>
            
            <div className="flex-1 p-8 overflow-hidden flex flex-col gap-4">
              <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em]">Optimized Logic</h3>
              <CodeViewer 
                code={vizData.optimized_code} 
                activeLineIndex={currentStep.line_number - 1} 
              />
            </div>
          </div>
        </div>

        {/* Right Column: Engine View */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="flex-1 bg-[#0a0d14] rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col relative shadow-2xl min-h-[750px]">
            {/* Visualizer Canvas */}
            <div className="flex-1 relative overflow-hidden">
               <VisualizationPanel step={currentStep} />
               
               <div className="absolute top-8 right-8 z-20">
                 <VariablePanel variables={currentStep.variables} visualFocus={currentStep.visual_focus} />
               </div>
            </div>

            {/* Insight Block */}
            <div className="p-10 pt-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent shrink-0">
              <ExplanationPanel 
                explanation={currentStep.explanation} 
                why={currentStep.why}
                warning={currentStep.warning}
                opType={currentStep.operation_type} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Control Deck (Floating) */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-64px)] max-w-[1400px] bg-[#0a0d14]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 px-12 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-[100] border-t-white/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="shrink-0">
            <StepProgressBar current={currentStepIndex} total={vizData.steps.length} />
          </div>
          
          <div className="flex-1 flex justify-center">
            <ControlPanel 
              isPlaying={isPlaying} 
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              onNext={() => { setIsPlaying(false); if(currentStepIndex < vizData.steps.length-1) setCurrentStepIndex(currentStepIndex+1); }}
              onPrev={() => { setIsPlaying(false); if(currentStepIndex > 0) setCurrentStepIndex(currentStepIndex-1); }}
              onReset={() => { setIsPlaying(false); setCurrentStepIndex(0); }}
            />
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Playback Speed</span>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              {[0.5, 1, 2].map(s => (
                <button 
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-5 py-2 rounded-lg text-[10px] font-black transition-all ${speed === s ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105' : 'text-slate-500 hover:text-white'}`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProblemDetail;