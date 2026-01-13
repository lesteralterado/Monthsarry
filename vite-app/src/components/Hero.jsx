import React from 'react';
import './Hero.css';

// Array of heart images for better maintainability and readability
const hearts = [
  'https://cdn-icons-png.flaticon.com/512/833/833472.png',
  'https://res.cloudinary.com/dhxi75eld/image/upload/v1765423719/cdb125c2-6b03-460e-a933-1249f13ccdce_kk94fv.jpg',
  'https://cdn-icons-png.flaticon.com/512/833/833473.png',
  'https://cdn-icons-png.flaticon.com/512/833/833472.png'
];

const Hero = () => {
  return (
    <section id="home" className="hero">
      {/* Render hearts using map for DRY principle */}
      {hearts.map((heart, index) => (
        <div key={index} className="heart">
          <img src={heart} alt="heart" />
        </div>
      ))}

      <div className="hero-content">
        <h1 className="font-great-vibes">10 Months Together</h1>
        <p className="subtitle">Happy Monthsarry my Dear</p>
        <p className="date">A love story that continues to bloom</p>
      </div>

      {/* Background music */}
      <audio autoPlay loop controls className="audio-player">
        <source src="/assets/Taylor_Fortnight.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
};

export default Hero;