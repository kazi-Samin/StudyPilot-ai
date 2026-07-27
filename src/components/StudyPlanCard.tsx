import React from 'react';
import { Link } from 'react-router-dom';
import { StudyPlan } from '../types';
import { FiStar } from 'react-icons/fi';

interface Props {
  plan: StudyPlan & { rating?: number };
}

const StudyPlanCard: React.FC<Props> = ({ plan }) => {
  return (
    <div className="bg-surface rounded-[20px] shadow-sm border border-outline-variant/50 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden bg-surface-container-high">
        {plan.imageUrl ? (
          <img src={plan.imageUrl} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-outline">
            <span className="material-symbols-outlined text-5xl">auto_stories</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur text-sm px-3 py-1 rounded-full font-medium shadow-sm">
          {plan.difficulty}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{plan.subject}</div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight">{plan.title}</h3>
        <p className="text-on-surface-variant text-sm mb-4 line-clamp-3 flex-grow">{plan.shortDescription}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container-high">
          <div className="flex items-center gap-3 text-sm text-outline font-medium">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              {plan.duration}
            </div>
            {plan.rating ? (
              <div className="flex items-center gap-1 text-amber-500">
                <FiStar className="fill-current" />
                <span>{plan.rating}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-500">
                <FiStar className="fill-current" />
                <span>4.8</span>
              </div>
            )}
          </div>
          <Link to={`/study-plans/${plan._id}`} className="text-primary font-semibold hover:text-primary-container transition-colors flex items-center gap-1">
            View <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanCard;
