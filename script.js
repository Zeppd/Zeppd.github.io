/* ============================================================
   SCRIPT.JS
   File ini TIDAK PERLU diedit untuk menambah mesin baru.
   Cukup edit data.js — halaman ini akan otomatis menyesuaikan.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  isiProfilPerusahaan();
  const kategoriAktif = { value: "Semua" };
  renderFilterBar(kategoriAktif);
  renderKatalog(kategoriAktif.value);
  pasangModal();
  pasangNavMobile();
  document.getElementById("footerYear").textContent = new Date().getFullYear();
});

/* ---------- Bersihkan nomor WhatsApp apa pun formatnya ----------
   Menerima "6285...", "+62 856-...", "0856-4997-2277", dst, dan
   selalu menghasilkan angka bersih berawalan 62 untuk link wa.me.
   Ini mencegah link WhatsApp rusak akibat spasi/strip/tanda +. */
function bersihkanNomorWA(nomor) {
  let digit = String(nomor || "").replace(/\D/g, "");
  if (digit.startsWith("0")) digit = "62" + digit.slice(1);
  if (!digit.startsWith("62")) digit = "62" + digit;
  return digit;
}

/* ---------- Profil perusahaan (header, hero, footer, kontak) ---------- */
function isiProfilPerusahaan() {
  const p = PROFIL_PERUSAHAAN;
  document.getElementById("brandName").textContent = p.namaPerusahaan;
  document.getElementById("heroTagline").textContent = p.tagline;
  document.getElementById("heroDesc").textContent = p.deskripsiSingkat;
  document.getElementById("footerName").textContent = p.namaPerusahaan;
  document.getElementById("footerHours").textContent = p.jamOperasional;
  document.title = p.namaPerusahaan + " — Katalog Mesin Industri";

  const nomorWA = bersihkanNomorWA(p.nomorWhatsapp);
  const waLink = `https://wa.me/${nomorWA}?text=${encodeURIComponent("Halo, saya ingin bertanya tentang katalog mesin Anda.")}`;
  document.getElementById("contactWA").href = waLink;
  document.getElementById("contactWAText").textContent = p.telepon || ("+" + nomorWA);

  document.getElementById("contactPhone").href = "tel:+" + nomorWA;
  document.getElementById("contactPhoneText").textContent = p.telepon;

  document.getElementById("contactEmail").href = "mailto:" + p.email;
  document.getElementById("contactEmailText").textContent = p.email;

  document.getElementById("contactAddress").textContent = p.alamat;
  document.getElementById("contactAddressLink").href =
    p.linkMaps || ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.alamat));
}

/* ---------- Filter kategori ---------- */
function renderFilterBar(kategoriAktif) {
  const bar = document.getElementById("filterBar");
  const kategoriUnik = ["Semua", ...new Set(DATA_MESIN.map(m => m.kategori))];

  bar.innerHTML = kategoriUnik.map(kat =>
    `<button class="filter-chip${kat === "Semua" ? " active" : ""}" data-kategori="${kat}">${kat}</button>`
  ).join("");

  bar.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      bar.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      kategoriAktif.value = chip.dataset.kategori;
      renderKatalog(kategoriAktif.value);
    });
  });
}

/* ---------- Grid katalog ---------- */
function renderKatalog(kategori) {
  const grid = document.getElementById("catalogGrid");
  const empty = document.getElementById("catalogEmpty");

  const daftar = kategori === "Semua"
    ? DATA_MESIN
    : DATA_MESIN.filter(m => m.kategori === kategori);

  if (daftar.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = daftar.map(m => {
    return `
      <article class="machine-card" data-id="${m.id}" tabindex="0">
        <div class="machine-card-media">
          <img src="${m.gambar}" alt="${m.nama}" loading="lazy">
        </div>
        <div class="machine-card-body">
          <span class="machine-kode">${m.kodeModel}</span>
          <h3 class="machine-nama">${m.nama}</h3>
          <ul class="machine-spec-list">
            ${m.spesifikasiSingkat.slice(0, 4).map(s => `<li>${s}</li>`).join("")}
          </ul>
          <div class="machine-card-footer">
            <span class="machine-harga">${m.harga ? m.harga : "Hubungi untuk Harga"}</span>
            <span class="link-detail">Lihat Detail &rarr;</span>
          </div>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll(".machine-card").forEach(card => {
    const buka = () => bukaModal(Number(card.dataset.id));
    card.addEventListener("click", buka);
    card.addEventListener("keydown", e => { if (e.key === "Enter") buka(); });
  });
}

/* ---------- Modal detail mesin ---------- */
function pasangModal() {
  const overlay = document.getElementById("modalOverlay");
  document.getElementById("modalClose").addEventListener("click", tutupModal);
  overlay.addEventListener("click", e => { if (e.target === overlay) tutupModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") tutupModal(); });
}

function bukaModal(id) {
  const m = DATA_MESIN.find(item => item.id === id);
  if (!m) return;

  const p = PROFIL_PERUSAHAAN;
  const nomorWA = bersihkanNomorWA(p.nomorWhatsapp);
  const waLink = `https://wa.me/${nomorWA}?text=${encodeURIComponent("Halo, saya tertarik dengan " + m.nama + " (" + m.kodeModel + "). Bisa minta info lebih lanjut?")}`;

  document.getElementById("modalContent").innerHTML = `
    <div class="modal-media"><img src="${m.gambar}" alt="${m.nama}"></div>
    <div class="modal-body">
      <span class="modal-kode">${m.kodeModel} — ${m.kategori}</span>
      <h3 id="modalTitle">${m.nama}</h3>
      <p class="modal-desc">${m.deskripsi}</p>
      <table class="spec-table">
        ${m.spesifikasiLengkap.map(s => `<tr><td>${s.label}</td><td>${s.nilai}</td></tr>`).join("")}
      </table>
      <div class="modal-actions">
        <a class="btn btn-accent" href="${waLink}" target="_blank" rel="noopener">Minta Penawaran via WhatsApp</a>
        <a class="btn btn-ghost" style="border-color:#E1DDD3; color:#1B2632;" href="mailto:${p.email}">Kirim Email</a>
      </div>
    </div>
  `;
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function tutupModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------- Menu mobile ---------- */
function pasangNavMobile() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}