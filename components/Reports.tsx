import React from 'react';
import { FileText, PieChart, TrendingUp, Users, Calendar, Download } from 'lucide-react';

export const Reports: React.FC = () => {
  
  const reports = [
    { id: 1, title: 'Rent Roll Report', desc: 'Liiska kirada bilaha ah iyo xaalada bixinta.', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 2, title: 'Profit & Loss', desc: 'Dakhliga vs Kharashaadka oo faahfaahsan.', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 3, title: 'Occupancy Report', desc: 'Heerka degganaanshaha guryaha iyo kuwa banaan.', icon: PieChart, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 4, title: 'Late Payments', desc: 'Kiraystayaasha daaha iyo inta lagu leeyahay.', icon: Users, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 5, title: 'Maintenance Costs', desc: 'Kharashka ku baxay dayactirka guri walba.', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Warbixinno (Reports Center)</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
             <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${report.bg} ${report.color}`}>
                  <report.icon size={24} />
                </div>
                <button className="text-gray-400 hover:text-brand-600">
                   <Download size={20} />
                </button>
             </div>
             <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">{report.title}</h3>
             <p className="text-sm text-gray-500 mb-4">{report.desc}</p>
             <div className="flex gap-2 mt-auto">
                <button className="flex-1 py-2 border border-gray-200 rounded text-xs font-medium text-gray-600 hover:bg-gray-50">
                   Eeg (View)
                </button>
                <button className="flex-1 py-2 bg-brand-50 text-brand-700 rounded text-xs font-medium hover:bg-brand-100 transition-colors">
                   Excel
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};