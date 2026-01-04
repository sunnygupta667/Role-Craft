import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, CheckCircle, XCircle, ArrowRight, KeyRound } from 'lucide-react'; // Added KeyRound icon
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.png'; 

/* --- TOAST COMPONENT --- */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border ${
        isSuccess 
          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400' 
          : 'bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400'
      }`}
    >
      <div className={`p-2 rounded-full ${isSuccess ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
        {isSuccess ? <CheckCircle size={20} /> : <XCircle size={20} />}
      </div>
      <div>
        <h4 className="font-bold text-sm">{isSuccess ? 'Success' : 'Error'}</h4>
        <p className="text-xs opacity-90">{message}</p>
      </div>
    </motion.div>
  );
};

/* --- MAIN LOGIN PAGE --- */
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // State
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const result = await login(formData);

      if (result.success) {
        setToast({ message: 'Welcome back, Administrator.', type: 'success' });
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      } else {
        setToast({ message: result.message || 'Invalid credentials', type: 'error' });
        setLoading(false);
      }
    } catch (err) {
      setToast({ message: 'Server connection failed', type: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-dark-950 transition-colors duration-500">
      
      {/* 1. Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-400/20 dark:bg-primary-900/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 50, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-900/20 rounded-full blur-[100px]" 
        />
      </div>

      {/* 2. Toast Container */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>

      {/* 3. Main Content */}
      <div className="w-full max-w-md relative z-10 p-6 flex flex-col items-center">
        
        {/* --- BRANDING HEADER --- */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            className="relative group"
          >
            {/* Glowing Aura */}
            <div className="absolute inset-0 bg-primary-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            {/* Glass Logo Container */}
            <div className="relative w-24 h-24 bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
              <img src={logoImg} alt="RoleCraft Logo" className="w-16 h-16 object-contain drop-shadow-md" />
            </div>
          </motion.div>

          {/* Text Reveal */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-4xl font-black tracking-tight text-center"
          >
            <span className="text-gray-900 dark:text-white">Role</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Craft</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 tracking-wide uppercase"
          >
            Admin Portal
          </motion.p>
        </div>

        {/* --- LOGIN CARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full bg-white/70 dark:bg-dark-900/60 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all dark:text-white text-gray-900 placeholder-gray-400"
                  placeholder="admin@rolecraft.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none transition-all dark:text-white text-gray-900 placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-xl shadow-primary-500/20 flex items-center justify-center gap-2 transition-all ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                  : 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

          </form>
        </motion.div>
        
        {/* Footer Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-400 dark:text-gray-600 text-xs mt-8"
        >
          © {new Date().getFullYear()} RoleCraft. Secured by 256-bit encryption.
        </motion.p>
      </div>
    </div>
  );
};

export default LoginPage;