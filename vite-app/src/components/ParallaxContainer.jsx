'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxLayer - A single parallax layer that moves at a different speed
 * @param {number} speed - The speed multiplier (negative = moves opposite to scroll)
 * @param {React.ReactNode} children - The content to render
 * @param {string} className - Additional CSS classes
 * @param {number} zIndex - Z-index for layering
 */
export const ParallaxLayer = ({ children, speed = 1, className = '', zIndex = 0 }) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <motion.div
      ref={ref}
      className={`parallax-layer ${className}`}
      style={{ y, zIndex }}
    >
      {children}
    </motion.div>
  );
};

/**
 * ParallaxItem - An individual item that animates on scroll
 * @param {number} delay - Delay before animation starts
 * @param {string} direction - 'up' | 'down' | 'left' | 'right'
 * @param {number} distance - Distance to move in pixels or percentage
 */
export const ParallaxItem = ({ 
  children, 
  delay = 0, 
  direction = 'up', 
  distance = 50,
  duration = 0.8,
  className = ''
}) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const transform = useTransform(scrollYProgress, [0, 1], [getInitialPosition(), { x: 0, y: 0 }]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, ...transform }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScrollReveal - Component that reveals its children when scrolled into view
 */
export const ScrollReveal = ({ 
  children, 
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.2
}) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  const opacity = useTransform(scrollYProgress, [0, threshold, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, threshold, 1], [30, 0, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

/**
 * ParallaxContainer - Main container for parallax sections
 */
const ParallaxContainer = ({ 
  children, 
  className = '',
  backgroundColor = 'transparent',
  minHeight = '100vh'
}) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section 
      ref={containerRef} 
      className={`parallax-container ${className}`}
      style={{ 
        backgroundColor,
        minHeight,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <motion.div
        className="parallax-background"
        style={{ y: backgroundY }}
      />
      {children}
    </section>
  );
};

export default ParallaxContainer;
