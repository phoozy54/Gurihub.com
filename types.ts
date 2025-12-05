
export enum PropertyStatus {
  Available = 'Available',
  Booked = 'Booked',
  Occupied = 'Occupied',
  Maintenance = 'Maintenance',
  Disabled = 'Disabled'
}

export enum BookingStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  CheckedIn = 'Checked In',
  CheckedOut = 'Checked Out',
  Cancelled = 'Cancelled'
}

export enum PaymentMethod {
  Zaad = 'Zaad',
  Edahab = 'eDahab',
  Stripe = 'Stripe',
  PayPal = 'PayPal',
  Dahabshiil = 'Dahabshiil Bank',
  SalaamBank = 'Salaam Bank',
  Cash = 'Cash'
}

export enum Currency {
  USD = 'USD',
  SLSh = 'SLSh'
}

export enum TenantStatus {
  Active = 'Active',
  Late = 'Late',
  Eviction = 'Eviction',
  Past = 'Past'
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

export enum OrganizationStatus {
  Active = 'Active',
  Late = 'Late',
  ContractPending = 'Contract Pending'
}

export type UserRole = 'SuperAdmin' | 'AgencyManager' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  agencyId?: string; // If null, they are platform admin
}

export interface Agency {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  logo: string;
  status: 'Active' | 'Pending' | 'Suspended';
  subscriptionPlan: 'Basic' | 'Pro' | 'Enterprise';
  balance: number;
}

export interface Property {
  id: string;
  agencyId?: string;
  name: string;
  location?: string;
  address: string;
  city: string;
  lat?: number;
  lng?: number;
  type: 'Apartment' | 'Villa' | 'Commercial' | 'Studio' | 'Warehouse' | 'Family House' | 'Compound';
  pricePerNight?: number;
  monthlyRent?: number;
  currency: Currency;
  bedrooms?: number;
  amenities: string[];
  status: PropertyStatus;
  image: string;
  rating?: number;
  units?: number;
  occupancyRate?: number;
  revenue?: number;
}

export interface Tenant {
  id: string;
  name: string;
  propertyId: string;
  propertyName: string;
  unitNumber: string;
  rentAmount: number;
  currency: Currency;
  status: TenantStatus;
  leaseStart: string;
  leaseEnd: string;
  email: string;
  phone: string;
  balance: number;
  organizationId?: string; // Link to Organization
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

export interface Organization {
  id: string;
  name: string;
  contactPerson: string;
  rentals: RentalUnit[];
  status: OrganizationStatus;
  email: string;
  phone: string;
  balance: number;
  taxId?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  agencyId: string;
  customerId: string;
  customerName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: 'Paid' | 'Unpaid';
  paymentMethod: PaymentMethod;
}

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
  costEstimate: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: 'Rent' | 'Maintenance' | 'Utility' | 'Salary' | 'Other';
  amount: number;
  currency: Currency;
  type: 'Income' | 'Expense';
  status: 'Pending' | 'Completed';
  reference: string;
  gateway?: PaymentMethod;
  organizationId?: string;
  tenantId?: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: 'Financial' | 'Maintenance' | 'Occupancy' | 'Tenant';
  impact: 'High' | 'Medium' | 'Low';
  actionLabel: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ActivityLog {
  id: string;
  text: string;
  timestamp: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

export interface Location {
  id: string;
  name: string;
  type: 'Country' | 'Region' | 'City' | 'Area';
  parentId?: string;
  status: 'Active' | 'Inactive';
  propertyCount: number;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  authProvider: 'Google' | 'Facebook' | 'Apple' | 'Email';
  country: string;
  status: 'Active' | 'Blocked';
  joinDate: string;
  totalBookings: number;
  spent: number;
  avatar?: string;
}

export interface OfflineAction {
  id: string;
  type: 'ADD_TRANSACTION' | 'ADD_PROPERTY' | 'ADD_TENANT';
  payload: any;
  timestamp: number;
}
