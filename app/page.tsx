"use client";

import { useState } from "react";
import Script from "next/script";
import WebcamCanvas from "../components/WebcamCanvas";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
        strategy="beforeInteractive"
      />

      <main className="relative flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        
        <WebcamCanvas started={started} />

        <div className="flex flex-col items-center gap-6 bg-white p-10 rounded-2xl shadow-sm dark:bg-zinc-900">
          <h1 className="text-2xl font-bold">Hand Tracking Modular</h1>

          <button
            onClick={() => setStarted(true)}
            className="rounded-xl bg-black px-6 py-3 text-white"
          >
            Start Tracking
          </button>
        </div>
      </main>
    </>
  );
}