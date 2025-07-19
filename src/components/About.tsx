import { motion } from 'framer-motion';
import { useState } from 'react';

export const About = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-black mb-6">
            <span className="text-gradient-primary">Who Am I</span>
          </h2>
          <p className="text-xl text-foreground-muted font-mono">
            <span className="text-secondary">{'<'}</span>
            Discover the mind behind the magic
            <span className="text-secondary">{' />'}</span>
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <motion.div
            className="relative w-96 h-96 cursor-pointer"
            style={{ perspective: "1000px" }}
            onHoverStart={() => setIsFlipped(true)}
            onHoverEnd={() => setIsFlipped(false)}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 glass rounded-2xl p-8 flex flex-col items-center justify-center shadow-glow-lg backface-hidden">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px hsl(var(--primary) / 0.3)",
                      "0 0 40px hsl(var(--secondary) / 0.5)",
                      "0 0 20px hsl(var(--primary) / 0.3)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 flex items-center justify-center"
                >
                  <span className="text-2xl font-black text-primary-foreground">Hover Me!!</span>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gradient-aurora mb-2">Priyansh Narang</h3>
                <p className="text-primary font-mono">Full Stack Developer</p>
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary/50 rounded-full"
                />
                
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-secondary/50 rounded-full"
                />
              </div>

              <div 
                className="absolute inset-0 glass rounded-2xl p-8 shadow-glow-lg"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <div className="h-full flex flex-col justify-center space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      <span className="text-white">1+ Years Experience</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                      <span className="text-white">5+ Projects Delivered</span>
                    </div>
                
                  </div>
                  
                  <div className="border-t border-glass-border pt-4">
                    <p className="text-sm text-white leading-relaxed">
                      Passionate about creating exceptional digital experiences that push the boundaries 
                      of what's possible on the web. I specialize in turning complex ideas into elegant, 
                      performant, and visually stunning applications.
                    </p>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {['React', 'TypeScript', 'Three.js', 'WebGL'].map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full text-xs font-mono text-primary border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 pointer-events-none opacity-10"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              className="absolute inset-0"
            >
              <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" />
              
              {[0.3, 0.5, 0.7].map((ratio, i) => (
                <ellipse
                  key={`lat-${i}`}
                  cx="200"
                  cy="200"
                  rx="150"
                  ry={150 * ratio}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              ))}
              
              {[0, 30, 60, 90, 120, 150].map((angle) => (
                <ellipse
                  key={`lon-${angle}`}
                  cx="200"
                  cy="200"
                  rx={150 * Math.cos((angle * Math.PI) / 180)}
                  ry="150"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  transform={`rotate(${angle} 200 200)`}
                />
              ))}
              
              <motion.circle
                cx="240"
                cy="180"
                r="4"
                fill="currentColor"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-secondary"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};