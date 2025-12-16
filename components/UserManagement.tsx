
import React, { useState } from 'react';
import { User, UserRole, Agency } from '../types';
import { Shield, User as UserIcon, Building2, Plus, Trash2, Lock, Search, CheckCircle2, X, LayoutGrid, LayoutList, Key } from 'lucide-react';
import { ROLE_DEFINITIONS, getRoleDefinition } from '../utils/permissions';

interface UserManagementProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  agencies: Agency[];
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  currentUser: User;
}

export const UserManagement: React.FC<UserManagementProps> = ({ users, setUsers, agencies, addActivity, currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'Viewer',
    agencyId: ''
  });

  const isSuperAdmin = currentUser.role === 'SuperAdmin';
  
  // Filter users based on role hierarchy
  const relevantUsers = isSuperAdmin 
    ? users 
    : users.filter(u => u.agencyId === currentUser.agencyId && u.role !== 'SuperAdmin');

  const displayedUsers = relevantUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Allowed roles for creation based on current user's role
  const allowedRoles: UserRole[] = isSuperAdmin 
    ? ['SuperAdmin', 'AgencyManager', 'Viewer'] 
    : ['AgencyManager', 'Viewer'];

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
      addActivity('User deleted from system', 'warning');
    }
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;

    // For Agency Manager creating a user, enforce their agency ID
    const isAgencyManager = currentUser.role === 'AgencyManager';
    const assignedAgencyId = isAgencyManager ? currentUser.agencyId : newUser.agencyId;

    const user: User = {
      id: `U${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as UserRole,
      agencyId: assignedAgencyId,
      status: 'Active',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUser.name!)}&background=random&color=fff`
    };

    setUsers([...users, user]);
    addActivity(`New user created: ${user.name} (${user.role})`, 'success');
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Viewer', agencyId: '' });
  };

  const getRoleStyle = (role: UserRole) => {
    switch (role) {
      case 'SuperAdmin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'AgencyManager': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Viewer': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getAgencyLabel = (user: User) => {
    if (user.role === 'SuperAdmin') return 'System Wide';
    if (user.agencyId) return agencies.find(a => a.id === user.agencyId)?.name || 'Unknown Agency';
    return 'No Agency';
  };

  const stats = [
    { label: 'Total Users', value: relevantUsers.length, icon: UserIcon },
    { label: 'Admins & Managers', value: relevantUsers.filter(u => u.role === 'SuperAdmin' || u.role === 'AgencyManager').length, icon: Shield },
    { label: 'Active Now', value: relevantUsers.length, icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Team & Access</h1>
          <p className="text-gray-500 mt-1">Manage users and assign granular permissions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <Plus size={18} /> Invite User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-gray-50 rounded-xl text-gray-900">
                <stat.icon size={20} />
             </div>
             <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative max-w-lg w-full">
           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
           <input 
              type="text" 
              placeholder="Search by name, email, or role..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent shadow-sm transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-end sm:self-auto shadow-inner border border-gray-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
              title="Grid View"
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
              title="List View"
            >
              <LayoutList size={20} />
            </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
          {displayedUsers.map((user) => (
            <div key={user.id} className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-xl transition-all duration-300 relative hover:border-gray-300">
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {user.id !== currentUser.id && (
                     <button 
                       onClick={() => handleDeleteUser(user.id)}
                       className="p-2 bg-white rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 shadow-sm border border-gray-100 transition-colors"
                       title="Remove User"
                     >
                        <Trash2 size={16} />
                     </button>
                  )}
               </div>

               <div className="flex flex-col items-center text-center mb-4">
                  <div className="relative mb-3 group/avatar cursor-help">
                     <img 
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} 
                        alt={user.name} 
                        className="w-20 h-20 rounded-full object-cover border-4 border-gray-50 shadow-sm" 
                     />
                     <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                     
                     {/* Tooltip */}
                     <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/avatar:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl">
                        <span className="font-bold block">{user.role}</span>
                        <span className="text-gray-300 font-normal">{getAgencyLabel(user)}</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                     </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{user.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{user.email}</p>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleStyle(user.role)}`}>
                     {user.role}
                  </span>
               </div>

               <div className="border-t border-gray-100 my-4"></div>

               <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center text-gray-600">
                     <span className="flex items-center gap-2"><Building2 size={14} className="text-gray-400" /> Agency</span>
                     <span className="font-medium truncate max-w-[120px]">
                        {(user.agencyId || user.role === 'AgencyManager') 
                          ? (agencies.find(a => a.id === user.agencyId)?.name || 'Linked') 
                          : (user.role === 'SuperAdmin' ? 'All Access' : 'N/A')}
                     </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                     <span className="flex items-center gap-2"><Lock size={14} className="text-gray-400" /> Status</span>
                     <span className="font-medium text-green-600">Active</span>
                  </div>
               </div>
            </div>
          ))}
          
          <button 
             onClick={() => setIsModalOpen(true)}
             className="rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-gray-400 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all min-h-[280px]"
          >
             <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Plus size={24} />
             </div>
             <span className="font-bold">Add New User</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
                   <tr>
                      <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">User Profile</th>
                      <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Role</th>
                      <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Agency / Access</th>
                      <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right font-semibold uppercase text-xs tracking-wider">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {displayedUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                               <div className="relative group/avatar cursor-help">
                                  <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} className="w-10 h-10 rounded-full border border-gray-200" alt="" />
                                  {/* Tooltip */}
                                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/avatar:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl">
                                     <span className="font-bold block">{user.role}</span>
                                     <span className="text-gray-300 font-normal">{getAgencyLabel(user)}</span>
                                     <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                  </div>
                               </div>
                               <div>
                                  <p className="font-bold text-gray-900">{user.name}</p>
                                  <p className="text-xs text-gray-500">{user.email}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border inline-flex items-center ${getRoleStyle(user.role)}`}>
                               {user.role}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-gray-600 font-medium">
                            {(user.agencyId || user.role === 'AgencyManager') 
                              ? (agencies.find(a => a.id === user.agencyId)?.name || 'Linked Agency') 
                              : (user.role === 'SuperAdmin' ? 'System Wide' : 'N/A')}
                         </td>
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded-full w-fit border border-green-100 text-xs font-bold">
                               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Active
                            </div>
                         </td>
                         <td className="px-6 py-4 text-right">
                            {user.id !== currentUser.id && (
                              <button 
                                onClick={() => handleDeleteUser(user.id)} 
                                className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                title="Delete User"
                              >
                                 <Trash2 size={16} />
                              </button>
                            )}
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
             {displayedUsers.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                   No users found.
                </div>
             )}
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl scale-100 transform transition-all max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h2 className="text-2xl font-bold text-gray-900">Invite Team Member</h2>
                  <p className="text-gray-500 text-sm">Configure access control and permissions.</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all font-medium"
                  placeholder="e.g. John Doe"
                  value={newUser.name}
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all font-medium"
                  placeholder="user@gurihub.so"
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1 flex items-center gap-1">
                   <Key size={12} /> Select Role & Permissions
                </label>
                <div className="space-y-3">
                   {allowedRoles.map((role) => {
                     const def = getRoleDefinition(role);
                     return (
                     <label key={role} className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${newUser.role === role ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input 
                          type="radio" 
                          name="role" 
                          value={role} 
                          checked={newUser.role === role}
                          onChange={(e) => setNewUser({...newUser, role: e.target.value as UserRole})}
                          className="mt-1 text-black focus:ring-black"
                        />
                        <div className="ml-3 w-full">
                           <span className="block text-sm font-bold text-gray-900">{def.label}</span>
                           <span className="block text-xs text-gray-500 mt-0.5 leading-relaxed">{def.description}</span>
                           
                           {/* Permission Tags */}
                           {newUser.role === role && (
                             <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-gray-200/60">
                                {def.permissions.length > 0 ? def.permissions.map(p => (
                                   <span key={p} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-white border border-gray-200 text-gray-600 shadow-sm capitalize">
                                      {p.replace('manage_', 'Manage ').replace('view_', 'View ')}
                                   </span>
                                )) : <span className="text-[10px] text-gray-400 italic">No administrative permissions.</span>}
                             </div>
                           )}
                        </div>
                     </label>
                   )})}
                </div>
              </div>

              {isSuperAdmin && (newUser.role === 'AgencyManager' || newUser.role === 'Viewer') && (
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">Assign Agency</label>
                   <select 
                     className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3.5 text-sm focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                     value={newUser.agencyId}
                     onChange={e => setNewUser({...newUser, agencyId: e.target.value})}
                   >
                     <option value="">Select an Agency</option>
                     {agencies.map(agency => (
                       <option key={agency.id} value={agency.id}>{agency.name}</option>
                     ))}
                   </select>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="flex-1 px-6 py-3.5 text-gray-700 hover:bg-gray-100 rounded-xl text-sm font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddUser}
                disabled={
                   !newUser.name || 
                   !newUser.email || 
                   (isSuperAdmin && (newUser.role === 'AgencyManager' || newUser.role === 'Viewer') && !newUser.agencyId)
                }
                className="flex-[2] px-6 py-3.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
