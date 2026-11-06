# KonnichiLearn (こんにちはラーン) 🗾
**Aplikasi Pembelajaran Bahasa Jepang Interaktif: Hiragana, Katakana, Kanji & Kalimat Sehari-hari**

---

## 🌟 Fitur Utama

1. **Navigasi Hierarkis Modern:**
   - **Halaman Utama:** Pilihan 3 kategori utama (**Hiragana**, **Katakana**, dan **Kanji Dasar N5**).
   - **Halaman Kategori Terpilih:** Setiap kategori memiliki sub-modul yang dinamis:
     - 🔤 **Tabel Karakter & Kanvas Tulis:** Tabel huruf lengkap, filter baris (vokal, K, S, T, dsb.), dan audio pelafalan asli.
     - 🛑 **3 Teknik Akhiran Goresan Jepang (*Ryu Sensei Method*):** Pelabelan teknik goresan standar kaligrafi Jepang pada setiap urutan penulisan:
       - 🛑 **Tome (とめる):** Goresan berhenti tegas dengan tekanan penuh tanpa diangkat mendadak.
       - 🪝 **Hane (はねる):** Goresan disendalkan/dikaitkan ke atas dengan lentur.
       - 🍃 **Harai (はらう):** Goresan disapu meluncur lepas hingga ujung garis meruncing alami.
     - 🇮🇩 **Tips Pelafalan Khusus Lidah Indonesia:** Panduan fonetik khusus untuk karakter yang rawan salah diucapkan oleh penutur bahasa Indonesia (contoh: `つ / tsu` bukan "cu/su", `ふ / fu` hembusan bibir rileks, `う / u` bibir datar tanpa monyong, `し / shi`, dan huruf `R/L` Jepang).
     - 💡 **Asosiasi Gambar Mnemonik Visual:** Trik asosiasi visual bentuk karakter dengan gambar lucu dan cerita yang mudah diingat (contoh: `あ` = orang berperut buncit berantena, `い` = dua orang individu, `う` = mengaduh "Ugh" sambil bungkuk, dsb.).
     - 🎉 **Milestone Membaca Kosakata Nyata per Baris:** Kumpulan kata bahasa Jepang asli yang bisa langsung dibaca dan diucapkan setelah mempelajari baris tertentu (contoh: baris Vokal langsung membuka kata `あい`, `いえ`, `うえ`, `あお`; baris K membuka `あか`, `あき`, `かお`, `えき`, `いく`, `こえ`), memberikan rasa pencapaian instan (*instant gratification*).
     - ✍️ **Kanvas Kaligrafi Karakter:** Latihan mencoret-coret langsung di atas kanvas dengan garis bantu buku kotak Jepang (*田 pattern*), bayangan panduan goresan (*tracing*), panduan langkah demi langkah (*kakijun*), tombol *Undo*, tombol simpan gambar (.png), dan evaluasi goresan.
     - 📝 **Lembar Latihan Berulang (*Renchou / Drill Sheet*):** Latihan menulis karakter yang sama sebanyak 3x, 5x, atau 10x kotak secara bertahap (*Kotak 1 Jiplak Penuh ➔ Kotak 2-3 Samar ➔ Kotak 4+ Mandiri*), lengkap dengan tombol hapus per-kotak dan cek evaluasi lembar (+25 poin).
     - ⚠️ **Modul "Awas Tertukar!" (*Lookalike Guide*):** Panduan visual perbandingan karakter-karakter yang sering tertukar (misal: `れ` vs `ね` vs `わ`, `シ` vs `ツ`, `ソ` vs `ン`, `日` vs `目`), trik ingatan mnemonic, audio pembanding, dan mini kuis uji ketelitian (+10 poin).
     - 💬 **Kalimat Sehari-hari:** Contoh percakapan nyata (salam, belanja di minimarket, kafe, transportasi) dengan pembedahan kata & partikel tata bahasa beserta penjelasan konteks budaya.
     - 🎯 **Latihan Soal (5 Mode Kuis Dinamis):**
       - 🎯 **Pilihan Ganda:** Tebak cara baca karakter.
       - 🔊 **Kuis Audio:** Dengar pelafalan asli dan tebak karakternya.
       - 🧩 **Susun Kata:** Bentuk kosakata dari balok huruf acak.
       - ✍️ **Kuis Menulis:** Tantangan menulis karakter dari ingatan, dilengkapi fitur intip bayangan, buka kunci bentuk karakter yang benar, dan panduan urutan goresan langkah demi langkah berlabel Tome/Hane/Harai (*kakijun*).
       - 🎙️ **Kuis Bicara (*Speaking Practice*):** Tantangan pelafalan suara menggunakan mikrofon (*Web Speech Recognition* bahasa Jepang `ja-JP`), mendeteksi suara pengguna secara *real-time*, dan memberikan koreksi intonasi/pelafalan (+20 poin).

2. **Audio Penutur Asli (Dual-Engine Audio):**
   - Menggunakan teknologi online native Japanese audio stream & fallback **Web Speech API** bahasa Jepang (`ja-JP`).
   - Dilengkapi pengatur kecepatan suara (Lambat 0.75x untuk pemula, Normal 0.85x, dan Cepat 1.0x).

3. **Gamifikasi & Progres Tersimpan:**
   - Skor poin dan catatan streak harian otomatis tersimpan di peramban pengguna (*LocalStorage*).

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini dirancang **100% mandiri (*zero dependencies*)** tanpa memerlukan instalasi node.js ataupun build tools yang rumit:

1. Buka folder: `C:\Users\Prakas\.gemini\antigravity\scratch\konnichilearn`
2. Klik dua kali file **`index.html`** untuk langsung membukanya di browser apa saja (Google Chrome atau Microsoft Edge direkomendasikan untuk fitur mikrofon).
3. Aplikasi siap digunakan!

---

## 📁 Struktur File Proyek

```
konnichilearn/
├── index.html          # Halaman antarmuka utama (Single Page Application)
├── README.md           # Panduan & dokumentasi aplikasi
├── css/
│   └── style.css       # Pengaturan tema visual, garis bantu kanvas, animasi denyut mic
└── js/
    ├── data.js         # Master database (Hiragana, Katakana, Kanji, Kalimat, Pasangan Mirip, Kosakata, Mnemonic, Milestone)
    ├── audio.js        # Dual-Engine audio untuk pelafalan suara Jepang
    ├── canvas.js       # Engine kanvas kaligrafi (Touch & Mouse, Undo, Tracing, Export PNG)
    ├── drill.js        # Engine lembar latihan berulang (Metode Renchou / Drill Sheet)
    ├── confusing.js    # Engine perbandingan karakter mirip & uji ketelitian
    ├── quiz.js         # Generator 5 mode soal kuis dinamis termasuk Speech Recognition & Writing reveal
    └── app.js          # Pengatur alur halaman, filter pills, milestone words, dan state
```
