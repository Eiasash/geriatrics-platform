import { DataSource, Patient, Task } from '../index';

export class LocalDataSource implements DataSource {
  private readonly ROSTER_KEY = 'geriatrics_roster';
  private readonly TASKS_KEY = 'geriatrics_tasks';
  private readonly PACKS_PREFIX = 'geriatrics_pack_';

  async initialize(): Promise<void> {
    // Check if first run
    const initialized = localStorage.getItem('geriatrics_initialized');
    if (!initialized) {
      await this.importSeedData();
      localStorage.setItem('geriatrics_initialized', 'true');
    }
  }

  private async importSeedData(): Promise<void> {
    try {
      // Import roster
      const rosterRes = await fetch('/packs/roster.json');
      const rosterData = await rosterRes.json();
      localStorage.setItem(this.ROSTER_KEY, JSON.stringify(rosterData.patients));

      // Import tasks
      const tasksRes = await fetch('/packs/tasks.json');
      const tasksData = await tasksRes.json();
      localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasksData.tasks));

      // Import abbreviations
      const abbrevEnRes = await fetch('/packs/abbreviations.en.json');
      const abbrevEn = await abbrevEnRes.json();
      localStorage.setItem(this.PACKS_PREFIX + 'abbrev_en', JSON.stringify(abbrevEn));

      const abbrevHeRes = await fetch('/packs/abbreviations.he.json');
      const abbrevHe = await abbrevHeRes.json();
      localStorage.setItem(this.PACKS_PREFIX + 'abbrev_he', JSON.stringify(abbrevHe));

      // Import flashcards
      const flashcardsRes = await fetch('/packs/flashcards_mmse.json');
      const flashcards = await flashcardsRes.json();
      localStorage.setItem(this.PACKS_PREFIX + 'flashcards', JSON.stringify(flashcards));

      // Import checklist
      const checklistRes = await fetch('/packs/checklist_frail.json');
      const checklist = await checklistRes.json();
      localStorage.setItem(this.PACKS_PREFIX + 'checklist_frail', JSON.stringify(checklist));
    } catch (error) {
      console.error('Failed to import seed data:', error);
    }
  }

  // Roster operations
  async getRoster(): Promise<Patient[]> {
    const data = localStorage.getItem(this.ROSTER_KEY);
    return data ? JSON.parse(data) : [];
  }

  async getPatient(id: string): Promise<Patient | null> {
    const roster = await this.getRoster();
    return roster.find(p => p.id === id) || null;
  }

  async updatePatient(id: string, data: Partial<Patient>): Promise<void> {
    const roster = await this.getRoster();
    const index = roster.findIndex(p => p.id === id);
    if (index !== -1) {
      roster[index] = { ...roster[index], ...data, lastUpdated: new Date().toISOString() };
      localStorage.setItem(this.ROSTER_KEY, JSON.stringify(roster));
    }
  }

  async addPatient(patient: Patient): Promise<void> {
    const roster = await this.getRoster();
    roster.push({ ...patient, lastUpdated: new Date().toISOString() });
    localStorage.setItem(this.ROSTER_KEY, JSON.stringify(roster));
  }

  async deletePatient(id: string): Promise<void> {
    const roster = await this.getRoster();
    const filtered = roster.filter(p => p.id !== id);
    localStorage.setItem(this.ROSTER_KEY, JSON.stringify(filtered));
  }

  // Task operations
  async getTasks(): Promise<Task[]> {
    const data = localStorage.getItem(this.TASKS_KEY);
    return data ? JSON.parse(data) : [];
  }

  async getTask(id: string): Promise<Task | null> {
    const tasks = await this.getTasks();
    return tasks.find(t => t.id === id) || null;
  }

  async updateTask(id: string, data: Partial<Task>): Promise<void> {
    const tasks = await this.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...data };
      localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
    }
  }

  async addTask(task: Task): Promise<void> {
    const tasks = await this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
  }

  async deleteTask(id: string): Promise<void> {
    const tasks = await this.getTasks();
    const filtered = tasks.filter(t => t.id !== id);
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(filtered));
  }

  // MMSE operations
  async addMMSEScore(patientId: string, score: { date: string; score: number }): Promise<void> {
    const patient = await this.getPatient(patientId);
    if (patient) {
      if (!patient.mmse) patient.mmse = [];
      patient.mmse.push(score);
      await this.updatePatient(patientId, { mmse: patient.mmse });
    }
  }

  // Pack operations
  async savePack(key: string, data: any): Promise<void> {
    localStorage.setItem(this.PACKS_PREFIX + key, JSON.stringify(data));
  }

  async getPack(key: string): Promise<any> {
    const data = localStorage.getItem(this.PACKS_PREFIX + key);
    return data ? JSON.parse(data) : null;
  }
}