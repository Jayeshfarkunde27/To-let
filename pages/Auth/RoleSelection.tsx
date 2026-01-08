
import React, { useState } from 'react';
import { User, Building, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { createUserProfile } from '../../services/db';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';

const RoleSelection: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSelect = async (role: UserRole) => {
    if (!user) return;
    setLoading(true);
    try {
      // Default name is part of email for now
      const name = user.displayName || user.email?.split('@')[0] || 'User';
      await createUserProfile(user.uid, user.email || '', name, role);
      // Force reload or redirect to allow context to update
      window.location.href = '/'; 
    } catch (error) {
      console.error("Error setting role", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">How do you want to use TO_LET?</h1>
          <p className="text-slate-600 dark:text-slate-400">Choose your primary role to personalize your experience.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <button 
            onClick={() => handleSelect('tenant')}
            className="group bg-white dark:bg-slate-900 p-10 rounded-3xl border-2 border-transparent hover:border-indigo-600 dark:hover:border-indigo-500 transition-all text-center shadow-sm hover:shadow-xl"
          >
            <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <User size={48} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">I am a Tenant</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              I'm looking for a room, hostel, or apartment to rent for myself or my family.
            </p>
            <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-4 transition-all">
              Find a home <ArrowRight size={20} />
            </div>
          </button>

          <button 
            onClick={() => handleSelect('owner')}
            className="group bg-white dark:bg-slate-900 p-10 rounded-3xl border-2 border-transparent hover:border-teal-600 dark:hover:border-teal-500 transition-all text-center shadow-sm hover:shadow-xl"
          >
            <div className="w-24 h-24 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Building size={48} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">I am an Owner</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              I want to list my property, manage tenants, and receive rental applications.
            </p>
            <div className="flex items-center justify-center gap-2 text-teal-600 dark:text-teal-400 font-semibold group-hover:gap-4 transition-all">
              Manage listings <ArrowRight size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
