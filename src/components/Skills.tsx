import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  color: string;
  x: number;
  y: number;
  connections: number[];
}

const skills: Skill[] = [
  { id: 1, name: 'React', category: 'Frontend', proficiency: 95, color: 'primary', x: 30, y: 20, connections: [2, 3, 4] },
  { id: 2, name: 'TypeScript', category: 'Language', proficiency: 90, color: 'secondary', x: 60, y: 15, connections: [1, 3, 8] },
  { id: 3, name: 'Next.js', category: 'Framework', proficiency: 88, color: 'accent-glow', x: 45, y: 35, connections: [1, 2, 4] },
  { id: 4, name: 'Tailwind CSS', category: 'Styling', proficiency: 92, color: 'primary', x: 20, y: 40, connections: [1, 3, 5] },
  
  { id: 5, name: 'Three.js', category: '3D', proficiency: 85, color: 'secondary', x: 15, y: 60, connections: [4, 6, 7] },
  { id: 6, name: 'WebGL', category: '3D', proficiency: 80, color: 'accent-glow', x: 40, y: 70, connections: [5, 7, 10] },
  { id: 7, name: 'Framer Motion', category: 'Animation', proficiency: 87, color: 'primary', x: 65, y: 50, connections: [5, 6, 11] },
  
  { id: 8, name: 'Node.js', category: 'Backend', proficiency: 82, color: 'secondary', x: 80, y: 30, connections: [2, 9, 12] },
  { id: 9, name: 'GraphQL', category: 'API', proficiency: 78, color: 'accent-glow', x: 70, y: 70, connections: [8, 10, 11] },
  { id: 10, name: 'WebAssembly', category: 'Performance', proficiency: 75, color: 'primary', x: 55, y: 85, connections: [6, 9, 11] },
  
  { id: 11, name: 'AI/ML', category: 'Emerging', proficiency: 73, color: 'secondary', x: 85, y: 60, connections: [7, 9, 10] },
  { id: 12, name: 'WebXR', category: 'Emerging', proficiency: 70, color: 'accent-glow', x: 90, y: 40, connections: [8, 11] }
];

export const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getConnectedSkills = (skillId: number): number[] => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? skill.connections : [];
  };

  const isConnected = (skillId: number): boolean => {
    if (!hoveredSkill) return false;
    if (skillId === hoveredSkill) return true;
    const connections = getConnectedSkills(hoveredSkill);
    return connections.includes(skillId);
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-black mb-6">
            <span className="text-gradient-primary">Neural Network</span>
          </h2>
          <p className="text-xl text-foreground-muted font-mono">
            <span className="text-secondary">{'<'}</span>
            Interactive skill map powered by passion
            <span className="text-secondary">{' />'}</span>
          </p>
        </motion.div>

        <div className="relative w-full h-96 md:h-[600px] glass rounded-3xl overflow-hidden shadow-glow-lg">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full">
              <defs>
                <pattern id="neural-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#neural-grid)" />
            </svg>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {skills.map(skill => 
              skill.connections.map(connectionId => {
                const connectedSkill = skills.find(s => s.id === connectionId);
                if (!connectedSkill) return null;
                
                const isHighlighted = hoveredSkill && (
                  skill.id === hoveredSkill || 
                  connectionId === hoveredSkill ||
                  isConnected(skill.id) || 
                  isConnected(connectionId)
                );

                return (
                  <motion.line
                    key={`${skill.id}-${connectionId}`}
                    x1={`${skill.x}%`}
                    y1={`${skill.y}%`}
                    x2={`${connectedSkill.x}%`}
                    y2={`${connectedSkill.y}%`}
                    stroke="url(#connection-gradient)"
                    strokeWidth={isHighlighted ? "3" : "1"}
                    opacity={isHighlighted ? 1 : 0.3}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: Math.random() * 1 }}
                    viewport={{ once: true }}
                  />
                );
              })
            )}
          </svg>

          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="absolute cursor-pointer"
              style={{
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredSkill(skill.id)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <motion.div
                className={`absolute inset-0 rounded-full bg-${skill.color}/20 blur-lg`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.sin(pulsePhase * Math.PI / 180 + index) * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  width: `${40 + skill.proficiency / 5}px`,
                  height: `${40 + skill.proficiency / 5}px`,
                  marginLeft: `${-(20 + skill.proficiency / 10)}px`,
                  marginTop: `${-(20 + skill.proficiency / 10)}px`,
                }}
              />

              <motion.div
                className={`relative rounded-full flex items-center justify-center font-bold text-xs text-center shadow-glow transition-all-normal ${
                  isConnected(skill.id) ? 'ring-2 ring-primary' : ''
                }`}
                style={{
                  width: `${40 + skill.proficiency / 5}px`,
                  height: `${40 + skill.proficiency / 5}px`,
                  background: hoveredSkill === skill.id 
                    ? `hsl(var(--${skill.color}))` 
                    : `hsl(var(--${skill.color}) / 0.8)`,
                }}
                whileHover={{ scale: 1.2 }}
                animate={{
                  boxShadow: isConnected(skill.id) 
                    ? `0 0 30px hsl(var(--${skill.color}) / 0.8)`
                    : `0 0 10px hsl(var(--${skill.color}) / 0.4)`,
                }}
              >
                <span className="text-primary-foreground font-mono px-1">
                  {skill.name.length > 8 ? skill.name.slice(0, 6) + '..' : skill.name}
                </span>
              </motion.div>

              <svg 
                className="absolute inset-0 pointer-events-none"
                style={{
                  width: `${50 + skill.proficiency / 4}px`,
                  height: `${50 + skill.proficiency / 4}px`,
                  marginLeft: `${-(25 + skill.proficiency / 8)}px`,
                  marginTop: `${-(25 + skill.proficiency / 8)}px`,
                }}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke={`hsl(var(--${skill.color}) / 0.3)`}
                  strokeWidth="2"
                  strokeDasharray={`${(skill.proficiency / 100) * 283} 283`}
                  strokeDashoffset="0"
                  transform="rotate(-90)"
                  style={{ transformOrigin: 'center' }}
                />
              </svg>

              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                  opacity: hoveredSkill === skill.id ? 1 : 0,
                  y: hoveredSkill === skill.id ? 0 : 10,
                  scale: hoveredSkill === skill.id ? 1 : 0.8,
                }}
                className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 glass rounded-lg p-3 min-w-32 z-10 pointer-events-none"
              >
                <div className="text-center space-y-2">
                  <h4 className="text-sm font-bold text-gradient-primary">{skill.name}</h4>
                  <p className="text-xs text-foreground-muted">{skill.category}</p>
                  <div className="text-xs">
                    <span className="text-accent-glow">Proficiency: </span>
                    <span className="font-mono">{skill.proficiency}%</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-16 h-1 bg-surface rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-${skill.color} to-${skill.color}-glow transition-all-slow`}
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {hoveredSkill && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full pointer-events-none"
                  initial={{ 
                    opacity: 0,
                    x: `${skills.find(s => s.id === hoveredSkill)?.x}%`,
                    y: `${skills.find(s => s.id === hoveredSkill)?.y}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: `${(skills.find(s => s.id === hoveredSkill)?.x || 50) + (Math.random() - 0.5) * 30}%`,
                    y: `${(skills.find(s => s.id === hoveredSkill)?.y || 50) + (Math.random() - 0.5) * 30}%`,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {Array.from(new Set(skills.map(s => s.category))).map(category => (
            <div key={category} className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full" />
              <span className="text-sm text-foreground-muted font-mono">{category}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};