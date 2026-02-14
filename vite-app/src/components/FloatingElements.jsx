'use client';
import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * FloatingHeart - A single floating heart with animation
 */
export const FloatingHeart = ({ 
  size = 24, 
  left = '10%', 
  top = '20%', 
  delay = 0,
  duration = 6,
  color = '#dc2626'
}) => {
  return (
    <motion.div
      className="floating-heart"
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        filter: `drop-shadow(0 0 8px ${color})`
      }}
      initial={{ opacity: 0, scale: 0, y: 0 }}
      animate={{
        opacity: [0, 0.8, 0.6, 0.8, 0],
        scale: [0, 1.2, 1, 1.2, 1],
        y: [0, -30, -20, -40, -10],
        rotate: [0, 15, -10, 5, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <svg viewBox="0 0 24 24" fill={color} style={{ width: '100%', height: '100%' }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
};

/**
 * FloatingRose - A single floating rose petal with animation
 */
export const FloatingRose = ({ 
  size = 20, 
  left = '15%', 
  top = '30%', 
  delay = 0,
  duration = 8,
  rotation = 0
}) => {
  const roseColors = ['#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'];
  const color = roseColors[Math.floor(Math.random() * roseColors.length)];

  return (
    <motion.div
      className="floating-rose"
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        filter: 'drop-shadow(0 0 6px rgba(220, 38, 38, 0.5))'
      }}
      initial={{ opacity: 0, rotate: rotation }}
      animate={{
        opacity: [0, 0.7, 0.5, 0.7, 0],
        rotate: [rotation, rotation + 20, rotation - 15, rotation + 10, rotation],
        y: [0, -40, -25, -50, -15],
        x: [0, 15, -10, 20, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <svg viewBox="0 0 24 24" fill={color} style={{ width: '100%', height: '100%' }}>
        <ellipse cx="12" cy="14" rx="8" ry="10" />
        <path d="M12 4c-2 0-4 2-4 4 0 4 8 8 8 12 0-4 2-8 2-12 0-2-2-4-6-4z" fill={color} opacity="0.7" />
      </svg>
    </motion.div>
  );
};

/**
 * Sparkle - A small sparkle effect
 */
export const Sparkle = ({ 
  size = 8, 
  left = '50%', 
  top = '50%', 
  delay = 0,
  duration = 2
}) => {
  return (
    <motion.div
      className="sparkle"
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'white',
        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

/**
 * FloatingElements - Container with multiple floating elements
 */
const FloatingElements = ({ 
  count = 15,
  sectionRef,
  includeHearts = true,
  includeRoses = true,
  includeSparkles = true
}) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const elements = useMemo(() => {
    const items = [];
    
    // Generate random floating elements
    for (let i = 0; i < count; i++) {
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const delay = Math.random() * 5;
      const duration = 4 + Math.random() * 4;
      
      // Alternate between hearts, roses, and sparkles
      if (includeHearts && i % 3 === 0) {
        items.push({
          type: 'heart',
          key: `heart-${i}`,
          left,
          top,
          size: 16 + Math.random() * 24,
          delay,
          duration
        });
      } else if (includeRoses && i % 3 === 1) {
        items.push({
          type: 'rose',
          key: `rose-${i}`,
          left,
          top,
          size: 14 + Math.random() * 18,
          delay,
          duration,
          rotation: Math.random() * 360
        });
      } else if (includeSparkles) {
        items.push({
          type: 'sparkle',
          key: `sparkle-${i}`,
          left,
          top,
          size: 4 + Math.random() * 8,
          delay: delay * 0.5,
          duration: 1.5 + Math.random() * 1.5
        });
      }
    }
    
    return items;
  }, [count, includeHearts, includeRoses, includeSparkles]);

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div 
      className="floating-elements-container"
      style={{ y, position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {elements.map((element) => {
        switch (element.type) {
          case 'heart':
            return (
              <FloatingHeart
                key={element.key}
                left={element.left}
                top={element.top}
                size={element.size}
                delay={element.delay}
                duration={element.duration}
              />
            );
          case 'rose':
            return (
              <FloatingRose
                key={element.key}
                left={element.left}
                top={element.top}
                size={element.size}
                delay={element.delay}
                duration={element.duration}
                rotation={element.rotation}
              />
            );
          case 'sparkle':
            return (
              <Sparkle
                key={element.key}
                left={element.left}
                top={element.top}
                size={element.size}
                delay={element.delay}
                duration={element.duration}
              />
            );
          default:
            return null;
        }
      })}
    </motion.div>
  );
};

export default FloatingElements;
