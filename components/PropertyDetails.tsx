
import React from 'react';
import { Property } from '../types';
import { X, MapPin, Bed, Bath, ArrowRight, Check } from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
  onApply: (data: any) => void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onClose, onApply }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-2 text-white transition-colors">
          <X size={24} />
        </button>

        <div className="h-64 sm:h-96 w-full relative">
          <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-8">
             <h2 className="text-3xl font-bold text-white mb-2">{property.name}</h2>
             <p className="text-white/80 flex items-center gap-2">
               <MapPin size={18} /> {property.address}, {property.city}
             </p>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div>
                 <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                 <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                   {property.description || "No description provided."}
                 </p>
              </div>

              <div>
                 <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                 <div className="grid grid-cols-2 gap-3">
                    {property.amenities.map(am => (
                       <div key={am} className="flex items-center gap-2 text-gray-700">
                          <Check size={16} className="text-brand-600" /> {am}
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-8">
                 <div className="flex justify-between items-end mb-6">
                    <div>
                       <span className="text-sm text-gray-500">Monthly Rent</span>
                       <p className="text-3xl font-bold text-gray-900">${property.monthlyRent || property.pricePerNight}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                       {property.status}
                    </span>
                 </div>

                 <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                       <span className="flex items-center gap-2 text-gray-600"><Bed size={18} /> Bedrooms</span>
                       <span className="font-bold text-gray-900">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                       <span className="flex items-center gap-2 text-gray-600"><Bath size={18} /> Bathrooms</span>
                       <span className="font-bold text-gray-900">{property.bathrooms || 1}</span>
                    </div>
                 </div>

                 <button 
                   onClick={() => { onApply({}); onClose(); }}
                   className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
                 >
                    Start Application <ArrowRight size={18} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
