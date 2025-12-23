# Vaizbtgads Release Publisher
# Script untuk membantu publish release ke GitHub

Write-Host "Vaizbtgads Release Publisher" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Cek apakah file ZIP sudah ada
$firefoxZip = "vaizbtgads-firefox-v1.0.0.zip"
$chromeZip = "vaizbtgads-chrome-v1.0.0.zip"

Write-Host "Checking release files..." -ForegroundColor Yellow

if (Test-Path $firefoxZip) {
    $firefoxSize = (Get-Item $firefoxZip).Length
    $firefoxSizeKB = [math]::Round($firefoxSize/1024, 1)
    Write-Host "Firefox package: $firefoxZip ($firefoxSizeKB KB)" -ForegroundColor Green
} else {
    Write-Host "Firefox package not found!" -ForegroundColor Red
    exit 1
}

if (Test-Path $chromeZip) {
    $chromeSize = (Get-Item $chromeZip).Length
    $chromeSizeKB = [math]::Round($chromeSize/1024, 1)
    Write-Host "Chrome package: $chromeZip ($chromeSizeKB KB)" -ForegroundColor Green
} else {
    Write-Host "Chrome package not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "All files verified successfully!" -ForegroundColor Green
Write-Host ""

# Instruksi untuk publish
Write-Host "MANUAL RELEASE INSTRUCTIONS:" -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "1. Open browser and go to:" -ForegroundColor White
Write-Host "   https://github.com/XTEID/vaizbtgads/releases/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Fill in the release form:" -ForegroundColor White
Write-Host "   - Tag version: v1.0.0 (should be pre-selected)" -ForegroundColor Gray
Write-Host "   - Release title: Vaizbtgads v1.0.0 - Initial Release" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Upload these files by dragging them to the upload area:" -ForegroundColor White
Write-Host "   - $firefoxZip" -ForegroundColor Gray
Write-Host "   - $chromeZip" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Copy release notes from: RELEASE_NOTES_v1.0.0.md" -ForegroundColor White
Write-Host ""
Write-Host "5. Click 'Publish release'" -ForegroundColor White
Write-Host ""

# Buka browser otomatis
Write-Host "Opening GitHub release page..." -ForegroundColor Yellow
Start-Process "https://github.com/XTEID/vaizbtgads/releases/new"

Write-Host ""
Write-Host "Ready to publish! Follow the instructions above." -ForegroundColor Green
Write-Host ""

# Tampilkan ringkasan
Write-Host "📊 RELEASE SUMMARY:" -ForegroundColor Magenta
Write-Host "==================" -ForegroundColor Magenta
Write-Host "Version: v1.0.0" -ForegroundColor White
Write-Host "Firefox Package: $([math]::Round($firefoxSize/1KB, 1)) KB" -ForegroundColor White
Write-Host "Chrome Package: $([math]::Round($chromeSize/1KB, 1)) KB" -ForegroundColor White
Write-Host "Repository: https://github.com/XTEID/vaizbtgads" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")