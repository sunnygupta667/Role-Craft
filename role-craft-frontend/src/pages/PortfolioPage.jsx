import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioAPI } from '../services/api';
import { ArrowUp, Heart, Code, Activity } from 'lucide-react'; // Added icons for footer

import Loading from '../components/Loading';
import ThemeToggle from '../components/ThemeToggle';
import HeroSection from '../sections/HeroSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import ExperienceSection from '../sections/ExperienceSection';
import EducationSection from '../sections/EducationSection';
import CertificatesSection from '../sections/CertificatesSection';
import ContactSection from '../sections/ContactSection';

const PortfolioPage = () => {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, [slug]);

  useEffect(() => {
    if (portfolio) {
      const prefersDark = portfolio.theme === 'dark';
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [portfolio]);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getBySlug(slug);
      setPortfolio(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError(err.response?.data?.message || 'Portfolio not found');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (loading) return <Loading text="Loading portfolio..." />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-950 px-4">
        <div className="text-center max-w-md w-full bg-white dark:bg-dark-900 p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
          <a href="/" className="btn-primary w-full block text-center py-3 rounded-lg font-medium">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  if (!portfolio) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-dark-950 transition-colors duration-500"
    >
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      <main className="relative z-10">
        <HeroSection data={portfolio.hero} />
        
        {portfolio.skills?.length > 0 && <SkillsSection data={portfolio.skills} />}
        
        {portfolio.projects?.length > 0 && <ProjectsSection data={portfolio.projects} />}
        
        {portfolio.experience?.length > 0 && <ExperienceSection data={portfolio.experience} />}
        
        {portfolio.education?.length > 0 && <EducationSection data={portfolio.education} />}
        
        {portfolio.certificates?.length > 0 && <CertificatesSection data={portfolio.certificates} />}
        
        {portfolio.contact && <ContactSection data={portfolio.contact} resume={portfolio.resume} />}
      </main>

      {/* --- COOL ANIMATED FOOTER --- */}
      <footer className="relative pt-20 pb-10 overflow-hidden">
        {/* Background Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-dark-700 to-transparent"></div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="rounded-3xl bg-white/50 dark:bg-dark-900/50 backdrop-blur-xl border border-white/60 dark:border-dark-700 shadow-2xl dark:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] p-8 md:p-12 overflow-hidden group"
          >
            {/* Animated Glow on Hover */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Left: Branding & Status */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">System Operational</span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portfolio.hero.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Building digital experiences, one pixel at a time.
                  </p>
                </div>
              </div>

              {/* Right: Actions & Credits */}
              <div className="flex flex-col items-center md:items-end gap-4">
                
                {/* Tech Badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-sm text-gray-600 dark:text-gray-300">
                  <Code className="w-4 h-4 text-blue-500" />
                  <span>Engineer With New Mindset</span>
                </div>

                <div className="flex items-center gap-6">
                  <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    © {new Date().getFullYear()} <span className="hidden sm:inline">All rights reserved.</span>
                  </p>

                  {/* Scroll to Top Button */}
                  <motion.button
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black shadow-lg hover:shadow-xl transition-all"
                    aria-label="Scroll to top"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Decorative Background Text */}
            <div className="absolute -bottom-4 -right-4 text-[10rem] font-black text-gray-500/5 dark:text-white/5 pointer-events-none select-none leading-none z-[-1]">
              PORTFOLIO
            </div>
          </motion.div>
        </div>
      </footer>
    </motion.div>
  );
};

export default PortfolioPage;