// utils.js - fungsi bantu kecil

// Mengubah angka jadi 2 digit (5 menjadi 05)
const dua = (n) => String(n).padStart(2, "0");

// Mengubah tanggal jadi teks, contoh: Selasa, 3 Mei 2033
function formatTanggal(d) {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return `${hari[d.getDay()]}, ${d.getDate()} ${NAMA_BULAN[d.getMonth()]} ${d.getFullYear()}`;
}
