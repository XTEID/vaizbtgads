#!/usr/bin/env node

// Create Store Packages for Vaizbtgads
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🏪 Creating Store Packages for Vaizbtgads');
console.log('==========================================');

// Ensure dist directory exists
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
    console.log('❌ Dist directory not found. Run "npm run build" first.');
    process.exit(1);
}

// Create store-packages directory
const storeDir = path.join(rootDir, 'store-packages');
if (!fs.existsSync(storeDir)) {
    fs.mkdirSync(storeDir, { recursive: true });
}

// Copy files with proper structure for stores
function copyForStore(platform, storeName) {
    console.log(`\n📦 Creating ${storeName} package...`);
    
    const sourceDir = path.join(distDir, platform);
    const targetDir = path.join(storeDir, storeName);
    
    // Clean target directory
    if (fs.existsSync(targetDir)) {
        fs.rmSync(targetDir, { recursive: true, force: true });
    }
    
    // Create target directory
    fs.mkdirSync(targetDir, { recursive: true });
    
    // Copy all files
    copyRecursive(sourceDir, targetDir);
    
    console.log(`✅ ${storeName} package created at: store-packages/${storeName}/`);
    
    // List contents
    console.log(`📋 Package contents:`);
    listContents(targetDir, '');
}

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        const files = fs.readdirSync(src);
        files.forEach(file => {
            copyRecursive(path.join(src, file), path.join(dest, file));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function listContents(dir, prefix) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
            console.log(`   ${prefix}📁 ${item}/`);
            listContents(itemPath, prefix + '  ');
        } else {
            const size = stat.size;
            console.log(`   ${prefix}📄 ${item} (${size} bytes)`);
        }
    });
}

// Create packages for both stores
copyForStore('firefox', 'firefox-amo');
copyForStore('chromium', 'chrome-webstore');

console.log('\n🎉 Store packages created successfully!');
console.log('\n📋 Next steps:');
console.log('1. Firefox Add-ons (AMO):');
console.log('   - Zip the contents of store-packages/firefox-amo/');
console.log('   - Submit to: https://addons.mozilla.org/developers/');
console.log('');
console.log('2. Chrome Web Store:');
console.log('   - Zip the contents of store-packages/chrome-webstore/');
console.log('   - Submit to: https://chrome.google.com/webstore/devconsole/');
console.log('');
console.log('💡 Use the create-submission-zips.js script to create final ZIP files.');