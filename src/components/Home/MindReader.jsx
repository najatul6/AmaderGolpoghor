import React, { useState } from 'react';

const MindReader = () => {
  const [step, setStep] = useState(1);
  const [randomResult, setRandomResult] = useState('');

  const emojis = ['🌸', '⭐', '🎈', '🌙', '🍀', '🍎'];

  const results = [
    "তুমি ভাবছিলে যে— আমিই তোমার সবথেকে ভালো বন্ধু আর আমার মতো পাগল আর একটাও নেই!",
    "তোমার মনে আসছিল— এই ইন্টারফেসটা কে বানালো? এতো সুন্দর কেন! (আমিই বানিয়েছি কিন্তু 😜)",
    "তুমি ভাবছিলে— আজকে আমাকে একটা ট্রিট দেওয়া উচিত, তাই না? আমি কিন্তু না করবো না! 🍔",
    "তোমার মনে হচ্ছিল— আমাদের বন্ধুত্বটা ঠিক এই ইমোজির মতোই সুন্দর আর কালারফুল! 🌈",
    "তুমি ভাবছিলে— ইশ! আমি যদি ওর মনের কথাগুলোও এভাবে পড়তে পারতাম! 🔮",
    "তুমি নিশ্চিত মনে মনে বলছো— 'এই ছেলেটা এতো খাটে কীভাবে আমার জন্য?' ভালোবাসা থেকে বন্ধু! ❤️"
  ];

  const handleMindRead = () => {
    // Randomly ekta result pick korbe
    const randomIndex = Math.floor(Math.random() * results.length);
    setRandomResult(results[randomIndex]);
    setStep(3);
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-xl border-2 border-pink-200 mt-6 max-w-md mx-auto text-center">
      <h3 className="text-2xl font-bold text-pink-600 mb-4 font-serif">মন পড়ার জাদুকর 🧠✨</h3>
      
      {step === 1 && (
        <div className="animate-fade-in">
          <p className="text-gray-600 mb-6 text-sm">নিচের যেকোনো একটি ইমোজি মনে মনে শক্ত করে ধরো, কিন্তু একদম ক্লিক করবে না!</p>
          <div className="grid grid-cols-3 gap-4 text-4xl mb-8">
            {emojis.map(e => (
              <span key={e} className="p-2 hover:bg-pink-50 rounded-xl transition-all duration-300 cursor-default">
                {e}
              </span>
            ))}
          </div>
          <button 
            onClick={() => setStep(2)}
            className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-md hover:bg-pink-600 transition-all"
          >
            পছন্দ করেছি! ✅
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-slide-up space-y-6">
          <p className="text-gray-600 text-lg">এবার স্ক্রিনে তাকিয়ে ৫ সেকেন্ড আমার কথা ভাবো...</p>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-pink-400 text-xs animate-pulse font-mono tracking-widest text-center">
             READING_MEMORY_BLOCK_404...
          </p>
          <button 
            onClick={handleMindRead}
            className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold"
          >
            পড়া শেষ? রেজাল্ট দেখো! 🔮
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="animate-bounce-in">
          <div className="text-5xl mb-4 text-center">😲</div>
          <h4 className="text-xl font-bold text-gray-800 mb-4">ধরা খেয়ে গেলে তো!</h4>
          <div className="p-6 bg-pink-50 rounded-2xl border-2 border-dashed border-pink-200">
            <p className="text-pink-700 font-medium italic leading-relaxed">
              "{randomResult}"
            </p>
          </div>
          <button 
            onClick={() => setStep(1)}
            className="mt-8 text-sm text-pink-400 font-semibold hover:underline"
          >
            ← বিশ্বাস হচ্ছে না? আবার খেলো!
          </button>
        </div>
      )}
    </div>
  );
};

export default MindReader;