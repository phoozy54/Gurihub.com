
import React from 'react';
import { CreditCard, Smartphone, Globe, Building2 } from 'lucide-react';

export const PaymentSettings: React.FC = () => {
  const gateways = [
    { name: 'Zaad Service', type: 'Mobile Money', supported: ['Telesom', 'USD', 'SLSh'], status: 'Active', icon: Smartphone, recommended: true },
    { name: 'eDahab', type: 'Mobile Money', supported: ['Somtel', 'USD', 'SLSh'], status: 'Active', icon: Smartphone, recommended: true },
    { name: 'Dahabshiil Bank', type: 'Bank Transfer', supported: ['Direct Debit'], status: 'Active', icon: Building2 },
    { name: 'Salaam Bank', type: 'Bank Transfer', supported: ['Direct Debit'], status: 'Active', icon: Building2 },
    { name: 'Stripe', type: 'Credit Card', supported: ['Visa', 'Mastercard', 'Intl Cards'], status: 'Inactive', icon: Globe },
    { name: 'PayPal', type: 'Wallet', supported: ['Balance', 'Pay Later'], status: 'Inactive', icon: Globe },
  ];

  return (
     <div className="space-y-8">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Payment Gateways</h1>
           <p className="text-sm text-gray-500">Manage payment methods for rent collection in Somaliland.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {gateways.map((gw, idx) => (
              <div key={idx} className={`bg-white p-6 rounded-xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${gw.recommended ? 'border-brand-200 ring-1 ring-brand-100' : 'border-gray-200'}`}>
                 <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${gw.status === 'Active' ? 'bg-brand-50 text-brand-600' : 'bg-gray-100 text-gray-500'}`}>
                       <gw.icon size={24} />
                    </div>
                    <div>
                       <div className="flex items-center gap-2">
                           <h3 className="font-bold text-gray-900 text-lg">{gw.name}</h3>
                           {gw.recommended && <span className="bg-brand-100 text-brand-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Recommended</span>}
                       </div>
                       <p className="text-sm text-gray-500">{gw.type} • {gw.supported.join(', ')}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 self-end sm:self-auto">
                    <span className={`text-sm font-medium ${gw.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                       {gw.status}
                    </span>
                    <button className={`w-12 h-6 rounded-full relative transition-colors ${gw.status === 'Active' ? 'bg-brand-600' : 'bg-gray-300'}`}>
                       <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${gw.status === 'Active' ? 'left-7' : 'left-1'}`}></div>
                    </button>
                 </div>
              </div>
           ))}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
           <h3 className="font-bold text-blue-800 mb-2">Local Compliance</h3>
           <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Zaad and eDahab payments are processed instantly.</li>
              <li>Somaliland Shilling (SLSh) exchange rates are updated daily from the Central Bank.</li>
              <li>Islamic-compliant lease contract templates are available for all properties.</li>
           </ul>
        </div>
     </div>
  );
};