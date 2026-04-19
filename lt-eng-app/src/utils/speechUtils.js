import { languageConfig } from '../config/languageConfig';

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.isReady = false;

    if (this.synth) {
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
      this.initVoices();
    }
  }

  initVoices() {
    const allVoices = this.synth.getVoices();
    // Filter for target language voices
    this.voices = allVoices.filter(v => v.lang.startsWith(languageConfig.sourceLang === 'lt' ? languageConfig.targetLang.split('-')[0] : 'en'));
    
    if (this.voices.length > 0) {
      this.isReady = true;
    }
  }

  getVoice(options = {}) {
    if (!this.voices.length) return null;

    // Filter by gender
    const candidates = this.voices.filter(v => {
      const name = v.name.toLowerCase();
      if (options.gender === 'female') {
        return name.includes('female') || name.includes('samantha') || name.includes('google us english') || name.includes('zira');
      }
      return name.includes('male') || name.includes('alex') || name.includes('david') || name.includes('mark') || name.includes('google uk english male');
    });

    if (candidates.length === 0) return this.voices[0];

    // If a specific character name is provided, use it to seed a stable choice
    if (options.id) {
       const charCode = options.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
       return candidates[charCode % candidates.length];
    }

    return candidates[0];
  }

  speak(text, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        reject("No speech synthesis available");
        return;
      }
      
      if (options.cancel !== false) {
        this.synth.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.getVoice(options);
      utterance.lang = options.lang || languageConfig.targetLang;
      utterance.rate = options.rate || 0.9;
      
      if (options.gender === 'female') {
        utterance.pitch = 1.1;
      } else if (options.gender === 'male') {
        utterance.pitch = 0.9;
      } else {
        utterance.pitch = options.pitch || 1.0;
      }
      utterance.volume = options.volume || 1.0;

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = (event) => {
        console.error("Speech error", event);
        resolve(); // Resolve anyway to not block simulation
      };

      this.synth.speak(utterance);
      // Keep reference to prevent garbage collection (fixes truncation in some browsers)
      window._currentUtterance = utterance;
    });
  }

  stop() {
    if (this.synth) this.synth.cancel();
  }
}

export const speechService = new SpeechService();
