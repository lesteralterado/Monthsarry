import React, { useEffect, useRef, useState } from 'react';

const YT_API_URL = 'https://www.youtube.com/iframe_api';
let ytApiPromise = null;

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback();
      resolve(window.YT);
    };

    if (!document.querySelector(`script[src="${YT_API_URL}"]`)) {
      const script = document.createElement('script');
      script.src = YT_API_URL;
      document.head.appendChild(script);
    }
  });

  return ytApiPromise;
}

// Plays a YouTube video as background music: the iframe itself is visually
// hidden off-screen, and this renders a small custom play/pause + volume
// control in its place (YouTube autoplay-with-sound is blocked by browsers,
// so playback starts on the listener's own click instead of automatically).
const BackgroundMusic = ({ videoId }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: videoId,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            e.target.setVolume(volume);
            setIsReady(true);
          },
          onStateChange: (e) => {
            setIsPlaying(e.data === YT.PlayerState.PLAYING);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleVolumeChange = (e) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(value);
    }
  };

  return (
    <div className="music-player">
      <div ref={containerRef} className="music-player-hidden-frame" />
      <button
        type="button"
        className="music-player-toggle"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        disabled={!isReady}
      >
        <span className={isPlaying ? 'icon-pause' : 'icon-play'} />
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="music-player-volume"
        aria-label="Music volume"
      />

      <style>{`
        .music-player {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(33, 31, 27, 0.85);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          padding: 0.5rem 0.9rem;
        }

        .music-player-hidden-frame {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          left: -9999px;
        }

        .music-player-toggle {
          box-sizing: border-box;
          width: 28px;
          height: 28px;
          padding: 0;
          border-radius: 50%;
          border: none;
          background: #f7f2e9;
          color: #211f1b;
          font-size: 0.7rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .music-player-toggle:hover:not(:disabled) {
          transform: scale(1.08);
        }

        .music-player-toggle:disabled {
          opacity: 0.5;
          cursor: default;
        }

        .icon-play {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 7px;
          border-color: transparent transparent transparent #211f1b;
          margin-left: 2px;
        }

        .icon-pause {
          width: 7px;
          height: 9px;
          position: relative;
        }

        .icon-pause::before,
        .icon-pause::after {
          content: '';
          position: absolute;
          top: 0;
          width: 2px;
          height: 9px;
          background: #211f1b;
        }

        .icon-pause::before {
          left: 0;
        }

        .icon-pause::after {
          right: 0;
        }

        .music-player-volume {
          width: 70px;
          accent-color: #b3394c;
        }

        @media (max-width: 768px) {
          .music-player {
            bottom: 10px;
            right: 10px;
            padding: 0.4rem 0.7rem;
          }

          .music-player-volume {
            width: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundMusic;
