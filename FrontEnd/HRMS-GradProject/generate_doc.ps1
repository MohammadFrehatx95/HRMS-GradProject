$outputFile = "Frontend_Project_Overview.md"
$rootDir = "."

if (Test-Path $outputFile) {
    Remove-Item $outputFile
}

Add-Content -Path $outputFile -Value "# HRMS Frontend Project`r`n"
Add-Content -Path $outputFile -Value "## Project Structure`r`n"
Add-Content -Path $outputFile -Value '```text'

# Get tree output (ASCII)
$treeOutput = tree src /F /A | Out-String
Add-Content -Path $outputFile -Value $treeOutput
Add-Content -Path $outputFile -Value '```'
Add-Content -Path $outputFile -Value "`r`n## Source Code`r`n"

# Files to include explicitly
$files = @("package.json", "angular.json", "tsconfig.json")

# Add all relevant files from src
$srcFiles = Get-ChildItem -Path src -Recurse -File | Where-Object {
    $_.Extension -match "\.(ts|html|css|json)$" -and
    $_.Name -notmatch "\.spec\.ts$" -and
    $_.FullName -notmatch "assets\\i18n"
} | Select-Object -ExpandProperty FullName

$files += $srcFiles

foreach ($file in $files) {
    if (Test-Path $file) {
        $relativePath = Resolve-Path -Relative $file
        $relativePath = $relativePath -replace "^.\\", ""
        
        $ext = [System.IO.Path]::GetExtension($file).TrimStart('.')
        $lang = $ext
        if ($ext -eq "ts") { $lang = "typescript" }
        elseif ($ext -eq "html") { $lang = "html" }
        elseif ($ext -eq "css") { $lang = "css" }
        elseif ($ext -eq "json") { $lang = "json" }
        
        Add-Content -Path $outputFile -Value "`r`n### File: $relativePath"
        # We need to output three backticks followed by the language string
        $backticks = '```'
        Add-Content -Path $outputFile -Value "$backticks$lang"
        
        try {
            $content = Get-Content -Path $file -Raw -Encoding UTF8
            if ($null -ne $content) {
                # Remove multiple blank lines
                $content = $content -replace "`r`n`r`n`r`n", "`r`n`r`n"
                Add-Content -Path $outputFile -Value $content
            }
        } catch {
            Write-Warning "Could not read $file"
        }
        
        Add-Content -Path $outputFile -Value "$backticks"
    }
}

Write-Host "Generated $outputFile successfully!"
