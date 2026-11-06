/**
 * KonnichiLearn Master Database
 * Berisi data lengkap:
 * 1. Hiragana (Gojuon, Dakuon, Handakuon)
 * 2. Katakana (Gojuon, Dakuon, Handakuon)
 * 3. Kanji Dasar (JLPT N5)
 * 4. Bank Kalimat Percakapan Sehari-hari
 * 5. Kosakata untuk Latihan Susun Kata (Scramble)
 */

const MASTER_DATA = {
  // ==========================================
  // HIRAGANA
  // ==========================================
  hiragana: {
    id: 'hiragana',
    name: 'Hiragana',
    japaneseName: 'ひらがな',
    themeColor: 'red',
    description: 'Sistem tulisan fonetik dasar bahasa Jepang. Digunakan untuk kata asli bahasa Jepang dan partikel tata bahasa.',
    characters: [
      // Vokal
      { 
        char: 'あ', romaji: 'a', row: 'vowel', group: 'Gojuon', strokes: 3, 
        steps: ['Garis datar atas dari kiri ke kanan', 'Garis tegak melengkung menembus tengah', 'Tarik lengkungan membulat searah jarum jam lalu sapu lepas'], 
        strokeTypes: ['tome', 'tome', 'harai'],
        mnemonicVisual: 'Bentuk orang berperut buncit dengan huruf "A" di badannya dan antena di kepala.',
        example: 'ありがとう', romajiEx: 'Arigatou', meaning: 'Terima kasih' 
      },
      { 
        char: 'い', romaji: 'i', row: 'vowel', group: 'Gojuon', strokes: 2, 
        steps: ['Garis kiri melengkung, sentakkan ujungnya ke atas berkait', 'Garis kanan lebih pendek menurun sejajar berhenti tegas'], 
        strokeTypes: ['hane', 'tome'],
        mnemonicVisual: 'Dua orang (Individu) berdiri tegak berdampingan.',
        example: 'いえ', romajiEx: 'Ie', meaning: 'Rumah' 
      },
      { 
        char: 'う', romaji: 'u', row: 'vowel', group: 'Gojuon', strokes: 2, 
        steps: ['Titik garis miring pendek di bagian atas berhenti', 'Lengkungan membulat diayun lepas ke kiri bawah'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Orang membungkuk kesakitan memegangi perutnya sambil mengaduh "Ugh!".',
        pronunciationTip: 'Bibir santai dan datar, jangan dimonyongkan seperti mengucapkan huruf "U" dalam bahasa Indonesia.',
        example: 'うみ', romajiEx: 'Umi', meaning: 'Laut' 
      },
      { 
        char: 'え', romaji: 'e', row: 'vowel', group: 'Gojuon', strokes: 2, 
        steps: ['Garis titik miring pendek atas', 'Tarik garis zik-zak menyambung ke bawah berhenti tegas'], 
        strokeTypes: ['tome', 'tome'],
        mnemonicVisual: 'Orang sedang berlari tergesa-gesa sambil kaget menoleh "Eh?!".',
        example: 'えき', romajiEx: 'Eki', meaning: 'Stasiun kereta' 
      },
      { 
        char: 'お', romaji: 'o', row: 'vowel', group: 'Gojuon', strokes: 3, 
        steps: ['Garis datar kiri ke kanan berhenti', 'Garis vertikal melingkar ke bawah lalu sapu memudar', 'Beri tanda petik/titik di kanan atas'], 
        strokeTypes: ['tome', 'harai', 'tome'],
        mnemonicVisual: 'Pemain golf memukul bola masuk tepat ke dalam lubang "O-hole".',
        example: 'おちゃ', romajiEx: 'Ocha', meaning: 'Teh' 
      },

      // Baris K
      { 
        char: 'か', romaji: 'ka', row: 'k', group: 'Gojuon', strokes: 3, 
        steps: ['Lekukan kiri melengkung, sentakkan ujungnya ke atas berkait', 'Garis miring memotong di sebelah kanan diayun lepas', 'Titik miring di kanan atas berhenti'], 
        strokeTypes: ['hane', 'harai', 'tome'],
        mnemonicVisual: 'Orang sedang mengayunkan KA-pak memotong kayu.',
        example: 'かさ', romajiEx: 'Kasa', meaning: 'Payung' 
      },
      { 
        char: 'き', romaji: 'ki', row: 'k', group: 'Gojuon', strokes: 4, 
        steps: ['Garis datar atas berhenti', 'Garis datar bawah sejajar berhenti', 'Garis miring memotong kedua garis berhenti', 'Lengkungan alas di bawah diayun lepas'], 
        strokeTypes: ['tome', 'tome', 'tome', 'harai'],
        mnemonicVisual: 'Kunci kuno (Key) bergigi dua garis sejajar.',
        example: 'きょう', romajiEx: 'Kyou', meaning: 'Hari ini' 
      },
      { 
        char: 'く', romaji: 'ku', row: 'k', group: 'Gojuon', strokes: 1, 
        steps: ['Satu goresan sudut siku lancip ( < ), ayunkan ujung bawahnya menyapu lepas'], 
        strokeTypes: ['harai'],
        mnemonicVisual: 'Paruh burung yang sedang terbuka berkokok "KU-kuri-ku".',
        example: 'くるま', romajiEx: 'Kuruma', meaning: 'Mobil' 
      },
      { 
        char: 'け', romaji: 'ke', row: 'k', group: 'Gojuon', strokes: 3, 
        steps: ['Garis vertikal kiri, sentakkan ujung ke atas berkait', 'Garis datar pendek berhenti', 'Garis melengkung kanan memotong diayun lepas'], 
        strokeTypes: ['hane', 'tome', 'harai'],
        mnemonicVisual: 'Tong kayu tempat bir / tongkat kriket (KE-g).',
        example: 'けいたい', romajiEx: 'Keitai', meaning: 'Ponsel / HP' 
      },
      { 
        char: 'こ', romaji: 'ko', row: 'k', group: 'Gojuon', strokes: 2, 
        steps: ['Garis datar atas, beri sedikit kait halus ke dalam', 'Garis datar bawah melengkung berhenti tegas'], 
        strokeTypes: ['hane', 'tome'],
        mnemonicVisual: 'Dua ekor ikan KOI berenang sejajar atas dan bawah.',
        example: 'これ', romajiEx: 'Kore', meaning: 'Ini' 
      },

      // Baris S
      { 
        char: 'さ', romaji: 'sa', row: 's', group: 'Gojuon', strokes: 3, 
        steps: ['Garis datar miring sedikit berhenti', 'Garis tegak memotong berhenti', 'Lengkungan alas terpisah di bawah diayun lepas'], 
        strokeTypes: ['tome', 'tome', 'harai'],
        mnemonicVisual: 'Mata pancing ikan SAlmon menghadap ke kanan.',
        example: 'さくら', romajiEx: 'Sakura', meaning: 'Bunga Sakura' 
      },
      { 
        char: 'し', romaji: 'shi', row: 's', group: 'Gojuon', strokes: 1, 
        steps: ['Tarik dari atas lalu melengkung ke kanan ayunkan lepas seperti kail pancing'], 
        strokeTypes: ['harai'],
        mnemonicVisual: 'Kail pancing mengkilap (SHIny hook) ditarik dari air.',
        pronunciationTip: 'Bunyi desis halus antara "si" dan "syi" di langit-langit mulut, lidah tidak menyentuh gigi.',
        example: 'しろ', romajiEx: 'Shiro', meaning: 'Putih' 
      },
      { 
        char: 'す', romaji: 'su', row: 's', group: 'Gojuon', strokes: 2, 
        steps: ['Garis datar kiri ke kanan berhenti', 'Garis tegak membentuk loop simpul lalu ayunkan menyapu lepas'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Penari berbadan ramping melompat indah (SU-per slim dancer).',
        example: 'すし', romajiEx: 'Sushi', meaning: 'Makanan sushi' 
      },
      { 
        char: 'せ', romaji: 'se', row: 's', group: 'Gojuon', strokes: 3, 
        steps: ['Garis datar panjang berhenti', 'Garis kanan sentakkan berkait ke kiri', 'Garis kiri memotong ke bawah berhenti'], 
        strokeTypes: ['tome', 'hane', 'tome'],
        mnemonicVisual: 'Dua orang duduk berdampingan di SE-bangku taman.',
        example: 'せんせい', romajiEx: 'Sensei', meaning: 'Guru' 
      },
      { 
        char: 'そ', romaji: 'so', row: 's', group: 'Gojuon', strokes: 1, 
        steps: ['Satu goresan menyerupai huruf Z bersambung huruf C berhenti tegas'], 
        strokeTypes: ['tome'],
        mnemonicVisual: 'Jahitan benang zik-zak mesin jahit (SO-wing).',
        example: 'そこ', romajiEx: 'Soko', meaning: 'Di situ' 
      },

      // Baris T
      { 
        char: 'た', romaji: 'ta', row: 't', group: 'Gojuon', strokes: 4, 
        steps: ['Garis datar atas berhenti', 'Garis miring memotong berhenti', 'Dua garis lengkung kecil di kanan mirip "ko" berhenti'], 
        strokeTypes: ['tome', 'tome', 'tome', 'tome'],
        mnemonicVisual: 'Huruf "t" dan "a" kecil yang menyatu membentuk kata "TA".',
        example: 'たべる', romajiEx: 'Taberu', meaning: 'Makan' 
      },
      { 
        char: 'ち', romaji: 'chi', row: 't', group: 'Gojuon', strokes: 2, 
        steps: ['Garis datar atas berhenti', 'Garis tegak tembus membentuk setengah lingkaran diayun lepas ke kiri'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Pemandu sorak mengangkat pom-pom sambil bersorak "CHII-rs!".',
        example: 'ちず', romajiEx: 'Chizu', meaning: 'Peta' 
      },
      { 
        char: 'つ', romaji: 'tsu', row: 't', group: 'Gojuon', strokes: 1, 
        steps: ['Satu tarikan lengkungan ombak besar, sapukan ujungnya lepas memudar ke bawah'], 
        strokeTypes: ['harai'],
        mnemonicVisual: 'Gelombang ombak besar TSU-nami.',
        pronunciationTip: 'Ujung lidah menempel di belakang gigi seri atas lalu lepas dengan desis seperti kata "TSUnami", bukan dibaca "cu" atau "su".',
        example: 'つき', romajiEx: 'Tsuki', meaning: 'Bulan' 
      },
      { 
        char: 'て', romaji: 'te', row: 't', group: 'Gojuon', strokes: 1, 
        steps: ['Garis datar ke kanan lalu melengkung setengah lingkaran berhenti tegas'], 
        strokeTypes: ['tome'],
        mnemonicVisual: 'Bentuk telapak tangan terbuka sedang meminta (TE-rima).',
        example: 'てがみ', romajiEx: 'Tegami', meaning: 'Surat' 
      },
      { 
        char: 'と', romaji: 'to', row: 't', group: 'Gojuon', strokes: 2, 
        steps: ['Garis miring pendek ke kanan bawah berhenti', 'Lengkungan setengah lingkaran menyentuh garis pertama berhenti'], 
        strokeTypes: ['tome', 'tome'],
        mnemonicVisual: 'Jari kaki yang tertusuk duri runcing (TO-e).',
        example: 'ともだち', romajiEx: 'Tomodachi', meaning: 'Teman' 
      },

      // Baris N
      { 
        char: 'な', romaji: 'na', row: 'n', group: 'Gojuon', strokes: 4, 
        steps: ['Garis datar berhenti', 'Garis miring menyilang berhenti', 'Titik strip berhenti', 'Garis simpul melingkar diayun lepas'], 
        strokeTypes: ['tome', 'tome', 'tome', 'harai'],
        mnemonicVisual: 'Biarawati yang sedang berdoa di depan salib (NA-n).',
        example: 'なつ', romajiEx: 'Natsu', meaning: 'Musim panas' 
      },
      { 
        char: 'に', romaji: 'ni', row: 'n', group: 'Gojuon', strokes: 3, 
        steps: ['Garis vertikal kiri sentakkan berkait ke atas', 'Garis datar atas berhenti', 'Garis datar bawah berhenti'], 
        strokeTypes: ['hane', 'tome', 'tome'],
        mnemonicVisual: 'Jarum jahit dan benang (NI-dle).',
        example: 'にほん', romajiEx: 'Nihon', meaning: 'Jepang' 
      },
      { 
        char: 'ぬ', romaji: 'nu', row: 'n', group: 'Gojuon', strokes: 2, 
        steps: ['Garis miring kiri berhenti', 'Garis melingkar berputar dengan simpul loop diayun lepas'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Semangkuk mie NU-duru yang tersimpul di ujung sumpit.',
        example: 'いぬ', romajiEx: 'Inu', meaning: 'Anjing' 
      },
      { 
        char: 'ね', romaji: 'ne', row: 'n', group: 'Gojuon', strokes: 2, 
        steps: ['Garis vertikal lurus berhenti', 'Garis zik-zak dengan simpul loop tertutup berhenti'], 
        strokeTypes: ['tome', 'tome'],
        mnemonicVisual: 'Kucing (NE-ko) dengan ekor yang memiliki simpul melingkar.',
        example: 'ねこ', romajiEx: 'Neko', meaning: 'Kucing' 
      },
      { 
        char: 'の', romaji: 'no', row: 'n', group: 'Gojuon', strokes: 1, 
        steps: ['Satu goresan spiral obat nyamuk diayun menyapu lepas memudar'], 
        strokeTypes: ['harai'],
        mnemonicVisual: 'Rambu dilarang lewat bertanda garis merah (NO entry).',
        example: 'のみもの', romajiEx: 'Nomimono', meaning: 'Minuman' 
      },

      // Baris H
      { 
        char: 'は', romaji: 'ha', row: 'h', group: 'Gojuon', strokes: 3, 
        steps: ['Garis tegak kiri berkait ke atas', 'Garis datar kanan berhenti', 'Garis vertikal menembus membentuk loop ayun lepas'], 
        strokeTypes: ['hane', 'tome', 'harai'],
        mnemonicVisual: 'Bentuk huruf H kapital di sebelah kanan (HA-ha).',
        example: 'はな', romajiEx: 'Hana', meaning: 'Bunga' 
      },
      { 
        char: 'ひ', romaji: 'hi', row: 'h', group: 'Gojuon', strokes: 1, 
        steps: ['Satu goresan cekungan senyuman lebar berhenti tegas'], 
        strokeTypes: ['tome'],
        mnemonicVisual: 'Wajah orang yang tersenyum gembira terkikik "HI-hi-hi".',
        example: 'ひと', romajiEx: 'Hito', meaning: 'Orang' 
      },
      { 
        char: 'ふ', romaji: 'fu', row: 'h', group: 'Gojuon', strokes: 4, 
        steps: ['Titik atas berkait ke bawah', 'Lengkung tengah ayun lepas', 'Titik miring kiri ayun lepas', 'Titik miring kanan ayun lepas'], 
        strokeTypes: ['hane', 'harai', 'harai', 'harai'],
        mnemonicVisual: 'Gunung FU-ji dengan dua kepulan asap di sampingnya.',
        pronunciationTip: 'Bukan huruf "F" bahasa Inggris (gigi jangan gigit bibir). Rapatkan kedua bibir santai lalu hembuskan udara lembut seperti meniup lilin.',
        example: 'ふゆ', romajiEx: 'Fuyu', meaning: 'Musim dingin' 
      },
      { 
        char: 'へ', romaji: 'he', row: 'h', group: 'Gojuon', strokes: 1, 
        steps: ['Satu goresan atap segitiga naik lalu turun berhenti tegas'], 
        strokeTypes: ['tome'],
        mnemonicVisual: 'Puncak bukit yang tinggi (HE-ad of mountain).',
        example: 'へや', romajiEx: 'Heya', meaning: 'Kamar' 
      },
      { 
        char: 'ほ', romaji: 'ho', row: 'h', group: 'Gojuon', strokes: 4, 
        steps: ['Garis tegak kiri berhenti', 'Garis datar atas bertopi berhenti', 'Garis datar bawah berhenti', 'Garis tegak meloop ayun lepas'], 
        strokeTypes: ['tome', 'tome', 'tome', 'harai'],
        mnemonicVisual: 'Pemain hoki memakai helm pelindung bertopi (HO-ckey).',
        example: 'ほん', romajiEx: 'Hon', meaning: 'Buku' 
      },

      // Baris M
      { 
        char: 'ま', romaji: 'ma', row: 'm', group: 'Gojuon', strokes: 3, 
        steps: ['Garis datar atas panjang berhenti', 'Garis datar tengah pendek berhenti', 'Garis tegak menembus lalu meloop ayun lepas'], 
        strokeTypes: ['tome', 'tome', 'harai'],
        mnemonicVisual: 'Topeng badut dengan dua kumis melintang (MA-sk).',
        example: 'まち', romajiEx: 'Machi', meaning: 'Kota' 
      },
      { 
        char: 'み', romaji: 'mi', row: 'm', group: 'Gojuon', strokes: 2, 
        steps: ['Garis miring dengan loop simpul di kiri bawah', 'Garis miring kanan memotong ayun lepas'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Penyanyi memegang mikrofon (MI-crophone).',
        example: 'みず', romajiEx: 'Mizu', meaning: 'Air' 
      },
      { 
        char: 'む', romaji: 'mu', row: 'm', group: 'Gojuon', strokes: 3, 
        steps: ['Garis datar berhenti', 'Garis tegak berputar loop ke kanan berkait atas', 'Titik kanan atas berhenti'], 
        strokeTypes: ['tome', 'hane', 'tome'],
        mnemonicVisual: 'Kepala sapi bertanduk bersuara "MUU-uu".',
        example: 'むし', romajiEx: 'Mushi', meaning: 'Serangga' 
      },
      { 
        char: 'め', romaji: 'me', row: 'm', group: 'Gojuon', strokes: 2, 
        steps: ['Garis miring kiri berhenti', 'Garis melengkung besar memotong ayun lepas tanpa simpul'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Bentuk bola mata manusia (bahasa Jepang mata adalah "ME").',
        example: 'めがね', romajiEx: 'Megane', meaning: 'Kacamata' 
      },
      { 
        char: 'も', romaji: 'mo', row: 'm', group: 'Gojuon', strokes: 3, 
        steps: ['Garis tegak melengkung ke kanan mirip pancing berhenti', 'Garis datar atas berhenti', 'Garis datar bawah memotong berhenti'], 
        strokeTypes: ['tome', 'tome', 'tome'],
        mnemonicVisual: 'Kail pancing menangkap cacing lebih banyak (MO-re worms).',
        example: 'もり', romajiEx: 'Mori', meaning: 'Hutan' 
      },

      // Baris Y
      { 
        char: 'や', romaji: 'ya', row: 'y', group: 'Gojuon', strokes: 3, 
        steps: ['Lengkung atas berkait', 'Titik miring berhenti', 'Garis miring memotong ayun lepas'], 
        strokeTypes: ['hane', 'tome', 'harai'],
        mnemonicVisual: 'Kapal pesiar dengan layar terkembang (YA-cht).',
        example: 'やま', romajiEx: 'Yama', meaning: 'Gunung' 
      },
      { 
        char: 'ゆ', romaji: 'yu', row: 'y', group: 'Gojuon', strokes: 2, 
        steps: ['Lengkung kiri memutar ke kanan berhenti', 'Garis tegak panjang memotong tengah ayun lepas'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Ikan berenang meliuk-liuk di kolam.',
        example: 'ゆき', romajiEx: 'Yuki', meaning: 'Salju' 
      },
      { 
        char: 'よ', romaji: 'yo', row: 'y', group: 'Gojuon', strokes: 2, 
        steps: ['Garis datar pendek berhenti', 'Garis tegak dengan loop simpul ke kiri ayun lepas'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Mainan yo-yo yang sedang bergantung di tali (YO-yo).',
        example: 'よる', romajiEx: 'Yoru', meaning: 'Malam' 
      },

      // Baris R
      { 
        char: 'ら', romaji: 'ra', row: 'r', group: 'Gojuon', strokes: 2, 
        steps: ['Titik strip atas berhenti', 'Lengkungan bulat bawah diayun lepas'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Pipi singa mengaum (RA-wr).',
        pronunciationTip: 'Lidah menyentuh langit-langit atas sekali dengan ketukan ringan (perpaduan bunyi antara R dan L).',
        example: 'らいしゅう', romajiEx: 'Raishuu', meaning: 'Minggu depan' 
      },
      { 
        char: 'り', romaji: 'ri', row: 'r', group: 'Gojuon', strokes: 2, 
        steps: ['Garis pendek tegak kiri berkait ke atas', 'Garis panjang tegak kanan diayun lepas memudar'], 
        strokeTypes: ['hane', 'harai'],
        mnemonicVisual: 'Dua batang alang-alang di tepi sungai (RI-ver).',
        pronunciationTip: 'Ujung lidah menepuk langit-langit depan dengan cepat.',
        example: 'りんご', romajiEx: 'Ringo', meaning: 'Apel' 
      },
      { 
        char: 'る', romaji: 'ru', row: 'r', group: 'Gojuon', strokes: 1, 
        steps: ['Satu goresan mirip angka 3 dengan simpul bulat tertutup di ekornya'], 
        strokeTypes: ['tome'],
        mnemonicVisual: 'Angka tiga dengan lingkaran roda di ujungnya (RU-te).',
        example: 'くる', romajiEx: 'Kuru', meaning: 'Datang' 
      },
      { 
        char: 'れ', romaji: 're', row: 'r', group: 'Gojuon', strokes: 2, 
        steps: ['Garis tegak lurus kiri berhenti', 'Garis zik-zak dengan ekor melengkung keluar ke kanan ayun lepas'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Orang sedang rebahan santai dengan kaki menendang keluar.',
        example: 'れんしゅう', romajiEx: 'Renshuu', meaning: 'Latihan' 
      },
      { 
        char: 'ろ', romaji: 'ro', row: 'r', group: 'Gojuon', strokes: 1, 
        steps: ['Satu goresan mirip angka 3 polos tanpa simpul di ekornya'], 
        strokeTypes: ['tome'],
        mnemonicVisual: 'Jalanan berliku tanpa hambatan (RO-ad).',
        example: 'ろうそく', romajiEx: 'Rousoku', meaning: 'Lilin' 
      },

      // Baris W & N
      { 
        char: 'わ', romaji: 'wa', row: 'w', group: 'Gojuon', strokes: 2, 
        steps: ['Garis tegak lurus berhenti', 'Garis zik-zak melengkung bulat besar ke dalam ayun lepas'], 
        strokeTypes: ['tome', 'harai'],
        mnemonicVisual: 'Bentuk lingkaran wajan penggorengan (WA-jan).',
        example: 'わたし', romajiEx: 'Watashi', meaning: 'Saya / Aku' 
      },
      { 
        char: 'を', romaji: 'wo', row: 'w', group: 'Gojuon', strokes: 3, 
        steps: ['Garis datar berhenti', 'Garis miring dengan kait ke atas', 'Lengkungan setengah lingkaran menempel'], 
        strokeTypes: ['tome', 'hane', 'tome'],
        mnemonicVisual: 'Orang berselancar di atas ombak ("Whoa!").',
        example: 'みず を のむ', romajiEx: 'Mizu o nomu', meaning: 'Minum air (sebagai partikel objek)' 
      },
      { 
        char: 'ん', romaji: 'n', row: 'w', group: 'Gojuon', strokes: 1, 
        steps: ['Satu goresan mirip huruf "n" kecil bersambung diayun menyapu lepas'], 
        strokeTypes: ['harai'],
        mnemonicVisual: 'Huruf "n" kecil alfabet.',
        example: 'にほん', romajiEx: 'Nihon', meaning: 'Jepang' 
      },

      // Dakuon (Ga, Za, Da, Ba, Pa)
      { char: 'が', romaji: 'ga', row: 'dakuon', group: 'Dakuon', strokes: 5, steps: ['Tulis "ka"', 'Tambah dua tanda petik (tenten) di kanan atas'], strokeTypes: ['hane', 'harai', 'tome', 'tome', 'tome'], example: 'がくせい', romajiEx: 'Gakusei', meaning: 'Pelajar / Mahasiswa' },
      { char: 'ざ', romaji: 'za', row: 'dakuon', group: 'Dakuon', strokes: 5, steps: ['Tulis "sa"', 'Tambah dua tanda petik tenten'], strokeTypes: ['tome', 'tome', 'harai', 'tome', 'tome'], example: 'ざっし', romajiEx: 'Zasshi', meaning: 'Majalah' },
      { char: 'だ', romaji: 'da', row: 'dakuon', group: 'Dakuon', strokes: 6, steps: ['Tulis "ta"', 'Tambah dua tanda petik tenten'], strokeTypes: ['tome', 'tome', 'tome', 'tome', 'tome', 'tome'], example: 'だいがく', romajiEx: 'Daigaku', meaning: 'Universitas' },
      { char: 'ば', romaji: 'ba', row: 'dakuon', group: 'Dakuon', strokes: 5, steps: ['Tulis "ha"', 'Tambah dua tanda petik tenten'], strokeTypes: ['hane', 'tome', 'harai', 'tome', 'tome'], example: 'ばんごはん', romajiEx: 'Bangohan', meaning: 'Makan malam' },
      { char: 'ぱ', romaji: 'pa', row: 'dakuon', group: 'Handakuon', strokes: 4, steps: ['Tulis "ha"', 'Tambah lingkaran kecil (maru) di kanan atas'], strokeTypes: ['hane', 'tome', 'harai', 'tome'], example: 'ぱん', romajiEx: 'Pan', meaning: 'Roti' }
    ],
    // Milestone Kosakata Nyata Tiap Baris (Incremental Vocabulary ala Ryu Sensei)
    rowMilestones: [
      {
        row: 'vowel',
        title: 'Kosakata Baris Vokal (A-I-U-E-O)',
        words: [
          { word: 'あい', romaji: 'ai', meaning: 'Cinta' },
          { word: 'いえ', romaji: 'ie', meaning: 'Rumah' },
          { word: 'うえ', romaji: 'ue', meaning: 'Atas' },
          { word: 'あお', romaji: 'ao', meaning: 'Warna Biru' }
        ]
      },
      {
        row: 'k',
        title: 'Kosakata Gabungan Vokal + Baris K',
        words: [
          { word: 'あか', romaji: 'aka', meaning: 'Warna Merah' },
          { word: 'あき', romaji: 'aki', meaning: 'Musim Gugur' },
          { word: 'かお', romaji: 'kao', meaning: 'Wajah' },
          { word: 'えき', romaji: 'eki', meaning: 'Stasiun Kereta' },
          { word: 'いく', romaji: 'iku', meaning: 'Pergi' },
          { word: 'こえ', romaji: 'koe', meaning: 'Suara' }
        ]
      },
      {
        row: 's',
        title: 'Kosakata Gabungan Vokal + K + Baris S',
        words: [
          { word: 'あさ', romaji: 'asa', meaning: 'Pagi Hari' },
          { word: 'すし', romaji: 'sushi', meaning: 'Makanan Sushi' },
          { word: 'うし', romaji: 'ushi', meaning: 'Sapi' },
          { word: 'さけ', romaji: 'sake', meaning: 'Ikan Salmon / Minuman' },
          { word: 'そこ', romaji: 'soko', meaning: 'Di Situ' }
        ]
      },
      {
        row: 't',
        title: 'Kosakata Gabungan Vokal + K + S + Baris T',
        words: [
          { word: 'うた', romaji: 'uta', meaning: 'Lagu' },
          { word: 'て', romaji: 'te', meaning: 'Tangan' },
          { word: 'つき', romaji: 'tsuki', meaning: 'Bulan di Langit' },
          { word: 'くつ', romaji: 'kutsu', meaning: 'Sepatu' },
          { word: 'ちず', romaji: 'chizu', meaning: 'Peta' }
        ]
      },
      {
        row: 'n',
        title: 'Kosakata Gabungan Baris N',
        words: [
          { word: 'いぬ', romaji: 'inu', meaning: 'Anjing' },
          { word: 'ねこ', romaji: 'neko', meaning: 'Kucing' },
          { word: 'くに', romaji: 'kuni', meaning: 'Negara' },
          { word: 'さかな', romaji: 'sakana', meaning: 'Ikan' }
        ]
      },
      {
        row: 'h',
        title: 'Kosakata Gabungan Baris H',
        words: [
          { word: 'はな', romaji: 'hana', meaning: 'Bunga / Hidung' },
          { word: 'ひと', romaji: 'hito', meaning: 'Orang' },
          { word: 'ふね', romaji: 'fune', meaning: 'Kapal' },
          { word: 'ほし', romaji: 'hoshi', meaning: 'Bintang' }
        ]
      },
      {
        row: 'm',
        title: 'Kosakata Gabungan Baris M',
        words: [
          { word: 'まち', romaji: 'machi', meaning: 'Kota' },
          { word: 'みず', romaji: 'mizu', meaning: 'Air' },
          { word: 'あめ', romaji: 'ame', meaning: 'Hujan / Permen' }
        ]
      },
      {
        row: 'y',
        title: 'Kosakata Gabungan Baris Y',
        words: [
          { word: 'やま', romaji: 'yama', meaning: 'Gunung' },
          { word: 'ゆき', romaji: 'yuki', meaning: 'Salju' },
          { word: 'よる', romaji: 'yoru', meaning: 'Malam' }
        ]
      },
      {
        row: 'r',
        title: 'Kosakata Gabungan Baris R',
        words: [
          { word: 'とり', romaji: 'tori', meaning: 'Burung' },
          { word: 'さくら', romaji: 'sakura', meaning: 'Bunga Sakura' },
          { word: 'そら', romaji: 'sora', meaning: 'Langit' },
          { word: 'くるま', romaji: 'kuruma', meaning: 'Mobil' }
        ]
      }
    ],
    sentences: [
      {
        category: 'Salam & Sapaan',
        japanese: 'おはようございます',
        romaji: 'Ohayou gozaimasu',
        indonesian: 'Selamat pagi (Sopan / Formal)',
        breakdown: [
          { word: 'おはよう', type: 'hira', note: 'Pagi' },
          { word: 'ございます', type: 'hira', note: 'Bentuk sopan formal' }
        ],
        context: 'Diucapkan kepada atasan, guru, atau rekan kerja saat bertemu pertama kali di pagi hari.'
      },
      {
        category: 'Salam & Sapaan',
        japanese: 'こんにちは、はじめまして',
        romaji: 'Konnichiwa, hajimemashite',
        indonesian: 'Halo, senang berkenalan dengan Anda',
        breakdown: [
          { word: 'こんにちは', type: 'hira', note: 'Halo / Selamat siang' },
          { word: 'はじめまして', type: 'hira', note: 'Senang berkenalan (pertama kali)' }
        ],
        context: 'Kalimat standar perkenalan diri saat pertama kali bertemu seseorang.'
      },
      {
        category: 'Kehidupan Sehari-hari',
        japanese: 'ありがとうございます',
        romaji: 'Arigatou gozaimasu',
        indonesian: 'Terima kasih banyak (Sopan)',
        breakdown: [
          { word: 'ありがとう', type: 'hira', note: 'Terima kasih' },
          { word: 'ございます', type: 'hira', note: 'Penambah kesopanan' }
        ],
        context: 'Ungkapan terima kasih sopan paling umum di segala situasi formal dan publik.'
      },
      {
        category: 'Belanja & Toko',
        japanese: 'これ を ください',
        romaji: 'Kore o kudasai',
        indonesian: 'Tolong berikan yang ini / Saya mau beli yang ini',
        breakdown: [
          { word: 'これ', type: 'hira', note: 'Kata tunjuk benda (Ini)' },
          { word: 'を', type: 'particle', note: 'Partikel objek (dibaca: o)' },
          { word: 'ください', type: 'hira', note: 'Tolong / Mohon berikan' }
        ],
        context: 'Gunakan kalimat ini sambil menunjuk menu atau barang di etalase toko.'
      },
      {
        category: 'Sopan Santun',
        japanese: 'すみません、いま なんじ ですか？',
        romaji: 'Sumimasen, ima nanji desu ka?',
        indonesian: 'Permisi, sekarang jam berapa?',
        breakdown: [
          { word: 'すみません', type: 'hira', note: 'Permisi / Maaf' },
          { word: 'いま', type: 'hira', note: 'Sekarang' },
          { word: 'なんじ', type: 'hira', note: 'Jam berapa' },
          { word: 'ですか', type: 'hira', note: 'Partikel tanya sopan' }
        ],
        context: 'Kalimat ramah saat menanyakan waktu kepada orang di jalan atau stasiun.'
      }
    ]
  },

  // ==========================================
  // KATAKANA
  // ==========================================
  katakana: {
    id: 'katakana',
    name: 'Katakana',
    japaneseName: 'カタカナ',
    themeColor: 'blue',
    description: 'Huruf dengan garis bersudut kaku dan tegas. Khusus digunakan untuk kata serapan bahasa asing, nama negara, nama orang asing, dan onomatope.',
    characters: [
      // Vokal
      { char: 'ア', romaji: 'a', row: 'vowel', group: 'Gojuon', strokes: 2, steps: ['Garis datar dengan tekukan turun miring ke kiri', 'Garis miring panjang menyapu ke kiri'], example: 'アイス', romajiEx: 'Aisu', meaning: 'Es krim' },
      { char: 'イ', romaji: 'i', row: 'vowel', group: 'Gojuon', strokes: 2, steps: ['Garis miring dari atas ke kiri bawah', 'Garis lurus vertikal ke bawah'], example: 'インク', romajiEx: 'Inku', meaning: 'Tinta' },
      { char: 'ウ', romaji: 'u', row: 'vowel', group: 'Gojuon', strokes: 3, steps: ['Titik vertikal tengah atas', 'Titik miring kiri', 'Garis sudut melengkung ke kiri'], example: 'ウェブ', romajiEx: 'Webu', meaning: 'Web' },
      { char: 'エ', romaji: 'e', row: 'vowel', group: 'Gojuon', strokes: 3, steps: ['Garis datar atas', 'Garis tegak lurus tengah', 'Garis datar bawah panjang penopang'], example: 'エアコン', romajiEx: 'Eakon', meaning: 'AC' },
      { char: 'オ', romaji: 'o', row: 'vowel', group: 'Gojuon', strokes: 3, steps: ['Garis datar', 'Garis vertikal berkait kiri', 'Garis miring kanan'], example: 'オレンジ', romajiEx: 'Orenji', meaning: 'Jeruk' },

      // Baris K
      { char: 'カ', romaji: 'ka', row: 'k', group: 'Gojuon', strokes: 2, steps: ['Garis datar berbelok berkait ke bawah', 'Garis miring memotong melengkung ke kiri'], example: 'カメラ', romajiEx: 'Kamera', meaning: 'Kamera' },
      { char: 'キ', romaji: 'ki', row: 'k', group: 'Gojuon', strokes: 3, steps: ['Garis datar atas', 'Garis datar tengah sejajar', 'Garis miring tembus ke bawah'], example: 'キー', romajiEx: 'Kii', meaning: 'Kunci' },
      { char: 'ク', romaji: 'ku', row: 'k', group: 'Gojuon', strokes: 2, steps: ['Garis miring pendek ke kiri', 'Garis siku mendatar lalu melengkung panjang'], example: 'クラス', romajiEx: 'Kurasu', meaning: 'Kelas' },
      { char: 'ケ', romaji: 'ke', row: 'k', group: 'Gojuon', strokes: 3, steps: ['Garis miring pendek kiri', 'Garis datar mendatar', 'Garis melengkung memotong ke kiri'], example: 'ケーキ', romajiEx: 'Keeki', meaning: 'Kue / Cake' },
      { char: 'コ', romaji: 'ko', row: 'k', group: 'Gojuon', strokes: 2, steps: ['Garis sudut siku kanan atas', 'Garis datar bawah sejajar'], example: 'コーヒー', romajiEx: 'Koohii', meaning: 'Kopi' },

      // Baris S
      { char: 'サ', romaji: 'sa', row: 's', group: 'Gojuon', strokes: 3, steps: ['Garis datar mendatar', 'Garis tegak pendek kiri', 'Garis melengkung kanan memotong'], example: 'サラダ', romajiEx: 'Sarada', meaning: 'Salad' },
      { char: 'シ', romaji: 'shi', row: 's', group: 'Gojuon', strokes: 3, steps: ['Titik miring atas', 'Titik miring tengah', 'Sapuan panjang dari kiri bawah ke kanan atas'], example: 'シャツ', romajiEx: 'Shatsu', meaning: 'Kemeja' },
      { char: 'ス', romaji: 'su', row: 's', group: 'Gojuon', strokes: 2, steps: ['Garis datar menyiku ke kiri bawah', 'Garis miring kanan memotong'], example: 'スープ', romajiEx: 'Suupu', meaning: 'Sup' },
      { char: 'セ', romaji: 'se', row: 's', group: 'Gojuon', strokes: 2, steps: ['Garis datar berbelok ke bawah', 'Garis siku dari kiri bawah ke kanan datar'], example: 'セーター', romajiEx: 'Seetaa', meaning: 'Sweater' },
      { char: 'ソ', romaji: 'so', row: 's', group: 'Gojuon', strokes: 2, steps: ['Titik miring pendek atas', 'Sapuan tegas dari kanan atas ke kiri bawah'], example: 'ソファ', romajiEx: 'Sofa', meaning: 'Sofa' },

      // Baris T
      { char: 'タ', romaji: 'ta', row: 't', group: 'Gojuon', strokes: 3, steps: ['Garis miring kiri', 'Garis datar menyiku ke kiri bawah', 'Titik strip memotong di dalam'], example: 'タクシー', romajiEx: 'Takushii', meaning: 'Taksi' },
      { char: 'チ', romaji: 'chi', row: 't', group: 'Gojuon', strokes: 3, steps: ['Garis miring menyapu ke kiri atas', 'Garis datar memotong', 'Garis lengkung bawah'], example: 'チーズ', romajiEx: 'Chiizu', meaning: 'Keju' },
      { char: 'ツ', romaji: 'tsu', row: 't', group: 'Gojuon', strokes: 3, steps: ['Dua titik sejajar atas', 'Sapuan tajam dari kanan atas turun ke kiri bawah'], example: 'ツアー', romajiEx: 'Tsuaa', meaning: 'Tur wisata' },
      { char: 'テ', romaji: 'te', row: 't', group: 'Gojuon', strokes: 3, steps: ['Garis datar atas', 'Garis datar tengah lebih panjang', 'Garis miring melengkung ke kiri'], example: 'テレビ', romajiEx: 'Terebi', meaning: 'Televisi' },
      { char: 'ト', romaji: 'to', row: 't', group: 'Gojuon', strokes: 2, steps: ['Garis vertikal lurus ke bawah', 'Garis miring menyentuh sisi kanan'], example: 'トイレ', romajiEx: 'Toire', meaning: 'Toilet' },

      // Baris N
      { char: 'ナ', romaji: 'na', row: 'n', group: 'Gojuon', strokes: 2, steps: ['Garis datar melintang', 'Garis miring memotong melengkung ke kiri'], example: 'ナイフ', romajiEx: 'Naifu', meaning: 'Pisau' },
      { char: 'ニ', romaji: 'ni', row: 'n', group: 'Gojuon', strokes: 2, steps: ['Garis datar atas pendek', 'Garis datar bawah lebih panjang'], example: 'ニュース', romajiEx: 'Nyuusu', meaning: 'Berita' },
      { char: 'ヌ', romaji: 'nu', row: 'n', group: 'Gojuon', strokes: 2, steps: ['Garis sudut mendatar menyiku ke kiri', 'Garis miring memotong melintasi'], example: 'ヌードル', romajiEx: 'Nuudoru', meaning: 'Mie / Noodle' },
      { char: 'ネ', romaji: 'ne', row: 'n', group: 'Gojuon', strokes: 4, steps: ['Titik atas', 'Garis zik-zak tegak', 'Garis tegak tengah', 'Titik miring kanan'], example: 'ネクタイ', romajiEx: 'Nekutai', meaning: 'Dasi' },
      { char: 'ノ', romaji: 'no', row: 'n', group: 'Gojuon', strokes: 1, steps: ['Satu sapuan garis miring halus dari kanan atas ke kiri bawah'], example: 'ノート', romajiEx: 'Nooto', meaning: 'Buku catatan' },

      // Baris H
      { char: 'ハ', romaji: 'ha', row: 'h', group: 'Gojuon', strokes: 2, steps: ['Garis miring kiri', 'Garis miring kanan saling menjauh'], example: 'ハンバーガー', romajiEx: 'Hanbaagaa', meaning: 'Burger' },
      { char: 'ヒ', romaji: 'hi', row: 'h', group: 'Gojuon', strokes: 2, steps: ['Garis datar menyiku ke bawah', 'Garis melintang panjang ke kanan'], example: 'ヒーロー', romajiEx: 'Hiiroo', meaning: 'Pahlawan' },
      { char: 'フ', romaji: 'fu', row: 'h', group: 'Gojuon', strokes: 1, steps: ['Satu goresan datar menyiku melengkung ke kiri bawah'], example: 'フォーク', romajiEx: 'Fooku', meaning: 'Garpu' },
      { char: 'ヘ', romaji: 'he', row: 'h', group: 'Gojuon', strokes: 1, steps: ['Satu goresan berbentuk atap gunung (sama dengan Hiragana he)'], example: 'ヘルメット', romajiEx: 'Herumetto', meaning: 'Helm' },
      { char: 'ホ', romaji: 'ho', row: 'h', group: 'Gojuon', strokes: 4, steps: ['Garis datar atas', 'Garis tegak lurus tengah', 'Garis miring kiri', 'Garis miring kanan'], example: 'ホテル', romajiEx: 'Hoteru', meaning: 'Hotel' },

      // Baris M
      { char: 'マ', romaji: 'ma', row: 'm', group: 'Gojuon', strokes: 2, steps: ['Garis datar menyiku ke kiri bawah', 'Garis miring pendek memotong'], example: 'マスク', romajiEx: 'Masuku', meaning: 'Masker' },
      { char: 'ミ', romaji: 'mi', row: 'm', group: 'Gojuon', strokes: 3, steps: ['Tiga garis miring sejajar dari atas ke bawah'], example: 'ミルク', romajiEx: 'Miruku', meaning: 'Susu' },
      { char: 'ム', romaji: 'mu', row: 'm', group: 'Gojuon', strokes: 2, steps: ['Garis segitiga melengkung ke bawah mendatar', 'Titik miring di kanan'], example: 'ムービー', romajiEx: 'Muubii', meaning: 'Film / Video' },
      { char: 'メ', romaji: 'me', row: 'm', group: 'Gojuon', strokes: 2, steps: ['Garis miring dari kanan atas ke kiri bawah', 'Garis miring memotong dari kiri atas'], example: 'メール', romajiEx: 'Meeru', meaning: 'Email' },
      { char: 'モ', romaji: 'mo', row: 'm', group: 'Gojuon', strokes: 3, steps: ['Garis datar atas', 'Garis datar tengah', 'Garis tegak berbelok ke kanan'], example: 'モール', romajiEx: 'Mooru', meaning: 'Mall belanja' },

      // Baris Y, R, W, N
      { char: 'ヤ', romaji: 'ya', row: 'y', group: 'Gojuon', strokes: 2, steps: ['Garis datar menyiku melengkung', 'Garis tegak lurus memotong'], example: 'ヤシ', romajiEx: 'Yashi', meaning: 'Pohon kelapa' },
      { char: 'ユ', romaji: 'yu', row: 'y', group: 'Gojuon', strokes: 2, steps: ['Garis siku sudut kiri atas ke bawah', 'Garis datar bawah panjang menembus'], example: 'ユーモア', romajiEx: 'Yuumoa', meaning: 'Humor' },
      { char: 'ヨ', romaji: 'yo', row: 'y', group: 'Gojuon', strokes: 3, steps: ['Garis sudut siku atas ke bawah', 'Garis datar tengah', 'Garis datar penutup bawah'], example: 'ヨーグルト', romajiEx: 'Yooguruto', meaning: 'Yogurt' },
      { char: 'ラ', romaji: 'ra', row: 'r', group: 'Gojuon', strokes: 2, steps: ['Garis datar atas pendek', 'Garis sudut siku melengkung ke kiri'], example: 'ラジオ', romajiEx: 'Rajio', meaning: 'Radio' },
      { char: 'リ', romaji: 'ri', row: 'r', group: 'Gojuon', strokes: 2, steps: ['Garis tegak lurus kiri', 'Garis tegak melengkung kanan panjang'], example: 'リーダー', romajiEx: 'Riidaa', meaning: 'Pemimpin' },
      { char: 'ル', romaji: 'ru', row: 'r', group: 'Gojuon', strokes: 2, steps: ['Garis miring kiri', 'Garis miring kanan melengkung ke atas'], example: 'ルール', romajiEx: 'Ruuru', meaning: 'Aturan / Rule' },
      { char: 'レ', romaji: 're', row: 'r', group: 'Gojuon', strokes: 1, steps: ['Satu garis vertikal lalu membelok tajam ke kanan atas'], example: 'レストラン', romajiEx: 'Resutoran', meaning: 'Restoran' },
      { char: 'ロ', romaji: 'ro', row: 'r', group: 'Gojuon', strokes: 3, steps: ['Garis vertikal kiri', 'Garis sudut siku kanan ke bawah', 'Garis datar penutup'], example: 'ロボット', romajiEx: 'Robotto', meaning: 'Robot' },
      { char: 'ワ', romaji: 'wa', row: 'w', group: 'Gojuon', strokes: 2, steps: ['Garis vertikal pendek kiri', 'Garis sudut siku melengkung ke kiri'], example: 'ワイン', romajiEx: 'Wain', meaning: 'Anggur / Wine' },
      { char: 'ン', romaji: 'n', row: 'w', group: 'Gojuon', strokes: 2, steps: ['Titik miring pendek', 'Sapuan tegas dari kiri bawah ke kanan atas'], example: 'パン', romajiEx: 'Pan', meaning: 'Roti' }
    ],
    // Milestone Kosakata Katakana Tiap Baris
    rowMilestones: [
      {
        row: 'vowel',
        title: 'Kosakata Katakana Vokal',
        words: [
          { word: 'アイス', romaji: 'Aisu', meaning: 'Es Krim' },
          { word: 'エア', romaji: 'Ea', meaning: 'Udara' },
          { word: 'インク', romaji: 'Inku', meaning: 'Tinta' }
        ]
      },
      {
        row: 'k',
        title: 'Kosakata Katakana Vokal + K',
        words: [
          { word: 'ケーキ', romaji: 'Keeki', meaning: 'Kue Cake' },
          { word: 'ココア', romaji: 'Kokoa', meaning: 'Cokelat Kakao' },
          { word: 'カメラ', romaji: 'Kamera', meaning: 'Kamera' }
        ]
      },
      {
        row: 's',
        title: 'Kosakata Katakana Vokal + K + S',
        words: [
          { word: 'スキー', romaji: 'Sukii', meaning: 'Olahraga Ski' },
          { word: 'ソース', romaji: 'Sousu', meaning: 'Saus' },
          { word: 'シャツ', romaji: 'Shatsu', meaning: 'Kemeja' }
        ]
      },
      {
        row: 't',
        title: 'Kosakata Katakana Vokal + K + S + T',
        words: [
          { word: 'テスト', romaji: 'Tesuto', meaning: 'Ujian / Tes' },
          { word: 'タクシー', romaji: 'Takushii', meaning: 'Taksi' },
          { word: 'トイレ', romaji: 'Toire', meaning: 'Toilet' }
        ]
      }
    ],
    sentences: [
      {
        category: 'Kafe & Resto',
        japanese: 'アイスコーヒー を ひとつ ください',
        romaji: 'Aisukoohii o hitotsu kudasai',
        indonesian: 'Tolong satu es kopi',
        breakdown: [
          { word: 'アイスコーヒー', type: 'kata', note: 'Katakana: Es kopi' },
          { word: 'を', type: 'particle', note: 'Partikel penunjuk objek' },
          { word: 'ひとつ', type: 'hira', note: 'Satu buah' },
          { word: 'ください', type: 'hira', note: 'Tolong beri' }
        ],
        context: 'Kalimat paling sering digunakan saat memesan minuman di kafe seperti Starbucks.'
      },
      {
        category: 'Belanja & Toko',
        japanese: 'クレジットカード は つかえますか？',
        romaji: 'Kurejittokaado wa tsukaemasu ka?',
        indonesian: 'Apakah bisa menggunakan kartu kredit?',
        breakdown: [
          { word: 'クレジットカード', type: 'kata', note: 'Katakana: Kartu Kredit' },
          { word: 'は', type: 'particle', note: 'Partikel topik (wa)' },
          { word: 'つかえますか', type: 'hira', note: 'Bisa dipakai?' }
        ],
        context: 'Sangat berguna saat berbelanja di Jepang untuk memastikan metode pembayaran non-tunai.'
      },
      {
        category: 'Akomodasi & Wisata',
        japanese: 'ホテル の Wi-Fi パスワード は なん ですか？',
        romaji: 'Hoteru no Wi-Fi pasuwaado wa nan desu ka?',
        indonesian: 'Apa kata sandi Wi-Fi hotelnya?',
        breakdown: [
          { word: 'ホテル', type: 'kata', note: 'Katakana: Hotel' },
          { word: 'の', type: 'particle', note: 'Kepunyaan' },
          { word: 'パスワード', type: 'kata', note: 'Katakana: Password' },
          { word: 'なんですか', type: 'hira', note: 'Apa?' }
        ],
        context: 'Diucapkan ke resepsionis hotel saat check-in.'
      }
    ]
  },

  // ==========================================
  // KANJI DASAR (N5)
  // ==========================================
  kanji: {
    id: 'kanji',
    name: 'Kanji',
    japaneseName: '漢字',
    themeColor: 'emerald',
    description: 'Karakter logografik yang mewakili konsep atau arti. Pelajari cara baca ganda (Onyomi & Kunyomi) serta urutan penulisan yang tepat.',
    characters: [
      { char: '日', romaji: 'hi / nichi / bi', group: 'Alam & Waktu', strokes: 4, steps: ['Garis tegak lurus kiri', 'Garis sudut siku kanan ke bawah', 'Garis datar penutup tengah', 'Garis datar penutup alas'], example: '日曜日', romajiEx: 'Nichiyoubi', meaning: 'Hari Minggu / Matahari' },
      { char: '月', romaji: 'tsuki / getsu / gatsu', group: 'Alam & Waktu', strokes: 4, steps: ['Garis melengkung kiri ke bawah', 'Garis sudut siku kanan berkait di ujung', 'Dua garis datar sejajar di dalam'], example: '月曜日', romajiEx: 'Getsuyoubi', meaning: 'Hari Senin / Bulan' },
      { char: '火', romaji: 'hi / ka', group: 'Alam & Waktu', strokes: 4, steps: ['Titik miring kiri', 'Titik miring kanan', 'Garis lengkung tengah panjang menyapu ke kiri', 'Garis miring kanan'], example: '火曜日', romajiEx: 'Kayoubi', meaning: 'Hari Selasa / Api' },
      { char: '水', romaji: 'mizu / sui', group: 'Alam & Waktu', strokes: 4, steps: ['Garis vertikal tengah dengan kait di bawah', 'Sudut siku kiri atas', 'Garis miring kiri bawah', 'Garis miring kanan'], example: '水曜日', romajiEx: 'Suiyoubi', meaning: 'Hari Rabu / Air' },
      { char: '木', romaji: 'ki / moku', group: 'Alam & Waktu', strokes: 4, steps: ['Garis datar melintang', 'Garis vertikal memotong tengah', 'Garis miring kiri bawah', 'Garis miring kanan bawah'], example: '木曜日', romajiEx: 'Mokuyoubi', meaning: 'Hari Kamis / Pohon' },
      { char: '金', romaji: 'kane / kin', group: 'Alam & Waktu', strokes: 8, steps: ['Atap payung kiri & kanan', 'Garis datar', 'Garis datar kedua', 'Garis vertikal', 'Dua titik samping', 'Garis penutup bawah'], example: '金曜日', romajiEx: 'Kinyoubi', meaning: 'Hari Jumat / Uang / Logam' },
      { char: '土', romaji: 'tsuchi / do', group: 'Alam & Waktu', strokes: 3, steps: ['Garis datar pendek atas', 'Garis vertikal memotong tengah', 'Garis datar panjang penopang bawah'], example: '土曜日', romajiEx: 'Doyoubi', meaning: 'Hari Sabtu / Tanah' },

      { char: '山', romaji: 'yama / san', group: 'Geografi', strokes: 3, steps: ['Garis vertikal tinggi di tengah', 'Garis vertikal kiri menyiku mendatar ke kanan', 'Garis vertikal kanan'], example: '富士山', romajiEx: 'Fujisan', meaning: 'Gunung Fuji' },
      { char: '川', romaji: 'kawa / sen', group: 'Geografi', strokes: 3, steps: ['Garis melengkung kiri', 'Garis vertikal pendek di tengah', 'Garis vertikal panjang di kanan'], example: '川', romajiEx: 'Kawa', meaning: 'Sungai' },
      { char: '田', romaji: 'ta / da', group: 'Geografi', strokes: 5, steps: ['Kotak luar persegi', 'Garis vertikal membagi dua', 'Garis datar membagi dua (menjadi 4 petak sawah)'], example: '田中', romajiEx: 'Tanaka', meaning: 'Sawah / Nama marga Jepang' },

      { char: '人', romaji: 'hito / jin / nin', group: 'Manusia & Hubungan', strokes: 2, steps: ['Garis miring menyapu dari atas ke kiri bawah', 'Garis miring bertumpu dari tengah ke kanan bawah'], example: '日本人', romajiEx: 'Nihonjin', meaning: 'Orang Jepang' },
      { char: '子', romaji: 'ko / shi', group: 'Manusia & Hubungan', strokes: 3, steps: ['Garis sudut siku atas berkait', 'Garis melengkung ke kiri bawah berkait', 'Garis datar melintang di tengah'], example: '子ども', romajiEx: 'Kodomo', meaning: 'Anak-anak' },
      { char: '先', romaji: 'saki / sen', group: 'Pendidikan', strokes: 6, steps: ['Titik miring atas', 'Garis datar', 'Garis vertikal', 'Garis datar kedua', 'Kaki melengkung ke kanan'], example: '先生', romajiEx: 'Sensei', meaning: 'Guru / Terdahulu' },
      { char: '生', romaji: 'i / sei / shou', group: 'Pendidikan', strokes: 5, steps: ['Garis miring kiri atas', 'Tiga garis datar sejajar', 'Satu garis vertikal memotong'], example: '学生', romajiEx: 'Gakusei', meaning: 'Murid / Hidup' },
      { char: '学', romaji: 'mana / gaku', group: 'Pendidikan', strokes: 8, steps: ['Tiga titik atap atas', 'Atap mahkota', 'Kanji "anak" (子) di bawahnya'], example: '大学', romajiEx: 'Daigaku', meaning: 'Belajar / Universitas' },

      { char: '本', romaji: 'hon / moto', group: 'Objek & Arah', strokes: 5, steps: ['Bentuk kanji pohon (木)', 'Tambah garis datar pendek di bagian batang bawah (menandakan akar/asal)'], example: '日本', romajiEx: 'Nihon', meaning: 'Buku / Asal (Jepang)' },
      { char: '中', romaji: 'naka / chuu', group: 'Objek & Arah', strokes: 4, steps: ['Kotak persegi', 'Satu garis vertikal memotong tepat di tengah-tengah'], example: '一日中', romajiEx: 'Ichinichijuu', meaning: 'Di dalam / Sepanjang hari' },
      { char: '大', romaji: 'oo / dai / tai', group: 'Ukuran', strokes: 3, steps: ['Garis datar melintang', 'Bentuk orang melebarkan kedua kaki dan tangan'], example: '大きい', romajiEx: 'Ookii', meaning: 'Besar' },
      { char: '小', romaji: 'chii / shou', group: 'Ukuran', strokes: 3, steps: ['Garis vertikal berkait di tengah', 'Titik miring kiri', 'Titik miring kanan'], example: '小さい', romajiEx: 'Chiisai', meaning: 'Kecil' }
    ],
    sentences: [
      {
        category: 'Tanggal & Waktu',
        japanese: 'きょう は 日曜日 です',
        romaji: 'Kyou wa nichiyoubi desu',
        indonesian: 'Hari ini adalah hari Minggu',
        breakdown: [
          { word: 'きょう', type: 'hira', note: 'Hari ini' },
          { word: 'は', type: 'particle', note: 'Partikel topik' },
          { word: '日曜日', type: 'kanji', note: 'Kanji: Minggu (Nichi + You + Bi)' },
          { word: 'です', type: 'hira', note: 'Kopula sopan' }
        ],
        context: 'Digunakan saat mengobrol tentang jadwal libur akhir pekan.'
      },
      {
        category: 'Perkenalan & Profesi',
        japanese: 'わたし は だいがく の 学生 です',
        romaji: 'Watashi wa daigaku no gakusei desu',
        indonesian: 'Saya adalah mahasiswa universitas',
        breakdown: [
          { word: 'わたし', type: 'hira', note: 'Saya' },
          { word: 'は', type: 'particle', note: 'Partikel topik' },
          { word: '学生', type: 'kanji', note: 'Kanji: Siswa/Pelajar (Gaku + Sei)' },
          { word: 'です', type: 'hira', note: 'Sopan' }
        ],
        context: 'Kalimat standar perkenalan diri bagi pelajar di Jepang.'
      },
      {
        category: 'Geografi & Wisata',
        japanese: 'あの たかい 山 は 富士山 です',
        romaji: 'Ano takai yama wa Fujisan desu',
        indonesian: 'Gunung tinggi di sana itu adalah Gunung Fuji',
        breakdown: [
          { word: '山', type: 'kanji', note: 'Kanji: Gunung (Yama)' },
          { word: '富士山', type: 'kanji', note: 'Gunung Fuji (Fuji-san)' }
        ],
        context: 'Percakapan saat berwisata melihat pemandangan alam.'
      }
    ]
  },

  // ==========================================
  // BANK KOSAKATA UNTUK KUIS SUSUN KATA (SCRAMBLE)
  // ==========================================
  scrambleWords: {
    hiragana: [
      { word: 'さくら', romaji: 'sa-ku-ra', meaning: 'Bunga Sakura' },
      { word: 'くるま', romaji: 'ku-ru-ma', meaning: 'Mobil' },
      { word: 'すし', romaji: 'su-shi', meaning: 'Makanan Sushi' },
      { word: 'てがみ', romaji: 'te-ga-mi', meaning: 'Surat' },
      { word: 'ともだち', romaji: 'to-mo-da-chi', meaning: 'Sahabat / Teman' },
      { word: 'みず', romaji: 'mi-zu', meaning: 'Air' },
      { word: 'ねこ', romaji: 'ne-ko', meaning: 'Kucing' }
    ],
    katakana: [
      { word: 'カメラ', romaji: 'ka-me-ra', meaning: 'Kamera' },
      { word: 'コーヒー', romaji: 'ko-o-hi-i', meaning: 'Kopi' },
      { word: 'テレビ', romaji: 'te-re-bi', meaning: 'Televisi' },
      { word: 'ホテル', romaji: 'ho-te-ru', meaning: 'Hotel' },
      { word: 'サラダ', romaji: 'sa-ra-da', meaning: 'Salad' },
      { word: 'ミルク', romaji: 'mi-ru-ku', meaning: 'Susu' }
    ],
    kanji: [
      { word: '日曜日', romaji: 'ni-chi-you-bi', meaning: 'Hari Minggu' },
      { word: '日本人', romaji: 'ni-hon-jin', meaning: 'Orang Jepang' },
      { word: '先生', romaji: 'sen-sei', meaning: 'Guru' },
      { word: '学生', romaji: 'gaku-sei', meaning: 'Pelajar / Mahasiswa' },
      { word: '大学', romaji: 'dai-gaku', meaning: 'Universitas' }
    ]
  },

  // ==========================================
  // MODUL AWAS TERTUKAR (LOOKALIKE / CONFUSING PAIRS)
  // ==========================================
  confusingPairs: {
    hiragana: [
      {
        title: 'Trio Lengkungan Mirip: れ vs ね vs わ',
        description: 'Tiga huruf ini memiliki garis vertikal kiri yang sama persis, perbedaannya hanya ada pada bagian ekor kanannya!',
        items: [
          {
            char: 'れ',
            romaji: 're',
            audio: 'れ',
            keyFeature: 'Ekor Melompat Keluar',
            mnemonic: 'Mirip orang sedang "REbahan" dengan kaki menendang ke luar kanan.'
          },
          {
            char: 'ね',
            romaji: 'ne',
            audio: 'ね',
            keyFeature: 'Ekor Simpul Lingkaran',
            mnemonic: '"NEko" (kucing) yang memiliki simpul melingkar di ujung ekornya.'
          },
          {
            char: 'わ',
            romaji: 'wa',
            audio: 'わ',
            keyFeature: 'Lengkungan Bulat Mulus',
            mnemonic: 'Mirip angka 3 membulat ke dalam tanpa simpul (lingkaran seperti "WAjan").'
          }
        ],
        quickQuiz: {
          question: 'Mana huruf "NE" (yang memiliki simpul ekor)?',
          options: ['れ', 'ね', 'わ'],
          answer: 'ね'
        }
      },
      {
        title: 'Cermin Terbalik: さ (sa) vs ち (chi)',
        description: 'Sering tertukar karena arah lengkungannya saling berkebalikan horizontal!',
        items: [
          {
            char: 'さ',
            romaji: 'sa',
            audio: 'さ',
            keyFeature: 'Lengkungan menghadap KANAN',
            mnemonic: '"SArapan" menghadap ke kanan.'
          },
          {
            char: 'ち',
            romaji: 'chi',
            audio: 'ち',
            keyFeature: 'Lengkungan membulat menghadap KIRI',
            mnemonic: 'Mirip angka 5 terbalik, atau bentuk sendok teh ("CHInese spoon").'
          }
        ],
        quickQuiz: {
          question: 'Pilihlah huruf "SA":',
          options: ['さ', 'ち'],
          answer: 'さ'
        }
      },
      {
        title: 'Simpul Bawah: る (ru) vs ろ (ro)',
        description: 'Bentuk dasarnya sama persis seperti angka 3, bedanya di ujung ekor.',
        items: [
          {
            char: 'る',
            romaji: 'ru',
            audio: 'る',
            keyFeature: 'Punya Simpul Bulat Tertutup',
            mnemonic: '"RUmah" memiliki kunci lingkaran tertutup.'
          },
          {
            char: 'ろ',
            romaji: 'ro',
            audio: 'ろ',
            keyFeature: 'Ekor Terbuka Polos Tanpa Simpul',
            mnemonic: '"ROti" yang bolong/terbuka ekornya.'
          }
        ],
        quickQuiz: {
          question: 'Mana huruf "RO" (ekor polos tanpa simpul)?',
          options: ['る', 'ろ'],
          answer: 'ろ'
        }
      },
      {
        title: 'Mata vs Ekor: め (me) vs ぬ (nu)',
        description: 'Garis dasarnya sama-sama menyilang melingkar.',
        items: [
          {
            char: 'め',
            romaji: 'me',
            audio: 'め',
            keyFeature: 'Ujung ekor lepas mulus',
            mnemonic: 'Kata "ME" artinya mata (mata bulat polos).'
          },
          {
            char: 'ぬ',
            romaji: 'nu',
            audio: 'ぬ',
            keyFeature: 'Ujung ekor ada simpul loop',
            mnemonic: '"NUduru" (mie) yang terpelintir simpul di ujungnya.'
          }
        ],
        quickQuiz: {
          question: 'Mana huruf "NU" (dengan simpul)?',
          options: ['め', 'ぬ'],
          answer: 'ぬ'
        }
      }
    ],

    katakana: [
      {
        title: 'Raja Kebingungan: シ (shi) vs ツ (tsu)',
        description: 'Perbedaan utama ada pada kemiringan titik dan ARAH SAPUAN garis panjang!',
        items: [
          {
            char: 'シ',
            romaji: 'shi',
            audio: 'シ',
            keyFeature: 'Sapuan dari BAWAH KE ATAS ↗',
            mnemonic: 'Dua titik berjajar vertikal miring. Sapuan ditarik dari bawah naik ke atas (seperti orang tersenyum melihat ke atas).'
          },
          {
            char: 'ツ',
            romaji: 'tsu',
            audio: 'ツ',
            keyFeature: 'Sapuan dari ATAS KE BAWAH ↙',
            mnemonic: 'Dua titik berjajar mendatar di atas. Sapuan tajam ditarik dari atas jatuh ke bawah (seperti tsunami/tetesan air jatuh).'
          }
        ],
        quickQuiz: {
          question: 'Mana karakter "TSU" (sapuan jatuh dari atas)?',
          options: ['シ', 'ツ'],
          answer: 'ツ'
        }
      },
      {
        title: 'Kembar Sapuan: ソ (so) vs ン (n)',
        description: 'Sama seperti Shi vs Tsu, kuncinya adalah arah kemiringan dan sapuan garis panjangnya!',
        items: [
          {
            char: 'ソ',
            romaji: 'so',
            audio: 'ソ',
            keyFeature: 'Sapuan dari ATAS KE BAWAH ↙',
            mnemonic: 'Titik atas berdiri tegak, garis panjang ditarik dari atas meluncur ke kiri bawah.'
          },
          {
            char: 'ン',
            romaji: 'n',
            audio: 'ン',
            keyFeature: 'Sapuan dari BAWAH KE ATAS ↗',
            mnemonic: 'Titik lebih mendatar di kiri, garis panjang ditarik dari kiri bawah menyapu ke kanan atas.'
          }
        ],
        quickQuiz: {
          question: 'Mana karakter "N" (ン)?',
          options: ['ソ', 'ン'],
          answer: 'ン'
        }
      },
      {
        title: 'Variasi Sudut: ク (ku) vs ワ (wa) vs タ (ta)',
        description: 'Bentuk garis siku yang mirip dengan tambahan elemen pembeda.',
        items: [
          {
            char: 'ク',
            romaji: 'ku',
            audio: 'ク',
            keyFeature: 'Garis miring kiri + siku melengkung',
            mnemonic: 'Garis miring pendek di atas kiri, lalu sudut siku terbuka.'
          },
          {
            char: 'ワ',
            romaji: 'wa',
            audio: 'ワ',
            keyFeature: 'Garis vertikal kiri tegak lurus',
            mnemonic: 'Punya tiang tegak di kiri, bukan garis miring.'
          },
          {
            char: 'タ',
            romaji: 'ta',
            audio: 'タ',
            keyFeature: 'Ada garis strip pemotong di tengah',
            mnemonic: 'Bentuk "ku" tapi dicoret di dalamnya dengan garis miring pendek.'
          }
        ],
        quickQuiz: {
          question: 'Mana karakter "TA" (ada strip di dalam)?',
          options: ['ク', 'ワ', 'タ'],
          answer: 'タ'
        }
      }
    ],

    kanji: [
      {
        title: 'Jumlah Garis Tengah: 日 (hari/matahari) vs 目 (mata)',
        description: 'Perhatikan jumlah garis pembagi horizontal di dalam kotak persegi panjang!',
        items: [
          {
            char: '日',
            romaji: 'hi / nichi',
            audio: '日',
            keyFeature: 'Hanya SATU garis datar tengah (4 Goresan)',
            mnemonic: 'Matahari di ufuk timur (ada 1 cakrawala).'
          },
          {
            char: '目',
            romaji: 'me',
            audio: '目',
            keyFeature: 'DUA garis datar tengah (5 Goresan)',
            mnemonic: 'Bentuk mata manusia dengan 2 garis pupil.'
          }
        ],
        quickQuiz: {
          question: 'Mana Kanji "HARI / MATAHARI" (日)?',
          options: ['日', '目'],
          answer: '日'
        }
      },
      {
        title: 'Posisi Titik: 大 (besar) vs 犬 (anjing) vs 太 (gemuk)',
        description: 'Semua berbasis kanji orang besar, tetapi lokasi titik mengubah artinya secara drastis!',
        items: [
          {
            char: '大',
            romaji: 'dai / oo',
            audio: '大',
            keyFeature: 'Tanpa Titik sama sekali',
            mnemonic: 'Orang merentangkan tangan selebar-lebarnya = Besar.'
          },
          {
            char: '犬',
            romaji: 'inu / ken',
            audio: '犬',
            keyFeature: 'Titik di KANAN ATAS',
            mnemonic: 'Anjing yang sedang menjulurkan lidah atau telinga di atas.'
          },
          {
            char: '太',
            romaji: 'tai / futoi',
            audio: '太',
            keyFeature: 'Titik di BAWAH TENGAH',
            mnemonic: 'Orang yang begitu gemuk sehingga perutnya bertumpu di bawah.'
          }
        ],
        quickQuiz: {
          question: 'Mana Kanji "ANJING" (犬)?',
          options: ['大', '犬', '太'],
          answer: '犬'
        }
      },
      {
        title: 'Akar & Pohon: 木 (pohon) vs 本 (buku/asal)',
        description: 'Perhatikan garis datar penanda di bagian bawah batang.',
        items: [
          {
            char: '木',
            romaji: 'ki / moku',
            audio: '木',
            keyFeature: 'Batang polos',
            mnemonic: 'Gambar pohon alami lengkap dengan batang dan dahan ranting.'
          },
          {
            char: '本',
            romaji: 'hon / moto',
            audio: '本',
            keyFeature: 'Ada garis strip di akar bawah',
            mnemonic: 'Menandai bagian akar bawah (asal-usul) -> kertas berasal dari kayu pohon -> buku.'
          }
        ],
        quickQuiz: {
          question: 'Mana Kanji "BUKU / ASAL" (本)?',
          options: ['木', '本'],
          answer: '本'
        }
      }
    ]
  }
};
