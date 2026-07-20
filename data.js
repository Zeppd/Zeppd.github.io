/* ============================================================
   DATA KATALOG MESIN
   ============================================================
   INI SATU-SATUNYA FILE YANG PERLU DIEDIT UNTUK MENGELOLA
   KATALOG. Tidak perlu menyentuh index.html atau style.css.

   CARA MENAMBAH MESIN BARU:
   1. Salin satu blok { ... } di bawah (dari tanda { sampai },)
   2. Tempel di bagian paling bawah, sebelum tanda ] penutup
   3. Ganti isinya sesuai mesin baru Anda
   4. Pastikan setiap mesin punya "id" yang berbeda-beda (angka urut)
   5. Simpan file, lalu buka ulang index.html di browser

   KETERANGAN SETIAP FIELD:
   - id           : nomor unik, wajib berbeda tiap mesin (1, 2, 3, ...)
   - kategori     : dipakai untuk filter kategori di halaman katalog.
                     Boleh pakai kategori yang sudah ada, atau ketik
                     nama kategori baru — tombol filter akan otomatis
                     muncul sendiri.
   - nama         : nama mesin yang tampil besar di kartu
   - kodeModel    : kode/tipe model mesin (tampil seperti plat nama)
   - gambar       : link/alamat gambar. Bisa link internet (https://...)
                     atau file lokal di folder images/ (contoh: "images/mesin1.jpg")
   - spesifikasiSingkat : 3-4 poin spesifikasi paling penting, muncul di kartu
   - deskripsi    : deskripsi lengkap, muncul saat kartu diklik (detail)
   - spesifikasiLengkap : daftar spesifikasi teknis lengkap (tabel)
   - harga        : boleh diisi angka/teks, atau kosongkan "" agar tampil
                     "Hubungi Kami untuk Harga"
   ============================================================ */

