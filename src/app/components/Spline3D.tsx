import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Spline3DProps {
  type?: "globe" | "satellite" | "network" | "heatmap";
  className?: string;
  interactive?: boolean;
}

export function Spline3D({ type = "globe", className = "", interactive = true }: Spline3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const render3DContent = () => {
    switch (type) {
      case "globe":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* 3D Globe Mock */}
            <motion.div
              className="relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 shadow-2xl"
              animate={{
                rotateY: interactive ? mousePosition.x * 20 - 10 : 0,
                rotateX: interactive ? -(mousePosition.y * 20 - 10) : 0,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{
                background: `radial-gradient(circle at ${30 + mousePosition.x * 40}% ${30 + mousePosition.y * 40}%, 
                  rgba(59, 130, 246, 0.8), 
                  rgba(30, 64, 175, 0.9), 
                  rgba(15, 23, 42, 1))`,
                boxShadow: "0 0 60px rgba(59, 130, 246, 0.4), inset 0 0 60px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Grid Lines */}
              <div className="absolute inset-0 rounded-full">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`lat-${i}`}
                    className="absolute border-blue-400/20 border-t rounded-full"
                    style={{
                      top: `${i * 12.5}%`,
                      left: "10%",
                      right: "10%",
                      height: "1px",
                    }}
                  />
                ))}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`lng-${i}`}
                    className="absolute border-blue-400/20 border-l rounded-full"
                    style={{
                      left: `${10 + i * 13.33}%`,
                      top: "0%",
                      bottom: "0%",
                      width: "1px",
                    }}
                  />
                ))}
              </div>

              {/* Risk Points */}
              <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full sentinelx-pulse shadow-lg"></div>
              <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-yellow-500 rounded-full sentinelx-pulse shadow-lg"></div>
              <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-orange-500 rounded-full sentinelx-pulse shadow-lg"></div>

              {/* Atmosphere */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 60%, rgba(59, 130, 246, 0.2) 80%, rgba(59, 130, 246, 0.4) 100%)",
                  transform: "scale(1.1)",
                }}
              />
            </motion.div>
          </div>
        );

      case "satellite":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
                rotateZ: interactive ? mousePosition.x * 10 : 0,
              }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotateZ: { type: "spring", stiffness: 100, damping: 20 }
              }}
            >
              {/* Satellite Body */}
              <div className="w-16 h-24 bg-gradient-to-b from-gray-300 to-gray-600 rounded-lg shadow-2xl relative">
                {/* Solar Panels */}
                <div className="absolute -left-8 top-4 w-6 h-16 bg-gradient-to-b from-blue-600 to-blue-800 rounded opacity-80"></div>
                <div className="absolute -right-8 top-4 w-6 h-16 bg-gradient-to-b from-blue-600 to-blue-800 rounded opacity-80"></div>
                
                {/* Antenna */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-1 h-8 bg-gray-400"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-4 h-4 bg-sentinelx-alert-yellow rounded-full sentinelx-pulse"></div>
              </div>

              {/* Signal Waves */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-sentinelx-alert-yellow rounded-full"
                  style={{
                    width: `${100 + i * 40}px`,
                    height: `${100 + i * 40}px`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>
          </div>
        );

      case "network":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <svg width="300" height="200" className="overflow-visible">
              {/* Network Nodes */}
              {[
                { x: 50, y: 50, size: 8, color: "red" },
                { x: 150, y: 30, size: 6, color: "yellow" },
                { x: 250, y: 70, size: 5, color: "green" },
                { x: 80, y: 120, size: 7, color: "orange" },
                { x: 200, y: 140, size: 6, color: "blue" },
                { x: 120, y: 170, size: 5, color: "purple" },
              ].map((node, i) => (
                <g key={i}>
                  {/* Connection Lines */}
                  {i > 0 && (
                    <motion.line
                      x1={node.x}
                      y1={node.y}
                      x2={i > 1 ? 150 : 50}
                      y2={i > 1 ? 30 : 50}
                      stroke="rgba(255, 215, 0, 0.4)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: i * 0.3 }}
                    />
                  )}
                  
                  {/* Node */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill={`var(--color-${node.color}-500)`}
                    className="sentinelx-pulse"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                  />
                  
                  {/* Pulse Effect */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill="none"
                    stroke={`var(--color-${node.color}-400)`}
                    strokeWidth="2"
                    animate={{
                      r: [node.size, node.size * 3],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                </g>
              ))}
            </svg>
          </div>
        );

      case "heatmap":
        return (
          <div className="relative w-full h-full">
            <div className="grid grid-cols-8 gap-1 h-full p-4">
              {[...Array(64)].map((_, i) => {
                const intensity = Math.sin(i * 0.1 + Date.now() * 0.001) * 0.5 + 0.5;
                const hue = intensity * 120; // Red to green
                return (
                  <motion.div
                    key={i}
                    className="rounded-sm"
                    style={{
                      backgroundColor: `hsl(${hue}, 70%, ${50 + intensity * 30}%)`,
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                  />
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-sentinelx-alert-yellow border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full"
      >
        {render3DContent()}
      </motion.div>
    </div>
  );
}
