import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe, Eye, FileText, Download } from 'lucide-react';

const ContactSection = ({ data, resume }) => {
  // --- ANIMATION VARIANTS ---

  // Staggered container entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Snappy spring entrance for items
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
  };

  // Continuous floating animation for the resume preview
  const floatAnimation = {
    y: [0, -12, 0],
    rotateX: [0, 5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }
  };

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    website: Globe,
  };

  // Helper Functions (Kept the same)
  const getThumbnailUrl = (url) => {
    if (!url) return '';
    if (url.includes('cloudinary.com') && url.endsWith('.pdf')) {
        return url.replace(/\.pdf$/, '.jpg');
    }
    return ''; 
  };

  const getDownloadUrl = (url, filename) => {
    if (!url) return '#';
    const cleanName = filename 
      ? filename.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9_]/gi, '_') 
      : 'resume';
    return url.replace('/upload/', `/upload/fl_attachment:${cleanName}/`);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gray-50 dark:bg-dark-950">
      
      {/* Subtle Background Elements (Optional decorative blobs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200/30 dark:bg-primary-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Let's Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400">Touch</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            {/* Left Column: Contact Info & Socials */}
            <div className="space-y-10">
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  Contact Details
                  <span className="h-px flex-1 bg-gray-200 dark:bg-dark-700 ml-4"></span>
                </h3>
                
                <div className="space-y-5">
                  {/* Reusable Contact Card Component Structure */}
                  {data?.email && (
                    <ContactCard 
                      icon={Mail} 
                      label="Email" 
                      value={data.email} 
                      href={`mailto:${data.email}`} 
                      delay={0}
                    />
                  )}
                  {data?.phone && (
                    <ContactCard 
                      icon={Phone} 
                      label="Phone" 
                      value={data.phone} 
                      href={`tel:${data.phone}`} 
                      delay={0.1}
                    />
                  )}
                  {data?.address && (data.address.street || data.address.city) && (
                     <ContactCard 
                     icon={MapPin} 
                     label="Location" 
                     value={[data.address.city, data.address.country].filter(Boolean).join(', ')}
                     subValue={[data.address.street, data.address.state, data.address.zipCode].filter(Boolean).join(', ')}
                     delay={0.2}
                   />
                  )}
                </div>
              </motion.div>

              {/* Socials */}
              {data?.social && (
                <motion.div variants={itemVariants}>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    Connect Externally
                    <span className="h-px flex-1 bg-gray-200 dark:bg-dark-700 ml-4"></span>
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(data.social).map(([platform, url], index) => {
                      if (!url) return null;
                      const Icon = socialIcons[platform];
                      if (!Icon) return null;
                      return (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all group relative overflow-hidden"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {/* Gradient hover background */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/50 to-purple-100/50 dark:from-primary-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <Icon className="w-6 h-6 relative z-10" />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column: Resume Preview */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3 w-full">
                  My Resume
                  <span className="h-px flex-1 bg-gray-200 dark:bg-dark-700 ml-4"></span>
                </h3>

              <div className="w-full max-w-[400px] perspective-1000">
                {resume?.url ? (
                  <div className="flex flex-col gap-6">
                    {/* Floating Thumbnail Container */}
                    <motion.div
                       animate={floatAnimation}
                       className="relative z-10"
                    >
                      <a 
                        href={resume.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        // Added glassmorphism and depth shadows here
                        className="block group relative rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[3px] border-white dark:border-dark-800 bg-white dark:bg-dark-900 transform-gpu transition-transform duration-300 hover:scale-[1.02]"
                      >
                        <div className="aspect-[1/1.41] w-full bg-gray-100 dark:bg-dark-800 relative flex items-center justify-center overflow-hidden">
                          {/* Image with zoom effect on hover */}
                          <img 
                            src={getThumbnailUrl(resume.url)} 
                            alt="Resume Preview" 
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.target.style.display = 'none'; 
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          
                          {/* Fallback */}
                          <div className="hidden absolute inset-0 flex-col items-center justify-center text-gray-400 bg-gray-50 dark:bg-dark-800/50">
                            <FileText className="w-16 h-16 mb-2 opacity-50" />
                            <span className="text-sm font-medium">Preview Unavailable</span>
                          </div>

                          {/* Sleek Hover Overlay with blurred backdrop */}
                          <div className="absolute inset-0 bg-dark-950/30 dark:bg-dark-950/50 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                            <motion.div 
                              initial={{ scale: 0.5, opacity: 0 }}
                              whileHover={{ scale: 1.1 }}
                              className="bg-white/90 dark:bg-dark-800/90 p-4 rounded-full shadow-lg mb-3 text-primary-600 dark:text-primary-400"
                            >
                              <Eye className="w-8 h-8" />
                            </motion.div>
                            <span className="text-white font-bold text-lg tracking-wide translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                              View Document
                            </span>
                          </div>
                        </div>
                         {/* Subtle reflection effect at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none mix-blend-overlay"></div>
                      </a>
                    </motion.div>

                    {/* Stylish Download Button */}
                    <motion.a 
                      href={getDownloadUrl(resume.url, resume.filename)} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-xl p-[2px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-900"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                       {/* Animated Gradient Border */}
                       <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#0ea5e9_50%,#E2E8F0_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#1e293b_0%,#0ea5e9_50%,#1e293b_100%)]" />
                      
                      {/* Button Content */}
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-white dark:bg-dark-900 px-8 py-4 text-sm font-bold text-gray-900 dark:text-white backdrop-blur-3xl transition-all group-hover:bg-gray-50 dark:group-hover:bg-dark-800 relative z-10 gap-3">
                        <Download className="w-5 h-5 text-primary-600 group-hover:animate-bounce" /> 
                        Download Resume
                      </span>
                    </motion.a>
                  </div>
                ) : (
                  <div className="card p-10 text-center border-dashed border-2 border-gray-200 dark:border-dark-700 rounded-2xl bg-gray-50/50 dark:bg-dark-800/50">
                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Resume not currently available</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Local Sub-Component for Cleaner Contact Cards ---
const ContactCard = ({ icon: Icon, label, value, subValue, href, delay }) => {
  const Wrapper = href ? motion.a : motion.div;
  const props = href ? { href, target: href.startsWith('http') ? "_blank" : undefined, rel: "noopener noreferrer" } : {};

  return (
    <Wrapper
      {...props}
      // Glassmorphism card style with hover gradient border effect
      className="flex items-center gap-5 p-5 rounded-2xl bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border border-gray-100/50 dark:border-dark-700/50 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
      whileHover={{ y: -5, scale: 1.01 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay + 0.2, type: "spring" }}
    >
       {/* Hover Gradient Background overlay */}
       <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent dark:from-primary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 p-4 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-dark-800 rounded-xl text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300 shadow-inner">
        <Icon className="w-6 h-6" />
      </div>
      <div className="relative z-10">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{value}</p>
        {subValue && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subValue}</p>}
      </div>
    </Wrapper>
  )
}

export default ContactSection;