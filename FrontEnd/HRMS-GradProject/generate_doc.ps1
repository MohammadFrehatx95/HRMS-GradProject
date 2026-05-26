$PSDefaultParameterValues['*:Encoding'] = 'utf8'
$outputFile = "Frontend_Project_Overview.md"

if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

Add-Content -Path $outputFile -Value "# HRMS Frontend Project`r`n"
Add-Content -Path $outputFile -Value "## Project Structure`r`n"
Add-Content -Path $outputFile -Value '```text'
$treeOutput = tree src /F /A | Out-String
Add-Content -Path $outputFile -Value $treeOutput
Add-Content -Path $outputFile -Value '```'
Add-Content -Path $outputFile -Value "`r`n## Source Code`r`n"

# package.json فقط من الجذر
$files = @("package.json")

$srcFiles = Get-ChildItem -Path src -Recurse -File | Where-Object {

    # فقط ملفات TypeScript
    $_.Extension -eq ".ts" -and

    # استثناء ملفات الاختبار
    $_.Name -notmatch "\.spec\.ts$" -and

    # استثناء ملفات الترجمة
    $_.Name -notmatch "^translations\.ts$" -and
    $_.FullName -notmatch "\\i18n\\" -and

    # استثناء ملفات البيئة
    $_.FullName -notmatch "environments\\" -and

    # استثناء الملفات المولّدة تلقائياً
    $_.FullName -notmatch "\\.angular\\" -and
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -notmatch "\\.cache\\" -and
    $_.Name -notmatch "\.d\.ts$"

} | Sort-Object FullName | Select-Object -ExpandProperty FullName

$files += $srcFiles

$totalFiles = $files.Count
$current = 0

foreach ($file in $files) {
    if (Test-Path $file) {
        $current++
        Write-Host "[$current/$totalFiles] Processing: $file"

        $relativePath = Resolve-Path -Relative $file
        $relativePath = $relativePath -replace "^.\\", ""

        $ext = [System.IO.Path]::GetExtension($file).TrimStart('.')
        $lang = if ($ext -eq "ts") { "typescript" } else { $ext }

        $backticks = '```'
        Add-Content -Path $outputFile -Value "`r`n### File: $relativePath"
        Add-Content -Path $outputFile -Value "$backticks$lang"

        try {
            $content = Get-Content -Path $file -Raw -Encoding UTF8
            if ($null -ne $content) {
                $content = $content -replace "`r`n`r`n`r`n", "`r`n`r`n"
                Add-Content -Path $outputFile -Value $content -Encoding UTF8
            }
        } catch {
            Write-Warning "Could not read: $file"
        }

        Add-Content -Path $outputFile -Value "$backticks"
    }
}

$lineCount = (Get-Content $outputFile).Count
Write-Host ""
Write-Host "Done! Generated: $outputFile"
Write-Host "Total files processed: $current"
Write-Host "Total lines: $lineCount"