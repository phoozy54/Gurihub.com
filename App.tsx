
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { PropertyList } from './components/PropertyList';
import { BookingList } from './components/BookingList';
import { AgencyList } from './components/AgencyList';
import { PaymentSettings } from './components/PaymentSettings';
import { LocationManager } from './components/LocationManager';
import { CustomerList } from './components/CustomerList';
import { OrganizationList } from './components/OrganizationList';
import { AIAssistant } from './components/AIAssistant';
import { Financials } from './components/Financials';
import { Reports } from './components/Reports';
import { Suggestions } from './components/Suggestions';
import { UserManagement } from './components/UserManagement';
import { Maintenance } from './components/Maintenance';
import { OwnerPortal } from './components/OwnerPortal';
import { TenantPortal } from './components/TenantPortal';
import { LawyerPortal } from './components/LawyerPortal';
import { SupplierList } from './components/SupplierList';
import { SupplierPortal } from './components/SupplierPortal';
import { PropertyDetails } from './components/PropertyDetails';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { 
  Property, PropertyStatus, Agency, Booking, BookingStatus, 
  PaymentMethod, Transaction, Organization, OrganizationStatus, Tenant, TenantStatus, Suggestion, User, MaintenanceRequest, Priority, Supplier, LegalCase
} from './types';
import { Smartphone, Download, Github, Code } from 'lucide-react';
import { offlineService } from './services/offlineService';
import { NetworkStatus } from './components/NetworkStatus';

// --- MOCK DATA FOR PLATFORM ---

const MOCK_AGENCIES: Agency[] = [
  { id: 'AG01', name: 'Horn Africa Estates', ownerName: 'Ahmed Ali', email: 'contact@hornafrica.so', phone: '+252 63 4440001', status: 'Active', subscriptionPlan: 'Pro', balance: 4500, logo: '' },
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
    type: 'Villa', 
    pricePerNight: 1500,
    monthlyRent: 1500,
    currency: 'USD' as any,
    bedrooms: 4, 
    bathrooms: 3,
    amenities: ['WiFi', 'Pool', 'AC', 'Kitchen', 'Parking'], 
    status: PropertyStatus.Occupied, 
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', 
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    description: `A luxurious 4-bedroom villa located in the prestigious Shacabka district.\nFeatures a private pool, modern kitchen, and 24/7 security.\nPerfect for diplomats and executives.`,
    ownerDetails: {
      name: 'Ismail Ghelle',
      phone: '+252 63 123456',
      email: 'ismail@diaspora.com',
      contractStartDate: '2023-01-01',
      contractEndDate: '2025-01-01',
      managementFeePercentage: 10,
      notes: 'Owner lives in UK, prefers monthly reports.',
      bankName: 'Dahabshiil Bank',
      accountNumber: '10123456'
    }
  },
  { 
    id: 'P002', 
    agencyId: 'AG02', 
    name: 'Jigjiga Yar Penthouse', 
    city: 'Hargeisa', 
    address: 'Freedom Square', 
    type: 'Apartment', 
    pricePerNight: 850, 
    monthlyRent: 850,
    currency: 'USD' as any,
    bedrooms: 2, 
    bathrooms: 2,
    amenities: ['WiFi', 'Gym', 'View', 'TV'], 
    status: PropertyStatus.Occupied, 
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    description: `Modern penthouse with panoramic city views.\nFully furnished with high-end appliances.\nWalking distance to cafes and shopping centers.`,
    ownerDetails: {
      name: 'Fouzia Ali',
      phone: '+252 65 987654',
      email: 'fouzia@local.so',
      contractStartDate: '2024-03-01',
      contractEndDate: '2026-03-01',
      managementFeePercentage: 8,
      bankName: 'Salaam Bank',
      accountNumber: '30098765'
    }
  },
  { 
    id: 'P003', 
    agencyId: 'AG01', 
    name: 'Berbera Beach House', 
    city: 'Berbera', 
    address: 'Batalaale Beach', 
    type: 'Villa', 
    pricePerNight: 2000, 
    monthlyRent: 2000,
    currency: 'USD' as any,
    bedrooms: 5, 
    bathrooms: 4,
    amenities: ['Beachfront', 'Parking', 'Kitchen', 'Pool', 'AC'], 
    status: PropertyStatus.Available, 
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', 
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574620021666-8809e378c227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    description: `Stunning beachfront property in Batalaale.\nDirect access to the sea, private swimming pool, and spacious entertainment areas.\nIdeal for large families or groups.`,
    ownerDetails: {
      name: 'Ismail Ghelle', // Same owner as P001 to test Owner Portal
      phone: '+252 63 123456',
      email: 'ismail@diaspora.com',
      contractStartDate: '2023-05-01',
      contractEndDate: '2026-05-01',
      managementFeePercentage: 12
    } 
  },
  { 
    id: 'P004', 
    agencyId: 'AG01', 
    name: 'Hargeisa Business Center', 
    city: 'Hargeisa', 
    address: 'Downtown', 
    type: 'Commercial', 
    pricePerNight: 0, 
    monthlyRent: 3000,
    currency: 'USD' as any,
    bedrooms: 0, 
    bathrooms: 2,
    amenities: ['Parking', 'Security', 'WiFi'], 
    status: PropertyStatus.Occupied, 
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', 
    images: [
       'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
       'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
       'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0, 
    units: 12,
    description: `Prime office space in the center of Hargeisa.\nFeatures open-plan layout, high-speed internet, and backup generator.\nSecure parking available.`,
    ownerDetails: {
      name: 'Hargeisa Dev Group',
      phone: '+252 63 000111',
      email: 'corp@hdg.so',
      contractStartDate: '2020-01-01',
      contractEndDate: '2030-01-01',
      managementFeePercentage: 5
    }
  },
];

