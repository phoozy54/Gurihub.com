
import React, { useState } from 'react';
import { Supplier, MaintenanceRequest, User, Priority } from '../types';
import { Wrench, CheckCircle2, Clock, DollarSign, Star, Calendar, MapPin, AlertTriangle, Phone } from 'lucide-react';

interface SupplierPortalProps {
  currentUser: User | null;
  supplier: Supplier;
  maintenanceRequests: MaintenanceRequest[];
  onUpdateRequestStatus: (id: string, newStatus: string) => void;
}

export const SupplierPortal: React.FC<SupplierPortalProps> = ({ currentUser, supplier, maintenanceRequests, onUpdateRequestStatus }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'profile'>('overview');

  // Filter requests assigned to this supplier
  // Note: For demo purposes, we might show all open maintenance if no explicit assignment exists, 
  // but logically we should match by ID.
  const myJobs = maintenanceRequests.filter(req => req.assignedSupplierId === supplier.id || req.status === 'Open'); 
  const completedJobs = supplier.jobsCompleted; // Using static number for demo stats
  
  // Calculate mock earnings based on jobs completed * rate * avg hours (e.g. 2 hrs)
  const totalEarnings = completedJobs * supplier.hourlyRate * 2;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">New Job</span>;
      case 'In Progress': return <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">In Progress</span>;
      case 'Resolved': return <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Completed</span>;
      default: return <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="h-16 w-16 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Wrench size={32} />
           </div>
           <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {supplier.contactPerson}</h1>
              <p className="text-gray-500">{supplier.companyName} • {supplier.serviceType} Specialist</p>
           </div>
        </div>
        <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${supplier.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {supplier.status === 'Active' ? 'Verified Pro' : 'Verification Pending'}
            </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
         {['overview', 'jobs', 'profile'].map((tab) => (
            <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab 
                  ? 'border-brand-600 text-brand-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
               }`}
            >
               {tab}
            </button>
         ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active Jobs</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{myJobs.filter(j => j.status !== 'Resolved').length}</h3>
                 </div>
                 <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Clock size={20} /></div>
              </div>
              <p className="text-xs text-blue-600 font-medium">Requires attention</p>
           </div>
           
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Earnings</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">${totalEarnings.toLocaleString()}</h3>
                 </div>
                 <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={20} /></div>
              </div>
              <p className="text-xs text-green-600 font-medium">Based on {completedJobs} jobs</p>
           </div>

           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Jobs Done</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">{completedJobs}</h3>
                 </div>
                 <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><CheckCircle2 size={20} /></div>
              </div>
              <p className="text-xs text-gray-500 font-medium">Lifetime completed</p>
           </div>

           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Rating</p>
                    <div className="flex items-center gap-1 mt-1">
                        <h3 className="text-3xl font-bold text-gray-900">4.9</h3>
                        <Star size={20} className="fill-orange-400 text-orange-400" />
                    </div>
                 </div>
                 <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Star size={20} /></div>
              </div>
              <p className="text-xs text-gray-500 font-medium">Top Rated Pro</p>
           </div>

           {/* Recent Assignments Table */}
           <div className="md:col-span-2 lg:col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                 <h3 className="font-bold text-gray-900">Recent Assignments</h3>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                       <tr>
                          <th className="px-6 py-3 font-semibold">Job Title</th>
                          <th className="px-6 py-3 font-semibold">Location</th>
                          <th className="px-6 py-3 font-semibold">Priority</th>
                          <th className="px-6 py-3 font-semibold">Status</th>
                          <th className="px-6 py-3 font-semibold text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {myJobs.slice(0, 5).map(job => (
                          <tr key={job.id} className="hover:bg-gray-50">
                             <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{job.title}</div>
                                <div className="text-xs text-gray-500">{job.dateReported}</div>
                             </td>
                             <td className="px-6 py-4 text-gray-600">
                                <div className="flex items-center gap-1">
                                   <MapPin size={14} className="text-gray-400" /> {job.propertyName}
                                </div>
                             </td>
                             <td className="px-6 py-4">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                   job.priority === Priority.High || job.priority === Priority.Critical ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                   {job.priority}
                                </span>
                             </td>
                             <td className="px-6 py-4">
                                {getStatusBadge(job.status)}
                             </td>
                             <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => setActiveTab('jobs')}
                                  className="text-brand-600 font-medium hover:text-brand-700 text-xs border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-50"
                                >
                                   View Details
                                </button>
                             </td>
                          </tr>
                       ))}
                       {myJobs.length === 0 && (
                          <tr>
                             <td colSpan={5} className="px-6 py-8 text-center text-gray-500 italic">No active jobs found.</td>
                          </tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'jobs' && (
         <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {myJobs.map(job => (
               <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                           job.priority === Priority.Critical ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                           {job.priority}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                           <Calendar size={12} /> Reported: {job.dateReported}
                        </span>
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                     <p className="text-gray-600 text-sm mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        {job.description}
                     </p>
                     
                     <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                           <MapPin size={16} className="text-brand-600" />
                           <span className="font-medium">{job.propertyName}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                           <Phone size={16} className="text-brand-600" />
                           <span>Tenant Contact Available</span>
                        </div>
                     </div>
                  </div>

                  <div className="w-full md:w-64 flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0">
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Update Status</p>
                     {job.status !== 'Resolved' ? (
                        <>
                           {job.status === 'Open' && (
                              <button 
                                 onClick={() => onUpdateRequestStatus(job.id, 'In Progress')}
                                 className="w-full py-2 bg-brand-600 text-white rounded-lg font-bold text-sm hover:bg-brand-700 shadow-sm"
                              >
                                 Accept & Start Job
                              </button>
                           )}
                           {job.status === 'In Progress' && (
                              <button 
                                 onClick={() => onUpdateRequestStatus(job.id, 'Resolved')}
                                 className="w-full py-2 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 shadow-sm"
                              >
                                 Mark Completed
                              </button>
                           )}
                           <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50">
                              Report Issue
                           </button>
                        </>
                     ) : (
                        <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center font-bold text-sm border border-green-100 flex items-center justify-center gap-2">
                           <CheckCircle2 size={16} /> Job Completed
                        </div>
                     )}
                  </div>
               </div>
            ))}
             {myJobs.length === 0 && (
                <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                   <Wrench size={48} className="mx-auto mb-3 opacity-20" />
                   <p>No jobs currently assigned to you.</p>
                </div>
             )}
         </div>
      )}

      {activeTab === 'profile' && (
         <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Supplier Profile</h3>
            
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Company Name</label>
                     <input type="text" value={supplier.companyName} readOnly className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 font-medium" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Contact Person</label>
                     <input type="text" value={supplier.contactPerson} readOnly className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 font-medium" />
                  </div>
               </div>

               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Service Type</label>
                  <input type="text" value={supplier.serviceType} readOnly className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 font-medium" />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Phone</label>
                     <input type="text" value={supplier.phone} readOnly className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 font-medium" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Email</label>
                     <input type="text" value={supplier.email} readOnly className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 font-medium" />
                  </div>
               </div>

               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Hourly Rate ($)</label>
                  <input type="text" value={supplier.hourlyRate} readOnly className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 font-medium" />
               </div>
               
               {supplier.licenseNumber && (
                  <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Trade License No.</label>
                     <div className="flex items-center gap-2 bg-green-50 border border-green-100 p-2.5 rounded-lg text-green-700 font-mono">
                        <CheckCircle2 size={16} /> {supplier.licenseNumber}
                     </div>
                  </div>
               )}
            </div>
         </div>
      )}
    </div>
  );
};
