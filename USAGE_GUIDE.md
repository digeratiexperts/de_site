# 📖 Digital Notebook Flipper - Usage Guide

## Quick Start Guide

### Step 1: Open the Application

1. Open `index.html` in your web browser
2. You'll see a beautiful landing page with upload options

### Step 2: Upload Your Document

#### For PDF Files:
1. Click the "Choose File" button
2. Select any PDF file from your computer
3. The application will automatically load and render all pages
4. You'll be taken to the flipbook viewer

#### For Word Documents (.docx):
1. **Option A**: Convert to PDF first (recommended)
   - Open your Word document
   - File → Save As → PDF
   - Upload the PDF

2. **Option B**: Use the app's guided conversion
   - Upload the .docx file
   - Follow the on-screen instructions
   - Convert using recommended online tools
   - Upload the converted PDF

#### For PowerPoint (.pptx):
1. **Option A**: Convert to PDF first (recommended)
   - Open your PowerPoint
   - File → Export → Create PDF
   - Upload the PDF

2. **Option B**: Use the app's guided conversion
   - Upload the .pptx file
   - Follow the on-screen instructions
   - Convert using recommended online tools

## Navigation Controls

### Mouse/Touch Controls

| Action | Result |
|--------|--------|
| Click left side of page | Go to previous page |
| Click right side of page | Go to next page |
| Click ◀ button | Previous page spread |
| Click ▶ button | Next page spread |
| Click ✕ button | Close viewer |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` (Left Arrow) | Previous page |
| `→` (Right Arrow) | Next page |
| `ESC` | Close viewer |

## Features in Detail

### Page Flipping Animation

The application displays pages in a two-page spread (like a real magazine):
- Pages flip with a 3D rotation effect
- Smooth transitions between pages
- Realistic page-turning animation

### Responsive Design

The viewer adapts to your screen size:
- **Desktop**: Two-page spread view
- **Tablet**: Two-page spread view (smaller)
- **Mobile**: Single page view

### Page Information

The top bar shows:
- Current spread number / Total spreads
- Example: "1 / 5" means you're viewing spread 1 of 5

## Tips for Best Experience

### PDF Optimization

1. **File Size**: Keep PDFs under 20MB for best performance
2. **Page Count**: Optimal performance with < 50 pages
3. **Resolution**: 150-300 DPI is ideal

### Creating Good PDFs from Office Documents

#### From Word:
```
1. File → Save As
2. Choose "PDF" format
3. Options:
   - Check "Document structure tags for accessibility"
   - Bitmap text when fonts may not be embedded
   - Click OK
4. Save
```

#### From PowerPoint:
```
1. File → Export → Create PDF/XPS
2. Options:
   - Optimize for: Standard (publishing online)
   - Include non-printing information: NO
   - Click OK
3. Publish
```

## Troubleshooting

### Problem: PDF Won't Load

**Solutions**:
1. Check file size (should be < 50MB)
2. Ensure PDF is not password-protected
3. Try opening PDF in another viewer to verify it's not corrupted
4. Check browser console for errors (F12)

### Problem: Slow Performance

**Solutions**:
1. Close other browser tabs
2. Use a smaller PDF (split large PDFs into parts)
3. Reduce rendering quality (edit `js/app.js`, change scale from 2 to 1.5)
4. Try a different browser (Chrome recommended)

### Problem: Pages Look Blurry

**Solutions**:
1. Increase PDF quality in source document
2. Adjust rendering scale in `js/app.js`:
   ```javascript
   const viewport = page.getViewport({ scale: 3 }); // Increase from 2 to 3
   ```

### Problem: Animation is Choppy

**Solutions**:
1. Close other applications
2. Reduce browser zoom to 100%
3. Update graphics drivers
4. Try hardware acceleration (browser settings)

## Advanced Usage

### Embedding in Website

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Flipbook</title>
    <link rel="stylesheet" href="path/to/css/styles.css">
</head>
<body>
    <div id="flipbook-container">
        <!-- Flipbook content -->
    </div>
    <script src="path/to/js/app.js" type="module"></script>
</body>
</html>
```

### Customizing Appearance

#### Change Colors:

Edit `css/styles.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

#### Change Animation Speed:

In `css/styles.css`:
```css
@keyframes pageFlip {
    /* Adjust duration: 0.8s → 0.5s for faster */
}
```

And in `js/app.js`:
```javascript
setTimeout(() => {
    // Match the CSS animation duration
}, 500); // Changed from 800
```

### Loading Specific PDF on Page Load

Modify `js/app.js`:
```javascript
constructor() {
    // ... existing code ...
    this.attachEventListeners();

    // Auto-load a PDF
    this.autoLoadPDF('/path/to/your/document.pdf');
}

async autoLoadPDF(url) {
    this.showLoading();
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        await this.loadPDF(blob);
    } catch (error) {
        console.error('Auto-load failed:', error);
        this.hideLoading();
    }
}
```

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Opera | 76+ | ✅ Full |
| IE 11 | - | ❌ Not supported |

## Performance Guidelines

| Pages | File Size | Performance |
|-------|-----------|-------------|
| 1-20 | < 5MB | Excellent |
| 21-50 | 5-15MB | Good |
| 51-100 | 15-30MB | Fair |
| 100+ | 30MB+ | May be slow |

## Recommended Online Converters

If you need to convert Office documents to PDF:

1. **iLovePDF** - https://www.ilovepdf.com/
   - Free, fast, no registration required
   - Supports batch conversion

2. **SmallPDF** - https://smallpdf.com/
   - Clean interface
   - Additional PDF tools available

3. **Adobe Acrobat Online** - https://www.adobe.com/acrobat/online/word-to-pdf.html
   - Official Adobe tools
   - High quality output

4. **CloudConvert** - https://cloudconvert.com/
   - API available
   - Many format options

## Security Notes

- All document processing happens in your browser
- No files are uploaded to any server
- Your documents remain private and secure
- PDF.js library is loaded from Mozilla's CDN

## Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Open browser console (F12) and check for errors
3. Try with a different PDF file
4. Check the GitHub issues page
5. Create a new issue with:
   - Browser and version
   - PDF file size
   - Error messages (if any)
   - Steps to reproduce

---

Enjoy your digital flipbook experience! 📚✨
