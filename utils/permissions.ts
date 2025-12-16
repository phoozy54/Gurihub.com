
import { User, UserRole } from '../types';

export const PERMISSIONS = {
  MANAGE_SYSTEM: 'manage_system', // Full system access
  MANAGE_AGENCY: 'manage_agency', // Create/Edit Agencies
  MANAGE_PROPERTIES: 'manage_properties', // Create/Edit Properties
  MANAGE_BOOKINGS: 'manage_bookings', // Manage reservations
  MANAGE_USERS: 'manage_users', // Create/Edit Team Members
  MANAGE_FINANCE: 'manage_finance', // Record transactions
  VIEW_REPORTS: 'view_reports', // Access analytics
  VIEW_ONLY: 'view_only' // Read-only access
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

interface RoleDef {
  label: string;
  description: string;
  permissions: Permission[];
}

export const ROLE_DEFINITIONS: Record<UserRole, RoleDef> = {
  SuperAdmin: {
    label: 'Super Admin',
    description: 'Complete system control, including agency management and global settings.',
    permissions: [
      PERMISSIONS.MANAGE_SYSTEM,
      PERMISSIONS.MANAGE_AGENCY,
      PERMISSIONS.MANAGE_PROPERTIES,
      PERMISSIONS.MANAGE_BOOKINGS,
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.MANAGE_FINANCE,
      PERMISSIONS.VIEW_REPORTS
    ]
  },
  AgencyManager: {
    label: 'Agency Manager',
    description: 'Full operational control over specific agency properties, staff, and bookings.',
    permissions: [
      PERMISSIONS.MANAGE_PROPERTIES,
      PERMISSIONS.MANAGE_BOOKINGS,
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.MANAGE_FINANCE,
      PERMISSIONS.VIEW_REPORTS
    ]
  },
  Viewer: {
    label: 'Viewer',
    description: 'Read-only access to view listings, calendars, and reports. Cannot edit data.',
    permissions: [
      PERMISSIONS.VIEW_REPORTS,
      PERMISSIONS.VIEW_ONLY
    ]
  },
  Owner: {
    label: 'Property Owner',
    description: 'Access to personal property performance, revenue reports, and maintenance status.',
    permissions: [PERMISSIONS.VIEW_REPORTS]
  },
  Tenant: {
    label: 'Tenant',
    description: 'Access to personal lease agreement, rent payments, and maintenance requests.',
    permissions: []
  },
  Lawyer: {
    label: 'Legal Counsel',
    description: 'Access to contract drafting and legal dispute management.',
    permissions: [PERMISSIONS.VIEW_REPORTS]
  },
  Supplier: {
    label: 'Service Provider',
    description: 'Access to assigned maintenance jobs and status updates.',
    permissions: []
  }
};

export const getRoleDefinition = (role: UserRole) => ROLE_DEFINITIONS[role];

export const hasPermission = (user: User, permission: Permission): boolean => {
  if (!user) return false;
  
  // SuperAdmin implicitly has all permissions (fail-safe)
  if (user.role === 'SuperAdmin') return true;
  
  const def = ROLE_DEFINITIONS[user.role];
  if (!def) return false;
  
  return def.permissions.includes(permission);
};
