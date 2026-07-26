import api from './api';
import { AuthResponse, User } from '../types';

export const authService = {
  login: async (credentials: any) => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },
  register: async (userData: any) => {
    const { data } = await api.post<AuthResponse>('/auth/register', userData);
    return data;
  },
  googleLogin: async (idToken: string) => {
    const { data } = await api.post<AuthResponse>('/auth/google', { idToken });
    return data;
  },
  getMe: async () => {
    const { data } = await api.get<User>('/auth/me');
    return data;
  },
};
