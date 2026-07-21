"""
============================================================
KONVERSI GAMBAR KE WEBP
============================================================
Skrip ini membaca semua foto .jpg/.jpeg/.png dari folder images/,
lalu menyimpan hasil konversinya sebagai .webp ke folder TERPISAH
bernama imgwebp/ — folder images/ (foto asli) tidak disentuh sama
sekali. Ukuran file .webp bisa 30-70% lebih kecil dari JPG/PNG
dengan kualitas visual yang hampir sama, jadi website jadi lebih
ringan dan cepat dibuka.

Sekalian, foto yang lebarnya kelewat besar (misal hasil jepretan HP
3000px+) akan otomatis dikecilkan ke maksimal 1600px, karena
website ini tidak butuh resolusi sebesar itu.

CARA PAKAI (dijalankan manual di komputer sendiri):
1. Install Pillow (cukup sekali saja):
       pip install Pillow
2. Taruh skrip ini SEJAJAR dengan folder images/ (di folder utama
   website, bukan di dalam folder images/ itu sendiri)
3. Jalankan lewat terminal/command prompt:
       python konversi_ke_webp.py
4. Skrip akan membuat folder imgwebp/ (kalau belum ada) lalu mengisi
   file .webp di sana. File asli di images/ TIDAK diubah/dihapus.
5. Di data.js, arahkan field gambar ke folder imgwebp/, contoh:
   "images/WCP.jpg"  ->  "imgwebp/WCP.webp"

CATATAN SOAL OTOMATISASI:
Kalau Anda ingin proses ini berjalan OTOMATIS setiap kali commit foto
baru ke GitHub (tanpa menjalankan apa pun secara manual di komputer),
lihat file .github/workflows/konversi-webp.yml yang disertakan —
itu menjalankan skrip ini otomatis di server GitHub tiap kali ada
push berisi perubahan ke folder images/, lalu hasil imgwebp/-nya
otomatis ikut ter-commit ke repo.
============================================================
"""

from pathlib import Path
from PIL import Image

FOLDER_SUMBER = Path("imgip")     # folder tempat foto asli (.jpg/.png)
FOLDER_KELUARAN = Path("imgop")  # folder tempat hasil .webp disimpan
KUALITAS_WEBP = 80                 # 0-100, 80 sudah tajam tapi tetap ringan
LEBAR_MAKSIMAL = 1600              # px, foto lebih lebar dari ini akan dikecilkan
FORMAT_SUMBER = (".jpg", ".jpeg", ".png")


def konversi_satu_file(path_asli: Path) -> None:
    path_baru = FOLDER_KELUARAN / (path_asli.stem + ".webp")

    if path_baru.exists():
        print(f"  Lewati (sudah ada) : {path_baru.name}")
        return

    with Image.open(path_asli) as img:
        # Amankan mode warna yang tidak selalu didukung penuh saat
        # disimpan ke WEBP (misalnya PNG palet/CMYK dari beberapa
        # aplikasi desain).
        if img.mode == "P":
            img = img.convert("RGBA" if "transparency" in img.info else "RGB")
        elif img.mode == "CMYK":
            img = img.convert("RGB")

        # Kecilkan kalau lebih lebar dari batas maksimal
        if img.width > LEBAR_MAKSIMAL:
            rasio = LEBAR_MAKSIMAL / img.width
            ukuran_baru = (LEBAR_MAKSIMAL, round(img.height * rasio))
            img = img.resize(ukuran_baru, Image.LANCZOS)

        img.save(path_baru, "WEBP", quality=KUALITAS_WEBP)

    ukuran_lama = path_asli.stat().st_size / 1024
    ukuran_baru = path_baru.stat().st_size / 1024
    hemat = 100 - (ukuran_baru / ukuran_lama * 100) if ukuran_lama else 0
    print(f"  {path_asli.name:<20} -> {path_baru.as_posix():<28} "
          f"({ukuran_lama:.0f} KB -> {ukuran_baru:.0f} KB, hemat {hemat:.0f}%)")


def main() -> None:
    if not FOLDER_SUMBER.exists():
        print(f"Folder '{FOLDER_SUMBER}/' tidak ditemukan.")
        print("Pastikan skrip ini dijalankan dari folder utama website Anda.")
        return

    FOLDER_KELUARAN.mkdir(exist_ok=True)

    file_ditemukan = sorted(
        p for p in FOLDER_SUMBER.iterdir()
        if p.is_file() and p.suffix.lower() in FORMAT_SUMBER
    )

    if not file_ditemukan:
        print(f"Tidak ada file .jpg/.jpeg/.png di folder '{FOLDER_SUMBER}/'.")
        return

    print(f"Ditemukan {len(file_ditemukan)} gambar. Memulai konversi...\n")
    for path_asli in file_ditemukan:
        try:
            konversi_satu_file(path_asli)
        except Exception as e:
            print(f"  Gagal konversi {path_asli.name}: {e}")

    print(f"\nSelesai! Hasilnya ada di folder '{FOLDER_KELUARAN}/'")
    print("Langkah selanjutnya: buka data.js, arahkan field gambar mesin")
    print(f"yang sudah dikonversi ke folder '{FOLDER_KELUARAN}/', contoh:")
    print('  "images/WCP.jpg"  ->  "imgwebp/WCP.webp"')


if __name__ == "__main__":
    main()
