import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Key, Lock, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authAPI } from '../services/api';
import logoImg from '../assets/logo.png';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Pass
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Data
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await authAPI.forgotPassword({ email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authAPI.resetPassword({ email, otp, newPassword });
      // Redirect to login on success
      navigate('/admin/login', { state: { message: 'Password reset successful! Please login.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. Check OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-950 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 p-6"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-white dark:bg-dark-900 rounded-2xl shadow-lg flex items-center justify-center mb-4">
            <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Recovery</h2>
        </div>

        <div className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: EMAIL */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enter your email to receive a verification code.</p>
                </div>
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                        placeholder="admin@rolecraft.com"
                        required 
                      />
                    </div>
                  </div>
                  {error && <p className="text-xs text-red-500 text-center">{error}</p>}
                  
                  <button type="submit" disabled={loading} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading ? 'Sending...' : <>Send Code <ArrowRight size={18} /></>}
                  </button>
                  <button type="button" onClick={() => navigate('/admin/login')} className="w-full text-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mt-2">Back to Login</button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: OTP & NEW PASSWORD */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Verify Code</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Code sent to {email}</p>
                </div>
                <form onSubmit={handleReset} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">6-Digit Code</label>
                    <input 
                      type="text" 
                      value={otp} 
                      onChange={(e) => setOtp(e.target.value)} 
                      className="w-full px-4 py-3 text-center tracking-[0.5em] font-mono text-lg bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      placeholder="000000"
                      maxLength={6} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">New Password</label>
                    <div className="relative">
                      <Key className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                      <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                        placeholder="New strong password"
                        minLength={6} 
                        required 
                      />
                    </div>
                  </div>
                  {error && <p className="text-xs text-red-500 text-center">{error}</p>}
                  
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="px-4 py-3 bg-gray-100 dark:bg-dark-800 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"><ArrowLeft size={20} /></button>
                    <button type="submit" disabled={loading} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transition-all disabled:opacity-70">
                      {loading ? 'Reseting...' : 'Set New Password'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;