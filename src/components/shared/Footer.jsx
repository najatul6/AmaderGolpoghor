import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 py-8 w-full text-center border-t border-pink-100/50">
      <div className="flex justify-center items-center gap-6 mb-4">
        {/* Portfolio Link */}
        <a 
          href="https://najatul-islam.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-all duration-300 text-sm font-medium"
        >
          <span className="p-2 bg-white shadow-sm rounded-lg group-hover:bg-pink-50 transition-colors">🌐</span>
          Portfolio
        </a>

        {/* GitHub Link */}
        <a 
          href="https://github.com/najatul6" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-all duration-300 text-sm font-medium"
        >
          <span className="p-2 bg-white shadow-sm rounded-lg group-hover:bg-pink-50 transition-colors">🐙</span>
          GitHub
        </a>
      </div>

      <div className="space-y-1">
        <p className="text-gray-400 text-[10px] tracking-[3px] uppercase">
          Handcrafted with ❤️ by
        </p>
        <p className="text-pink-400 font-bold font-serif text-sm tracking-widest italic">
          Najatul Islam
        </p>
      </div>

      <div className="mt-4 opacity-30 text-[9px] text-gray-400">
        © 2026 | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;