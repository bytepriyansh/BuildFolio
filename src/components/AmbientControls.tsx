import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const hindiSongs = [
  {
    name: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    duration: '4:22',
    audioSrc: 'tumhiho.mp3'
  },
  {
    name: 'Kesariya',
    artist: 'Arijit Singh',
    duration: '4:28',
    audioSrc: 'kesariya.mp3'
  },
  {
    name: 'Tu Hai ke nahi',
    artist: 'Ankit Tiwari',
    duration: '5:34',
    audioSrc: 'tu.mp3'
  },
  {
    name: 'Tum ho',
    artist: 'Mohit Chauhan',
    duration: '5:18',
    audioSrc: 'tum.mp3'
  }
];

interface MusicVisualizerProps {
  isPlaying: boolean;
}

const MusicVisualizer = ({ isPlaying }: MusicVisualizerProps) => {
  const [bars, setBars] = useState<number[]>(Array(32).fill(0));

  useEffect(() => {
    if (!isPlaying) {
      setBars(Array(32).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex items-end justify-center gap-1 h-16">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="w-1 bg-gradient-to-t from-primary to-secondary rounded-t-sm"
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.1 }}
          style={{ minHeight: '2px' }}
        />
      ))}
    </div>
  );
};

export const AmbientControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const duration = audio.duration || 1;
      setProgress((audio.currentTime / duration) * 100);
      
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      setCurrentTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % hindiSongs.length);
    setIsPlaying(true);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + hindiSongs.length) % hindiSongs.length);
    setIsPlaying(true);
    setProgress(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const clickPercentage = (clickPosition / progressBarWidth) * 100;
    const newTime = (clickPercentage / 100) * audio.duration;
    
    audio.currentTime = newTime;
    setProgress(clickPercentage);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={hindiSongs[currentTrack].audioSrc} 
        preload="auto"
      />

      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 right-4 z-40 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-glow-lg"
        >
          <Music className="text-primary-foreground" size={20} />
          {isPlaying && (
            <motion.span 
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 z-40"
          >
            <div className="glass rounded-2xl p-4 w-80 shadow-glow-lg border border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                    className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-primary-foreground">♪</span>
                  </motion.div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Hindi Music Player</div>
                    <div className="text-xs text-foreground-muted">Enjoy your favorites</div>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className="text-center mb-4">
                <motion.div
                  key={currentTrack}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  <div className="font-medium text-foreground">{hindiSongs[currentTrack].name}</div>
                  <div className="text-xs text-foreground-muted">{hindiSongs[currentTrack].artist}</div>
                </motion.div>
              </div>

              <div className="mb-4 bg-surface/30 rounded-lg p-3">
                <MusicVisualizer isPlaying={isPlaying} />
              </div>

              <div className="mb-4 space-y-2">
                <div 
                  className="h-1 bg-surface rounded-full overflow-hidden cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-foreground-muted font-mono">
                  <span>{currentTime}</span>
                  <span>{hindiSongs[currentTrack].duration}</span>
                </div>
              </div>

          <div className="flex items-center justify-center gap-4 mb-4">
                <motion.button
                  onClick={prevTrack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 glass glass-hover rounded-full flex items-center justify-center"
                >
                  <SkipBack size={16} className="text-foreground" />
                </motion.button>
                
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-glow"
                >
                  {isPlaying ? (
                    <Pause size={20} className="text-primary-foreground" />
                  ) : (
                    <Play size={20} className="text-primary-foreground" />
                  )}
                </motion.button>
                
                <motion.button
                  onClick={nextTrack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 glass glass-hover rounded-full flex items-center justify-center"
                >
                  <SkipForward size={16} className="text-foreground" />
                </motion.button>
              </div>

              <div className="flex items-center gap-3">
                <Volume2 size={16} className="text-foreground-muted" />
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-1 bg-surface rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume}%, hsl(var(--surface)) ${volume}%, hsl(var(--surface)) 100%)`
                    }}
                  />
                </div>
                <span className="text-xs text-foreground-muted font-mono w-8">{volume}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};