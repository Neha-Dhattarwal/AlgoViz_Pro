
import { Problem, VisualizationData } from '../types';
import { INITIAL_PROBLEMS } from '../constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const apiService = {
  getProblems: async (): Promise<{ data: Problem[], fromBackend: boolean }> => {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`${API_BASE_URL}/problems`, { signal: controller.signal });
      clearTimeout(id);

      if (!response.ok) return { data: INITIAL_PROBLEMS, fromBackend: false };
      const data = await response.json();
      const isBackendData = Array.isArray(data) && data.length > 0;
      return {
        data: isBackendData ? data : INITIAL_PROBLEMS,
        fromBackend: isBackendData
      };
    } catch (err) {
      return { data: INITIAL_PROBLEMS, fromBackend: false };
    }
  },

  getVisualizationSteps: async (problem: Problem): Promise<VisualizationData> => {
    // We prioritize our client-side generator to ensure zero latency and offline capability
    const { generateSteps } = await import('./stepGenerator');

    // In a real production scenario, we could fetch pre-calculated steps from a server
    // but for the best UX, we generate them deterministically based on input data
    const steps = generateSteps(problem.id, problem.category, problem.initialData);

    return {
      problem_title: problem.title,
      optimized_code: problem.code.javascript,
      total_steps: steps.length,
      steps: steps
    };
  }
};
