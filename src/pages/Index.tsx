import { useState, useEffect } from 'react';
import { CustomCursor } from '../components/CustomCursor';
import { LoadingScreen } from '../components/LoadingScreen';
import { PrimeMode } from '../components/PrimeMode';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Journey } from '../components/Journey';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { CodePlayground } from '../components/CodePlayground';
import { Contact } from '../components/Contact';
import { AmbientControls } from '../components/AmbientControls';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [primeMode, setPrimeMode] = useState(false);

  // Easter egg: Listen for "PRIME" typing
  useEffect(() => {
    let sequence = '';
    const handleKeyPress = (e: KeyboardEvent) => {
      sequence += e.key.toUpperCase();
      if (sequence.includes('PRIME')) {
        setPrimeMode(true);
        sequence = '';
      }
      if (sequence.length > 10) sequence = sequence.slice(-5);
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }
  return (
    <div className="relative min-h-screen bg-background">
      <CustomCursor />
      <Navigation />
      
      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="journey">
          <Journey />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="code">
          <CodePlayground />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <PrimeMode isActive={primeMode} onDeactivate={() => setPrimeMode(false)} />
      <AmbientControls />
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-primary rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default Index;
