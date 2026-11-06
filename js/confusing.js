/**
 * KonnichiLearn Confusing Characters Engine (Modul Awas Tertukar!)
 * 
 * Membantu pengguna membedakan karakter yang bentuknya sangat mirip
 * Dilengkapi:
 * - Komparasi berdampingan (Side-by-side)
 * - Kunci pembeda visual & trik mnemonic
 * - Audio pelafalan instan
 * - Mini Kuis Ketelitian di tiap kartu komparasi
 */

class ConfusingEngine {
  constructor() {
    this.container = null;
  }

  render() {
    this.container = document.getElementById('confusing-cards-container');
    if (!this.container) return;

    const activeCat = appState.currentCategory;
    const pairs = MASTER_DATA.confusingPairs[activeCat] || [];

    this.container.innerHTML = '';

    if (pairs.length === 0) {
      this.container.innerHTML = `
        <div class="col-span-full text-center py-8 text-xs text-[var(--muted-foreground)]">
          Belum ada data huruf mirip untuk kategori ini.
        </div>
      `;
      return;
    }

    pairs.forEach((group, groupIdx) => {
      const card = document.createElement('div');
      card.className = "bg-[var(--card)] p-6 md:p-7 rounded-3xl border border-[var(--border)] shadow-sm space-y-6 hover:border-red-500/30 transition";

      // Header Grup
      let html = `
        <div class="space-y-1 border-b border-[var(--border)] pb-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-500/15 text-red-500">
              Awas Tertukar #${groupIdx + 1}
            </span>
          </div>
          <h3 class="text-lg font-black text-[var(--foreground)] mt-1">${group.title}</h3>
          <p class="text-xs text-[var(--muted-foreground)]">${group.description}</p>
        </div>

        <!-- Kolom Karakter Berdampingan -->
        <div class="grid grid-cols-1 sm:grid-cols-${group.items.length > 2 ? '3' : '2'} gap-4">
      `;

      group.items.forEach(item => {
        html += `
          <div class="flex flex-col justify-between bg-[var(--content)] p-4 rounded-2xl border border-[var(--border)] space-y-3">
            <div class="flex items-start justify-between">
              <div class="text-4xl md:text-5xl font-black text-[var(--foreground)]">${item.char}</div>
              <div class="flex items-center gap-1.5">
                <span class="px-2 py-0.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs font-bold text-[var(--muted-foreground)]">
                  ${item.romaji}
                </span>
                <button onclick="audioPlayer.play('${item.char}')" class="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition text-xs font-bold" title="Putar suara">
                  🔊
                </button>
              </div>
            </div>

            <div class="space-y-1.5 text-xs">
              <div>
                <span class="text-[10px] uppercase font-bold text-red-500 block">Kunci Pembeda:</span>
                <p class="font-bold text-[var(--foreground)]">${item.keyFeature}</p>
              </div>
              <div class="pt-1.5 border-t border-[var(--border)]">
                <span class="text-[10px] uppercase font-bold text-[var(--muted-foreground)] block">💡 Trik Mengingat:</span>
                <p class="text-[11px] text-[var(--muted-foreground)] italic leading-relaxed">${item.mnemonic}</p>
              </div>
            </div>
          </div>
        `;
      });

      html += `
        </div>

        <!-- Mini Kuis Cepat: Uji Ketelitian -->
        <div class="bg-[var(--content)] p-4 rounded-2xl border border-[var(--border)] space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold text-[var(--foreground)] flex items-center gap-1.5">
              <span>⚡</span> Uji Ketelitian: <em>"${group.quickQuiz.question}"</em>
            </span>
          </div>

          <div class="flex items-center gap-2 flex-wrap" id="quiz-group-opts-${groupIdx}">
      `;

      group.quickQuiz.options.forEach(optChar => {
        html += `
          <button onclick="confusingEngine.checkQuickQuiz(${groupIdx}, '${optChar}', '${group.quickQuiz.answer}')" class="quick-opt-btn-${groupIdx} px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-red-500 font-black text-base transition shadow-sm">
            ${optChar}
          </button>
        `;
      });

      html += `
          </div>
          <div id="quiz-group-feedback-${groupIdx}" class="hidden text-xs font-bold min-h-[1.25rem]"></div>
        </div>
      `;

      card.innerHTML = html;
      this.container.appendChild(card);
    });
  }

  checkQuickQuiz(groupIdx, chosen, answer) {
    const fb = document.getElementById(`quiz-group-feedback-${groupIdx}`);
    if (!fb) return;

    fb.classList.remove('hidden');

    const allBtns = document.querySelectorAll(`.quick-opt-btn-${groupIdx}`);
    allBtns.forEach(b => b.disabled = true);

    if (chosen === answer) {
      fb.className = "text-xs font-bold text-emerald-500 animate-pulse";
      fb.innerHTML = `🎉 Tepat sekali! Kamu sudah bisa membedakan karakter <strong>${chosen}</strong>! (+10 Poin)`;
      appState.addScore(10);
      audioPlayer.play(chosen);
    } else {
      fb.className = "text-xs font-bold text-rose-500";
      fb.innerHTML = `Kurang tepat. Karakter yang benar adalah <strong>${answer}</strong>. Cermati lagi kunci pembedanya di atas ya!`;
    }
  }
}

const confusingEngine = new ConfusingEngine();
