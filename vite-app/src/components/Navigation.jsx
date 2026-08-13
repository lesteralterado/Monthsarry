import React, { useState } from 'react';
import './Navigation.css';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'photo', label: 'Memory' },
  { id: 'message', label: 'Message' },
  { id: 'surprise', label: 'Surprise' },
  { id: 'game', label: 'Play Game' },
  { id: 'secret', label: 'Secret' },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    closeMenu();
  };

  return (
    <nav>
      <div className="nav-inner">
        <a
          href="#home"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
        >
          21st Months<span className="nav-logo-dot">.</span>
        </a>

        <div className="burger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul id="nav-menu" className={isMenuOpen ? 'open' : ''}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="nav-cta" onClick={() => scrollToSection('message')}>
          Say Hello
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
