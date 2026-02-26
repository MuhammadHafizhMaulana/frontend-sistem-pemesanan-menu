export default function LoadingCustomerDetailCart({ count = 5 }) {
  return (
    <div className="animate-pulse w-full max-w-md mx-auto min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header */}
      <div className="bg-gray-200 h-20 flex items-center px-4 rounded-b-2xl">
        <div className="w-6 h-6 bg-gray-300 rounded mr-4" />
        <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto" />
      </div>

      {/* List Item */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center"
          >
            {/* Left side */}
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />

              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-28" />
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            </div>

            {/* Qty */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="w-6 h-4 bg-gray-200 rounded" />
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 p-4 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-16" />
            <div className="h-4 bg-gray-300 rounded w-28" />
          </div>

          <div className="w-28 h-10 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}