import React, { useState } from 'react';

const LoyaltyCheck = ({ back }) => {
  const [loyaltyValue, setLoyaltyValue] = useState(50);

  const getComment = (val) => {
    if (val < 30) return "এত কম? বন্ধুত্ব কি আমাদের সস্তা? 🥺";
    if (val < 70) return "আরেকটু বেশি হওয়া উচিত ছিল না? 🤔";
    if (val < 99) return "বাহ! আমরা প্রায় পারফেক্ট! 😍";
    return "আমি জানতাম! আমাদের বন্ধুত্ব সবসময় ১০০%। 🏆❤️";
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl text-center animate-slide-up border-2 border-pink-50">
      <button 
        onClick={back} 
        className="text-pink-400 mb-6 flex items-center gap-1 text-xs font-bold hover:underline"
      >
        ← আগের ধাপে ফিরে যাও
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif italic">লয়্যালটি চেক ⚖️</h2>
      
      <div className="space-y-8">
        <div className="p-6 bg-pink-50 rounded-[30px] shadow-inner">
          <p className="mb-4 text-gray-700 font-medium">তোমার চোখে আমাদের বন্ধুত্ব কত পার্সেন্ট?</p>
          
          <div className="relative pt-2">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={loyaltyValue}
              onChange={(e) => setLoyaltyValue(e.target.value)}
              className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500" 
            />
            <div className="flex justify-between text-[10px] text-pink-300 mt-2 font-bold px-1">
              <span>০%</span>
              <span>৫০%</span>
              <span>১০০%</span>
            </div>
          </div>

          <div className="mt-6">
            <span className="text-4xl font-black text-pink-500">{loyaltyValue}%</span>
            <p className="text-sm text-pink-400 mt-2 italic h-10 flex items-center justify-center">
              {getComment(loyaltyValue)}
            </p>
          </div>
        </div>

        <div className="p-5 border-2 border-dashed border-pink-200 rounded-2xl bg-white relative">
          <span className="absolute -top-3 left-4 bg-white px-2 text-xs text-pink-300 font-bold uppercase tracking-wider">
            Our Mantra
          </span>
          <p className="text-gray-600 text-sm italic leading-relaxed">
            "লয়্যালটি মানে হলো আমি যখন তোমার পিছনেও তোমার সুনাম করি।" — এটিই আমাদের সম্পর্কের মূলমন্ত্র।
          </p>
        </div>
      </div>

      <div className="mt-8 text-[10px] text-gray-300 uppercase tracking-widest">
        Faithfulness is the key
      </div>
    </div>
  );
};

export default LoyaltyCheck;