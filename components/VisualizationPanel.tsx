
import React from 'react';
import { AlgorithmStep } from '../types';
import ArrayVisualization from './ArrayVisualization';
import LinkedListVisualizer from './LinkedListVisualizer';
import TreeVisualizer from './TreeVisualizer';
import MatrixVisualizer from './MatrixVisualizer';
import { motion, AnimatePresence } from 'framer-motion';

interface VisualizationPanelProps {
  step: AlgorithmStep;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ step }) => {
  const renderVisualizer = () => {
    switch (step.type) {
      case 'LINKED_LIST':
        return <LinkedListVisualizer step={step} />;
      case 'TREE':
        return <TreeVisualizer data={step.tree} highlights={step.highlights} />;
      case 'MATRIX':
        return <MatrixVisualizer step={step} />;
      case 'ARRAY':
      case 'STACK':
      case 'QUEUE':
      default:
        return <ArrayVisualization step={step} />;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.type + (step.step_number)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full flex items-center justify-center"
        >
          {renderVisualizer()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VisualizationPanel;
