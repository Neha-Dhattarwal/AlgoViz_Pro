
import React from 'react';
import { motion } from 'framer-motion';
import { TreeData } from '../types';

interface ExtendedTreeData extends TreeData {
  children?: ExtendedTreeData[];
}

interface TreeVisualizerProps {
  data?: ExtendedTreeData;
  highlights: (string | number)[];
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ data, highlights }) => {
  if (!data) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 opacity-50">
      <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      <span className="text-[10px] font-black uppercase tracking-widest">Compiling Tree State...</span>
    </div>
  );

  const renderNode = (node: ExtendedTreeData, x: number, y: number, level: number) => {
    const isHighlighted = highlights.includes(node.value) || node.highlighted;
    const childrenNodes: { node: ExtendedTreeData; xOffset: number }[] = [];
    
    // spacing logic: reduces as level increases to prevent horizontal sprawl
    const hSpacing = 280 / Math.pow(1.8, level);
    const vSpacing = 140;

    if (node.left) childrenNodes.push({ node: node.left, xOffset: -hSpacing });
    if (node.right) childrenNodes.push({ node: node.right, xOffset: hSpacing });
    
    if (node.children && node.children.length > 0) {
      const count = node.children.length;
      node.children.forEach((child, i) => {
        const xOffset = count === 1 ? 0 : (i / (count - 1) - 0.5) * (hSpacing * 2.5);
        childrenNodes.push({ node: child, xOffset });
      });
    }

    return (
      <g key={`${node.value}-${level}-${x}-${y}`}>
        {childrenNodes.map((child, i) => (
          <React.Fragment key={i}>
            <motion.line 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              x1={x} y1={y} x2={x + child.xOffset} y2={y + vSpacing} 
              stroke={isHighlighted ? "#3b82f6" : "rgba(255,255,255,0.15)"} 
              strokeWidth="4" 
            />
            {renderNode(child.node, x + child.xOffset, y + vSpacing, level + 1)}
          </React.Fragment>
        ))}
        
        <motion.g 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ type: "spring", damping: 15 }}
          className="cursor-default"
        >
          <circle
            cx={x} cy={y} r="32"
            fill={isHighlighted ? '#2563eb' : '#0a0d14'}
            stroke={isHighlighted ? '#fff' : 'rgba(255,255,255,0.1)'}
            strokeWidth="4"
            className="transition-all duration-300"
          />
          <text 
            x={x} y={y} textAnchor="middle" dy=".3em" 
            fill={isHighlighted ? "#fff" : "#64748b"} 
            className="text-[14px] font-black font-mono select-none"
          >
            {node.value}
          </text>
        </motion.g>
      </g>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-12 overflow-visible">
      <svg 
        width="1000" height="800" viewBox="0 0 1000 800" 
        preserveAspectRatio="xMidYMid meet" className="overflow-visible w-full h-full"
      >
        <g transform="translate(0, 150)">
          {renderNode(data, 500, 0, 0)}
        </g>
      </svg>
    </div>
  );
};

export default TreeVisualizer;
