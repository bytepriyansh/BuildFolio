import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    'Initializing Neural Networks...',
    'Loading 3D Assets...',
    'Calibrating Holographic Projectors...',
    'Syncing Quantum Animations...',
    'Establishing Portal Connection...',
    'Portfolio Ready!'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-obsidian via-deep-indigo to-background"
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center space-y-8 px-4">
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto flex items-center justify-center shadow-glow-xl">
              <span className="text-3xl font-black text-primary-foreground">P</span>
            </div>
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-primary/30 rounded-full scale-150"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-secondary/30 rounded-full scale-125"
            />
          </motion.div>

          <div className="space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-black text-gradient-aurora">
              Priyansh Narang
            </h1>
          
          </div>

          <div className="w-80 max-w-full mx-auto space-y-4">
            <div className="relative h-2 bg-surface rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-glow"
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    animate={{
                      x: [`${progress - 10}%`, `${progress + 10}%`],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    style={{ top: '25%' }}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-foreground-muted font-mono"
              >
                {steps[currentStep]}
              </motion.span>
              <span className="text-sm font-mono text-primary">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <motion.div
            animate={{ y: [-200, 200] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
          />
        </div>

        {[
          { corner: 'top-left', rotate: 0 },
          { corner: 'top-right', rotate: 90 },
          { corner: 'bottom-left', rotate: 270 },
          { corner: 'bottom-right', rotate: 180 }
        ].map(({ corner, rotate }) => (
          <motion.div
            key={corner}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`absolute ${corner.includes('top') ? 'top-8' : 'bottom-8'} ${corner.includes('left') ? 'left-8' : 'right-8'} w-16 h-16`}
            style={{ transform: `rotate(${rotate}deg)` }}
          >
            <svg viewBox="0 0 64 64" className="w-full h-full text-primary/30">
              <path
                d="M0 0 L20 0 L20 4 L4 4 L4 20 L0 20 Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};