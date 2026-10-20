// bukti.js - bukti kehadiran yang digambar di kanvas, bisa diunduh

// Warna tulisan pada bukti
const WARNA = { emas: "#9b7425", pink: "#c24a73" };
// Nama hari huruf besar
const HARI_ID = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
// Bukti yang sedang ditampilkan
let buktiTerakhir = null;

// Membuat kode unik, contoh: RSV-LE-4F9K2
function buatKode() {
  const huruf = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let acak = "";
  for (let i = 0; i < 5; i++) acak += huruf.charAt(Math.floor(Math.random() * huruf.length));
  return `RSV-${DATA.pria.charAt(0).toUpperCase()}${DATA.wanita.charAt(0).toUpperCase()}-${acak}`;
}

// Membuang tag HTML dari teks agar bisa digambar di kanvas
function bersihkan(teks) {
  return String(teks).replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");
}

// Menggambar seluruh bukti di kanvas (tata letak dihitung otomatis sesuai jumlah nama)
async function gambarBukti(data) {
  const kanvas = document.getElementById("kanvasBukti");
  const c = kanvas.getContext("2d");
  const latar = document.getElementById("latarBukti");
  if (!latar.complete) await new Promise((selesai) => { latar.onload = selesai; latar.onerror = selesai; });
  await Promise.all(['400 40px "Great Vibes"', '500 40px "Cormorant Garamond"', '600 40px "Cormorant Garamond"',
                     '300 40px "Jost"', '500 40px "Jost"'].map((f) => document.fonts.load(f)));

  c.clearRect(0, 0, 1024, 1536);
  c.drawImage(latar, 0, 0, 1024, 1536);
  c.textBaseline = "middle";
  c.textAlign = "left";
  const X = 512;

  // Menulis huruf kapital berspasi di tengah; otomatis mengecil bila terlalu lebar
  function spasi(teks, y, o = {}) {
    const { x = X, font = "Jost", bobot = 500, ukuran = 26, jarak = 3, warna = WARNA.emas, maks = 500 } = o;
    let u = ukuran, lebar;
    do {
      c.font = `${bobot} ${u}px "${font}"`;
      lebar = -jarak;
      for (const huruf of teks) lebar += c.measureText(huruf).width + jarak;
      u -= 1;
    } while (lebar > maks && u > 10);
    c.fillStyle = warna;
    let posisi = x - lebar / 2;
    for (const huruf of teks) { c.fillText(huruf, posisi, y); posisi += c.measureText(huruf).width + jarak; }
  }

  // Menggambar garis hiasan dengan berlian di tengah
  function ornamen(y, panjang) {
    c.strokeStyle = WARNA.emas; c.fillStyle = WARNA.emas; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(X - panjang, y); c.lineTo(X - 20, y); c.moveTo(X + 20, y); c.lineTo(X + panjang, y); c.stroke();
    c.beginPath(); c.moveTo(X, y - 8); c.lineTo(X + 8, y); c.lineTo(X, y + 8); c.lineTo(X - 8, y); c.closePath(); c.fill();
  }

  // Memecah alamat panjang menjadi beberapa baris
  function bungkus(teks, lebarMaks) {
    const kata = teks.split(" "); const baris = []; let sekarang = "";
    kata.forEach((k) => {
      const coba = sekarang ? sekarang + " " + k : k;
      if (coba.length * 15 > lebarMaks && sekarang) { baris.push(sekarang); sekarang = k; } else { sekarang = coba; }
    });
    if (sekarang) baris.push(sekarang);
    return baris;
  }

  // Daftar bagian bukti: tiap bagian punya tinggi dan cara menggambar
  const blok = [];
  const tambah = (h, gambar) => blok.push({ h, gambar });

  tambah(30, (y) => ornamen(y, 150));
  tambah(44, (y) => spasi("BUKTI RESERVASI", y, { font: "Cormorant Garamond", bobot: 600, ukuran: 32, jarak: 6 }));
  tambah(130, (y) => spasi("HADIR", y, { font: "Cormorant Garamond", bobot: 500, ukuran: 124, jarak: 12, warna: WARNA.pink, maks: 480 }));
  tambah(30, (y) => ornamen(y, 170));
  tambah(40, (y) => spasi("ATAS NAMA", y, { ukuran: 26, jarak: 5 }));

  // Nama-nama tamu: semakin banyak nama, huruf semakin kecil
  const n = data.nama.length;
  const ukuranNama = [0, 96, 78, 64, 54, 46][n];
  data.nama.forEach((nama) => {
    tambah(ukuranNama * 1.2, (y) => {
      let u = ukuranNama, lebar;
      do { c.font = `400 ${u}px "Great Vibes"`; lebar = c.measureText(nama).width; u -= 2; } while (lebar > 500 && u > 24);
      c.fillStyle = WARNA.pink; c.textAlign = "center"; c.fillText(nama, X, y); c.textAlign = "left";
    });
  });

  tambah(40, (y) => spasi(`${n} TAMU  •  ${data.kode}`, y, { ukuran: 24, jarak: 3 }));

  // Blok tanggal: hari | bulan, tanggal, tahun | jam acara
  tambah(150, (y) => {
    const d = DATA.tanggalAkad;
    const jam = (teks) => (bersihkan(teks).match(/\d{2}[.:]\d{2}/) || ["--.--"])[0];
    const zona = (bersihkan(DATA.jamAkad).match(/WIB|WITA|WIT/) || ["WIB"])[0];
    c.strokeStyle = WARNA.emas; c.lineWidth = 1.5;
    c.beginPath(); c.moveTo(448, y - 62); c.lineTo(448, y + 62); c.moveTo(576, y - 62); c.lineTo(576, y + 62); c.stroke();
    spasi(HARI_ID[d.getDay()], y, { x: 350, ukuran: 24, jarak: 3, maks: 170 });
    spasi(NAMA_BULAN[d.getMonth()].toUpperCase(), y - 52, { x: 512, ukuran: 24, jarak: 4, maks: 112 });
    c.font = '300 92px "Jost"'; c.fillStyle = WARNA.pink; c.textAlign = "center"; c.fillText(String(d.getDate()), 512, y + 2); c.textAlign = "left";
    spasi(String(d.getFullYear()), y + 56, { x: 512, ukuran: 24, jarak: 4, maks: 112 });
    spasi("AKAD " + jam(DATA.jamAkad), y - 22, { x: 677, ukuran: 22, jarak: 2, maks: 170 });
    spasi("RESEPSI " + jam(DATA.jamResepsi), y + 12, { x: 677, ukuran: 22, jarak: 2, maks: 170 });
    spasi(zona, y + 46, { x: 677, ukuran: 20, jarak: 3, maks: 170 });
  });

  // Lokasi dan kalimat penutup
  tambah(50, (y) => spasi(DATA.tempat.toUpperCase(), y, { font: "Cormorant Garamond", bobot: 600, ukuran: 36, jarak: 4, warna: WARNA.pink }));
  bungkus(bersihkan(DATA.alamat).toUpperCase(), 480).forEach((baris) => tambah(30, (y) => spasi(baris, y, { ukuran: 22, jarak: 2 })));
  tambah(30, (y) => ornamen(y, 80));
  tambah(40, (y) => spasi("TUNJUKKAN BUKTI INI SAAT TIBA", y, { ukuran: 20, jarak: 3 }));
  tambah(34, (y) => spasi("TERIMA KASIH SUDAH HADIR", y, { ukuran: 26, jarak: 3, warna: WARNA.pink, maks: 450 }));
  tambah(34, (y) => spasi("BERSAMA KAMI MERAYAKAN CINTA", y, { ukuran: 26, jarak: 3, warna: WARNA.pink, maks: 450 }));

  // Menyusun semua bagian di tengah area dalam lengkungan latar
  const awal = 285, akhir = 1395;
  const total = blok.reduce((jumlah, b) => jumlah + b.h, 0);
  const jeda = Math.max(0, Math.min(26, (akhir - awal - total) / (blok.length - 1)));
  let y = awal + (akhir - awal - (total + jeda * (blok.length - 1))) / 2;
  blok.forEach((b) => { b.gambar(y + b.h / 2); y += b.h + jeda; });
}

