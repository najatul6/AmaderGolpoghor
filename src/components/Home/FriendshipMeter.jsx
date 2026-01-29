import React, { useState } from 'react';

const FriendshipMeter = ({ back }) => {
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({});

  const questions = [
    { id: 1, q: "আমি রেগে গেলে তুমি কী করো?", a: "চুপ থাকো", b: "হাসানোর চেষ্টা করো", c: "তুমিও রাগ করো" },
    { id: 2, q: "আমাদের সবথেকে প্রিয় স্মৃতি কোনটি?", a: "প্রথম দেখা", b: "একসাথে খাওয়া", c: "ঘুরতে যাওয়া" },
    { id: 3, q: "আমি বিপদে পড়লে তুমি কী করবে?", a: "সব ছেড়ে আসবে", b: "ফোন দিবে", c: "পরামর্শ দিবে" },
  ];

  const handleSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleCalculate = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("সবগুলো প্রশ্নের উত্তর দাও আগে! 😊");
      return;
    }
    setShowResult(true);
  };

  return (
    <div className="animate-slide-up bg-white p-4 rounded-3xl shadow-xl border-t-8 border-pink-500 max-w-lg mx-auto">
      <button onClick={back} className="text-pink-400 mb-6 flex items-center gap-1 text-sm font-semibold hover:underline">
        ← হোম পেজে যাও
      </button>

      {!showResult ? (
        <div className="space-y-8">
          <header className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 font-serif italic">ফ্রেন্ডশিপ মিটার ⚖️</h2>
            <p className="text-gray-500 mt-2 italic text-sm">দেখা যাক আমাদের বন্ডিং কতটা শক্ত!</p>
          </header>

          {/* Quiz Section */}
          <div className="space-y-6">
            {questions.map((item) => (
              <div key={item.id} className="text-left">
                <p className="font-semibold text-gray-700 mb-3">{item.id}. {item.q}</p>
                <div className="grid grid-cols-1 gap-2">
                  {[item.a, item.b, item.c].map((opt, i) => {
                    const isSelected = answers[item.id] === opt;
                    return (
                      <button 
                        key={i}
                        onClick={() => handleSelect(item.id, opt)}
                        className={`text-left p-3 border rounded-xl transition-all duration-300 text-sm ${
                          isSelected 
                          ? "bg-pink-500 text-white border-pink-500 shadow-md scale-[1.02]" 
                          : "bg-white text-gray-600 border-pink-100 hover:bg-pink-50"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white py-4 rounded-2xl font-bold shadow-lg shadow-pink-200 hover:scale-105 transition-transform active:scale-95"
          >
            রেজাল্ট দেখো ✨
          </button>
        </div>
      ) : (
        <div className="text-center animate-bounce-in">
          <div className="relative inline-block mb-6">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="#fce4ec" strokeWidth="12" fill="none" />
              <circle 
                cx="64" cy="64" r="58" stroke="#ec4899" strokeWidth="12" fill="none" 
                strokeDasharray="364.4" 
                strokeDashoffset="0" 
                className="animate-pulse" 
                style={{ strokeLinecap: 'round' }}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-black text-pink-600">
              ১০০%
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-2 font-serif">আনব্রেকেবল বন্ডিং! ♾️</h3>
          <p className="text-gray-600 leading-relaxed mb-6 italic">
            "আমাদের বন্ধুত্ব কোনো নম্বর দিয়ে মাপা সম্ভব নয়, কারণ তুমি আমার সবথেকে সেরা লয়্যাল বন্ধু।" 
          </p>
          
          <div className="p-4 bg-yellow-50 border-2 border-dashed border-yellow-200 rounded-2xl animate-pulse">
            <p className="text-yellow-700 font-bold text-sm">🏆 অর্জন: বেস্ট ফ্রেন্ড ফরএভার ব্যাজ</p>
          </div>

          <button 
            onClick={() => {setShowResult(false); setAnswers({});}} 
            className="mt-8 text-gray-400 text-xs underline hover:text-pink-400"
          >
            আবার টেস্ট করো
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendshipMeter;