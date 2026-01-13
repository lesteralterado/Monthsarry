import React from 'react';
import './PhotoSection.css';

const PhotoSection = () => {
  return (
    <section id="photo" className="photo-section">
      <div className="photo-overlay">
        <h2 className="photo-title">Our Special Memory</h2>
        <p className="photo-subtitle">A moment captured forever</p>
      </div>
    </section>
  );
};

export default PhotoSection;