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
    this.voices = allVoices; // Keep all for filtering
    this.isReady = true;
  }

  detectLanguage(text) {
    if (!text) return 'en';
    // Lithuanian unique characters + common word endings/patterns
    const ltRegex = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]|( ir )|( yra )|( buvo )|([as]is\s)|([uų]s\s)|( taip )/i;
    // Also, if the text is long and lacks Q, W, X, it's more likely LT
    const enUniqueRegex = /[qwx]/i;
    
    const hasLT = ltRegex.test(text);
    const hasENUnique = enUniqueRegex.test(text);
    
    if (hasLT) return 'lt';
    if (!hasENUnique && text.length > 10) return 'lt'; // Heuristic for long LT phrases without unique letters
    return 'en';
  }

  segmentText(text) {
    if (!text) return [];
    // Split by quotes, colons, or long dashes to identify potential language shifts
    // We capture the delimiters as well to maintain full sentence structure
    const rawParts = text.split(/(".*?"|'.*?'|[:;])/);
    const segments = [];

    rawParts.forEach(part => {
      if (!part || !part.trim()) return;
      
      const lang = this.detectLanguage(part);
      
      // Merge with previous segment if they share the same language to reduce synthesis overhead
      if (segments.length > 0 && segments[segments.length - 1].lang === lang) {
        segments[segments.length - 1].text += part;
      } else {
        segments.push({ text: part, lang });
      }
    });

    return segments.length > 0 ? segments : [{ text, lang: this.detectLanguage(text) }];
  }

  getVoice(options = {}) {
    if (!this.voices.length) return null;

    const reqLang = options.lang || 'en';
    
    // Filter by language first
    let candidates = this.voices.filter(v => v.lang.startsWith(reqLang));
    
    // If no voice for Lithuanian, DO NOT fallback to English immediately.
    // Returning null allows the browser default to handle the 'lt-LT' language tag correctly.
    if (candidates.length === 0 && reqLang === 'lt') {
      return null;
    }

    // If no voice for specific lang, fallback to target language (English)
    if (candidates.length === 0) {
      candidates = this.voices.filter(v => v.lang.startsWith(languageConfig.targetLang.split('-')[0]));
    }

    // Filter by gender and common name patterns
    const genderCandidates = candidates.filter(v => {
      const name = v.name.toLowerCase();
      if (options.gender === 'female') {
        return name.includes('female') || name.includes('samantha') || name.includes('google us english') || name.includes('zira') || name.includes('aistė') || name.includes('ieva');
      }
      return name.includes('male') || name.includes('alex') || name.includes('david') || name.includes('mark') || name.includes('google uk english male') || name.includes('aistis') || name.includes('google lietuvių') || name.includes('mantas') || name.includes('lithuanian') || name.includes('lietuvių');
    });

    const finalCandidates = genderCandidates.length > 0 ? genderCandidates : candidates;

    if (finalCandidates.length === 0) return null; // Let the browser handle fallback via lang string

    // Character stability based on ID
    if (options.id) {
       const charCode = options.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
       return finalCandidates[charCode % finalCandidates.length];
    }

    return finalCandidates[0];
  }

  /**
   * Universal speak method that handles both simple and mixed-language sentences.
   */
  async speak(text, options = {}) {
    if (!this.synth) return Promise.reject("No speech synthesis available");
    
    if (options.cancel !== false) {
      this.synth.cancel();
    }

    // Optimization: If a specific language is forced, skip segmentation to prevent accent "guessing" for parts
    const segments = options.lang ? [{ text, lang: options.lang }] : this.segmentText(text);

    // sequential playback of segments
    for (const segment of segments) {
      await new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(segment.text);
        
        // Use detected segment language unless explicitly overridden for the whole call
        const currentLang = options.lang || segment.lang;
        const voice = this.getVoice({ ...options, lang: currentLang });
        if (voice) utterance.voice = voice;
        
        utterance.lang = currentLang === 'lt' ? 'lt-LT' : (options.lang || languageConfig.targetLang);
        
        utterance.rate = options.rate || 0.9;
        
        // Character identity
        if (options.gender === 'female') {
          utterance.pitch = 1.1;
        } else if (options.gender === 'male') {
          utterance.pitch = 0.9;
        } else {
          utterance.pitch = options.pitch || 1.0;
        }
        utterance.volume = options.volume || 1.0;

        utterance.onend = () => resolve();
        utterance.onerror = (event) => {
          console.error("Segment speech error", event);
          resolve(); 
        };

        this.synth.speak(utterance);
        window._currentUtterance = utterance;
      });
    }
  }

  stop() {
    if (this.synth) this.synth.cancel();
  }
}

export const speechService = new SpeechService();
