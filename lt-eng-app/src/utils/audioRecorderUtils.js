class AudioRecorder {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioBlob = null;
    this.audioUrl = null;
    this.audioElement = null;
  }

  async start() {
    this.audioChunks = [];
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Browser does not support audio recording.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };

    this.mediaRecorder.onstop = () => {
      this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
      this.audioUrl = URL.createObjectURL(this.audioBlob);
      this.audioElement = new Audio(this.audioUrl);
    };

    this.mediaRecorder.start();
  }

  async stop() {
    return new Promise((resolve) => {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.onstop = () => {
          this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioUrl = URL.createObjectURL(this.audioBlob);
          this.audioElement = new Audio(this.audioUrl);
          resolve(this.audioUrl);
        };
        this.mediaRecorder.stop();
        // Stop all tracks in the stream
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      } else {
        resolve(null);
      }
    });
  }

  play() {
    return new Promise((resolve, reject) => {
      if (this.audioElement) {
        this.audioElement.onended = resolve;
        this.audioElement.play().catch(reject);
      } else {
        resolve();
      }
    });
  }
}

export const audioRecorder = new AudioRecorder();
