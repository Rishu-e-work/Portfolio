
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { toast } from 'sonner';

const ContactSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Rishu-e-work',
      icon: '🔗',
      color: 'hover:text-black-600'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rishabh-jhaa-/',
      icon: '💼',
      color: 'hover:text-blue-900'
    },
    {
      name: 'Twitter',
      url: 'x.com',
      icon: '🐦',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      url: 'mailto:rishabh.e.work@gmail.com',
      icon: '📧',
      color: 'hover:text-green-500'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-orbitron font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass rounded-2xl p-8 glow">
              <h3 className="text-2xl font-orbitron font-bold mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                    📍
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted-foreground">{`Delhi,India`}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                    📧
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">{`rishabh.e.work@gmail.com`}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                    💼
                  </div>
                  <div>
                    <h4 className="font-semibold">Availability</h4>
                    <p className="text-muted-foreground">Open to opportunities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 glow">
              <h3 className="text-2xl font-orbitron font-bold mb-6">Reach Out</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-primary/20 transition-all duration-300 ${link.color}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 glow space-y-6">
              <h3 className="text-2xl font-orbitron font-bold mb-6">Send Message</h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg glow hover:bg-primary/90 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message 🚀
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
