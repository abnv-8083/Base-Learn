"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Zap, Quote, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

const quotes = [
  "Your future is created by what you do today, not tomorrow. — Robert Kiyosaki",
  "The expert in anything was once a beginner. — Helen Hayes",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Learning is not attained by chance, it must be sought for with ardor and diligence. — Abigail Adams"
];

export default function RegisterPage() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Left Panel - Illustration & Motivational */}
      <div className="hidden lg:flex w-[60%] bg-primary relative items-center justify-center p-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-primary-dark rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600 rounded-full blur-[100px] opacity-40" />
        </div>

        <div className="relative z-10 text-center space-y-12 max-w-xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <Zap className="text-primary w-12 h-12 fill-primary" />
            </div>
            <h1 className="text-4xl font-display font-bold text-white tracking-tight">Base Learn</h1>
          </div>

          {/* Animated Illustration Placeholder */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-full aspect-square max-w-md mx-auto relative"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-primary-light/10 rounded-full animate-pulse flex items-center justify-center">
                   <div className="w-48 h-48 bg-white/5 rounded-full border border-white/20" />
                </div>
                {/* Floating Icons */}
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute inset-0">
                  <div className="absolute top-0 right-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <GraduationCap className="text-primary w-6 h-6" />
                  </div>
                  <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center">
                    <Zap className="text-indigo-500 w-5 h-5 fill-indigo-500" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl"
          >
            <p className="text-xl text-white font-medium italic leading-relaxed">
              "{quotes[currentQuote]}"
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 md:p-12 relative">
        <div className="w-full max-w-md">
          <SignUp 
            routing="hash"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-none p-0 bg-transparent",
                headerTitle: "text-3xl font-display font-bold text-text-main tracking-tight",
                headerSubtitle: "text-text-muted font-medium",
                socialButtonsBlockButton: "rounded-btn border-border-main hover:bg-bg-soft transition-all text-sm font-bold",
                formButtonPrimary: "bg-primary hover:bg-primary-dark rounded-btn h-12 shadow-ocean transition-all transform active:scale-95 text-sm font-bold",
                formFieldLabel: "text-xs font-bold text-text-muted uppercase tracking-wider mb-2",
                formFieldInput: "bg-bg-soft border-border-main rounded-btn focus:ring-2 focus:ring-primary/20 transition-all font-medium",
                footerActionLink: "text-primary hover:text-primary-dark font-bold",
                identityPreviewText: "font-bold text-text-main",
                formFieldInputShowPasswordButton: "text-text-muted hover:text-primary",
                formFieldAction: "text-xs font-bold text-primary hover:text-primary-dark"
              }
            }}
            signInUrl="/login"
            forceRedirectUrl="/onboarding"
          />
        </div>
      </div>
    </div>
  );
}
