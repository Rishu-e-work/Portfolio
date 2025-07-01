
import { useState, useRef, useEffect } from 'react';

interface AudioConfig {
  volume: number;
  isPlaying: boolean;
  isMuted: boolean;
}

export const useAudio = () => {
  const [config, setConfig] = useState<AudioConfig>({
    volume: 0.3,
    isPlaying: false,
    isMuted: false
  });

  // Audio context for sound effects
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on user interaction
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    document.addEventListener('click', initAudioContext, { once: true });
    return () => document.removeEventListener('click', initAudioContext);
  }, []);

  const playHoverSound = () => {
    if (!audioContextRef.current || config.isMuted) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContextRef.current.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(config.volume * 0.1, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  const playClickSound = () => {
    if (!audioContextRef.current || config.isMuted) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(1000, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContextRef.current.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(config.volume * 0.15, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.15);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.15);
  };

  const playSuccessSound = () => {
    if (!audioContextRef.current || config.isMuted) return;

    // Play a pleasant chord
    [523.25, 659.25, 783.99].forEach((freq, index) => {
      const oscillator = audioContextRef.current!.createOscillator();
      const gainNode = audioContextRef.current!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current!.destination);

      oscillator.frequency.setValueAtTime(freq, audioContextRef.current!.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContextRef.current!.currentTime);
      gainNode.gain.linearRampToValueAtTime(config.volume * 0.1, audioContextRef.current!.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current!.currentTime + 0.5);

      oscillator.start(audioContextRef.current!.currentTime + index * 0.1);
      oscillator.stop(audioContextRef.current!.currentTime + 0.5 + index * 0.1);
    });
  };

  const toggleMute = () => {
    setConfig(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const setVolume = (volume: number) => {
    setConfig(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  };

  return {
    config,
    playHoverSound,
    playClickSound,
    playSuccessSound,
    toggleMute,
    setVolume
  };
};
