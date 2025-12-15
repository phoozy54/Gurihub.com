
import React, { useState } from 'react';
import { Property, PropertyStatus, User, Currency, Tenant, Organization } from '../types';
import { MapPin, Home, MoreHorizontal, ArrowUpRight, Layout, Plus, X, Image as ImageIcon, List, Map as MapIcon } from 'lucide-react';
import { PropertyMap } from './PropertyMap';

interface PropertyListProps {
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  currentUser: User;
  tenants?: Tenant[];
  rentals?: Organization[];
  onViewDetails?: (property: Property) => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties, setProperties, addActivity, currentUser, tenants, rentals, onViewDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    name: '',
    address: '',
    type: 'Apartment',
    units: 1,
    status: PropertyStatus.Available,
    occupancyRate: 0,
    revenue: 0,
    image: 'https://picsum.photos/800/600' // Placeholder
  });

  const canEdit = currentUser.role === 'SuperAdmin' || currentUser.role === 'AgencyManager';

  const handleAddProperty = () => {
    if (!newProperty.name || !newProperty.address) return;

    const property: Property = {
      id: `P${Date.now()}`,
      name: newProperty.name!,
      address: newProperty.address!,
      city: 'Hargeisa', // Default city
      lat: 9.56, // Default Lat
      lng: 44.06, // Default Lng
      type: newProperty.type as any,
      units: newProperty.units || 1,
      occupancyRate: 0,
      status: PropertyStatus.Available,
      image: `https://picsum.photos/seed/${Date.now()}/800/600`,
      revenue: 0,
      amenities: [],
      currency: Currency.USD
    };

    setProperties([...properties, property]);
    addActivity(`Hanti cusub lagu daray: ${property.name}`, 'success');
    setIsModalOpen(false);
    setNewProperty({ name: '', address: '', type: 'Apartment', units: 1, status: PropertyStatus.Available });
  };
  
  // Helper to translate status
  const getStatusLabel = (status: PropertyStatus) => {
    switch(status) {
      case PropertyStatus.Available: return 'Bannaan';
      case PropertyStatus.Occupied: return 'Deggan';
      case PropertyStatus.Maintenance: return 'Dayactir';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hantida / Guryaha</h1>
           <p className="text-sm text-gray-500 dark:text-gray-400">Manage real estate listings and availability</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-1 shadow-sm">
             <button 
               onClick={() => setViewMode('list')}
               className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}
               title="List View"
             >
                <List size={18} />
             </button>
             <button 
               onClick={() => setViewMode('map')}
               className={`p-2 rounded-md transition-all ${viewMode === 'map' ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}
               title="Map View"
             >
                <MapIcon size={18} />
             </button>
          </div>

          {canEdit && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus size={20} /> Ku dar Guri
            </button>
          )}
        </div>
      </div>

      {viewMode === 'map' ? (
         <PropertyMap properties={properties} />
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative h-48 bg-gray-200 dark:bg-slate-700">
              <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                  prop.status === PropertyStatus.Available ? 'bg-green-500/20 text-white bg-green-600' :
                  prop.status === PropertyStatus.Occupied ? 'bg-blue-600 text-white' :
                  'bg-orange-500 text-white'
                }`}>
                  {getStatusLabel(prop.status)}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{prop.name}</h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    {prop.city}
                  </div>
                </div>
                {canEdit && (
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <MoreHorizontal size={20} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 py-4 border-t border-gray-100 dark:border-slate-700">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Qaybaha (Units)</p>
                  <div className="flex items-center text-gray-800 dark:text-gray-200 font-medium">
                    <Home size={16} className="mr-1.5 text-gray-400" />
                    {prop.units} Unit
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nooca</p>
                  <div className="flex items-center text-gray-800 dark:text-gray-200 font-medium">
                    <Layout size={16} className="mr-1.5 text-gray-400" />
                    {prop.type}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex justify-between items-center">
                <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2 mr-4 overflow-hidden">
                  <div 
                    className="bg-brand-500 h-2 rounded-full" 
                    style={{ width: `${prop.occupancyRate}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {prop.occupancyRate}% Deggan
                </span>
              </div>
              
              <button 
                onClick={() => onViewDetails && onViewDetails(prop)}
                className="w-full mt-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center justify-center"
              >
                Faahfaahin <ArrowUpRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Add Property Modal */}
      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-800 dark:text-white">Ku dar Guri Cusub</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Magaca Hantida</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none dark:text-white"
                  placeholder="Tusaale: Barwaaqo Tower"
                  value={newProperty.name}
                  onChange={e => setNewProperty({...newProperty, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cinwaanka (Address)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none dark:text-white"
                  placeholder="Tusaale: Shacabka, Hargeisa"
                  value={newProperty.address}
                  onChange={e => setNewProperty({...newProperty, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nooca</label>
                  <select 
                    className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none dark:text-white"
                    value={newProperty.type}
                    onChange={e => setNewProperty({...newProperty, type: e.target.value as any})}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Warehouse">Warehouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cadadka Unit-yada</label>
                  <input 
                    type="number" 
                    className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none dark:text-white"
                    min="1"
                    value={newProperty.units}
                    onChange={e => setNewProperty({...newProperty, units: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg border border-gray-200 dark:border-slate-600 flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                 <ImageIcon size={16} />
                 <span>Sawirka si toos ah ayaa loo soo qaadayaa</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-sm font-medium">Jooji</button>
              <button 
                onClick={handleAddProperty}
                disabled={!newProperty.name || !newProperty.address}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm disabled:opacity-50"
              >
                Diiwaangeli
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
