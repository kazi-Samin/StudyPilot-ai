import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studyPlanService } from '../services/studyPlanService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const StudyPlanDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { data: plan, isLoading: planLoading } = useQuery({
    queryKey: ['studyPlan', id],
    queryFn: () => studyPlanService.getById(id!),
    enabled: !!id,
  });

  const cloneMutation = useMutation({
    mutationFn: (planData: Partial<any>) => studyPlanService.create(planData),
    onSuccess: () => {
      toast.success("Study plan started! Track your progress on the dashboard.");
      navigate('/dashboard');
    },
    onError: () => {
      toast.error("Failed to start the plan. Please try again.");
    }
  });

  const handleStartPlan = () => {
    if (!user) {
      toast.error("Please login to start this plan");
      navigate('/login');
      return;
    }
    
    if (plan) {
      // Clone the plan without user-specific or db-specific fields
      const clonedPlan = {
        title: plan.title,
        shortDescription: plan.shortDescription,
        fullDescription: plan.fullDescription,
        subject: plan.subject,
        difficulty: plan.difficulty,
        duration: plan.duration,
        topics: plan.topics,
        schedule: plan.schedule,
        imageUrl: plan.imageUrl,
      };
      cloneMutation.mutate(clonedPlan);
    }
  };

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => studyPlanService.getReviews(id!),
    enabled: !!id,
  });

  const reviewMutation = useMutation({
    mutationFn: (newReview: { studyPlanId: string; rating: number; comment: string }) => 
      studyPlanService.addReview(newReview),
    onSuccess: () => {
      toast.success('Review added successfully');
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
    },
    onError: () => {
      toast.error('Failed to add review');
    }
  });

  if (planLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div></div>;
  }

  if (!plan) return <div className="text-center py-20">Plan not found</div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <div className="bg-inverse-surface text-surface py-20 px-5 relative overflow-hidden">
        {plan.imageUrl && <div className="absolute inset-0 opacity-20"><img src={plan.imageUrl} alt="" className="w-full h-full object-cover" /></div>}
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="inline-block px-3 py-1 bg-primary text-white rounded-full text-sm font-bold mb-6">{plan.subject}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">{plan.title}</h1>
          <p className="text-xl text-outline-variant max-w-2xl">{plan.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b border-outline-variant pb-2">Overview</h2>
            <div className="prose max-w-none text-on-surface-variant leading-relaxed">
              {plan.fullDescription.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Topics */}
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b border-outline-variant pb-2">What You'll Learn</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {plan.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-outline-variant pb-2">Reviews</h2>
            
            {user ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                reviewMutation.mutate({ studyPlanId: id!, rating, comment });
              }} className="bg-surface p-6 rounded-xl border border-outline-variant mb-8">
                <h4 className="font-semibold mb-4">Leave a Review</h4>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Rating</label>
                  <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full p-2 rounded-lg border border-outline-variant">
                    {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-2">Comment</label>
                  <textarea value={comment} onChange={e => setComment(e.target.value)} required rows={3} className="w-full p-3 rounded-lg border border-outline-variant"></textarea>
                </div>
                <button type="submit" disabled={reviewMutation.isPending} className="btn-primary">
                  {reviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <div className="bg-surface-container p-4 rounded-lg mb-8 text-center">
                Please <a href="/login" className="text-primary font-bold">log in</a> to leave a review.
              </div>
            )}

            <div className="space-y-6">
              {reviewsLoading ? <p>Loading reviews...</p> : reviews?.length === 0 ? <p>No reviews yet.</p> : reviews?.map(review => (
                <div key={review._id} className="border-b border-outline-variant pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {review.user?.name.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="font-semibold">{review.user?.name || 'User'}</div>
                      <div className="text-xs text-outline flex items-center">
                        <span className="text-tertiary">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                        <span className="mx-2">•</span>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-on-surface-variant ml-13">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4 border-b border-outline-variant pb-2">Key Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-outline">Difficulty</span>
                <span className="font-medium">{plan.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Duration</span>
                <span className="font-medium">{plan.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Subject</span>
                <span className="font-medium">{plan.subject}</span>
              </div>
            </div>
            <button 
              onClick={handleStartPlan} 
              disabled={cloneMutation.isPending}
              className="btn-primary w-full mt-6 disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {cloneMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Starting...
                </>
              ) : 'Start This Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanDetails;
