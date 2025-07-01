import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'React', level: 95, icon: '⚛️', category: 'Frontend' },
  { name: 'Node.js', level: 90, icon: '🟢', category: 'Backend' },
  { name: 'Python', level: 88, icon: '🐍', category: 'Language' },
  { name: 'Java', level: 85, icon: '☕', category: 'Language' },
  { name: 'MongoDB', level: 82, icon: '🍃', category: 'Database' },
  { name: 'TypeScript', level: 92, icon: '📘', category: 'Language' },
  { name: 'Next.js', level: 88, icon: '▲', category: 'Framework' },
  { name: 'AWS', level: 75, icon: '☁️', category: 'Cloud' }
];

const EnhancedAboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden">
      <motion.div 
        className="max-w-6xl mx-auto" 
        ref={ref}
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl font-orbitron font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            whileInView={{ scale: [0.9, 1.05, 1] }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Developer Card + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* 🔥 Full Stack Developer Card */}
            <motion.div 
              className="glass rounded-2xl p-8 text-center glow"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-32  h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent p-1"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 1 }}
              >
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </motion.div>

              <motion.h3 
                className="text-2xl font-orbitron font-bold mb-4"
                whileInView={{ 
                  scale: [1, 1.1, 1],
                  color: ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--primary))"]
                }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                Full Stack Developer
              </motion.h3>

              <motion.p 
                className="text-muted-foreground leading-relaxed text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Passionate about creating innovative digital solutions that bridge the gap between 
                design and functionality. With expertise in modern web technologies, I craft 
                experiences that are not just visually stunning but also highly performant and scalable.
              </motion.p>
            </motion.div>

            {/* Stat Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Projects', value: '10+' },
                { label: 'Year of Experience', value: '1' },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="glass rounded-xl p-4 text-center glow"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-3xl font-orbitron font-bold text-primary"
                    whileInView={{ 
                      scale: [1, 1.2, 1],
                      color: ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--primary))"]
                    }}
                    transition={{ duration: 2, delay: 1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Skills */}
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
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="glass rounded-xl p-4 glow hover:glow-lg transition-all duration-300 group"
                  whileHover={{ 
                    scale: 1.02,
                    x: 10
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <motion.span 
                        className="text-2xl"
                        whileHover={{ 
                          scale: 1.3,
                          rotate: 360
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {skill.icon}
                      </motion.span>
                      <div>
                        <span className="font-semibold">{skill.name}</span>
                        <div className="text-xs text-muted-foreground">{skill.category}</div>
                      </div>
                    </div>
                    <motion.span 
                      className="text-primary font-bold"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.3 + index * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default EnhancedAboutSection;
