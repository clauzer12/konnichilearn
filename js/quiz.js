/**
 * KonnichiLearn Quiz Engine
 * Menghasilkan soal secara algoritmik (real-time dynamic generation)
 * Mendukung 5 Mode Kuis:
 * 1. Pilihan Ganda Huruf & Kanji
 * 2. Kuis Audio (Dengar & Tebak)
 * 3. Susun Kata (Word Scramble)
 * 4. Kuis Latihan Menulis (Recall Stroke & Writing Challenge)
 * 5. Kuis Pelafalan Suara (Speech Recognition Voice Practice via Web Speech API)
 */

// Helper Badge Teknik Akhiran Goresan (Fallback jika dipanggil sebelum app.js)
if (typeof getStrokeBadge === 'undefined') {
  window.getStrokeBadge = function(type) {
    if (type === 'tome') return '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 whitespace-nowrap">🛑 Tome</span>';
    if (type === 'hane') return '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap">🪝 Hane</span>';
    if (type === 'harai') return '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">🍃 Harai</span>';
    return '';
  };
}

class QuizEngine {
  constructor() {
    this.currentMode = 'choice'; // 'choice' | 'audio' | 'scramble' | 'write' | 'speech'
    this.currentQuestion = null;
    this.currentScramble = null;
    this.currentWriteTarget = null;
    this.currentSpeechTarget = null;
    this.userScramblePicks = [];
    this.score = 0;
    this.streak = 0;
    this.questionCount = 1;

    this.quizCanvas = null;
    this.isPeeking = false;

    // Speech Recognition
    this.speechRecognition = null;
    this.isListening = false;
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn('SpeechRecognition API tidak didukung browser ini.');
      return;
    }

    try {
      this.speechRecognition = new SpeechRec();
      this.speechRecognition.lang = 'ja-JP';
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimResults = false;
      this.speechRecognition.maxAlternatives = 5;

      this.speechRecognition.onstart = () => {
        this.isListening = true;
        const micBtn = document.getElementById('btn-speech-mic');
        const statusText = document.getElementById('speech-status-text');
        if (micBtn) {
          micBtn.classList.add('mic-recording', 'bg-rose-600');
          micBtn.classList.remove('bg-red-500');
        }
        if (statusText) {
          statusText.innerHTML = '<span class="text-rose-500 animate-pulse font-black">🔴 Mendengarkan suaramu... Silakan ucapkan sekarang!</span>';
        }
      };

      this.speechRecognition.onresult = (event) => {
        const transcriptBox = document.getElementById('speech-transcript-box');
        const transcriptResult = document.getElementById('speech-transcript-result');
        if (transcriptBox && transcriptResult) {
          transcriptBox.classList.remove('hidden');
          const recognizedList = Array.from(event.results[0]).map(r => r.transcript.trim());
          transcriptResult.textContent = `"${recognizedList[0]}"`;
          this.evaluateSpeech(recognizedList);
        }
      };

      this.speechRecognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        const statusText = document.getElementById('speech-status-text');
        if (statusText) {
          if (event.error === 'not-allowed') {
            statusText.innerHTML = '<span class="text-rose-500 font-bold">⚠️ Akses mikrofon diblokir. Silakan klik ikon gembok di bilah URL dan aktifkan izin Mikrofon (Allow).</span>';
          } else if (event.error === 'no-speech') {
            statusText.innerHTML = '<span class="text-amber-500 font-bold">Tidak ada suara terdeteksi. Coba ketuk mic lagi dan bicara lebih dekat.</span>';
          } else {
            statusText.innerHTML = `<span class="text-rose-500">Error mikrofon (${event.error}). Silakan coba lagi.</span>`;
          }
        }
        this.resetMicUI();
      };

