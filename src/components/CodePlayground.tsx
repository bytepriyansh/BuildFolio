import { motion } from 'framer-motion';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSnippet {
  id: number;
  title: string;
  language: string;
  code: string;
  description: string;
  tech: string[];
}

const codeSnippets: CodeSnippet[] = [
  {
    id: 1,
    title: 'Quantum Animation Hook',
    language: 'typescript',
    description: 'Custom React hook for physics-based animations with quantum entanglement effects',
    tech: ['React', 'TypeScript', 'Physics'],
    code: `import { useEffect, useRef, useState } from 'react';

interface QuantumParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  entangled?: boolean;
}

export const useQuantumAnimation = (particleCount: number = 50) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<QuantumParticle[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const newParticles: QuantumParticle[] = [];
    
    // Initialize quantum particles
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        entangled: Math.random() > 0.7
      });
    }
    
    setParticles(newParticles);
    
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      newParticles.forEach((particle, index) => {
        // Quantum tunnel effect
        if (particle.entangled) {
          particle.x += particle.vx * Math.sin(Date.now() * 0.01);
          particle.y += particle.vy * Math.cos(Date.now() * 0.01);
        } else {
          particle.x += particle.vx;
          particle.y += particle.vy;
        }
        
        // Boundary quantum wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Render with glow effect
        ctx.shadowBlur = particle.entangled ? 20 : 10;
        ctx.shadowColor = particle.entangled ? '#00ffff' : '#ff00ff';
        ctx.fillStyle = particle.entangled ? '#00ffff' : '#ff00ff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [particleCount]);
  
  return { canvasRef, particles };
};`
  },
  {
    id: 2,
    title: 'Neural Network Visualizer',
    language: 'javascript',
    description: 'Real-time neural network visualization with dynamic learning algorithms',
    tech: ['JavaScript', 'WebGL', 'AI'],
    code: `class NeuralNetworkVisualizer {
  constructor(canvas, layers = [4, 6, 4, 1]) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.layers = layers;
    this.neurons = [];
    this.connections = [];
    this.learningRate = 0.1;
    
    this.initializeNetwork();
    this.startVisualization();
  }
  
  initializeNetwork() {
    let neuronId = 0;
    
    this.layers.forEach((layerSize, layerIndex) => {
      const layerNeurons = [];
      const layerY = (this.canvas.height / (this.layers.length + 1)) * (layerIndex + 1);
      
      for (let i = 0; i < layerSize; i++) {
        const neuron = {
          id: neuronId++,
          x: (this.canvas.width / (layerSize + 1)) * (i + 1),
          y: layerY,
          activation: Math.random(),
          bias: Math.random() - 0.5,
          layer: layerIndex
        };
        
        layerNeurons.push(neuron);
        this.neurons.push(neuron);
      }
      
      // Create connections to next layer
      if (layerIndex < this.layers.length - 1) {
        const nextLayerStart = this.neurons.length;
        layerNeurons.forEach(neuron => {
          for (let j = 0; j < this.layers[layerIndex + 1]; j++) {
            this.connections.push({
              from: neuron.id,
              to: nextLayerStart + j,
              weight: Math.random() - 0.5,
              activity: 0
            });
          }
        });
      }
    });
  }
  
  propagateForward(input) {
    // Set input layer activations
    input.forEach((value, index) => {
      if (this.neurons[index]) {
        this.neurons[index].activation = value;
      }
    });
    
    // Propagate through network
    this.layers.forEach((layerSize, layerIndex) => {
      if (layerIndex === 0) return; // Skip input layer
      
      const layerStart = this.layers.slice(0, layerIndex)
        .reduce((sum, size) => sum + size, 0);
      
      for (let i = 0; i < layerSize; i++) {
        const neuron = this.neurons[layerStart + i];
        let sum = neuron.bias;
        
        // Calculate weighted sum from previous layer
        this.connections
          .filter(conn => conn.to === neuron.id)
          .forEach(conn => {
            const fromNeuron = this.neurons[conn.from];
            sum += fromNeuron.activation * conn.weight;
            conn.activity = Math.abs(fromNeuron.activation * conn.weight);
          });
        
        // Apply activation function (sigmoid)
        neuron.activation = 1 / (1 + Math.exp(-sum));
      }
    });
  }
  
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections
    this.connections.forEach(conn => {
      const fromNeuron = this.neurons[conn.from];
      const toNeuron = this.neurons[conn.to];
      
      this.ctx.strokeStyle = \`hsl(\${conn.activity * 180 + 180}, 70%, 50%)\`;
      this.ctx.lineWidth = Math.abs(conn.weight) * 3;
      this.ctx.globalAlpha = conn.activity;
      
      this.ctx.beginPath();
      this.ctx.moveTo(fromNeuron.x, fromNeuron.y);
      this.ctx.lineTo(toNeuron.x, toNeuron.y);
      this.ctx.stroke();
    });
    
    // Draw neurons
    this.neurons.forEach(neuron => {
      const radius = 15 + neuron.activation * 10;
      
      this.ctx.globalAlpha = 0.8;
      this.ctx.fillStyle = \`hsl(\${neuron.activation * 120}, 70%, 50%)\`;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = \`hsl(\${neuron.activation * 120}, 70%, 50%)\`;
      
      this.ctx.beginPath();
      this.ctx.arc(neuron.x, neuron.y, radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Reset shadow
      this.ctx.shadowBlur = 0;
    });
    
    this.ctx.globalAlpha = 1;
  }
  
  startVisualization() {
    const animate = () => {
      // Generate random input
      const input = Array(this.layers[0]).fill().map(() => Math.random());
      this.propagateForward(input);
      this.render();
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
}`
  },
  {
    id: 3,
    title: 'Holographic UI Component',
    language: 'tsx',
    description: 'React component with holographic effects and gesture controls',
    tech: ['React', 'TypeScript', 'CSS3'],
    code: `import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface HolographicCardProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  intensity = 1,
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [0, bounds.height], [30, -30]);
  const rotateY = useTransform(mouseX, [0, bounds.width], [-30, 30]);
  
  const glowX = useTransform(mouseX, [0, bounds.width], [0, 100]);
  const glowY = useTransform(mouseY, [0, bounds.height], [0, 100]);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const updateBounds = () => {
      const rect = card.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };
    
    updateBounds();
    window.addEventListener('resize', updateBounds);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    const handleMouseLeave = () => {
      mouseX.set(bounds.width / 2);
      mouseY.set(bounds.height / 2);
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', updateBounds);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [bounds.width, bounds.height, mouseX, mouseY]);
  
  return (
    <motion.div
      ref={cardRef}
      className={\`relative overflow-hidden \${className}\`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Holographic Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: \`radial-gradient(circle at \${glowX}% \${glowY}%, 
            rgba(0, 255, 255, 0.3) 0%, 
            rgba(255, 0, 255, 0.2) 50%, 
            transparent 70%)\`,
        }}
      />
      
      {/* Prismatic Edge Effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-[2px]">
        <div className="h-full w-full rounded-lg bg-black/80 backdrop-blur-xl">
          {/* Scanning Lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              backgroundImage: \`repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 255, 0.1) 2px,
                rgba(0, 255, 255, 0.1) 4px
              )\`,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 p-6 h-full">
            {children}
          </div>
          
          {/* Corner Lights */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
            <motion.div
              key={corner}
              className={\`absolute w-4 h-4 \${corner.includes('top') ? 'top-2' : 'bottom-2'} \${corner.includes('left') ? 'left-2' : 'right-2'}\`}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: corner === 'top-left' ? 0 : corner === 'top-right' ? 0.5 : corner === 'bottom-left' ? 1 : 1.5
              }}
            >
              <div className="w-full h-full bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Usage Example:
export const HolographicShowcase = () => {
  return (
    <HolographicCard className="w-96 h-64">
      <div className="text-center text-white">
        <h3 className="text-2xl font-bold mb-4 text-cyan-400">
          Holographic Interface
        </h3>
        <p className="text-gray-300">
          Move your mouse to see the holographic effect in action.
          This component uses advanced CSS transforms and motion 
          values to create a realistic 3D hologram appearance.
        </p>
      </div>
    </HolographicCard>
  );
};`
  }
];

