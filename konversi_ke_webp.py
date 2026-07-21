"""
============================================================
KONVERSI GAMBAR KE WEBP
============================================================
Skrip ini mengubah semua foto .jpg/.jpeg/.png di folder images/
menjadi format .webp — ukuran filenya bisa 30-70% lebih kecil
dari JPG/PNG dengan kualitas visual yang hampir sama, jadi website
jadi lebih ringan dan cepat dibuka.

Sekalian, foto yang lebarnya kelewat besar (misal hasil jepretan HP
3000px+) akan otomatis dikecilkan ke maksimal 1600px, karena
website ini tidak butuh resolusi sebesar itu.

CARA PAKAI:
1. Install Pillow (cukup sekali saja di komputer Anda):
       pip install Pillow
2. Taruh skrip ini SEJAJAR dengan folder images/ (di folder utama
   website, bukan di dalam folder images/ itu sendiri)
3. Jalankan lewat terminal/command prompt:
       python konversi_ke_webp.py
4. Skrip akan membuat file .webp baru di folder images/ yang sama,
   file asli (.jpg/.png) TIDAK dihapus otomatis — silakan cek dulu
   hasilnya di browser, baru hapus manual kalau sudah yakin oke.
5. Jangan lupa update data.js: ganti akhiran nama file gambar mesin
   yang sudah dikonversi dari .jpg/.png menjadi .webp
   Contoh: "images/WCP.jpg"  ->  "images/WCP.webp"
============================================================
"""

from pathlib import Path
from PIL import Image

FOLDER_GAMBAR = Path("images")   # folder yang akan diproses
KUALITAS_WEBP = 80               # 0-100, 80 sudah tajam tapi tetap ringan
LEBAR_MAKSIMAL = 1600            # px, foto lebih lebar dari ini akan dikecilkan
FORMAT_SUMBER = (".jpg", ".jpeg", ".png")


def konversi_satu_file(path_asli: Path) -> None:
    path_baru = path_asli.with_suffix(".webp")

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
    print(f"  {path_asli.name:<20} -> {path_baru.name:<20} "
          f"({ukuran_lama:.0f} KB -> {ukuran_baru:.0f} KB, hemat {hemat:.0f}%)")


def main() -> None:
    if not FOLDER_GAMBAR.exists():
        print(f"Folder '{FOLDER_GAMBAR}/' tidak ditemukan.")
        print("Pastikan skrip ini dijalankan dari folder utama website Anda.")
        return

    file_ditemukan = sorted(
        p for p in FOLDER_GAMBAR.iterdir()
        if p.is_file() and p.suffix.lower() in FORMAT_SUMBER
    )

    if not file_ditemukan:
        print(f"Tidak ada file .jpg/.jpeg/.png di folder '{FOLDER_GAMBAR}/'.")
        return

    print(f"Ditemukan {len(file_ditemukan)} gambar. Memulai konversi...\n")
    for path_asli in file_ditemukan:
        try:
            konversi_satu_file(path_asli)
        except Exception as e:
            print(f"  Gagal konversi {path_asli.name}: {e}")

    print("\nSelesai!")
    print("Langkah selanjutnya: buka data.js, lalu ganti akhiran nama file")
    print("gambar mesin yang sudah dikonversi dari .jpg/.png menjadi .webp")


if __name__ == "__main__":
    main()
