# Undangan Pernikahan Digital


## Cara kerja

1. `index.html` berisi kerangka halaman. Nama, tanggal, lokasi. Elemen yang membutuhkannya diberi atribut `data-isi`.
2. `js/data.js` menyimpan semua data di satu objek `DATA`. `js/main.js` membaca objek tersebut dan mengisi elemen bertanda `data-isi`. Mengganti isi undangan cukup mengedit `data.js`.
3. Cover menutupi layar. Tombol **Buka Undangan** menggeser cover ke atas, menyalakan musik, dan memulai animasi.
4. Saat digulir, `js/animasi.js` memakai `IntersectionObserver` untuk memasang dan mencabut kelas `tampil`. CSS di `css/animasi.css` menggerakkan elemennya, jadi animasi berulang tiap kali bagian tersebut masuk ke layar.
5. Tombol Reservasi dan Hadiah membuka jendela modal Bootstrap. Formulir reservasi diperiksa oleh `js/reservasi.js`. Tamu yang memilih Hadir mendapat bukti kehadiran yang digambar `js/bukti.js` di `<canvas>`, lalu bisa diunduh sebagai PNG atau dicetak.
6. Bukti disimpan di `localStorage` browser tamu, sehingga bisa dibuka lagi lewat tombol **Lihat bukti kehadiran saya**.

## Fitur

- Cover pembuka dengan nama tamu dari alamat (`?to=Nama`), foto berbingkai, dan tombol buka.
- Musik latar dengan tombol putar dan jeda.
- Sampul mempelai dengan hitung mundur menuju hari akad.
- Profil mempelai pria dan wanita dalam bingkai bulat.
- Tabel jadwal acara dan catatan untuk tamu (daftar bersarang, bagian lipat tema pakaian).
- Galeri foto dengan CSS Grid, video lokal, dan video YouTube.
- Peta Google Maps dan tombol petunjuk arah.
- Reservasi (RSVP) dalam jendela modal. Jumlah tamu 1 sampai 5, dan kolom nama tamu bertambah otomatis sesuai jumlahnya.
- Bukti kehadiran berisi semua nama tamu, kode unik, tanggal, jam, dan lokasi. Bisa diunduh PNG atau dicetak.
- Amplop digital: nomor rekening dengan tombol salin, dan QRIS.
- Ucapan dan doa dengan formulir terpisah dari reservasi.
- Animasi muncul saat digulir, kelopak sakura jatuh, dan bintang berkedip. Animasi mati otomatis bila perangkat meminta gerakan dikurangi.
- Tampilan responsif untuk HP dan desktop, dengan susunan yang berbeda di tiap ukuran.

## Struktur file

| File | Tugas |
|---|---|
| index.html | kerangka halaman, semua bagian, dan tiga jendela |
| css/fonts.css | font lokal dari assets/fonts |
| css/base.css | warna tema, font, teks dasar, link |
| css/layout.css | navbar, jarak antar bagian, sampul mempelai, grid galeri |
| css/components.css | kartu, kotak foto, ucapan, footer, tombol musik |
| css/hiasan.css | bingkai foto, kelopak jatuh, kilau, panel kaca |
| css/animasi.css | animasi muncul saat digulir |
| css/reservasi.css | tombol pink dan jendela modal |
| css/kotak.css | garis, bayangan, dan efek timbul |
| css/gradasi.css | latar halaman dan gradasi pink |
| css/cover.css | layar pembuka (muat paling akhir) |
| css/cetak.css | tampilan cetak bukti kehadiran |
| js/data.js | data undangan (muat pertama) |
| js/utils.js | fungsi bantu |
| js/hiasan.js | kelopak jatuh dan kilau |
| js/animasi.js | animasi muncul saat digulir |
| js/countdown.js | hitung mundur |
| js/bukti.js | bukti kehadiran di kanvas, unduh PNG, simpan di browser |
| js/reservasi.js | form RSVP, nama tamu dinamis, validasi |
| js/ucapan.js | form dan daftar ucapan |
| js/hadiah.js | salin nomor rekening |
| js/main.js | isi data, buka cover, musik, jalankan semuanya (muat terakhir) |
| assets/ | foto, video, musik, bingkai, latar, dan font |

## Materi yang diterapkan

Semuanya fitur standar HTML, CSS, JavaScript, dan Bootstrap. Tidak ada library tambahan selain Bootstrap.

