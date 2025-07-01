import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack MERN application with advanced features including real-time inventory, payment integration, and admin dashboard.",
    image: "🛍️",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/rishabhja101",
    live: "https://example.com",
  },
  {
    id: 2,
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration, supporting multiple rooms and intelligent message suggestions.",
    image: "🤖",
    tags: ["Python", "Flask", "OpenAI", "WebSocket"],
    github: "https://github.com/rishabhja101",
    live: "https://example.com",
  },
  {
    id: 3,
    title: "Task Management System",
    description: "Collaborative project management tool with drag-and-drop interface, real-time updates, and team collaboration features.",
    image: "📋",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
    github: "https://github.com/rishabhja101",
    live: "https://example.com",
  },
  {
    id: 4,
    title: "Weather Analytics Dashboard",
    description: "Interactive dashboard displaying weather patterns with data visualization and predictive analytics using machine learning.",
    image: "🌤️",
    tags: ["Python", "Django", "Chart.js", "ML"],
    github: "https://github.com/rishabhja101",
    live: "https://example.com",
  },
  {
    id: 5,
    title: "Social Media API",
    description: "RESTful API for social media application with authentication, post management, and real-time notifications.",
    image: "📱",
    tags: ["Java", "Spring Boot", "MySQL", "JWT"],
    github: "https://github.com/rishabhja101",
    live: "https://example.com",
  }
];

const ProjectCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextProject, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentProject = projects[currentIndex];

  return (
    <div
      className="relative w-full max-w-4xl mx-auto perspective-1000"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-10">
        <motion.button
          onClick={prevProject}
          className="p-3 glass rounded-full glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={24} />
        </motion.button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 z-10">
        <motion.button
          onClick={nextProject}
          className="p-3 glass rounded-full glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight size={24} />
        </motion.button>
      </div>

      {/* Project Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="glass rounded-3xl p-8 glow hover:glow-lg transition-all duration-300"
          whileHover={{
            scale: 1.02,
            rotateY: 5,
            rotateX: 2
          }}
        >
          <div className="text-center">
            <div className="text-8xl mb-6">{currentProject.image}</div>

            <h3 className="text-3xl font-orbitron font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {currentProject.title}
            </h3>

            <p className="text-muted-foreground mb-6 text-lg leading-relaxed max-w-2xl mx-auto">
              {currentProject.description}
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {currentProject.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <motion.a
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub
              </motion.a>
              <motion.a
                href={currentProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Live Demo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary scale-125' : 'bg-muted'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
