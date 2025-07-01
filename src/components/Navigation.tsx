
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="glass rounded-2xl px-8 py-4 glow">
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/20 rounded-lg -z-10"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navigation;
