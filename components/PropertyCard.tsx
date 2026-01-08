
import React from 'react';
import { Property } from '../types';
import { MapPin, Star, Home, Building, User, ChevronRight, Armchair } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onClick: (id: string) => void;
  horizontal?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick, horizontal = false }) => {
  const TypeIcon = property.type === 'Room' ? User : property.type === 'PG/Hostel' ? Building : Home;
  
  // Format price to Indian Rupee
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <div 
      onClick={() => onClick(property.id)}
      className={`group bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900 hover:-translate-y-1 ${horizontal ? 'flex min-w-[320px] sm:min-w-[450px]' : 'flex flex-col'}`}
    >
      <div className={`${horizontal ? 'w-2/5' : 'w-full h-56'} overflow-hidden relative`}>
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700">
          <TypeIcon size={12} className="text-indigo-600 dark:text-indigo-400" />
          {property.type}
        </div>
        
        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          {property.rating}
        </div>
      </div>
      
      <div className={`p-5 flex-1 flex flex-col justify-between ${horizontal ? 'py-4' : ''}`}>
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg leading-tight line-clamp-1 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
              {property.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
            <MapPin size={14} className="flex-shrink-0 text-slate-400 dark:text-slate-500" />
            <span className="line-clamp-1 font-medium">{property.location}</span>
          </div>

          {!horizontal && (
             <div className="flex flex-wrap gap-2 pt-1">
               {property.bhk && (
                 <span className="text-[10px] bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-700 font-bold">
                   {property.bhk} BHK
                 </span>
               )}
                <span className="text-[10px] bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-700 font-medium flex items-center gap-1">
                   <Armchair size={10} /> {property.furnishing === 'Fully Furnished' ? 'Furnished' : property.furnishing === 'Semi Furnished' ? 'Semi' : 'Unfurnished'}
                </span>
             </div>
          )}
        </div>
        
        <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">Rent</p>
            <div className="text-indigo-700 dark:text-indigo-400 font-bold text-xl flex items-baseline gap-1">
              {formattedPrice}<span className="text-slate-400 dark:text-slate-500 text-sm font-medium">/mo</span>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white dark:group-hover:text-white transition-all duration-300">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
