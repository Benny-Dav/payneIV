import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <motion.div
        className="w-2 h-2 rounded-full bg-white"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0
        }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-white"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2
        }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-white"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.4
        }}
      />
    </div>
  );
};

export default LoadingSpinner; 