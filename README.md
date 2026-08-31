# 📓 Digital Notebook Flipper

A beautiful, interactive magazine-style document viewer with realistic page-flipping effects. View PDFs, Word documents, and PowerPoint presentations in an elegant flipbook format.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- **📄 Multi-Format Support**: Works with PDF, Word (.docx), and PowerPoint (.pptx) files
- **📖 Realistic Page Flipping**: Smooth, magazine-style page turn animations
- **🎨 Beautiful UI**: Modern, gradient-based design with intuitive controls
- **⌨️ Keyboard Navigation**: Use arrow keys to flip pages
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🖱️ Click Navigation**: Click on page edges to flip forward or backward
- **⚡ Fast Loading**: Optimized rendering with PDF.js
- **🎯 Zero Dependencies**: Pure JavaScript with CDN-loaded PDF.js

## 🚀 Quick Start

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd de_site
   ```

2. **Install dependencies** (optional, for development server):
   ```bash
   npm install
   ```

3. **Run the application**:

   **Option A - Simple HTTP Server**:
   ```bash
   npm start
   # or
   npm run dev
   ```

   **Option B - Using Python**:
   ```bash
   python -m http.server 8000
   ```

   **Option C - Using Node.js http-server**:
   ```bash
   npx http-server
   ```

4. **Open in browser**:
   ```
   http://localhost:8000
   ```

### Usage

1. **Upload a Document**:
   - Click "Choose File" button
   - Select a PDF, Word, or PowerPoint file
   - The document will load automatically

2. **Navigate Pages**:
   - Click the **◀** and **▶** buttons to flip pages
   - Use **Left/Right arrow keys** on your keyboard
   - Click on **left edge** of page to go back
   - Click on **right edge** of page to go forward

3. **Close Document**:
   - Click the **✕** button to return to upload screen
   - Press **ESC** key

## 📁 Project Structure

```
de_site/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles and animations
├── js/
│   └── app.js              # Main application logic
├── assets/                 # Images and sample documents
├── package.json            # Project dependencies
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Main text color */
    --secondary-color: #3498db;    /* Accent color */
    --accent-color: #e74c3c;       /* Alert/close button color */
    --background: #f5f6fa;         /* Background color */
    --card-bg: #ffffff;            /* Card background */
}
```

### Changing Flip Animation Speed

In `css/styles.css`, adjust the animation duration:

```css
@keyframes pageFlip {
    /* Change from 0.8s to your preferred duration */
}
```

And in `js/app.js`, update the timeout:

```javascript
setTimeout(() => {
    this.currentPage += 2;
    this.updateFlipbookDisplay();
    // Change 800ms to match your animation duration
}, 800);
```

### PDF Quality

Adjust the rendering scale in `js/app.js`:

```javascript
async renderPDFPage(page) {
    // Increase scale for higher quality (uses more memory)
    const viewport = page.getViewport({ scale: 2 }); // Change to 3, 4, etc.
    // ...
}
```

## 🔧 Technical Details

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and grid layout
- **JavaScript (ES6+)**: Modern JavaScript with classes and async/await
- **PDF.js**: Mozilla's PDF rendering library
- **No Build Step**: Works directly in browser

### Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Opera: ✅ Full support
- IE11: ❌ Not supported (uses modern JavaScript)

### Word & PowerPoint Support

The application handles Office documents in two ways:

1. **Manual Conversion** (Recommended):
   - Convert documents to PDF before uploading
   - Best quality and compatibility

2. **Guided Instructions**:
   - App provides conversion instructions
   - Links to online converters (iLovePDF, SmallPDF, Adobe)

For automatic conversion, you would need to implement:
- Server-side conversion using LibreOffice or similar
- Cloud conversion API (Google Drive API, Microsoft Graph API)

## 📝 API Reference

### DigitalFlipbook Class

Main application class that handles all flipbook functionality.

#### Methods

```javascript
// Load a PDF file
await loadPDF(file)

// Navigate to next page
nextPage()

// Navigate to previous page
previousPage()

// Close the viewer
closeViewer()

// Handle file upload
handleFileUpload(event)
```

## 🎯 Roadmap

- [ ] Server-side Office document conversion
- [ ] Zoom in/out functionality
- [ ] Full-screen mode
- [ ] Download processed document
- [ ] Bookmarks and annotations
- [ ] Search within document
- [ ] Print optimized view
- [ ] Thumbnail navigation
- [ ] Multiple language support

## 🐛 Troubleshooting

### PDF Not Loading

1. Check browser console for errors
2. Ensure PDF is not corrupted
3. Try with a different PDF file
4. Check internet connection (PDF.js loads from CDN)

### Slow Performance

1. Reduce PDF rendering scale in `js/app.js`
2. Use smaller PDF files (< 50 pages recommended)
3. Close other browser tabs
4. Try on a different device

### Office Documents Not Working

1. Convert to PDF manually first
2. Use recommended online converters
3. Ensure file is not password-protected

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🙏 Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) - Mozilla's PDF rendering library
- [Font Awesome](https://fontawesome.com/) - Icons (if added in future)
- Inspired by various digital magazine readers

---

Made with ❤️ by Digital Experts
