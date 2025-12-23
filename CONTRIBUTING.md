# Contributing to Vaizbtgads

Terima kasih atas minat Anda untuk berkontribusi pada Vaizbtgads! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

Proyek ini mengikuti [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). Dengan berpartisipasi, Anda diharapkan menjunjung tinggi kode etik ini.

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git**
- Browser untuk testing (Firefox, Chrome)

### Development Setup

1. **Fork repository** ini
2. **Clone** fork Anda:
   ```bash
   git clone https://github.com/your-username/vaizbtgads.git
   cd vaizbtgads
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Build extension**:
   ```bash
   npm run build
   ```

5. **Load extension** di browser untuk testing:
   - **Firefox**: Load `dist/firefox/` sebagai temporary add-on
   - **Chrome**: Load `dist/chromium/` sebagai unpacked extension

## 🤝 How to Contribute

### 🐛 Reporting Bugs

1. **Check existing issues** untuk memastikan bug belum dilaporkan
2. **Create new issue** dengan template bug report
3. **Include details**:
   - Browser dan versi
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots jika relevan

### 💡 Suggesting Features

1. **Check existing issues** untuk feature requests serupa
2. **Create new issue** dengan template feature request
3. **Describe**:
   - Use case yang jelas
   - Proposed solution
   - Alternative solutions yang dipertimbangkan

### 🔧 Code Contributions

#### Types of Contributions Welcome:

- **Bug fixes**
- **New features**
- **Performance improvements**
- **Documentation improvements**
- **Localization/translations**
- **Test coverage improvements**

## 📝 Pull Request Process

### 1. Create Branch
```bash
git checkout -b feature/amazing-feature
# atau
git checkout -b fix/bug-description
```

### 2. Make Changes
- Follow [coding standards](#coding-standards)
- Add tests jika applicable
- Update documentation jika diperlukan

### 3. Test Changes
```bash
# Validate extension
node tools/validate.js

# Test di browser
npm run build
# Load di Firefox dan Chrome
```

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add amazing feature"
# atau
git commit -m "fix: resolve blocking issue"
```

**Commit Message Format:**
- `feat:` untuk fitur baru
- `fix:` untuk bug fixes
- `docs:` untuk dokumentasi
- `style:` untuk formatting
- `refactor:` untuk code refactoring
- `test:` untuk testing
- `chore:` untuk maintenance

### 5. Push dan Create PR
```bash
git push origin feature/amazing-feature
```

Kemudian create Pull Request di GitHub dengan:
- **Clear title** dan description
- **Link ke related issues**
- **Screenshots** jika UI changes
- **Testing notes**

## 🎨 Coding Standards

### JavaScript
- **ES6+ syntax** dengan modules
- **4 spaces** untuk indentation
- **Semicolons** required
- **camelCase** untuk variables dan functions
- **PascalCase** untuk classes
- **UPPER_CASE** untuk constants

### File Organization
```
src/
├── js/           # JavaScript modules
├── css/          # Stylesheets
├── html/         # HTML pages
└── _locales/     # Internationalization
```

### Code Style
```javascript
// Good
function blockContent(url, filters) {
    const domain = getDomain(url);
    
    if (isWhitelisted(domain)) {
        return false;
    }
    
    return filters.some(filter => matchesFilter(url, filter));
}

// Bad
function blockContent(url,filters){
var domain=getDomain(url)
if(isWhitelisted(domain))return false
return filters.some(filter=>matchesFilter(url,filter))
}
```

### CSS
- **4 spaces** indentation
- **kebab-case** untuk class names
- **Logical property order**: positioning, box model, typography, visual
- **Comments** untuk complex selectors

### HTML
- **4 spaces** indentation
- **Semantic markup**
- **Accessibility attributes**
- **Valid HTML5**

## 🧪 Testing

### Manual Testing
1. **Build extension**: `npm run build`
2. **Load di browser** (Firefox dan Chrome)
3. **Test core functionality**:
   - Ad blocking works
   - Popup displays correctly
   - Dashboard functions properly
   - Settings save/load correctly
   - Whitelist management works

### Validation
```bash
# Validate extension structure
node tools/validate.js

# Check for common issues
npm run lint
```

### Test Cases
- [ ] Extension loads without errors
- [ ] Blocking statistics update correctly
- [ ] Whitelist add/remove functions
- [ ] Settings persist across browser restarts
- [ ] Dashboard navigation works
- [ ] Popup displays current site info

## 📚 Documentation

### Code Documentation
- **JSDoc comments** untuk functions
- **Inline comments** untuk complex logic
- **README updates** untuk new features

### User Documentation
- Update **README.md** jika diperlukan
- Add **screenshots** untuk UI changes
- Update **store descriptions** jika relevan

## 🌍 Localization

### Adding New Languages
1. **Create directory**: `src/_locales/[language_code]/`
2. **Copy messages.json** dari `en/` folder
3. **Translate strings** ke bahasa target
4. **Test** dengan browser language setting

### Translation Guidelines
- **Keep placeholders** (`__MSG_key__`) intact
- **Maintain context** dan tone
- **Test UI** untuk text overflow
- **Follow locale conventions**

## 🏷️ Release Process

### Version Numbering
- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features, backward compatible
- **Patch** (1.0.1): Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Extension validated
- [ ] Store packages created

## ❓ Questions?

- **GitHub Issues**: Untuk bug reports dan feature requests
- **GitHub Discussions**: Untuk general questions
- **Email**: development@vaizbtgads.com

## 🙏 Recognition

Contributors akan diakui di:
- **README.md** contributors section
- **CHANGELOG.md** release notes
- **About page** dalam extension

Terima kasih atas kontribusi Anda! 🎉