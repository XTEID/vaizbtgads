# 🚀 Cara Membuat Release Manual di GitHub

Karena GitHub Actions workflow mungkin belum berjalan otomatis, berikut cara membuat release manual:

## 📋 Langkah-langkah:

### 1. Buka GitHub Repository
- Kunjungi: https://github.com/XTEID/vaizbtgads
- Klik tab "Releases" di sidebar kanan

### 2. Create New Release
- Klik tombol "Create a new release"
- **Tag version**: `v1.0.0` (sudah ada)
- **Release title**: `🚀 Vaizbtgads v1.0.0 - Initial Release`

### 3. Upload Files
Upload file-file berikut yang sudah dibuat:
- `vaizbtgads-firefox-v1.0.0.zip` (14 KB)
- `vaizbtgads-chrome-v1.0.0.zip` (14 KB)

### 4. Release Description
Copy-paste konten dari `RELEASE_NOTES_v1.0.0.md`

### 5. Publish Release
- Pastikan "Set as the latest release" dicentang
- Klik "Publish release"

## ✅ Hasil yang Diharapkan:

Setelah release dipublish:
- Release v1.0.0 akan muncul di halaman utama repository
- File ZIP dapat didownload oleh pengguna
- GitHub akan otomatis membuat source code archive
- Release akan muncul di GitHub API

## 🔄 Alternatif: GitHub CLI

Jika Anda memiliki GitHub CLI:

```bash
gh release create v1.0.0 \
  vaizbtgads-firefox-v1.0.0.zip \
  vaizbtgads-chrome-v1.0.0.zip \
  --title "🚀 Vaizbtgads v1.0.0 - Initial Release" \
  --notes-file RELEASE_NOTES_v1.0.0.md
```

## 📊 Verifikasi Release

Setelah release dibuat, cek:
- [ ] Release muncul di https://github.com/XTEID/vaizbtgads/releases
- [ ] File ZIP dapat didownload
- [ ] Release notes tampil dengan benar
- [ ] Tag v1.0.0 terdaftar di repository