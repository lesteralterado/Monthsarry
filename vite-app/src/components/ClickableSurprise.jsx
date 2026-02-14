import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Special messages that appear when hearts are clicked
const surpriseMessages = [
  "You're my everything! 💕",
  "I love you more each day! ❤️",
  "You make my heart skip a beat! 💓",
  "My love, my life, my everything! 🌹",
  "Forever yours, Lester ❤️",
  "You are my dream come true! ✨",
  "Every moment with you is magical! 💖",
  "I adore you, my queen! 👑",
  "You're the best thing that happened to me! 🎉",
  "My heart belongs to you forever! 💝",
];

// Surprise gifts
const surpriseGifts = [
  { emoji: "💎", text: "A diamond for my diamond" },
  { emoji: "🌹", text: "A thousand roses for you" },
  { emoji: "🎁", text: "All my love, wrapped up" },
  { emoji: "💌", text: "A love letter from the heart" },
  { emoji: "🌟", text: "A star from the sky" },
  { emoji: "👑", text: "A crown for my princess" },
  { emoji: "🎵", text: "A song of love for you" },
  { emoji: "💫", text: "All the sparkle in the universe" },
  { emoji: "🏰", text: "A castle for my queen" },
  { emoji: "🧸", text: "A hug from me, always" },
];

const ClickableSurprise = () => {
  const [hearts, setHearts] = useState([]);
  const [showMessage, setShowMessage] = useState(null);
  const [showGift, setShowGift] = useState(null);
  const [score, setScore] = useState(0);

  // Create a new heart at random position
  const addHeart = useCallback((e) => {
    const id = Date.now();
    const newHeart = {
      id,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
    };
    setHearts(prev => [...prev, newHeart]);
  }, []);

  // Handle clicking on a heart
  const handleHeartClick = (heartId, index) => {
    // Remove the clicked heart
    setHearts(prev => prev.filter(h => h.id !== heartId));
    
    // Show a random surprise message
    const messageIndex = Math.floor(Math.random() * surpriseMessages.length);
    setShowMessage(surpriseMessages[(index + messageIndex) % surpriseMessages.length]);
    
    // Show a random gift
    const giftIndex = Math.floor(Math.random() * surpriseGifts.length);
    setShowGift(surpriseGifts[(index + giftIndex) % surpriseGifts.length]);
    
    // Increment score
    setScore(prev => prev + 1);
    
    // Hide message after 3 seconds
    setTimeout(() => setShowMessage(null), 3000);
    setTimeout(() => setShowGift(null), 3000);
  };

  // Clear all hearts
  const clearHearts = () => {
    setHearts([]);
    setScore(0);
  };

  return (
    <section id="surprise" className="surprise-section">
      <div className="surprise-header">
        <h2 className="font-great-vibes surprise-title">💝 Click the Hearts! 💝</h2>
        <p className="surprise-subtitle">Click on the floating hearts to reveal surprises!</p>
        <div className="score-display">
          <span className="score-label">Hearts Collected:</span>
          <span className="score-number">{score}</span>
        </div>
        {score > 0 && (
          <button onClick={clearHearts} className="reset-button">
            Start Over 🔄
          </button>
        )}
      </div>

      {/* Add heart button */}
      <button 
        onClick={addHeart}
        className="add-heart-button"
      >
        + Add Heart 💕
      </button>

      {/* Floating hearts container */}
      <div className="hearts-wrapper">
        <AnimatePresence>
          {hearts.map((heart, index) => (
            <motion.div
              key={heart.id}
              className="clickable-heart"
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: 0,
                y: [0, -20, 0],
              }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              style={{
                left: heart.x,
                top: heart.y,
              }}
              onClick={() => handleHeartClick(heart.id, index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              transition={{
                y: {
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Surprise message popup */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="surprise-popup message-popup"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -50 }}
          >
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              {showMessage}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Surprise gift popup */}
      <AnimatePresence>
        {showGift && (
          <motion.div
            className="surprise-popup gift-popup"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -50 }}
          >
            <div className="gift-content">
              <motion.span
                className="gift-emoji"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 0.6, repeat: 3 }}
              >
                {showGift.emoji}
              </motion.span>
              <span className="gift-text">{showGift.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .surprise-section {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          overflow: hidden;
        }

        .surprise-header {
          text-align: center;
          z-index: 10;
        }

        .surprise-title {
          font-size: 3rem;
          color: #ff6b9d;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 20px rgba(255, 107, 157, 0.5);
        }

        .surprise-subtitle {
          color: #a0a0c0;
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .score-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 1rem 0;
        }

        .score-label {
          color: #a0a0c0;
          font-size: 1rem;
        }

        .score-number {
          background: linear-gradient(135deg, #ff6b9d, #ff8a80);
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          padding: 0.25rem 1rem;
          border-radius: 20px;
          min-width: 50px;
        }

        .reset-button {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 0.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .reset-button:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.5);
        }

        .add-heart-button {
          background: linear-gradient(135deg, #ff6b9d, #ff8a80);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.2rem;
          border-radius: 30px;
          cursor: pointer;
          margin: 1rem 0;
          z-index: 10;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 5px 20px rgba(255, 107, 157, 0.4);
        }

        .add-heart-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(255, 107, 157, 0.6);
        }

        .add-heart-button:active {
          transform: scale(0.95);
        }

        .hearts-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .clickable-heart {
          position: absolute;
          font-size: 3rem;
          cursor: pointer;
          pointer-events: auto;
          filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.5));
          user-select: none;
        }

        .surprise-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 2rem 3rem;
          border-radius: 20px;
          z-index: 100;
          font-size: 1.5rem;
          text-align: center;
          box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        }

        .message-popup {
          background: linear-gradient(135deg, #ff6b9d, #ff8a80);
          color: white;
          font-family: 'Great Vibes', cursive;
          font-size: 2rem;
        }

        .gift-popup {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .gift-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .gift-emoji {
          font-size: 4rem;
        }

        .gift-text {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .surprise-title {
            font-size: 2rem;
          }

          .clickable-heart {
            font-size: 2.5rem;
          }

          .surprise-popup {
            padding: 1.5rem;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ClickableSurprise;
