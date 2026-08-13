import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BackgroundMusic from './BackgroundMusic';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Parallax transforms
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-inner">
        {/* Left: Copy */}
        <motion.div
          className="hero-copy"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.span
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Happy 21st Monthsarry & Valentine's Day
          </motion.span>

          <motion.h1
            className="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          >
            Let Us Celebrate <span className="font-great-vibes">21st</span> Months of Us
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          >
            A little archive of our favorite moments, inside jokes, and the love
            that keeps growing — made just for you, my dear.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          >
            <button className="btn-solid" onClick={() => scrollToSection('message')}>
              Say Hello
            </button>
            <button className="btn-outline" onClick={() => scrollToSection('story')}>
              <span className="play-icon">▶</span> See Our Story
            </button>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              className="scroll-arrow"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Photos */}
        <motion.div
          className="hero-media"
          style={{ y: mediaY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="hero-media-primary">
            <img
              src="https://picsum.photos/seed/monthsarry-hero-1/700/900"
              alt="Us, together"
              loading="eager"
            />
          </div>
          <div className="hero-media-secondary">
            <img
              src="https://picsum.photos/seed/monthsarry-hero-2/560/720"
              alt="A favorite memory"
              loading="eager"
            />
            <button className="hero-media-cta" onClick={() => scrollToSection('message')}>
              Say Hello
            </button>
          </div>
        </motion.div>
      </div>

      {/* Background music (streamed from YouTube) */}
      <BackgroundMusic videoId="q3zqJs7JUCQ" />
    </section>
  );
};

export default Hero;
