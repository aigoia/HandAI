import { useEffect } from "react";
import { createHands } from "../lib/mediapipe";

export const useHandTracking = (
  video: HTMLVideoElement | null,
  canvas: HTMLCanvasElement | null,
  started: boolean
) => {
  useEffect(() => {
    if (!started || !video || !canvas) return;

    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId: number;

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 },
      });

      video.srcObject = stream;
      await video.play();

      canvas.width = 320;
      canvas.height = 240;

      const hands = createHands();

      hands.onResults((results: any) => {
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.scale(-1, 1);
        context.translate(-canvas.width, 0);

        if (
          !results.multiHandLandmarks ||
          results.multiHandLandmarks.length === 0
        ) {
          context.restore();
          return;
        }

        const landmarks = results.multiHandLandmarks[0];
        if (!landmarks || landmarks.length < 21) {
          context.restore();
          return;
        }

        // Palm fill
        const palm = [0, 5, 9, 13, 17];
        context.beginPath();
        palm.forEach((i, idx) => {
          const x = landmarks[i].x * canvas.width;
          const y = landmarks[i].y * canvas.height;
          idx === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
        });
        context.closePath();
        context.fillStyle = "rgba(124,252,0,0.2)";
        context.fill();

        // Fingertips only
        const tips = [4, 8, 12, 16, 20];
        for (const i of tips) {
          const x = landmarks[i].x * canvas.width;
          const y = landmarks[i].y * canvas.height;

          context.beginPath();
          context.arc(x, y, 3, 0, 2 * Math.PI);
          context.fillStyle = "#7CFC00";
          context.fill();
        }

        context.restore();
      });

      const loop = async () => {
        frameCount++;
        if (frameCount % 2 === 0) {
          await hands.send({ image: video });
        }
        animationFrameId = requestAnimationFrame(loop);
      };

      loop();
    };

    start();

    return () => cancelAnimationFrame(animationFrameId);
  }, [video, canvas, started]);
};