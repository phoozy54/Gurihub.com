
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { PropertyList } from './components/PropertyList';
import { BookingList } from './components/BookingList';
import { AgencyList } from './components/AgencyList';
import { PaymentSettings } from './components/PaymentSettings';
import { LocationManager } from './components/LocationManager';
import { CustomerList } from './components/CustomerList';
import { UnifiedTenantManager } from './components/UnifiedTenantManager';
import { AIAssistant } from './components/AIAssistant';
import { Financials } from './components/Financials';
import { UserManagement } from './components/UserManagement';
import { Login } from './components/Login';
import { Reports } from './components/Reports';
import { Suggestions } from './components/Suggestions';
import { Maintenance } from './components/Maintenance';
import { 
  Property, PropertyStatus, Agency, Booking, BookingStatus, 
  Customer, PaymentMethod, Transaction, ActivityLog, Organization, OrganizationStatus, Tenant, TenantStatus, User, Currency, Priority, Suggestion, MaintenanceRequest
} from './types';
import { Smartphone, Download, Settings } from 'lucide-react';
import { offlineService } from './services/offlineService';
import { NetworkStatus } from './components/NetworkStatus';

// --- MOCK DATA FOR SOMALILAND RENTAL SYSTEM ---

const MOCK_AGENCIES: Agency[] = [
  { id: 'AG01', name: 'Horn Africa Estates', ownerName: 'Ahmed Ali', email: 'ahmed@hornafrica.so', phone: '+252 63 4440001', status: 'Active', subscriptionPlan: 'Pro', balance: 4500, logo: '' },
  { id: 'AG02', name: 'Red Sea Rentals', ownerName: 'Sara Hassan', email: 'sara@redsea.so', phone: '+252 65 9991122', status: 'Active', subscriptionPlan: 'Enterprise', balance: 12000, logo: '' },
  { id: 'AG03', name: 'Somaliland Stays', ownerName: 'Khadar Yasin', email: 'info@slstays.com', phone: '+252 63 3334444', status: 'Pending', subscriptionPlan: 'Basic', balance: 0, logo: '' },
];

const MOCK_PROPERTIES: Property[] = [
  { 
    id: 'P001', 
    agencyId: 'AG01', 
    name: 'Shacabka VIP Villa', 
    city: 'Hargeisa', 
    address: 'Road 1, Shacabka',
    lat: 9.555,
    lng: 44.050,
    type: 'Villa', 
    monthlyRent: 1500, 
    currency: Currency.USD, 
    bedrooms: 5, 
    amenities: ['WiFi', 'Generator', 'Security', 'Water Tank'], 
    status: PropertyStatus.Occupied, 
    image: 'https://images.unsplash.com/photo-1600596542815-2495db98dada?auto=format&fit=crop&w=800&q=80', 
    rating: 4.8, 
    units: 1 
  },
  { 
    id: 'P002', 
    agencyId: 'AG02', 
    name: 'Jigjiga Yar Apartments', 
    city: 'Hargeisa', 
    address: 'Freedom Square', 
    lat: 9.565,
    lng: 44.065,
    type: 'Apartment', 
    monthlyRent: 350, 
    currency: Currency.USD, 
    bedrooms: 3, 
    amenities: ['WiFi', 'Gym', 'Balcony'], 
    status: PropertyStatus.Available, 
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 
    rating: 4.5, 
    units: 6 
  },
  { 
    id: 'P003', 
    agencyId: 'AG01', 
    name: 'Berbera Beach Compound', 
    city: 'Berbera', 
    address: 'Batalaale Beach', 
    lat: 10.435,
    lng: 45.025,
    type: 'Compound', 
    monthlyRent: 800, 
    currency: Currency.USD, 
    bedrooms: 4, 
    amenities: ['Beachfront', 'Parking', 'AC'], 
    status: PropertyStatus.Available, 
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', 
    rating: 4.9, 
    units: 4 
  },
  { 
    id: 'P004', 
    agencyId: 'AG01', 
    name: 'Borama Family House', 
    city: 'Borama', 
    address: 'Main Road', 
    lat: 9.935,
    lng: 43.185,
    type: 'Family House', 
    monthlyRent: 200, 
    currency: Currency.USD, 
    bedrooms: 3, 
    amenities: ['Garden', 'Parking'], 
    status: PropertyStatus.Occupied, 
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&w=800&q=80', 
    rating: 4.2, 
    units: 1 
  },
];

