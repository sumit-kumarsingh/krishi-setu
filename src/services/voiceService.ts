/**
 * Voice Accessibility Service
 * Provides Text-to-Speech (TTS) and Speech-to-Text (STT)
 * Optimized for Kannada (kn-IN) and Indian English (en-IN).
 */

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export class VoiceService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static recognition: any = null;
  private static isSpeaking = false;
  private static isListening = false;

  public static speak(text: string, lang: 'kn' | 'en' | 'hi' = 'kn', onEnd?: () => void): void {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Stop any pending utterances
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'kn' ? 'kn-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95; // Slightly slower for clear rural comprehension
      utterance.pitch = 1.0;

      // Try finding regional Indian voices if available
      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(v => 
        (lang === 'kn' && (v.lang.includes('kn') || v.name.toLowerCase().includes('kannada'))) ||
        (lang === 'hi' && (v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'))) ||
        (lang === 'en' && (v.lang.includes('en-IN') || v.name.toLowerCase().includes('india')))
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } catch {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  public static stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  public static startListening(
    lang: 'kn' | 'en' | 'hi',
    onResult: (transcript: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ): boolean {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onError('Speech recognition not natively supported in this browser. Please type or use keyboard.');
      return false;
    }

    try {
      if (this.recognition) {
        this.recognition.abort();
      }

      this.recognition = new SpeechRecognition();
      this.recognition.lang = lang === 'kn' ? 'kn-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        onError(event.error || 'Voice input error');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
      return true;
    } catch (e: any) {
      this.isListening = false;
      onError(e?.message || 'Could not start microphone');
      return false;
    }
  }

  public static stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.isListening = false;
    }
  }

  public static getSpeakingStatus(): boolean {
    return this.isSpeaking;
  }

  public static getListeningStatus(): boolean {
    return this.isListening;
  }
}
