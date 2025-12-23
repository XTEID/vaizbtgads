# Quick Start - Store Submission

## 1. Build Extension (Already Done ✅)
```bash
npm run build
```

## 2. Create ZIP Packages
Run this from the vaizbtgads directory:

### Firefox:
```powershell
Compress-Archive -Path "dist/firefox/*" -DestinationPath "submission/vaizbtgads-firefox.zip" -Force
```

### Chrome:
```powershell
Compress-Archive -Path "dist/chromium/*" -DestinationPath "submission/vaizbtgads-chrome.zip" -Force
```

## 3. Take Screenshots
- Open extension in browser
- Take screenshots as per screenshots-guide.md
- Save in high resolution (1280x800 recommended)

## 4. Submit to Stores

### Firefox AMO:
1. Visit: https://addons.mozilla.org/developers/
2. Upload: submission/vaizbtgads-firefox.zip
3. Use description from: store-assets/description.md

### Chrome Web Store:
1. Visit: https://chrome.google.com/webstore/devconsole/
2. Pay $5 developer fee
3. Upload: submission/vaizbtgads-chrome.zip
4. Use description from: store-assets/description.md

## 5. Monitor Reviews
- Check store dashboards regularly
- Respond to user feedback
- Plan updates based on feedback

Good luck! 🚀
