/**
 * KonnichiLearn Smart Audio Engine (Dual-Engine Audio)
 * 
 * Optimal untuk:
 * - Google Chrome di iOS & Safari di iOS (iPhone / iPad)
 * - Android (Chrome, Samsung Internet)
 * - Desktop (Windows, macOS, Linux)
 * 
 * Solusi Khusus untuk Chrome & Safari di iPhone:
 * 1. Unlock AudioContext seketika saat event sentuhan (tap/click).
 * 2. Pemanggilan SpeechSynthesis secara SINKRON langsung dari interaksi pengguna (bukan via async/setTimeout).
 * 3. Menghindari WebKit Garbage Collection bug dengan menyimpan referensi utterance ke scope global.
 * 4. Fallback Google TTS dengan header no-referrer policy agar tidak diblokir GitHub Pages.
 */

class AudioEngine {
  constructor() {
    this.speechRate = 0.85; // Kecepatan nyaman belajar
    this.japaneseVoice = null;
    this.hasNativeJapaneseVoice = false;
    this.audioElement = new Audio();
    this.audioCtx = null;
    this.initVoice();
  }

  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  initVoice() {
    if ('speechSynthesis' in window) {
      const checkVoices = () => {
        try {
          const voices = window.speechSynthesis.getVoices();
          this.japaneseVoice = voices.find(v => 
            v.lang === 'ja-JP' || 
            v.lang === 'ja_JP' || 
            v.lang.toLowerCase().startsWith('ja') || 
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

  unlockAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!this.audioCtx) {
          this.audioCtx = new AudioCtx();
        }
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
      }
    } catch (e) {
      // ignore
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

    // 1. Wajib Unlock AudioContext untuk WebKit di Chrome & Safari iOS
    this.unlockAudioContext();

    // 2. Di perangkat iOS (iPhone) baik di Google Chrome maupun Safari:
    // WebKit MEWAJIBKAN pemanggilan SpeechSynthesis dilakukan secara SINKRON langsung
    // di dalam event tap pengguna.
    if (this.isIOS() || this.hasNativeJapaneseVoice) {
      this.playSpeechSynthesis(cleanText, customRate);
      return;
    }

    // 3. Prioritas untuk PC/Windows tanpa paket suara ja-JP:
    this.playOnlineAudio(cleanText, () => {
      this.playSpeechSynthesis(cleanText, customRate);
    });
  }

  playSpeechSynthesis(text, customRate) {
    if (!('speechSynthesis' in window)) {
      this.playOnlineAudio(text);
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel(); // Bersihkan antrean macet

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = customRate || this.speechRate;
      utterance.pitch = 1.0;

      if (this.japaneseVoice) {
        utterance.voice = this.japaneseVoice;
      }

      // KUNCI PENTING UNTUK iOS:
      // Simpan referensi ke window global agar tidak dihapus oleh WebKit Garbage Collector
      window._activeSpeechUtterance = utterance;

      utterance.onend = () => {
        window._activeSpeechUtterance = null;
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        window._activeSpeechUtterance = null;
        if (!this.isIOS()) {
          this.playOnlineAudio(text);
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Web Speech API gagal:', err);
      if (!this.isIOS()) {
        this.playOnlineAudio(text);
      }
    }
  }

  playOnlineAudio(text, onErrorFallback = null) {
    try {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      }

      const encoded = encodeURIComponent(text);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ja&q=${encoded}`;

      this.audioElement = new Audio();
      this.audioElement.referrerPolicy = 'no-referrer';
      this.audioElement.src = url;
      this.audioElement.playbackRate = this.speechRate;

      this.audioElement.onerror = () => {
        console.warn('Online audio gagal dimuat, beralih ke fallback.');
        if (onErrorFallback) onErrorFallback();
      };

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Online audio gagal diputar:', err);
          if (onErrorFallback) onErrorFallback();
        });
      }
    } catch (e) {
      console.warn('Error saat memuat online audio:', e);
      if (onErrorFallback) onErrorFallback();
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
