import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'React', level: 95, icon: '⚛️' },
  { name: 'Node.js', level: 90, icon: '🟢' },
  { name: 'Python', level: 88, icon: '🐍' },
  { name: 'Java', level: 85, icon: '☕' },
  { name: 'MongoDB', level: 82, icon: '🍃' },
  { name: 'TypeScript', level: 92, icon: '📘' },
  { name: 'Next.js', level: 88, icon: '▲' },
  { name: 'AWS', level: 75, icon: '☁️' },
];

const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 px-4 relative bg-background text-foreground transition-colors">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-orbitron font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Developer Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 glow">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>

              <h3 className="text-2xl font-orbitron font-bold mb-4 text-center">
                Full Stack Developer
              </h3>

              <p className="text-muted-foreground text-center leading-relaxed">
                Passionate about creating innovative digital solutions that bridge the gap between 
                design and functionality. With expertise in modern web technologies, I craft 
                experiences that are not just visually stunning but also highly performant and scalable.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="glass rounded-xl p-4 text-center glow">
                <div className="text-3xl font-orbitron font-bold text-primary">50+</div>
                <div className="text-muted-foreground">Projects</div>
              </div>
              <div className="glass rounded-xl p-4 text-center glow">
                <div className="text-3xl font-orbitron font-bold text-primary">3+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-orbitron font-bold mb-8 text-center">
              Technical Skills
            </h3>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="glass rounded-xl p-4 glow hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="font-semibold">{skill.name}</span>
                    </div>
                    <span className="text-primary font-bold">{skill.level}%</span>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
