import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Terminal, ChevronRight, Code2, 
  Cpu, Play, Pause, SkipForward, SkipBack, 
  Zap
} from 'lucide-react';

/* ==================================================================================
   STYLE 1: HIGH VOLTAGE (Lightning Gradient)
   ================================================================================== */
const Style1 = ({ data }) => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-dark-950 transition-colors duration-500">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Increased opacity for light mode visibility */}
      <motion.div animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300/50 dark:bg-purple-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
      <motion.div animate={{ x: [0, -50, 0], y: [0, -50, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-300/50 dark:bg-indigo-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
    </div>
    <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ staggerChildren: 0.15, delayChildren: 0.2 }} className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="mb-6"><span className="px-4 py-2 rounded-full bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm">👋 {data.subtitle || 'Hello there!'}</span></div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          <span className="block text-gray-900 dark:text-white">I'm</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 bg-[length:200%_auto] animate-gradient-flow pb-2">{data.name}</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-6 flex items-center gap-3 justify-center lg:justify-start"><span className="h-0.5 w-8 bg-indigo-500 rounded-full inline-block"></span>{data.title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-8">{data.description}</p>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          <a href={data.ctaLink || '#contact'} className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-indigo-600 px-8 font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30">
            <span className="mr-2">{data.ctaText || "Get in Touch"}</span><ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative flex justify-center lg:justify-end">
        <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem]">
          <motion.div className="absolute inset-0 rounded-[2rem] border border-dashed border-gray-300 dark:border-dark-700" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
          <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl bg-gray-50 dark:bg-dark-800">
            {data.profileImage ? <img src={data.profileImage} alt={data.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" /> : <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-white text-8xl font-bold">{data.name.charAt(0)}</div>}
          </div>
        </div>
      </motion.div>
    </div>
    <style>{`@keyframes gradient-flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } .animate-gradient-flow { animation: gradient-flow 3s ease infinite; }`}</style>
  </section>
);

/* ==================================================================================
   STYLE 2: CINEMATIC BLUR (Dot Grid)
   ================================================================================== */
