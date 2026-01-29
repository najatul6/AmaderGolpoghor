const JarOfHearts = ({ back }) => {
  const reasons = [
    "তুমার মনটা একদম স্বচ্ছ কাঁচের মতো। ✨",
    "তুমার সাথে থাকলে আমি নিজের মতো থাকতে পারি। 😊",
    "তুমার পিজে জোকসগুলো পৃথিবীর সবথেকে মজার! 😂",
    "তুমি রাগ করলে তোমাকে অনেক মিষ্টি লাগে। 🍬",
    "সবাই ছেড়ে গেলেও তুমি পাশে থাকবে জানি। ❤️"
  ];
  return (
    <div className="animate-slide-up bg-white p-8 rounded-3xl shadow-lg text-center">
      <button onClick={back} className="text-pink-500 block mb-4 underline text-sm">ফিরে যাও</button>
      <div className="text-5xl mb-4 text-pink-500 italic font-serif leading-none underline decoration-pink-200">Jar of Hearts</div>
      <div className="space-y-3 mt-6 text-left">
        {reasons.map((r, i) => (
          <div key={i} className="bg-pink-50 p-4 rounded-2xl border-l-4 border-pink-400">
            <p className="text-gray-700 font-medium">💖 {r}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default JarOfHearts;