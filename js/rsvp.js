/* rsvp.js : form reservasi, validasi, daftar ucapan, salin rekening */

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

  if (nama === "" || pesan === "") { tampil("Nama dan ucapan wajib diisi.", "danger"); return false; }
  if (isNaN(jumlah) || jumlah < 1 || jumlah > 5) { tampil("Jumlah tamu harus 1 sampai 5.", "danger"); return false; }

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