const DATA_MESIN = [
  {
    id: 1,
    kategori: "Mesin Pencacah",
    nama: "Mesin Chopper Rumput",
    kodeModel: "CHR-500",
    gambar: "https://placehold.co/600x450/1b2632/f3f2ee?text=CHR-500",
    spesifikasiSingkat: [
      "Kapasitas 300 - 500 kg/jam",
      "Penggerak diesel 10 HP",
      "Untuk rumput gajah, jerami, batang jagung",
      "Rangka mild steel, konstruksi kokoh"
    ],
    deskripsi:
      "Mesin pencacah/perajang rumput untuk mengolah rumput gajah, jerami, dan hijauan pakan menjadi cacahan siap pakai untuk ternak. Pisau tajam dan rangka kokoh membuat mesin ini bekerja cepat dan tahan untuk pemakaian harian skala peternakan menengah hingga besar.",
    spesifikasiLengkap: [
      { label: "Kapasitas Cacah", nilai: "300 - 500 kg/jam" },
      { label: "Penggerak", nilai: "Diesel 10 HP" },
      { label: "Transmisi", nilai: "Pulley dan V-Belt" },
      { label: "Material Rangka", nilai: "Mild Steel" },
      { label: "Dimensi (P x L x T)", nilai: "160 x 85 x 120 cm" },
      { label: "Bahan yang Bisa Diolah", nilai: "Rumput gajah, jerami, batang jagung, daun tebu" }
    ],
    harga: ""
  },
  {
    id: 2,
    kategori: "Mesin Pencacah",
    nama: "Mesin Wood Chipper",
    kodeModel: "WCP-15",
    gambar: "/images/WCP.jpg",
    spesifikasiSingkat: [
      "Kapasitas ± 1000 kg/jam",
      "Penggerak bensin 15 HP",
      "Mencacah ranting & dahan hingga diameter 10 cm",
      "Dilengkapi roda untuk mobilitas"
    ],
    deskripsi:
      "Mesin pencacah kayu dan ranting untuk mengolah limbah kebun serta sisa tebangan menjadi serpihan kayu. Hasil cacahan dapat dimanfaatkan sebagai bahan kompos, media tanam jamur, pakan ternak, hingga bahan baku biomassa.",
    spesifikasiLengkap: [
      { label: "Kapasitas Kerja", nilai: "± 1000 kg/jam" },
      { label: "Penggerak", nilai: "Motor Bensin 15 HP" },
      { label: "Diameter Maksimal Ranting", nilai: "10 cm" },
      { label: "Mobilitas", nilai: "Dilengkapi roda" },
      { label: "Hasil Olahan", nilai: "Kompos, pakan ternak, media jamur, biomassa" }
    ],
    harga: ""
  },
  {
    id: 3,
    kategori: "Mesin Penggiling",
    nama: "Mesin Diskmill",
    kodeModel: "DSM-370",
    gambar: "/images/DSM.png",
    spesifikasiSingkat: [
      "Kapasitas 150 - 180 kg/jam",
      "Penggerak diesel 12 HP",
      "Kecepatan 3000 rpm",
      "Ukuran saringan bisa disesuaikan"
    ],
    deskripsi:
      "Mesin penepung disk mill untuk menggiling bahan kering seperti jagung, kedelai, dan biji-bijian menjadi tepung kasar maupun halus. Cocok digunakan sebagai tahap penepungan sebelum proses pencampuran pakan.",
    spesifikasiLengkap: [
      { label: "Kapasitas", nilai: "150 - 180 kg/jam" },
      { label: "Kecepatan Putar", nilai: "3000 rpm" },
      { label: "Penggerak", nilai: "Diesel 12 HP" },
      { label: "Dimensi (P x L x T)", nilai: "80 x 60 x 120 cm" },
      { label: "Pilihan Saringan", nilai: "1 - 5 mm" }
    ],
    harga: ""
  },
  {
    id: 4,
    kategori: "Mesin Penggiling",
    nama: "Mesin Hammer Mill",
    kodeModel: "HMR-200",
    gambar: "https://placehold.co/600x450/1b2632/f3f2ee?text=HMR-200",
    spesifikasiSingkat: [
      "Kapasitas 200 kg/jam",
      "Penggerak diesel 20 HP",
      "Untuk jagung, bonggol jagung & biji-bijian kering",
      "Rangka plat besi mild steel"
    ],
    deskripsi:
      "Mesin hammer mill untuk menghancurkan dan menepungkan bahan keras seperti jagung, bonggol jagung, dan biji-bijian kering menjadi tepung pakan ternak. Konstruksi rangka kokoh dan siap untuk pemakaian intensif setiap hari.",
    spesifikasiLengkap: [
      { label: "Kapasitas", nilai: "200 kg/jam" },
      { label: "Penggerak", nilai: "Diesel 20 HP" },
      { label: "Dimensi (P x L x T)", nilai: "135 x 97 x 134 cm" },
      { label: "Material Rangka", nilai: "Plat Besi Mild Steel" },
      { label: "Bahan yang Bisa Diolah", nilai: "Jagung, bonggol jagung, biji-bijian kering" }
    ],
    harga: ""
  },
  {
    id: 5,
    kategori: "Mesin Pengeringan",
    nama: "Mesin Oven Pengering",
    kodeModel: "OVP-12R",
    gambar: "https://placehold.co/600x450/1b2632/f3f2ee?text=OVP-12R",
    spesifikasiSingkat: [
      "Kapasitas 12 rak (± 100 kg)",
      "Sumber panas kompor LPG / heater listrik",
      "Suhu dapat diatur sesuai bahan",
      "Dilengkapi blower sirkulasi panas"
    ],
    deskripsi:
      "Oven pengering serbaguna untuk mengeringkan pelet pakan, hasil pertanian, dan produk olahan lainnya sebagai pengganti penjemuran matahari. Suhu dan waktu pengeringan dapat diatur sesuai kebutuhan bahan agar hasil lebih konsisten.",
    spesifikasiLengkap: [
      { label: "Kapasitas", nilai: "12 rak (± 100 kg)" },
      { label: "Dimensi Total", nilai: "50 x 70 x 170 cm" },
      { label: "Sumber Panas", nilai: "Kompor LPG / Heater Listrik" },
      { label: "Sirkulasi Panas", nilai: "Blower" },
      { label: "Material Rak", nilai: "Besi / Stainless Steel" }
    ],
    harga: ""
  },
  {
    id: 6,
    kategori: "Mesin Pengadukan",
    nama: "Mesin Mixer Horizontal (Ribbon Blender)",
    kodeModel: "MMH-200",
    gambar: "/images/MMH.png",
    spesifikasiSingkat: [
      "Kapasitas 200 - 250 kg/proses",
      "Sistem pengaduk Horizontal Ribbon Blender",
      "Hasil pencampuran homogen, cepat, dan merata",
      "Cocok untuk pakan ternak, pupuk, kompos, dan berbagai bahan serbuk maupun granular"
    ],
    deskripsi:
      "Mesin Mixer Horizontal (Ribbon Blender) dirancang untuk mencampur bahan secara cepat dan merata. Cocok digunakan untuk pakan ternak, pupuk, kompos, serta berbagai bahan berbentuk serbuk maupun granula. Konstruksi kokoh, mudah dioperasikan, dan menghasilkan campuran yang homogen.",
    spesifikasiLengkap: [
      { label: "Kapasitas", nilai: "200 - 250 kg/proses" },
      { label: "Tipe Pengaduk", nilai: "Horizontal Ribbon Blender (Double Ribbon)" },
      { label: "Material Body", nilai: "2Plat Besi Mild Steel / Galvanis (opsional Stainless Steel)" },
      { label: "Sistem Penggerak", nilai: "Motor Listrik + Gear Reducer" },
      { label: "Waktu Pengadukan", nilai: "± 15 - 20 menit/proses" }
    ],
    harga: ""
  },
  {
    id: 7,
    kategori: "Mesin Pencetak Pelet",
    nama: "Mesin Granulator Pelet",
    kodeModel: "GRN-150",
    gambar: "https://placehold.co/600x450/1b2632/f3f2ee?text=GRN-150",
    spesifikasiSingkat: [
      "Kapasitas 100 - 150 kg/jam",
      "Penggerak diesel 12 HP",
      "Diameter cetakan 2 - 12 mm (sesuai pesanan)",
      "Untuk pelet pakan ternak, ikan & biomassa"
    ],
    deskripsi:
      "Mesin granulator/pencetak pelet untuk mengubah adonan pakan menjadi butiran pelet siap pakai. Diameter cetakan dapat disesuaikan untuk berbagai jenis pelet, mulai dari pakan ikan hingga pakan ternak besar.",
    spesifikasiLengkap: [
      { label: "Kapasitas", nilai: "100 - 150 kg/jam" },
      { label: "Penggerak", nilai: "Diesel 12 HP" },
      { label: "Dimensi (P x L x T)", nilai: "130 x 65 x 115 cm" },
      { label: "Diameter Cetakan", nilai: "2 - 12 mm (sesuai kebutuhan)" },
      { label: "Hasil Olahan", nilai: "Pelet pakan ternak, pakan ikan, biomassa" }
    ],
    harga: ""
  }

  /* ---- TAMBAHKAN MESIN BARU DI BAWAH INI ----
  ,{
    id: 8,
    kategori: "Kategori Mesin Anda",
    nama: "Nama Mesin",
    kodeModel: "KODE-MODEL",
    gambar: "https://placehold.co/600x450/1b2632/f3f2ee?text=Nama+Mesin",
    spesifikasiSingkat: [
      "Poin spesifikasi 1",
      "Poin spesifikasi 2",
      "Poin spesifikasi 3"
    ],
    deskripsi: "Tulis deskripsi lengkap mesin di sini.",
    spesifikasiLengkap: [
      { label: "Nama Spesifikasi", nilai: "Nilai" }
    ],
    harga: ""
  }
  */
];

