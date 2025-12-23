#!/usr/bin/env node

// Create Firefox ZIP manually with proper Unix paths
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('📦 Creating Firefox ZIP with Unix paths (manual method)...\n');

const firefoxDir = path.join(rootDir, 'dist', 'firefox');
const outputPath = path.join(rootDir, 'submission', 'vaizbtgads-firefox-unix.zip');

if (!fs.existsSync(firefoxDir)) {
    console.error('❌ Firefox build not found. Run "npm run build" first.');
    process.exit(1);
}

// Create file list with Unix paths
const fileList = [];

function collectFiles(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            const unixPath = basePath ? `${basePath}/${item}` : item;
            collectFiles(fullPath, unixPath);
        } else {
            const unixPath = basePath ? `${basePath}/${item}` : item;
            fileList.push({
                localPath: fullPath,
                zipPath: unixPath
            });
        }
    });
}

collectFiles(firefoxDir);

console.log('📁 Files to include:');
fileList.forEach(file => {
    console.log(`✅ ${file.zipPath}`);
});

// Create ZIP using 7-Zip if available, otherwise use PowerShell with manual file addition
const { execSync } = await import('child_process');

try {
    // Ensure submission directory exists
    const submissionDir = path.dirname(outputPath);
    if (!fs.existsSync(submissionDir)) {
        fs.mkdirSync(submissionDir, { recursive: true });
    }
    
    // Try to use 7-Zip first (if available)
    let zipCreated = false;
    
    try {
        console.log('\n📦 Trying 7-Zip...');
        execSync('7z', { stdio: 'ignore' });
        
        // 7-Zip is available, use it
        const tempListFile = path.join(rootDir, 'temp-filelist.txt');
        const fileListContent = fileList.map(file => `"${file.localPath}"`).join('\n');
        fs.writeFileSync(tempListFile, fileListContent);
        
        const cmd = `7z a -tzip "${outputPath}" @"${tempListFile}"`;
        execSync(cmd, { stdio: 'inherit' });
        
        // Clean up
        fs.unlinkSync(tempListFile);
        zipCreated = true;
        console.log('✅ ZIP created with 7-Zip');
        
    } catch (e) {
        console.log('⚠️  7-Zip not available, using alternative method...');
    }
    
    if (!zipCreated) {
        // Use Node.js built-in method or PowerShell
        console.log('\n📦 Creating ZIP with PowerShell (individual files)...');
        
        // Delete existing ZIP if it exists
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
        
        // Create empty ZIP
        execSync(`powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::Open('${outputPath}', 'Create').Dispose()"`, { stdio: 'inherit' });
        
        // Add files one by one with proper paths
        fileList.forEach(file => {
            const escapedLocalPath = file.localPath.replace(/'/g, "''");
            const escapedZipPath = file.zipPath.replace(/'/g, "''");
            
            const cmd = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; $zip = [System.IO.Compression.ZipFile]::Open('${outputPath}', 'Update'); [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, '${escapedLocalPath}', '${escapedZipPath}'); $zip.Dispose()"`;
            
            try {
                execSync(cmd, { stdio: 'pipe' });
                console.log(`✅ Added: ${file.zipPath}`);
            } catch (error) {
                console.log(`❌ Failed to add: ${file.zipPath}`);
            }
        });
        
        zipCreated = true;
    }
    
    if (zipCreated) {
        console.log(`\n✅ Firefox ZIP created: ${path.basename(outputPath)}`);
    }
    
} catch (error) {
    console.error('❌ Failed to create ZIP:', error.message);
    process.exit(1);
}

// Verify the ZIP contents
console.log('\n🔍 Verifying ZIP contents...');
try {
    const verifyCmd = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${outputPath}').Entries | ForEach-Object { $_.FullName }"`;
    const zipContents = execSync(verifyCmd, { encoding: 'utf8' });
    
    console.log('📁 ZIP Contents:');
    const entries = zipContents.split('\n').filter(line => line.trim());
    let hasBackslash = false;
    
    entries.forEach(entry => {
        const cleanEntry = entry.trim();
        if (cleanEntry) {
            if (cleanEntry.includes('\\')) {
                console.log(`❌ INVALID PATH: ${cleanEntry} (contains backslash)`);
                hasBackslash = true;
            } else {
                console.log(`✅ ${cleanEntry}`);
            }
        }
    });
    
    if (!hasBackslash) {
        console.log('\n🎉 All paths are Unix-style! Ready for Firefox submission!');
    } else {
        console.log('\n⚠️  Some paths still contain backslashes. May need manual fix.');
    }
    
} catch (error) {
    console.log('⚠️  Could not verify ZIP contents, but file was created');
}

console.log(`\n📦 File: submission/${path.basename(outputPath)}`);
console.log('🚀 Upload this file to Firefox Add-ons (AMO)');