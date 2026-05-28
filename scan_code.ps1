$srcPath = 'D:\Projects\HRMS-Team\FrontEnd\HRMS-GradProject\src\app'

Write-Host "=== console.log / console.error / console.warn ===" -ForegroundColor Yellow
Get-ChildItem -Path $srcPath -Recurse -Filter '*.ts' | ForEach-Object {
    $file = $_
    $lines = Get-Content $file.FullName
    $found = @()
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'console\.(log|error|warn)') {
            $found += "  Line $($i+1): $($lines[$i].Trim())"
        }
    }
    if ($found.Count -gt 0) {
        Write-Host $file.Name -ForegroundColor Cyan
        $found | ForEach-Object { Write-Host $_ }
    }
}

Write-Host ""
Write-Host "=== Unused/Commented-Out Code Patterns (TODO/FIXME/HACK) ===" -ForegroundColor Yellow
Get-ChildItem -Path $srcPath -Recurse -Include '*.ts','*.html' | ForEach-Object {
    $file = $_
    $lines = Get-Content $file.FullName
    $found = @()
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'TODO|FIXME|HACK|TEMP|REMOVE') {
            $found += "  Line $($i+1): $($lines[$i].Trim())"
        }
    }
    if ($found.Count -gt 0) {
        Write-Host $file.Name -ForegroundColor Cyan
        $found | ForEach-Object { Write-Host $_ }
    }
}

Write-Host ""
Write-Host "=== Debugger statements ===" -ForegroundColor Yellow
Get-ChildItem -Path $srcPath -Recurse -Filter '*.ts' | ForEach-Object {
    $file = $_
    $lines = Get-Content $file.FullName
    $found = @()
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match '^\s*debugger\s*;?\s*$') {
            $found += "  Line $($i+1): $($lines[$i].Trim())"
        }
    }
    if ($found.Count -gt 0) {
        Write-Host $file.Name -ForegroundColor Cyan
        $found | ForEach-Object { Write-Host $_ }
    }
}

Write-Host ""
Write-Host "=== Empty catch blocks ===" -ForegroundColor Yellow
Get-ChildItem -Path $srcPath -Recurse -Filter '*.ts' | ForEach-Object {
    $file = $_
    $content = [System.IO.File]::ReadAllText($file.FullName)
    if ($content -match 'catch\s*\([^)]*\)\s*\{\s*\}') {
        Write-Host "  $($file.Name) - has empty catch block" -ForegroundColor DarkRed
    }
}

Write-Host ""
Write-Host "=== Large files (potential code bloat > 500 lines) ===" -ForegroundColor Yellow
Get-ChildItem -Path $srcPath -Recurse -Filter '*.ts' | ForEach-Object {
    $lines = (Get-Content $_.FullName).Count
    if ($lines -gt 500) {
        Write-Host "  $($_.Name): $lines lines" -ForegroundColor DarkYellow
    }
}

Write-Host ""
Write-Host "=== Scan complete ===" -ForegroundColor Green
