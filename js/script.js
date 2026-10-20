/* =====================================================================
   1. DATA UNDANGAN  --  CUKUP UBAH BAGIAN INI SAJA
   Semua nama, tanggal, lokasi di halaman diisi otomatis dari objek ini.
   ===================================================================== */
const DATA = {
  pria: "Lintar",                          // GANTI: nama panggilan mempelai pria
  wanita: "Elysia",                       // GANTI: nama panggilan mempelai wanita
  priaLengkap: "Lintar Handy WIbowo",   // GANTI: nama lengkap pria
  wanitaLengkap: "Elysia",
  ortuPria: "Bapak Anto; Ibu Dessy",     // GANTI: orang tua pria
  ortuWanita: "Cocoon of Finality; Ibu Celia", // GANTI: orang tua wanita
  // GANTI tanggal: format (tahun, bulan 0-11, tanggal, jam, menit). Contoh bulan 11 = Desember
  tanggalAkad: new Date(2033, 4, 3, 9, 0),
  jamAkad: "09.00 - 10.00 WIB",
  jamResepsi: "11.00 - 14.00 WIB",
  tempat: "Grand Fullerton Ballroom",
  alamat: "Jl. Basuki Rahmat No.16-18, Surabaya",
  kota: "Surabaya",
  bank: "Bank BCA",
  noRek: "1234567890",
  atasNama: "Lintar Handy WIbowo",
  // GANTI: ucapan awal (contoh). Ucapan baru dari form hanya tersimpan sementara
  ucapanAwal: [
    { nama: "Budi", pesan: "Selamat menempuh hidup baru!", hadir: "Hadir" },
    { nama: "Ani", pesan: "Semoga samawa, bahagia selalu.", hadir: "Hadir" }
  ]
};

/* ===== 2. Variabel, tipe data, operator, console ===== */
let ucapan = [...DATA.ucapanAwal];   // let: bisa berubah (array)
var timerHitung;                     // var: scope fungsi
const NAMA_BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
console.log("Undangan dimuat untuk:", DATA.pria, "&", DATA.wanita);

/* ===== 3. Function & arrow function ===== */
const dua = (n) => String(n).padStart(2, "0");   // arrow function

function formatTanggal(d) {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return `${hari[d.getDay()]}, ${d.getDate()} ${NAMA_BULAN[d.getMonth()]} ${d.getFullYear()}`; // template literal
}

/* ===== 4. DOM: isi semua elemen data-isi dari DATA ===== */
function isiData() {
  DATA.tanggalPanjang = formatTanggal(DATA.tanggalAkad);
  document.querySelectorAll("[data-isi]").forEach((el) => {
    const kunci = el.getAttribute("data-isi");
    if (DATA[kunci] !== undefined) el.innerHTML = DATA[kunci];
  });
  document.getElementById("noRek").textContent = DATA.noRek;
  // String method: ambil huruf pertama nama -> monogram "R & S"
  document.getElementById("monogram").textContent =
    DATA.pria.charAt(0).toUpperCase() + " & " + DATA.wanita.charAt(0).toUpperCase();
  document.title = `Undangan ${DATA.pria} & ${DATA.wanita}`;
}

/* ===== 5. Nama tamu dari URL =====
   Contoh: https://situsmu.vercel.app/?to=Budi%20dan%20Ani   */
function isiNamaTamu() {
  const param = new URLSearchParams(window.location.search).get("to");
  if (param) {
    document.getElementById("namaTamu").textContent = param;
    document.getElementById("nama").value = param;   // otomatis di form RSVP
  }
}

/* ===== 6. Event & classList ===== */
function bukaUndangan() {
  document.getElementById("cover").classList.add("terbuka");   // geser cover ke atas
  document.body.classList.remove("terkunci");
  setTimeout(() => document.getElementById("cover").style.display = "none", 1100); // setTimeout
  toggleMusik(true);
}

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

/* ===== 7. Date + setInterval: hitung mundur ===== */
function hitungMundur() {
  const selisih = DATA.tanggalAkad - new Date();   // operator aritmatika (ms)
  if (selisih <= 0) {
    document.querySelector(".hitung").innerHTML = "<p class='fs-5'>Hari bahagia telah tiba</p>";
    clearInterval(timerHitung);
    return;
  }
  const detik = Math.floor(selisih / 1000);
  document.getElementById("cdHari").textContent = Math.floor(detik / 86400);
  document.getElementById("cdJam").textContent = dua(Math.floor((detik % 86400) / 3600));
  document.getElementById("cdMenit").textContent = dua(Math.floor((detik % 3600) / 60));
  document.getElementById("cdDetik").textContent = dua(detik % 60);
}

/* ===== 8. Array & object: tampilkan ucapan ===== */
function tampilUcapan() {
  const wadah = document.getElementById("daftarUcapan");
  wadah.innerHTML = "";
  for (let i = ucapan.length - 1; i >= 0; i--) {          // perulangan for
    const u = ucapan[i];
    let label;
    switch (u.hadir) {                                    // switch
      case "Hadir": label = "akan hadir"; break;
      case "Tidak": label = "berhalangan"; break;
      default: label = "";
    }
    wadah.innerHTML += `<div class="ucapan"><b>${u.nama}</b> <small>${label}</small><br>${u.pesan}</div>`;
  }
  document.getElementById("jmlUcapan").textContent = `(${ucapan.length})`;
}

/* ===== 9. Validasi form ===== */
function validasiForm() {
  const nama = document.getElementById("nama").value.trim();
  const pesan = document.getElementById("pesan").value.trim();
  const jumlah = parseInt(document.getElementById("jumlah").value, 10);
  const hadir = document.querySelector("input[name='hadir']:checked").value;
  const kotak = document.getElementById("pesanForm");

  const tampil = (teks, jenis) => {
    kotak.className = `alert alert-${jenis}`;
    kotak.textContent = teks;
  };

  if (nama === "" || pesan === "") { tampil("Nama dan ucapan wajib diisi.", "Peringatan"); return false; }
  if (isNaN(jumlah) || jumlah < 1 || jumlah > 5) { tampil("Jumlah tamu harus 1 sampai 5.", "Peringatan"); return false; }

  if (document.getElementById("tampil").checked) {
    ucapan.push({ nama: nama, pesan: pesan, hadir: hadir });   // object ke array
    tampilUcapan();
  }
  tampil(`Terima kasih, ${nama}! Konfirmasi Anda tercatat.`, "success");
  document.getElementById("formRsvp").reset();
  return false;   // false = halaman tidak reload (belum ada backend)
}

/* ===== 10. Salin rekening ===== */
function salinRekening() {
  navigator.clipboard.writeText(DATA.noRek)
    .then(() => alert("Nomor rekening disalin: " + DATA.noRek))
    .catch(() => alert("Salin manual: " + DATA.noRek));
}

/* ===== Jalankan saat halaman siap ===== */
isiData();
isiNamaTamu();
tampilUcapan();
hitungMundur();
timerHitung = setInterval(hitungMundur, 1000);
