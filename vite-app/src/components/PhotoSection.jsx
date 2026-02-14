import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './PhotoSection.css';

const PhotoSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.5, 0.7, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  return (
    <section id="photo" className="photo-section" ref={sectionRef}>
      {/* Parallax Background */}
      <motion.div 
        className="photo-background"
        style={{ y: backgroundY }}
      />
      
      {/* Overlay */}
      <motion.div 
        className="photo-overlay"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Decorative Elements */}
      <div className="photo-decorations">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="photo-heart"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.1,
              ease: 'easeOut'
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            <svg viewBox="0 0 24 24" fill="#dc2626">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="photo-content"
        style={{ y: contentY, scale: contentScale }}
      >
        <motion.h2 
          className="photo-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Happy Valentine's Day, My Love
        </motion.h2>
        
        <motion.p 
          className="photo-subtitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          February 14, 2026 - 15 Months of Love
        </motion.p>
        
        {/* Decorative line */}
        <motion.div 
          className="photo-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </section>
  );
};

export default PhotoSection;
