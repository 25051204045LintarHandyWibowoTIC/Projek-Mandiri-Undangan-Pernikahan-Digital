// animasi.js - animasi muncul saat digulir

// Daftar elemen yang beranimasi: selector, arah gerak, dan apakah muncul bergantian
const ANIMASI = [
  { sel: ".sampul-mempelai .container > .row > div:first-child", jenis: "anim-kiri" },
  { sel: ".sampul-mempelai .container > .row > div:last-child", jenis: "anim-zoom" },
  { sel: ".judul", jenis: "" },
  { sel: ".kutipan", jenis: "" },
  { sel: "#mempelai .container > .row > div:first-child", jenis: "anim-kiri" },
  { sel: "#mempelai .container > .row > div:last-child", jenis: "anim-kanan" },
  { sel: "#acara .container > .row > div:first-child", jenis: "anim-kiri" },
  { sel: "#acara .container > .row > div:last-child", jenis: "anim-kanan" },
  { sel: ".grid-galeri .foto-kotak", jenis: "anim-zoom", stagger: true },
  { sel: "#galeri .container > .row > div", jenis: "", stagger: true },
  { sel: "#lokasi .container > .row > div:first-child", jenis: "anim-kiri" },
  { sel: "#lokasi .container > .row > div:last-child", jenis: "anim-kanan" },
  { sel: "#reservasi .container > *", jenis: "", stagger: true },
  { sel: "#ucapan .container > .row > div:first-child", jenis: "anim-kiri" },
  { sel: "#ucapan .container > .row > div:last-child", jenis: "anim-kanan" },
  { sel: "#hadiah .container > *", jenis: "", stagger: true },
  { sel: ".kaki", jenis: "" }
];

// Memasang kelas animasi ke elemen (dilewati bila pengguna meminta gerakan dikurangi)
function siapkanAnimasi() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ANIMASI.forEach((a) => {
    document.querySelectorAll(a.sel).forEach((el, i) => {
      el.classList.add("anim");
      if (a.jenis) el.classList.add(a.jenis);
      el.style.setProperty("--tunda", (a.stagger ? i * 0.12 : 0) + "s");
    });
  });
}

// Mengamati layar: elemen yang terlihat dimunculkan, yang keluar layar disembunyikan lagi (animasi berulang)
function mulaiAnimasi() {
  const pengamat = new IntersectionObserver((daftar) => {
    daftar.forEach((e) => {

      e.target.classList.toggle("tampil", e.isIntersecting);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".anim").forEach((el) => pengamat.observe(el));
}
