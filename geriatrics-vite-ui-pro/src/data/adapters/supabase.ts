import { createClient } from '@supabase/supabase-js';
import { DataSource, Patient, Task } from '../index';

export class SupabaseDataSource implements DataSource {
  private supabase: any;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async initialize(): Promise<void> {
    // Check if data exists, if not seed it
    const { data: roster } = await this.supabase.from('roster').select('*').limit(1);
    if (!roster || roster.length === 0) {
      await this.seedData();
    }
  }

  private async seedData(): Promise<void> {
    try {
      // Import roster
      const rosterRes = await fetch('/packs/roster.json');
      const rosterData = await rosterRes.json();
      await this.supabase.from('roster').insert(rosterData.patients);

      // Import tasks
      const tasksRes = await fetch('/packs/tasks.json');
      const tasksData = await tasksRes.json();
      await this.supabase.from('tasks').insert(tasksData.tasks);

      // Import packs
      const packs = [
        { key: 'abbrev_en', file: 'abbreviations.en.json' },
        { key: 'abbrev_he', file: 'abbreviations.he.json' },
        { key: 'flashcards', file: 'flashcards_mmse.json' },
        { key: 'checklist_frail', file: 'checklist_frail.json' }
      ];

      for (const pack of packs) {
        const res = await fetch(`/packs/${pack.file}`);
        const data = await res.json();
        await this.supabase.from('packs').insert({ key: pack.key, data });
      }
    } catch (error) {
      console.error('Failed to seed Supabase data:', error);
    }
  }

  // Roster operations
  async getRoster(): Promise<Patient[]> {
    const { data, error } = await this.supabase.from('roster').select('*');
    if (error) throw error;
    return data || [];
  }

  async getPatient(id: string): Promise<Patient | null> {
    const { data, error } = await this.supabase
      .from('roster')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return null;
    return data;
  }

  async updatePatient(id: string, data: Partial<Patient>): Promise<void> {
    await this.supabase
      .from('roster')
      .update({ ...data, lastUpdated: new Date().toISOString() })
      .eq('id', id);
  }

  async addPatient(patient: Patient): Promise<void> {
    await this.supabase.from('roster').insert({
      ...patient,
      lastUpdated: new Date().toISOString()
    });
  }

  async deletePatient(id: string): Promise<void> {
    await this.supabase.from('roster').delete().eq('id', id);
  }

  // Task operations
  async getTasks(): Promise<Task[]> {
    const { data, error } = await this.supabase.from('tasks').select('*');
    if (error) throw error;
    return data || [];
  }

  async getTask(id: string): Promise<Task | null> {
    const { data, error } = await this.supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return null;
    return data;
  }

  async updateTask(id: string, data: Partial<Task>): Promise<void> {
    await this.supabase.from('tasks').update(data).eq('id', id);
  }

  async addTask(task: Task): Promise<void> {
    await this.supabase.from('tasks').insert(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.supabase.from('tasks').delete().eq('id', id);
  }

  // MMSE operations
  async addMMSEScore(patientId: string, score: { date: string; score: number }): Promise<void> {
    // First get the patient
    const patient = await this.getPatient(patientId);
    if (patient) {
      const mmse = patient.mmse || [];
      mmse.push(score);
      await this.updatePatient(patientId, { mmse });
      
      // Also insert into separate mmse table if it exists
      await this.supabase.from('mmse').insert({
        patient_id: patientId,
        date: score.date,
        score: score.score
      }).catch(() => {}); // Ignore if table doesn't exist
    }
  }

  // Pack operations
  async savePack(key: string, data: any): Promise<void> {
    await this.supabase.from('packs').upsert({ key, data });
  }

  async getPack(key: string): Promise<any> {
    const { data } = await this.supabase
      .from('packs')
      .select('data')
      .eq('key', key)
      .single();
    return data?.data || null;
  }
}