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
 
$files = @("package.json")
 
$srcFiles = Get-ChildItem -Path src -Recurse -File | Where-Object {
    $_.Extension -match "\.ts$" -and
    $_.Name -notmatch "\.spec\.ts$" -and
    $_.Name -notmatch "^translations\.ts$" -and
    $_.FullName -notmatch "environments\\"
} | Select-Object -ExpandProperty FullName
 
$files += $srcFiles
 
foreach ($file in $files) {
    if (Test-Path $file) {
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
            Write-Warning "Could not read $file"
        }
 
        Add-Content -Path $outputFile -Value "$backticks"
    }
}
 
Write-Host "Generated $outputFile successfully!"