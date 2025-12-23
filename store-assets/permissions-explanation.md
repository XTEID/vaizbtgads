# Penjelasan Permissions - Vaizbtgads

## Mengapa Vaizbtgads Membutuhkan Permissions Ini?

### 🌐 "Access your data for all websites" (`<all_urls>`)
**Diperlukan untuk:**
- Menganalisis konten halaman web untuk mendeteksi iklan dan tracker
- Memblokir elemen yang tidak diinginkan pada semua website
- Menerapkan filter pemblokiran secara real-time

**Tidak digunakan untuk:**
- Mengumpulkan data pribadi
- Mengirim informasi ke server eksternal
- Tracking aktivitas browsing Anda

### 📡 "Read and modify network requests" (`webRequest`, `webRequestBlocking`)
**Diperlukan untuk:**
- Memblokir permintaan jaringan ke server iklan dan tracker
- Mencegah loading konten yang tidak diinginkan sebelum sampai ke browser
- Meningkatkan kecepatan browsing dengan mengurangi traffic

**Tidak digunakan untuk:**
- Memodifikasi data pribadi Anda
- Mengintip komunikasi dengan website
- Mengubah konten yang Anda inginkan

### 📂 "Access browser storage" (`storage`)
**Diperlukan untuk:**
- Menyimpan pengaturan extension secara lokal
- Menyimpan daftar whitelist situs yang Anda percaya
- Menyimpan statistik pemblokiran (hanya di device Anda)

### 🗂️ "Access browser tabs" (`tabs`)
**Diperlukan untuk:**
- Menerapkan aturan pemblokiran per tab
- Menampilkan statistik untuk tab aktif
- Membuka dashboard extension

## 🔒 Jaminan Privasi

✅ **Semua pemrosesan dilakukan secara lokal** - tidak ada data yang dikirim ke server  
✅ **Tidak ada tracking atau analytics** - kami tidak tahu website apa yang Anda kunjungi  
✅ **Open source** - kode dapat diperiksa oleh siapa saja  
✅ **Tidak ada iklan dalam extension** - kami tidak menghasilkan uang dari data Anda  

## 🛡️ Cara Kerja Pemblokiran

1. **Deteksi**: Extension menganalisis permintaan jaringan dan elemen halaman
2. **Filter**: Membandingkan dengan daftar filter yang dikenal (EasyList, dll)
3. **Blokir**: Mencegah loading konten yang cocok dengan filter
4. **Statistik**: Menghitung jumlah yang diblokir (disimpan lokal)

## 📋 Alternatif Tanpa Permissions Ini

Tanpa permissions ini, extension tidak dapat:
- Memblokir iklan secara efektif
- Melindungi privasi dari tracker
- Memberikan statistik pemblokiran
- Bekerja pada semua website

## 🔍 Verifikasi

Anda dapat memverifikasi bahwa Vaizbtgads tidak menyalahgunakan permissions dengan:
- Memeriksa kode sumber di GitHub
- Menggunakan developer tools browser untuk melihat network activity
- Memeriksa bahwa tidak ada koneksi ke server eksternal

**Vaizbtgads berkomitmen untuk transparansi dan perlindungan privasi pengguna.**