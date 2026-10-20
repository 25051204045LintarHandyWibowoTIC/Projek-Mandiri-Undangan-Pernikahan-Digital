// main.js - mengisi data, membuka cover, musik, dan menjalankan semuanya (file terakhir)

// Mengisi semua teks bertanda data-isi dari DATA
function isiData() {
  DATA.tanggalPanjang = formatTanggal(DATA.tanggalAkad);
  document.querySelectorAll("[data-isi]").forEach((el) => {
    const kunci = el.getAttribute("data-isi");
    if (DATA[kunci] !== undefined) el.innerHTML = DATA[kunci];
  });
  document.getElementById("noRek").textContent = DATA.noRek;

  document.getElementById("monogram").textContent =
    DATA.pria.charAt(0).toUpperCase() + " & " + DATA.wanita.charAt(0).toUpperCase();
  document.title = `Undangan ${DATA.pria} & ${DATA.wanita}`;
}

// Mengambil nama tamu dari alamat (?to=Nama) lalu mengisinya di cover dan form
function isiNamaTamu() {
  const param = new URLSearchParams(window.location.search).get("to");
  if (param) {
    document.getElementById("namaTamu").textContent = param;
    document.getElementById("rNama").value = param;
    document.getElementById("uNama").value = param;
  }
}

// Membuka cover, menyalakan musik, dan memulai animasi
function bukaUndangan() {
  document.getElementById("cover").classList.add("terbuka");
  document.body.classList.remove("terkunci");
  setTimeout(() => document.getElementById("cover").style.display = "none", 1100);
  toggleMusik(true);
  setTimeout(mulaiAnimasi, 500);
}

// Memutar atau menjeda musik
function toggleMusik(paksaPutar) {
  const audio = document.getElementById("musik");
  const tombol = document.getElementById("btnMusik");
  if (paksaPutar === true || audio.paused) {
    audio.play().catch(() => console.warn("Musik belum tersedia / diblokir browser"));
  } else {
    audio.pause();
  }
  tombol.classList.toggle("putar", !audio.paused);
}

// Dijalankan saat halaman dimuat
buatKilau(document.getElementById("beranda"), 10);
siapkanAnimasi();
document.querySelectorAll(".sampul-mempelai, .bagian").forEach((el) => buatKelopak(el, 7));
isiData();
isiNamaTamu();
tampilUcapan();
perbaruiJmlHadir();
periksaBuktiTersimpan();
hitungMundur();
// Hitung mundur diperbarui tiap detik
timerHitung = setInterval(hitungMundur, 1000);