const MOCK_BOOKINGS: Booking[] = [
  { id: 'B001', propertyId: 'P003', propertyName: 'Berbera Beach Compound', agencyId: 'AG01', customerId: 'C001', customerName: 'Liban Yusuf', checkIn: '2024-11-10', checkOut: '2024-11-15', totalPrice: 400, status: BookingStatus.Confirmed, paymentStatus: 'Paid', paymentMethod: PaymentMethod.Zaad },
];

const MOCK_ORGANIZATIONS: Organization[] = [
  { 
    id: 'ORG001', 
    name: 'Somtel Headquarters', 
    contactPerson: 'Abdirahman Ali', 
    rentals: [
      {
        id: 'R1',
        propertyId: 'P004',
        propertyName: 'Hargeisa Business Center (Mock)',
        unitNumber: 'Whole Building',
        rentAmount: 15000,
        leaseStart: '2023-01-01',
        leaseEnd: '2028-01-01'
      }
    ],
    status: OrganizationStatus.Active, 
    email: 'corp@somtel.so', 
    phone: '+252 63 000000', 
    balance: 0,
    taxId: 'TRN-998877'
  },
  { 
    id: 'ORG002', 
    name: 'Dahabshiil Bank Branch', 
    contactPerson: 'Mariam Yusuf', 
    rentals: [
      {
        id: 'R2',
        propertyId: 'P002',
        propertyName: 'Jigjiga Yar Apartments',
        unitNumber: 'Suite 201',
        rentAmount: 1200,
        leaseStart: '2024-01-01',
        leaseEnd: '2024-12-31'
      }
    ],
    status: OrganizationStatus.Active, 
    email: 'branch.mgr@dahabshiil.com', 
    phone: '+252 63 444333', 
    balance: 0,
    taxId: 'TRN-112233'
  },
  { 
    id: 'ORG003', 
    name: 'UN Habitat Office', 
    contactPerson: 'James Smith', 
    rentals: [
      {
        id: 'R4',
        propertyId: 'P001',
        propertyName: 'Shacabka VIP Villa',
        unitNumber: 'Main Villa',
        rentAmount: 4000,
        leaseStart: '2024-01-01',
        leaseEnd: '2024-12-31'
      }
    ],
    status: OrganizationStatus.Late, 
    email: 'admin@unhabitat.org', 
    phone: '+252 63 999888', 
    balance: 4000,
    taxId: 'UN-EXEMPT'
  }
];

const MOCK_TENANTS: Tenant[] = [
  { id: 'T001', name: 'Farah Abdi', propertyId: 'P002', propertyName: 'Jigjiga Yar Apartments', unitNumber: 'Flat 3', rentAmount: 350, currency: Currency.USD, status: TenantStatus.Active, leaseStart: '2024-01-01', leaseEnd: '2024-12-31', email: 'farah@somtel.so', phone: '123', balance: 0 },
  { id: 'T002', name: 'Amina Keyse', propertyId: 'P004', propertyName: 'Borama Family House', unitNumber: 'Main', rentAmount: 200, currency: Currency.USD, status: TenantStatus.Active, leaseStart: '2024-01-01', leaseEnd: '2024-12-31', email: 'amina@gmail.com', phone: '124', balance: 0 },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TX1', date: '2024-11-01', description: 'Rent - Farah Abdi', amount: 350, currency: Currency.USD, type: 'Income', gateway: PaymentMethod.Zaad, status: 'Completed', reference: 'ZD-123456', category: 'Rent' },
  { id: 'TX2', date: '2024-11-02', description: 'Rent - Amina Keyse', amount: 200, currency: Currency.USD, type: 'Income', gateway: PaymentMethod.Edahab, status: 'Completed', reference: 'ED-987654', category: 'Rent' },
  { id: 'TX3', date: '2024-10-01', description: 'Rent - Somtel HQ', amount: 15000, currency: Currency.USD, type: 'Income', gateway: PaymentMethod.Dahabshiil, status: 'Completed', reference: 'TRN-998', organizationId: 'ORG001', category: 'Rent' },
  { id: 'TX4', date: '2024-11-05', description: 'Utility Bill - Water', amount: 45, currency: Currency.USD, type: 'Expense', gateway: PaymentMethod.Cash, status: 'Completed', reference: 'UTIL-001', category: 'Utility' },
];

