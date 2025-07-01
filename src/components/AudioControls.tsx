
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

const AudioControls: React.FC = () => {
  const { config, toggleMute } = useAudio();

  return (
    <motion.button
      onClick={toggleMute}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed top-6 right-24 z-50 flex items-center gap-2 glass rounded-full px-4 py-3 glow hover:glow-lg transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {config.isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      <span className="text-sm font-medium">
        {config.isMuted ? 'Audio Off' : 'Audio On'}
      </span>
    </motion.button>
  );
};

export default AudioControls;
