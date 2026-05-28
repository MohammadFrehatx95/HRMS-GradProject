$srcPath = 'D:\Projects\HRMS-Team\FrontEnd\HRMS-GradProject\src\app'

Write-Host "Removing console.log/error/warn/debug statements..." -ForegroundColor Cyan

Get-ChildItem -Path $srcPath -Recurse -Filter '*.ts' | ForEach-Object {
    $file = $_.FullName
    $content = [System.IO.File]::ReadAllText($file)

    $cleaned = [System.Text.RegularExpressions.Regex]::Replace(
        $content,
        '\r?\n[^\n]*console\.(log|warn|debug)\([^;]*\);',
        '',
        [System.Text.RegularExpressions.RegexOptions]::Multiline
    )

    if ($cleaned -ne $content) {
        [System.IO.File]::WriteAllText($file, $cleaned, [System.Text.Encoding]::UTF8)
        Write-Host "  Cleaned: $($_.Name)"
    }
}

Write-Host "Done." -ForegroundColor Green
