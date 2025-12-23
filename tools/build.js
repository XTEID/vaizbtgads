#!/usr/bin/env node

// Vaizbtgads Build Script
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Build configuration
const platforms = ['firefox', 'chromium'];
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy files recursively with proper path handling
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
        // Ensure parent directory exists
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(src, dest);
    }
}

// Build for each platform
platforms.forEach(platform => {
    console.log(`Building for ${platform}...`);
    
    const platformDir = path.join(distDir, platform);
    
    // Clean platform directory
    if (fs.existsSync(platformDir)) {
        fs.rmSync(platformDir, { recursive: true, force: true });
    }
    
    // Create platform directory
    fs.mkdirSync(platformDir, { recursive: true });
    
    // Copy source files
    copyRecursive(srcDir, platformDir);
    
    // Copy platform-specific manifest
    const manifestSrc = path.join(rootDir, 'platform', platform, 'manifest.json');
    const manifestDest = path.join(platformDir, 'manifest.json');
    
    if (fs.existsSync(manifestSrc)) {
        fs.copyFileSync(manifestSrc, manifestDest);
    }
    
    // Copy platform-specific files if they exist
    const platformSrcDir = path.join(rootDir, 'platform', platform);
    if (fs.existsSync(platformSrcDir)) {
        const platformFiles = fs.readdirSync(platformSrcDir);
        platformFiles.forEach(file => {
            if (file !== 'manifest.json') {
                const src = path.join(platformSrcDir, file);
                const dest = path.join(platformDir, file);
                
                if (fs.statSync(src).isFile()) {
                    fs.copyFileSync(src, dest);
                }
            }
        });
    }
    
    console.log(`✓ Built ${platform} to dist/${platform}/`);
});

console.log('\n✅ Build completed successfully!');
console.log('\nTo install:');
console.log('Firefox: Load dist/firefox/ as temporary add-on');
console.log('Chrome: Load dist/chromium/ as unpacked extension');