/* ============================================================
   PROFIL PERUSAHAAN & KONTAK
   Ubah bagian ini sesuai data perusahaan Anda.
   Akan otomatis tampil di header, footer, dan tombol WhatsApp.

   PENTING soal nomorWhatsapp:
   Isi HANYA dengan angka, diawali kode negara 62 (tanpa +, spasi,
   atau strip). Contoh nomor 0856-4997-2277 ditulis: "6285649972277"
   ============================================================ */
const PROFIL_PERUSAHAAN = {
  namaPerusahaan: "Bengkel Las JoyoLanggeng Teknik",
  tagline: "Mesin Pengolahan Pakan Ternak & Hasil Pertanian yang Tangguh dan Terpercaya",
  deskripsiSingkat:
    "Kami membuat dan menyediakan mesin-mesin pengolahan pakan ternak dan hasil pertanian, mulai dari mesin pencacah, penggiling, pengering, pengaduk, hingga pencetak pelet. Dipercaya oleh peternak dan pelaku usaha pakan di berbagai daerah.",
  alamat: "Desa Bendosewu, Kecamatan Talun, Kabupaten Blitar, Jawa Timur, Indonesia",
  telepon: "+62 856-4997-2277",
  nomorWhatsapp: "6285649972277",
  email: "joyolanggeng@gmail.com",
  jamOperasional: "Senin - Sabtu, 08.30 - 16.30 WIB"
};