const MOCK_BOOKINGS: Booking[] = [
  { id: 'B001', propertyId: 'P001', propertyName: 'Shacabka VIP Villa', agencyId: 'AG01', customerId: 'C001', customerName: 'John Doe', checkIn: '2024-11-10', checkOut: '2024-11-15', totalPrice: 750, status: BookingStatus.Confirmed, paymentStatus: 'Paid', paymentMethod: PaymentMethod.Stripe },
  { id: 'B002', propertyId: 'P002', propertyName: 'Jigjiga Yar Penthouse', agencyId: 'AG02', customerId: 'C002', customerName: 'Fatima Omar', checkIn: '2024-11-12', checkOut: '2024-11-14', totalPrice: 170, status: BookingStatus.Pending, paymentStatus: 'Unpaid', paymentMethod: PaymentMethod.Zaad },
  { id: 'B003', propertyId: 'P003', propertyName: 'Berbera Beach House', agencyId: 'AG01', customerId: 'C003', customerName: 'Liibaan Ahmed', checkIn: '2024-12-01', checkOut: '2024-12-05', totalPrice: 800, status: BookingStatus.Confirmed, paymentStatus: 'Paid', paymentMethod: PaymentMethod.Edahab },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TX1', date: '2024-11-01', description: 'Booking B001 Payout', amount: 750, type: 'Income', currency: 'USD' as any, gateway: PaymentMethod.Stripe, status: 'Completed', reference: 'STR-123', category: 'Rent' },
  { id: 'TX2', date: '2024-11-02', description: 'Monthly Sub AG02', amount: 99, type: 'Income', currency: 'USD' as any, gateway: PaymentMethod.PayPal, status: 'Completed', reference: 'PAY-456', category: 'Other' },
  { id: 'TX3', date: '2024-10-01', description: 'Rent Payment - Somtel HQ', amount: 15000, type: 'Income', currency: 'USD' as any, gateway: PaymentMethod.Dahabshiil, status: 'Completed', reference: 'TRN-998', organizationId: 'ORG001', category: 'Rent' },
  { id: 'TX4', date: '2024-09-01', description: 'Rent Payment - Somtel HQ', amount: 15000, type: 'Income', currency: 'USD' as any, gateway: PaymentMethod.Dahabshiil, status: 'Completed', reference: 'TRN-887', organizationId: 'ORG001', category: 'Rent' },
  { id: 'TX5', date: '2024-10-05', description: 'Rent Payment - Dahabshiil Branch', amount: 3500, type: 'Income', currency: 'USD' as any, gateway: PaymentMethod.Dahabshiil, status: 'Completed', reference: 'TRN-112', organizationId: 'ORG002', category: 'Rent' },
  { id: 'TX6', date: '2024-10-05', description: 'Rent Payment - Amina Warsame (T001)', amount: 450, type: 'Income', currency: 'USD' as any, gateway: PaymentMethod.Zaad, status: 'Completed', reference: 'ZD-888', tenantId: 'T001', category: 'Rent' },
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
        propertyName: 'Hargeisa Business Center',
        unitNumber: 'Whole Building',
        rentAmount: 15000,
        leaseStart: '2023-01-01',
        leaseEnd: '2028-01-01'
      }
    ],
    status: OrganizationStatus.Active, 
    email: 'corp@somtel.so', 
    phone: '+252 65 000000', 
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
        propertyId: 'P004',
        propertyName: 'Hargeisa Business Center',
        unitNumber: 'G-Floor',
        rentAmount: 3500,
        leaseStart: '2023-06-01',
        leaseEnd: '2025-06-01'
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
        id: 'R3',
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
  {
    id: 'T001',
    name: 'Amina Warsame',
    propertyId: 'P002',
    propertyName: 'Jigjiga Yar Penthouse',
    unitNumber: '204',
    rentAmount: 850,
    currency: 'USD' as any,
    status: TenantStatus.Active,
    leaseStart: '2024-01-01',
    leaseEnd: '2024-12-31',
    email: 'amina@gmail.com',
    phone: '+252 63 111222',
    balance: 0
  },
  {
    id: 'T002',
    name: 'Farhan Yussuf',
    propertyId: 'P001',
    propertyName: 'Shacabka VIP Villa',
    unitNumber: 'Whole Villa',
    rentAmount: 1500,
    currency: 'USD' as any,
    status: TenantStatus.Active,
    leaseStart: '2023-06-01',
    leaseEnd: '2025-06-01',
    email: 'farhan@diaspora.so',
    phone: '+252 63 555666',
    balance: 0
  }
];

