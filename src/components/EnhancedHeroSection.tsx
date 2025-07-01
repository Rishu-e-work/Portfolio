
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingCubes from './3D/FloatingCubes';
import EnhancedParticles from './3D/EnhancedParticles';
import Hero3DScene from './3D/Hero3DScene';
import { useAudio } from '../hooks/useAudio';

const EnhancedHeroSection: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const { playHoverSound, playClickSound } = useAudio();

  const titles = [
    "MERN Stack Expert & Innovation Architect",
    "Full Stack Developer & Creative Technologist", 
    "Python Developer & Digital Experience Creator",
    "Building Futuristic Web Experiences with Code & Creativity"
  ];

  useEffect(() => {
    let index = 0;
    const currentTitle = titles[currentTitleIndex];
    
    const timer = setInterval(() => {
      setDisplayText(currentTitle.slice(0, index));
      index++;
      if (index > currentTitle.length) {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [currentTitleIndex]);

  const scrollToSection = (sectionId: string) => {
    playClickSound();
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Background Elements - Fixed positioning */}
      <div className="fixed inset-0 z-0">
        <EnhancedParticles />
      </div>
      
      <div className="absolute inset-0 z-1">
        <FloatingCubes />
      </div>
      
      <div className="absolute inset-0 z-2">
        <Hero3DScene />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Main Name - Single line, horizontally centered */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-orbitron font-black mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 100 }}
          >
            Rishabh Jha
          </motion.h1>
          
          {/* Typewriter Subtitle */}
          <motion.div
            className="h-16 flex items-center justify-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium leading-relaxed">
              {displayText}
              <motion.span 
                className="inline-block w-0.5 h-8 bg-primary ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold text-lg glow hover:glow-lg transition-all duration-300 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(14, 165, 233, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={playHoverSound}
              animate={{ 
                y: [0, -5, 0],
                boxShadow: [
                  "0 0 20px rgba(14, 165, 233, 0.3)",
                  "0 0 40px rgba(14, 165, 233, 0.5)",
                  "0 0 20px rgba(14, 165, 233, 0.3)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 3
              }}
            >
              <span className="relative z-10">View Projects</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="buttonGlow"
              />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary/10 transition-all duration-300 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                borderColor: "hsl(var(--accent))"
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={playHoverSound}
              animate={{ 
                y: [0, -5, 0] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 3.5
              }}
            >
              <span className="relative z-10">Contact Me</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary rounded-full flex justify-center cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-primary rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced gradient overlay - with lower opacity to show 3D elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/30 pointer-events-none z-5" />
    </section>
  );
};

export default EnhancedHeroSection;