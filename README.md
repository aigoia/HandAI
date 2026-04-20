# Hand Tracking Web Demo
Real-time hand tracking application using Next.js, TypeScript, and MediaPipe Hands.
The project captures webcam input, detects 21 hand landmarks, and renders a palm fill with a finger skeleton overlay.

## Features
* Webcam input
* Real-time hand tracking
* 21-point landmark detection
* Palm fill rendering
* Finger skeleton rendering
* Mirrored video display

## Tech Stack
* Next.js (App Router)
* TypeScript
* Tailwind CSS
* MediaPipe Hands (CDN)

## Project Structure
/app
  page.tsx

/components
  WebcamCanvas.tsx

/hooks
  useHandTracking.ts

/lib
  mediapipe.ts

## Pipeline
1. Capture webcam stream
2. Send frames to MediaPipe Hands
3. Receive 21 hand landmarks
4. Render:
   * Palm polygon
   * Finger skeleton
   * Fingertip points

## Performance Settings
* Resolution: 320x240
* Model complexity: 0
* Frame skipping enabled
* Reduced rendering (fingertips only)

## Hand Landmarks
* 0: wrist
* 4: thumb tip
* 8: index finger tip
* 12: middle finger tip
* 16: ring finger tip
* 20: pinky tip
  
## Setup
npm install

npm run dev

Open:
http://localhost
