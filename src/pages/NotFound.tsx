import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 text-center">
      {/* Animated 404 Number */}
      <div className="relative mb-8">
        <div className="text-[140px] md:text-[200px] font-black leading-none select-none"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary, #8b5cf6))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0.15,
          }}
        >
          404
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-4xl">search_off</span>
          </div>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-3 text-on-surface">
        Page Not Found
      </h1>
      <p className="text-on-surface-variant text-lg mb-10 max-w-md leading-relaxed">
        Looks like this page took a wrong turn on the learning path. Let's get you back on track!
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant bg-surface-container hover:bg-surface-container-high text-on-surface font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Go Back
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          Home
        </Link>
        <Link
          to="/explore"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant bg-surface-container hover:bg-surface-container-high text-on-surface font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">explore</span>
          Explore Plans
        </Link>
      </div>

      {/* Decorative floating icons */}
      <div className="mt-16 flex gap-8 opacity-20">
        {['auto_stories', 'school', 'psychology', 'science', 'calculate'].map((icon, i) => (
          <span
            key={i}
            className="material-symbols-outlined text-primary text-3xl"
            style={{ animation: `bounce 2s ease-in-out ${i * 0.2}s infinite alternate` }}
          >
            {icon}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes bounce {
          from { transform: translateY(0px); }
          to { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
