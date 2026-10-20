// hadiah.js - menyalin nomor rekening

// Menyalin nomor rekening ke clipboard
function salinRekening() {
  navigator.clipboard.writeText(DATA.noRek)
    .then(() => alert("Nomor rekening disalin: " + DATA.noRek))
    .catch(() => alert("Salin manual: " + DATA.noRek));
}
