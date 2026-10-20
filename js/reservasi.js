// reservasi.js - form RSVP, nama tamu dinamis, dan validasi

// Jumlah tamu yang sudah memastikan hadir
let tamuHadir = DATA.tamuHadirAwal;

// Menampilkan kalimat jumlah tamu hadir
function perbaruiJmlHadir() {
  const teks = document.getElementById("teksHadir");
  teks.innerHTML = tamuHadir > 0
    ? `<b>${tamuHadir}</b> tamu sudah memastikan hadir.<br>Yuk, kirim konfirmasimu juga.`
    : "Jadilah yang pertama memastikan kehadiran.<br>Yuk, kirim konfirmasimu!";
}

// Membuat kolom Nama tamu 2..N sesuai jumlah tamu (maksimal 5); isian lama dipertahankan
function buatKolomNama() {
  const wadah = document.getElementById("namaTambahan");
  const hadir = document.querySelector("input[name='hadir']:checked").value === "Hadir";
  let jumlah = parseInt(document.getElementById("rJumlah").value, 10);
  if (!hadir || isNaN(jumlah) || jumlah < 2) { wadah.innerHTML = ""; return; }
  jumlah = Math.min(jumlah, 5);
  const lama = [...wadah.querySelectorAll("input")].map((kolom) => kolom.value);
  wadah.innerHTML = "";
  for (let i = 2; i <= jumlah; i++) {
    const blok = document.createElement("div");
    blok.className = "mb-3";
    blok.innerHTML = `<label for="rNama${i}" class="form-label">Nama tamu ${i}</label>
      <input type="text" class="form-control nama-tamu" id="rNama${i}" placeholder="Nama tamu ${i}" maxlength="40">`;
    blok.querySelector("input").value = lama[i - 2] || "";
    wadah.appendChild(blok);
  }
}

// Memeriksa form reservasi, lalu membuat bukti kehadiran bila hadir
function validasiReservasi() {
  const namaUtama = document.getElementById("rNama").value.trim();
  const jumlah = parseInt(document.getElementById("rJumlah").value, 10);
  const hadir = document.querySelector("input[name='hadir']:checked").value;
  const hubungan = document.getElementById("rHubungan").value;
  const kotak = document.getElementById("pesanReservasi");

  const tampil = (teks, jenis) => {
    kotak.className = `alert alert-${jenis} mt-3`;
    kotak.textContent = teks;
  };

  if (namaUtama === "") { tampil("Nama wajib diisi.", "danger"); return false; }
  if (isNaN(jumlah) || jumlah < 1 || jumlah > 5) { tampil("Jumlah tamu harus 1 sampai 5.", "danger"); return false; }

  const modalReservasi = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalReservasi"));

  // Tidak hadir: cukup ucapan terima kasih
  if (hadir === "Tidak") {
    tampil(`Terima kasih sudah memberi kabar, ${namaUtama}.`, "success");
    document.getElementById("formReservasi").reset();
    setTimeout(() => { modalReservasi.hide(); kotak.className = "alert d-none"; }, 1500);
    return false;
  }

  // Hadir: kumpulkan semua nama (wajib terisi)
  const nama = [namaUtama];
  const kolom = document.querySelectorAll(".nama-tamu");
  for (const k of kolom) {
    if (k.value.trim() === "") { tampil(`Lengkapi nama untuk semua ${jumlah} tamu.`, "danger"); return false; }
    nama.push(k.value.trim());
  }

  const data = { kode: buatKode(), nama: nama, jumlah: jumlah, hubungan: hubungan, waktu: new Date().toISOString() };
  tamuHadir += jumlah;
  perbaruiJmlHadir();
  simpanBukti(data);
  document.getElementById("btnLihatBukti").classList.remove("d-none");

  tampil("Reservasi tercatat! Bukti kehadiran Anda sedang dibuat...", "success");
  document.getElementById("formReservasi").reset();

  const window = document.getElementById("modalReservasi");
  // Buka bukti setelah window reservasi benar-benar tertutup
  window.addEventListener("hidden.bs.modal", () => {
    kotak.className = "alert d-none";
    tampilBukti(data);
  }, { once: true });
  setTimeout(() => modalReservasi.hide(), 700);
  return false;
}
