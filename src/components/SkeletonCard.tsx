import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-surface rounded-[20px] shadow-sm border border-outline-variant/50 overflow-hidden flex flex-col h-full animate-pulse">
      <div className="h-48 bg-surface-container-high w-full"></div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="h-3 w-20 bg-surface-container-high rounded mb-4"></div>
        <div className="h-6 w-3/4 bg-surface-container-high rounded mb-2"></div>
        <div className="h-6 w-1/2 bg-surface-container-high rounded mb-4"></div>
        <div className="space-y-2 mb-4 flex-grow">
          <div className="h-4 bg-surface-container-high rounded w-full"></div>
          <div className="h-4 bg-surface-container-high rounded w-full"></div>
          <div className="h-4 bg-surface-container-high rounded w-2/3"></div>
        </div>
        <div className="flex justify-between mt-auto pt-4 border-t border-surface-container-high">
          <div className="h-5 w-16 bg-surface-container-high rounded"></div>
          <div className="h-5 w-16 bg-surface-container-high rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
