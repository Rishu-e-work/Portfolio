
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCarousel from './ProjectCarousel';

const ProjectsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-orbitron font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my latest works showcasing innovative solutions and cutting-edge technologies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProjectCarousel />
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
