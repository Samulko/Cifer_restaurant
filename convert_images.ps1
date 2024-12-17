$sourceDir = ".\public\images"
$outputDir = ".\public\images\responsive"

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "$outputDir\high"
New-Item -ItemType Directory -Force -Path "$outputDir\medium"
New-Item -ItemType Directory -Force -Path "$outputDir\small"

# Get all jpg files
Get-ChildItem -Path $sourceDir -Filter "*.jpg" | ForEach-Object {
    $baseName = $_.BaseName
    
    # High quality version (92%, exact color preservation)
    cwebp -q 92 -exact -noalpha -sharp_yuv -m 6 $_.FullName -o "$outputDir\high\$baseName.webp"
    
    # Medium quality version (85%)
    cwebp -q 85 -sharp_yuv -m 4 $_.FullName -o "$outputDir\medium\$baseName.webp"
    
    # Small quality version (75%, optimized for size)
    cwebp -q 75 -sharp_yuv -m 3 $_.FullName -o "$outputDir\small\$baseName.webp"
}
