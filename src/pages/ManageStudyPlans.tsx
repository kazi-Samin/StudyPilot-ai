import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMyStudyPlans } from '../hooks/useStudyPlans';
import { studyPlanService } from '../services/studyPlanService';
import toast from 'react-hot-toast';

const ManageStudyPlans: React.FC = () => {
  const { data: plans, isLoading } = useMyStudyPlans();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => studyPlanService.delete(id),
    onSuccess: () => {
      toast.success('Plan deleted');
      queryClient.invalidateQueries({ queryKey: ['myStudyPlans'] });
    },
    onError: () => toast.error('Failed to delete plan')
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this study plan?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Study Plans</h1>
          <Link to="/study-plans/add" className="btn-primary">Create New</Link>
        </div>

        {isLoading ? (
          <div className="text-center py-20">Loading your plans...</div>
        ) : plans?.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-outline-variant">
            <p className="text-on-surface-variant mb-4">You haven't created any study plans yet.</p>
            <Link to="/study-plans/add" className="btn-secondary">Create your first plan</Link>
          </div>
        ) : (
          <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant border-b border-outline-variant">
                    <th className="p-4 font-semibold">Title</th>
                    <th className="p-4 font-semibold">Subject</th>
                    <th className="p-4 font-semibold">Difficulty</th>
                    <th className="p-4 font-semibold">Date Created</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans?.map(plan => (
                    <tr key={plan._id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                      <td className="p-4 font-medium">{plan.title}</td>
                      <td className="p-4">{plan.subject}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-surface-container-high rounded text-sm">{plan.difficulty}</span>
                      </td>
                      <td className="p-4">{new Date(plan.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 flex justify-end gap-2">
                        <Link to={`/study-plans/${plan._id}`} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </Link>
                        <button onClick={() => handleDelete(plan._id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors" title="Delete">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudyPlans;
