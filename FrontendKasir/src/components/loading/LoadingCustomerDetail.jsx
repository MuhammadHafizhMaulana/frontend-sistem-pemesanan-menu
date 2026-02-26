export default function LoadingMenuDetail() {
  return (
    <div className="animate-pulse w-full max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
      
      {/* HEADER */}
      <div className="bg-gray-200 h-16 flex items-center px-4">
        <div className="w-6 h-6 bg-gray-300 rounded mr-4" />
        <div className="h-5 bg-gray-300 rounded w-1/3 mx-auto" />
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-4 py-6 bg-white">
        
        {/* IMAGE */}
        <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-6" />

        {/* NAME */}
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />

        {/* PRICE */}
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />

        {/* DESCRIPTION */}
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
        </div>

        {/* PILIH VARIAN */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />

        <div className="space-y-3 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 rounded-lg"
            />
          ))}
        </div>

        {/* QTY + ADD BUTTON */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-gray-200 px-4 py-2 rounded-lg">
            <div className="w-5 h-5 bg-gray-300 rounded" />
            <div className="w-6 h-4 bg-gray-300 rounded" />
            <div className="w-5 h-5 bg-gray-300 rounded" />
          </div>

          <div className="flex-1 h-12 bg-gray-300 rounded-xl" />
        </div>
      </div>

      {/* BOTTOM CART SUMMARY */}
      <div className="bg-gray-200 p-4 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-16" />
            <div className="h-4 bg-gray-300 rounded w-24" />
          </div>

          <div className="w-28 h-10 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}