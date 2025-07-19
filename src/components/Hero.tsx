import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Hero = () => {
  const [showPortal, setShowPortal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPortal(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-obsidian via-deep-indigo to-background">
      {showPortal && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-96 h-96 border-4 border-primary/30 rounded-full"
            />
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border-2 border-secondary/50 rounded-full"
            />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-16 border border-primary/70 rounded-full"
            />

            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="absolute inset-24 bg-gradient-radial from-primary/20 to-transparent rounded-full backdrop-blur-xl"
            />

            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(i * 18 * Math.PI / 180) * (100 + Math.random() * 100),
                  y: Math.sin(i * 18 * Math.PI / 180) * (100 + Math.random() * 100),
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full shadow-glow"
              />
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showPortal ? 0 : 1, y: showPortal ? 50 : 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="text-center z-10 px-4"
      >
         <motion.p
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 3.2, duration: 0.6 }}
  className="text-lg md:text-xl lg:text-2xl font-semibold tracking-wide text-center mb-6 text-white animate-glow"
>
  TYPE <span className="font-extrabold text-black">PRIME</span> WITH YOUR KEYBOARD TO ENTER THE PRIME MODE FOR 10 SECONDS
</motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5, duration: 0.8, type: "spring" }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-6"
        >
          <span className="text-gradient-aurora animate-aurora">
            Priyansh
          </span>
          <br />
          <span className="text-gradient-primary">
            Narang
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.6 }}
          className="space-y-4 mb-12"
        >
          <p className="text-xl md:text-2xl text-foreground-muted font-mono">
            <span className="text-primary">{'{'}</span>
            <span className="text-secondary">Full Stack Developer</span>
            <span className="text-primary">{'}'}</span>
          </p>
          
          <p className="text-lg text-foreground-dim max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences that blur the line between art and technology. 
            Where innovation meets imagination.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-primary-foreground transition-all-normal hover:shadow-glow-lg hover:scale-105">
            <span className="relative z-10">Explore My Universe</span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </button>
          
          <button className="group px-8 py-4 glass glass-hover rounded-xl font-medium text-foreground transition-all-normal hover:scale-105">
            Download Resume
            <span className="ml-2 text-primary group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
          </button>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 8,
              delay: 4 + Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 4,
            }}
            className={`absolute w-32 h-32 rounded-full blur-xl ${
              i % 2 === 0 ? 'bg-primary/20' : 'bg-secondary/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-foreground-muted"
        >
          <span className="text-sm font-mono mb-2">Scroll to discover</span>
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};