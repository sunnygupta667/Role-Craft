import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Sparkles } from 'lucide-react';

const EducationSection = ({ data }) => {
  // --- ANIMATION VARIANTS (Optimized for GPU) ---
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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 70, 
        damping: 15, 
        mass: 1 
      } 
    },
  };

  return (
    <section id="education" className="py-24 relative bg-gray-50 dark:bg-dark-950 overflow-hidden">
      
      {/* 🎨 Performance-friendly Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute top-[10%] left-[-5%] w-80 h-80 bg-purple-200/40 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-[20%] right-[-5%] w-80 h-80 bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-indigo-400">Journey</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full mx-auto shadow-lg shadow-purple-500/20"></div>
        </motion.div>

        {/* Education Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {data?.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative"
            >
              {/* Card Container (Glassmorphism) */}
              <div className="h-full p-8 rounded-3xl bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border border-gray-100 dark:border-dark-700 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/10 group-hover:border-purple-200 dark:group-hover:border-purple-900/50 overflow-hidden">
                
                {/* Decorative Background Icon (Subtle) */}
                <div className="absolute -right-6 -bottom-6 opacity-[0.03] dark:opacity-[0.05] transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen className="w-48 h-48" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header: Icon & Degree */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className="relative shrink-0">
                      {/* Icon Background Glow */}
                      <div className="absolute inset-0 bg-purple-200 dark:bg-purple-900/40 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Icon Container */}
                      <div className="relative p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-dark-800 dark:to-dark-700 rounded-2xl border border-purple-100 dark:border-dark-600 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 tracking-wide">
                          {edu.field}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Institution Name */}
                  <div className="mb-6">
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      {edu.institution}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-dark-700 to-transparent mb-6"></div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-auto text-sm text-gray-600 dark:text-gray-400">
                    {edu.duration && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>{edu.duration}</span>
                      </div>
                    )}
                    {edu.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        <span>{edu.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Grade Badge (If exists) */}
                  {edu.grade && (
                    <motion.div 
                      className="mt-6 inline-flex items-center gap-2 self-start px-4 py-2 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-semibold"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles className="w-4 h-4 fill-current" />
                      <span>Grade: {edu.grade}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;