import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoveGame = () => {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hearts, setHearts] = useState([]);
  const [playerX, setPlayerX] = useState(50);
  const [combo, setCombo] = useState(0);
  const gameAreaRef = useRef(null);
  const gameLoopRef = useRef(null);

  // Start the game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setTimeLeft(30);
    setHearts([]);
    setCombo(0);
    setPlayerX(50);
  };

  // Handle mouse/touch movement
  const handleMove = useCallback((e) => {
    if (gameState !== 'playing') return;
    
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;
    
    const rect = gameArea.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(5, Math.min(95, x)));
  }, [gameState]);

  // Spawn a new heart
  const spawnHeart = useCallback(() => {
    if (gameState !== 'playing') return;
    
    const types = ['💖', '💕', '💗', '💓', '💞', '💘'];
    const newHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: -10,
      type: types[Math.floor(Math.random() * types.length)],
      speed: Math.random() * 0.5 + 0.5,
    };
    setHearts(prev => [...prev, newHeart]);
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      return;
    }

    // Spawn hearts periodically
    const spawnInterval = setInterval(spawnHeart, 800);
    
    // Game loop for moving hearts
    gameLoopRef.current = setInterval(() => {
      setHearts(prev => {
        return prev.map(heart => ({
          ...heart,
          y: heart.y + heart.speed,
        })).filter(heart => {
          // Check if heart is caught
          if (heart.y > 85 && heart.y < 100 && Math.abs(heart.x - playerX) < 15) {
            setScore(s => s + 10 + (combo * 2));
            setCombo(c => c + 1);
            return false;
          }
          // Check if heart is missed
          if (heart.y > 100) {
            setLives(l => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setGameState('gameOver');
              }
              return newLives;
            });
            setCombo(0);
            return false;
          }
          return true;
        });
      });
    }, 50);

    return () => {
      clearInterval(spawnInterval);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, spawnHeart, playerX, combo]);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setGameState('gameOver');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      
      if (e.key === 'ArrowLeft') {
        setPlayerX(p => Math.max(5, p - 5));
      } else if (e.key === 'ArrowRight') {
        setPlayerX(p => Math.min(95, p + 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  return (
    <section id="game" className="game-section">
      <div className="game-header">
        <h2 className="font-great-vibes game-title">💕 Catch the Hearts! 💕</h2>
        
        {gameState === 'playing' && (
          <div className="game-stats">
            <div className="stat">
              <span className="stat-label">Score:</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Time:</span>
              <span className="stat-value">{timeLeft}s</span>
            </div>
            <div className="stat">
              <span className="stat-label">Lives:</span>
              <span className="stat-value">
                {Array.from({ length: lives }).map((_, i) => '❤️').join('')}
              </span>
            </div>
            {combo > 1 && (
              <div className="combo">
                <span className="combo-text">🔥 Combo x{combo}!</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div 
        className="game-area"
        ref={gameAreaRef}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* Menu State */}
        {gameState === 'menu' && (
          <div className="game-menu">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="menu-content"
            >
              <div className="menu-hearts">
                <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>💖</motion.span>
                <motion.span animate={{ y: [0, -15, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>💕</motion.span>
                <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>💗</motion.span>
              </div>
              <h3>Catch as many hearts as you can!</h3>
              <p>Move your mouse or use arrow keys to catch the falling hearts</p>
              <button onClick={startGame} className="play-button">
                Start Playing 🎮
              </button>
            </motion.div>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <>
            {/* Falling hearts */}
            {hearts.map(heart => (
              <motion.div
                key={heart.id}
                className="falling-heart"
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                }}
              >
                {heart.type}
              </motion.div>
            ))}

            {/* Player basket/character */}
            <motion.div
              className="player"
              style={{ left: `${playerX}%` }}
              animate={{ 
                scaleX: [1, 1.1, 1],
              }}
              transition={{ duration: 0.2 }}
            >
              🫴
            </motion.div>
          </>
        )}

        {/* Game Over State */}
        {gameState === 'gameOver' && (
          <div className="game-over">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="game-over-content"
            >
              <h3>⏰ Time's Up!</h3>
              <div className="final-score">
                <span className="final-label">Final Score</span>
                <span className="final-value">{score}</span>
              </div>
              <p className="score-message">
                {score >= 300 ? "🌟 Amazing! You're a heart-catching pro!" :
                 score >= 200 ? "💕 Great job! Your love is strong!" :
                 score >= 100 ? "❤️ Nice try! Keep the love going!" :
                 "💔 Practice makes perfect! Try again!"}
              </p>
              <div className="game-over-buttons">
                <button onClick={startGame} className="play-again-button">
                  Play Again 🔄
                </button>
                <button onClick={() => setGameState('menu')} className="menu-button">
                  Main Menu 📋
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <style>{`
        .game-section {
          min-height: 100vh;
          background: linear-gradient(180deg, #0f0f23 0%, #1a1a3e 50%, #2d1b4e 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          overflow: hidden;
        }

        .game-header {
          text-align: center;
          margin-bottom: 1rem;
          z-index: 10;
        }

        .game-title {
          font-size: 3rem;
          color: #ff69b4;
          text-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
          margin-bottom: 1rem;
        }

        .game-stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-label {
          color: #888;
          font-size: 0.9rem;
        }

        .stat-value {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .combo {
          position: absolute;
          top: 10px;
          right: 10px;
        }

        .combo-text {
          color: #ffd700;
          font-size: 1.2rem;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }

        .game-area {
          width: 100%;
          max-width: 600px;
          height: 70vh;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          border: 2px solid rgba(255, 105, 180, 0.3);
          position: relative;
          overflow: hidden;
          cursor: none;
        }

        .game-menu, .game-over {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 15, 35, 0.95);
        }

        .menu-content, .game-over-content {
          text-align: center;
          padding: 2rem;
        }

        .menu-hearts {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .menu-content h3 {
          color: #ff69b4;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .menu-content p {
          color: #aaa;
          margin-bottom: 2rem;
        }

        .play-button, .play-again-button {
          background: linear-gradient(135deg, #ff69b4, #ff8ac4);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.3rem;
          border-radius: 30px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 5px 20px rgba(255, 105, 180, 0.4);
        }

        .play-button:hover, .play-again-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(255, 105, 180, 0.6);
        }

        .game-over h3 {
          color: #ffd700;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .final-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 1.5rem 0;
        }

        .final-label {
          color: #aaa;
          font-size: 1rem;
        }

        .final-value {
          color: #ff69b4;
          font-size: 4rem;
          font-weight: bold;
          text-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
        }

        .score-message {
          color: #ccc;
          font-size: 1.1rem;
          margin: 1rem 0;
        }

        .game-over-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1.5rem;
        }

        .menu-button {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 30px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .menu-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .falling-heart {
          position: absolute;
          font-size: 2rem;
          transform: translateX(-50%);
          user-select: none;
        }

        .player {
          position: absolute;
          bottom: 20px;
          font-size: 3rem;
          transform: translateX(-50%);
          filter: drop-shadow(0 0 10px rgba(255, 105, 180, 0.5));
        }

        @media (max-width: 768px) {
          .game-title {
            font-size: 2rem;
          }

          .game-area {
            height: 60vh;
          }

          .stat-value {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default LoveGame;
