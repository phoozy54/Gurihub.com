import React, { useState, useMemo, memo } from 'react';
import { Property, PropertyStatus, User, Currency, Tenant, Organization } from '../types';
import { MapPin, Home, MoreHorizontal, ArrowUpRight, Layout, Plus, X, Image as ImageIcon, List, Map as MapIcon } from 'lucide-react';
import { PropertyMap } from './PropertyMap';
import { hasPermission, PERMISSIONS } from '../utils/permissions';
import { FixedSizeList as ListComponent } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// --- Sub-component for individual property cards ---
// Memoized to prevent expensive re-renders during fast scrolling
const PropertyCard = memo(({ prop, canEdit, onViewDetails, getStatusLabel }: { 
  prop: Property, 
  canEdit: boolean, 
  onViewDetails?: (p: Property) => void,
  getStatusLabel: (s: PropertyStatus) => string 
}) => {
  return (
    <div className="h-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
      <div className="relative h-48 bg-gray-200 dark:bg-slate-700 flex-shrink-0">
        <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm ${
            prop.status === PropertyStatus.Available ? 'bg-emerald-600 text-white' :
            prop.status === PropertyStatus.Occupied ? 'bg-blue-600 text-white' :
            'bg-orange-500 text-white'
          }`}>
            {getStatusLabel(prop.status)}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate" title={prop.name}>{prop.name}</h3>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              <span className="truncate">{prop.city}</span>
            </div>
          </div>
          {canEdit && (
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 ml-2">
              <MoreHorizontal size={20} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-auto py-4 border-t border-gray-100 dark:border-slate-700">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 mb-1">Qaybta</p>
            <div className="flex items-center text-gray-800 dark:text-gray-200 font-bold text-sm">
              <Home size={16} className="mr-1.5 text-brand-600" />
              {prop.units} Unit
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 mb-1">Nooca</p>
            <div className="flex items-center text-gray-800 dark:text-gray-200 font-bold text-sm">
              <Layout size={16} className="mr-1.5 text-brand-600" />
              {prop.type}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Heerka Degganaanshaha</span>
            <span className="text-xs font-black text-brand-600 dark:text-brand-400">{prop.occupancyRate}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden shadow-inner">
            <div 
              className="bg-brand-600 h-2 rounded-full transition-all duration-1000" 
              style={{ width: `${prop.occupancyRate}%` }}
            ></div>
          </div>
        </div>
        
        <button 
          onClick={() => onViewDetails && onViewDetails(prop)}
          className="w-full mt-5 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 hover:border-brand-600 transition-all flex items-center justify-center group/btn"
        >
          Faahfaahin <ArrowUpRight size={16} className="ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
});

PropertyCard.displayName = 'PropertyCard';

interface PropertyListProps {
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  currentUser: User;
  tenants?: Tenant[];
  rentals?: Organization[];
  onViewDetails?: (property: Property) => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties, setProperties, addActivity, currentUser, onViewDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    name: '',
    address: '',
    type: 'Apartment',
    units: 1,
    // Fix: Added monthlyRent to newProperty state to track it for new property creation
    monthlyRent: 0,
    status: PropertyStatus.Available,
    occupancyRate: 0,
    revenue: 0,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80'
  });

  const canEdit = hasPermission(currentUser, PERMISSIONS.MANAGE_PROPERTIES);

  const getStatusLabel = (status: PropertyStatus) => {
    switch(status) {
      case PropertyStatus.Available: return 'Bannaan';
      case PropertyStatus.Occupied: return 'Deggan';
      case PropertyStatus.Maintenance: return 'Dayactir';
      default: return status;
    }
  };

  const handleAddProperty = () => {
    if (!newProperty.name || !newProperty.address) return;

    const property: Property = {
      id: `P${Date.now()}`,
      name: newProperty.name!,
      address: newProperty.address!,
      city: 'Hargeisa',
      lat: 9.56 + (Math.random() - 0.5) * 0.05,
      lng: 44.06 + (Math.random() - 0.5) * 0.05,
      type: newProperty.type as any,
      units: newProperty.units || 1,
      // Fix: Included monthlyRent in the Property object to satisfy the mandatory property 'monthlyRent'
      monthlyRent: newProperty.monthlyRent || 0,
      occupancyRate: 0,
      status: PropertyStatus.Available,
      image: `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80`,
      revenue: 0,
      amenities: ['WiFi', 'Parking'],
      currency: Currency.USD
    };

    setProperties([property, ...properties]);
    addActivity(`Hanti cusub lagu daray: ${property.name}`, 'success');
    setIsModalOpen(false);
    // Fix: Updated reset state to include monthlyRent
    setNewProperty({ name: '', address: '', type: 'Apartment', units: 1, monthlyRent: 0, status: PropertyStatus.Available });
  };

  // --- Virtualization Rendering Logic ---
  const VirtualizedGrid = () => {
    return (
      <div className="h-[calc(100vh-16rem)] w-full">
        <AutoSizer>
          {({ height, width }) => {
            // Responsive column calculation
            const columnCount = width < 640 ? 1 : width < 1024 ? 2 : 4;
            const rowHeight = 490; // Fixed height for standard property card
            const rowCount = Math.ceil(properties.length / columnCount);

            return (
              <ListComponent
                height={height}
                width={width}
                itemCount={rowCount}
                itemSize={rowHeight}
                className="no-scrollbar"
              >
                {({ index, style }) => {
                  const items = [];
                  const startIndex = index * columnCount;
                  
                  for (let i = 0; i < columnCount; i++) {
                    const propertyIndex = startIndex + i;
                    if (propertyIndex < properties.length) {
                      items.push(properties[propertyIndex]);
                    }
                  }

                  return (
                    <div style={style} className="flex px-1 pb-6">
                      {items.map((prop) => (
                        <div 
                          key={prop.id} 
                          className="px-2" 
                          style={{ width: `${100 / columnCount}%` }}
                        >
                          <PropertyCard 
                            prop={prop} 
                            canEdit={canEdit} 
                            onViewDetails={onViewDetails} 
                            getStatusLabel={getStatusLabel} 
                          />
                        </div>
                      ))}
                    </div>
                  );
                }}
              </ListComponent>
            );
          }}
        </AutoSizer>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Hantida / Guryaha</h1>
           <p className="text-sm text-gray-500 dark:text-gray-400">Maamul liiska guryaha iyo xaaladdooda.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-1 shadow-sm transition-colors">
             <button 
               onClick={() => setViewMode('list')}
               className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white shadow-inner' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}
               title="List View"
             >
                <List size={18} />
             </button>
             <button 
               onClick={() => setViewMode('map')}
               className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white shadow-inner' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}
               title="Map View"
             >
                <MapIcon size={18} />
             </button>
          </div>

          {canEdit && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-600 text-white px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2 font-bold text-sm active:scale-95"
            >
              <Plus size={20} /> Ku dar Guri
            </button>
          )}
        </div>
      </div>

      {viewMode === 'map' ? (
         <PropertyMap properties={properties} />
      ) : (
         <VirtualizedGrid />
      )}

      {/* Add Property Modal */}
      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Ku dar Guri Cusub</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 bg-gray-50 dark:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Magaca Hantida</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 rounded-xl p-3 text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all font-medium"
                  placeholder="t.sh. Barwaaqo Tower"
                  value={newProperty.name}
                  onChange={e => setNewProperty({...newProperty, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Cinwaanka (Address)</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 rounded-xl p-3 text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all font-medium"
                  placeholder="t.sh. Shacabka, Hargeisa"
                  value={newProperty.address}
                  onChange={e => setNewProperty({...newProperty, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Nooca</label>
                  <select 
                    className="w-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 rounded-xl p-3 text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all font-bold"
                    value={newProperty.type}
                    onChange={e => setNewProperty({...newProperty, type: e.target.value as any})}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Compound">Compound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Unit-yada</label>
                  <input 
                    type="number" 
                    className="w-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 rounded-xl p-3 text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all font-bold"
                    min="1"
                    value={newProperty.units}
                    onChange={e => setNewProperty({...newProperty, units: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              {/* Fix: Added monthlyRent input field to allow users to specify the rent amount during property creation */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Kirada Bishii ($)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 rounded-xl p-3 text-sm focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all font-bold"
                  placeholder="0.00"
                  value={newProperty.monthlyRent}
                  onChange={e => setNewProperty({...newProperty, monthlyRent: parseFloat(e.target.value)})}
                />
              </div>
              <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-2xl border border-brand-100 dark:border-brand-900/50 flex items-center gap-4 text-brand-700 dark:text-brand-300 text-sm">
                 <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <ImageIcon size={20} className="text-brand-600" />
                 </div>
                 <span className="font-semibold">Sawirka si toos ah ayaa nidaamku u samaynayaa.</span>
              </div>
            </div>
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl text-sm font-bold transition-colors">Jooji</button>
              <button 
                onClick={handleAddProperty}
                disabled={!newProperty.name || !newProperty.address}
                className="flex-[2] px-4 py-3 bg-brand-600 text-white rounded-xl text-sm font-black hover:bg-brand-700 shadow-xl shadow-brand-500/20 disabled:opacity-50 transition-all active:scale-95"
              >
                Diiwaangeli Hantida
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};