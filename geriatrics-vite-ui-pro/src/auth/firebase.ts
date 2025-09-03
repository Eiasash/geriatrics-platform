import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { AuthProvider, User } from './index';

export class FirebaseAuth implements AuthProvider {
  private auth: any;

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
    this.auth = getAuth(app);
  }

  async initialize(): Promise<void> {
    // Firebase initializes automatically
  }

  async signIn(email: string, password: string): Promise<User> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    return {
      id: credential.user.uid,
      email: credential.user.email!,
      name: credential.user.displayName || email.split('@')[0],
      role: 'staff'
    };
  }

  async signUp(email: string, password: string, name: string): Promise<User> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(credential.user, { displayName: name });
    
    return {
      id: credential.user.uid,
      email: credential.user.email!,
      name,
      role: 'staff'
    };
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(this.auth);
  }

  async getCurrentUser(): Promise<User | null> {
    const firebaseUser = this.auth.currentUser;
    if (!firebaseUser) return null;
    
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      name: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
      role: 'staff'
    };
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, (firebaseUser) => {
      if (firebaseUser) {
        callback({
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          name: firebaseUser.displayName || firebaseUser.email!.split('@')[0],
          role: 'staff'
        });
      } else {
        callback(null);
      }
    });
  }
}