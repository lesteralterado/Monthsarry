import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

// Array of heart images for better maintainability and readability
const hearts = [
  'https://cdn-icons-png.flaticon.com/512/833/833472.png',
  'https://res.cloudinary.com/dhxi75eld/image/upload/v1765423719/cdb125c2-6b03-460e-a933-1249f13ccdce_kk94fv.jpg',
  'https://cdn-icons-png.flaticon.com/512/833/833473.png',
  'https://cdn-icons-png.flaticon.com/512/833/833472.png'
];

const Hero = () => {
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heart1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-150%']);
  const heart2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);
  const heart3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-120%']);
  const heart4Y = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Parallax Background */}
      <motion.div 
        className="hero-background"
        style={{ y: backgroundY }}
      />

      {/* Floating Hearts with Parallax */}
      <div className="hearts-container">
        <motion.div 
          className="heart heart-1"
          style={{ y: heart1Y }}
        >
          <img src={hearts[0]} alt="heart" />
        </motion.div>
        
        <motion.div 
          className="heart heart-2"
          style={{ y: heart2Y }}
        >
          <img src={hearts[1]} alt="heart" />
        </motion.div>
        
        <motion.div 
          className="heart heart-3"
          style={{ y: heart3Y }}
        >
          <img src={hearts[2]} alt="heart" />
        </motion.div>
        
        <motion.div 
          className="heart heart-4"
          style={{ y: heart4Y }}
        >
          <img src={hearts[3]} alt="heart" />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.h1 
          className="font-great-vibes"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          15 Months Together
        </motion.h1>
        
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          Happy 15th Monthsarry & Valentine's Day my Dear
        </motion.p>
        
        <motion.p 
          className="date"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        >
          Our love story continues to bloom on this special day
        </motion.p>
        
        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div 
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background music */}
      <audio autoPlay loop controls className="audio-player">
        <source src="/assets/Taylor_Fortnight.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
};

export default Hero;