      this.speechRecognition.onend = () => {
        this.resetMicUI();
      };
    } catch (err) {
      console.warn('Gagal menginisialisasi Speech Recognition:', err);
    }
  }

  resetMicUI() {
    this.isListening = false;
    const micBtn = document.getElementById('btn-speech-mic');
    if (micBtn) {
      micBtn.classList.remove('mic-recording', 'bg-rose-600');
      micBtn.classList.add('bg-red-500');
    }
  }

  toggleSpeechRecognition() {
    if (!this.speechRecognition) {
      this.initSpeechRecognition();
    }

    if (!this.speechRecognition) {
      alert('Maaf, fitur pengenalan suara mikrofon membutuhkan peramban modern berbasis Chromium seperti Google Chrome atau Microsoft Edge.');
      return;
    }

    if (this.isListening) {
      this.speechRecognition.stop();
      this.resetMicUI();
    } else {
      try {
        const transcriptBox = document.getElementById('speech-transcript-box');
        if (transcriptBox) transcriptBox.classList.add('hidden');
        this.speechRecognition.start();
      } catch (e) {
        console.warn('Gagal memulai mic:', e);
      }
    }
  }

  playSpeechTargetAudio() {
    if (this.currentSpeechTarget) {
      audioPlayer.play(this.currentSpeechTarget.text);
    }
  }

  setMode(mode) {
    this.currentMode = mode;

    document.querySelectorAll('.quiz-mode-pill').forEach(btn => {
      btn.classList.remove('bg-red-500', 'text-white');
      btn.classList.add('bg-[var(--card)]', 'text-[var(--muted-foreground)]');
    });

    const activePill = document.getElementById(`btn-quiz-${mode}`);
    if (activePill) {
      activePill.classList.add('bg-red-500', 'text-white');
      activePill.classList.remove('bg-[var(--card)]', 'text-[var(--muted-foreground)]');
    }

    this.generateQuestion();
  }

  generateQuestion() {
    const activeCategory = appState.currentCategory;
    const items = MASTER_DATA[activeCategory].characters;

    // Sembunyikan semua view kuis
    const choiceView = document.getElementById('quiz-choice-view');
    const scrambleView = document.getElementById('quiz-scramble-view');
    const writeView = document.getElementById('quiz-write-view');
    const speechView = document.getElementById('quiz-speech-view');

    if (choiceView) choiceView.classList.add('hidden');
    if (scrambleView) scrambleView.classList.add('hidden');
    if (writeView) writeView.classList.add('hidden');
    if (speechView) speechView.classList.add('hidden');

    if (this.currentMode === 'choice' || this.currentMode === 'audio') {
      const target = items[Math.floor(Math.random() * items.length)];
      const distractors = items
        .filter(item => item.romaji !== target.romaji)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const options = [target, ...distractors].sort(() => 0.5 - Math.random());

      this.currentQuestion = {
        type: this.currentMode,
        target: target,
        char: target.char,
        correct: target.romaji,
        options: options
      };

      this.renderChoiceQuestion();

    } else if (this.currentMode === 'scramble') {
      const words = MASTER_DATA.scrambleWords[activeCategory] || MASTER_DATA.scrambleWords.hiragana;
      const targetWord = words[Math.floor(Math.random() * words.length)];
      this.currentScramble = targetWord;
      this.userScramblePicks = [];

      this.renderScrambleQuestion();

    } else if (this.currentMode === 'write') {
      const target = items[Math.floor(Math.random() * items.length)];
      this.currentWriteTarget = target;

      this.renderWriteQuestion();

    } else if (this.currentMode === 'speech') {
      this.renderSpeechQuestion();
    }

    // Reset feedback view
    const fbBox = document.getElementById('quiz-feedback-box');
    if (fbBox) fbBox.classList.add('hidden');

    const qNumEl = document.getElementById('quiz-question-num');
    if (qNumEl) qNumEl.textContent = this.questionCount;
  }

  // ==========================================
  // LOGIKA KUIS 1 & 2: PILIHAN GANDA & AUDIO
  // ==========================================
  renderChoiceQuestion() {
    const choiceView = document.getElementById('quiz-choice-view');
    if (choiceView) choiceView.classList.remove('hidden');

    const charDisplay = document.getElementById('quiz-target-char');
    const audioHint = document.getElementById('quiz-audio-hint');

    if (this.currentMode === 'audio') {
      if (charDisplay) charDisplay.textContent = '🔊 ?';
      if (audioHint) audioHint.textContent = 'Dengarkan suara dan pilih karakter yang sesuai!';
      setTimeout(() => audioPlayer.play(this.currentQuestion.char), 300);
    } else {
      if (charDisplay) charDisplay.textContent = this.currentQuestion.char;
      if (audioHint) audioHint.textContent = 'Pilih cara membaca karakter di atas:';
    }

    const optionsContainer = document.getElementById('quiz-options-container');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    this.currentQuestion.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = "quiz-opt-btn p-4 rounded-2xl border border-[var(--border)] bg-[var(--content)] hover:border-red-500 text-sm font-bold transition text-center shadow-sm flex flex-col items-center justify-center gap-1";
      
      if (this.currentMode === 'audio') {
        btn.innerHTML = `<span class="text-2xl font-black">${opt.char}</span><span class="text-xs text-[var(--muted-foreground)] font-normal">${opt.romaji}</span>`;
        btn.onclick = () => this.checkAnswer(btn, opt.char, this.currentQuestion.char);
      } else {
        btn.innerHTML = `<span class="text-base font-bold">${opt.romaji}</span>`;
        btn.onclick = () => this.checkAnswer(btn, opt.romaji, this.currentQuestion.correct);
      }

      optionsContainer.appendChild(btn);
    });
  }

  checkAnswer(buttonEl, chosen, correct) {
    const allBtns = document.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(b => b.disabled = true);

    const fbBox = document.getElementById('quiz-feedback-box');
    const fbText = document.getElementById('quiz-feedback-text');
    if (!fbBox || !fbText) return;

    fbBox.classList.remove('hidden');

    if (chosen === correct) {
      buttonEl.classList.add('bg-emerald-500', 'text-white', 'border-emerald-500');
      fbBox.className = "p-4 rounded-2xl text-xs font-medium text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
      fbText.innerHTML = `🎉 <strong>Benar!</strong> Karakter <strong>${this.currentQuestion.char}</strong> dibaca <strong>"${this.currentQuestion.correct}"</strong>.`;
      
      this.score += 10;
      this.streak++;
      appState.addScore(10);
    } else {
      buttonEl.classList.add('bg-rose-500', 'text-white', 'border-rose-500');
      allBtns.forEach(b => {
        if (b.textContent.includes(correct)) b.classList.add('bg-emerald-500', 'text-white');
      });
      fbBox.className = "p-4 rounded-2xl text-xs font-medium text-center space-y-3 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400";
      fbText.innerHTML = `<strong>Kurang tepat.</strong> Jawaban yang benar adalah <strong>"${this.currentQuestion.correct}"</strong> (${this.currentQuestion.char}).`;
      this.streak = 0;
    }

    this.updateScoreIndicators();
    this.questionCount++;
  }

  // ==========================================
  // LOGIKA KUIS 3: SUSUN KATA (SCRAMBLE)
  // ==========================================
  renderScrambleQuestion() {
    const scrambleView = document.getElementById('quiz-scramble-view');
    if (scrambleView) scrambleView.classList.remove('hidden');

    document.getElementById('scramble-meaning').textContent = `"${this.currentScramble.meaning}"`;
    document.getElementById('scramble-romaji').textContent = `(${this.currentScramble.romaji})`;

    const letters = this.currentScramble.word.split('');
    const scrambled = [...letters].sort(() => 0.5 - Math.random());

    this.renderScrambleSlots();
    this.renderScramblePool(scrambled);
  }

  renderScrambleSlots() {
    const container = document.getElementById('scramble-slots');
    if (!container) return;
    container.innerHTML = '';

    if (this.userScramblePicks.length === 0) {
      container.innerHTML = '<span class="text-xs text-[var(--muted-foreground)]">Ketuk huruf di bawah untuk menyusun kata di sini</span>';
      return;
    }

    this.userScramblePicks.forEach((char, idx) => {
      const slot = document.createElement('span');
      slot.className = "w-11 h-11 rounded-xl bg-red-500 text-white font-bold text-lg flex items-center justify-center shadow-md cursor-pointer hover:bg-red-600 transition";
      slot.textContent = char;
      slot.onclick = () => {
        this.userScramblePicks.splice(idx, 1);
        this.renderScrambleSlots();
        this.syncScramblePoolButtons();
      };
      container.appendChild(slot);
    });
  }

  renderScramblePool(letters) {
    const container = document.getElementById('scramble-pool');
    if (!container) return;
    container.innerHTML = '';

    letters.forEach((char, i) => {
      const btn = document.createElement('button');
      btn.id = `scramble-letter-btn-${i}`;
      btn.dataset.char = char;
      btn.className = "w-12 h-12 rounded-xl bg-[var(--card)] border border-[var(--border)] font-black text-xl shadow-sm hover:border-red-500 hover:text-red-500 transition";
      btn.textContent = char;
      btn.onclick = () => {
        this.userScramblePicks.push(char);
        btn.disabled = true;
        btn.classList.add('opacity-30', 'cursor-not-allowed');
        this.renderScrambleSlots();
      };
      container.appendChild(btn);
    });
  }

  syncScramblePoolButtons() {
    const allPoolBtns = document.querySelectorAll('#scramble-pool button');
    allPoolBtns.forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('opacity-30', 'cursor-not-allowed');
    });

    const counts = {};
    this.userScramblePicks.forEach(c => counts[c] = (counts[c] || 0) + 1);

    allPoolBtns.forEach(btn => {
      const c = btn.dataset.char;
      if (counts[c] && counts[c] > 0) {
        btn.disabled = true;
        btn.classList.add('opacity-30', 'cursor-not-allowed');
        counts[c]--;
      }
    });
  }

  resetScramble() {
    this.userScramblePicks = [];
    this.renderScrambleSlots();
    this.syncScramblePoolButtons();
  }

  checkScramble() {
    const combined = this.userScramblePicks.join('');
    const fbBox = document.getElementById('quiz-feedback-box');
    const fbText = document.getElementById('quiz-feedback-text');
    if (!fbBox || !fbText) return;

    fbBox.classList.remove('hidden');

    if (combined === this.currentScramble.word) {
      fbBox.className = "p-4 rounded-2xl text-xs font-medium text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
      fbText.innerHTML = `🎉 <strong>Hebat!</strong> Kata <strong>${combined}</strong> (${this.currentScramble.meaning}) tersusun dengan sempurna!`;
      this.score += 15;
      this.streak++;
      appState.addScore(15);
    } else {
      fbBox.className = "p-4 rounded-2xl text-xs font-medium text-center space-y-3 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400";
      fbText.innerHTML = `<strong>Belum tepat.</strong> Susunan yang benar adalah <strong>${this.currentScramble.word}</strong>.`;
      this.streak = 0;
    }

    this.updateScoreIndicators();
    this.questionCount++;
  }

  // ==========================================
  // LOGIKA KUIS 4: LATIHAN MENULIS (WRITING QUIZ)
  // ==========================================
  renderWriteQuestion() {
    const writeView = document.getElementById('quiz-write-view');
    if (writeView) writeView.classList.remove('hidden');

    const target = this.currentWriteTarget;
    if (!target) return;

    if (!this.quizCanvas) {
      this.quizCanvas = new WritingCanvas('quiz-drawing-canvas', 'quiz-canvas-guide-char', null);
    }

    document.getElementById('quiz-write-target-romaji').textContent = `"${target.romaji.toUpperCase()}"`;
    document.getElementById('quiz-write-hint').textContent = `Petunjuk: ${target.strokes} Goresan | Contoh: ${target.example} (${target.meaning})`;

    this.isPeeking = false;
    this.quizCanvas.setGuideChar(target.char);
    this.quizCanvas.toggleGuide(false);

    const peekBtn = document.getElementById('btn-quiz-peek');
    if (peekBtn) peekBtn.textContent = '👁️ Intip Bayangan';

    const revealPanel = document.getElementById('quiz-write-reveal-panel');
    if (revealPanel) revealPanel.classList.add('hidden');

    this.quizCanvas.clear();
  }

  toggleWritePeek() {
    this.isPeeking = !this.isPeeking;
    if (this.quizCanvas) {
      this.quizCanvas.toggleGuide(this.isPeeking);
    }
    const peekBtn = document.getElementById('btn-quiz-peek');
    if (peekBtn) {
      peekBtn.textContent = this.isPeeking ? '🙈 Sembunyikan Bayangan' : '👁️ Intip Bayangan';
    }
  }

  revealWritingAnswer() {
    const target = this.currentWriteTarget;
    if (!target) return;

    const revealPanel = document.getElementById('quiz-write-reveal-panel');
    if (revealPanel) revealPanel.classList.remove('hidden');

    document.getElementById('quiz-reveal-correct-char').textContent = target.char;
    let infoText = `Huruf: ${target.char} (${target.romaji}) | ${target.strokes} Goresan`;
    if (target.mnemonicVisual) {
      infoText += ` • 💡 ${target.mnemonicVisual}`;
    }
    document.getElementById('quiz-reveal-info').textContent = infoText;

    const stepsList = document.getElementById('quiz-reveal-steps-list');
    if (stepsList) {
      stepsList.innerHTML = '';
      target.steps.forEach((step, idx) => {
        const li = document.createElement('li');
        li.className = "py-1 border-b border-[var(--border)] last:border-0 flex items-start justify-between gap-2";
        const strokeType = (target.strokeTypes && target.strokeTypes[idx]) ? target.strokeTypes[idx] : null;
        const badge = typeof getStrokeBadge === 'function' ? getStrokeBadge(strokeType) : '';
        li.innerHTML = `
          <span class="flex-1">${step}</span>
          ${badge}
        `;
        stepsList.appendChild(li);
      });
    }

    if (this.quizCanvas) {
      this.quizCanvas.toggleGuide(true);
    }
    const peekBtn = document.getElementById('btn-quiz-peek');
    if (peekBtn) peekBtn.textContent = '🙈 Sembunyikan Bayangan';
    this.isPeeking = true;

    revealPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  selfAssessWriting(isCorrect) {
    const target = this.currentWriteTarget;
    const fbBox = document.getElementById('quiz-feedback-box');
    const fbText = document.getElementById('quiz-feedback-text');
    if (!fbBox || !fbText) return;

    fbBox.classList.remove('hidden');

    if (isCorrect) {
      fbBox.className = "p-4 rounded-2xl text-xs font-medium text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
      fbText.innerHTML = `🎉 <strong>Luar biasa!</strong> Bentuk tulisan tanganmu untuk karakter <strong>${target.char}</strong> (${target.romaji}) sudah tepat! Memori ototmu makin terasah.`;
      this.score += 15;
      this.streak++;
      appState.addScore(15);
    } else {
      fbBox.className = "p-4 rounded-2xl text-xs font-medium text-center space-y-3 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400";
      fbText.innerHTML = `<strong>Tetap semangat!</strong> Perhatikan urutan goresan di atas, bersihkan kanvas, dan coba tulis ulang pada soal latihan berikutnya ya!`;
      this.streak = 0;
    }

    this.updateScoreIndicators();
    this.questionCount++;
    fbBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ==========================================
  // LOGIKA KUIS 5: LATIHAN BICARA (SPEECH RECOGNITION)
  // ==========================================
  renderSpeechQuestion() {
    const speechView = document.getElementById('quiz-speech-view');
    if (speechView) speechView.classList.remove('hidden');

    const activeCat = appState.currentCategory;
    const wordPool = MASTER_DATA.scrambleWords[activeCat] || [];
    const charPool = MASTER_DATA[activeCat].characters || [];

    let target;
    // 60% peluang pilih kata (lebih seru diucapkan), 40% pilih huruf
    if (wordPool.length > 0 && Math.random() > 0.4) {
      const item = wordPool[Math.floor(Math.random() * wordPool.length)];
      target = {
        text: item.word,
        romaji: item.romaji,
        meaning: item.meaning
      };
    } else {
      const item = charPool[Math.floor(Math.random() * charPool.length)];
      target = {
        text: item.char,
        romaji: item.romaji,
        meaning: `Huruf "${item.romaji}" (Contoh: ${item.example})`
      };
    }

    this.currentSpeechTarget = target;

    document.getElementById('quiz-speech-target-text').textContent = target.text;
    document.getElementById('quiz-speech-target-romaji').textContent = target.romaji;
    document.getElementById('quiz-speech-target-meaning').textContent = `"${target.meaning}"`;

    const transcriptBox = document.getElementById('speech-transcript-box');
    if (transcriptBox) transcriptBox.classList.add('hidden');

    const statusText = document.getElementById('speech-status-text');
    if (statusText) statusText.textContent = 'Ketuk tombol mic di atas lalu ucapkan kata tersebut!';

    this.resetMicUI();
  }

  evaluateSpeech(recognizedList) {
    if (!this.currentSpeechTarget) return;

    const targetText = this.currentSpeechTarget.text.trim();
    const targetRomaji = (this.currentSpeechTarget.romaji || '').toLowerCase().replace(/[^a-z]/g, '');

    // Periksa apakah ada hasil transcript yang cocok dengan target
    const isMatch = recognizedList.some(spoken => {
      const cleanSpoken = spoken.toLowerCase().replace(/[\s\.\,\!\?]/g, '');
      const cleanTarget = targetText.toLowerCase().replace(/[\s\.\,\!\?]/g, '');

      return cleanSpoken === cleanTarget ||
             cleanSpoken.includes(cleanTarget) ||
             cleanTarget.includes(cleanSpoken) ||
             (cleanSpoken === targetRomaji);
    });

    const fbBox = document.getElementById('quiz-feedback-box');
    const fbText = document.getElementById('quiz-feedback-text');
    if (!fbBox || !fbText) return;

    fbBox.classList.remove('hidden');

    if (isMatch) {
      fbBox.className = "p-4 rounded-2xl text-xs font-medium text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
      fbText.innerHTML = `🎉 <strong>Luar Biasa! Pelafalanmu Sangat Tepat!</strong><br>Kamu mengucapkan <strong>"${this.currentSpeechTarget.text}"</strong> (${this.currentSpeechTarget.romaji}) dengan intonasi yang bagus! (+20 Poin)`;
      this.score += 20;
      this.streak++;
      appState.addScore(20);
      audioPlayer.play(targetText);
    } else {
      fbBox.className = "p-4 rounded-2xl text-xs font-medium text-center space-y-3 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400";
      fbText.innerHTML = `<strong>Pelafalan belum pas.</strong> Terdengar: <em>"${recognizedList[0]}"</em> vs Target: <strong>"${this.currentSpeechTarget.text}"</strong>. Coba dengarkan lagi contoh pelafalannya ya!`;
      this.streak = 0;
    }

    this.updateScoreIndicators();
    this.questionCount++;
    fbBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  updateScoreIndicators() {
    const scoreEl = document.getElementById('quiz-score-display');
    if (scoreEl) scoreEl.textContent = `Skor: ${this.score}`;
  }
}

const quizEngine = new QuizEngine();
