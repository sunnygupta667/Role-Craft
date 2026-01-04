import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, ShieldCheck, ArrowRight, CheckCircle2, ArrowLeft, Mail } from 'lucide-react';
import { authAPI } from '../services/api';
import logoImg from '../assets/logo.png'; // Ensure this exists

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  
  // Steps: 1 = Current Pass, 2 = OTP & New Pass, 3 = Success
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form Data
  const [currentPassword, setCurrentPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Step 1: Verify Current Password & Send OTP
  const handleInitiate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await authAPI.changePasswordInit({ currentPassword });
      setStep(2); // Move to OTP step
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & Set New Password
  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authAPI.changePasswordConfirm({ otp, newPassword });
      setStep(3); // Move to Success step
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Password update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-950 overflow-hidden font-sans relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-white dark:bg-dark-900 rounded-2xl shadow-lg flex items-center justify-center mb-4">
            <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Check</h2>
        </div>

        <div className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl p-8 overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* --- STEP 1: VERIFY CURRENT PASSWORD --- */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-indigo-600 dark:text-indigo-400">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Verify Identity</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please enter your current password to continue.</p>
                </div>

                <form onSubmit={handleInitiate} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                      <input 
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {error && <p className="text-xs text-red-500 font-medium text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg">{error}</p>}

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? <span className="animate-pulse">Verifying...</span> : <>Verify & Send OTP <ArrowRight size={18} /></>}
                  </button>
                  
                  <button type="button" onClick={() => navigate('/admin/dashboard')} className="w-full text-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Cancel
                  </button>
                </form>
              </motion.div>
            )}

            {/* --- STEP 2: OTP & NEW PASSWORD --- */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600 dark:text-purple-400">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">OTP Sent</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Check your email for the verification code.</p>
                </div>

                <form onSubmit={handleConfirm} className="space-y-4">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Enter 6-Digit OTP</label>
                    <input 
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 text-center tracking-[0.5em] font-mono text-lg bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
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
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all dark:text-white"
                        placeholder="New strong password"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>

                  {error && <p className="text-xs text-red-500 font-medium text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg">{error}</p>}

                  <div className="flex gap-3">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)}
                      className="px-4 py-3 bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {loading ? 'Updating...' : 'Change Password'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* --- STEP 3: SUCCESS --- */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Success!</h3>
                <p className="text-gray-500 dark:text-gray-400">Your password has been updated securely.</p>
                <p className="text-xs text-gray-400 mt-4">Redirecting to dashboard...</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePasswordPage;