
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type ProblemCategory = 
  | 'Array' | 'String' | 'Linked List' | 'Binary Tree' | 'Graph' 
  | 'Dynamic Programming' | 'Searching' | 'Sorting' | 'Matrix' 
  | 'Stack' | 'Queue';

export interface CodeSnippets {
  python: string;
  java: string;
  javascript: string;
}

export type OperationType = 
  | 'initialize' | 'compare' | 'swap' | 'increment' 
  | 'assignment' | 'pointer_move' | 'match' | 'not_found' | 'push' | 'pop' | 'error_warning';

export interface PointerState {
  [name: string]: string | number | null;
}

export interface HeapObject {
  address: string;
  type: string;
  value: any;
  next?: string | null;
  left?: string | null;
  right?: string | null;
  properties?: Record<string, any>;
}

export interface TreeData {
  value: any;
  left?: TreeData;
  right?: TreeData;
  highlighted?: boolean;
}

export interface AlgorithmStep {
  step_number: number;
  line_number: number;
  prev_line_number?: number;
  explanation: string;
  why?: string;
  warning?: string;
  variables: Record<string, any>;
  pointers: PointerState;
  call_stack: string[];
  complexity_score: number;
  array?: any[]; 
  linkedList?: any[];
  grid?: any[][];
  tree?: TreeData;
  stack?: Record<string, any>; 
  heap?: Record<string, HeapObject>; 
  auxiliaryData?: any[] | Record<string, any>;
  operation_type: OperationType;
  highlights: (number | string)[]; 
  callout?: string;
  comparison?: {
    a: any;
    b: any;
    operator: string;
    result: boolean;
  };
  visual_focus?: string;
  type: 'ARRAY' | 'LINKED_LIST' | 'TREE' | 'MATRIX' | 'STACK' | 'QUEUE' | 'GRAPH';
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  category: ProblemCategory;
  code: CodeSnippets;
  complexity: {
    time: string;
    space: string;
  };
  initialData: any; 
  example?: {
    input: string;
    output: string;
  };
  visualType: 'ARRAY' | 'LINKED_LIST' | 'TREE' | 'MATRIX' | 'STACK' | 'QUEUE';
}

export interface VisualizationResponse {
  total_steps: number;
  steps: AlgorithmStep[];
}

export interface VisualizationData extends VisualizationResponse {
  problem_title: string;
  optimized_code: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
