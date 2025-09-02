import { createClient } from '@supabase/supabase-js';
import { AuthProvider, User } from './index';

export class SupabaseAuth implements AuthProvider {
  private supabase: any;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async initialize(): Promise<void> {
    // Supabase initializes automatically
  }

  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name || email.split('@')[0],
      role: data.user.user_metadata?.role || 'staff'
    };
  }

  async signUp(email: string, password: string, name: string): Promise<User> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: 'staff' }
      }
    });
    
    if (error) throw error;
    
    return {
      id: data.user!.id,
      email: data.user!.email!,
      name,
      role: 'staff'
    };
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) return null;
    
    return {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.name || user.email!.split('@')[0],
      role: user.user_metadata?.role || 'staff'
    };
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    const { data: { subscription } } = this.supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        if (session?.user) {
          callback({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || session.user.email!.split('@')[0],
            role: session.user.user_metadata?.role || 'staff'
          });
        } else {
          callback(null);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }
}