export const CodePlayground = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet>(codeSnippets[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-black mb-6">
            <span className="text-gradient-aurora animate-aurora">Code Playground</span>
          </h2>
          <p className="text-xl text-foreground-muted font-mono">
            <span className="text-primary">{'<'}</span>
            Interactive showcase of cutting-edge algorithms
            <span className="text-primary">{' />'}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-gradient-primary mb-4">Select Algorithm</h3>
            {codeSnippets.map((snippet, index) => (
              <motion.button
                key={snippet.id}
                onClick={() => setSelectedSnippet(snippet)}
                className={`w-full text-left p-4 rounded-xl transition-all-normal ${
                  selectedSnippet.id === snippet.id
                    ? 'glass border-2 border-primary/50 shadow-glow'
                    : 'glass glass-hover border border-glass-border'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">{snippet.title}</h4>
                  <p className="text-sm text-foreground-muted line-clamp-2">
                    {snippet.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {snippet.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl overflow-hidden shadow-glow-lg border border-primary/20">
              <div className="flex items-center justify-between p-4 border-b border-glass-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="font-mono text-sm text-foreground-muted ml-4">
                    {selectedSnippet.title.toLowerCase().replace(/\s+/g, '-')}.{selectedSnippet.language}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 glass glass-hover rounded-lg transition-all-normal"
                  >
                    <span className="text-sm font-mono">
                      {isExpanded ? '◧' : '⛶'}
                    </span>
                  </button>
                </div>
              </div>

              <div className={`relative ${isExpanded ? 'h-96' : 'h-80'} overflow-auto`}>
                <SyntaxHighlighter
                  language={selectedSnippet.language}
                  style={tomorrow}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.875rem',
                    height: '100%',
                  }}
                  showLineNumbers
                  wrapLines
                >
                  {selectedSnippet.code}
                </SyntaxHighlighter>
                
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    animate={{
                      background: [
                        'linear-gradient(45deg, transparent 0%, rgba(0,255,255,0.05) 50%, transparent 100%)',
                        'linear-gradient(45deg, transparent 50%, rgba(255,0,255,0.05) 100%, transparent 0%)',
                        'linear-gradient(45deg, transparent 0%, rgba(0,255,255,0.05) 50%, transparent 100%)',
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-glass-border bg-surface/50">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex gap-4">
                    <span className="text-foreground-muted font-mono">
                      Lines: <span className="text-primary">{selectedSnippet.code.split('\n').length}</span>
                    </span>
                    <span className="text-foreground-muted font-mono">
                      Language: <span className="text-secondary">{selectedSnippet.language}</span>
                    </span>
                  </div>
                  
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 text-accent-glow"
                  >
                    <div className="w-2 h-2 bg-accent-glow rounded-full" />
                    <span className="font-mono text-xs">Live Demo Ready</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};