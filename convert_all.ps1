Get-ChildItem -Path "./public/images" -Filter "*.jpg" | ForEach-Object {
    $outputFile = "./public/images/$($_.BaseName).webp"
    Write-Host "Converting $($_.Name) to WebP..."
    & cwebp -q 80 -exact -noalpha -sharp_yuv -m 6 $_.FullName -o $outputFile
}
