import api from './api';
import { StudyPlan, PaginatedResponse, Review } from '../types';

export const studyPlanService = {
  getAll: async (params: any = {}) => {
    const { data } = await api.get<PaginatedResponse<StudyPlan>>('/study-plans', { params });
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get<StudyPlan>(`/study-plans/${id}`);
    return data;
  },
  create: async (plan: Partial<StudyPlan>) => {
    const { data } = await api.post<StudyPlan>('/study-plans', plan);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/study-plans/${id}`);
    return data;
  },
  getMyPlans: async () => {
    const { data } = await api.get<{ data: StudyPlan[] }>('/study-plans/user/my-plans');
    return data.data;
  },
  getReviews: async (planId: string) => {
    const { data } = await api.get<Review[]>(`/reviews/${planId}`);
    return data;
  },
  addReview: async (review: { studyPlanId: string; rating: number; comment: string }) => {
    const { data } = await api.post<Review>('/reviews', review);
    return data;
  }
};
