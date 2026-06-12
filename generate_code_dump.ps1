$desktopPath = [Environment]::GetFolderPath("Desktop")
$outputDir = Join-Path $desktopPath "HRMS_Project_Code"
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$backendOut = Join-Path $outputDir "Backend_Code.md"
$frontendOut = Join-Path $outputDir "Frontend_Code.md"

$sourceRoot = "d:\Projects\HRMS-Team"

function Get-Tree {
    param($path, $indent, $excludeDirs, $includeExts, $excludeFiles)
    $result = ""
    $items = Get-ChildItem -Path $path | Sort-Object
    foreach ($item in $items) {
        if ($item.PSIsContainer) {
            if ($excludeDirs -notcontains $item.Name) {
                $result += "${indent}- /" + $item.Name + "`n"
                $result += Get-Tree -path $item.FullName -indent "$indent  " -excludeDirs $excludeDirs -includeExts $includeExts -excludeFiles $excludeFiles
            }
        } else {
            $ext = $item.Extension
            if (($includeExts -contains $ext -or $includeExts -eq '*') -and ($excludeFiles -notcontains $item.Name)) {
                $result += "${indent}- " + $item.Name + "`n"
            }
        }
    }
    return $result
}

function Write-Files {
    param($path, $outFile, $excludeDirs, $includeExts, $excludeFiles)
    $items = Get-ChildItem -Path $path -Recurse | Where-Object { -not $_.PSIsContainer }
    foreach ($item in $items) {
        $skip = $false
        foreach ($ex in $excludeDirs) {
            if ($item.FullName -match "\\$ex\\") {
                $skip = $true
                break
            }
        }
        if ($skip) { continue }
        
        if ($excludeFiles -contains $item.Name) { continue }
        
        $ext = $item.Extension
        if ($includeExts -contains $ext -or $includeExts -eq '*') {
            $relPath = $item.FullName.Substring($sourceRoot.Length + 1)
            $content = Get-Content $item.FullName -Raw -ErrorAction SilentlyContinue
            if ($content -ne $null) {
                Add-Content -Path $outFile -Value "`n### File: $relPath`n" -Encoding UTF8
                $lang = ""
                if ($ext -eq ".cs") { $lang = "csharp" }
                elseif ($ext -eq ".ts") { $lang = "typescript" }
                elseif ($ext -eq ".html") { $lang = "html" }
                elseif ($ext -eq ".scss" -or $ext -eq ".css") { $lang = "css" }
                elseif ($ext -eq ".json") { $lang = "json" }
                Add-Content -Path $outFile -Value "````$lang`n$content`n``````n" -Encoding UTF8
            }
        }
    }
}

# --- Backend ---
$beDirs = @("Application", "Domain", "Infrastructure", "HRMS-GradProject")
$beExcludeDirs = @("bin", "obj", ".vs", "Migrations", "TestConfig", "FidoTest", ".git", ".github", ".vscode") 
$beIncludeExts = @(".cs")
$beExcludeFiles = @("AssemblyAttributes.cs")

Set-Content -Path $backendOut -Value "# Backend Structure`n" -Encoding UTF8

foreach ($dir in $beDirs) {
    $fullPath = Join-Path $sourceRoot $dir
    if (Test-Path $fullPath) {
        Add-Content -Path $backendOut -Value "## /$dir`n" -Encoding UTF8
        $tree = Get-Tree -path $fullPath -indent "" -excludeDirs $beExcludeDirs -includeExts $beIncludeExts -excludeFiles $beExcludeFiles
        Add-Content -Path $backendOut -Value "$tree`n" -Encoding UTF8
    }
}

Add-Content -Path $backendOut -Value "`n# Backend Source Code`n" -Encoding UTF8
foreach ($dir in $beDirs) {
    $fullPath = Join-Path $sourceRoot $dir
    if (Test-Path $fullPath) {
        Write-Files -path $fullPath -outFile $backendOut -excludeDirs $beExcludeDirs -includeExts $beIncludeExts -excludeFiles $beExcludeFiles
    }
}

# --- Frontend ---
$feDir = "FrontEnd\HRMS-GradProject"
$feFullPath = Join-Path $sourceRoot $feDir
$feExcludeDirs = @("node_modules", ".angular", "dist", ".vscode", "i18n", "translations", "locales", "public", ".git") 
$feIncludeExts = @(".ts", ".html", ".scss", ".css", ".json")
$feExcludeFiles = @("package-lock.json", "ar.json", "en.json", "messages.xlf", "translate.js")

Set-Content -Path $frontendOut -Value "# Frontend Structure`n" -Encoding UTF8
if (Test-Path $feFullPath) {
    $tree = Get-Tree -path $feFullPath -indent "" -excludeDirs $feExcludeDirs -includeExts $feIncludeExts -excludeFiles $feExcludeFiles
    Add-Content -Path $frontendOut -Value "$tree`n" -Encoding UTF8
    
    Add-Content -Path $frontendOut -Value "`n# Frontend Source Code`n" -Encoding UTF8
    Write-Files -path $feFullPath -outFile $frontendOut -excludeDirs $feExcludeDirs -includeExts $feIncludeExts -excludeFiles $feExcludeFiles
}

Write-Output "Done. Files created at $outputDir"
