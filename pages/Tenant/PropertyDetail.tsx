
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../../services/db';
import { Property } from '../../types';
import { MapPin, Star, User, Home, Building, CheckCircle, ChevronLeft, Share2, Heart, Calendar, MessageCircle, Armchair, Shield } from 'lucide-react';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPropertyById(id).then(data => {
        setProperty(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400 dark:bg-slate-950">Loading...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center text-slate-500 dark:bg-slate-950 dark:text-slate-400">Property not found.</div>;

  const TypeIcon = property.type === 'Room' ? User : property.type === 'PG/Hostel' ? Building : Home;

  // Currency Formatter
  const formatINR = (amount: number) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Image Gallery */}
      <div className="relative h-[40vh] md:h-[50vh] bg-slate-900">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-20 left-4 md:left-8 z-10">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors">
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute top-20 right-4 md:right-8 z-10 flex gap-3">
          <button className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors">
            <Heart size={20} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white container mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              <TypeIcon size={12} /> {property.type}
            </span>
             {property.bhk && (
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                  {property.bhk} BHK
                </span>
             )}
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" /> {property.rating || 'New'}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{property.title}</h1>
          <div className="flex items-center gap-2 text-slate-300">
             <MapPin size={18} /> {property.location}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Info */}
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
            
            {/* Highlights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Furnishing</p>
                    <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                        <Armchair size={18} className="text-indigo-600 dark:text-indigo-400" /> {property.furnishing}
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Maintenance</p>
                    <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                        <Shield size={18} className="text-indigo-600 dark:text-indigo-400" /> {property.maintenance ? formatINR(property.maintenance) : 'Included'}
                    </div>
                </div>
                 <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Deposit</p>
                    <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                         {formatINR(property.deposit)}
                    </div>
                </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Description</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {property.amenities.map((amenity, i) => (
                  <span key={i} className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-medium flex items-center gap-2">
                    <CheckCircle size={16} className="text-teal-500" /> {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Availability</h2>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-900/30 inline-flex">
                 <Calendar size={20} className="text-orange-500" />
                 Available from <span className="font-bold text-slate-800 dark:text-slate-100">{new Date(property.availableFrom).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-[400px]">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-800 sticky top-24">
              <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-50 dark:border-slate-800">
                <div>
                   <p className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase">Monthly Rent</p>
                   <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{formatINR(property.price)}</div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <MessageCircle size={20} /> Chat on WhatsApp
                </button>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all active:scale-95">
                  Request Visit
                </button>
              </div>

              <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
                 No brokerage fees applied. Verified listing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
