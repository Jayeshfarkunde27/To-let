
import React from 'react';
import { Search, ShieldCheck, Zap, Scissors, ArrowRight, MapPin, DollarSign, Building } from 'lucide-react';
import { MOCK_PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const featuredProperties = MOCK_PROPERTIES.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Modern Living Room"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-slate-900/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center mt-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-300 font-semibold text-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
             ✨ India's Smartest Rental Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
            Rent Home, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">No Brokerage.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Connect directly with verified owners in Mumbai, Bangalore, Delhi & more. Save thousands in brokerage.
          </p>
          
          {/* Modern Search Bar */}
          <div className="bg-white dark:bg-slate-900 p-2 rounded-3xl shadow-2xl shadow-indigo-900/20 max-w-4xl mx-auto flex flex-col md:flex-row gap-2 animate-in fade-in slide-in-from-bottom-16 duration-1000 backdrop-blur-xl border border-white/50 dark:border-slate-800">
            <div className="flex-1 flex items-center px-6 py-2 gap-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 group focus-within:bg-slate-50 dark:focus-within:bg-slate-800 rounded-2xl transition-colors">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-xl text-indigo-600 dark:text-indigo-400 group-focus-within:bg-indigo-600 group-focus-within:text-white transition-colors">
                 <MapPin size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Whitefield, Bangalore..." 
                className="w-full py-2 outline-none text-slate-700 dark:text-slate-200 font-medium bg-transparent placeholder-slate-400"
              />
            </div>
            
            <div className="flex-1 flex items-center px-6 py-2 gap-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 group focus-within:bg-slate-50 dark:focus-within:bg-slate-800 rounded-2xl transition-colors">
              <div className="bg-teal-50 dark:bg-teal-900/30 p-2 rounded-xl text-teal-600 dark:text-teal-400 group-focus-within:bg-teal-600 group-focus-within:text-white transition-colors">
                 <Building size={20} />
              </div>
              <select className="w-full py-2 outline-none text-slate-700 dark:text-slate-200 font-medium bg-transparent cursor-pointer dark:bg-slate-900">
                <option value="">Property Type</option>
                <option>Full House (Apt/Villa)</option>
                <option>PG / Hostel</option>
                <option>Single Room</option>
              </select>
            </div>
            
            <div className="flex-1 flex items-center px-6 py-2 gap-3 group focus-within:bg-slate-50 dark:focus-within:bg-slate-800 rounded-2xl transition-colors">
              <div className="bg-orange-50 dark:bg-orange-900/30 p-2 rounded-xl text-orange-600 dark:text-orange-400 group-focus-within:bg-orange-600 group-focus-within:text-white transition-colors">
                 <span className="font-bold text-lg">₹</span>
              </div>
              <input 
                type="text" 
                placeholder="Budget (e.g. 25k)" 
                className="w-full py-2 outline-none text-slate-700 dark:text-slate-200 font-medium bg-transparent placeholder-slate-400"
              />
            </div>
            
            <button 
              onClick={() => navigate('/browse')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:shadow-indigo-300"
            >
              <Search size={20} /> 
              <span className="md:hidden lg:inline">Search</span>
            </button>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-white dark:bg-slate-950 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { icon: ShieldCheck, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20', title: 'Verified Owners', desc: 'Strict KYC for all landlords. No fake listings, no scams.' },
              { icon: Zap, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20', title: 'Smart Filters', desc: 'Filter by "Bachelor Allowed", "Non-Veg Allowed" and more specific Indian needs.' },
              { icon: Scissors, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', title: 'Zero Brokerage', desc: 'Direct connection means you save 1 month rent on brokerage fees.' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                <div className={`w-20 h-20 ${feature.bg} rounded-3xl flex items-center justify-center mb-6 shadow-sm`}>
                  <feature.icon className={feature.color} size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Trending in Bangalore</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">Top-rated properties freshly added this week.</p>
            </div>
            <button 
              onClick={() => navigate('/browse')}
              className="group text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-4 py-2 rounded-xl transition-all"
            >
              View all <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-10 hide-scrollbar snap-x snap-mandatory">
            {featuredProperties.map(property => (
              <div key={property.id} className="flex-shrink-0 w-80 md:w-96 snap-start">
                <PropertyCard 
                  property={property} 
                  onClick={(id) => navigate(`/property/${id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 dark:from-indigo-900 dark:to-blue-900 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200 dark:shadow-indigo-900/20">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">List your property for FREE</h2>
              <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
                Join thousands of owners in Mumbai and Bangalore finding verified tenants.
              </p>
              <button 
                onClick={() => navigate('/signup')}
                className="bg-white text-indigo-700 hover:bg-indigo-50 hover:scale-105 px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl"
              >
                Start Listing
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
