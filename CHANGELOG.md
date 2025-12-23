# Changelog

All notable changes to Vaizbtgads will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned for v1.1.0
- [ ] Manifest V3 support for Chrome
- [ ] Enhanced filter editor
- [ ] Performance optimizations
- [ ] Additional language support
- [ ] Sync settings across devices

## [1.0.0] - 2025-12-23

### Added
- 🎉 **Initial release** of Vaizbtgads content blocker
- 🚫 **Ad & Popup Blocking**: Efficient blocking of banners, pop-ups, and overlays
- 🔒 **Privacy Protection**: Tracker and analytics blocking
- ⚡ **High Performance**: Lightweight engine with <1% impact on page load
- 📊 **Real-time Statistics**: Live blocking counters and daily stats
- 🛡️ **Whitelist Management**: Domain-based exception system
- 🎯 **Smart Detection**: Automatic ad element recognition by size and content
- 🌐 **Cross-browser Support**: Firefox and Chrome/Chromium compatibility

### Features
- **Background Script**: Core blocking engine with webRequest API
- **Content Script**: DOM-based element blocking and popup prevention
- **Popup Interface**: Quick stats view and toggle controls
- **Dashboard**: Full management interface with settings
- **Filter Engine**: Custom implementation with EasyList-style rules
- **Storage System**: Local settings and whitelist persistence
- **Internationalization**: English and Indonesian language support

### Technical Details
- **Manifest Version**: 2 (Firefox and Chrome compatible)
- **Browser Support**: 
  - Firefox 140.0+ (including Android 142.0+)
  - Chrome/Chromium latest stable versions
- **Architecture**: Modular JavaScript with VAPI abstraction layer
- **Memory Usage**: <10MB RAM footprint
- **Performance**: Minimal impact on browsing speed
- **Build System**: Node.js-based automated build and packaging

### Privacy & Security
- ✅ **Zero Data Collection**: No personal information gathered
- ✅ **Local Processing**: All filtering done on device
- ✅ **No External Servers**: No data sent to remote servers
- ✅ **Open Source**: Fully auditable codebase
- ✅ **Minimal Permissions**: Only necessary browser APIs used

### Permissions Explained
- `<all_urls>`: Required to analyze and block content on all websites
- `webRequest`: Needed to intercept and block network requests to ad servers
- `storage`: Used to save settings and whitelist locally
- `tabs`: Required to apply blocking rules per browser tab
- `webNavigation`: Used for tab-specific blocking state management

### Installation Methods
- **Firefox**: Load as temporary add-on via `about:debugging`
- **Chrome**: Load as unpacked extension via `chrome://extensions/`
- **Development**: Clone repository and run `npm run build`

### Known Limitations
- Manifest V2 only (V3 support planned for v1.1.0)
- Basic filter list support (advanced rules planned for future versions)
- Manual installation required (store submission in progress)

---

## Development

### Build Commands
```bash
npm run build          # Build for all platforms
npm run validate       # Validate extension packages
npm test              # Run build and validation
npm run lint          # Code quality checks
```

### Project Structure
```
vaizbtgads/
├── src/                    # Source code
│   ├── js/                # JavaScript modules
│   ├── css/               # Stylesheets  
│   ├── html/              # HTML pages
│   └── _locales/          # Internationalization
├── platform/              # Platform-specific manifests
│   ├── firefox/           # Firefox configuration
│   └── chromium/          # Chrome configuration
├── tools/                 # Build and packaging scripts
└── dist/                  # Build output
```

---

## Support & Contributing

### Getting Help
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/XTEID/vaizbtgads/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/XTEID/vaizbtgads/issues)
- 📖 **Documentation**: [Repository README](https://github.com/XTEID/vaizbtgads#readme)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/XTEID/vaizbtgads/discussions)

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Test changes in both Firefox and Chrome
- Update documentation for new features
- Add appropriate commit messages
- Ensure all builds pass validation

---

## License

This project is licensed under the [GNU General Public License v3.0](https://github.com/XTEID/vaizbtgads/blob/main/LICENSE).

---

**Note**: This changelog follows [Keep a Changelog](https://keepachangelog.com/) format. Each version documents all notable changes including new features, bug fixes, and breaking changes.