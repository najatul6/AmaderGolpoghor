const Scrapbook = ({ back }) => {
  const memories = [
    {
      title: "প্রথম দেখা দিনটি...",
      text: "মনে আছে আমরা প্রথম কতক্ষণ কথা বলেছিলাম? সেই অস্বস্তি থেকে আজকের এই গভীর বন্ধুত্ব—সবই এক একটা সুন্দর গল্প।",
      tag: "The Beginning"
    },
    {
      title: "সেই পাগলামি গুলো...",
      text: "তোমার সাথে কাটানো প্রতিটা মুহূর্ত আমার জন্য স্পেশাল। আমাদের সেই অকারণে হাসাহাসি আর পাগলামি গুলোই আমাকে বাঁচিয়ে রাখে।",
      tag: "Crazy Moments"
    },
    {
      title: "সবচেয়ে প্রিয় ভরসা...",
      text: "সবাই যখন ছেড়ে যায়, তুমি তখনো ছিলে। আমার সবথেকে বাজে দিনগুলোতে তোমার ওই 'পাশে আছি' কথাটাই যথেষ্ট ছিল।",
      tag: "Pure Loyalty"
    }
  ];

  return (
    <div className="animate-slide-up bg-[#FFFDF9] p-4 rounded-3xl shadow-xl border-2 border-pink-100">
      {/* Back Button */}
      <button 
        onClick={back} 
        className="text-pink-400 mb-4 font-bold italic text-xs hover:underline flex items-center gap-1"
      >
        ← আগের ধাপে ফিরে যাও
      </button>

      <h2 className="text-3xl font-bold text-pink-600 mb-6 font-serif italic text-center">
        স্মৃতিমালা 📖
      </h2>

      <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2 scrollbar-hide">
        {memories.map((m, i) => (
          <div 
            key={i} 
            className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-pink-400 relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-2 text-pink-50 opacity-20 text-4xl group-hover:opacity-40 transition-opacity">
              ✨
            </div>
            
            <span className="text-[10px] uppercase tracking-widest text-pink-300 font-bold">
              {m.tag}
            </span>
            <h3 className="font-bold text-gray-800 text-lg mt-1">{m.title}</h3>
            <p className="text-sm text-gray-600 italic mt-3 leading-relaxed">
              "{m.text}"
            </p>
          </div>
        ))}

        {/* Ending Note Card */}
        <div className="bg-pink-50 p-6 rounded-3xl border-2 border-dashed border-pink-200 text-center">
          <p className="text-pink-600 font-medium italic text-sm">
            "আমাদের গল্পের প্রতিটি পাতা এভাবেই ভালোবাসায় ভরে থাক..." ❤️
          </p>
        </div>
      </div>
      
      <p className="text-[10px] text-center mt-4 text-pink-200 italic font-mono">
        Keep Scrolling... More Memories Await
      </p>
    </div>
  );
};

export default Scrapbook;