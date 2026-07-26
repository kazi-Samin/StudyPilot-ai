import api from './api';

export const aiService = {
  recommendations: async (data: any) => {
    const res = await api.post('/ai/recommendations', data);
    return res.data;
  },
  generatePlan: async (data: any) => {
    const res = await api.post('/ai/generate-plan', data);
    return res.data;
  },
  chat: async (data: any) => {
    const res = await api.post('/ai/chat', data);
    return res.data;
  }
};
