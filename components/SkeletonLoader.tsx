import React, { useMemo } from 'react';
interface SkeletonLoaderProps  {
  elementsCount?: number;
};

const SkeletonItem: React.FC = () => (
  <div
    role="status"
    className="max-w-sm rounded-xl border border-gray-200 shadow-sm animate-pulse"
  >
    <div className="flex h-[200px] items-center justify-center rounded-t-lg bg-gray-200 mb-4">
      <svg
        className="w-10 text-gray-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 20"
        fill="currentColor"
      >
        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
      </svg>
    </div>

    <div className="px-4 py-2">
      <div className="mb-2 h-2.5 w-9 rounded-full bg-gray-200" />
      <div className="mb-7 h-2.5 w-20 rounded-full bg-gray-200" />
      <div className="flex items-center justify-between">
        <div className="mb-2 h-2.5 w-20 rounded-full bg-gray-200" />
        <div className="mb-2 h-2.5 w-14 rounded-full bg-gray-200" />
      </div>
      <div className="mt-4">
        <div className="h-10 rounded-lg bg-gray-200" />
      </div>
    </div>

    <span className="sr-only">Loading...</span>
  </div>
);

export default function SkeletonLoader({ elementsCount = 9 }: SkeletonLoaderProps) {
  const items = useMemo(() => Array.from({ length: elementsCount }), [elementsCount]);

  return (
    <>
      {items.map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </>
  );
}