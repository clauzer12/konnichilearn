/**
 * KonnichiLearn Main App Controller
 * Mengatur state aplikasi, routing tampilan, interaksi tab, dan local storage.
 */

// Helper Badge Teknik Akhiran Goresan (Ryu Sensei Video 2: Tome, Hane, Harai)
function getStrokeBadge(type) {
  if (type === 'tome') {
    return '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 whitespace-nowrap">🛑 Tome</span>';
  }
  if (type === 'hane') {
    return '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap">🪝 Hane</span>';
  }
  if (type === 'harai') {
    return '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">🍃 Harai</span>';
  }
  return '';
}

class AppState {
  constructor() {
    this.currentView = 'home'; // 'home' | 'category'
    this.currentCategory = 'hiragana'; // 'hiragana' | 'katakana' | 'kanji'
    this.currentSubTab = 'table'; // 'table' | 'sentences' | 'quiz' | 'confusing'
    this.currentFilter = 'all';

    // Persistence via LocalStorage
    this.points = parseInt(localStorage.getItem('konnichi_points')) || 120;
    this.streak = parseInt(localStorage.getItem('konnichi_streak')) || 3;

    this.writingCanvas = null;
  }

  init() {
    this.updateUserStatsUI();
    this.writingCanvas = new WritingCanvas('drawing-canvas', 'canvas-guide-char', 'canvas-feedback');
    if (typeof drillSheet !== 'undefined') {
      drillSheet.init();
    }

    // Default: tampilkan Home
    this.showHomeView();
  }

  addScore(pts) {
    this.points += pts;
    localStorage.setItem('konnichi_points', this.points);
    this.updateUserStatsUI();
  }

  updateUserStatsUI() {
    const ptEl = document.getElementById('user-points-val');
    const streakEl = document.getElementById('user-streak-val');
    if (ptEl) ptEl.textContent = `${this.points} Poin`;
    if (streakEl) streakEl.textContent = `${this.streak} Hari`;
  }

