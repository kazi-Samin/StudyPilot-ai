import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studyPlanService } from '../services/studyPlanService';

export const useStudyPlans = (params?: any) => {
  return useQuery({
    queryKey: ['studyPlans', params],
    queryFn: () => studyPlanService.getAll(params),
  });
};

export const useStudyPlan = (id: string) => {
  return useQuery({
    queryKey: ['studyPlan', id],
    queryFn: () => studyPlanService.getById(id),
    enabled: !!id,
  });
};

export const useMyStudyPlans = () => {
  return useQuery({
    queryKey: ['myStudyPlans'],
    queryFn: () => studyPlanService.getMyPlans(),
  });
};
