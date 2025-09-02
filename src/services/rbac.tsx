import React from 'react';
import { auditLogger } from './auditLog';

export type Role = 'admin' | 'physician' | 'nurse' | 'therapist' | 'viewer';

export interface Permission {
  resource: string;
  actions: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  facility?: string;
  department?: string;
  permissions?: Permission[];
}

// Role-based permissions matrix
const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    { resource: 'patients', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'tasks', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'medications', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'reports', actions: ['create', 'read', 'export'] },
    { resource: 'analytics', actions: ['read', 'export'] },
    { resource: 'audit', actions: ['read', 'export'] },
    { resource: 'settings', actions: ['read', 'update'] },
    { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'calculators', actions: ['use'] },
    { resource: 'handoff', actions: ['create', 'read', 'update'] }
  ],
  physician: [
    { resource: 'patients', actions: ['read', 'update'] },
    { resource: 'tasks', actions: ['create', 'read', 'update'] },
    { resource: 'medications', actions: ['read', 'update'] },
    { resource: 'reports', actions: ['create', 'read', 'export'] },
    { resource: 'analytics', actions: ['read'] },
    { resource: 'audit', actions: ['read'] },
    { resource: 'calculators', actions: ['use'] },
    { resource: 'handoff', actions: ['read'] }
  ],
  nurse: [
    { resource: 'patients', actions: ['read', 'update'] },
    { resource: 'tasks', actions: ['create', 'read', 'update'] },
    { resource: 'medications', actions: ['read'] },
    { resource: 'reports', actions: ['read'] },
    { resource: 'analytics', actions: ['read'] },
    { resource: 'calculators', actions: ['use'] },
    { resource: 'handoff', actions: ['create', 'read', 'update'] }
  ],
  therapist: [
    { resource: 'patients', actions: ['read'] },
    { resource: 'tasks', actions: ['read', 'update'] },
    { resource: 'reports', actions: ['read'] },
    { resource: 'calculators', actions: ['use'] }
  ],
  viewer: [
    { resource: 'patients', actions: ['read'] },
    { resource: 'tasks', actions: ['read'] },
    { resource: 'reports', actions: ['read'] },
    { resource: 'analytics', actions: ['read'] }
  ]
};

class RBACService {
  private currentUser: User | null = null;

  setUser(user: User) {
    this.currentUser = user;
    // Merge role permissions with custom permissions
    if (!user.permissions) {
      user.permissions = rolePermissions[user.role];
    } else {
      // Merge custom permissions with role permissions
      const basePermissions = rolePermissions[user.role];
      user.permissions = this.mergePermissions(basePermissions, user.permissions);
    }
  }

  getUser(): User | null {
    return this.currentUser;
  }

  clearUser() {
    this.currentUser = null;
  }

  // Check if user has permission for a specific action on a resource
  hasPermission(resource: string, action: string): boolean {
    if (!this.currentUser) {
      return false;
    }

    // Admin has all permissions
    if (this.currentUser.role === 'admin') {
      return true;
    }

    const permission = this.currentUser.permissions?.find(p => p.resource === resource);
    const hasAccess = permission?.actions.includes(action) || false;

    // Log permission check for audit
    if (!hasAccess) {
      auditLogger.logSecurityEvent(
        this.currentUser.id,
        this.currentUser.name,
        'PERMISSION_DENIED',
        { resource, action }
      );
    }

    return hasAccess;
  }

  // Check multiple permissions
  hasAnyPermission(checks: Array<{ resource: string; action: string }>): boolean {
    return checks.some(check => this.hasPermission(check.resource, check.action));
  }

  hasAllPermissions(checks: Array<{ resource: string; action: string }>): boolean {
    return checks.every(check => this.hasPermission(check.resource, check.action));
  }

  // Get all permissions for current user
  getPermissions(): Permission[] {
    if (!this.currentUser) {
      return [];
    }
    return this.currentUser.permissions || [];
  }

  // Check if user can access a specific patient (facility-based)
  canAccessPatient(patientFacility?: string): boolean {
    if (!this.currentUser) {
      return false;
    }

    // Admin can access all
    if (this.currentUser.role === 'admin') {
      return true;
    }

    // If no facility specified on patient, allow access
    if (!patientFacility) {
      return true;
    }

    // Check if user's facility matches patient's facility
    return this.currentUser.facility === patientFacility;
  }

  // Get accessible menu items based on permissions
  getAccessibleMenuItems(): string[] {
    const items: string[] = [];

    if (this.hasPermission('patients', 'read')) {
      items.push('dashboard');
    }
    if (this.hasPermission('calculators', 'use')) {
      items.push('calculators');
    }
    if (this.hasPermission('medications', 'read')) {
      items.push('medications');
    }
    if (this.hasPermission('handoff', 'read')) {
      items.push('handoff');
    }
    if (this.hasPermission('analytics', 'read')) {
      items.push('analytics');
    }
    if (this.hasPermission('audit', 'read')) {
      items.push('audit');
    }

    return items;
  }

  // Merge permissions arrays
  private mergePermissions(base: Permission[], custom: Permission[]): Permission[] {
    const merged = [...base];
    
    custom.forEach(customPerm => {
      const existing = merged.find(p => p.resource === customPerm.resource);
      if (existing) {
        // Merge actions
        const uniqueActions = new Set([...existing.actions, ...customPerm.actions]);
        existing.actions = Array.from(uniqueActions);
      } else {
        merged.push(customPerm);
      }
    });

    return merged;
  }

  // Role hierarchy check
  isHigherOrEqualRole(role1: Role, role2: Role): boolean {
    const hierarchy: Record<Role, number> = {
      admin: 5,
      physician: 4,
      nurse: 3,
      therapist: 2,
      viewer: 1
    };

    return hierarchy[role1] >= hierarchy[role2];
  }

  // Get role display name
  getRoleDisplayName(role: Role): string {
    const displayNames: Record<Role, string> = {
      admin: 'Administrator',
      physician: 'Physician',
      nurse: 'Nurse',
      therapist: 'Therapist',
      viewer: 'Viewer'
    };

    return displayNames[role] || role;
  }
}

// Singleton instance
export const rbacService = new RBACService();

// React hook for RBAC
export function useRBAC() {
  return {
    hasPermission: (resource: string, action: string) => 
      rbacService.hasPermission(resource, action),
    getUser: () => rbacService.getUser(),
    getPermissions: () => rbacService.getPermissions(),
    canAccessPatient: (facility?: string) => 
      rbacService.canAccessPatient(facility)
  };
}

// HOC for protecting components
export function withRBAC<P extends object>(
  Component: React.ComponentType<P>,
  resource: string,
  action: string,
  fallback?: React.ComponentType
) {
  return (props: P) => {
    const { hasPermission } = useRBAC();
    
    if (!hasPermission(resource, action)) {
      if (fallback) {
        const Fallback = fallback;
        return <Fallback />;
      }
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600">Access Denied</h2>
          <p className="mt-2 text-gray-600">
            You don't have permission to access this resource.
          </p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}