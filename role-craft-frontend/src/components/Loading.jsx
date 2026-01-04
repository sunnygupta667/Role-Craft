import { motion } from 'framer-motion';

const Loading = ({ text = 'Initializing System...' }) => {
  
  // --- VARIANTS ---
  const containerVariants = {
    start: { transition: { staggerChildren: 0.2 } },
    end: {}
  };

  const dotVariants = {
    start: { y: "0%" },
    end: { y: "100%" }
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-dark-950 overflow-hidden relative z-[9999]">
      
      {/* Optional Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative w-24 h-24 mb-10">
        
        {/* Ring 1: Outer Slow (Cyan) */}
        <motion.span
          className="absolute inset-0 rounded-full border-b-4 border-cyan-500 dark:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Ring 2: Middle Medium Reverse (Indigo) */}
        <motion.span
          className="absolute inset-2 rounded-full border-r-4 border-indigo-600 dark:border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Ring 3: Inner Fast (Purple) */}
        <motion.span
          className="absolute inset-4 rounded-full border-t-4 border-purple-500 dark:border-purple-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Core: Breathing */}
        <motion.div
          className="absolute inset-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-lg"
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Loading Text with "Wave" Dots */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-widest uppercase">
          {text}
        </h2>
        
        {/* Animated Loading Dots Bar */}
        <motion.div 
          className="flex gap-1 h-2"
          variants={containerVariants}
          initial="start"
          animate="end"
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="w-1.5 h-full bg-indigo-500 dark:bg-indigo-400 rounded-full"
              variants={dotVariants}
              transition={{ ...dotTransition, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default Loading;