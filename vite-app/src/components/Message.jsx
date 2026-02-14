import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingElements from './FloatingElements';

const Message = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section id="message" className="section message-section" ref={sectionRef}>
      {/* Parallax Background */}
      <motion.div 
        className="message-background"
        style={{ y: backgroundY }}
      />
      
      {/* Floating Valentine Elements */}
      <FloatingElements 
        sectionRef={sectionRef} 
        count={20}
        includeHearts={true}
        includeRoses={true}
        includeSparkles={true}
      />

      <motion.div 
        className="message-content"
        style={{ y: contentY }}
      >
        <motion.h2 
          className="font-great-vibes message-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          A Message From The Heart
        </motion.h2>
        
        <motion.div 
          className="message-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p 
            className="message-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fifteen months ago, you walked into my life and everything changed for the better.
            You've brought so much joy, laughter, and love into my world. Every day with you
            feels like a gift, and I'm grateful for every moment we've shared together.
          </motion.p>
          
          <motion.p 
            className="message-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Here's to many more months and years of adventures, growth, and endless love.
            You mean the world to me, and I can't wait to see what the future holds for us.
          </motion.p>
          
          <motion.p 
            className="message-signature"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            - Lester ❤️
          </motion.p>
        </motion.div>
        
        {/* Decorative hearts */}
        <motion.div 
          className="message-hearts"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="message-heart"
              animate={{
                y: [0, -15, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ 
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              ❤️
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        .message-section {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .message-background {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%);
          z-index: -1;
        }

        .message-content {
          max-width: 800px;
          text-align: center;
          padding: 3rem;
          position: relative;
          z-index: 10;
        }

        .message-title {
          font-size: 3rem;
          color: #dc2626;
          margin-bottom: 3rem;
        }

        .message-container {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid rgba(220, 38, 38, 0.15);
          backdrop-filter: blur(10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .message-text {
          font-size: 1.2rem;
          line-height: 2;
          color: #e5e5e5;
          margin-bottom: 1.5rem;
        }

        .message-signature {
          font-size: 1.5rem;
          color: #dc2626;
          margin-top: 2rem;
          font-style: italic;
        }

        .message-hearts {
          position: relative;
          height: 40px;
          margin-top: 2rem;
        }

        .message-heart {
          position: absolute;
          font-size: 1.5rem;
        }

        @media (max-width: 768px) {
          .message-title {
            font-size: 2.2rem;
          }

          .message-container {
            padding: 2rem;
          }

          .message-text {
            font-size: 1rem;
            line-height: 1.8;
          }

          .message-signature {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Message;
