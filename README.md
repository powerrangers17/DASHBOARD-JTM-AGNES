# Dashboard JTM (GitHub Pages)
1. Spreadsheet JTM AMU > Extensions > Apps Script. Tempel `apps-script/Code.gs`. Ubah token di `setToken()`, jalankan sekali.
2. Impor `Template_GANGGUAN.xlsx` sebagai tab baru bernama **GANGGUAN** (File > Import > Insert new sheet), atau ke spreadsheet terpisah (isi `GG_ID`).
3. Deploy > New deployment > Web app (Execute as: Me, Access: Anyone). Salin URL `/exec`.
4. Ganti `API` di `config.js` dengan URL itu.
5. Buat repo GitHub publik, unggah `index.html`, `petugas.html`, `temuan.html`, `peta.html`, `korelasi.html`, `vendor.html`, `api.js`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png`, `style.css`, `config.js` (jangan unggah file .xlsx).
6. Settings > Pages > Deploy from a branch > main / root.
7. Buka `https://USERNAME.github.io/NAMA-REPO/`, masukkan token.

## Fase 2 (jadwal Yantek)
- Tempel `apps-script/Yantek.gs` sebagai file baru, jalankan `setupYantek()` sekali (membuat tab PENUGASAN_YANTEK, JADWAL_HARIAN, REALISASI_HARIAN), lalu **Deploy ulang** (New version).
- Isi PENUGASAN_YANTEK: regu, ULP, penyulang, target bulanan (kms). Hapus baris contoh.
- Buka `petugas.html` untuk papan regu, kalender, form jadwal, dan form realisasi.

## Fase 3 (temuan, risiko, peta)
- Tempel `apps-script/Fase3.gs` sebagai file baru, lalu **Deploy ulang** (New version). Tidak ada tab baru.
- Data dibaca dari tab FORM JTM per kolom dan di-cache 15 menit. Muat pertama bisa sampai 30 detik. Jika terkena batas waktu Apps Script, hubungi saya untuk memecah proses.
- `BOUNDS` di `Fase3.gs` menyaring koordinat salah input. Sesuaikan jika wilayah kerja berbeda.
- Skor risiko memakai nama ULP dan penyulang. Pastikan penulisannya sama di FORM JTM, MONITORING SECTION, dan tab GANGGUAN.

## Fase 4 (kecepatan, korelasi, peringatan)
- Ganti isi SEMUA file di Apps Script dengan versi terbaru (`Code.gs`, `Yantek.gs`, `Fase3.gs`, `Fase4.gs`), lalu jalankan `pasangTrigger()` sekali dan izinkan aksesnya. Fungsi ini memasang pembaruan otomatis tiap 15 menit (hanya pukul 05.00-21.59 WITA) dan mengisi tab tersembunyi `_SNAPSHOT`.
- Deploy ulang dengan New version. Setelah itu halaman membaca snapshot, bukan menghitung ulang FORM JTM.
- Tombol 'Muat ulang' menghitung ulang saat itu juga dan lebih lambat (sekitar 30 detik).

## Fase 5 (pelaksana ROW, hak akses, PWA)
- Tambahkan `apps-script/Fase5.gs` dan ganti `Code.gs`, `Yantek.gs`, `Fase4.gs`. Jalankan `setToken()` lagi setelah mengisi dua token: **admin** (boleh mengubah jadwal dan target) dan **lihat** (hanya melihat, untuk dibagikan ke atasan atau tim).
- Email peringatan harian pukul 07.00: isi `EMAIL_PENERIMA` di `Fase5.gs`, jalankan `pasangEmailHarian()` sekali.
- Buka situs di HP lalu pilih "Tambahkan ke layar utama" untuk memasangnya seperti aplikasi. Data terakhir tetap bisa dilihat saat offline.
- Tombol Cetak dan Unduh CSV ada di bagian atas setiap halaman.

## Uji setelah pasang
1. Dashboard: capaian per ULP muncul. 2. Jadwal Yantek: tambah jadwal, lalu coba input yang sama (harus ditolak). 3. Pakai token lihat: simpan data harus ditolak. 4. Temuan dan Peta: titik muncul. 5. Setelah `pasangTrigger()`, muat ulang halaman: kurang dari beberapa detik.
