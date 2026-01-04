import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

const CertificatesSection = ({ data }) => {
  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
  };

  return (
    <section id="certificates" className="py-24 relative bg-gray-50 dark:bg-dark-950 overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-30 dark:opacity-10">
          <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-blue-200/40 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
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
            Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Certifications</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mx-auto"></div>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative flex flex-col h-full bg-white dark:bg-dark-900 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-800 overflow-hidden hover:shadow-xl hover:border-blue-100 dark:hover:border-blue-900/30 transition-all duration-300"
            >
              {/* Optional Certificate Image with Zoom Effect */}
              {cert.image && (
                <div className="relative h-48 w-full overflow-hidden border-b border-gray-100 dark:border-dark-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60"></div>
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  {/* Overlay Icon on Image */}
                  <div className="absolute bottom-4 left-4 z-20 p-2 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 text-white">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                {/* Header: Icon & Link */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl transition-colors duration-300 ${cert.image ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'}`}>
                    <Award className="w-6 h-6" />
                  </div>
                  
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all"
                      title="Verify Credential"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4 line-clamp-1">
                  Issued by <span className="text-gray-900 dark:text-white font-semibold">{cert.issuer}</span>
                </p>

                {/* Footer: Date */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-dark-800 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>Issued on {cert.date}</span>
                </div>
              </div>
              
              {/* Bottom Glow Bar */}
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificatesSection;