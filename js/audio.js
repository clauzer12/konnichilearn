/**
 * KonnichiLearn Smart Audio Engine (Dual-Engine Audio)
 * 
 * Mengapa sebelumnya tidak bersuara di Windows?
 * 1. Di Windows, paket Text-to-Speech (TTS) bahasa Jepang ('ja-JP') TIDAK terpasang secara default.
 *    Browser yang mencari suara 'ja-JP' tidak menemukan suara lokal sehingga tidak mengeluarkan bunyi.
 * 2. Chromium memiliki bug di mana speechSynthesis kadang terhenti (paused).
 * 
 * Solusi Solutif:
 * - Engine 1: Online Native Japanese Audio (Google TTS) dengan suara penutur asli Jepang yang jernih dan pasti bunyi.
 * - Engine 2: Fallback ke Web Speech API bawaan peramban jika offline.
 */

class AudioEngine {
  constructor() {
    this.speechRate = 0.85; // Kecepatan nyaman untuk belajar
    this.japaneseVoice = null;
    this.hasNativeJapaneseVoice = false;
    this.audioElement = new Audio();
    this.initVoice();
  }

  initVoice() {
    if ('speechSynthesis' in window) {
      const checkVoices = () => {
        try {
          const voices = window.speechSynthesis.getVoices();
          this.japaneseVoice = voices.find(v => 
            v.lang === 'ja-JP' || 
            v.lang.startsWith('ja') || 
            v.name.toLowerCase().includes('japan') || 
            v.name.toLowerCase().includes('nihon')
          ) || null;
          this.hasNativeJapaneseVoice = !!this.japaneseVoice;
        } catch (e) {
          console.warn('Gagal membaca daftar suara browser:', e);
        }
      };

      checkVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = checkVoices;
      }
    }
  }

  setSpeed(rate) {
    this.speechRate = Math.max(0.5, Math.min(1.5, rate));
    if (this.audioElement) {
      this.audioElement.playbackRate = this.speechRate;
    }
  }

  play(text, customRate = null) {
    if (!text) return;
    const cleanText = text.trim();

    this.showAudioToast(`🔊 Memutar: "${cleanText}"`);

    // Prioritas 1: Gunakan Online Native Audio Stream jika terhubung internet
    // Ini menjamin suara Jepang terdengar jernih walau Windows tidak punya voice pack Jepang
    this.playOnlineAudio(cleanText, () => {
      // Prioritas 2 (Fallback): Gunakan Web Speech API jika offline
      this.playSpeechSynthesis(cleanText, customRate);
    });
  }

  playOnlineAudio(text, onErrorFallback = null) {
    try {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      }

      const encoded = encodeURIComponent(text);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=${encoded}`;

      this.audioElement = new Audio(url);
      this.audioElement.playbackRate = this.speechRate;

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Online audio gagal diputar, beralih ke Web Speech API:', err);
          if (onErrorFallback) onErrorFallback();
        });
      }
    } catch (e) {
      console.warn('Error saat memuat online audio:', e);
      if (onErrorFallback) onErrorFallback();
    }
  }

  playSpeechSynthesis(text, customRate) {
    if (!('speechSynthesis' in window)) return;

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();

      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = customRate || this.speechRate;
        utterance.pitch = 1.0;

        if (this.japaneseVoice) {
          utterance.voice = this.japaneseVoice;
        }

        utterance.onerror = (e) => {
          console.warn('SpeechSynthesis error:', e);
        };

        window.speechSynthesis.speak(utterance);
      }, 50);
    } catch (err) {
      console.warn('Web Speech API gagal:', err);
    }
  }

  showAudioToast(msg) {
    let toast = document.getElementById('audio-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'audio-toast';
      toast.className = 'fixed bottom-5 right-5 z-50 px-4 py-2 rounded-2xl bg-gray-900/90 text-white text-xs font-bold shadow-2xl backdrop-blur-md border border-gray-700/50 flex items-center gap-2 transition-all duration-300 opacity-0 translate-y-3 pointer-events-none';
      document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.classList.remove('opacity-0', 'translate-y-3');
    toast.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-3');
    }, 1800);
  }
}

// Inisialisasi instance audio player global
const audioPlayer = new AudioEngine();
