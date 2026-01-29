import React, { useState, useEffect } from 'react';
import Scrapbook from './components/Scrapbook';
import JarOfHearts from './components/JarOfHearts';
import MindReader from './components/MindReader';
import FriendshipMeter from './components/FriendshipMeter';

const Home = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-[#fff5f7] text-[#4a4a4a] font-sans">
      {/* Navigation Bar */}
      <nav className="p-5 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-pink-600 cursor-pointer" onClick={() => setActiveTab('home')}>
          আমাদের গল্পঘর
        </h1>
        <div className="space-x-4 text-sm font-medium">
          <button onClick={() => setActiveTab('scrapbook')} className="hover:text-pink-500">স্মৃতিমালা</button>
          <button onClick={() => setActiveTab('jar')} className="hover:text-pink-500">হৃদয় কলস</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto p-6">
        {activeTab === 'home' && (
          <div className="text-center py-20 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">স্বাগতম, আমার প্রিয় বন্ধু! ✨</h2>
            <p className="mb-10 text-gray-500">আজকের ১০ মিনিট শুধু আমাদের এই ছোট জগতের জন্য।</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => setActiveTab('scrapbook')} className="p-10 bg-white rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all">
                <span className="text-4xl">📖</span>
                <p className="mt-2 font-bold">স্ক্র্যাপবুক</p>
              </div>
              <div onClick={() => setActiveTab('reader')} className="p-10 bg-white rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all">
                <span className="text-4xl">🧠</span>
                <p className="mt-2 font-bold">মন পড়ার জাদু</p>
              </div>
              <div onClick={() => setActiveTab('jar')} className="p-10 bg-white rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all">
                <span className="text-4xl">🏺</span>
                <p className="mt-2 font-bold">জার অফ হার্টস</p>
              </div>
              <div onClick={() => setActiveTab('meter')} className="p-10 bg-white rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all">
                <span className="text-4xl">📊</span>
                <p className="mt-2 font-bold">লয়্যালটি চেক</p>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Components Rendering */}
        {activeTab === 'scrapbook' && <Scrapbook />}
        {activeTab === 'jar' && <JarOfHearts />}
        {activeTab === 'reader' && <MindReader />}
        {activeTab === 'meter' && <FriendshipMeter />}
      </main>

      {/* 10 Minute Lock Message */}
      <footer className="text-center py-10 text-xs text-gray-400">
        <p>পুরো ১০ মিনিট ঘুরলে নিচে একটি স্পেশাল সারপ্রাইজ বক্স আসবে...</p>
      </footer>
    </div>
  );
};

export default Home;