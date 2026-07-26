import React, { useState } from 'react';
import { useStudyPlans } from '../hooks/useStudyPlans';
import StudyPlanCard from '../components/StudyPlanCard';
import SkeletonCard from '../components/SkeletonCard';
import { FiSearch } from 'react-icons/fi';

const Explore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sort, setSort] = useState('Newest');
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Simple debounce for search
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, error } = useStudyPlans({
    search: debouncedSearch,
    subject,
    difficulty,
    sort,
    page,
    limit: 12
  });

  const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Biology', 'History', 'Economics', 'Psychology', 'Literature'];
  const sortOptions = ['Newest', 'Highest Rated', 'Shortest Duration'];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Study Plans</h1>
          <p className="text-on-surface-variant text-lg">Find the perfect roadmap for your next learning journey.</p>
        </div>

        {/* Filters */}
        <div className="bg-surface p-5 rounded-2xl shadow-sm border border-outline-variant mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-outline" />
            <input
              type="text"
              placeholder="Search plans by title or topic..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-container-low border-transparent focus:border-primary focus:bg-surface focus:ring-0 transition-colors"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto flex-wrap md:flex-nowrap">
            <select 
              className="px-4 py-3 rounded-xl bg-surface-container-low flex-grow md:flex-grow-0 min-w-[140px]"
              value={subject}
              onChange={(e) => { setSubject(e.target.value); setPage(1); }}
            >
              <option value="">All Subjects</option>
              {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
            </select>
            <select 
              className="px-4 py-3 rounded-xl bg-surface-container-low flex-grow md:flex-grow-0 min-w-[140px]"
              value={difficulty}
              onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
            >
              <option value="">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select 
              className="px-4 py-3 rounded-xl bg-surface-container-low flex-grow md:flex-grow-0 min-w-[140px]"
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
            >
              {sortOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {error ? (
          <div className="text-center py-20 text-error">Failed to load study plans. Please try again.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              ) : data?.data.length === 0 ? (
                <div className="col-span-full text-center py-20 text-on-surface-variant text-lg">
                  No study plans found matching your criteria.
                </div>
              ) : (
                data?.data.map((plan: any) => (
                  <StudyPlanCard key={plan._id} plan={plan} />
                ))
              )}
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 rounded-lg border border-outline-variant disabled:opacity-50 hover:bg-surface-container"
                >
                  Previous
                </button>
                <div className="flex items-center px-4 font-medium">
                  Page {page} of {data.totalPages}
                </div>
                <button 
                  disabled={page === data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 rounded-lg border border-outline-variant disabled:opacity-50 hover:bg-surface-container"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
