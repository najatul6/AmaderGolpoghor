const LoyaltyCheck = ({ back }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg text-center animate-slide-up">
      <button onClick={back} className="text-pink-500 mb-4 block underline text-sm">ফিরে যাও</button>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">আমাদের ফ্রেন্ডশিপ মিটার ⚖️</h2>
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-2xl">
          <p className="mb-2">তুমার চোখে আমাদের বন্ধুত্ব কতো পার্সেন্ট?</p>
          <input type="range" className="w-full accent-pink-500" />
          <div className="flex justify-between text-xs text-gray-400"><span>০%</span><span>১০০%</span></div>
        </div>
        <div className="p-4 border-2 border-dashed border-pink-200 rounded-2xl italic">
          "লয়্যালটি মানে হলো আমি যখন তোমার পিছনেও তোমার সুনাম করি।" — এটিই আমাদের সম্পর্কের মূলমন্ত্র।
        </div>
      </div>
    </div>
  );
};
export default LoyaltyCheck;