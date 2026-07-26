import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { studyPlanService } from '../services/studyPlanService';
import { aiService } from '../services/aiService';
import toast from 'react-hot-toast';
import { StudyPlan } from '../types';

const AddStudyPlan: React.FC = () => {
  const navigate = useNavigate();
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [formData, setFormData] = useState<Partial<StudyPlan>>({
    title: '',
    shortDescription: '',
    fullDescription: '',
    subject: 'Computer Science',
    difficulty: 'Intermediate',
    duration: '4 Weeks',
    imageUrl: '',
    topics: []
  });
  const [topicsInput, setTopicsInput] = useState('');

  const createMutation = useMutation({
    mutationFn: (plan: Partial<StudyPlan>) => studyPlanService.create(plan),
    onSuccess: (data) => {
      toast.success('Study plan created successfully!');
      navigate(`/study-plans/${data._id}`);
    },
    onError: () => toast.error('Failed to create study plan')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const topics = topicsInput.split(',').map(t => t.trim()).filter(Boolean);
    createMutation.mutate({ ...formData, topics });
  };

  const handleAiGenerate = async () => {
    if (!formData.title) {
      toast.error('Please enter a title to generate content');
      return;
    }
    setIsAiGenerating(true);
    try {
      const result = await aiService.generatePlan({
        topic: formData.title,
        duration: formData.duration,
        difficulty: formData.difficulty
      });
      setFormData(prev => ({
        ...prev,
        shortDescription: result.shortDescription,
        fullDescription: result.fullDescription,
      }));
      setTopicsInput(result.topics.join(', '));
      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error('AI generation failed. Try again.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-5">
        <h1 className="text-3xl font-bold mb-8">Create New Study Plan</h1>
        
        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
          <div className="flex gap-4 items-end">
            <div className="flex-grow">
              <label className="block text-sm font-medium mb-2">Title / Topic</label>
              <input 
                type="text" required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary"
                placeholder="e.g., Master React in 30 Days"
              />
            </div>
            <button 
              type="button" 
              onClick={handleAiGenerate}
              disabled={isAiGenerating}
              className="btn-secondary h-[50px] flex items-center gap-2 whitespace-nowrap"
            >
              <span className="material-symbols-outlined">auto_awesome</span>
              {isAiGenerating ? 'Generating...' : 'AI Assist'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select 
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary bg-white"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="Languages">Languages</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select 
                value={formData.difficulty}
                onChange={e => setFormData({...formData, difficulty: e.target.value as any})}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input 
                type="text" required
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary"
                placeholder="e.g., 4 Weeks"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Short Description</label>
            <input 
              type="text" required
              value={formData.shortDescription}
              onChange={e => setFormData({...formData, shortDescription: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Description (Schedule)</label>
            <textarea 
              required rows={8}
              value={formData.fullDescription}
              onChange={e => setFormData({...formData, fullDescription: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Topics (Comma separated)</label>
            <input 
              type="text" required
              value={topicsInput}
              onChange={e => setTopicsInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary"
              placeholder="React, Hooks, State Management"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL (Optional)</label>
            <input 
              type="url"
              value={formData.imageUrl}
              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant focus:border-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="pt-4">
            <button type="submit" disabled={createMutation.isPending} className="btn-primary w-full py-4 text-lg font-bold">
              {createMutation.isPending ? 'Publishing...' : 'Publish Study Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudyPlan;
