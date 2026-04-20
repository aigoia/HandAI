"use client";

import { useRef } from "react";
import { useHandTracking } from "../hooks/useHandTracking";

export default function WebcamCanvas({ started }: { started: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useHandTracking(videoRef.current, canvasRef.current, started);

  return (
    <div className="absolute top-4 left-4 w-64 bg-white rounded-lg overflow-hidden shadow-md">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full scale-x-[-1]"
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}