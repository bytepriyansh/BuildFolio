import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <div className="w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full" />
      </motion.div>
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-49 border-2 border-primary/30 rounded-full"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      >
        <div className="w-10 h-10" />
      </motion.div>
    </>
  );
};