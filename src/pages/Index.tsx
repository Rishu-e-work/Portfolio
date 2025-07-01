
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useEasterEgg } from '../hooks/useEasterEgg';
import LoadingScreen from '../components/LoadingScreen';
import ThemeToggle from '../components/ThemeToggle';
import AudioControls from '../components/AudioControls';
import EnhancedNavigation from '../components/EnhancedNavigation';
import EnhancedHeroSection from '../components/EnhancedHeroSection';
import EnhancedAboutSection from '../components/EnhancedAboutSection';
import ProjectsSection from '../components/ProjectsSection';
import CertificationsSection from '../components/CertificationsSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isActivated } = useEasterEgg();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ThemeToggle />
              <AudioControls />
              <EnhancedNavigation />
              
              <main>
                <EnhancedHeroSection />
                <EnhancedAboutSection />
                <ProjectsSection />
                <CertificationsSection />
                <ContactSection />
              </main>
              
              <motion.footer 
                className="py-8 text-center text-muted-foreground border-t border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.p
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  © 2025 Rishabh Jha. Built with ❤️ using React, Three.js & Framer Motion
                </motion.p>
              </motion.footer>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Easter egg visual feedback */}
        {isActivated && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50 bg-gradient-to-r from-primary/20 to-accent/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2 }}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;
