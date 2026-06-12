$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open('C:\Users\moham\OneDrive\Desktop\Documantion-GradProject-Final.docx', $false, $true)
$results = @()
for ($i = 1; $i -le $doc.Paragraphs.Count; $i++) {
    $text = $doc.Paragraphs.Item($i).Range.Text.Trim()
    if ($text -match '(?i)(Front-?end|Angular|UI/?UX)') {
        $pageNum = $doc.Paragraphs.Item($i).Range.Information(3)
        $shortText = if ($text.Length -gt 150) { $text.Substring(0, 150) + "..." } else { $text }
        $results += "Page $pageNum : $shortText"
    }
}
$doc.Close()
$word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
$results | Out-String
