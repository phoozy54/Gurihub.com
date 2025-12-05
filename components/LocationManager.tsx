
import React, { useState } from 'react';
import { Location } from '../types';
import { Map, MapPin, Plus, MoreVertical, Globe, Flag } from 'lucide-react';

const MOCK_LOCATIONS: Location[] = [
  { id: 'L1', name: 'Somaliland', type: 'Country', status: 'Active', propertyCount: 154 },
  { id: 'L2', name: 'Hargeisa', type: 'City', parentId: 'L1', status: 'Active', propertyCount: 89 },
  { id: 'L3', name: 'Borama', type: 'City', parentId: 'L1', status: 'Active', propertyCount: 30 },
  { id: 'L4', name: 'Berbera', type: 'City', parentId: 'L1', status: 'Active', propertyCount: 20 },
  { id: 'L5', name: 'Burao', type: 'City', parentId: 'L1', status: 'Active', propertyCount: 15 },
  { id: 'L6', name: 'Shacabka', type: 'Area', parentId: 'L2', status: 'Active', propertyCount: 45 },
  { id: 'L7', name: 'Jigjiga Yar', type: 'Area', parentId: 'L2', status: 'Active', propertyCount: 30 },
];

export const LocationManager: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS);
  
  const countries = locations.filter(l => l.type === 'Country');
  const cities = locations.filter(l => l.type === 'City');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Location Management</h1>
           <p className="text-sm text-gray-500">Manage hierarchical regions for map-based search in Somaliland</p>
        </div>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm flex items-center gap-2">
           <Plus size={16} /> Add Location
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Countries Column */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                 <Globe size={16} /> Countries
              </h3>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">{countries.length}</span>
           </div>
           <div className="divide-y divide-gray-100">
              {countries.map(country => (
                 <div key={country.id} className="p-4 hover:bg-gray-50 cursor-pointer group flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className="h-8 w-8 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center">
                          <Flag size={14} />
                       </div>
                       <div>
                          <p className="font-medium text-gray-800">{country.name}</p>
                          <p className="text-xs text-gray-500">{country.propertyCount} Properties</p>
                       </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                       <MoreVertical size={16} />
                    </button>
                 </div>
              ))}
           </div>
        </div>

        {/* Cities Column */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                 <Map size={16} /> Cities
              </h3>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">{cities.length}</span>
           </div>
           <div className="divide-y divide-gray-100">
              {cities.map(city => {
                 const parent = countries.find(c => c.id === city.parentId);
                 return (
                 <div key={city.id} className="p-4 hover:bg-gray-50 cursor-pointer group flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                          <MapPin size={14} />
                       </div>
                       <div>
                          <p className="font-medium text-gray-800">{city.name}</p>
                          <p className="text-xs text-gray-500">{parent?.name || 'Unknown'}</p>
                       </div>
                    </div>
                    <span className="text-xs font-medium text-gray-400">{city.propertyCount} Listings</span>
                 </div>
              )})}
           </div>
        </div>

        {/* Map Preview */}
        <div className="bg-gray-100 rounded-xl border border-gray-200 shadow-inner flex items-center justify-center p-6 text-gray-400 flex-col gap-3 min-h-[300px]">
           <Map size={48} className="opacity-20" />
           <p className="text-sm font-medium">Somaliland Map Integration</p>
           <p className="text-xs text-center max-w-[200px]">Interactive map showing properties in Hargeisa, Borama, and Berbera.</p>
        </div>
      </div>
    </div>
  );
};