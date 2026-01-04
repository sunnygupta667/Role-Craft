import { motion } from 'framer-motion';
import { Code2, Server, Database, Layout, Terminal, Cpu, Globe, Zap, Hexagon } from 'lucide-react';

const SkillsSection = ({ data }) => {
  
  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 } 
    },
  };

  // Helper to pick an icon based on category name
  const getIconForCategory = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('front') || name.includes('web')) return <Layout className="w-8 h-8" />;
    if (name.includes('back') || name.includes('server')) return <Server className="w-8 h-8" />;
    if (name.includes('data')) return <Database className="w-8 h-8" />;
    if (name.includes('tool') || name.includes('devops')) return <Terminal className="w-8 h-8" />;
    if (name.includes('language') || name.includes('core')) return <Code2 className="w-8 h-8" />;
    if (name.includes('network') || name.includes('cloud')) return <Globe className="w-8 h-8" />;
    return <Cpu className="w-8 h-8" />;
  };

  return (
    <section id="skills" className="py-32 relative bg-gray-50 dark:bg-dark-950 overflow-hidden perspective-1000 transition-colors duration-300">
      
      {/* 1. Animated Hexagon Background Pattern */}
      {/* Adjusted colors for visibility in Light Mode */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-gray-200 dark:text-cyan-900/20"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%", 
                scale: Math.random() * 0.5 + 0.5,
                rotate: 0 
              }}
              animate={{ 
                y: [null, Math.random() * 100 + "%"],
                rotate: 360 
              }}
              transition={{ 
                duration: Math.random() * 20 + 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Hexagon size={Math.random() * 100 + 50} strokeWidth={1.5} />
            </motion.div>
         ))}
      </div>

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-cyan-900/30 border border-gray-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400 mb-6 font-bold tracking-wider uppercase text-xs shadow-sm">
            <Zap className="w-4 h-4 fill-current" /> Skillset
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Arsenal</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive breakdown of my technical capabilities and proficiency levels.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative h-full"
            >
              {/* Glowing Border Gradient (Visible on Hover) */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[20px] opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>
              
              {/* Card Content */}
              {/* Added border-gray-200 for light mode visibility */}
              <div className="relative h-full bg-white dark:bg-dark-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-dark-800 flex flex-col items-center text-center transition-colors duration-300">
                
                {/* Floating Category Icon */}
                <div className="relative mb-8">
                  {/* Glow effect behind icon - lighter in light mode */}
                  <div className="absolute inset-0 bg-cyan-100 dark:bg-cyan-400/20 blur-xl rounded-full scale-150 animate-pulse"></div>
                  
                  {/* Icon Container */}
                  <div className="relative w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-700 rounded-2xl rotate-45 flex items-center justify-center shadow-inner border border-gray-100 dark:border-white/10 group-hover:rotate-[225deg] transition-transform duration-700 ease-in-out">
                    <div className="-rotate-45 group-hover:-rotate-[225deg] transition-transform duration-700 text-cyan-600 dark:text-cyan-400">
                      {getIconForCategory(category.category)}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {category.category}
                </h3>

                {/* Circular Skills List */}
                <div className="w-full grid grid-cols-2 gap-x-4 gap-y-8">
                  {category.items?.map((skill, skillIdx) => (
                    <div key={skillIdx} className="flex flex-col items-center gap-3 group/skill">
                      {/* Radial Progress Circle */}
                      <div className="relative w-16 h-16">
                        <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                          {/* Background Circle - Darker gray in light mode for visibility */}
                          <path
                            className="text-gray-200 dark:text-dark-800"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          {/* Progress Circle (Animated) */}
                          <motion.path
                            className="text-cyan-500 dark:text-cyan-400 drop-shadow-md"
                            initial={{ strokeDasharray: "0, 100" }}
                            whileInView={{ strokeDasharray: `${skill.level}, 100` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5 + (skillIdx * 0.1), ease: "easeOut" }}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        {/* Percentage Text - Darker in light mode */}
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">
                          {skill.level}%
                        </div>
                      </div>
                      
                      {/* Skill Name - Darker in light mode */}
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover/skill:text-cyan-700 dark:group-hover/skill:text-cyan-400 transition-colors line-clamp-1">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Decorative Corner Lines */}
                <svg className="absolute top-0 left-0 w-16 h-16 text-cyan-600/10 dark:text-cyan-400/10 pointer-events-none" viewBox="0 0 100 100">
                   <path d="M0 0 L40 0 L0 40 Z" fill="currentColor" />
                </svg>
                <svg className="absolute bottom-0 right-0 w-16 h-16 text-blue-600/10 dark:text-blue-400/10 pointer-events-none rotate-180" viewBox="0 0 100 100">
                   <path d="M0 0 L40 0 L0 40 Z" fill="currentColor" />
                </svg>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;