**HTML**
- Kerangka HTML5, komentar, elemen semantik (`header`, `nav`, `main`, `section`, `footer`).
- Teks: `p`, `br`, `hr`, `b`, `i`, `del`, `small`, `mark`, `abbr`, `q`, `cite`, `blockquote`, `details` dan `summary`, serta entitas (`&copy;`, `&amp;`, `&#183;`).
- Heading, daftar (`ol` dengan `type`, `ul`, `dl`, daftar bersarang), dan link (`#id`, `target=_blank`, `rel=noopener`).
- Media: `img`, `figure`, `audio`, `video`, `object`, `iframe` (dengan `loading=lazy`), dan `canvas`.
- Tabel: `thead`, `tbody`, `tfoot`, `colgroup`, `col`, `rowspan`, `colspan`.
- Form: `input` (`text`, `email`, `number`, `radio`), `label`, `placeholder`, `select`, `textarea`, `fieldset`, `legend`, `required`, `maxlength`, `novalidate`, dan tombol `submit`, `reset`, `button`.
- Atribut tambahan: `data-*`, `aria-*`, `onclick`, `onsubmit`, `oninput`, `onerror`.

**CSS**
- Selector: elemen, kelas, id, pengelompokan, turunan, anak langsung, `::before`, `::after`, `:link`, `:visited`, `:hover`, `:active`, `:focus`, `:has()`, `:not()`.
- Teks dan warna (heksadesimal, `rgb`, `rgba`, `hsl`), serta background (gambar, posisi, ukuran, gradasi linear dan radial).
- Box model (`padding`, `border`, `border-radius`, `margin`, `box-sizing`, `box-shadow`), `display`, `overflow`, `position`, `z-index`.
- Flexbox dan Grid.
- Satuan: `rem`, `em`, `%`, `fr`, `vw`, `dvh`, `ch`, `px`, `cqw`, serta fungsi `clamp()` dan `min()`.
- Variabel CSS (`var()`).
- Bentuk dan gambar: `aspect-ratio`, `object-fit`, `object-position`, `clip-path`, `backdrop-filter`.
- Gerak: `transition`, `transform` (`translate`, `scale`, `rotate`), properti `translate` dan `scale`, `@keyframes`, dan `animation`.
- Lain-lain: `@font-face`, `pointer-events`, `scrollbar-gutter`, `@media` (lebar, rasio layar, kurangi gerakan, cetak).

**JavaScript**
- Dasar: script eksternal, event inline, `console.log`, `let`, `var`, `const`, tipe data, operator, `if/else`, `switch`, `for`, `for...of`, fungsi biasa dan fungsi panah, template literal, spread, destrukturisasi, ekspresi reguler, `try/catch`, `async/await`, dan Promise.
- DOM: `getElementById`, `querySelectorAll`, `createElement`, `appendChild`, `textContent`, `innerHTML`, `style`, `classList`.
- Event: `onclick`, `onsubmit`, `addEventListener`, dan `IntersectionObserver`.
- Data dan waktu: array, objek, `Date`, `setTimeout`, `setInterval`, `Math.random`, `Math.floor`, `padStart`, `parseInt`, `charAt`, `toUpperCase`, `replace`, `localStorage` dengan JSON, dan `URLSearchParams`.
- API browser: `matchMedia`, Canvas 2D, `toBlob` dengan `URL.createObjectURL`, `document.fonts.load`, `navigator.clipboard`, dan `window.print`.
- Validasi form dengan `return false`.

**Bootstrap**
- Container, Grid, Column (`order-*`), Gutter, dan utility Flex.
- Navbar dengan collapse, Modal (termasuk `bootstrap.Modal` di JS), Buttons, Forms, Alert, Table (`table-bordered`, `table-responsive`), Ratio, serta utility spacing, teks, dan tampilan.

## Keterbatasan

- Belum ada database jadi ucapan hanya terlihat oleh pengirimnya dan hilang saat halaman dimuat ulang. Jumlah tamu hadir hanya dihitung di browser yang sedang dibuka.
- Bukti kehadiran tersimpan per browser dan tidak bisa diverifikasi oleh penerima tamu.
- Unduhan bukti hanya berjalan lewat `http` atau `https` (Live Server atau Vercel), tidak dari berkas yang dibuka langsung.
- Bootstrap, peta, dan YouTube membutuhkan internet sedangkan Font sudah lokal.

## Menjalankan dan mengubah data

- **Menjalankan:** buka folder di VS Code, lalu jalankan Live Server pada `index.html`.
- **Mengubah data:** edit objek `DATA` di `js/data.js`. Untuk lokasi, ganti `q=` pada iframe `#peta` dan link `#btnPeta` di `index.html`.
- **Nama tamu:** tambahkan `?to=Nama` di alamat.
- **Media:** ganti file di `assets/` dengan nama yang sesuai.

## Deploy ke Vercel

Unggah folder ke GitHub, impor repositori di vercel.com, pilih Framework Preset **Other**, lalu Deploy.
