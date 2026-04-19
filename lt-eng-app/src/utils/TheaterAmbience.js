/**
 * Theater Ambience Utility
 * Manages low-volume background loops for immersion.
 */

class TheaterAmbience {
  constructor() {
    this.audio = null;
    this.isIdling = false;
  }

  play() {
    if (this.audio) this.stop();
    
    // Using a subtle ambient school/classroom loop
    // In production, this would be a local asset in /public/audio
    this.audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-small-group-room-ambience-477.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.05; // Extremely subtle
    
    this.audio.play().catch(e => console.warn('Ambience blocked by browser', e));
  }

  setVolume(vol) {
    if (this.audio) this.audio.volume = vol;
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}

export const theaterAmbience = new TheaterAmbience();