const Style2 = ({ data }) => {
  const blurReveal = { hidden: { filter: 'blur(10px)', opacity: 0, y: 20 }, visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.8 } } };
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-dark-950 transition-colors duration-500">
      {/* Adjusted grid pattern for visibility in both modes */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90 dark:from-dark-950/80 dark:via-transparent dark:to-dark-950/90 pointer-events-none"></div>
      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.2 }} className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <motion.div variants={blurReveal} className="mb-6"><span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-xs font-mono text-gray-700 dark:text-gray-300"><Terminal className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> {data.subtitle || 'System Ready'}</span></motion.div>
          <motion.h1 variants={blurReveal} className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">{data.name}</motion.h1>
          <motion.h2 variants={blurReveal} className="text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-6 flex items-center gap-3 justify-center lg:justify-start"><Code2 className="w-6 h-6 text-gray-500 dark:text-gray-400" /> {data.title}</motion.h2>
          <motion.p variants={blurReveal} className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mb-8">{data.description}</motion.p>
          <motion.div variants={blurReveal} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href={data.ctaLink || '#contact'} className="relative overflow-hidden rounded-lg bg-gray-900 dark:bg-white px-8 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">{data.ctaText || "Contact"}</a>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex justify-center lg:justify-end order-1 lg:order-2">
          <motion.div animate={{ y: [0, -15, 0], rotate: [0, 1, -1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[2rem] rotate-6 opacity-20 blur-xl transform scale-110"></div>
            <div className="relative w-full h-full rounded-[2rem] bg-white dark:bg-dark-800 p-3 shadow-2xl border border-gray-100 dark:border-dark-700">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-gray-100 dark:bg-dark-900 relative">
                {data.profileImage ? <img src={data.profileImage} alt={data.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-gray-300">{data.name.charAt(0)}</div>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ==================================================================================
   STYLE 3: TERMINAL / HACKER (Adapted for Light Mode)
   ================================================================================== */
const Style3 = ({ data }) => (
  // Changed background to gray-50 for light mode, keeping dark-950 for dark mode.
  // Changed text base color to green-700 for better contrast on light backgrounds.
  <section className="min-h-screen flex items-center justify-center relative bg-gray-50 dark:bg-[#0a0a0a] text-green-700 dark:text-green-500 font-mono overflow-hidden transition-colors duration-500">
    {/* Dual-mode grid background */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    
    <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      {/* Terminal window adapted for light mode (white bg, darker borders) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full border border-green-600/20 dark:border-green-500/30 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-gray-100 dark:bg-green-900/20 border-b border-green-600/10 dark:border-green-500/30 p-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-xs text-gray-500 dark:text-green-500/50">bash — {data.slug || 'user'}@portfolio</span>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm opacity-70 mb-2"><ChevronRight className="w-4 h-4" /> <span>whoami</span></div>
            {/* Text colors adapted for light/dark */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">{data.name} <span className="inline-block w-3 h-8 bg-green-600 dark:bg-green-500 animate-pulse align-middle ml-1"/></h1>
            <p className="text-green-700 dark:text-green-400 text-xl font-bold">{data.title}</p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <div className="flex items-center gap-2 text-sm opacity-70 mb-2"><ChevronRight className="w-4 h-4" /> <span>cat description.txt</span></div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed border-l-2 border-green-500/30 pl-4">{data.description}</p>
          </motion.div>
          <div className="pt-4 flex gap-4">
            {/* Button colors adapted */}
            <a href={data.ctaLink || '#contact'} className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white dark:text-black font-bold hover:opacity-90 transition-colors">./contact.sh</a>
          </div>
        </div>
      </motion.div>
      <div className="relative flex justify-center items-center">
        <div className="relative w-72 h-72 md:w-96 md:h-96 border-2 border-dashed border-green-600/30 dark:border-green-500/30 rounded-full flex items-center justify-center p-2">
           <motion.div className="absolute inset-0 border-2 border-dashed border-green-600/20 dark:border-green-500/20 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}/>
           <div className="w-full h-full rounded-full overflow-hidden grayscale relative bg-green-100 dark:bg-green-900/20">
             {data.profileImage ? <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover mix-blend-normal dark:mix-blend-luminosity" /> : <Terminal className="w-32 h-32 text-green-500/50 m-auto mt-32" />}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_50%,rgba(255,255,255,0.1)_50%)] dark:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_2px] pointer-events-none"></div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

/* ==================================================================================
   STYLE 4: ORGANIC FLOW (Morphing)
   ================================================================================== */
const Style4 = ({ data }) => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-dark-950 transition-colors duration-500">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Increased opacity for light mode */}
      <motion.div animate={{ y: [0, -40, 0], x: [0, 20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-200/40 dark:bg-teal-900/10 rounded-full blur-[120px] mix-blend-multiply" />
      <motion.div animate={{ y: [0, -40, 0], x: [0, 20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-0 left-[-200px] w-[600px] h-[600px] bg-blue-200/40 dark:bg-blue-900/10 rounded-full blur-[100px] mix-blend-multiply" />
    </div>
    <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
        <span className="inline-block py-1.5 px-5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm text-sm font-medium tracking-wide text-gray-600 dark:text-gray-300 uppercase mb-6 shadow-sm">{data.subtitle || 'Welcome'}</span>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white leading-[0.9] tracking-tight mb-6">{data.name}<span className="text-teal-500">.</span></h1>
        <div className="text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-300 mb-8">{data.title}</div>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mb-10">{data.description}</p>
        <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
          {data.ctaText && <a href={data.ctaLink || '#contact'} className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-semibold transition-all hover:shadow-2xl">{data.ctaText}</a>}
        </div>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="order-1 lg:order-2 flex justify-center relative">
        <motion.div animate={{ borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="relative w-80 h-80 md:w-[450px] md:h-[450px] overflow-hidden shadow-2xl shadow-teal-500/10 border-[8px] border-white/50 dark:border-white/5 bg-gray-200 dark:bg-gray-800">
          {data.profileImage ? <img src={data.profileImage} alt={data.name} className="w-full h-full object-cover scale-110" /> : <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center"><span className="text-9xl font-bold text-white/20">{data.name.charAt(0)}</span></div>}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ==================================================================================
   STYLE 5: GEOMETRIC TECH (3D Tilt)
   ================================================================================== */
const Style5 = ({ data }) => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-dark-950 perspective-1000 transition-colors duration-500">
    <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-70 animate-pan-grid pointer-events-none"></div>
    <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 items-center">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
        <div className="mb-6"><span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400"><Cpu className="w-3 h-3" /><span>Engineer</span></span></div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Building the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Digital Future</span></h1>
        <h2 className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400 mb-8">Hi, I'm <span className="font-bold text-gray-800 dark:text-gray-200">{data.name}</span>. {data.title}.</h2>
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          {data.ctaText && <a href={data.ctaLink || '#contact'} className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1"><span className="relative flex items-center gap-2">{data.ctaText} <ArrowRight className="w-4 h-4" /></span></a>}
        </div>
      </div>
      <div className="order-1 lg:order-2 flex justify-center perspective-[2000px]">
        <motion.div initial={{ rotateY: 0 }} whileHover={{ rotateY: -10, rotateX: 5, scale: 1.05 }} className="relative w-72 h-80 md:w-96 md:h-[28rem] bg-white dark:bg-dark-800 rounded-3xl p-3 shadow-2xl border border-gray-100 dark:border-dark-700 transition-all duration-500 ease-out transform-style-3d group">
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-900">
            {data.profileImage ? <img src={data.profileImage} alt={data.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-blue-100 to-indigo-100 dark:from-dark-800 dark:to-dark-700"><span className="text-9xl font-black text-blue-200 dark:text-dark-600">{data.name.charAt(0)}</span></div>}
          </div>
        </motion.div>
      </div>
    </div>
    <style>{`@keyframes pan-grid { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } } .animate-pan-grid { animation: pan-grid 60s linear infinite; } .transform-style-3d { transform-style: preserve-3d; }`}</style>
  </section>
);

/* ==================================================================================
   STYLE 6: CYBERPUNK / GLITCH (Adapted for Light/Dark)
   ================================================================================== */
const Style6 = ({ data }) => (
  // Changed base background to gray-100 for light mode, black for dark.
  // Changed base text color to black for light mode.
  <section className="min-h-screen flex items-center justify-center relative bg-gray-100 dark:bg-black overflow-hidden font-mono text-black dark:text-white transition-colors duration-500">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
    <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="order-2 lg:order-1">
        <div className="flex items-center gap-2 mb-4 text-pink-600 dark:text-pink-500">
          <Zap className="w-4 h-4 fill-current" />
          <span className="text-sm font-bold tracking-widest uppercase">System Override</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-6 relative group">
          {/* Glitch layers hidden in light mode for cleaner look, visible in dark mode */}
          <span className="absolute top-0 left-0 -ml-1 text-pink-600 opacity-70 animate-pulse hidden dark:block">{data.name}</span>
          <span className="absolute top-0 left-0 ml-1 text-cyan-600 opacity-70 animate-pulse hidden dark:block">{data.name}</span>
          <span className="relative z-10 text-gray-900 dark:text-white">{data.name}</span>
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-cyan-500 mb-8"></div>
        <p className="text-xl text-gray-700 dark:text-gray-400 mb-8 border-l-4 border-cyan-500 pl-4">{data.title}. {data.description}</p>
        {/* Button colors adapted for light/dark hover states */}
        <button className="relative px-8 py-4 bg-transparent border-2 border-pink-600 dark:border-pink-500 text-pink-600 dark:text-pink-500 font-bold uppercase tracking-widest hover:bg-pink-600 hover:text-white dark:hover:bg-pink-500 dark:hover:text-black transition-all duration-100">
          {data.ctaText || "Initialize"}
        </button>
      </motion.div>
      <div className="order-1 lg:order-2 flex justify-center">
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          <div className="absolute inset-0 border-2 border-cyan-500 translate-x-2 translate-y-2 opacity-50"></div>
          <div className="absolute inset-0 border-2 border-pink-500 -translate-x-2 -translate-y-2 opacity-50"></div>
          {/* Image background and border adapted for light mode */}
          <div className="absolute inset-0 bg-white dark:bg-gray-900 overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-300 border border-gray-200 dark:border-gray-800">
            {data.profileImage ? <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" /> : <div className="w-full h-full bg-gray-200 dark:bg-gray-800"></div>}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ==================================================================================
   MAIN COMPONENT: HeroSection with Theme Controller
   ================================================================================== */
const HeroSection = ({ data }) => {
  const [currentStyle, setCurrentStyle] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Define 6 Styles (Removed 7 & 8)
  const styles = [
    { component: Style1, name: "High Voltage" },
    { component: Style2, name: "Cinematic" },
    { component: Style3, name: "Terminal" },
    { component: Style4, name: "Organic" },
    { component: Style5, name: "Geometric" },
    { component: Style6, name: "Cyberpunk" },
  ];

  // Auto-play logic
  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentStyle((prev) => (prev + 1) % styles.length);
      }, 4000); // Change every 6 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, styles.length]);

  const CurrentHero = styles[currentStyle].component;

  return (
    <div className="relative group/controls">
      {/* Render Current Style with Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <CurrentHero data={data} />
        </motion.div>
      </AnimatePresence>

      {/* --- THEME CONTROLLER WIDGET (Bottom Right) --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        
        {/* Style Name Badge - Adapted colors for light mode visibility */}
        <div className="bg-white/90 dark:bg-black/80 text-gray-900 dark:text-white text-xs px-3 py-1 rounded-lg backdrop-blur-md mb-2 shadow-lg border border-gray-200 dark:border-white/10">
          Current Theme: <span className="font-bold text-cyan-600 dark:text-cyan-400">{styles[currentStyle].name}</span>
        </div>

        {/* Control Bar - Adapted colors for light mode visibility */}
        <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-full shadow-2xl transition-all duration-300 hover:scale-105">
          
          {/* Prev */}
          <button 
            onClick={() => { setIsAutoPlay(false); setCurrentStyle((prev) => (prev === 0 ? styles.length - 1 : prev - 1)); }}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play/Pause */}
          <button 
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`p-2 rounded-full transition-all ${isAutoPlay ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white'}`}
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Next */}
          <button 
            onClick={() => { setIsAutoPlay(false); setCurrentStyle((prev) => (prev + 1) % styles.length); }}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="w-px h-4 bg-gray-300 dark:bg-white/20 mx-1"></div>

          {/* Mini Dots for Direct Selection */}
          <div className="flex gap-1 pr-2">
            {styles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setIsAutoPlay(false); setCurrentStyle(idx); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStyle ? 'bg-cyan-600 dark:bg-cyan-400 scale-150' : 'bg-gray-400 dark:bg-white/30 hover:bg-gray-600 dark:hover:bg-white/80'
                }`}
                title={styles[idx].name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;