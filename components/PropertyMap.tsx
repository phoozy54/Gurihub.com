
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { Property, PropertyStatus } from '../types';
import { Home, ArrowRight } from 'lucide-react';

// Fix for default marker icon in React Leaflet (Webpack issue usually, but good for CDN too)
const icon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  // Default center (Hargeisa)
  const defaultCenter: [number, number] = [9.56, 44.06];
  
  // Filter only properties with valid coordinates
  const validProperties = properties.filter(p => p.lat !== undefined && p.lng !== undefined);

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {validProperties.map(prop => (
          <Marker 
            key={prop.id} 
            position={[prop.lat!, prop.lng!]} 
            icon={icon}
          >
            <Popup className="rentalpro-popup">
              <div className="p-1 min-w-[200px]">
                 <div className="h-32 w-full mb-3 rounded-lg overflow-hidden bg-gray-100 relative">
                    <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                    <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${
                        prop.status === PropertyStatus.Available ? 'bg-green-600' : 
                        prop.status === PropertyStatus.Occupied ? 'bg-blue-600' : 'bg-orange-500'
                    }`}>
                        {prop.status}
                    </span>
                 </div>
                 <h3 className="font-bold text-gray-900 text-sm mb-1">{prop.name}</h3>
                 <p className="text-xs text-gray-500 mb-2">{prop.city}, {prop.address}</p>
                 <div className="flex justify-between items-center">
                    <span className="text-brand-600 font-bold">${prop.monthlyRent}/mo</span>
                    <button className="text-xs flex items-center gap-1 text-gray-600 hover:text-brand-600 font-medium">
                        View <ArrowRight size={12} />
                    </button>
                 </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map Overlay Stats */}
      <div className="absolute bottom-6 left-6 z-[1000] bg-white p-4 rounded-xl shadow-lg border border-gray-100 hidden sm:block">
         <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-2">
            <Home size={14} className="text-brand-600" /> Somaliland Properties
         </h4>
         <div className="flex gap-4 text-xs">
            <div>
               <p className="text-gray-500">Total</p>
               <p className="font-bold text-gray-900">{properties.length}</p>
            </div>
            <div>
               <p className="text-gray-500">Mapped</p>
               <p className="font-bold text-brand-600">{validProperties.length}</p>
            </div>
            <div>
               <p className="text-gray-500">Cities</p>
               <p className="font-bold text-gray-900">{new Set(validProperties.map(p => p.city)).size}</p>
            </div>
         </div>
      </div>
    </div>
  );
};
