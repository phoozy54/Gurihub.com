
import React, { useState } from 'react';
import { Customer } from '../types';
import { Search, Filter, Mail, Ban, MoreHorizontal, Shield, Smartphone } from 'lucide-react';

const MOCK_CUSTOMERS: Customer[] = [
  { id: 'C1', fullName: 'Mohamed Abdi', email: 'mohamed@example.com', phone: '+252 63 4445555', authProvider: 'Google', country: 'Somaliland', status: 'Active', joinDate: '2023-11-15', totalBookings: 5, spent: 1200, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 'C2', fullName: 'Sarah James', email: 'sarah.j@example.com', phone: '+1 555 0192', authProvider: 'Apple', country: 'USA', status: 'Active', joinDate: '2024-01-20', totalBookings: 1, spent: 450, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 'C3', fullName: 'Ahmed Yassin', email: 'ahmed.y@example.com', phone: '+971 50 1234567', authProvider: 'Email', country: 'UAE', status: 'Blocked', joinDate: '2023-08-10', totalBookings: 0, spent: 0, avatar: 'https://i.pravatar.cc/150?u=3' },
];

export const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    c.fullName.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
           <p className="text-sm text-gray-500">Users registered via Mobile App & Web Frontend</p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                 type="text" 
                 placeholder="Search customers..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
           </div>
           <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
              <Filter size={20} />
           </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
           <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                 <th className="px-6 py-4 font-semibold text-gray-600">User Profile</th>
                 <th className="px-6 py-4 font-semibold text-gray-600">Auth Method</th>
                 <th className="px-6 py-4 font-semibold text-gray-600">Location</th>
                 <th className="px-6 py-4 font-semibold text-gray-600">Stats</th>
                 <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                 <th className="px-6 py-4 text-right font-semibold text-gray-600">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
              {filtered.map(customer => (
                 <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                          <img src={customer.avatar} alt={customer.fullName} className="h-10 w-10 rounded-full" />
                          <div>
                             <p className="font-medium text-gray-900">{customer.fullName}</p>
                             <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Mail size={10} /> {customer.email}
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2 text-gray-700">
                          {customer.authProvider === 'Google' || customer.authProvider === 'Facebook' || customer.authProvider === 'Apple' ? 
                             <Shield size={14} className="text-brand-500" /> : 
                             <Mail size={14} className="text-gray-400" />
                          }
                          {customer.authProvider}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                       {customer.country}
                    </td>
                    <td className="px-6 py-4">
                       <div className="text-gray-900 font-medium">${customer.spent.toLocaleString()}</div>
                       <div className="text-xs text-gray-500">{customer.totalBookings} Bookings</div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                       }`}>
                          {customer.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal size={18} />
                       </button>
                    </td>
                 </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};
