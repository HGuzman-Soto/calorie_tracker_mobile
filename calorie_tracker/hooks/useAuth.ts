import { create } from 'zustand';

const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

interface AuthState {
  userId: number | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  userId: null,

  login: async (username: string, password: string) => {
    try {
      const response = await fetch(`${backendURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        set({ userId: data.user.user_id });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => set({ userId: null }),
}));
