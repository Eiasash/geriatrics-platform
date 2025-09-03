import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  addDoc 
} from 'firebase/firestore';
import { DataSource, Patient, Task } from '../index';

export class FirebaseDataSource implements DataSource {
  private db: any;

  constructor() {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
  }

  async initialize(): Promise<void> {
    // Check if collections exist, if not seed them
    const rosterSnapshot = await getDocs(collection(this.db, 'roster'));
    if (rosterSnapshot.empty) {
      await this.seedData();
    }
  }

  private async seedData(): Promise<void> {
    try {
      // Import roster
      const rosterRes = await fetch('/packs/roster.json');
      const rosterData = await rosterRes.json();
      for (const patient of rosterData.patients) {
        await setDoc(doc(this.db, 'roster', patient.id), patient);
      }

      // Import tasks
      const tasksRes = await fetch('/packs/tasks.json');
      const tasksData = await tasksRes.json();
      for (const task of tasksData.tasks) {
        await setDoc(doc(this.db, 'tasks', task.id), task);
      }

      // Import packs
      const packs = [
        'abbreviations.en',
        'abbreviations.he',
        'flashcards_mmse',
        'checklist_frail'
      ];

      for (const pack of packs) {
        const res = await fetch(`/packs/${pack}.json`);
        const data = await res.json();
        await setDoc(doc(this.db, 'packs', pack), data);
      }
    } catch (error) {
      console.error('Failed to seed Firebase data:', error);
    }
  }

  // Roster operations
  async getRoster(): Promise<Patient[]> {
    const snapshot = await getDocs(collection(this.db, 'roster'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Patient));
  }

  async getPatient(id: string): Promise<Patient | null> {
    const docRef = doc(this.db, 'roster', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Patient : null;
  }

  async updatePatient(id: string, data: Partial<Patient>): Promise<void> {
    const docRef = doc(this.db, 'roster', id);
    await updateDoc(docRef, { ...data, lastUpdated: new Date().toISOString() });
  }

  async addPatient(patient: Patient): Promise<void> {
    await setDoc(doc(this.db, 'roster', patient.id), {
      ...patient,
      lastUpdated: new Date().toISOString()
    });
  }

  async deletePatient(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'roster', id));
  }

  // Task operations
  async getTasks(): Promise<Task[]> {
    const snapshot = await getDocs(collection(this.db, 'tasks'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  }

  async getTask(id: string): Promise<Task | null> {
    const docRef = doc(this.db, 'tasks', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Task : null;
  }

  async updateTask(id: string, data: Partial<Task>): Promise<void> {
    const docRef = doc(this.db, 'tasks', id);
    await updateDoc(docRef, data);
  }

  async addTask(task: Task): Promise<void> {
    await setDoc(doc(this.db, 'tasks', task.id), task);
  }

  async deleteTask(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'tasks', id));
  }

  // MMSE operations
  async addMMSEScore(patientId: string, score: { date: string; score: number }): Promise<void> {
    const patient = await this.getPatient(patientId);
    if (patient) {
      const mmse = patient.mmse || [];
      mmse.push(score);
      await this.updatePatient(patientId, { mmse });
    }
  }

  // Pack operations
  async savePack(key: string, data: any): Promise<void> {
    await setDoc(doc(this.db, 'packs', key), data);
  }

  async getPack(key: string): Promise<any> {
    const docRef = doc(this.db, 'packs', key);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }
}