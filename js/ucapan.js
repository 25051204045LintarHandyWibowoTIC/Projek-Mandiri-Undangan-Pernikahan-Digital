// ucapan.js - form dan daftar ucapan tamu

// Menampilkan daftar ucapan (terbaru di atas)
function tampilUcapan() {
  const wadah = document.getElementById("daftarUcapan");
  wadah.innerHTML = "";
  if (ucapan.length === 0) {
    wadah.innerHTML = '<p class="text-muted mb-0">Belum ada ucapan. Jadilah yang pertama!</p>';
  }
  for (let i = ucapan.length - 1; i >= 0; i--) {
    const u = ucapan[i];
    let label;
    switch (u.hadir) {
      case "Hadir": label = "akan hadir"; break;
      case "Tidak": label = "berhalangan"; break;
      default: label = "";
    }
    wadah.innerHTML += `<div class="ucapan"><b>${u.nama}</b> <small>${label}</small><br>${u.pesan}</div>`;
  }
  document.getElementById("jmlUcapan").textContent = `(${ucapan.length})`;
}

// Memeriksa dan menambahkan ucapan baru
function kirimUcapan() {
  const nama = document.getElementById("uNama").value.trim();
  const pesan = document.getElementById("uPesan").value.trim();
  const kotak = document.getElementById("pesanUcapan");

  if (nama === "" || pesan === "") {
    kotak.className = "alert alert-danger";
    kotak.textContent = "Nama dan ucapan wajib diisi.";
    return false;
  }
  ucapan.push({ nama: nama, pesan: pesan, hadir: "" });
  tampilUcapan();
  kotak.className = "alert alert-success";
  kotak.textContent = `Terima kasih, ${nama}! Ucapan Anda terkirim.`;
  document.getElementById("formUcapan").reset();
  return false;
}
