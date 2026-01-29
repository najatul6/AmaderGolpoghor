import React from 'react';

const JarOfHearts = ({ back }) => {
  const reasons = [
    "তোমার মনটা একদম স্বচ্ছ কাঁচের মতো। ✨",
    "তোমার সাথে থাকলে আমি নিজের মতো থাকতে পারি। 😊",
    "তোমার পিজে জোকসগুলো পৃথিবীর সবথেকে মজার! 😂",
    "তুমি রাগ করলে তোমাকে অনেক মিষ্টি লাগে। 🍬",
    "সবাই ছেড়ে গেলেও তুমি পাশে থাকবে জানি। ❤️",
    "আমার সব অগোছালো চিন্তার একমাত্র শ্রোতা তুমি। 🎧",
    "তুমি আছো বলেই দুনিয়াটা এতো সুন্দর মনে হয়। 🌍"
  ];

  return (
    <div className="animate-slide-up bg-white p-8 rounded-[40px] shadow-2xl border-2 border-pink-50 text-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-50 rounded-full opacity-50"></div>
      
      <button 
        onClick={back} 
        className="text-pink-400 mb-6 flex items-center gap-1 text-xs font-bold hover:underline relative z-10"
      >
        ← আগের ধাপে ফিরে যাও
      </button>

      <div className="relative z-10">
        <h2 className="text-4xl mb-2 text-pink-500 font-serif italic font-bold">Jar of Hearts 🍯</h2>
        <p className="text-gray-400 text-xs italic mb-8">কেন তুমিই আমার সেরা বন্ধু?</p>
      </div>

      <div className="space-y-4 mt-4 text-left max-h-[400px] overflow-y-auto pr-2 scrollbar-hide relative z-10">
        {reasons.map((r, i) => (
          <div 
            key={i} 
            className="group bg-gradient-to-r from-pink-50 to-white p-4 rounded-2xl border border-pink-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <p className="text-gray-700 text-sm leading-relaxed">
              <span className="inline-block animate-pulse mr-2">💖</span>
              {r}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-pink-50">
        <p className="text-[10px] text-pink-300 uppercase tracking-[2px]">আমাদের বন্ধুত্বের কলস</p>
      </div>
    </div>
  );
};

export default JarOfHearts;