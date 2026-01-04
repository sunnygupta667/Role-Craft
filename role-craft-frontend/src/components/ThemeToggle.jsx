import { Moon, Sun, Sparkles, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 group"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      aria-label="Toggle Theme"
    >
      {/* 1. The Glowing Aura (Background Pulse) */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-xl opacity-60 transition-colors duration-500 ${
          isDark 
            ? 'bg-indigo-500' 
            : 'bg-orange-400'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. The Main Orb Container */}
      <motion.div
        className={`relative flex items-center justify-center w-12 h-12 rounded-full border shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-500 ${
          isDark
            ? 'bg-slate-900/80 border-indigo-500/30 shadow-indigo-500/20'
            : 'bg-white/80 border-orange-400/30 shadow-orange-500/20'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Animated Icon Swap */}
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ y: -20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Moon Icon */}
              <Moon className="w-6 h-6 text-indigo-300 fill-indigo-300/20" />
              
              {/* Tiny Stars Decoration */}
              <motion.div 
                className="absolute -top-1 -right-1"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-2 h-2 text-white" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Sun Icon */}
              <Sun className="w-6 h-6 text-orange-500 fill-orange-500" />
              
              {/* Tiny Ray/Cloud Decoration */}
              <motion.div 
                className="absolute -bottom-1 -left-1 opacity-50"
                animate={{ x: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Cloud className="w-3 h-3 text-orange-300 fill-current" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;