const MOCK_USERS: User[] = [
  { id: 'U001', name: 'Mohamed Admin', email: 'admin@rentalpro.so', role: 'SuperAdmin' },
  { id: 'U002', name: 'Agency Manager', email: 'manager@hornafrica.so', role: 'AgencyManager', agencyId: 'AG01' },
  { id: 'U003', name: 'Viewer', email: 'viewer@rentalpro.so', role: 'Viewer' },
];

const MOCK_MAINTENANCE: MaintenanceRequest[] = [
  { id: 'R1', title: 'Generator Repair', description: 'Generator not starting automatically during outage.', propertyId: 'P001', propertyName: 'Shacabka VIP Villa', tenantName: 'System User', dateReported: '2024-11-01', priority: Priority.High, status: 'Open', costEstimate: 100 },
  { id: 'R2', title: 'AC Leaking', description: 'Master bedroom AC dripping water.', propertyId: 'P002', propertyName: 'Jigjiga Yar Apartments', tenantName: 'Farah Abdi', dateReported: '2024-11-03', priority: Priority.Medium, status: 'In Progress', costEstimate: 50 },
  { id: 'R3', title: 'Broken Window', description: 'Storm damage to front window.', propertyId: 'P004', propertyName: 'Borama Family House', tenantName: 'Amina Keyse', dateReported: '2024-11-05', priority: Priority.Critical, status: 'Open', costEstimate: 200 },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [agencies] = useState(MOCK_AGENCIES);
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  const [bookings] = useState(MOCK_BOOKINGS);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [organizations, setOrganizations] = useState(MOCK_ORGANIZATIONS);
  const [tenants, setTenants] = useState(MOCK_TENANTS);
  const [maintenanceRequests, setMaintenanceRequests] = useState(MOCK_MAINTENANCE);
  const [activities, setActivities] = useState<ActivityLog[]>([
     {id: '1', text: 'Rent received from Farah Abdi via Zaad', timestamp: '10 mins ago', type: 'success'},
     {id: '2', text: 'Utility bill (Water) paid for Villa 1', timestamp: '1 hour ago', type: 'info'},
     {id: '3', text: 'Maintenance request: Generator fix', timestamp: '3 hours ago', type: 'warning'}
  ]);
  
  // Logic for smart suggestions
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    // Generate some dynamic suggestions based on state
    const newSuggestions: Suggestion[] = [];
    
    // 1. Check Occupancy
    const vacantProps = properties.filter(p => p.status === PropertyStatus.Available);
    if (vacantProps.length > 2) {
      newSuggestions.push({
        id: 'sug-1',
        title: 'Kordhi Suuq-geynta',
        description: `Waxaa jira ${vacantProps.length} guri oo bannaan (Vacant). Tixgeli inaad xayaysiis u samayso Jigjiga Yar iyo Berbera.`,
        type: 'Occupancy',
        impact: 'High',
        actionLabel: 'Abuur Xayaysiis'
      });
    }

    // 2. Check Late Payments
    const lateTenants = tenants.filter(t => t.status === TenantStatus.Late || t.balance > 0);
    if (lateTenants.length > 0) {
      newSuggestions.push({
        id: 'sug-2',
        title: 'Dakhliga Maqan',
        description: `${lateTenants.length} kirayste ayaa leh lacago daahsan. Wadarta: $${lateTenants.reduce((s,t) => s + t.balance, 0)}. Dir xasuusin SMS ah.`,
        type: 'Financial',
        impact: 'High',
        actionLabel: 'Dir SMS Xasuusin'
      });
    }

    // 3. Lease Expiry (Mock logic - check for 2024 end dates)
    const expiringLeases = tenants.filter(t => t.leaseEnd.startsWith('2024-12'));
    if (expiringLeases.length > 0) {
       newSuggestions.push({
          id: 'sug-3',
          title: 'Cusboonaysiinta Heshiisyada',
          description: `${expiringLeases.length} heshiis ayaa dhacaya bisha December. Diyaari heshiisyada cusub ee 2025.`,
          type: 'Tenant',
          impact: 'Medium',
          actionLabel: 'Eeg Liiska'
       });
    }

    setSuggestions(newSuggestions);
  }, [properties, tenants]);

  // Handle Offline Sync
  useEffect(() => {
    const handleOnline = () => {
      offlineService.processQueue((action) => {
         // Replay actions
         console.log("Processing offline action:", action);
         if (action.type === 'ADD_TRANSACTION') {
            const tx = action.payload as Transaction;
            setTransactions(prev => [tx, ...prev]);
            addActivity(`Offline transaction synced: $${tx.amount}`, 'success');
         }
      });
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    addActivity(`User ${user.name} logged in`, 'info');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  // Helper to switch user role for demo purposes based on available users list
  const switchUserRole = () => {
    if (!currentUser) return;
    const currentIndex = users.findIndex(u => u.id === currentUser.id);
    const nextIndex = (currentIndex + 1) % users.length;
    setCurrentUser(users[nextIndex]);
    setActiveTab('dashboard'); // Reset view to dashboard on switch
  };

  // Helper for adding activity
  const addActivity = (text: string, type: 'success' | 'warning' | 'error' | 'info') => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: 'Just now'
    };
    setActivities(prev => [newLog, ...prev]);
  };

  const renderContent = () => {
    if (!currentUser) return null;

    // --- FILTER DATA FOR AGENCY MANAGERS ---
    const isAgencyManager = currentUser.role === 'AgencyManager';
    const myAgencyId = currentUser.agencyId;

    const filteredProperties = isAgencyManager 
      ? properties.filter(p => p.agencyId === myAgencyId) 
      : properties;

    // Filter Organizations (Corporate Tenants) - Show only if they rent properties belonging to this agency
    const filteredOrganizations = isAgencyManager
      ? organizations.filter(org => 
          org.rentals.some(rental => {
            const prop = properties.find(p => p.id === rental.propertyId);
            return prop?.agencyId === myAgencyId;
          })
        )
      : organizations;

    const filteredTenants = isAgencyManager
      ? tenants.filter(t => {
          const prop = properties.find(p => p.id === t.propertyId);
          return prop?.agencyId === myAgencyId;
      })
      : tenants;

    const filteredBookings = isAgencyManager
      ? bookings.filter(b => b.agencyId === myAgencyId)
      : bookings;

    const filteredTransactions = isAgencyManager
      ? transactions.filter(t => {
          // Simplistic filtering: If it's income/expense, assume it matches properties owned by agency
          // In real app, transaction would have agencyId
          return true; 
      })
      : transactions;

    // Filter Maintenance Requests
    const filteredMaintenance = isAgencyManager
      ? maintenanceRequests.filter(m => filteredProperties.some(p => p.id === m.propertyId))
      : maintenanceRequests;


    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <Dashboard 
              properties={filteredProperties} 
              tenants={filteredTenants} 
              totalRevenue={filteredTransactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0)} 
              occupancyRate={Math.round((filteredProperties.filter(p => p.status === PropertyStatus.Occupied).length / (filteredProperties.length || 1)) * 100)} 
              activities={activities} 
              transactions={filteredTransactions} 
            />
            <Suggestions 
               suggestions={suggestions} 
               onDismiss={(id) => setSuggestions(prev => prev.filter(s => s.id !== id))}
               onApply={(id) => {
                  alert("Action applied! System updated.");
                  setSuggestions(prev => prev.filter(s => s.id !== id));
               }}
            />
          </div>
        );
      case 'agencies':
        return <AgencyList agencies={agencies} />;
      case 'bookings':
        return <BookingList bookings={filteredBookings} />;
      case 'properties':
        return <PropertyList properties={filteredProperties} setProperties={setProperties} addActivity={addActivity} currentUser={currentUser} />;
      case 'tenants':
        return (
          <UnifiedTenantManager
            tenants={filteredTenants}
            setTenants={setTenants}
            organizations={filteredOrganizations}
            setOrganizations={setOrganizations}
            properties={filteredProperties}
            transactions={filteredTransactions}
            addActivity={addActivity}
            currentUser={currentUser}
          />
        );
      case 'maintenance':
        return (
          <Maintenance 
            requests={filteredMaintenance} 
            setRequests={setMaintenanceRequests} 
            properties={filteredProperties}
            addActivity={addActivity} 
          />
        );
      case 'locations':
        return <LocationManager />;
      case 'customers':
        return <CustomerList />;
      case 'users':
        return <UserManagement users={users} setUsers={setUsers} agencies={agencies} addActivity={addActivity} currentUser={currentUser} />;
      case 'payments':
        return <Financials transactions={filteredTransactions} setTransactions={setTransactions} addActivity={addActivity} organizations={filteredOrganizations} currentUser={currentUser} />;
      case 'reports':
        return <Reports />;
      case 'mobile':
        return (
           <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-6 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl w-full">
                 <div className="h-20 w-20 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-600">
                    <Smartphone size={40} />
                 </div>
                 <h2 className="text-3xl font-bold text-gray-800 mb-2">Mobile App Management</h2>
                 <p className="text-gray-500 mb-8">
                    Control the Tenant App (Android/iOS) for rent payments via Zaad/eDahab.
                 </p>
                 <div className="flex gap-4 justify-center mt-8">
                    <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800">
                       <Download size={18} /> Apple App Store
                    </button>
                    <button className="flex items-center gap-2 bg-brand-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-700">
                       <Download size={18} /> Google Play Store
                    </button>
                 </div>
              </div>
           </div>
        );
      case 'settings':
         return (
            <div className="p-6">
               <h1 className="text-2xl font-bold text-gray-800 mb-6">Platform Settings</h1>
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
                  <div className="p-6 flex items-center justify-between">
                     <div>
                        <h3 className="font-medium text-gray-900">Currency & Region</h3>
                        <p className="text-sm text-gray-500">Default: Somaliland (USD/SLSh)</p>
                     </div>
                     <button className="text-brand-600 font-medium text-sm">Configure</button>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                     <div>
                        <h3 className="font-medium text-gray-900">Lease Contracts</h3>
                        <p className="text-sm text-gray-500">Template: Islamic-compliant Residential</p>
                     </div>
                     <button className="text-brand-600 font-medium text-sm">Edit Template</button>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                     <div>
                        <h3 className="font-medium text-gray-900">GitHub Integration</h3>
                        <p className="text-sm text-gray-500">Sync code and deployments</p>
                     </div>
                     <button className="text-gray-500 font-medium text-sm cursor-not-allowed">Connected</button>
                  </div>
               </div>
               <div className="mt-8">
                  <PaymentSettings />
               </div>
            </div>
         );
      default:
        return <div className="p-10 text-center text-gray-500">Module under construction</div>;
    }
  };

  if (!isAuthenticated || !currentUser) {
    return <Login onLogin={handleLogin} users={users} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onOpenAI={() => setIsAIModalOpen(true)}
      currentUser={currentUser}
      onSwitchUser={switchUserRole}
      onLogout={handleLogout}
    >
      <NetworkStatus />
      {renderContent()}
      <AIAssistant isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} contextData={`Current User Role: ${currentUser.role}. Page: ${activeTab}`} />
    </Layout>
  );
}
