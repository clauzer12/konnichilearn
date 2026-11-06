/**
 * KonnichiLearn Writing Canvas Engine
 * Menangani gambar interaktif dengan mouse & sentuhan layar (touch)
 * Dilengkapi garis bantu kaligrafi Jepang, bayangan panduan, undo, dan export gambar.
 */

class WritingCanvas {
  constructor(canvasId, guideElementId, feedbackElementId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.guideEl = document.getElementById(guideElementId);
    this.feedbackEl = document.getElementById(feedbackElementId);

    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.brushColor = '#ef4444'; // Red vermillion khas kaligrafi
    this.brushSize = 14;

    this.history = []; // Untuk fitur Undo
    this.currentChar = null;

    if (this.canvas) {
      this.bindEvents();
      this.resizeCanvas();
    }
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = 320;
    this.canvas.height = 320;
  }

  bindEvents() {
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this.start(e.offsetX, e.offsetY));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e.offsetX, e.offsetY));
    this.canvas.addEventListener('mouseup', () => this.stop());
    this.canvas.addEventListener('mouseleave', () => this.stop());

    // Touch events untuk smartphone/tablet
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.start(touch.clientX - rect.left, touch.clientY - rect.top);
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.draw(touch.clientX - rect.left, touch.clientY - rect.top);
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => this.stop());
  }

  saveState() {
    if (!this.ctx) return;
    this.history.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
    if (this.history.length > 20) this.history.shift();
  }

  start(x, y) {
    this.saveState();
    this.isDrawing = true;
    this.lastX = x;
    this.lastY = y;
  }

  draw(x, y) {
    if (!this.isDrawing || !this.ctx) return;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = this.brushColor;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();

    this.lastX = x;
    this.lastY = y;
  }

  stop() {
    this.isDrawing = false;
  }

  undo() {
    if (this.history.length > 0 && this.ctx) {
      const prevState = this.history.pop();
      this.ctx.putImageData(prevState, 0, 0);
      if (this.feedbackEl) this.feedbackEl.textContent = '';
    }
  }

  clear() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.history = [];
    }
    if (this.feedbackEl) this.feedbackEl.textContent = '';
  }

  setGuideChar(char) {
    this.currentChar = char;
    if (this.guideEl) {
      this.guideEl.textContent = char;
    }
    this.clear();
  }

  toggleGuide(show) {
    if (this.guideEl) {
      this.guideEl.style.opacity = show ? '1' : '0';
    }
  }

  evaluate() {
    if (!this.feedbackEl || !this.ctx) return;

    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let paintedPixels = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] > 20) paintedPixels++;
    }

    if (paintedPixels < 150) {
      this.feedbackEl.textContent = '⚠️ Kamu belum menulis goresan. Coba ikuti bayangan hurufnya!';
      this.feedbackEl.className = 'text-xs text-center mt-2 font-bold text-amber-500';
      return;
    }

    const praises = [
      '🎉 Luar biasa! Goresanmu rapi dan mantap!',
      '✨ Bagus sekali! Lekukan hurufnya sudah proporsional!',
      '🔥 Keren! Memori otot tanganmu mulai terbiasa!'
    ];
    const msg = praises[Math.floor(Math.random() * praises.length)];
    this.feedbackEl.textContent = msg;
    this.feedbackEl.className = 'text-xs text-center mt-2 font-bold text-emerald-500 animate-pulse';

    if (typeof appState !== 'undefined' && appState.addScore) {
      appState.addScore(10);
    }
  }

  downloadImage() {
    if (!this.canvas) return;
    const link = document.createElement('a');
    link.download = `latihan-${this.currentChar || 'huruf'}.png`;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
  }
}
