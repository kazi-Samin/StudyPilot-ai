import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { studyPlanService } from '../services/studyPlanService';

const activityData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 4 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 5 },
  { day: 'Fri', hours: 2 },
  { day: 'Sat', hours: 6 },
  { day: 'Sun', hours: 4 },
];

const subjectData = [
  { name: 'Computer Science', value: 400 },
  { name: 'Mathematics', value: 300 },
  { name: 'Physics', value: 300 },
  { name: 'Languages', value: 200 },
];
const COLORS = ['#004ac6', '#006b5f', '#8e3c00', '#2563eb'];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const { data: myPlans, isLoading } = useQuery({
    queryKey: ['myPlans'],
    queryFn: () => studyPlanService.getMyPlans(),
  });

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name.split(' ')[0]}!</h1>
            <p className="text-on-surface-variant">Here is an overview of your learning progress.</p>
          </div>
          <Link to="/ai-chat" className="btn-primary flex items-center gap-2">
            <span className="material-symbols-outlined">smart_toy</span>
            Ask AI Tutor
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="card p-6 border-l-4 border-l-primary">
            <div className="text-on-surface-variant mb-1">Study Streak</div>
            <div className="text-3xl font-bold flex items-center gap-2">
              12 Days <span className="material-symbols-outlined text-tertiary">local_fire_department</span>
            </div>
          </div>
          <div className="card p-6 border-l-4 border-l-secondary">
            <div className="text-on-surface-variant mb-1">Total Hours</div>
            <div className="text-3xl font-bold">84 hrs</div>
          </div>
          <div className="card p-6 border-l-4 border-l-tertiary">
            <div className="text-on-surface-variant mb-1">Completed Plans</div>
            <div className="text-3xl font-bold">5</div>
          </div>
          <div className="card p-6 border-l-4 border-l-primary-container">
            <div className="text-on-surface-variant mb-1">Mastery Score</div>
            <div className="text-3xl font-bold text-primary">92%</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 card p-6">
            <h3 className="font-bold text-lg mb-6">Study Activity (This Week)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f2f3ff'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="hours" fill="#004ac6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-6">Subject Distribution</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {subjectData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Plans Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-2xl">My Active Plans</h3>
            <Link to="/explore" className="text-primary font-semibold hover:underline flex items-center gap-1">
              Find More <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : myPlans && myPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPlans.map((plan: any) => (
                <Link to={`/study-plans/${plan._id}`} key={plan._id} className="card group cursor-pointer block hover:-translate-y-1 transition-transform duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                        {plan.subject}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">{plan.title}</h3>
                    <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{plan.shortDescription}</p>
                    <div className="flex items-center gap-4 text-sm font-medium text-outline">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">schedule</span> {plan.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">trending_up</span> {plan.difficulty}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center bg-surface-container-low border-dashed border-2 border-outline-variant flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mb-4 text-primary">
                <span className="material-symbols-outlined text-4xl">menu_book</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">No active study plans</h3>
              <p className="text-on-surface-variant max-w-md mx-auto mb-6">
                You haven't started any study plans yet. Generate a customized plan with our Cognitive AI or explore existing templates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/study-plans/add" className="btn-primary">Generate with AI</Link>
                <Link to="/explore" className="btn-secondary">Explore Courses</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
