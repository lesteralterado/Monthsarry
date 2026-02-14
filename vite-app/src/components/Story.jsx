import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingElements from './FloatingElements';

const timelineItems = [
  {
    title: 'The Beginning',
    description: 'It all started with a simple hello that changed everything. From that first conversation, we knew something special was beginning.'
  },
  {
    title: 'First Date',
    description: 'Nervous excitement filled the air as we shared our first official date. Time seemed to fly by as we discovered our connection.'
  },
  {
    title: 'Growing Closer',
    description: 'Month by month, our bond grew stronger. Late night calls, shared dreams, and countless memories that we\'ll treasure forever.'
  },
  {
    title: '15 Months Strong',
    description: 'Here we are, celebrating 15 beautiful months together. Every day with you feels like a new adventure waiting to unfold.'
  }
];

const Story = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section id="story" className="section" ref={sectionRef}>
      {/* Parallax Background */}
      <motion.div 
        className="story-background"
        style={{ y: backgroundY }}
      />
      
      {/* Floating Valentine Elements */}
      <FloatingElements 
        sectionRef={sectionRef} 
        count={12}
        includeHearts={true}
        includeRoses={true}
        includeSparkles={true}
      />

      <motion.h2 
        className="font-great-vibes story-title"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Our Love Story
      </motion.h2>

      <div className="timeline">
        {timelineItems.map((item, index) => (
          <motion.div 
            key={index}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              ease: 'easeOut' 
            }}
          >
            <motion.div 
              className="timeline-dot"
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            />
            <motion.div 
              className="timeline-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="story-grid">
        {[
          {
            title: 'What Makes Us Special',
            description: 'Our relationship is built on trust, laughter, and genuine care for each other. We\'ve learned to grow together while maintaining our individual dreams and aspirations.'
          },
          {
            title: 'Our Adventures',
            description: 'From spontaneous midnight conversations to planned day trips, every moment we spend together becomes a cherished memory that adds to our beautiful story.'
          },
          {
            title: 'Looking Forward',
            description: 'Ten months is just the beginning. We\'re excited about all the adventures, challenges, and beautiful moments that lie ahead in our journey together.'
          }
        ].map((card, index) => (
          <motion.div 
            key={index}
            className="story-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.7, 
              delay: index * 0.2,
              ease: 'easeOut' 
            }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </motion.div>
        ))}
      </div>

      <style>{`
        .story-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, 
            rgba(220, 38, 38, 0.05) 0%, 
            rgba(0, 0, 0, 0) 50%,
            rgba(220, 38, 38, 0.05) 100%
          );
          z-index: -1;
        }
        
        .story-title {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 3rem;
          color: #dc2626;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto 4rem;
          padding: 2rem 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, #dc2626, #991b1b, #dc2626);
        }

        .timeline-item {
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .timeline-item:nth-child(odd) {
          flex-direction: row;
        }

        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 16px;
          background: #dc2626;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
          z-index: 1;
        }

        .timeline-content {
          width: 45%;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(220, 38, 38, 0.2);
        }

        .timeline-content h3 {
          color: #dc2626;
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
        }

        .timeline-content p {
          color: #e5e5e5;
          line-height: 1.6;
        }

        .story-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .story-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(220, 38, 38, 0.15);
          transition: box-shadow 0.3s ease;
        }

        .story-card:hover {
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.1);
        }

        .story-card h3 {
          color: #dc2626;
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }

        .story-card p {
          color: #d4d4d4;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .timeline::before {
            left: 20px;
          }

          .timeline-item,
          .timeline-item:nth-child(even) {
            flex-direction: row;
            padding-left: 50px;
          }

          .timeline-dot {
            left: 20px;
          }

          .timeline-content {
            width: 100%;
          }

          .story-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Story;
