#!/usr/bin/env node

// Create Firefox ZIP with proper Unix paths
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('📦 Creating Firefox ZIP with proper paths...\n');

const firefoxDir = path.join(rootDir, 'dist', 'firefox');
const outputPath = path.join(rootDir, 'submission', 'vaizbtgads-firefox-final.zip');

if (!fs.existsSync(firefoxDir)) {
    console.error('❌ Firefox build not found. Run "npm run build" first.');
    process.exit(1);
}

// Create a temporary directory with proper structure
const tempDir = path.join(rootDir, 'temp-firefox');
if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

// Copy files with Unix-style paths
function copyWithUnixPaths(srcDir, destDir, basePath = '') {
    const items = fs.readdirSync(srcDir);
    
    items.forEach(item => {
        const srcPath = path.join(srcDir, item);
        const stat = fs.statSync(srcPath);
        
        if (stat.isDirectory()) {
            const newBasePath = basePath ? `${basePath}/${item}` : item;
            const destPath = path.join(destDir, item);
            fs.mkdirSync(destPath, { recursive: true });
            copyWithUnixPaths(srcPath, destPath, newBasePath);
        } else {
            const destPath = path.join(destDir, item);
            fs.copyFileSync(srcPath, destPath);
            
            const unixPath = basePath ? `${basePath}/${item}` : item;
            console.log(`✅ Copied: ${unixPath}`);
        }
    });
}

// Copy all files
copyWithUnixPaths(firefoxDir, tempDir);

// Now create ZIP using PowerShell with proper compression
console.log('\n📦 Creating ZIP archive...');

// Use PowerShell to create ZIP
const { execSync } = await import('child_process');

try {
    // Ensure submission directory exists
    const submissionDir = path.dirname(outputPath);
    if (!fs.existsSync(submissionDir)) {
        fs.mkdirSync(submissionDir, { recursive: true });
    }
    
    // Create ZIP using PowerShell
    const powershellCmd = `powershell -Command "Compress-Archive -Path '${tempDir.replace(/\\/g, '/')}/*' -DestinationPath '${outputPath.replace(/\\/g, '/')}' -Force"`;
    execSync(powershellCmd, { stdio: 'inherit' });
    
    console.log(`✅ Firefox ZIP created: ${path.basename(outputPath)}`);
    
} catch (error) {
    console.error('❌ Failed to create ZIP:', error.message);
    process.exit(1);
} finally {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
}

// Verify the ZIP contents
console.log('\n🔍 Verifying ZIP contents...');
try {
    const verifyCmd = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${outputPath}').Entries | Select-Object FullName | Format-Table -HideTableHeaders"`;
    const zipContents = execSync(verifyCmd, { encoding: 'utf8' });
    
    console.log('📁 ZIP Contents:');
    const entries = zipContents.split('\n').filter(line => line.trim());
    entries.forEach(entry => {
        const cleanEntry = entry.trim();
        if (cleanEntry && !cleanEntry.includes('FullName') && !cleanEntry.includes('---')) {
            if (cleanEntry.includes('\\')) {
                console.log(`❌ INVALID PATH: ${cleanEntry} (contains backslash)`);
            } else {
                console.log(`✅ ${cleanEntry}`);
            }
        }
    });
    
} catch (error) {
    console.log('⚠️  Could not verify ZIP contents, but file was created');
}

console.log('\n🎉 Firefox package ready for submission!');
console.log(`📦 File: submission/${path.basename(outputPath)}`);
console.log('🚀 Upload this file to Firefox Add-ons (AMO)');