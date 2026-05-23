"use client";
import { useState, useEffect } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-8 py-8">
      <Hero />
      <Experience />
    </main>
  );
}

function Hero() {
  const fullText = "Hi, I'm Cole";

  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 90);
    return () => clearInterval(timer);
  }, []);

  const done = typed === fullText;

  return (
    <div className="flex items-start mt-24 gap-16">
      {/* Casual headshot */}
      <img
        src="/casual_headshot.jpg"
        alt="Cole Murray"
        className="w-56 h-56 mt-4 border border-gray rounded-full object-cover"
      />
      {/* All of the text for the hero at the top */}
      <div className="mt-16">
        <h1 className="text-6xl text-white font-bold relative">
          {/* Invisible full text — holds the final width so layout never shifts */}
          <span className="invisible select-none">{fullText}</span>
          {/* Typed text overlaid on top */}
          <span className="absolute inset-0">
            {typed}
            {!done && <span className="animate-pulse">|</span>}
          </span>
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <p className="text-xl">Computer Engineering @ </p>
          <img
            src="/Illinois_Block_I.png"
            alt="UIUC Logo"
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <div className="w-full max-w-7xl mt-24">
      {/* Outer "gray paper" — the border lives here, with a visible gap around the terminal */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
        {/* Inner "black paper" — the terminal itself */}
        <div className="rounded-[8px] border border-white/20 overflow-hidden">
          {/* macOS title bar */}
          <div className="bg-[#070707] px-4 py-4 border-b border-white/20 flex items-center gap-2">
            <div className="ml-2 w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {/* Terminal content */}
          <div className="bg-[#0f0f11] p-5 font-mono text-sm leading-relaxed">
            <p>
              <span className="text-green-400">cole@portfolio</span>
              <span className="text-white">:~$ ls -la ./experience</span>
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-gray-500 text-xs">total 1</p>
              <div className="flex gap-6">
                <span className="text-purple-400">drwxr-xr-x</span>
                <span className="text-gray-400">2024 – present</span>
                <span className="text-sky-300">Nerdio/</span>
                <span className="text-gray-300 mb-100">
                  Software Engineer Intern
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
