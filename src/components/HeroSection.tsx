import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingCubes from './3D/FloatingCubes';
import InteractiveParticles from './3D/InteractiveParticles';

const HeroSection: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Building Futuristic Web Experiences with Code & Creativity";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <InteractiveParticles />
      <FloatingCubes />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-orbitron font-black mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Rishabh Jha
          </motion.h1>
          
          <motion.div
            className="h-20 flex items-center justify-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl">
              {displayText}
              <span className="animate-blink">|</span>
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 glow hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold text-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
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
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
