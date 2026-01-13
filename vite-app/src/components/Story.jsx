import React, { useEffect, useRef } from 'react';
// import './Story.css';

const Story = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="section" ref={sectionRef}>
      <h2 className="fade-in font-great-vibes">Our Love Story</h2>

      <div className="timeline fade-in">
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>The Beginning</h3>
            <p>It all started with a simple hello that changed everything. From that first conversation, we knew something special was beginning.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>First Date</h3>
            <p>Nervous excitement filled the air as we shared our first official date. Time seemed to fly by as we discovered our connection.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Growing Closer</h3>
            <p>Month by month, our bond grew stronger. Late night calls, shared dreams, and countless memories that we'll treasure forever.</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>10 Months Strong</h3>
            <p>Here we are, celebrating 10 beautiful months together. Every day with you feels like a new adventure waiting to unfold.</p>
          </div>
        </div>
      </div>

      <div className="story-grid fade-in">
        <div className="story-card">
          <h3>What Makes Us Special</h3>
          <p>Our relationship is built on trust, laughter, and genuine care for each other. We've learned to grow together while maintaining our individual dreams and aspirations.</p>
        </div>

        <div className="story-card">
          <h3>Our Adventures</h3>
          <p>From spontaneous midnight conversations to planned day trips, every moment we spend together becomes a cherished memory that adds to our beautiful story.</p>
        </div>

        <div className="story-card">
          <h3>Looking Forward</h3>
          <p>Ten months is just the beginning. We're excited about all the adventures, challenges, and beautiful moments that lie ahead in our journey together.</p>
        </div>
      </div>
    </section>
  );
};

export default Story;