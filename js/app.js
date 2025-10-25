/**
 * Digital Notebook Flipper - Main Application
 * Magazine-style page flipping viewer for PDF, Word, and PowerPoint files
 */

class DigitalFlipbook {
    constructor() {
        this.currentPage = 0;
        this.totalPages = 0;
        this.pages = [];
        this.pdfDocument = null;
        this.isFlipping = false;

        this.initializeElements();
        this.attachEventListeners();
        this.setupPDFJS();
    }

    initializeElements() {
        // Sections
        this.uploadSection = document.getElementById('upload-section');
        this.viewerSection = document.getElementById('viewer-section');
        this.loading = document.getElementById('loading');

        // Upload elements
        this.fileInput = document.getElementById('file-input');
        this.uploadBtn = document.getElementById('upload-btn');
        this.fileInfo = document.getElementById('file-info');

        // Viewer elements
        this.flipbook = document.getElementById('flipbook');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.closeBtn = document.getElementById('close-btn');
        this.currentPageEl = document.getElementById('current-page');
        this.totalPagesEl = document.getElementById('total-pages');

        // Sample buttons
        this.sampleBtns = document.querySelectorAll('.sample-btn');
    }

    setupPDFJS() {
        // Configure PDF.js
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc =
                'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
    }

    attachEventListeners() {
        // Upload button
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());

