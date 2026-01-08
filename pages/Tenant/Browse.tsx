import React, { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard';
import { Search, SlidersHorizontal, Map as MapIcon, List, Loader2, XCircle, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllProperties } from '../../services/db';
import { Property } from '../../types';

const Browse: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'split'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    maxPrice: 100000, // Adjusted for INR
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to load properties", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(p => {
    const typeMatch = filters.type === 'All' || p.type === filters.type;
    const priceMatch = p.price <= filters.maxPrice;
    const searchMatch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        p.location.toLowerCase().includes(searchTerm.toLowerCase());
    return typeMatch && priceMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="animate-spin text-indigo-600" size={48} />
           <p className="text-slate-500 font-medium animate-pulse">Finding the best spots...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen">
      {/* Search & Filter Header */}
      <div className="sticky top-[64px] z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4 shadow-sm transition-all">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by city (e.g. Bangalore), locality..." 
              className="w-full bg-slate-100 dark:bg-slate-800 border-transparent border-2 focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all placeholder:text-slate-400 text-slate-700 dark:text-slate-100 font-medium shadow-inner dark:shadow-none"
            />
            {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <XCircle size={18} fill="currentColor" className="text-slate-200 dark:text-slate-600" />
                </button>
            )}
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar pb-1 md:pb-0 items-center">
            {['All', 'Apartment', 'PG/Hostel', 'Room'].map(type => (
              <button 
                key={type}
                onClick={() => setFilters({ ...filters, type })}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap active:scale-95 ${filters.type === type ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 ring-2 ring-indigo-100 dark:ring-indigo-900' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                {type}
              </button>
            ))}
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-2 hidden md:block"></div>
            <button className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-2 transition-all font-medium whitespace-nowrap">
              <SlidersHorizontal size={18} /> <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          <div className="hidden md:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shadow-inner dark:shadow-none">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <List size={20} />
            </button>
            <button 
              onClick={() => setViewMode('split')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'split' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <MapIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className={`container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 ${viewMode === 'split' ? 'h-[calc(100vh-140px)] overflow-hidden' : ''}`}>
        <div className={`flex-1 ${viewMode === 'split' ? 'overflow-y-auto pr-2 pb-20' : ''}`}>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              Results <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full text-xs">{filteredProperties.length}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onClick={(id) => navigate(`/property/${id}`)}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
                <div className="bg-white dark:bg-slate-900 w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4 shadow-sm">
                   <Search size={40} className="text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No properties found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Placeholder (Only in Split View) */}
        {viewMode === 'split' && (
          <div className="hidden md:block flex-1 bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden relative border border-slate-300 dark:border-slate-700">
             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                <MapIcon size={48} className="mb-2 opacity-50" />
                <p className="font-bold">Map View</p>
                <p className="text-xs">Coming Soon</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;