import { useEffect } from 'react';

/**
 * useTheaterCamera
 * Manages the "Cinematic Camera" for the Synthetic Classroom.
 * It updates global CSS variables to pan and zoom the stage 
 * according to who is currently speaking.
 */
export function useTheaterCamera(speakingId) {
  useEffect(() => {
    const root = document.documentElement;
    
    // Default Camera: WIDE
    let zoom = 1.0;
    let panX = '0%';
    let panY = '0%';

    switch (speakingId) {
      case 'teacher':
        zoom = 1.25;
        panX = '0%';
        panY = '5%';
        break;
      case 'jonas':
        zoom = 1.6;
        panX = '35%'; // Pan right to show character on the left
        panY = '10%';
        break;
      case 'alisa':
        zoom = 1.6;
        panX = '-35%'; // Pan left to show character on the right
        panY = '10%';
        break;
      case 'domantas':
        zoom = 1.6;
        panX = '-15%';
        panY = '10%';
        break;
      case 'juozas':
        // Student Focus: Zoom in slightly and move down to the "desk"
        zoom = 1.15;
        panX = '0%';
        panY = '15%';
        break;
      default:
        // Wide shot
        zoom = 1.0;
        panX = '0%';
        panY = '0%';
    }

    // Apply with transition-friendly CSS variables
    root.style.setProperty('--stage-zoom', zoom.toString());
    root.style.setProperty('--stage-pan-x', panX);
    root.style.setProperty('--stage-pan-y', panY);

    return () => {
      // Reset on unmount
      root.style.setProperty('--stage-zoom', '1');
      root.style.setProperty('--stage-pan-x', '0%');
      root.style.setProperty('--stage-pan-y', '0%');
    };
  }, [speakingId]);
}
