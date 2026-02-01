import useCaptures from '@/hooks/useCaptures';
import React from 'react';

export default function Overview() {
  const [captures, refetch, isLoading] = useCaptures();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-pink-500"></span>
        <p className="ml-3 font-bold text-gray-500">Data Fetching...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#fcfcfc] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            📸 Captured Moments <span className="text-pink-500 text-lg">({captures.length})</span>
          </h1>
          <button 
            onClick={() => refetch()} 
            className="px-4 py-2 bg-white border border-pink-200 text-pink-600 rounded-lg shadow-sm hover:bg-pink-50 transition-all font-semibold"
          >
            🔄 Refresh
          </button>
        </div>

        {captures.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">Ekhono kono chobi capture hoyni!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {captures.map((item) => (
              <div key={item._id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt="User Moment" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full">
                    {item.capturedAt.split(',')[0]} {/* Shudhu date dekhabe */}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4">
                  <h4 className="text-sm font-bold text-gray-700 truncate" title={item.userEmail}>
                    {item.userEmail}
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-1 italic">
                    {item.capturedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}