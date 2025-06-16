export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse space-y-3 border-b pb-4">
          {/* Title */}
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          {/* Author & Date */}
          <div className="h-6 bg-gray-400 rounded w-full"></div>
          {/* Content Preview */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
