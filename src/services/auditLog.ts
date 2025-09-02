export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  category: 'auth' | 'data' | 'clinical' | 'admin' | 'system';
}

class AuditLogger {
  private logs: AuditLog[] = [];
  private maxLogs = 10000;
  private storageKey = 'audit_logs';

  constructor() {
    this.loadLogs();
  }

  private loadLogs() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    }
  }

  private saveLogs() {
    try {
      // Keep only recent logs to prevent storage overflow
      if (this.logs.length > this.maxLogs) {
        this.logs = this.logs.slice(-this.maxLogs);
      }
      localStorage.setItem(this.storageKey, JSON.stringify(this.logs));
    } catch (error) {
      console.error('Failed to save audit logs:', error);
    }
  }

  log(entry: Omit<AuditLog, 'id' | 'timestamp'>) {
    const log: AuditLog = {
      ...entry,
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ipAddress: this.getIPAddress(),
      userAgent: navigator.userAgent
    };

    this.logs.push(log);
    this.saveLogs();

    // For critical events, also send to console
    if (log.severity === 'critical' || log.severity === 'error') {
      console.error('Audit Log:', log);
    }

    // In production, this would send to a backend service
    if (process.env.NODE_ENV === 'production') {
      this.sendToBackend(log);
    }

    return log;
  }

  private getIPAddress(): string {
    // In a real app, this would be obtained from the backend
    return 'client-ip';
  }

  private async sendToBackend(log: AuditLog) {
    // In production, send logs to backend
    try {
      // await fetch('/api/audit', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(log)
      // });
    } catch (error) {
      console.error('Failed to send audit log to backend:', error);
    }
  }

  // Query methods
  getLogs(filters?: {
    category?: string;
    severity?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): AuditLog[] {
    let filtered = [...this.logs];

    if (filters) {
      if (filters.category) {
        filtered = filtered.filter(log => log.category === filters.category);
      }
      if (filters.severity) {
        filtered = filtered.filter(log => log.severity === filters.severity);
      }
      if (filters.userId) {
        filtered = filtered.filter(log => log.userId === filters.userId);
      }
      if (filters.startDate) {
        filtered = filtered.filter(log => log.timestamp >= filters.startDate!);
      }
      if (filters.endDate) {
        filtered = filtered.filter(log => log.timestamp <= filters.endDate!);
      }
    }

    // Sort by timestamp descending (most recent first)
    filtered.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    if (filters?.limit) {
      return filtered.slice(0, filters.limit);
    }

    return filtered;
  }

  exportLogs(format: 'json' | 'csv' = 'json'): string {
    if (format === 'json') {
      return JSON.stringify(this.logs, null, 2);
    } else {
      // CSV export
      const headers = ['Timestamp', 'User', 'Action', 'Resource', 'Severity', 'Category'];
      const rows = this.logs.map(log => [
        log.timestamp,
        log.userName,
        log.action,
        log.resource,
        log.severity,
        log.category
      ]);
      
      return [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
    }
  }

  clearLogs(olderThan?: string) {
    if (olderThan) {
      this.logs = this.logs.filter(log => log.timestamp > olderThan);
    } else {
      this.logs = [];
    }
    this.saveLogs();
  }

  // Audit log helpers for common actions
  logLogin(userId: string, userName: string, success: boolean) {
    return this.log({
      userId,
      userName,
      action: success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILED',
      resource: 'Authentication',
      severity: success ? 'info' : 'warning',
      category: 'auth'
    });
  }

  logLogout(userId: string, userName: string) {
    return this.log({
      userId,
      userName,
      action: 'LOGOUT',
      resource: 'Authentication',
      severity: 'info',
      category: 'auth'
    });
  }

  logDataAccess(userId: string, userName: string, resource: string, resourceId?: string) {
    return this.log({
      userId,
      userName,
      action: 'DATA_ACCESS',
      resource,
      resourceId,
      severity: 'info',
      category: 'data'
    });
  }

  logDataModification(userId: string, userName: string, resource: string, resourceId: string, changes: any) {
    return this.log({
      userId,
      userName,
      action: 'DATA_MODIFIED',
      resource,
      resourceId,
      details: changes,
      severity: 'warning',
      category: 'data'
    });
  }

  logClinicalAction(userId: string, userName: string, action: string, patientId: string, details?: any) {
    return this.log({
      userId,
      userName,
      action,
      resource: 'Patient',
      resourceId: patientId,
      details,
      severity: 'info',
      category: 'clinical'
    });
  }

  logError(userId: string, userName: string, error: Error, context?: string) {
    return this.log({
      userId,
      userName,
      action: 'ERROR',
      resource: context || 'System',
      details: {
        message: error.message,
        stack: error.stack
      },
      severity: 'error',
      category: 'system'
    });
  }

  logSecurityEvent(userId: string, userName: string, event: string, details?: any) {
    return this.log({
      userId,
      userName,
      action: event,
      resource: 'Security',
      details,
      severity: 'critical',
      category: 'admin'
    });
  }
}

// Singleton instance
export const auditLogger = new AuditLogger();