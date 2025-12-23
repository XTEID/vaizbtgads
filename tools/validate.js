#!/usr/bin/env node

// Validation tool for Vaizbtgads extension
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🔍 Validating Vaizbtgads extension...\n');

let errors = 0;
let warnings = 0;

function error(message) {
    console.log(`❌ ERROR: ${message}`);
    errors++;
}

function warning(message) {
    console.log(`⚠️  WARNING: ${message}`);
    warnings++;
}

function success(message) {
    console.log(`✅ ${message}`);
}

// Validate Firefox build
function validateFirefox() {
    console.log('📋 Validating Firefox build...');
    
    const firefoxDir = path.join(rootDir, 'dist', 'firefox');
    if (!fs.existsSync(firefoxDir)) {
        error('Firefox build directory not found');
        return;
    }
    
    // Check manifest
    const manifestPath = path.join(firefoxDir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
        error('manifest.json not found');
        return;
    }
    
    try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        
        // Required fields
        if (!manifest.name) error('manifest.name is required');
        if (!manifest.version) error('manifest.version is required');
        if (!manifest.manifest_version) error('manifest.manifest_version is required');
        if (!manifest.description) error('manifest.description is required');
        
        // Check localization
        if (manifest.description.startsWith('__MSG_')) {
            const localeDir = path.join(firefoxDir, '_locales', 'en');
            if (!fs.existsSync(localeDir)) {
                error('Default locale (en) directory not found');
            } else {
                const messagesPath = path.join(localeDir, 'messages.json');
                if (!fs.existsSync(messagesPath)) {
                    error('messages.json not found in default locale');
                } else {
                    try {
                        const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
                        const msgKey = manifest.description.replace('__MSG_', '').replace('__', '');
                        if (!messages[msgKey]) {
                            error(`Localization key '${msgKey}' not found in messages.json`);
                        } else {
                            success('Localization properly configured');
                        }
                    } catch (e) {
                        error('Invalid messages.json format');
                    }
                }
            }
        }
        
        // Check icons
        if (manifest.icons) {
            Object.values(manifest.icons).forEach(iconPath => {
                const fullIconPath = path.join(firefoxDir, iconPath);
                if (!fs.existsSync(fullIconPath)) {
                    error(`Icon not found: ${iconPath}`);
                } else {
                    success(`Icon found: ${iconPath}`);
                }
            });
        }
        
        // Check browser_action icons
        if (manifest.browser_action && manifest.browser_action.default_icon) {
            Object.values(manifest.browser_action.default_icon).forEach(iconPath => {
                const fullIconPath = path.join(firefoxDir, iconPath);
                if (!fs.existsSync(fullIconPath)) {
                    error(`Browser action icon not found: ${iconPath}`);
                } else {
                    success(`Browser action icon found: ${iconPath}`);
                }
            });
        }
        
        // Check content scripts
        if (manifest.content_scripts) {
            manifest.content_scripts.forEach((script, index) => {
                if (script.js) {
                    script.js.forEach(jsPath => {
                        const fullJsPath = path.join(firefoxDir, jsPath);
                        if (!fs.existsSync(fullJsPath)) {
                            error(`Content script not found: ${jsPath}`);
                        } else {
                            success(`Content script found: ${jsPath}`);
                        }
                    });
                }
            });
        }
        
        // Check background page
        if (manifest.background && manifest.background.page) {
            const bgPath = path.join(firefoxDir, manifest.background.page);
            if (!fs.existsSync(bgPath)) {
                error(`Background page not found: ${manifest.background.page}`);
            } else {
                success(`Background page found: ${manifest.background.page}`);
            }
        }
        
        // Check popup
        if (manifest.browser_action && manifest.browser_action.default_popup) {
            const popupPath = path.join(firefoxDir, manifest.browser_action.default_popup);
            if (!fs.existsSync(popupPath)) {
                error(`Popup page not found: ${manifest.browser_action.default_popup}`);
            } else {
                success(`Popup page found: ${manifest.browser_action.default_popup}`);
            }
        }
        
        // Check options page
        if (manifest.options_ui && manifest.options_ui.page) {
            const optionsPath = path.join(firefoxDir, manifest.options_ui.page);
            if (!fs.existsSync(optionsPath)) {
                error(`Options page not found: ${manifest.options_ui.page}`);
            } else {
                success(`Options page found: ${manifest.options_ui.page}`);
            }
        }
        
        // Validate permissions
        if (manifest.permissions) {
            const dangerousPerms = ['<all_urls>', 'webRequest', 'webRequestBlocking'];
            dangerousPerms.forEach(perm => {
                if (manifest.permissions.includes(perm)) {
                    warning(`Using sensitive permission: ${perm} - make sure to justify this in store description`);
                }
            });
        }
        
        // Check browser_specific_settings for Firefox
        if (manifest.browser_specific_settings && manifest.browser_specific_settings.gecko) {
            const gecko = manifest.browser_specific_settings.gecko;
            
            if (!gecko.id) {
                error('Firefox extension ID is required');
            } else {
                success(`Firefox extension ID: ${gecko.id}`);
            }
            
            if (!gecko.data_collection_permissions) {
                error('data_collection_permissions is required for Firefox extensions');
            } else {
                success('data_collection_permissions is properly configured');
            }
        } else {
            warning('browser_specific_settings.gecko not found - recommended for Firefox');
        }
        
        success('Manifest structure is valid');
        
    } catch (e) {
        error(`Invalid manifest.json: ${e.message}`);
    }
}

// Validate Chrome build
function validateChrome() {
    console.log('\n📋 Validating Chrome build...');
    
    const chromeDir = path.join(rootDir, 'dist', 'chromium');
    if (!fs.existsSync(chromeDir)) {
        error('Chrome build directory not found');
        return;
    }
    
    const manifestPath = path.join(chromeDir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
        error('Chrome manifest.json not found');
        return;
    }
    
    try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        
        // Chrome-specific validations
        if (manifest.manifest_version !== 2) {
            warning('Consider upgrading to Manifest V3 for future Chrome compatibility');
        }
        
        success('Chrome manifest is valid');
        
    } catch (e) {
        error(`Invalid Chrome manifest.json: ${e.message}`);
    }
}

// Main validation
validateFirefox();
validateChrome();

console.log('\n📊 Validation Summary:');
console.log(`✅ Errors: ${errors}`);
console.log(`⚠️  Warnings: ${warnings}`);

if (errors === 0) {
    console.log('\n🎉 Extension is ready for submission!');
    console.log('\nNext steps:');
    console.log('1. Upload vaizbtgads-firefox-fixed.zip to Firefox AMO');
    console.log('2. Upload vaizbtgads-chrome.zip to Chrome Web Store');
} else {
    console.log('\n❌ Please fix the errors before submitting');
    process.exit(1);
}