const MOCK_SUPPLIERS: Supplier[] = [
  { id: 'S1', companyName: 'Hargeisa Plumbing Co', contactPerson: 'Mohamed Nur', serviceType: 'Plumbing', phone: '063444555', email: 'plumber@hargeisa.com', status: 'Active', hourlyRate: 20, jobsCompleted: 45, licenseNumber: 'TRD-9988' },
  { id: 'S2', companyName: 'Power & Light Experts', contactPerson: 'Ali Hassan', serviceType: 'Electrical', phone: '063999888', email: 'ali@power.so', status: 'Active', hourlyRate: 25, jobsCompleted: 12, licenseNumber: 'ELC-1122' },
  { id: 'S3', companyName: 'CleanHome Services', contactPerson: 'Sahra Yasin', serviceType: 'Cleaning', phone: '065112233', email: 'clean@services.so', status: 'Active', hourlyRate: 15, jobsCompleted: 108 },
];

const MOCK_USERS: User[] = [
  { id: 'U1', name: 'Admin User', email: 'admin@gurihub.com', role: 'SuperAdmin', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff' },
  { id: 'U2', name: 'Agency Manager', email: 'manager@agency.com', role: 'AgencyManager', agencyId: 'AG01', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Agency+Manager&background=3b82f6&color=fff' },
  { id: 'U3', name: 'Viewer', email: 'viewer@gurihub.com', role: 'Viewer', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Viewer&background=64748b&color=fff' },
  { id: 'U4', name: 'Ismail Ghelle', email: 'ismail@diaspora.com', role: 'Owner', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Ismail+Ghelle&background=7c3aed&color=fff', linkedEntityId: 'PO001' },
  { id: 'U5', name: 'Amina Warsame', email: 'amina@gmail.com', role: 'Tenant', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Amina+Warsame&background=db2777&color=fff', linkedEntityId: 'T001' },
  { id: 'U6', name: 'Jamaal Law', email: 'legal@gurihub.com', role: 'Lawyer', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Jamaal+Law&background=10b981&color=fff' },
  { id: 'U7', name: 'Mohamed Nur', email: 'supplier@gurihub.com', role: 'Supplier', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=Mohamed+Nur&background=f97316&color=fff', linkedEntityId: 'S1' }
];

const MOCK_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'REQ001',
    title: 'AC Not Cooling',
    description: 'The master bedroom AC is blowing hot air.',
    propertyId: 'P001',
    propertyName: 'Shacabka VIP Villa',
    tenantName: 'John Doe',
    dateReported: '2024-11-12',
    priority: Priority.High,
    status: 'In Progress',
    costEstimate: 150,
    assignedSupplierId: 'S2' // Electrical work
  },
  {
    id: 'REQ002',
    title: 'Leaking Sink',
    description: 'Kitchen sink dripping constantly.',
    propertyId: 'P002',
    propertyName: 'Jigjiga Yar Penthouse',
    tenantName: 'Amina Warsame',
    dateReported: '2024-11-14',
    priority: Priority.Low,
    status: 'Open',
    costEstimate: 50,
    assignedSupplierId: 'S1' // Plumbing work for Mohamed Nur (Mock Supplier User)
  }
];

// Mock Legal Cases
const MOCK_LEGAL_CASES: LegalCase[] = [
  {
     id: 'LC001',
     title: 'Lease Agreement Review',
     type: 'Lease Agreement',
     partiesInvolved: ['GuriHub', 'Amina Warsame (Tenant)'],
     status: 'Pending Review',
     priority: Priority.High,
     dateCreated: '2024-11-15',
     description: 'Standard 12-month lease agreement for Jigjiga Yar Penthouse. Please verify clause 4 regarding deposit refund.'
  },
  {
     id: 'LC002',
     title: 'Security Deposit Dispute',
     type: 'Dispute',
     partiesInvolved: ['Ismail Ghelle (Owner)', 'Previous Tenant'],
     status: 'In Progress',
     priority: Priority.Medium,
     dateCreated: '2024-11-10',
     description: 'Tenant claims full deposit refund. Owner claims damages to pool pump ($400). Evidence photos attached.'
  },
  {
     id: 'LC003',
     title: 'Supplier Contract - Plumbing',
     type: 'Supplier Contract',
     partiesInvolved: ['GuriHub', 'Hargeisa Plumbing Co'],
     status: 'Approved',
     priority: Priority.Low,
     dateCreated: '2024-10-01',
     description: 'Annual service level agreement for property maintenance.'
  }
];

// Mock Logic for Generating Suggestions
const generateSuggestions = (props: Property[], orgs: Organization[], txs: Transaction[]): Suggestion[] => {
  const suggestions: Suggestion[] = [];

  // Check Occupancy
  const vacantProps = props.filter(p => p.status === PropertyStatus.Available).length;
  if (vacantProps > 2) {
    suggestions.push({
      id: 'S1',
      title: 'Kordhi Suuq-geynta',
      description: `${vacantProps} guri ayaa banaan. Isticmaal Facebook Ads ama Mobile App Push Notifications si aad u hesho kiraystayaal.`,
      type: 'Operational',
      impact: 'High',
      actionLabel: 'Abuur Olole'
    });
  }

  // Check Late Payments
  const lateOrgs = orgs.filter(o => o.status === OrganizationStatus.Late);
  if (lateOrgs.length > 0) {
    suggestions.push({
      id: 'S2',
      title: 'Lacago Maqan (Late Payments)',
      description: `${lateOrgs.length} hay'adood ayaa daahray. Wadarta: $${lateOrgs.reduce((acc, o) => acc + o.balance, 0)}.`,
      type: 'Financial',
      impact: 'High',
      actionLabel: 'Dir Email Xasuusin'
    });
  }

  return suggestions;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [agencies] = useState(MOCK_AGENCIES);
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [organizations, setOrganizations] = useState(MOCK_ORGANIZATIONS);
  const [tenants, setTenants] = useState(MOCK_TENANTS);
  const [suppliers, setSuppliers] = useState(MOCK_SUPPLIERS);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(MOCK_REQUESTS);
  const [legalCases, setLegalCases] = useState<LegalCase[]>(MOCK_LEGAL_CASES);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(generateSuggestions(properties, organizations, transactions));
  
  // User Management State
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]); // Default to Admin
  
  // Property Details Modal State
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // GitHub State
  const [githubUser, setGithubUser] = useState<any>(null);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubUsername, setGithubUsername] = useState('');

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    // FORCE DEFAULT TO TRUE for all users as requested
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      // If saved setting exists, use it, otherwise default to true
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const fetchGithubData = async () => {
    if (!githubUsername) return;
    setGithubLoading(true);
    try {
      const userRes = await fetch(`https://api.github.com/users/${githubUsername}`);
      const userData = await userRes.json();
      
      const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`);
      const reposData = await reposRes.json();

      if (userData.message !== "Not Found") {
         setGithubUser(userData);
         setGithubRepos(reposData);
      }
    } catch (error) {
      console.error("GitHub Fetch Error", error);
    } finally {
      setGithubLoading(false);
    }
  };

  const addActivity = (text: string, type: 'success' | 'warning' | 'error' | 'info') => {
    console.log(`Activity: ${text} [${type}]`);
    // In a real app, this would update an activity log state
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    setShowLoginPage(false);
    setCurrentUser(null);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setShowLoginPage(false);
    // Set default tab based on role
    if (user.role === 'Tenant') setActiveTab('dashboard'); // Tenant portal view handled in renderContent
    else if (user.role === 'Owner') setActiveTab('dashboard');
    else if (user.role === 'Lawyer') setActiveTab('legal');
    else if (user.role === 'Viewer') setActiveTab('properties');
    else if (user.role === 'Supplier') setActiveTab('dashboard');
    else setActiveTab('dashboard');
  };

  // Helper to filter properties for Viewers
  const getViewerProperties = () => {
     // Viewers see Available properties OR Rented properties that are expiring within 30 days
     const today = new Date();
     const next30Days = new Date();
     next30Days.setDate(today.getDate() + 30);

     return properties.filter(p => {
        if (p.status === PropertyStatus.Available) return true;
        
        if (p.status === PropertyStatus.Occupied) {
           // Find tenant lease end
           const tenant = tenants.find(t => t.propertyId === p.id && t.status === TenantStatus.Active);
           if (tenant) {
              const leaseEndDate = new Date(tenant.leaseEnd);
              return leaseEndDate <= next30Days && leaseEndDate >= today;
           }
        }
        return false;
     });
  };

  const handleTenancyApplication = (applicationData: any) => {
    if (!selectedProperty) return;
    
    // Create a new Booking entry with status AwaitingVetting
    const newBooking: Booking = {
        id: `APP-${Date.now()}`,
        propertyId: selectedProperty.id,
        propertyName: selectedProperty.name,
        agencyId: selectedProperty.agencyId || 'AG01',
        customerId: currentUser?.id || 'GUEST',
        customerName: currentUser?.name || 'Guest User',
        checkIn: new Date().toISOString().split('T')[0], // Placeholder
        checkOut: '', // Placeholder
        totalPrice: 0,
        status: BookingStatus.AwaitingVetting,
        paymentStatus: 'Unpaid',
        paymentMethod: PaymentMethod.Cash
    };

    setBookings([newBooking, ...bookings]);
    addActivity(`New Tenancy Application for ${selectedProperty.name}`, 'info');
    alert("Application Submitted! Our legal team will review your details.");
  };

  const handleSupplierJobUpdate = (jobId: string, newStatus: string) => {
     setMaintenanceRequests(prev => prev.map(req => 
       req.id === jobId ? { ...req, status: newStatus as any } : req
     ));
     addActivity(`Supplier updated job ${jobId} to ${newStatus}`, 'info');
  };

  const renderContent = () => {
    // Handle Special Roles First
    if (currentUser?.role === 'Tenant') {
      if (activeTab === 'settings') return <div className="p-10 dark:text-gray-300">User Settings (Profile, Password)</div>;
      // Find linked tenant record
      const myTenantRec = tenants.find(t => t.id === currentUser.linkedEntityId) || tenants[0]; // Fallback for demo
      return <TenantPortal 
                currentUser={currentUser} 
                tenant={myTenantRec} 
                transactions={transactions} 
                maintenanceRequests={maintenanceRequests}
                onAddMaintenance={(req) => setMaintenanceRequests([req, ...maintenanceRequests])}
             />;
    }

    if (currentUser?.role === 'Owner') {
      if (activeTab === 'settings') return <div className="p-10 dark:text-gray-300">Owner Settings (Bank Info, Notifications)</div>;
      return <OwnerPortal 
                currentUser={currentUser} 
                properties={properties} 
                transactions={transactions} 
                maintenanceRequests={maintenanceRequests}
                tenants={tenants}
                rentals={organizations}
             />;
    }
    
    // Lawyer View
    if (currentUser?.role === 'Lawyer' || (currentUser?.role === 'SuperAdmin' && activeTab === 'legal')) {
       return <LawyerPortal currentUser={currentUser} legalCases={legalCases} setLegalCases={setLegalCases} />;
    }

    // Supplier View
    if (currentUser?.role === 'Supplier') {
      if (activeTab === 'settings') return <div className="p-10 dark:text-gray-300">Supplier Settings</div>;
      const mySupplierRec = suppliers.find(s => s.id === currentUser.linkedEntityId) || suppliers[0];
      return <SupplierPortal 
                currentUser={currentUser}
                supplier={mySupplierRec}
                maintenanceRequests={maintenanceRequests}
                onUpdateRequestStatus={handleSupplierJobUpdate}
             />;
    }

    // --- GRANULAR PERMISSION FILTERING FOR ADMIN/MANAGER/VIEWER ---
    const isAgencyManager = currentUser?.role === 'AgencyManager';
    const myAgencyId = currentUser?.agencyId;

    const filteredProperties = isAgencyManager 
      ? properties.filter(p => p.agencyId === myAgencyId) 
      : properties;

    const filteredBookings = isAgencyManager
      ? bookings.filter(b => b.agencyId === myAgencyId)
      : bookings;

    const filteredTenants = isAgencyManager
      ? tenants.filter(t => {
          const prop = properties.find(p => p.id === t.propertyId);
          return prop?.agencyId === myAgencyId;
      })
      : tenants;

    const filteredOrganizations = isAgencyManager
      ? organizations.filter(org => 
          org.rentals.some(rental => {
             const prop = properties.find(p => p.id === rental.propertyId);
             return prop?.agencyId === myAgencyId;
          })
        )
      : organizations;

    const filteredMaintenance = isAgencyManager
      ? maintenanceRequests.filter(req => {
          const prop = properties.find(p => p.id === req.propertyId);
          return prop?.agencyId === myAgencyId;
      })
      : maintenanceRequests;

    // Filter transactions linked to agency entities
    const filteredTransactions = isAgencyManager
      ? transactions.filter(t => {
          if (t.tenantId) return filteredTenants.some(tn => tn.id === t.tenantId);
          if (t.organizationId) return filteredOrganizations.some(o => o.id === t.organizationId);
          // If transaction has no direct link but is 'Rent', check if it matches any booking or tenant we have (simplified)
          return true; // Keep others visible for now to avoid empty dashboard in demo
      })
      : transactions;

    const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0) + 
                         filteredTransactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);

    const occupancyRate = filteredProperties.length > 0 
      ? Math.round((filteredProperties.filter(p => p.status !== PropertyStatus.Available).length / filteredProperties.length) * 100)
      : 0;

    // Admin / Manager / Viewer Views
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            properties={filteredProperties} 
            tenants={filteredTenants} 
            totalRevenue={totalRevenue} 
            occupancyRate={occupancyRate} 
            activities={[
               {id: '1', text: 'New booking from John Doe via Google Login', timestamp: '10 mins ago', type: 'success'},
               {id: '2', text: 'Agency "Somaliland Stays" registered', timestamp: '1 hour ago', type: 'info'},
               {id: '3', text: 'Payment failed for Booking #B992 (Stripe)', timestamp: '3 hours ago', type: 'error'}
            ]} 
            transactions={filteredTransactions} 
          />
        );
      case 'agencies': return <AgencyList agencies={agencies} currentUser={currentUser!} />;
      case 'bookings': return <BookingList bookings={filteredBookings} currentUser={currentUser!} />;
      case 'properties': 
        return <PropertyList 
                  properties={currentUser?.role === 'Viewer' ? getViewerProperties() : filteredProperties} 
                  setProperties={setProperties} 
                  addActivity={addActivity} 
                  currentUser={currentUser!}
                  tenants={filteredTenants} 
                  rentals={filteredOrganizations} 
                  onViewDetails={(p) => setSelectedProperty(p)}
               />;
      case 'maintenance':
        return <Maintenance requests={filteredMaintenance} setRequests={setMaintenanceRequests} properties={filteredProperties} addActivity={addActivity} />;
      case 'suppliers':
        return <SupplierList suppliers={suppliers} setSuppliers={setSuppliers} addActivity={addActivity} />;
      case 'rentals': 
        return <OrganizationList 
                  organizations={filteredOrganizations} 
                  setOrganizations={setOrganizations} 
                  properties={filteredProperties} 
                  transactions={filteredTransactions} 
                  tenants={filteredTenants} 
                  addActivity={addActivity} 
                  currentUser={currentUser!} 
               />;
      case 'tenants': 
         return <OrganizationList 
                  organizations={filteredOrganizations} 
                  setOrganizations={setOrganizations} 
                  properties={filteredProperties} 
                  transactions={filteredTransactions} 
                  tenants={filteredTenants} 
                  addActivity={addActivity} 
                  currentUser={currentUser!} 
               />;
      case 'locations': return <LocationManager />;
      case 'customers': return <CustomerList />;
      case 'users': return <UserManagement users={users} setUsers={setUsers} agencies={agencies} addActivity={addActivity} currentUser={currentUser!} />;
      case 'payments': 
        return <Financials transactions={filteredTransactions} setTransactions={setTransactions} organizations={filteredOrganizations} addActivity={addActivity} currentUser={currentUser!} />;
      case 'suggestions':
         return <Suggestions suggestions={suggestions} onDismiss={(id) => setSuggestions(s => s.filter(x => x.id !== id))} onApply={(id) => alert(`Applied suggestion ${id}`)} />;
      case 'mobile':
        return (
           <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-6 space-y-8">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 max-w-2xl w-full">
                 <div className="h-20 w-20 bg-brand-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-600 dark:text-brand-400">
                    <Smartphone size={40} />
                 </div>
                 <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Mobile App Management</h2>
                 <p className="text-gray-500 dark:text-gray-400 mb-8">Control versioning, push notifications, and feature flags.</p>
                 <div className="flex gap-4 justify-center mt-8">
                    <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800"><Download size={18} /> Apple App Store</button>
                    <button className="flex items-center gap-2 bg-brand-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-700"><Download size={18} /> Google Play Store</button>
                 </div>
              </div>
           </div>
        );
      case 'settings':
         return (
            <div className="p-6 space-y-6">
               <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Platform Settings</h1>
               
               {/* GitHub Integration Section */}
               <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 flex items-center gap-3">
                     <Github className="text-gray-900 dark:text-white" size={24} />
                     <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">GitHub Integration</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Connect to track your codebase updates</p>
                     </div>
                  </div>
                  
                  <div className="p-6">
                     {!githubUser ? (
                        <div className="flex gap-3 max-w-md">
                           <input 
                              type="text" 
                              placeholder="Enter GitHub Username" 
                              className="flex-1 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                              value={githubUsername}
                              onChange={(e) => setGithubUsername(e.target.value)}
                           />
                           <button 
                              onClick={fetchGithubData} 
                              disabled={githubLoading || !githubUsername}
                              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                           >
                              {githubLoading ? 'Connecting...' : 'Connect'}
                           </button>
                        </div>
                     ) : (
                        <div className="space-y-6">
                           <div className="flex items-center gap-4">
                              <img src={githubUser.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-brand-100" />
                              <div>
                                 <h4 className="font-bold text-lg text-gray-900 dark:text-white">{githubUser.name || githubUser.login}</h4>
                                 <p className="text-gray-500 dark:text-gray-400 text-sm">{githubUser.bio}</p>
                                 <div className="flex gap-4 mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    <span>{githubUser.public_repos} Repos</span>
                                    <span>{githubUser.followers} Followers</span>
                                 </div>
                              </div>
                              <button onClick={() => setGithubUser(null)} className="ml-auto text-sm text-red-500 hover:text-red-700">Disconnect</button>
                           </div>

                           <div>
                              <h4 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                 <Code size={16} /> Recent Repositories
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                 {githubRepos.map((repo: any) => (
                                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="block p-3 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                       <div className="flex justify-between items-start">
                                          <span className="font-medium text-brand-700 dark:text-brand-400 truncate">{repo.name}</span>
                                          <span className="text-[10px] bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600">{repo.language || 'Code'}</span>
                                       </div>
                                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{repo.description || 'No description'}</p>
                                    </a>
                                 ))}
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         );
      default: return <div className="p-10 text-center text-gray-500 dark:text-gray-400">Module under construction</div>;
    }
  };

  if (!isAuthenticated) {
    if (showLoginPage) {
      return <Login onLogin={handleLogin} users={users} />;
    }
    return <LandingPage onLogin={handleLogin} users={users} onSignIn={() => setShowLoginPage(true)} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onOpenAI={() => setIsAIModalOpen(true)}
      currentUser={currentUser!}
      onLogout={onLogout}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    >
      {renderContent()}
      
      <AIAssistant 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        contextData="GuriHub Platform Context" 
        theme={darkMode ? 'dark' : 'light'}
      />
      
      {selectedProperty && (
        <PropertyDetails 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
          onApply={handleTenancyApplication}
        />
      )}
    </Layout>
  );
}
