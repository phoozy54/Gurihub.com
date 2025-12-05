
import React, { useState } from 'react';
import { Booking, BookingStatus, PaymentMethod } from '../types';
import { Search, Calendar, CreditCard, CheckCircle, XCircle, Clock, MapPin, Download, Users } from 'lucide-react';

interface BookingListProps {
  bookings: Booking[];
}

export const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const [filter, setFilter] = useState('All');
  
  const getStatusBadge = (status: BookingStatus) => {
    switch(status) {
      case BookingStatus.Confirmed: return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><CheckCircle size={10} /> Confirmed</span>;
      case BookingStatus.Pending: return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><Clock size={10} /> Pending</span>;
      case BookingStatus.Cancelled: return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1"><XCircle size={10} /> Cancelled</span>;
      default: return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">{status}</span>;
    }
  };

  const getPaymentIcon = (method: PaymentMethod) => {
     if (method === PaymentMethod.Zaad || method === PaymentMethod.Edahab) return <span className="text-green-600 font-bold text-xs">{method} (Mobile)</span>;
     if (method === PaymentMethod.Stripe) return <span className="text-indigo-600 font-bold text-xs">Stripe</span>;
     return <span className="text-gray-600 font-bold text-xs">{method}</span>;
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Booking Management</h1>
            <p className="text-sm text-gray-500">Monitor rentals across all agencies</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700">
             <Download size={16} /> Export CSV
          </button>
       </div>

       {/* Filters */}
       <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Confirmed', 'Pending', 'Checked In'].map(status => (
             <button 
               key={status}
               onClick={() => setFilter(status)}
               className={`px-4 py-2 rounded-full text-xs font-medium border ${filter === status ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
             >
               {status}
             </button>
          ))}
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                <tr>
                   <th className="px-6 py-4 font-semibold">Property & Customer</th>
                   <th className="px-6 py-4 font-semibold">Dates</th>
                   <th className="px-6 py-4 font-semibold">Total Price</th>
                   <th className="px-6 py-4 font-semibold">Status</th>
                   <th className="px-6 py-4 font-semibold">Payment</th>
                   <th className="px-6 py-4 text-right">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                   <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600">
                               <Calendar size={20} />
                            </div>
                            <div>
                               <p className="font-bold text-gray-800">{booking.propertyName}</p>
                               <p className="text-xs text-gray-500 flex items-center gap-1"><Users size={10} /> {booking.customerName}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="text-gray-900 font-medium">{booking.checkIn}</div>
                         <div className="text-xs text-gray-500">to {booking.checkOut}</div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                         ${booking.totalPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                         {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                            <CreditCard size={14} className="text-gray-400" />
                            {getPaymentIcon(booking.paymentMethod)}
                         </div>
                         <div className={`text-[10px] uppercase font-bold mt-1 ${booking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-500'}`}>
                            {booking.paymentStatus}
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-brand-600 hover:text-brand-800 font-medium text-xs">Manage</button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};
