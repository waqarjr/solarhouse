export default function ProductGridSkeleton() {
  return (
    <div className="w-full bg-white p-4">
      <div className="animate-pulse">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className="h-5 w-48 bg-gray-200 rounded"></div>
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 w-8 bg-gray-200 rounded"></div>
                <div className="h-6 w-8 bg-gray-200 rounded"></div>
                <div className="h-6 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-10 w-32 md:w-40 bg-gray-200 rounded-full"></div>
            <div className="hidden md:flex gap-2">
              <div className="h-10 w-10 bg-blue-200 rounded-lg"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative bg-gray-100 aspect-square">
                <div className="absolute inset-0 bg-gray-200"></div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="h-8 w-8 md:h-10 md:w-10 bg-white rounded-full"></div>
                  <div className="h-8 w-8 md:h-10 md:w-10 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="p-2 md:p-4">
                <div className="h-4 md:h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 md:h-5 w-3/4 bg-gray-200 rounded mb-3 md:mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="h-5 md:h-6 w-20 md:w-24 bg-gray-200 rounded"></div>
                  <div className="h-10 md:h-12 w-10 md:w-12 bg-blue-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}