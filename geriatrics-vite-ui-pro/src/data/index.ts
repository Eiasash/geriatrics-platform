export interface Patient {
  id: string;
  name: string;
  age: number;
  ward: string;
  bed: string;
  room?: string;
  diagnoses: string[];
  mmse: { date: string; score: number }[];
  medications: string[];
  lastUpdated: string;
  acuity?: 'stable' | 'moderate' | 'critical';
  fallRisk?: number;
}

export interface Task {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  description: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  notes?: string;
}

export interface DataSource {
  // Roster operations
  getRoster(): Promise<Patient[]>;
  getPatient(id: string): Promise<Patient | null>;
  updatePatient(id: string, data: Partial<Patient>): Promise<void>;
  addPatient(patient: Patient): Promise<void>;
  deletePatient(id: string): Promise<void>;
  
  // Task operations
  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | null>;
  updateTask(id: string, data: Partial<Task>): Promise<void>;
  addTask(task: Task): Promise<void>;
  deleteTask(id: string): Promise<void>;
  
  // MMSE operations
  addMMSEScore(patientId: string, score: { date: string; score: number }): Promise<void>;
  
  // Pack operations
  savePack(key: string, data: any): Promise<void>;
  getPack(key: string): Promise<any>;
  
  // Initialize
  initialize(): Promise<void>;
}

export async function createDataSource(): Promise<DataSource> {
  const backend = import.meta.env.VITE_DATA_BACKEND || 'local';
  
  switch (backend) {
    case 'firebase':
      const { FirebaseDataSource } = await import('./adapters/firebase');
      return new FirebaseDataSource();
    case 'supabase':
      const { SupabaseDataSource } = await import('./adapters/supabase');
      return new SupabaseDataSource();
    default:
      const { LocalDataSource } = await import('./adapters/local');
      return new LocalDataSource();
  }
}