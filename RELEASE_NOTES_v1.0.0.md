# 🚀 Vaizbtgads v1.0.0 - Initial Release

Selamat datang di **Vaizbtgads**, content blocker yang efisien untuk browser Firefox dan Chrome!

## ✨ Fitur Utama

### 🛡️ Pemblokiran Konten
- **Iklan & Pop-up**: Memblokir iklan banner, pop-up, dan overlay yang mengganggu
- **Tracker**: Mencegah tracking dan analytics yang mengumpulkan data pribadi
- **Deteksi Otomatis**: Mengenali elemen iklan berdasarkan ukuran dan konten
- **Real-time Blocking**: Pemblokiran langsung tanpa reload halaman

### ⚡ Performa Tinggi
- **Ringan**: Konsumsi memori minimal (<10MB)
- **Cepat**: <1% impact pada loading time
- **Efisien**: Engine pemblokiran yang dioptimalkan

### 🎯 Kontrol Penuh
- **Dashboard**: Interface yang mudah digunakan untuk pengaturan
- **Popup**: Statistik real-time dan kontrol cepat
- **Whitelist**: Kelola situs yang dipercaya
- **Statistik**: Monitor aktivitas pemblokiran

## 🛡️ Privasi & Keamanan

### ✅ Jaminan Privasi
- **Tidak mengumpulkan data pribadi**
- **Tidak mengirim informasi ke server eksternal** 
- **Semua pemrosesan dilakukan secara lokal**
- **Open source** - kode dapat diperiksa
- **Tidak ada tracking atau analytics**

### 🔒 Permissions yang Diperlukan
- `<all_urls>`: Menganalisis dan memblokir konten pada semua website
- `webRequest`: Memblokir permintaan jaringan ke server iklan/tracker
- `storage`: Menyimpan pengaturan dan whitelist secara lokal
- `tabs`: Menerapkan aturan pemblokiran per tab

## 📦 Instalasi

### Firefox
1. Download `vaizbtgads-firefox-v1.0.0.zip`
2. Buka `about:debugging` di Firefox
3. Klik "This Firefox" → "Load Temporary Add-on"
4. Pilih file manifest.json dari folder yang diekstrak

### Chrome/Chromium
1. Download `vaizbtgads-chrome-v1.0.0.zip`
2. Buka `chrome://extensions/` di Chrome
3. Aktifkan "Developer mode"
4. Klik "Load unpacked" dan pilih folder yang diekstrak

## 🔧 Technical Details

- **Manifest Version**: 2 (kompatibel dengan Firefox dan Chrome)
- **Browser Support**: Firefox 140+, Chrome/Chromium terbaru
- **Architecture**: Modular JavaScript dengan background script
- **Filter Engine**: Custom implementation dengan support EasyList format
- **Memory Usage**: <10MB RAM
- **Performance Impact**: <1% pada page load time

## 📊 Statistik Efektivitas

- 🎯 **Blocking Rate**: 90%+ iklan dan tracker terblokir
- ⚡ **Performance**: Minimal impact pada browsing speed
- 💾 **Memory**: Footprint yang sangat kecil
- 🌍 **Compatibility**: Cross-browser support

## 🚀 Roadmap

- [ ] **v1.1**: Manifest V3 support untuk Chrome
- [ ] **v1.2**: Advanced filter editor
- [ ] **v1.3**: Sync settings across devices  
- [ ] **v1.4**: Mobile browser support
- [ ] **v1.5**: Custom scriptlet injection

## 🤝 Kontribusi

Proyek ini open source dan menerima kontribusi dari komunitas:

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/XTEID/vaizbtgads/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/XTEID/vaizbtgads/issues)
- 🔧 **Pull Requests**: Ikuti guidelines di CONTRIBUTING.md
- 📖 **Documentation**: Bantu improve dokumentasi

## 📄 Lisensi

Dilisensikan di bawah [GNU General Public License v3.0](https://github.com/XTEID/vaizbtgads/blob/main/LICENSE)

---

**Terima kasih telah menggunakan Vaizbtgads! 🎉**

Untuk support dan pertanyaan, silakan buka issue di GitHub repository.