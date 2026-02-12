export default function LoadingCustomerHome() {
  return (
    <div className="animate-pulse w-full max-w-md mx-auto px-4 pb-6">
      {/* Banner */}
      <div className="w-full h-44 bg-gray-200 rounded-xl mb-4" />

      {/* Card info resto */}
      <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>

      {/* Nomor meja */}
      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm flex justify-center">
        <div className="h-5 bg-gray-200 rounded w-1/3" />
      </div>

      {/* Filter kategori */}
      <div className="flex gap-2 mb-5 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 rounded-full w-24" />
        ))}
      </div>

      {/* Menu Recommendation */}
      <div className="h-5 bg-gray-200 rounded w-1/2 mb-3" />

      <div className="flex gap-3 overflow-hidden mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-3 w-40 shrink-0 shadow-sm"
          >
            <div className="bg-gray-200 h-28 w-full rounded-lg mb-3" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>

      {/* Section kategori */}
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />

      {/* Grid menu */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
            <div className="bg-gray-200 h-36 w-full rounded-lg mb-3" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
