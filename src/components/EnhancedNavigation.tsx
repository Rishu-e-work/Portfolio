import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const EnhancedNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  // Track scroll for active section and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Desktop Nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, type: 'spring', stiffness: 100, damping: 20 }}
        className="hidden md:flex fixed top-6 left-1/8 transform -translate-x-1/2 z-40 w-full justify-center"
      >
        <div className="glass rounded-2xl px-8 py-4 glow backdrop-blur-xl mx-auto">
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 font-medium text-center transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/20 rounded-lg -z-10"
                      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Nav Toggle */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <button 
          className="p-3 bg-background/60 backdrop-blur-lg rounded-xl glow"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-20 right-6 z-40 bg-background/90 backdrop-blur-xl rounded-xl p-6 glow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col space-y-4 text-right">
              {navItems.map(item => (
                <motion.li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-lg font-medium ${
                      activeSection === item.id
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedNavigation;
