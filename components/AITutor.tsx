
import React, { useState, useEffect, useRef } from 'react';
import { Problem, ChatMessage } from '../types';
import { geminiService } from '../services/gemini';
import { Sparkles, Send, BrainCircuit } from 'lucide-react';

interface AITutorProps {
  problem: Problem;
}

const AITutor: React.FC<AITutorProps> = ({ problem }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchExplanation = async () => {
      setIsTyping(true);
      const explanation = await geminiService.explainAlgorithm(problem.title, problem.code.javascript);
      setMessages([{ role: 'assistant', content: explanation }]);
      setIsTyping(false);
    };
    fetchExplanation();
  }, [problem.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    const response = await geminiService.chatAboutProblem(problem.title, messages, userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="bg-surface rounded-[2rem] flex flex-col h-full border border-border shadow-2xl overflow-hidden">
      <div className="p-4 px-6 border-b border-border bg-canvas/30 flex items-center justify-between shrink-0">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Sparkles size={14} className="text-blue-500" />
          AI Logic Assistant
        </h3>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[9px] font-black text-emerald-500 uppercase">Pro Kernel v3</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-hide bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.03)_0%,_transparent_50%)]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[92%] rounded-2xl p-4 text-[13px] leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white font-medium' 
                : 'bg-canvas text-slate-300 border border-border'
            }`}>
              <div className="prose prose-invert prose-sm max-w-none">
                {msg.content.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-2 last:mb-0 font-medium">
                    {line.includes('`') ? (
                       <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-400 font-bold">{line.replace(/`/g, '')}</code>
                    ) : line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-canvas rounded-2xl p-4 border border-border">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-canvas/50 border-t border-border shrink-0">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about time complexity or logic..."
            className="w-full bg-canvas border border-border rounded-xl py-3.5 px-5 pr-12 text-[13px] focus:outline-none focus:border-blue-500 transition-all text-slate-200 group-hover:border-slate-700 shadow-inner"
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-white hover:bg-blue-600 transition-all p-2 rounded-lg"
            disabled={isTyping}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AITutor;
