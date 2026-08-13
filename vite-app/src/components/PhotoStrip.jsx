import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stripImages = [1, 2, 3, 4, 5, 6].map(
  (n) => `https://picsum.photos/seed/monthsarry-strip-${n}/500/500`
);

const PhotoStrip = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <section className="photo-strip" ref={sectionRef}>
      <motion.h3 className="photo-strip-title" style={{ y: titleY }}>
        Our Moments
      </motion.h3>

      <div className="photo-strip-row">
        {stripImages.map((src, i) => (
          <motion.div
            className="photo-strip-item"
            key={src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
          >
            <img src={src} alt={`Memory ${i + 1}`} loading="lazy" />
          </motion.div>
        ))}
      </div>

      <style>{`
        .photo-strip {
          background: #24231c;
          padding: 3.5rem 1.5rem;
          overflow: hidden;
        }

        .photo-strip-title {
          text-align: center;
          font-family: 'Playfair Display', serif;
          font-weight: 500;
          font-size: 1.6rem;
          color: #f7f2e9;
          margin-bottom: 2rem;
          letter-spacing: 0.02em;
        }

        .photo-strip-row {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
        }

        .photo-strip-item {
          aspect-ratio: 1 / 1;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 15px 30px -15px rgba(0, 0, 0, 0.6);
        }

        .photo-strip-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 900px) {
          .photo-strip-row {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 480px) {
          .photo-strip-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};

export default PhotoStrip;
