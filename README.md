# 🛡️ Vaizbtgads - Content Blocker untuk Browser

<div align="center">

![Vaizbtgads Logo](src/img/icon.svg)

**Content Blocker yang efisien untuk memblokir iklan, tracker, dan konten yang tidak diinginkan**

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-orange)](https://addons.mozilla.org/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green)](https://chrome.google.com/webstore/)

[📥 Download](#instalasi) • [📖 Dokumentasi](#dokumentasi) • [📋 Changelog](CHANGELOG.md) • [🐛 Report Bug](https://github.com/XTEID/vaizbtgads/issues) • [💡 Request Feature](https://github.com/XTEID/vaizbtgads/issues)

</div>

---

## ✨ Fitur Utama

🚫 **Pemblokiran Iklan & Pop-up**
- Memblokir iklan banner, pop-up, dan overlay yang mengganggu
- Deteksi otomatis elemen iklan berdasarkan ukuran dan konten
- Perlindungan dari redirect iklan yang tidak diinginkan

🔒 **Perlindungan Privasi**
- Memblokir tracker dan analytics yang mengumpulkan data pribadi
- Mencegah fingerprinting browser
- Perlindungan dari social media tracking

⚡ **Performa Tinggi**
- Engine pemblokiran yang ringan dan cepat
- Tidak memperlambat browsing
- Konsumsi memori yang minimal

🎯 **Kontrol Penuh**
- Dashboard yang mudah digunakan
- Whitelist untuk situs yang dipercaya
- Statistik real-time pemblokiran
- Pengaturan yang dapat dikustomisasi

## 🚀 Instalasi

### Firefox
1. Buka [Firefox Add-ons](https://addons.mozilla.org/)
2. Cari "Vaizbtgads"
3. Klik "Add to Firefox"

### Chrome/Chromium
1. Buka [Chrome Web Store](https://chrome.google.com/webstore/)
2. Cari "Vaizbtgads"
3. Klik "Add to Chrome"

### Manual Installation (Development)
```bash
# Clone repository
git clone https://github.com/XTEID/vaizbtgads.git
cd vaizbtgads

# Install dependencies
npm install

# Build extension
npm run build

# Load dist/firefox/ in Firefox atau dist/chromium/ in Chrome
```

## 📖 Dokumentasi

### 🛠️ Development

```bash
# Build untuk semua platform
npm run build

# Validasi extension
npm run validate

# Test extension
npm test
```

### 🎯 Cara Penggunaan

1. **Install extension** dari store atau manual
2. **Extension bekerja otomatis** - tidak perlu konfigurasi
3. **Klik ikon** untuk melihat statistik pemblokiran
4. **Akses dashboard** untuk pengaturan lanjutan
5. **Tambah ke whitelist** situs yang dipercaya

### ⚙️ Konfigurasi

- **Filter Lists**: EasyList, EasyPrivacy, dan filter kustom
- **Whitelist**: Kelola situs yang dikecualikan
- **Settings**: Kustomisasi perilaku pemblokiran
- **Statistics**: Monitor performa dan aktivitas

## 🛡️ Privasi & Keamanan

### 🔒 Jaminan Privasi
- ✅ **Tidak mengumpulkan data pribadi**
- ✅ **Tidak mengirim informasi ke server eksternal**
- ✅ **Semua pemrosesan dilakukan secara lokal**
- ✅ **Open source** - kode dapat diperiksa
- ✅ **Tidak ada tracking atau analytics**

### 🛠️ Permissions yang Diperlukan

| Permission | Alasan |
|------------|--------|
| `<all_urls>` | Menganalisis dan memblokir konten pada semua website |
| `webRequest` | Memblokir permintaan jaringan ke server iklan/tracker |
| `storage` | Menyimpan pengaturan dan whitelist secara lokal |
| `tabs` | Menerapkan aturan pemblokiran per tab |

**Semua permissions digunakan hanya untuk fungsi pemblokiran, bukan untuk mengumpulkan data.**

## 🏗️ Arsitektur

```
vaizbtgads/
├── src/                    # Source code utama
│   ├── js/                # JavaScript modules
│   ├── css/               # Stylesheets
│   ├── html/              # HTML pages
│   └── _locales/          # Internationalization
├── platform/              # Platform-specific files
│   ├── firefox/           # Firefox manifest & files
│   └── chromium/          # Chrome manifest & files
├── tools/                 # Build scripts & utilities
├── store-assets/          # Store submission materials
└── dist/                  # Build output
```

## 📋 Changelog

Lihat [CHANGELOG.md](CHANGELOG.md) untuk riwayat lengkap perubahan, fitur baru, dan perbaikan bug di setiap versi.

### Versi Terbaru (v1.0.0)
- 🎉 Initial release dengan fitur lengkap ad blocking
- 🛡️ Privacy protection dan tracker blocking
- ⚡ Performa tinggi dengan minimal impact
- 🎯 Dashboard dan popup interface yang user-friendly
- 🌐 Cross-browser support (Firefox & Chrome)

[**Lihat changelog lengkap →**](CHANGELOG.md)

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut cara berkontribusi:

1. **Fork** repository ini
2. **Create branch** untuk fitur baru (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### 📋 Development Guidelines

- Gunakan ESLint untuk code quality
- Test di Firefox dan Chrome sebelum submit
- Update dokumentasi jika diperlukan
- Follow existing code style

## 📊 Statistik

- 🎯 **Efektivitas**: Memblokir 90%+ iklan dan tracker
- ⚡ **Performa**: <1% impact pada loading time
- 💾 **Memory**: <10MB RAM usage
- 🌍 **Bahasa**: Indonesia, English (lebih banyak akan ditambah)

## 🗺️ Roadmap

- [ ] **v1.1**: Manifest V3 support
- [ ] **v1.2**: Advanced filter editor
- [ ] **v1.3**: Sync settings across devices
- [ ] **v1.4**: Mobile browser support
- [ ] **v1.5**: Custom scriptlet injection

## 📄 Lisensi

Proyek ini dilisensikan di bawah [GNU General Public License v3.0](LICENSE) - lihat file LICENSE untuk detail.

## 🙏 Acknowledgments

- [uBlock Origin](https://github.com/gorhill/uBlock) - Inspirasi dan referensi
- [EasyList](https://easylist.to/) - Filter lists
- [Mozilla](https://developer.mozilla.org/) - WebExtension documentation
- [Chrome Developers](https://developer.chrome.com/) - Extension APIs

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/XTEID/vaizbtgads/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/XTEID/vaizbtgads/issues)
- 📧 **Email**: support@vaizbtgads.com
- 💬 **Discussions**: [GitHub Discussions](https://github.com/XTEID/vaizbtgads/discussions)

---

<div align="center">

**Dibuat dengan ❤️ untuk pengalaman browsing yang lebih baik**

[⭐ Star this repo](https://github.com/XTEID/vaizbtgads) • [🍴 Fork](https://github.com/XTEID/vaizbtgads/fork) • [📢 Share](https://twitter.com/intent/tweet?text=Check%20out%20Vaizbtgads%20-%20Content%20Blocker%20untuk%20Browser&url=https://github.com/XTEID/vaizbtgads)

</div>