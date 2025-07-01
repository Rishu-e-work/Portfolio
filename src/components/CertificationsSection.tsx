import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Calendar, Award } from 'lucide-react';

const certifications = [
  {
    id: 1,
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2024",
    category: "Cloud",
    image: "☁️",
    link: "https://aws.amazon.com/certification/",
    description: "Expertise in developing and maintaining applications on AWS platform with best practices."
  },
  {
    id: 2,
    title: "MongoDB Certified Developer",
    issuer: "MongoDB Inc.",
    date: "2023",
    category: "Database",
    image: "🍃",
    link: "https://university.mongodb.com/",
    description: "Advanced knowledge in MongoDB database design, operations, and optimization."
  },
  {
    id: 3,
    title: "React Advanced Certification",
    issuer: "Meta",
    date: "2023",
    category: "Frontend",
    image: "⚛️",
    link: "https://developers.facebook.com/",
    description: "Deep understanding of React ecosystem, hooks, performance optimization, and best practices."
  },
  {
    id: 4,
    title: "Node.js Application Developer",
    issuer: "Node.js Foundation",
    date: "2023",
    category: "Backend",
    image: "🟢",
    link: "https://nodejs.org/",
    description: "Proficiency in building scalable server-side applications using Node.js."
  },
  {
    id: 5,
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2024",
    category: "Cloud",
    image: "☁️",
    link: "https://cloud.google.com/certification",
    description: "Comprehensive knowledge in GCP services, architecture, and deployment strategies."
  },
  {
    id: 6,
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2023",
    category: "DevOps",
    image: "🐳",
    link: "https://www.docker.com/certification",
    description: "Expertise in containerization, orchestration, and modern deployment practices."
  }
];

const CertificationCard: React.FC<{ cert: typeof certifications[0]; index: number; isInView: boolean }> = ({
  cert,
  index,
  isInView
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (window.innerWidth < 768) {
      setIsFlipped((prev) => !prev); // click for mobile
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative h-64 w-full perspective-1000 cursor-pointer"
      onClick={handleFlip}
      onMouseEnter={() => window.innerWidth >= 768 && setIsFlipped(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 will-change-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden glass rounded-2xl p-6 glow">
          <div className="flex flex-col items-center text-center h-full">
            <div className="text-6xl mb-4">{cert.image}</div>
            <h3 className="text-xl font-orbitron font-bold mb-2">{cert.title}</h3>
            <p className="text-muted-foreground mb-2">{cert.issuer}</p>
            <div className="flex items-center gap-2 text-primary">
              <Calendar size={16} />
              <span>{cert.date}</span>
            </div>
            <div className="mt-auto">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                {cert.category}
              </span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden glass rounded-2xl p-6 glow transform rotate-y-180">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-primary" size={20} />
              <h4 className="font-orbitron font-bold">{cert.title}</h4>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
              {cert.description}
            </p>
            <motion.a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span>View Certificate</span>
              <ExternalLink size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CertificationsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-orbitron font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional certifications showcasing expertise across various technologies and platforms
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
