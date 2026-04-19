class RecognitionService {
  constructor() {
    this.SpeechRecognitionClass = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    this.instance = null;
    this.timer = null;
  }

  isSupported() {
    return !!this.SpeechRecognitionClass;
  }

  /**
   * Directly requests microphone permission and checks if hardware is available.
   */
  async checkHardwarePermission() {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
      throw "Jūsų naršyklė nepalaiko MediaDevices API (reikia HTTPS ryšio).";
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      console.log("🎤 Hardware: Microphone access GRANTED and available.");
      return true;
    } catch (err) {
      console.error("🎤 Hardware error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        throw "Mikrofonas UŽBLOKUOTAS. Patikrinkite leidimus naršyklėje.";
      }
      if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        throw "Neradau Mikrofoną. Patikrinkite ar jis prijungtas.";
      }
      if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        throw "Mikrofonas UŽIMTAS kitos programos ar plėtinio.";
      }
      throw `Mikrofono klaida: ${err.message || err.name}`;
    }
  }

  listen(timeoutMs = 10000, options = { continuous: false }) {
    return new Promise((resolve, reject) => {
      if (!this.SpeechRecognitionClass) {
        reject('Not supported');
        return;
      }
      
      setTimeout(() => {
        try {
          this.instance = new this.SpeechRecognitionClass();
          this.instance.lang = 'en-US';
          this.instance.continuous = !!options.continuous;
          this.instance.interimResults = true;

          let isFinished = false;
          let accumulatedTranscript = '';

          const finish = (result, isError = false) => {
            if (isFinished) return;
            isFinished = true;
            
            if (this.timer) {
              clearTimeout(this.timer);
              this.timer = null;
            }
            
            try {
              if (this.instance) {
                this.instance.onresult = null;
                this.instance.onend = null;
                this.instance.onerror = null;
                this.instance.stop();
              }
            } catch {
              // Ignore cleanup errors
            }

            if (isError) reject(result);
            else resolve(result);
          };

          this.timer = setTimeout(() => {
            finish(accumulatedTranscript.trim() || '', false);
          }, timeoutMs);

          this.instance.onresult = (event) => {
            let currentTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              currentTranscript += event.results[i][0].transcript;
            }
            accumulatedTranscript = currentTranscript;
            
            if (options.onInterim) {
              options.onInterim(accumulatedTranscript.trim());
            }

            if (!this.instance.continuous && accumulatedTranscript.trim().length >= 1 && event.results[0].isFinal) {
              finish(accumulatedTranscript.trim());
            }
          };

          this.instance.onerror = (event) => {
            if (event.error === 'no-speech') {
              finish('', false);
            } else if (event.error !== 'aborted') {
              finish(event.error, true);
            }
          };

          this.instance.onend = () => {
            finish(accumulatedTranscript.trim(), false);
          };

          this.instance.start();
        } catch (err) {
          reject(err);
        }
      }, 50);
    });
  }

  stop() {
    if (this.timer) clearTimeout(this.timer);
    if (this.instance) {
       try { this.instance.stop(); } catch { /* ignore stop error */ }
       this.instance = null;
    }
  }

  normalize(text) {
    if (!text) return "";
    return text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  isCloseEnough(s1, s2) {
    if (!s1 || !s2) return false;
    const n1 = this.normalize(s1);
    const n2 = this.normalize(s2);
    
    if (n1 === n2) return true;
    if (n1.includes(n2) || n2.includes(n1)) return true;

    const distance = (a, b) => {
      const matrix = [];
      for (let i = 0; i <= b.length; i++) matrix[i] = [i];
      for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
          }
        }
      }
      return matrix[b.length][a.length];
    };

    const d = distance(n1, n2);
    const maxLength = Math.max(n1.length, n2.length);
    if (maxLength <= 3) return d <= 1;
    return d <= (maxLength > 4 ? 2 : 1);
  }

  compare(spoken, original, strictness = 0.8) {
    const s = this.normalize(spoken);
    const o = this.normalize(original);
    
    if (s === o) return { match: true, score: 1 };

    const sWords = s.split(' ').filter(w => w.length > 0);
    const oWords = o.split(' ').filter(w => w.length > 0);
    
    let matches = 0;
    oWords.forEach(ow => {
      if (sWords.some(sw => sw === ow || this.isCloseEnough(sw, ow))) {
        matches++;
      }
    });

    let score = matches / oWords.length;
    
    // Phonetic variants for English common words
    const variants = {
      'work': ['work', 'worked', 'walk', 'word', 'war'],
      'love': ['love', 'loved', 'laugh', 'lab'],
      'did': ['did', 'do', 'ded', 'dead'],
      'will': ['will', 'well', 'we'],
      'went': ['went', 'win', 'want', 'when', 'one'],
      'saw': ['saw', 'so', 'seen', 'she', 'show', 'sow'],
      'said': ['said', 'say', 'set', 'sad', 'says'],
      'knew': ['knew', 'new', 'know', 'now'],
      'came': ['came', 'come', 'game', 'can'],
      'had': ['had', 'have', 'hat', 'add'],
      'does': ['does', 'do', 'those', 'dust'],
      'doesn\'t': ['doesn\'t', 'does not', 'dont', 'dosen'],
      'don\'t': ['don\'t', 'do not', 'done', 'dont'],
      'won\'t': ['won\'t', 'will not', 'want', 'wont']
    };

    
    const normalizedOriginal = this.normalize(original);
    const words = normalizedOriginal.split(' ');
    
    words.forEach(word => {
        if (variants[word]) {
            if (sWords.some(sw => variants[word].includes(sw))) {
                // If the specific word matches a known variant, boost score
                score = Math.max(score, 0.9);
            }
        }
    });

    return {
      match: score >= strictness,
      score: score
    };
  }
}

export const recognitionService = new RecognitionService();
