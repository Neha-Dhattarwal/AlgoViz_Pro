
import React, { useState, useEffect } from 'react';
import { Problem, Difficulty } from './types';
import { apiService } from './services/api';
import { INITIAL_PROBLEMS } from './constants';
import Navbar from './components/Navbar';
import ProblemCard from './components/ProblemCard';
import ProblemPage from './pages/ProblemPage';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';

const App: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isBackendLive, setIsBackendLive] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, fromBackend } = await apiService.getProblems();
      if (data && data.length > 0) {
        setProblems(data);
        setIsBackendLive(fromBackend);
      }
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const filteredProblems = problems.filter(p =>
    difficultyFilter === 'All' || p.difficulty === difficultyFilter
  );

  const selectedProblem = problems.find(p => p.id === selectedProblemId);

  useEffect(() => {
    // We scroll to top when changing views, but we DO NOT lock body overflow
    window.scrollTo(0, 0);
  }, [selectedProblemId]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans selection:bg-blue-500/30">
      <Navbar onHome={() => setSelectedProblemId(null)} onToggleTheme={toggleTheme} theme={theme} />

      <main className={`max-w-[1800px] mx-auto ${selectedProblemId ? 'px-0' : 'px-8 py-8'}`}>
        <AnimatePresence mode="wait">
          {!selectedProblemId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12 pb-20"
            >
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isBackendLive ? 'bg-emerald-400' : 'bg-blue-400'} opacity-75`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isBackendLive ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                    </span>
                    {isBackendLive ? 'Backend Live Link Active' : 'Visual Execution Engine Active'}
                  </div>
                  <h1 className="text-5xl font-black tracking-tighter text-[var(--text-primary)]">
                    Algo<span className="text-blue-500">Viz</span> Studio
                  </h1>
                  <p className="text-lg text-[var(--text-secondary)] font-medium max-w-2xl leading-relaxed">
                    Real-time visualization of data structures and algorithms. Execute code line-by-line and observe state mutations.
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-[var(--bg-surface)] p-2 rounded-2xl border border-[var(--border-default)] shadow-xl">
                  <div className="flex items-center gap-2 px-3 text-[var(--text-secondary)]">
                    <Filter size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
                  </div>
                  {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${difficultyFilter === diff
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                        }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map(problem => (
                    <ProblemCard
                      key={problem.id}
                      problem={problem}
                      onClick={() => setSelectedProblemId(problem.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center space-y-4">
                    <div className="text-slate-500 text-4xl"><i className="fas fa-search"></i></div>
                    <p className="text-[var(--text-secondary)] font-bold uppercase tracking-widest">No problems found for this filter.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            selectedProblem && (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <ProblemPage
                  problem={selectedProblem}
                  onBack={() => setSelectedProblemId(null)}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
