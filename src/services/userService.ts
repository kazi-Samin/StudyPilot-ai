import api from './api';
import { User } from '../types';

export const userService = {
  updateProfile: async (data: { name: string; avatar?: string }) => {
    const response = await api.put<User>('/users/profile', data);
    return response.data;
  },
  
  updatePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await api.put<{ message: string }>('/users/password', data);
    return response.data;
  }
};
