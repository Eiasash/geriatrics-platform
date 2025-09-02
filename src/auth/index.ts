export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthProvider {
  initialize(): Promise<void>;
  signIn(email: string, password: string): Promise<User>;
  signUp(email: string, password: string, name: string): Promise<User>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  onAuthStateChange(callback: (user: User | null) => void): () => void;
}

export async function createAuthProvider(): Promise<AuthProvider> {
  const backend = import.meta.env.VITE_AUTH_BACKEND || 'local';
  
  switch (backend) {
    case 'firebase':
      const { FirebaseAuth } = await import('./firebase');
      return new FirebaseAuth();
    case 'supabase':
      const { SupabaseAuth } = await import('./supabase');
      return new SupabaseAuth();
    default:
      const { LocalAuth } = await import('./local');
      return new LocalAuth();
  }
}