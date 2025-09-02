import { AuthProvider, User } from './index';

export class LocalAuth implements AuthProvider {
  private currentUser: User | null = null;
  private listeners: Set<(user: User | null) => void> = new Set();

  async initialize(): Promise<void> {
    const savedUser = localStorage.getItem('geriatrics_auth_user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.notifyListeners();
    }
  }

  async signIn(email: string, password: string): Promise<User> {
    // Simple local auth - in production, validate against a backend
    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: 'staff'
    };
    
    this.currentUser = user;
    localStorage.setItem('geriatrics_auth_user', JSON.stringify(user));
    this.notifyListeners();
    
    return user;
  }

  async signUp(email: string, password: string, name: string): Promise<User> {
    const user: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      role: 'staff'
    };
    
    this.currentUser = user;
    localStorage.setItem('geriatrics_auth_user', JSON.stringify(user));
    this.notifyListeners();
    
    return user;
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('geriatrics_auth_user');
    this.notifyListeners();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    this.listeners.add(callback);
    callback(this.currentUser);
    
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(this.currentUser));
  }
}