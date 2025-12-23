#!/usr/bin/env node

// Create Submission ZIP files for stores
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('📦 Creating Submission ZIP Files');
console.log('================================');

const storeDir = path.join(rootDir, 'store-packages');
const submissionDir = path.join(rootDir, 'submission');

// Ensure directories exist
if (!fs.existsSync(storeDir)) {
    console.log('❌ Store packages not found. Run create-store-packages.js first.');
    process.exit(1);
}

if (!fs.existsSync(submissionDir)) {
    fs.mkdirSync(submissionDir, { recursive: true });
}

function createZip(sourceDir, zipName, description) {
    console.log(`\n📦 Creating ${description}...`);
    
    if (!fs.existsSync(sourceDir)) {
        console.log(`❌ Source directory not found: ${sourceDir}`);
        return false;
    }
    
    const zipPath = path.join(submissionDir, zipName);
    
    try {
        // Use PowerShell to create ZIP with proper paths (Unix-style for Firefox)
        const psCommand = `
            $source = "${sourceDir.replace(/\\/g, '\\\\')}"
            $destination = "${zipPath.replace(/\\/g, '\\\\')}"
            
            # Remove existing ZIP
            if (Test-Path $destination) { Remove-Item $destination -Force }
            
            # Create ZIP with proper paths
            Add-Type -AssemblyName System.IO.Compression.FileSystem
            [System.IO.Compression.ZipFile]::CreateFromDirectory($source, $destination)
        `;
        
        execSync(`powershell -Command "${psCommand}"`, { stdio: 'inherit' });
        
        const stats = fs.statSync(zipPath);
        console.log(`✅ Created: ${zipName} (${Math.round(stats.size / 1024)} KB)`);
        
        return true;
    } catch (error) {
        console.log(`❌ Failed to create ${zipName}: ${error.message}`);
        return false;
    }
}

// Create submission ZIPs
const firefoxSuccess = createZip(
    path.join(storeDir, 'firefox-amo'),
    'vaizbtgads-firefox-amo.zip',
    'Firefox Add-ons submission package'
);

const chromeSuccess = createZip(
    path.join(storeDir, 'chrome-webstore'),
    'vaizbtgads-chrome-webstore.zip',
    'Chrome Web Store submission package'
);

console.log('\n📊 SUBMISSION SUMMARY:');
console.log('=====================');

if (firefoxSuccess) {
    console.log('✅ Firefox AMO: submission/vaizbtgads-firefox-amo.zip');
    console.log('   📤 Submit to: https://addons.mozilla.org/developers/');
} else {
    console.log('❌ Firefox AMO: Failed to create package');
}

if (chromeSuccess) {
    console.log('✅ Chrome Web Store: submission/vaizbtgads-chrome-webstore.zip');
    console.log('   📤 Submit to: https://chrome.google.com/webstore/devconsole/');
} else {
    console.log('❌ Chrome Web Store: Failed to create package');
}

console.log('\n🎯 SUBMISSION CHECKLIST:');
console.log('========================');
console.log('□ Test extension in Firefox (about:debugging)');
console.log('□ Test extension in Chrome (chrome://extensions/)');
console.log('□ Prepare store descriptions and screenshots');
console.log('□ Submit to Firefox Add-ons (1-7 days review)');
console.log('□ Submit to Chrome Web Store (1-3 days review)');
console.log('');
console.log('💡 See store-assets/ folder for descriptions and documentation.');