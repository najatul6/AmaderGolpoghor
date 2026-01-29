const Scrapbook = ({ back }) => (
  <div className="animate-slide-up bg-white p-6 rounded-3xl shadow-lg">
    <button onClick={back} className="text-pink-500 mb-4 font-bold italic text-sm">← ফিরে যাও</button>
    <h2 className="text-2xl font-bold text-pink-600 mb-6 border-b pb-2">স্মৃতিমালা (Digital Scrapbook) 📖</h2>
    <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[500px] p-2">
      <div className="border-l-4 border-pink-400 pl-4 py-2">
        <p className="font-bold">প্রথম দেখা দিনটি...</p>
        <p className="text-sm text-gray-500 italic">"মনে আছে আমরা প্রথম কতক্ষণ কথা বলেছিলাম?"</p>
      </div>
      <div className="bg-pink-50 p-4 rounded-xl italic text-gray-700">
        "তোমার সাথে কাটানো প্রতিটা মুহূর্ত আমার জন্য স্পেশাল।"
      </div>
      {/* Ekhane aro chobi ba text add koren */}
    </div>
  </div>
);
export default Scrapbook;