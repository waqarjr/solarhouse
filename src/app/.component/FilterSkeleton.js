export default function FilterSkeleton() {
  return (
    <div className="hidden md:block w-full max-w-sm bg-white p-4">
      <div className="grid [&>*]:border-gray-100 animate-pulse">
        <div className="grid my-1 py-2 border-b-2">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          </div>
          
          <div className="space-y-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded" style={{ width: `${Math.random() * 60 + 80}px` }}></div>
                </div>
                <div className="h-4 w-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>



        {/* Tag Section */}
        <div className="grid my-1 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-12 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          </div>
          
          {/* Tag Pills */}
          <div className="flex flex-wrap gap-2">
            {[100, 70, 80, 60, 90, 75].map((width, i) => (
              <div key={i} className="h-9 bg-gray-200 rounded-full" style={{ width: `${width}px` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}