import { Patient, Task } from '../data';
import { auditLogger } from './auditLog';

interface ApiConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

class ApiService {
  private config: ApiConfig;
  private abortController: AbortController | null = null;

  constructor(config?: Partial<ApiConfig>) {
    this.config = {
      baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
      apiKey: import.meta.env.VITE_API_KEY,
      timeout: 30000,
      ...config
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    this.abortController = new AbortController();
    
    const timeoutId = setTimeout(() => {
      this.abortController?.abort();
    }, this.config.timeout);

    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        ...options,
        signal: this.abortController.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'X-API-Key': this.config.apiKey }),
          ...options.headers
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        auditLogger.logError('api', 'API Service', error, endpoint);
      }
      
      throw error;
    }
  }

  // Patient endpoints
  async getPatients(): Promise<Patient[]> {
    return this.request<Patient[]>('/patients');
  }

  async getPatient(id: string): Promise<Patient> {
    return this.request<Patient>(`/patients/${id}`);
  }

  async createPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
    return this.request<Patient>('/patients', {
      method: 'POST',
      body: JSON.stringify(patient)
    });
  }

  async updatePatient(id: string, updates: Partial<Patient>): Promise<Patient> {
    return this.request<Patient>(`/patients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  async deletePatient(id: string): Promise<void> {
    return this.request<void>(`/patients/${id}`, {
      method: 'DELETE'
    });
  }

  // Task endpoints
  async getTasks(): Promise<Task[]> {
    return this.request<Task[]>('/tasks');
  }

  async getTask(id: string): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`);
  }

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    return this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task)
    });
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  async deleteTask(id: string): Promise<void> {
    return this.request<void>(`/tasks/${id}`, {
      method: 'DELETE'
    });
  }

  // Calculator endpoints
  async calculateFRAIL(values: number[]): Promise<{ score: number; interpretation: string }> {
    return this.request('/calculators/frail', {
      method: 'POST',
      body: JSON.stringify({ values })
    });
  }

  async calculateCHA2DS2(factors: any): Promise<{ score: number; risk: string }> {
    return this.request('/calculators/cha2ds2', {
      method: 'POST',
      body: JSON.stringify(factors)
    });
  }

  async calculateMorse(factors: any): Promise<{ score: number; risk: string }> {
    return this.request('/calculators/morse', {
      method: 'POST',
      body: JSON.stringify(factors)
    });
  }

  // Report endpoints
  async generateReport(type: string, data: any): Promise<Blob> {
    const response = await fetch(`${this.config.baseUrl}/reports/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'X-API-Key': this.config.apiKey })
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Failed to generate report: ${response.statusText}`);
    }

    return await response.blob();
  }

  // Analytics endpoints
  async getAnalytics(dateRange: string): Promise<any> {
    return this.request(`/analytics?range=${dateRange}`);
  }

  async getKPIs(): Promise<any> {
    return this.request('/analytics/kpis');
  }

  // Audit endpoints
  async getAuditLogs(filters?: any): Promise<any[]> {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/audit${params ? `?${params}` : ''}`);
  }

  async logAudit(entry: any): Promise<void> {
    return this.request('/audit', {
      method: 'POST',
      body: JSON.stringify(entry)
    });
  }

  // Cancel ongoing requests
  cancelRequests(): void {
    this.abortController?.abort();
  }
}

// Singleton instance
export const apiService = new ApiService();

// Hook for React components
export function useApi() {
  return apiService;
}