  showHomeView() {
    this.currentView = 'home';
    document.getElementById('view-home').classList.remove('hidden');
    document.getElementById('view-category').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCategory(categoryKey) {
    if (!MASTER_DATA[categoryKey]) return;

    this.currentCategory = categoryKey;
    this.currentView = 'category';
    this.currentFilter = 'all';

    const catData = MASTER_DATA[categoryKey];

    // Update Header Kategori
    const badge = document.getElementById('category-badge');
    badge.textContent = catData.name.toUpperCase();

    if (categoryKey === 'hiragana') {
      badge.className = 'px-3 py-1 rounded-full text-xs font-black bg-red-500/15 text-red-500 border border-red-500/30';
    } else if (categoryKey === 'katakana') {
      badge.className = 'px-3 py-1 rounded-full text-xs font-black bg-blue-500/15 text-blue-500 border border-blue-500/30';
    } else {
      badge.className = 'px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-500 border border-emerald-500/30';
    }

    document.getElementById('category-title-text').textContent = `${catData.name} (${catData.japaneseName})`;
    document.getElementById('category-desc-text').textContent = catData.description;

    // Tampilkan View Kategori
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-category').classList.remove('hidden');

    // Set Sub-Tab default: Tabel
    this.switchSubTab('table');

    // Render Data
    this.renderFilterPills();
    this.renderCharacterGrid();
    this.renderMilestoneWords();
    this.renderSentences();
    if (typeof confusingEngine !== 'undefined') {
      confusingEngine.render();
    }

    // Set huruf pertama ke canvas
    if (catData.characters.length > 0) {
      this.selectCharacterForCanvas(catData.characters[0]);
    }

    // Siapkan kuis
    quizEngine.generateQuestion();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  switchSubTab(tabName) {
    this.currentSubTab = tabName;

    // Sembunyikan semua sub-tab panel
    document.querySelectorAll('.subtab-panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.cat-subtab-btn').forEach(btn => {
      btn.classList.remove('bg-red-500', 'text-white', 'shadow-md');
      btn.classList.add('text-[var(--muted-foreground)]');
    });

    // Aktifkan panel target
    const targetPanel = document.getElementById(`subtab-${tabName}`);
    if (targetPanel) targetPanel.classList.remove('hidden');

    const activeBtn = document.getElementById(`btn-subtab-${tabName}`);
    if (activeBtn) {
      activeBtn.classList.add('bg-red-500', 'text-white', 'shadow-md');
      activeBtn.classList.remove('text-[var(--muted-foreground)]');
    }

    if (tabName === 'table' && this.writingCanvas) {
      setTimeout(() => this.writingCanvas.clear(), 50);
    }

    if (tabName === 'confusing' && typeof confusingEngine !== 'undefined') {
      confusingEngine.render();
    }

    if (tabName === 'quiz') {
      quizEngine.generateQuestion();
    }
  }

  renderFilterPills() {
    const container = document.getElementById('table-filter-pills');
    if (!container) return;
    container.innerHTML = '';

    const catData = MASTER_DATA[this.currentCategory];
    // Ekstrak grup unik
    const groups = ['all', ...new Set(catData.characters.map(c => c.row || c.group))];

    const groupLabels = {
      all: 'Semua',
      vowel: 'Vokal (A-I-U-E-O)',
      k: 'Baris K',
      s: 'Baris S',
      t: 'Baris T',
      n: 'Baris N',
      h: 'Baris H',
      m: 'Baris M',
      y: 'Baris Y',
      r: 'Baris R',
      w: 'Baris W/N',
      dakuon: 'Dakuon (Tenten/Maru)',
      'Alam & Waktu': 'Alam & Waktu',
      'Geografi': 'Geografi',
      'Manusia & Hubungan': 'Manusia',
      'Pendidikan': 'Pendidikan',
      'Objek & Arah': 'Objek & Arah',
      'Ukuran': 'Ukuran'
    };

    groups.forEach(g => {
      const btn = document.createElement('button');
      const isActive = this.currentFilter === g;
      btn.className = `filter-pill px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
        isActive 
          ? 'bg-red-500 text-white shadow-sm' 
          : 'bg-[var(--content)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
      }`;
      btn.textContent = groupLabels[g] || g;
      btn.onclick = () => {
        this.currentFilter = g;
        this.renderFilterPills();
        this.renderCharacterGrid();
        this.renderMilestoneWords();
      };
      container.appendChild(btn);
    });
  }

  renderCharacterGrid() {
    const container = document.getElementById('characters-grid');
    if (!container) return;
    container.innerHTML = '';

    const catData = MASTER_DATA[this.currentCategory];
    const filtered = catData.characters.filter(item => {
      if (this.currentFilter === 'all') return true;
      return (item.row === this.currentFilter || item.group === this.currentFilter);
    });

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = "group relative bg-[var(--card)] hover:border-red-500/60 p-3.5 rounded-2xl border border-[var(--border)] text-center cursor-pointer transition hover:-translate-y-1 shadow-sm flex flex-col justify-between";
      card.onclick = () => {
        this.selectCharacterForCanvas(item);
        // Scroll halus ke seksi kanvas jika di layar HP
        if (window.innerWidth < 768) {
          document.getElementById('canvas-section').scrollIntoView({ behavior: 'smooth' });
        }
      };

      const indoBadge = item.pronunciationTip 
        ? '<span class="absolute top-2 right-2 px-1.5 py-0.5 rounded-md text-[9px] font-black bg-red-500/10 text-red-500 border border-red-500/20" title="Tips Pelafalan Lidah Indonesia">🇮🇩 Tips</span>' 
        : '';

      card.innerHTML = `
        ${indoBadge}
        <div class="text-4xl font-black text-[var(--foreground)] group-hover:text-red-500 transition py-2">${item.char}</div>
        <div class="text-xs font-bold text-[var(--muted-foreground)] border-t border-[var(--border)] pt-2 flex items-center justify-between">
          <span>${item.romaji}</span>
          <button onclick="event.stopPropagation(); audioPlayer.play('${item.char}')" class="text-gray-400 hover:text-red-500 text-sm transition" title="Putar audio">🔊</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  renderMilestoneWords() {
    const box = document.getElementById('row-milestone-box');
    const container = document.getElementById('milestone-words-container');
    const titleEl = document.getElementById('milestone-title');
    if (!box || !container) return;

    const milestones = (MASTER_DATA[this.currentCategory] && MASTER_DATA[this.currentCategory].rowMilestones) || [];
    
    let match = null;
    if (this.currentFilter === 'all') {
      match = milestones[0] || null;
    } else {
      match = milestones.find(m => m.row === this.currentFilter) || null;
    }

    if (!match || !match.words || match.words.length === 0) {
      box.classList.add('hidden');
      return;
    }

    box.classList.remove('hidden');
    if (titleEl) {
      titleEl.textContent = `${match.title}:`;
    }
    container.innerHTML = '';

    match.words.forEach(w => {
      const btn = document.createElement('button');
      btn.className = "px-3.5 py-2 rounded-2xl bg-[var(--card)] border border-red-500/30 hover:border-red-500 transition text-xs font-bold shadow-sm flex items-center gap-2 group cursor-pointer";
      btn.onclick = () => audioPlayer.play(w.word);
      btn.title = "Klik untuk mendengarkan pelafalan asli";
      btn.innerHTML = `
        <span class="text-base font-black text-red-500 group-hover:scale-105 transition transform">${w.word}</span>
        <span class="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition">(${w.romaji} - ${w.meaning})</span>
        <span class="text-xs text-gray-400 group-hover:text-red-500">🔊</span>
      `;
      container.appendChild(btn);
    });
  }

  selectCharacterForCanvas(item) {
    if (!item) return;

    document.getElementById('canvas-char-badge').textContent = item.char;
    document.getElementById('canvas-romaji-title').textContent = `${item.romaji.toUpperCase()} (${item.romaji})`;
    document.getElementById('canvas-strokes-info').textContent = `${item.strokes} Goresan`;
    document.getElementById('canvas-example-info').textContent = `${item.example} (${item.meaning})`;

    // Asosiasi Mnemonik Visual (Ryu Sensei Video 1)
    const mnemBox = document.getElementById('canvas-mnemonic-box');
    const mnemText = document.getElementById('canvas-mnemonic-text');
    if (mnemBox && mnemText) {
      if (item.mnemonicVisual) {
        mnemText.textContent = item.mnemonicVisual;
        mnemBox.classList.remove('hidden');
      } else {
        mnemBox.classList.add('hidden');
      }
    }

    // Tips Pelafalan Khusus Lidah Indonesia (Ryu Sensei Video 1)
    const pronBox = document.getElementById('canvas-pronunciation-box');
    const pronText = document.getElementById('canvas-pronunciation-text');
    if (pronBox && pronText) {
      if (item.pronunciationTip) {
        pronText.textContent = item.pronunciationTip;
        pronBox.classList.remove('hidden');
      } else {
        pronBox.classList.add('hidden');
      }
    }

    // Urutan Goresan dengan Badge Tome / Hane / Harai (Ryu Sensei Video 2)
    const stepsList = document.getElementById('canvas-steps-list');
    if (stepsList) {
      stepsList.innerHTML = '';
      item.steps.forEach((step, idx) => {
        const li = document.createElement('li');
        li.className = "py-1.5 border-b border-[var(--border)] last:border-0 flex items-start justify-between gap-2";
        const strokeType = (item.strokeTypes && item.strokeTypes[idx]) ? item.strokeTypes[idx] : null;
        const badge = getStrokeBadge(strokeType);
        li.innerHTML = `
          <span class="flex-1">${step}</span>
          ${badge}
        `;
        stepsList.appendChild(li);
      });
    }

    if (this.writingCanvas) {
      this.writingCanvas.setGuideChar(item.char);
    }

    // Sinkronkan karakter ke Lembar Latihan Menulis Berulang (Drill Sheet)
    if (typeof drillSheet !== 'undefined') {
      drillSheet.setCharacter(item);
    }
  }

  renderSentences() {
    const container = document.getElementById('sentences-list-container');
    if (!container) return;
    container.innerHTML = '';

    const list = MASTER_DATA[this.currentCategory].sentences || [];

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = "bg-[var(--card)] p-5 rounded-3xl border border-[var(--border)] shadow-sm space-y-4 hover:border-red-500/30 transition";

      const breakdownHtml = item.breakdown.map(b => `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--content)] border border-[var(--border)] text-xs">
          <strong class="text-red-500">${b.word}</strong>
          <span class="text-[var(--muted-foreground)] font-medium">(${b.note})</span>
        </span>
      `).join('');

      card.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div>
            <span class="text-[11px] font-black uppercase tracking-wider text-red-500">${item.category}</span>
            <h4 class="text-xl md:text-2xl font-black tracking-wide text-[var(--foreground)] mt-1">${item.japanese}</h4>
            <p class="text-xs text-[var(--muted-foreground)] font-semibold mt-0.5">${item.romaji}</p>
          </div>
          <button onclick="audioPlayer.play('${item.japanese}')" class="p-3 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm" title="Putar kalimat">
            🔊
          </button>
        </div>

        <div class="p-3 rounded-2xl bg-[var(--content)] border border-[var(--border)] text-xs text-[var(--foreground)] font-bold">
          🇮🇩 "${item.indonesian}"
        </div>

        <div class="space-y-1.5">
          <span class="text-[11px] font-bold text-[var(--muted-foreground)] block">Bedah Kosakata & Tata Bahasa:</span>
          <div class="flex flex-wrap gap-1.5">
            ${breakdownHtml}
          </div>
        </div>

        <p class="text-xs text-[var(--muted-foreground)] italic border-t border-[var(--border)] pt-3 leading-relaxed">
          💡 <strong>Konteks Penggunaan:</strong> ${item.context}
        </p>
      `;
      container.appendChild(card);
    });
  }
}

// Inisialisasi AppState
const appState = new AppState();
window.addEventListener('DOMContentLoaded', () => {
  appState.init();
});
