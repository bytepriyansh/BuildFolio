import { motion } from 'framer-motion';
import { useState } from 'react';

interface Milestone {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  achievement: string;
}

const milestones: Milestone[] = [
  {
    id: 1,
    year: '2023',
    title: 'Frontend Developer',
    company: 'StartupLab',
    description: 'Began my journey building responsive web applications and discovered my passion for creating beautiful user interfaces.',
    tech: ['React', 'JavaScript', 'CSS3'],
    achievement: 'Built 10+ landing pages with 95% client satisfaction'
  },
  {
    id: 2,
    year: '2023',
    title: 'UI/UX Developer',
    company: 'DesignCorp',
    description: 'Evolved into designing and developing complex design systems, focusing on user experience and accessibility.',
    tech: ['TypeScript', 'Styled Components', 'Figma'],
    achievement: 'Created design system used by 50+ developers'
  },
  {
    id: 3,
    year: '2024',
    title: 'Senior Frontend Engineer',
    company: 'TechFlow',
    description: 'Led frontend architecture decisions and mentored junior developers while building scalable applications.',
    tech: ['Next.js', 'GraphQL', 'Three.js'],
    achievement: 'Reduced app load time by 60% through optimization'
  },
  {
    id: 4,
    year: '2025',
    title: 'Frontend Architect',
    company: 'InnovateLabs',
    description: 'Architected cutting-edge web applications with immersive 3D experiences and advanced animations.',
    tech: ['WebGL', 'GSAP', 'React Three Fiber'],
    achievement: 'Won "Best Web Experience" at TechAwards 2022'
  },
];

export const Journey = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-5xl md:text-6xl font-black mb-6">
            <span className="text-gradient-secondary">My Journey</span>
          </h2>
          <p className="text-xl text-foreground-muted font-mono">
            <span className="text-primary">{'<'}</span>
            Connecting the dots through time
            <span className="text-primary">{' />'}</span>
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative py-20">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {milestones.map((milestone, index) => {
                if (index === milestones.length - 1) return null;
                const x1 = ((index + 1) / (milestones.length + 1)) * 100;
                const x2 = ((index + 2) / (milestones.length + 1)) * 100;
                
                return (
                  <motion.line
                    key={`line-${index}`}
                    x1={`${x1}%`}
                    y1="50%"
                    x2={`${x2}%`}
                    y2="50%"
                    stroke="url(#constellation-gradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  />
                );
              })}
              
              <defs>
                <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
            </svg>

            <div className="relative flex justify-between items-center">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  className="relative cursor-pointer"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setSelectedMilestone(milestone.id)}
                  onHoverEnd={() => setSelectedMilestone(null)}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="relative">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-glow"
                      animate={{
                        boxShadow: selectedMilestone === milestone.id 
                          ? "0 0 40px hsl(var(--primary) / 0.8)"
                          : "0 0 20px hsl(var(--primary) / 0.4)"
                      }}
                    >
                      <span className="text-xl font-black text-primary-foreground">
                        {milestone.year}
                      </span>
                    </motion.div>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-primary/30 rounded-full scale-150"
                    />

                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.8, 0.3] 
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-primary/20 rounded-full scale-125"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ 
                      opacity: selectedMilestone === milestone.id ? 1 : 0,
                      y: selectedMilestone === milestone.id ? 0 : 20,
                      scale: selectedMilestone === milestone.id ? 1 : 0.8,
                    }}
                    className={`absolute top-20 ${index < 2 ? 'left-0' : 'right-0'} w-80 glass rounded-xl p-6 z-10 pointer-events-none`}
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-bold text-gradient-primary">{milestone.title}</h4>
                        <p className="text-secondary font-mono">{milestone.company}</p>
                        <p className="text-sm text-foreground-muted mt-2">{milestone.description}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-foreground-dim mb-2">Technologies:</p>
                        <div className="flex flex-wrap gap-1">
                          {milestone.tech.map((tech) => (
                            <span 
                              key={tech}
                              className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-glass-border pt-3">
                        <p className="text-xs text-accent-glow font-semibold">🏆 {milestone.achievement}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: Math.random() * 4,
                repeat: Infinity,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};