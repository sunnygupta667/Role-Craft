import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, Save, CheckCircle } from 'lucide-react'; // Added CheckCircle for success icon
import { authAPI } from '../services/api';
import logoImg from '../assets/logo.png';

// --- Simple Toast Component ---
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-hide after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
    >
      <div className="p-2 rounded-full bg-emerald-500/20">
        <CheckCircle size={20} />
      </div>
      <div>
        <h4 className="font-bold text-sm">Success</h4>
        <p className="text-xs opacity-90">{message}</p>
      </div>
    </motion.div>
  );
};

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false); // State for Toast

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await authAPI.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      // Show Success Toast
      setShowToast(true);

      // Delay navigation slightly so user sees the toast
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-950 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <Toast 
            message="Password updated successfully!" 
            onClose={() => setShowToast(false)} 
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-6"
      >
        <div className="flex flex-col items-center mb-8">
          <img src={logoImg} alt="Logo" className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Change Password</h2>
        </div>

        <div className="bg-white dark:bg-dark-900 p-8 rounded-3xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Current Password */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Current Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">New Password</label>
              <div className="relative mt-1">
                <Key className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl dark:text-white"
                  placeholder="New strong password"
                  required
                />
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Confirm New Password</label>
              <div className="relative mt-1">
                <Key className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="password"
                  value={formData.confirmNewPassword}
                  onChange={(e) => setFormData({...formData, confirmNewPassword: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl dark:text-white"
                  placeholder="Repeat new password"
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <div className="flex gap-3 mt-6">
              <button 
                type="button" 
                onClick={() => navigate('/admin/dashboard')}
                className="px-6 py-3 bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : <>Update Password <Save size={18} /></>}
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePasswordPage;