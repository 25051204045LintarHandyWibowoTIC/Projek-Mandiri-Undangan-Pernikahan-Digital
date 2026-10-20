// data.js - data undangan dan variabel global (file pertama)

// Semua data undangan. Ubah di sini, seluruh halaman ikut berubah
const DATA = {
  pria: "Lintar",
  wanita: "Elysia",
  priaLengkap: "Lintar Handy WIbowo",
  wanitaLengkap: "Elysia",
  ortuPria: "Bapak Anto; Ibu Dessy",
  ortuWanita: "Cocoon of Finality; Ibu Celia",

  // Tanggal akad: (tahun, bulan mulai dari 0, tanggal, jam, menit)
  tanggalAkad: new Date(2033, 4, 3, 9, 0),
  jamAkad: "09.00 - 10.00 <abbr title='Waktu Indonesia Barat'>WIB</abbr>",
  jamResepsi: "11.00 - 14.00 <abbr title='Waktu Indonesia Barat'>WIB</abbr>",
  tempat: "Grand Fullerton Ballroom",
  alamat: "Jl. Basuki Rahmat No.16-18, Surabaya",
  kota: "Surabaya",
  bank: "Bank BCA",
  noRek: "1234567890",
  atasNama: "Lintar Handy WIbowo",

  // Jumlah awal tamu hadir
  tamuHadirAwal: 0,
  // Dikosongkan karena belum ada database
  ucapanAwal: []
};

// Daftar ucapan (bertambah saat tamu mengirim)
let ucapan = [...DATA.ucapanAwal];
// Penampung pengatur waktu hitung mundur
var timerHitung;
// Nama bulan untuk menampilkan tanggal
const NAMA_BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
// Penanda di Console bahwa data termuat
console.log("Undangan dimuat untuk:", DATA.pria, "&", DATA.wanita);
