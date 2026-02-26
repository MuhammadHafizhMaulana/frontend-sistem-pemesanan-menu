export default function LoadingCustomerWaitingPayment() {
  return (
    <div className="animate-pulse w-full max-w-md mx-auto min-h-screen bg-gray-100 flex justify-center items-start py-10">
      
      <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-gray-200 h-16 flex items-center px-4">
          <div className="w-6 h-6 bg-gray-300 rounded mr-4" />
          <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto" />
        </div>

        <div className="p-6 space-y-6">
          
          {/* TITLE */}
          <div className="space-y-3 text-center">
            <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          </div>

          {/* ORDER CARD */}
          <div className="bg-gray-100 rounded-xl p-4 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>

          {/* INFO BOX */}
          <div className="bg-gray-200 rounded-xl p-4">
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 rounded w-full" />
              <div className="h-3 bg-gray-300 rounded w-5/6" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}