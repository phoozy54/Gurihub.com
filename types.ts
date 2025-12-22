
/**
 * GuriHub Data Schemas (Frappe-Compatible)
 * These types reflect the structure of a future Frappe backend.
 */

// Fix: Enum for property availability status
export enum PropertyStatus { 
  Available = 'Available', 
  Booked = 'Booked', 
  Occupied = 'Occupied', 
  Maintenance = 'Maintenance' 
}

// Fix: Enum for tenant lease status
export enum TenantStatus { 
  Active = 'Active', 
  Late = 'Late', 
  Past = 'Past' 
}

// Fix: Enum for task priority levels
export enum Priority { 
  Low = 'Low', 
  Medium = 'Medium', 
  High = 'High', 
  Critical = 'Critical' 
}

// Fix: Type for all user roles in the system
export type UserRole = 'SuperAdmin' | 'AgencyManager' | 'Lawyer' | 'Tenant' | 'Owner' | 'Supplier' | 'Viewer';

// Fix: User interface with added avatar and role type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agencyId?: string;
  linkedEntityId?: string; // Links to Tenant ID or Owner ID
  status: 'Active' | 'Inactive';
  avatar?: string;
}

// Fix: Currency enum for multi-currency support
export enum Currency {
  USD = 'USD',
  SLSh = 'SLSh'
}

// Fix: Property interface with added geospatial and financial tracking properties
export interface Property {
  id: string; // Will map to Frappe 'name'
  name: string;
  address: string;
  city: string;
  type: 'Apartment' | 'Villa' | 'Commercial' | 'Warehouse' | 'Compound';
  monthlyRent: number;
  currency: Currency;
  status: PropertyStatus;
  image: string;
  units: number;
  occupancyRate: number;
  amenities: string[];
  lat?: number;
  lng?: number;
  revenue?: number;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  pricePerNight?: number;
}

// Fix: Tenant interface with organization and currency links
export interface Tenant {
  id: string;
  name: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  rentAmount: number;
  balance: number;
  leaseStart: string;
  leaseEnd: string;
  status: TenantStatus;
  phone: string;
  email: string;
  currency?: Currency;
  organizationId?: string;
}

// Fix: Transaction interface with organization and currency support
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: 'Rent' | 'Maintenance' | 'Utility' | 'Salary' | 'Other';
  status: 'Pending' | 'Completed' | 'Cancelled';
  tenantId?: string;
  reference?: string; // Zaad/eDahab Reference Number
  currency?: Currency;
  organizationId?: string;
}

// Fix: MaintenanceRequest with cost tracking and supplier assignment
export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  propertyId: string;
  propertyName: string;
  tenantName: string;
  dateReported: string;
  priority: Priority;
  status: 'Open' | 'In Progress' | 'Resolved';
  costEstimate?: number;
  assignedSupplierId?: string;
}

// Fix: Basic LegalCase structure
export interface LegalCase {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: Priority;
  dateCreated: string;
  description: string;
}

// Fix: Chat message for AI assistant
export interface ChatMessage { 
  role: 'user' | 'model'; 
  text: string; 
  timestamp: Date; 
}

// Fix: Added Organization and related sub-interfaces
export interface Organization {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  taxId?: string;
  status: OrganizationStatus;
  balance: number;
  rentals: RentalUnit[];
}

export enum OrganizationStatus {
  Active = 'Active',
  Late = 'Late',
  ContractPending = 'Contract Pending'
}

export interface RentalUnit {
  id: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  rentAmount: number;
  leaseStart: string;
  leaseEnd: string;
}

// Fix: Added Booking interfaces for reservation management
export interface Booking {
  id: string;
  propertyName: string;
  customerName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Unpaid';
}

export enum BookingStatus {
  Confirmed = 'Confirmed',
  Pending = 'Pending',
  Cancelled = 'Cancelled'
}

// Fix: Added PaymentMethod enum
export enum PaymentMethod {
  Zaad = 'Zaad',
  Edahab = 'eDahab',
  Stripe = 'Stripe',
  Cash = 'Cash'
}

// Fix: Added Agency interface
export interface Agency {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  logo?: string;
  status: 'Active' | 'Inactive';
  balance: number;
}

// Fix: Added Location interface
export interface Location {
  id: string;
  name: string;
  type: 'Country' | 'City' | 'Area';
  parentId?: string;
  status: 'Active' | 'Inactive';
  propertyCount: number;
}

// Fix: Added Customer interface
export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  authProvider: string;
  country: string;
  status: 'Active' | 'Blocked';
  joinDate: string;
  totalBookings: number;
  spent: number;
  avatar: string;
}

// Fix: Added AI Suggestion interface
export interface Suggestion {
  id: string;
  type: 'Financial' | 'Maintenance' | 'Tenant' | 'General';
  impact: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  actionLabel: string;
}

// Fix: Added OfflineAction for pwa features
export interface OfflineAction {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
}

// Fix: Added Supplier interface for contractors
export interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  serviceType: 'General' | 'Plumbing' | 'Electrical' | 'Cleaning' | 'Construction' | 'Security';
  phone: string;
  email: string;
  status: 'Active' | 'Inactive';
  hourlyRate: number;
  licenseNumber?: string;
  jobsCompleted: number;
}

// Fix: Added NotarySession for lawyer portal
export interface NotarySession {
  id: string;
  title: string;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

// Fix: Added Lease interface
export interface Lease {
  id: string;
  propertyId: string;
  propertyName: string;
  tenantId: string;
  tenantName: string;
  unitNumber: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  depositAmount: number;
  status: 'Active' | 'Expiring' | 'Expired';
  terms: string;
  frequency: 'Monthly' | 'Quarterly' | 'Yearly';
}

// Fix: Added UtilityBill interface
export interface UtilityBill {
  id: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  type: 'Electricity' | 'Water' | 'Internet' | 'Garbage';
  provider: string;
  readingDate: string;
  amount: number;
  currency: Currency;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  dueDate: string;
  currentReading?: number;
  previousReading?: number;
}
