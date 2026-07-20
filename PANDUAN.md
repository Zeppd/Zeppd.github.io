# Panduan Mengelola Website Katalog Mesin

## Struktur File
```
mesin-katalog/
├── index.html     ← struktur halaman (jarang perlu diubah)
├── style.css      ← tampilan & warna (jarang perlu diubah)
├── script.js      ← logika halaman (tidak perlu diubah)
├── data.js        ← DATA KATALOG — ini yang Anda edit sehari-hari
└── images/        ← taruh foto mesin Anda di sini (opsional)
```

## Menambah Mesin Baru
1. Buka file **data.js** dengan aplikasi Notepad atau editor teks apa pun.
2. Cari komentar `TAMBAHKAN MESIN BARU DI BAWAH INI` di dekat akhir daftar `DATA_MESIN`.
3. Salin satu blok contoh mesin, tempel, lalu isi datanya:
   - `id`: angka unik, tidak boleh sama dengan mesin lain
   - `kategori`: nama kategori (dipakai otomatis untuk tombol filter)
   - `nama`, `kodeModel`, `gambar`, `spesifikasiSingkat`, `deskripsi`, `spesifikasiLengkap`, `harga`
4. Simpan file, lalu buka kembali `index.html` di browser (double click) — mesin baru langsung muncul.

## Mengganti Foto Mesin
- Cara termudah: taruh file foto di folder `images/` (misalnya `images/mesin-baru.jpg`),
  lalu isi `gambar: "images/mesin-baru.jpg"` pada data mesin tersebut.
- Bisa juga memakai link foto dari internet, isi `gambar: "https://..."`.

## Mengubah Data Perusahaan (nama, WhatsApp, alamat, dll)
Masih di file **data.js**, cari bagian `PROFIL_PERUSAHAAN` di paling bawah dan ubah sesuai data Anda.

**Nomor WhatsApp** (`nomorWhatsapp`) sebaiknya diisi angka saja, diawali kode negara `62`,
tanpa spasi/strip/tanda `+`. Contoh nomor 0856-4997-2277 ditulis: `"6285649972277"`.
Sebagai jaga-jaga, website ini sekarang otomatis membersihkan format nomor (menghapus spasi,
strip, atau tanda +) sebelum membuat link WhatsApp — jadi tombol WA tetap berfungsi walau
formatnya sedikit berbeda dari contoh di atas.

## Menghapus atau Menyembunyikan Mesin
Hapus seluruh blok `{ ... }` mesin tersebut dari `data.js`, atau ubah `status` menjadi `"Habis"`
agar tetap tampil tapi dengan label berbeda.

## Mengunggah ke Internet
File-file ini adalah website statis biasa. Anda bisa mengunggahnya ke layanan hosting gratis
seperti Netlify, Vercel, atau GitHub Pages — tinggal unggah seluruh folder `mesin-katalog`.
