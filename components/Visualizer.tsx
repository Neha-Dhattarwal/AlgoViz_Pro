
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Problem, AlgorithmStep, TreeData } from '../types';
import { apiService } from '../services/api';
import MemoryInspector from './MemoryInspector';
import VisualizationPanel from './VisualizationPanel';
import VariablePanel from './VariablePanel';

interface VisualizerProps {
  problem: Problem;
}

const Visualizer: React.FC<VisualizerProps> = ({ problem }) => {
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const speed = 1000 / speedMultiplier;
  const [loading, setLoading] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchSteps = async () => {
      setLoading(true);
      try {
        const data = await apiService.getVisualizationSteps(problem);
        setSteps(data.steps);
        setCurrentStepIndex(0);
      } catch (err) {
        console.error(err);
        setSteps([]);
      }
      finally { setLoading(false); }
    };
    setIsPlaying(false);
    fetchSteps();
  }, [problem.id]);

  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, steps.length, speed]);

  // Fix: Added missing required properties 'call_stack' and 'complexity_score' to the fallback object
  const currentStep: AlgorithmStep = steps[currentStepIndex] || {
    type: 'ARRAY',
    step_number: 0,
    line_number: 0,
    explanation: "Initializing Engine...",
    variables: {},
    pointers: {},
    call_stack: [],
    complexity_score: 0,
    highlights: [],
    array: [],
    operation_type: 'initialize'
  };

  return (
    <div className="flex flex-col h-full bg-[#040609] relative overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* Main Canvas */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <div className="h-16 border-b border-[#232a35] flex items-center justify-between px-10 bg-black/30 backdrop-blur-md shrink-0 z-20">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <i className="fas fa-microchip text-blue-500 text-xs"></i>
              </div>
              <span className="text-[11px] font-black text-white uppercase tracking-widest">{currentStep.type} ENGINE v3.0</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase">GPU Accelerated</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,_#121721_0%,_#040609_100%)]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-50">
                <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">Optimizing Execution Path</span>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-20">
                <VisualizationPanel step={currentStep} />
                <div className="absolute top-10 right-10">
                  <VariablePanel variables={currentStep.variables} visualFocus={currentStep.visual_focus || ""} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Memory Inspector */}
        <MemoryInspector
          stack={currentStep.stack}
          heap={currentStep.heap}
          highlights={currentStep.highlights.map(String)}
        />
      </div>

      {/* Smart Timeline Scrubber & Explanation */}
      <div className="h-[220px] border-t border-[#232a35] bg-[#0a0d14]/95 backdrop-blur-3xl p-8 z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto h-full flex flex-col gap-8">
          <div className="flex items-center gap-12">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`h-16 px-14 rounded-2xl font-black text-[12px] tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-5 ${isPlaying ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30' : 'bg-blue-600 text-white shadow-[0_20px_40px_rgba(37,99,235,0.3)]'
                }`}
            >
              <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
              {isPlaying ? 'PAUSE' : 'RESUME'}
            </button>

            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Temporal Scrubber</span>
                  <div className="w-px h-3 bg-white/10"></div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">Interactive Timeline</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
                    {[0.5, 1, 2].map(m => (
                      <button
                        key={m}
                        onClick={(e) => { e.stopPropagation(); setSpeedMultiplier(m); }}
                        className={`px-3 py-1 rounded-md text-[10px] font-black tracking-widest transition-all ${speedMultiplier === m ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                      >
                        {m}X
                      </button>
                    ))}
                  </div>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg font-mono text-[11px] text-zinc-400 font-bold">
                    STEP {currentStepIndex + 1} OF {steps.length}
                  </span>
                </div>
              </div>
              <div className="relative h-8 flex items-center group">
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, steps.length - 1)}
                  value={currentStepIndex}
                  onChange={(e) => { setCurrentStepIndex(parseInt(e.target.value)); setIsPlaying(false); }}
                  className="w-full h-2 bg-[#161b22] rounded-full appearance-none cursor-pointer accent-blue-500 z-10 hover:h-3 transition-all"
                />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-blue-600 rounded-full transition-all duration-300 pointer-events-none group-hover:h-3"
                  style={{ width: `${(currentStepIndex / Math.max(1, steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 bg-white/[0.02] rounded-3xl border border-white/5 p-6 flex items-center gap-10 hover:border-blue-500/20 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/20">
                <i className="fas fa-terminal text-blue-500"></i>
              </div>
              <p className="text-[15px] font-bold text-zinc-100 leading-relaxed tracking-tight max-w-5xl">
                {currentStep.explanation}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
