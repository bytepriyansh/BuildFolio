import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 0.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.5,
    delay: Math.random() * 2,
  }));

  const floatingShapes = [
    { type: "circle", size: 120, x: 10, y: 20, color: "rgba(100, 210, 255, 0.15)" },
    { type: "triangle", size: 80, x: 85, y: 30, color: "rgba(255, 150, 100, 0.15)" },
    { type: "square", size: 60, x: 25, y: 70, color: "rgba(150, 255, 100, 0.15)" },
    { type: "circle", size: 90, x: 75, y: 65, color: "rgba(255, 100, 210, 0.15)" },
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: star.opacity }}
            transition={{ delay: star.delay, duration: 2 }}
          />
        ))}

        {floatingShapes.map((shape, index) => {
          const distanceX = (cursorPosition.x - window.innerWidth / 2) / 50;
          const distanceY = (cursorPosition.y - window.innerHeight / 2) / 50;
          
          return (
            <motion.div
              key={index}
              className={`absolute ${shape.type === "triangle" ? 
                "clip-triangle" : shape.type === "square" ? 
                "" : "rounded-full"}`}
              style={{
                left: `${shape.x}%`,
                top: `${shape.y}%`,
                width: `${shape.size}px`,
                height: `${shape.size}px`,
                backgroundColor: shape.color,
                transform: `translate(${distanceX}px, ${distanceY}px)`,
              }}
              animate={{
                y: [0, 15, 0],
                rotate: shape.type !== "circle" ? [0, 5, 0] : 0,
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <motion.div
        className="absolute w-64 h-64 rounded-full bg-blue-500 opacity-10 pointer-events-none"
        animate={{
          x: cursorPosition.x - 128,
          y: cursorPosition.y - 128,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 20 }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto text-yellow-400"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </motion.div>

          <motion.h1 
            className="text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            404
          </motion.h1>

          <h2 className="text-3xl font-semibold mb-4">Lost in the Digital Cosmos</h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto">
            The page at <code className="bg-gray-800 px-2 py-1 rounded">{location.pathname}</code> seems to have drifted into the void. 
            Let me guide you back to safety.
          </p>

          <motion.button
            className={`px-8 py-3 rounded-full font-medium text-lg relative overflow-hidden transition-all duration-300 ${
              isHovered ? "bg-white text-gray-900" : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            }`}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
          >
            <span className="relative z-10">Return to Home</span>
            {isHovered && (
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.button>

          <div className="mt-12 text-gray-400 text-sm">
            <p>Or explore my work:</p>
            <div className="flex justify-center gap-4 mt-2">
              <motion.a 
                href="/projects" 
                className="hover:text-blue-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Projects
              </motion.a>
              <motion.a 
                href="/about" 
                className="hover:text-blue-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                About
              </motion.a>
              <motion.a 
                href="/contact" 
                className="hover:text-blue-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Contact
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 right-8 w-24 h-24"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <circle cx="12" cy="8" r="7"></circle>
          <circle cx="12" cy="8" r="3"></circle>
          <path d="M5.3 17a7 7 0 0 1 13.4 0"></path>
          <path d="M8 21h8"></path>
          <path d="M12 17v4"></path>
        </svg>
      </motion.div>

      <style>{`
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </div>
  );
};

export default NotFound;