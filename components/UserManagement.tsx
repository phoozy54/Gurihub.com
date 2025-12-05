
import React, { useState } from 'react';
import { User, UserRole, Agency } from '../types';
import { Shield, User as UserIcon, Mail, Building2, Plus, X, Trash2, Check, Lock } from 'lucide-react';

interface UserManagementProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  agencies: Agency[];
  addActivity: (text: string, type: 'success' | 'warning' | 'error' | 'info') => void;
  currentUser: User;
}

export const UserManagement: React.FC<UserManagementProps> = ({ users, setUsers, agencies, addActivity, currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'Viewer',
    agencyId: ''
  });

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
      addActivity('User deleted from system', 'warning');
    }
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;

    const user: User = {
      id: `U${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as UserRole,
      agencyId: newUser.role === 'AgencyManager' ? newUser.agencyId : undefined
    };

    setUsers([...users, user]);
    addActivity(`New user created: ${user.name} (${user.role})`, 'success');
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Viewer', agencyId: '' });
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'SuperAdmin':
        return <span className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-bold"><Shield size={10} /> Super Admin</span>;
      case 'AgencyManager':
        return <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-bold"><Building2 size={10} /> Agency Manager</span>;
      case 'Viewer':
        return <span className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs font-bold"><UserIcon size={10} /> Viewer</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500">Manage system access and assign roles</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm flex items-center gap-2"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-700">User Details</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Role & Permissions</th>
              <th className="px-6 py-4 font-semibold text-gray-700">Agency Access</th>
              <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${
                      user.role === 'SuperAdmin' ? 'bg-purple-600' : 
                      user.role === 'AgencyManager' ? 'bg-blue-600' : 'bg-gray-500'
                    }`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail size={10} /> {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getRoleBadge(user.role)}
                  <p className="text-xs text-gray-500 mt-1 pl-1">
                    {user.role === 'SuperAdmin' ? 'Full System Access' : 
                     user.role === 'AgencyManager' ? 'Manage assigned agency only' : 
                     'Read-only access'}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {user.role === 'AgencyManager' && user.agencyId ? (
                    <span className="flex items-center gap-1.5 text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200 text-xs">
                       <Building2 size={12} className="text-gray-400" />
                       {agencies.find(a => a.id === user.agencyId)?.name || 'Unknown Agency'}
                    </span>
                  ) : user.role === 'SuperAdmin' ? (
                    <span className="text-xs text-purple-600 font-medium">All Agencies</span>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {user.id !== currentUser.id && (
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  {user.id === currentUser.id && (
                    <span className="text-xs text-gray-400 italic">Current User</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-800">Add System User</h2>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="e.g. John Doe"
                  value={newUser.name}
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="user@rentalpro.so"
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="grid grid-cols-1 gap-2">
                   {['Viewer', 'AgencyManager', 'SuperAdmin'].map((role) => (
                     <label key={role} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${newUser.role === role ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input 
                          type="radio" 
                          name="role" 
                          value={role} 
                          checked={newUser.role === role}
                          onChange={(e) => setNewUser({...newUser, role: e.target.value as UserRole})}
                          className="text-brand-600 focus:ring-brand-500"
                        />
                        <div className="ml-3">
                           <span className="block text-sm font-medium text-gray-900">
                             {role === 'SuperAdmin' ? 'Super Admin' : role === 'AgencyManager' ? 'Agency Manager' : 'Viewer'}
                           </span>
                           <span className="block text-xs text-gray-500">
                             {role === 'SuperAdmin' ? 'Full access to all features' : role === 'AgencyManager' ? 'Manage specific agency data' : 'Read-only access'}
                           </span>
                        </div>
                     </label>
                   ))}
                </div>
              </div>

              {newUser.role === 'AgencyManager' && (
                <div className="animate-in fade-in slide-in-from-top-2">
                   <label className="block text-sm font-medium text-gray-700 mb-1">Assign Agency</label>
                   <select 
                     className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
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

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start gap-2">
                 <Lock className="text-blue-500 mt-0.5 flex-shrink-0" size={14} />
                 <p className="text-xs text-blue-700">
                    An email invitation will be sent to the user to set their password.
                 </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
              <button 
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email || (newUser.role === 'AgencyManager' && !newUser.agencyId)}
                className="px-6 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm disabled:opacity-50"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
