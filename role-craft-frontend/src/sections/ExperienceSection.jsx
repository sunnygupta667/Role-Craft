import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, CheckCircle, Zap, AlertCircle } from 'lucide-react';

const ExperienceSection = ({ data }) => {
  // --- ANIMATION VARIANTS ---
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30, y: 20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 15 } 
    },
  };

  // ✅ Debugging / Safety Check
  if (!data) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading experience data...
      </div>
    );
  }

  return (
    <section id="experience" className="py-32 relative bg-gray-50 dark:bg-dark-950 overflow-hidden transition-colors duration-300">
      
      {/* 1. Dynamic Background Energy Fields */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="container-custom relative z-10">
        
        {/* Header - Configured to animate immediately (animate="visible") to ensure visibility */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Triggers when 20% visible
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-6 font-semibold tracking-wider uppercase text-xs shadow-sm">
            <Zap className="w-4 h-4 fill-current" /> Career Path
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Journey</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto shadow-lg shadow-indigo-500/20"></div>
        </motion.div>

        {/* Timeline Container */}
        {data.length === 0 ? (
          <div className="text-center p-10 bg-white/50 dark:bg-dark-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-dark-700">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No experience added yet.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Less aggressive viewport trigger
            className="max-w-5xl mx-auto relative pl-4 md:pl-0"
          >
            {/* 2. The Electric Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 h-full bg-gray-200 dark:bg-dark-800 overflow-hidden rounded-full z-0">
              <motion.div 
                className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-50 dark:opacity-80"
                animate={{ top: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {data.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className={`relative flex flex-col md:flex-row items-center mb-16 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Spacer for Desktop Alternating Layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Center Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                    <div className="relative w-12 h-12 rounded-full bg-white dark:bg-dark-900 border-4 border-indigo-100 dark:border-dark-800 shadow-xl flex items-center justify-center">
                      <div className="w-4 h-4 bg-indigo-600 dark:bg-indigo-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 rounded-full border border-indigo-500 opacity-0 animate-ping-slow"></div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 text-left' : 'md:pl-16 text-left'}`}>
                    <div className="group relative bg-white dark:bg-dark-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-dark-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 z-10">
                      
                      {/* Glowing Border Gradient on Hover */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>

                      <div className="flex flex-col gap-4 relative z-10">
                        
                        {/* Header */}
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {exp.position}
                            </h3>
                            {exp.current && (
                              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {exp.company}
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 pb-4 border-b border-gray-100 dark:border-dark-800">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {exp.duration}
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              {exp.location}
                            </div>
                          )}
                        </div>

                        {/* Description & Responsibilities */}
                        <div className="space-y-4">
                          {exp.description && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                              {exp.description}
                            </p>
                          )}
                          
                          {exp.responsibilities && exp.responsibilities.length > 0 && (
                            <ul className="space-y-2">
                              {exp.responsibilities.map((resp, i) => (
                                <motion.li 
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * i }}
                                  className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 group/li"
                                >
                                  <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-indigo-400 group-hover/li:bg-indigo-600 dark:group-hover/li:bg-indigo-400 transition-colors"></span>
                                  <span>{resp}</span>
                                </motion.li>
                              ))}
                            </ul>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;