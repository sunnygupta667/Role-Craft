import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, LogOut, Edit, Trash2, Eye, EyeOff, ExternalLink, 
  Search, LayoutTemplate, Briefcase, ChevronRight,
  BarChart3, CheckCircle2, XCircle, Menu, X, KeyRound // Added KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { portfolioAPI } from '../services/api';
import Loading from '../components/Loading';
import logo from '../assets/logo.png';

/* --- TOAST NOTIFICATION --- */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg border-l-4 bg-white dark:bg-zinc-800 ${
        isSuccess 
          ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400' 
          : 'border-red-500 text-red-700 dark:text-red-400'
      }`}
    >
      {isSuccess ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{message}</span>
    </motion.div>
  );
};

/* --- MAIN DASHBOARD --- */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout, admin } = useAuth();
  
  // State
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredPortfolios(portfolios);
    } else {
      const lowerQ = searchQuery.toLowerCase();
      setFilteredPortfolios(portfolios.filter(p => 
        p.jobRole.toLowerCase().includes(lowerQ) || 
        p.slug.toLowerCase().includes(lowerQ)
      ));
    }
  }, [searchQuery, portfolios]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getAll();
      setPortfolios(response.data.data);
      setFilteredPortfolios(response.data.data);
    } catch (error) {
      setToast({ message: 'Failed to sync data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, id) => {
    try {
      if (action === 'toggle') {
        await portfolioAPI.toggle(id);
        setToast({ message: 'Status updated', type: 'success' });
      } else if (action === 'delete') {
        if (!window.confirm('Delete this portfolio permanently?')) return;
        await portfolioAPI.delete(id);
        setToast({ message: 'Portfolio deleted', type: 'success' });
      }
      fetchPortfolios();
    } catch (error) {
      setToast({ message: 'Action failed', type: 'error' });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) return <Loading text="Loading Workspace..." />;

  // Stats
  const activeCount = portfolios.filter(p => p.isEnabled).length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans flex overflow-hidden">
      
      {/* --- TOAST --- */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR NAVIGATION --- */}
      <motion.aside 
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-40 transform lg:transform-none transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl">
              <img src={logo} alt="Role Craft Logo" className="w-8 h-8" />
              <span>Role Craft</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-zinc-500">
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Management
            </div>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 rounded-lg font-medium transition-colors">
              <Briefcase size={18} />
              All Portfolios
            </button>
            <div className="px-3 py-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-6 mb-2">
              Quick Stats
            </div>
            <div className="px-3 py-2 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
              <span>Total</span>
              <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-900 dark:text-zinc-100 font-bold">{portfolios.length}</span>
            </div>
            <div className="px-3 py-2 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
              <span>Active</span>
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">{activeCount}</span>
            </div>
          </nav>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                {admin?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{admin?.email}</p>
                <p className="text-xs text-zinc-500 truncate">Administrator</p>
              </div>
            </div>
            
            {/* ✅ Change Password Button */}
            <button 
              onClick={() => navigate('/admin/change-password')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
            >
              <KeyRound size={16} />
              Change Password
            </button>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-zinc-600 dark:text-zinc-400">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold hidden sm:block">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3 w-full max-w-md ml-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search portfolios..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/admin/portfolio/create')}
              className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all whitespace-nowrap"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Project</span>
            </motion.button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPortfolios.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-400"
                >
                  <Briefcase className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg font-medium">No portfolios found</p>
                  <p className="text-sm">Try creating one or adjust your search.</p>
                </motion.div>
              ) : (
                filteredPortfolios.map((portfolio, idx) => (
                  <PortfolioCard 
                    key={portfolio._id} 
                    data={portfolio} 
                    index={idx}
                    onAction={handleAction}
                    onEdit={() => navigate(`/admin/portfolio/edit/${portfolio._id}`)}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- SUB-COMPONENT: PORTFOLIO CARD (SaaS Style) --- */
const PortfolioCard = ({ data, index, onAction, onEdit }) => {
  const isDark = data.theme === 'dark';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700/50 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        {/* Status Badge */}
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
          data.isEnabled 
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' 
            : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${data.isEnabled ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
          {data.isEnabled ? 'Active' : 'Draft'}
        </span>

        {/* Theme Badge */}
        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {data.jobRole}
        </h3>
        <a 
          href={`/portfolio/${data.slug}`} 
          target="_blank" 
          rel="noreferrer"
          className="text-sm text-zinc-500 font-mono hover:underline flex items-center gap-1"
        >
          /{data.slug} <ExternalLink size={10} />
        </a>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex gap-1">
          <ActionButton 
            onClick={() => onAction('toggle', data._id)}
            icon={data.isEnabled ? Eye : EyeOff}
            tooltip={data.isEnabled ? "Disable" : "Enable"}
            hoverColor="hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          />
          <ActionButton 
            onClick={onEdit}
            icon={Edit}
            tooltip="Edit"
            hoverColor="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
          />
        </div>
        
        <ActionButton 
          onClick={() => onAction('delete', data._id)}
          icon={Trash2}
          tooltip="Delete"
          hoverColor="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
        />
      </div>
    </motion.div>
  );
};

const ActionButton = ({ onClick, icon: Icon, tooltip, hoverColor }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg transition-colors relative group/btn ${hoverColor}`}
    title={tooltip}
  >
    <Icon size={18} />
  </button>
);

export default AdminDashboard;