        // File input change
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));

        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());
        this.closeBtn.addEventListener('click', () => this.closeViewer());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.viewerSection.style.display !== 'none') {
                if (e.key === 'ArrowLeft') this.previousPage();
                if (e.key === 'ArrowRight') this.nextPage();
                if (e.key === 'Escape') this.closeViewer();
            }
        });

        // Sample document buttons
        this.sampleBtns.forEach(btn => {
            btn.addEventListener('click', () => this.loadSampleDocument());
        });

        // Page click for flipping
        this.flipbook.addEventListener('click', (e) => {
            const page = e.target.closest('.page');
            if (page) {
                const rect = page.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pageWidth = rect.width;

                // Click on left side = previous page, right side = next page
                if (clickX < pageWidth / 2) {
                    this.previousPage();
                } else {
                    this.nextPage();
                }
            }
        });
    }

    showLoading() {
        this.loading.style.display = 'flex';
    }

    hideLoading() {
        this.loading.style.display = 'none';
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const fileExtension = file.name.split('.').pop().toLowerCase();

        this.fileInfo.innerHTML = `
            <strong>Selected:</strong> ${file.name} (${this.formatFileSize(file.size)})
        `;

        this.showLoading();

        try {
            if (fileExtension === 'pdf') {
                await this.loadPDF(file);
            } else if (['doc', 'docx', 'ppt', 'pptx'].includes(fileExtension)) {
                await this.handleOfficeDocument(file, fileExtension);
            } else {
                throw new Error('Unsupported file format');
            }
        } catch (error) {
            console.error('Error loading document:', error);
            alert(`Error loading document: ${error.message}`);
            this.hideLoading();
        }
    }

    async loadPDF(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            this.pdfDocument = await loadingTask.promise;

            this.totalPages = this.pdfDocument.numPages;
            this.pages = [];

            // Render all pages
            for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
                const page = await this.pdfDocument.getPage(pageNum);
                const canvas = await this.renderPDFPage(page);
                this.pages.push(canvas);
            }

            this.displayFlipbook();
            this.hideLoading();
        } catch (error) {
            throw new Error(`Failed to load PDF: ${error.message}`);
        }
    }

    async renderPDFPage(page) {
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        await page.render(renderContext).promise;
        return canvas;
    }

    async handleOfficeDocument(file, fileExtension) {
        // For Office documents, we need server-side conversion or a conversion service
        // Here we provide instructions and a workaround using conversion

        this.hideLoading();

        const instructions = this.getOfficeConversionInstructions(fileExtension);

        if (confirm(instructions)) {
            // User can use online converter or we can implement server-side conversion
            this.showOfficeConversionOptions(file, fileExtension);
        }
    }

    getOfficeConversionInstructions(fileExtension) {
        const docType = fileExtension === 'docx' || fileExtension === 'doc' ? 'Word' : 'PowerPoint';
        return `To view ${docType} documents in the flipbook:\n\n` +
               `Option 1: Convert to PDF first\n` +
               `- Open the file in ${docType}\n` +
               `- Save/Export as PDF\n` +
               `- Upload the PDF file\n\n` +
               `Option 2: Use automatic conversion (requires internet)\n` +
               `Click OK to use an online conversion service.`;
    }

    showOfficeConversionOptions(file, fileExtension) {
        const conversionDiv = document.createElement('div');
        conversionDiv.innerHTML = `
            <div style="padding: 20px; background: #fff3cd; border-radius: 10px; margin: 20px 0;">
                <h3>📄 Office Document Conversion</h3>
                <p>To view this ${fileExtension.toUpperCase()} file, please convert it to PDF:</p>
                <ol style="text-align: left; margin: 20px 0;">
                    <li>Open your file in Microsoft Office or Google Docs</li>
                    <li>Select "Save As" or "Download As"</li>
                    <li>Choose PDF format</li>
                    <li>Upload the converted PDF here</li>
                </ol>
                <p><strong>Alternative:</strong> Use an online converter like:</p>
                <ul style="text-align: left;">
                    <li><a href="https://www.ilovepdf.com/" target="_blank">iLovePDF</a></li>
                    <li><a href="https://smallpdf.com/" target="_blank">SmallPDF</a></li>
                    <li><a href="https://www.adobe.com/acrobat/online/word-to-pdf.html" target="_blank">Adobe Online</a></li>
                </ul>
            </div>
        `;

        this.fileInfo.innerHTML = '';
        this.fileInfo.appendChild(conversionDiv);
    }

    displayFlipbook() {
        this.flipbook.innerHTML = '';
        this.currentPage = 0;

        // Display pages in pairs (like a real book)
        this.updateFlipbookDisplay();

        // Show viewer section
        this.uploadSection.style.display = 'none';
        this.viewerSection.style.display = 'block';

        this.updateNavigationControls();
    }

    updateFlipbookDisplay() {
        this.flipbook.innerHTML = '';

        // Calculate which pages to show (two-page spread)
        const leftPageIndex = this.currentPage;
        const rightPageIndex = this.currentPage + 1;

        // Create left page
        if (leftPageIndex < this.totalPages) {
            const leftPage = this.createPageElement(leftPageIndex, 'left');
            this.flipbook.appendChild(leftPage);
        }

        // Create right page
        if (rightPageIndex < this.totalPages) {
            const rightPage = this.createPageElement(rightPageIndex, 'right');
            this.flipbook.appendChild(rightPage);
        }

        this.updatePageInfo();
    }

    createPageElement(pageIndex, position) {
        const pageDiv = document.createElement('div');
        pageDiv.className = `page ${position}`;

        // Add the canvas
        const canvas = this.pages[pageIndex].cloneNode(true);
        pageDiv.appendChild(canvas);

        // Add page number
        const pageNumber = document.createElement('div');
        pageNumber.className = 'page-number';
        pageNumber.textContent = pageIndex + 1;
        pageDiv.appendChild(pageNumber);

        return pageDiv;
    }

    nextPage() {
        if (this.isFlipping) return;

        if (this.currentPage + 2 < this.totalPages) {
            this.isFlipping = true;
            this.animatePageFlip('forward');

            setTimeout(() => {
                this.currentPage += 2;
                this.updateFlipbookDisplay();
                this.updateNavigationControls();
                this.isFlipping = false;
            }, 800);
        } else if (this.currentPage + 1 < this.totalPages) {
            // Handle last page if odd number of pages
            this.currentPage += 1;
            this.updateFlipbookDisplay();
            this.updateNavigationControls();
        }
    }

    previousPage() {
        if (this.isFlipping) return;

        if (this.currentPage >= 2) {
            this.isFlipping = true;
            this.animatePageFlip('backward');

            setTimeout(() => {
                this.currentPage -= 2;
                this.updateFlipbookDisplay();
                this.updateNavigationControls();
                this.isFlipping = false;
            }, 800);
        } else if (this.currentPage === 1) {
            this.currentPage = 0;
            this.updateFlipbookDisplay();
            this.updateNavigationControls();
        }
    }

    animatePageFlip(direction) {
        const pages = this.flipbook.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.add(direction === 'forward' ? 'flipping' : 'flip-back');
            setTimeout(() => {
                page.classList.remove('flipping', 'flip-back');
            }, 800);
        });
    }

    updatePageInfo() {
        const displayPage = Math.floor(this.currentPage / 2) + 1;
        const displayTotal = Math.ceil(this.totalPages / 2);

        this.currentPageEl.textContent = displayPage;
        this.totalPagesEl.textContent = displayTotal;
    }

    updateNavigationControls() {
        this.prevBtn.disabled = this.currentPage === 0;
        this.nextBtn.disabled = this.currentPage >= this.totalPages - 2 &&
                                this.currentPage >= this.totalPages - 1;
    }

    closeViewer() {
        this.viewerSection.style.display = 'none';
        this.uploadSection.style.display = 'block';

        // Clean up
        this.flipbook.innerHTML = '';
        this.pages = [];
        this.currentPage = 0;
        this.totalPages = 0;
        this.fileInput.value = '';
        this.fileInfo.innerHTML = '';

        if (this.pdfDocument) {
            this.pdfDocument.destroy();
            this.pdfDocument = null;
        }
    }

    async loadSampleDocument() {
        this.showLoading();

        try {
            // Create a sample PDF programmatically
            const samplePDF = await this.createSamplePDF();
            await this.loadPDF(samplePDF);
        } catch (error) {
            console.error('Error loading sample:', error);
            alert('Could not load sample document. Please upload your own PDF file.');
            this.hideLoading();
        }
    }

    async createSamplePDF() {
        // Create a simple sample PDF using a data URL
        // This is a minimal PDF for demonstration
        const pdfData = this.generateSamplePDFData();
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        return blob;
    }

    generateSamplePDFData() {
        // Simple PDF with a few pages
        // In production, you'd want to use a PDF library or load from assets
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 1000;
        const ctx = canvas.getContext('2d');

        // This is a placeholder - you'd need actual PDF data
        // For now, we'll show a message to upload a real PDF
        throw new Error('Sample PDF not available. Please upload your own PDF file.');
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DigitalFlipbook();
    });
} else {
    new DigitalFlipbook();
}

// Export for module usage
export default DigitalFlipbook;
