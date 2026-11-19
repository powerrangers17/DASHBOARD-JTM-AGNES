const API_REAL='https://script.google.com/macros/s/AKfycbw3O8v93EuCVLPzRDVEtjxzv5l-1J0JnjlzpFCM9WQ5cCRwX3QSYy3HlkiMC1JWIPnskg/exec';
const TOKEN_REAL='GNabZnnVcUQ9s6s3';
// MODE DEMO (opsional): isi dua baris ini dengan alamat /exec dan token lihat dari spreadsheet demo yang TERPISAH (lihat PETUNJUK_DEMO.md).
// Kosongkan kalau tidak dipakai. Jika terisi, muncul tombol "Mode" di bagian atas setiap halaman.
const API_DEMO='';
const TOKEN_DEMO='';
const DEMO=!!API_DEMO&&localStorage.getItem('mode')==='demo';
// Pita kuning "DATA CONTOH (FIKTIF)": true selama spreadsheet berisi data contoh. Ubah ke false bila sudah memakai data nyata. JANGAN mengubah baris DEMO di atas.
const LABEL_DEMO=false;
const API=DEMO?API_DEMO:API_REAL;
const TOKEN_LIHAT=DEMO?TOKEN_DEMO:TOKEN_REAL;
// Semua halaman tampil di menu (data lama JTM + data baru kerusakan peralatan dan WO).
// Untuk menyembunyikan sebagian, tambahkan: const MENU=['peralatan.html','pemeliharaan.html'];  dan  const HOME='peralatan.html';