// Menggambar bukti lalu membuka windownya
async function tampilBukti(data) {
  buktiTerakhir = data;
  await gambarBukti(data);
  bootstrap.Modal.getOrCreateInstance(document.getElementById("modalBukti")).show();
}

// Mengunduh bukti sebagai gambar PNG (hanya jalan lewat http/https)
function unduhBukti() {
  const kanvas = document.getElementById("kanvasBukti");
  try {
    kanvas.toBlob((blob) => {
      const tautan = document.createElement("a");
      tautan.href = URL.createObjectURL(blob);
      tautan.download = `bukti-kehadiran-${buktiTerakhir.kode}.png`;
      document.body.appendChild(tautan); tautan.click(); tautan.remove();
      setTimeout(() => URL.revokeObjectURL(tautan.href), 1000);
    }, "image/png");
  } catch (galat) {
    alert("Unduhan diblokir browser karena dibuka dari file lokal. Buka lewat Live Server atau situs Vercel.");
  }
}

// Menyimpan bukti di browser tamu
function simpanBukti(data) {
  try { localStorage.setItem("buktiHadir", JSON.stringify(data)); } catch (galat) { console.warn("Tidak bisa menyimpan bukti", galat); }
}
// Membaca bukti yang tersimpan
function bacaBukti() {
  try { return JSON.parse(localStorage.getItem("buktiHadir")); } catch (galat) { return null; }
}
// Menampilkan tombol Lihat bukti bila ada bukti tersimpan
function periksaBuktiTersimpan() {
  if (bacaBukti()) document.getElementById("btnLihatBukti").classList.remove("d-none");
}
// Membuka kembali bukti yang tersimpan
function bukaBuktiTersimpan() {
  const data = bacaBukti();
  if (data) tampilBukti(data);
}
