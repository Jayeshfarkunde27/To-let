
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Home, Search, Heart, User, PlusCircle, LayoutDashboard, Sparkles, LogOut, Menu, X, Loader2, Sun, Moon } from 'lucide-react';
import Landing from './pages/Landing';
import Browse from './pages/Tenant/Browse';
import AIChat from './pages/Tenant/AIChat';
import RoleSelection from './pages/Auth/RoleSelection';
import Dashboard from './pages/Owner/Dashboard';
import AddProperty from './pages/Owner/AddProperty';
import PropertyDetail from './pages/Tenant/PropertyDetail';
import Auth from './pages/Auth/Auth';
import { UserRole } from './types';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { auth } from './firebaseConfig';

const Navigation = () => {
  const { user, role, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-white/20 dark:border-slate-800/50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="TO_LET Logo" className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md" />
            <span className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">TO_LET</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/browse" className={`text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${isActive('/browse') ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>Find Rooms</Link>
            {role === 'owner' && (
              <Link to="/owner/dashboard" className={`text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${isActive('/owner/dashboard') ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>Owner Dashboard</Link>
            )}
            <Link to="/chat" className="flex items-center gap-2 bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 px-4 py-2 rounded-full text-sm font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:shadow-md transition-all duration-300">
              <Sparkles size={16} className="text-indigo-500 dark:text-indigo-400" /> AI Assistant
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {loading ? (
              <Loader2 className="animate-spin text-slate-400" size={20} />
            ) : !user ? (
              <button
                onClick={() => navigate('/auth')}
                className="bg-slate-900 dark:bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 dark:shadow-indigo-900/30 hover:bg-slate-800 dark:hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-right hidden lg:block">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{user.displayName || 'User'}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-100 to-white dark:from-indigo-900 dark:to-slate-800 p-0.5 shadow-sm border border-indigo-50 dark:border-slate-700">
                  <div className="w-full h-full rounded-full bg-indigo-50 dark:bg-slate-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </div>
                <button onClick={handleLogout} className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full">
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="text-slate-600 dark:text-slate-300 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-4 space-y-4 animate-in slide-in-from-top duration-300 absolute w-full shadow-xl">
            <Link to="/browse" className="block font-medium text-slate-700 dark:text-slate-200 p-2" onClick={() => setMobileMenuOpen(false)}>Browse Properties</Link>
            <Link to="/chat" className="block font-medium text-indigo-600 dark:text-indigo-400 p-2" onClick={() => setMobileMenuOpen(false)}>AI Assistant</Link>
            {role === 'owner' && (
              <Link to="/owner/dashboard" className="block font-medium text-slate-700 dark:text-slate-200 p-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            )}
            {!user ? (
              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold mt-4" onClick={() => { setMobileMenuOpen(false); navigate('/auth'); }}>Sign In</button>
            ) : (
              <button className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold mt-4" onClick={() => { setMobileMenuOpen(false); handleLogout(); }}>Sign Out</button>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-50 flex justify-around items-center py-2 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
        <Link to="/" className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${isActive('/') ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-400 dark:text-slate-500'}`}>
          <Home size={22} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link to="/browse" className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${isActive('/browse') ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-400 dark:text-slate-500'}`}>
          <Search size={22} />
          <span className="text-[10px] font-bold">Search</span>
        </Link>
        <Link to="/chat" className={`flex flex-col items-center gap-1 ${isActive('/chat') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}>
          <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-3 rounded-full -mt-8 shadow-lg shadow-indigo-200 dark:shadow-none border-4 border-white dark:border-slate-900">
            <Sparkles size={24} />
          </div>
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-1">AI Ask</span>
        </Link>
        <Link to="/saved" className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${isActive('/saved') ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-400 dark:text-slate-500'}`}>
          <Heart size={22} />
          <span className="text-[10px] font-bold">Saved</span>
        </Link>
        <Link to={role === 'owner' ? '/owner/dashboard' : '/auth'} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${isActive('/owner/dashboard') || isActive('/auth') ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'text-slate-400 dark:text-slate-500'}`}>
          {role === 'owner' ? <LayoutDashboard size={22} /> : <User size={22} />}
          <span className="text-[10px] font-bold">{role === 'owner' ? 'Admin' : 'Profile'}</span>
        </Link>
      </div>
    </>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950"><Loader2 className="animate-spin text-indigo-600" /></div>;
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="pb-20 md:pb-0 pt-16 min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
        <Navigation />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/chat" element={<AIChat />} />
          <Route path="/signup" element={<Auth />} />

          <Route path="/role-selection" element={
            <ProtectedRoute>
              <RoleSelection />
            </ProtectedRoute>
          } />

          <Route path="/owner/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/owner/add-property" element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          } />

          <Route path="/property/:id" element={
            <PropertyDetail />
          } />
        </Routes>

        {/* Floating AI FAB */}
        <Link
          to="/chat"
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group border-4 border-white/20 backdrop-blur-sm"
        >
          <Sparkles size={28} />
          <span className="absolute right-full mr-4 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-indigo-50 dark:border-slate-700 translate-x-2 group-hover:translate-x-0">
            Ask AI Assistant
          </span>
        </Link>
      </div>
    </Router>
  );
};

export default App;
