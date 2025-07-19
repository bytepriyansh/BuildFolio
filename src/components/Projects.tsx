import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  image: string;
  liveDemo: string;
  github: string;
  featured: boolean;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'NeuralFlow Dashboard',
    description: 'AI-powered analytics dashboard with real-time 3D data visualization and machine learning insights.',
    tech: ['React', 'Three.js', 'TypeScript', 'Python', 'TensorFlow'],
    category: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    liveDemo: '#',
    github: '#',
    featured: true,
    year: '2023'
  },
  {
    id: 2,
    title: 'Metaverse Gallery',
    description: 'Immersive 3D art gallery experience with WebXR support and blockchain integration.',
    tech: ['WebGL', 'React Three Fiber', 'WebXR', 'Ethereum', 'IPFS'],
    category: 'Web3',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600',
    liveDemo: '#',
    github: '#',
    featured: true,
    year: '2023'
  },
  {
    id: 3,
    title: 'Quantum Portfolio',
    description: 'Award-winning personal portfolio with physics-based animations and particle systems.',
    tech: ['Next.js', 'Framer Motion', 'GSAP', 'WebGL', 'Shader'],
    category: 'Portfolio',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
    liveDemo: '#',
    github: '#',
    featured: false,
    year: '2022'
  },
  {
    id: 4,
    title: 'EcoTrack Mobile',
    description: 'Sustainability tracking app with gamification and social features for environmental awareness.',
    tech: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Maps API'],
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600',
    liveDemo: '#',
    github: '#',
    featured: false,
    year: '2022'
  },
  {
    id: 5,
    title: 'SpaceX Mission Control',
    description: 'Real-time mission tracking interface with live telemetry data and 3D spacecraft visualization.',
    tech: ['Vue.js', 'D3.js', 'WebSocket', 'Three.js', 'REST API'],
    category: 'Data Viz',
    image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600',
    liveDemo: '#',
    github: '#',
    featured: true,
    year: '2021'
  },
  {
    id: 6,
    title: 'Crypto Pulse',
    description: 'Cryptocurrency trading platform with advanced charting and algorithmic trading capabilities.',
    tech: ['Angular', 'Chart.js', 'WebSocket', 'Python', 'Redis'],
    category: 'FinTech',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600',
    liveDemo: '#',
    github: '#',
    featured: false,
    year: '2021'
  }
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'AI/ML', 'Web3', 'Portfolio', 'Mobile', 'Data Viz', 'FinTech'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const hexagonVariants = {
    initial: { scale: 0, opacity: 0, rotateY: -180 },
    animate: { scale: 1, opacity: 1, rotateY: 0 },
    hover: { 
      scale: 1.05, 
      rotateY: 15,
      z: 50
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-black mb-6">
            <span className="text-gradient-aurora animate-aurora">Project Lab</span>
          </h2>
          <p className="text-xl text-foreground-muted font-mono">
            <span className="text-primary">{'<'}</span>
            Interactive showcase of digital masterpieces
            <span className="text-primary">{' />'}</span>
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all-normal ${
                filter === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow'
                  : 'glass glass-hover text-foreground-muted'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </motion.div>

        {/* Hexagonal Project Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="relative group cursor-pointer"
                variants={hexagonVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Hexagonal Pod */}
                <div className="relative w-full aspect-square">
                  {/* Main Pod */}
                  <div className="absolute inset-4 glass glass-hover rounded-3xl overflow-hidden shadow-glow-lg">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary to-primary px-3 py-1 rounded-full text-xs font-bold text-primary-foreground">
                          Featured
                        </div>
                      )}
                      
                      {/* Year Badge */}
                      <div className="absolute top-4 left-4 bg-glass-bg backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-foreground-muted border border-glass-border">
                        {project.year}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gradient-primary mb-2">{project.title}</h3>
                        <p className="text-sm text-foreground-muted line-clamp-3">{project.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-md font-mono">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Floating Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-primary/20 rounded-full scale-110 pointer-events-none"
                  />
                  
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-secondary/20 rounded-full scale-125 pointer-events-none"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-obsidian/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full glass rounded-2xl overflow-hidden shadow-glow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent" />
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-glass-bg backdrop-blur-md rounded-full flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gradient-primary mb-2">{selectedProject.title}</h3>
                  <p className="text-foreground-muted">{selectedProject.description}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 rounded-lg font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={selectedProject.liveDemo}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 px-6 rounded-xl font-semibold text-center transition-all-normal hover:shadow-glow-lg hover:scale-105"
                  >
                    Live Demo
                  </a>
                  <a
                    href={selectedProject.github}
                    className="flex-1 glass glass-hover text-foreground py-3 px-6 rounded-xl font-medium text-center transition-all-normal hover:scale-105"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};