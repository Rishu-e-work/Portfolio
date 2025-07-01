import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-colors duration-500"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Circular Loader */}
        <div className="relative mb-8 mx-auto w-16 h-16">
          <motion.div
            className="absolute inset-0 border-4 border-primary/30 rounded-full"
          />
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Name */}
        <motion.h1
          className="text-4xl md:text-5xl font-orbitron font-bold text-primary mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Rishabh Jha
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          className="text-muted-foreground mb-8 text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Loading Portfolio Experience...
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 bg-primary/20 rounded-full h-2 mx-auto mb-4">
          <motion.div
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Progress Percentage */}
        <p className="text-muted-foreground text-sm">{progress}%</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
