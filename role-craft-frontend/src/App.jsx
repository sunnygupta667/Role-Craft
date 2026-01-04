import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import PortfolioPage from './pages/PortfolioPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import PortfolioFormPage from './pages/PortfolioFormPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
// ❌ REMOVED: ForgotPasswordPage import

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/portfolio/:slug" element={<PortfolioPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          
          {/* ❌ REMOVED: Forgot Password Route */}
          {/* <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} /> */}
          
          {/* --- Protected Admin Routes --- */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/portfolio/create"
            element={
              <ProtectedRoute>
                <PortfolioFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/portfolio/edit/:id"
            element={
              <ProtectedRoute>
                <PortfolioFormPage />
              </ProtectedRoute>
            }
          />

          {/* Change Password (Protected) */}
          <Route
            path="/admin/change-password"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />
          
          {/* --- Redirects & 404 --- */}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-950">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
                <a href="/" className="btn-primary px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;