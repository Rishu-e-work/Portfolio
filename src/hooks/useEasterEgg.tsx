
import { useState, useEffect } from 'react';
import { useAudio } from './useAudio';

export const useEasterEgg = () => {
  const [typedSequence, setTypedSequence] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const { playSuccessSound } = useAudio();
  
  const targetSequence = 'RISHABH';

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = (typedSequence + e.key.toUpperCase()).slice(-targetSequence.length);
      setTypedSequence(newSequence);

      if (newSequence === targetSequence && !isActivated) {
        setIsActivated(true);
        playSuccessSound();
        
        // Create confetti explosion
        createConfettiExplosion();
        
        // Show celebration modal
        showCelebrationModal();
        
        // Reset after animation
        setTimeout(() => {
          setIsActivated(false);
          setTypedSequence('');
        }, 5000);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [typedSequence, isActivated, playSuccessSound]);

  const createConfettiExplosion = () => {
    const colors = ['#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = '50%';
      confetti.style.top = '50%';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      
      const angle = (Math.PI * 2 * i) / 50;
      const velocity = 15 + Math.random() * 15;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      confetti.style.transform = `translate(-50%, -50%)`;
      document.body.appendChild(confetti);
      
      let posX = 0;
      let posY = 0;
      let velY = vy;
      const gravity = 0.8;
      
      const animate = () => {
        posX += vx;
        posY += velY;
        velY += gravity;
        
        confetti.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) rotate(${posX * 2}deg)`;
        
        if (posY < window.innerHeight) {
          requestAnimationFrame(animate);
        } else {
          document.body.removeChild(confetti);
        }
      };
      
      requestAnimationFrame(animate);
    }
  };

  const showCelebrationModal = () => {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(14, 165, 233, 0.3);
        animation: fadeInScale 0.5s ease-out;
      ">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
        <h2 style="font-family: 'Orbitron', monospace; font-size: 2rem; margin-bottom: 1rem; color: #0ea5e9;">
          Easter Egg Found!
        </h2>
        <p style="font-size: 1.2rem; margin-bottom: 1rem;">
          Congratulations! You discovered the secret sequence.
        </p>
        <p style="color: #8b5cf6; font-style: italic;">
          "Code is poetry written in logic" - Rishabh Jha
        </p>
      </div>
    `;
    
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
      document.body.removeChild(modal);
      document.head.removeChild(style);
    }, 4000);
  };

  return { isActivated, typedSequence };
};
