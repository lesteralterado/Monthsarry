import React, { useEffect, useRef } from 'react';
// import './Message.css';

const Message = () => {
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
    <section id="message" className="section" ref={sectionRef}>
      <h2 className="fade-in font-great-vibes">A Message From The Heart</h2>
      <div className="message-container fade-in">
        <p className="message-text">
          Ten months ago, you walked into my life and everything changed for the better.
          You've brought so much joy, laughter, and love into my world. Every day with you
          feels like a gift, and I'm grateful for every moment we've shared together.
          Here's to many more months and years of adventures, growth, and endless love.
          You mean the world to me, and I can't wait to see what the future holds for us.
        </p>
        <p className="message-signature">- Lester ❤️</p>
      </div>
    </section>
  );
};

export default Message;