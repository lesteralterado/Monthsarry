import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Password hint - could be something meaningful like their anniversary date or a special word
const SECRET_CODE = "lester";

const SecretReveal = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password.toLowerCase().trim() === SECRET_CODE) {
      setIsUnlocked(true);
      setError('');
    } else {
      setAttempts(prev => prev + 1);
      setError('Incorrect password. Try again! 💔');
      setPassword('');
      
      // Show hint after 2 failed attempts
      if (attempts >= 1) {
        setShowHint(true);
      }
    }
  };

  // Special messages that appear when unlocked
  const secretMessages = [
    { emoji: "💝", text: "You're my secret Valentine! 💕" },
    { emoji: "🌹", text: "Here's a rose for the most beautiful person in my life 🌹" },
    { emoji: "🎁", text: "This is just a small token of my love for you ❤️" },
    { emoji: "📜", text: "I promise to love you forever and always 💑" },
    { emoji: "✨", text: "You make every day feel like Valentine's Day! 💖" },
  ];

  return (
    <section id="secret" className="secret-section">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="locked"
            className="secret-locked"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="lock-container">
              <motion.div
                className="lock-icon"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔒
              </motion.div>
              
              <h2 className="font-great-vibes secret-title">
                💌 A Secret Message 💌
              </h2>
              
              <p className="secret-description">
                This section is locked with love. Enter the password to unlock a special message!
              </p>

              <form onSubmit={handleSubmit} className="password-form">
                <div className="input-wrapper">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="password-input"
                  />
                  <motion.button
                    type="submit"
                    className="unlock-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Unlock 🔓
                  </motion.button>
                </div>
                
                {error && (
                  <motion.p
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
                
                {showHint && (
                  <motion.p
                    className="hint-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    💡 Hint: Who's sending this message? (lowercase) 🤔
                  </motion.p>
                )}
              </form>

              <p className="hint-toggle" onClick={() => setShowHint(!showHint)}>
                {showHint ? "Hide hint" : "Need a hint?"}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            className="secret-unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="celebration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎉
              </motion.span>
              <motion.span
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              >
                💕
              </motion.span>
              <motion.span
                animate={{ 
                  rotate: [0, -360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              >
                🎊
              </motion.span>
            </motion.div>

            <h2 className="font-great-vibes unlocked-title">
              🌟 Secret Unlocked! 🌟
            </h2>

            <div className="secret-messages">
              {secretMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  className="secret-message-card"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.3 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <span className="message-emoji">{msg.emoji}</span>
                  <span className="message-text">{msg.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="love-letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <h3>💖 A Love Letter for You 💖</h3>
              <div className="letter-content">
                <p>
                  My dearest love,
                </p>
                <p>
                  This website is just a small representation of how much you mean to me. 
                  Every beat of my heart is dedicated to you. You've brought so much joy and 
                  happiness into my life, and I'm grateful for every moment we share together.
                </p>
                <p>
                  On this special day (and every day), I want you to know that my love for 
                  you grows stronger with each passing moment. You are my everything.
                </p>
                <p>
                  Forever yours,
                </p>
                <p className="signature">
                  Lester ❤️
                </p>
              </div>
            </motion.div>

            <motion.button
              className="lock-again-button"
              onClick={() => {
                setIsUnlocked(false);
                setPassword('');
                setError('');
                setShowHint(false);
                setAttempts(0);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔒 Lock Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .secret-section {
          min-height: 100vh;
          background: linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Decorative background elements */
        .secret-section::before,
        .secret-section::after {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
        }

        .secret-section::before {
          background: #ff69b4;
          top: -100px;
          left: -100px;
        }

        .secret-section::after {
          background: #9b59b6;
          bottom: -100px;
          right: -100px;
        }

        .secret-locked, .secret-unlocked {
          max-width: 600px;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .lock-container {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 30px;
          padding: 3rem;
          text-align: center;
          border: 2px solid rgba(255, 105, 180, 0.3);
          backdrop-filter: blur(10px);
        }

        .lock-icon {
          font-size: 5rem;
          margin-bottom: 1rem;
        }

        .secret-title {
          font-size: 2.5rem;
          color: #ff69b4;
          margin-bottom: 1rem;
        }

        .secret-description {
          color: #aaa;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .password-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-wrapper {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .password-input {
          padding: 1rem 1.5rem;
          font-size: 1.1rem;
          border: 2px solid rgba(255, 105, 180, 0.3);
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          width: 200px;
          outline: none;
          transition: border-color 0.3s;
        }

        .password-input:focus {
          border-color: #ff69b4;
        }

        .password-input::placeholder {
          color: #888;
        }

        .unlock-button {
          background: linear-gradient(135deg, #ff69b4, #ff8ac4);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 30px;
          cursor: pointer;
          box-shadow: 0 5px 20px rgba(255, 105, 180, 0.4);
        }

        .error-message {
          color: #ff6b6b;
          font-size: 0.9rem;
        }

        .hint-message {
          color: #ffd700;
          font-size: 0.9rem;
          font-style: italic;
        }

        .hint-toggle {
          color: #666;
          font-size: 0.9rem;
          cursor: pointer;
          margin-top: 1rem;
          text-decoration: underline;
        }

        .hint-toggle:hover {
          color: #ff69b4;
        }

        /* Unlocked state */
        .secret-unlocked {
          text-align: center;
        }

        .celebration {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .unlocked-title {
          font-size: 2.5rem;
          color: #ffd700;
          margin-bottom: 2rem;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        .secret-messages {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .secret-message-card {
          background: rgba(255, 255, 255, 0.08);
          padding: 1.2rem 1.5rem;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 1rem;
          text-align: left;
          border: 1px solid rgba(255, 105, 180, 0.2);
          cursor: pointer;
        }

        .message-emoji {
          font-size: 2rem;
        }

        .message-text {
          color: #eee;
          font-size: 1.1rem;
        }

        .love-letter {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 2px solid rgba(255, 105, 180, 0.3);
        }

        .love-letter h3 {
          color: #ff69b4;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .letter-content {
          color: #ddd;
          text-align: left;
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .letter-content p {
          margin-bottom: 1rem;
        }

        .letter-content .signature {
          color: #ff69b4;
          font-size: 1.3rem;
          margin-top: 1.5rem;
        }

        .lock-again-button {
          background: rgba(255, 255, 255, 0.1);
          color: #aaa;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.8rem 1.5rem;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .lock-again-button:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
        }

        @media (max-width: 768px) {
          .lock-container {
            padding: 2rem;
          }

          .secret-title, .unlocked-title {
            font-size: 2rem;
          }

          .lock-icon {
            font-size: 4rem;
          }

          .password-input {
            width: 100%;
          }

          .input-wrapper {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default SecretReveal;
