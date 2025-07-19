import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PrimeModeProps {
  isActive: boolean;
  onDeactivate: () => void;
}

export const PrimeMode = ({ isActive, onDeactivate }: PrimeModeProps) => {
  const [showBehindScenes, setShowBehindScenes] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowBehindScenes(true);
      const timer = setTimeout(() => {
        setShowBehindScenes(false);
        onDeactivate();
      }, 10000); 

      return () => clearTimeout(timer);
    }
  }, [isActive, onDeactivate]);

  const behindScenesItems = [
    { title: 'Neural Network Training', value: '99.7%', color: 'primary' },
    { title: 'Code Compilation Speed', value: '3.2ms', color: 'secondary' },
    { title: 'Animation Frame Rate', value: '144fps', color: 'accent-glow' },
    { title: 'WebGL Shader Complexity', value: '847 lines', color: 'primary' },
    { title: 'API Response Time', value: '12ms', color: 'secondary' },
    { title: 'Bundle Size Optimization', value: '94%', color: 'accent-glow' },
  ];

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] pointer-events-none"
        >
          {/* Matrix Rain Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-primary font-mono text-sm opacity-60"
                animate={{
                  y: [-50, window.innerHeight + 50],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 3,
                }}
                style={{
                  left: `${(i * 3) % 100}%`,
                }}
              >
                {['0', '1', '｜', '█', '▓', '▒', '░'][Math.floor(Math.random() * 7)]}
              </motion.div>
            ))}
          </div>

          {/* PRIME Mode Header */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="glass rounded-xl px-6 py-3 border-2 border-primary/50 shadow-glow-xl">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                />
                <span className="font-display text-xl font-black text-gradient-primary">
                  PRIME MODE ACTIVATED
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-3 h-3 bg-primary rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Behind the Scenes Panel */}
          {showBehindScenes && (
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-80"
            >
              <div className="glass rounded-2xl p-6 space-y-4 shadow-glow-lg border border-primary/30">
                <h3 className="text-lg font-bold text-gradient-primary mb-4">
                  🔬 Behind the Scenes
                </h3>
                
                {behindScenesItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-foreground-muted font-mono">
                      {item.title}
                    </span>
                    <motion.span
                      animate={{ 
                        color: [
                          `hsl(var(--${item.color}))`,
                          `hsl(var(--${item.color}-glow))`,
                          `hsl(var(--${item.color}))`
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="font-bold"
                    >
                      {item.value}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Code Stream */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-72"
          >
            <div className="glass rounded-xl p-4 font-mono text-xs space-y-2 shadow-glow border border-secondary/30">
              <div className="text-secondary font-bold mb-2">🚀 Live Code Stream</div>
              {[
                'const portfolio = new QuantumPortfolio()',
                'portfolio.initializeHolographics()',
                'await neural.trainSkillNetwork()',
                'particles.enableQuantumEffects()',
                'timeline.renderConstellation()',
                'portal.establishConnection()',
                'primeMode.activateSecretFeatures()',
              ].map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="text-foreground-muted"
                >
                  <span className="text-primary">{'>'}</span> {line}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Holographic Grid Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="prime-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <motion.path
                  d="M 100 0 L 0 0 0 100"
                  fill="none"
                  stroke="url(#prime-gradient)"
                  strokeWidth="1"
                  animate={{ strokeDashoffset: [0, -200] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  strokeDasharray="10 10"
                />
              </pattern>
              <linearGradient id="prime-gradient">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#prime-grid)" />
          </svg>

          {/* Floating Tech Icons */}
          {['⚛️', '🔥', '⚡', '🌟', '🚀', '💎'].map((icon, index) => (
            <motion.div
              key={index}
              className="absolute text-3xl"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                rotate: [0, 360],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
            >
              {icon}
            </motion.div>
          ))}

          {/* Scan Lines */}
          <motion.div
            animate={{ y: [-100, window.innerHeight + 100] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
          />
          
          <motion.div
            animate={{ y: [window.innerHeight + 100, -100] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.5 }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-30"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};