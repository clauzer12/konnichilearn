/**
 * KonnichiLearn Drill Sheet Engine (Lembar Latihan Menulis Berulang)
 * 
 * Mengimplementasikan metode "Renchou" ala sekolah dasar Jepang:
 * - Scaffolding bertahap: Kotak 1 Jiplak Penuh (50%) -> Kotak 2-3 Samar (20%) -> Kotak 4+ Mandiri (0%)
 * - Mendukung 3x, 5x, dan 10x pengulangan huruf yang sama.
 * - Tiap kotak kanvas independen, bisa di-clear per-kotak atau bersihkan semua.
 * - Evaluasi kelengkapan 1 lembar + reward poin.
 */

class MiniDrillCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.brushColor = '#ef4444';
    this.brushSize = 9;

    if (this.canvas) {
      this.bindEvents();
    }
  }

  bindEvents() {
    this.canvas.addEventListener('mousedown', (e) => this.start(e.offsetX, e.offsetY));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e.offsetX, e.offsetY));
    this.canvas.addEventListener('mouseup', () => this.stop());
    this.canvas.addEventListener('mouseleave', () => this.stop());

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

  start(x, y) {
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

  clear() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  hasDrawn() {
    if (!this.ctx || !this.canvas) return false;
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let painted = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] > 20) painted++;
    }
    return painted > 80;
  }
}

class DrillSheetEngine {
  constructor() {
    this.currentChar = null;
    this.boxCount = 5; // Default 5 kotak
    this.cells = [];
    this.container = null;
  }

  init() {
    this.container = document.getElementById('drill-sheet-grid');
    if (this.currentChar) {
      this.render();
    }
  }

  setCharacter(charItem) {
    this.currentChar = charItem;

    const badge = document.getElementById('drill-target-badge');
    if (badge) badge.textContent = charItem.char;

    const info = document.getElementById('drill-target-info');
    if (info) {
      let text = `${charItem.romaji.toUpperCase()} (${charItem.romaji}) • ${charItem.strokes} Goresan`;
      if (charItem.mnemonicVisual) {
        text += ` • 💡 ${charItem.mnemonicVisual}`;
      }
      info.textContent = text;
    }

    this.render();
  }

  setCount(count) {
    this.boxCount = count;

    document.querySelectorAll('.drill-count-btn').forEach(btn => {
      const c = parseInt(btn.dataset.count);
      if (c === count) {
        btn.classList.add('bg-red-500', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-[var(--card)]', 'text-[var(--muted-foreground)]');
      } else {
        btn.classList.remove('bg-red-500', 'text-white', 'shadow-sm');
        btn.classList.add('bg-[var(--card)]', 'text-[var(--muted-foreground)]');
      }
    });

    this.render();
  }

  render() {
    if (!this.container) {
      this.container = document.getElementById('drill-sheet-grid');
    }
    if (!this.container || !this.currentChar) return;

    this.container.innerHTML = '';
    this.cells = [];

    for (let i = 0; i < this.boxCount; i++) {
      const cellIndex = i + 1;
      let label = '';
      let opacityClass = '';
      let stageBadge = '';

      if (cellIndex === 1) {
        label = '#1 Jiplak';
        opacityClass = 'opacity-40';
        stageBadge = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
      } else if (cellIndex === 2 || cellIndex === 3) {
        label = `#${cellIndex} Samar`;
        opacityClass = 'opacity-15';
        stageBadge = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      } else {
        label = `#${cellIndex} Mandiri`;
        opacityClass = 'opacity-0';
        stageBadge = 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      }

      const card = document.createElement('div');
      card.className = "flex flex-col items-center bg-[var(--content)] p-3 rounded-2xl border border-[var(--border)] shadow-sm space-y-2.5";

      card.innerHTML = `
        <div class="w-full flex items-center justify-between text-[11px] font-bold">
          <span class="px-2 py-0.5 rounded-md border text-[10px] uppercase font-black ${stageBadge}">${label}</span>
          <button onclick="drillSheet.clearCell(${i})" class="text-gray-400 hover:text-red-500 text-xs transition" title="Hapus coretan kotak ini">
            🗑️
          </button>
        </div>
        <div class="relative w-[140px] h-[140px] rounded-2xl border-2 border-dashed border-[var(--border)] overflow-hidden bg-[var(--card)] flex items-center justify-center kana-canvas-grid shadow-inner">
          <div id="drill-guide-${i}" class="absolute select-none pointer-events-none text-gray-400/50 dark:text-gray-600/50 font-black text-[95px] leading-none ${opacityClass} transition-opacity duration-200">
            ${this.currentChar.char}
          </div>
          <canvas id="drill-canvas-${i}" width="140" height="140" class="absolute top-0 left-0 w-full h-full cursor-crosshair touch-none"></canvas>
        </div>
      `;

      this.container.appendChild(card);

      const canvasEl = document.getElementById(`drill-canvas-${i}`);
      const miniCanvas = new MiniDrillCanvas(canvasEl);
      this.cells.push(miniCanvas);
    }

    const fb = document.getElementById('drill-feedback-box');
    if (fb) fb.classList.add('hidden');
  }

  clearCell(idx) {
    if (this.cells[idx]) {
      this.cells[idx].clear();
    }
  }

  clearAll() {
    this.cells.forEach(c => c.clear());
    const fb = document.getElementById('drill-feedback-box');
    if (fb) fb.classList.add('hidden');
  }

  evaluateSheet() {
    let filledCount = 0;
    this.cells.forEach(c => {
      if (c.hasDrawn()) filledCount++;
    });

    const fb = document.getElementById('drill-feedback-box');
    const fbText = document.getElementById('drill-feedback-text');
    if (!fb || !fbText) return;

    fb.classList.remove('hidden');

    if (filledCount === 0) {
      fb.className = "p-4 rounded-2xl text-xs font-semibold text-center bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400";
      fbText.innerHTML = '⚠️ Kamu belum mengisi kotak latihan di atas. Coba coret hurufnya di kotak ya!';
      return;
    }

    if (filledCount < this.boxCount) {
      fb.className = "p-4 rounded-2xl text-xs font-semibold text-center bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400";
      fbText.innerHTML = `👍 <strong>Progres Bagus!</strong> Kamu sudah menyelesaikan <strong>${filledCount} dari ${this.boxCount} kotak</strong>. Lengkapi kotak lainnya untuk dapat poin penuh!`;
      appState.addScore(10);
    } else {
      fb.className = "p-4 rounded-2xl text-xs font-bold text-center bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 space-y-1";
      fbText.innerHTML = `🎉 <strong>Luar Biasa! 1 Lembar Latihan Selesai!</strong><br>Kamu berhasil melatih penulisan karakter <strong>${this.currentChar.char}</strong> sebanyak <strong>${this.boxCount} kali berturut-turut</strong>! Memori otot tanganmu makin mantap! (+25 Poin)`;
      appState.addScore(25);
    }

    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Inisialisasi instance global
const drillSheet = new DrillSheetEngine();
