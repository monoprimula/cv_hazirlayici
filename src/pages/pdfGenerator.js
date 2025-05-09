export const pdfGenerator = {
  init() {
    document.getElementById('download-pdf').addEventListener('click', () => {
      this.generatePDF();
    });
  },

  generatePDF() {
    // PDF indirme butonuna tıklanma işlemi
    const downloadBtn = document.getElementById('download-pdf');
    const originalBtnText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      Generating...
    `;
    downloadBtn.disabled = true;

    // Resume içeriği
    const resumeElement = document.getElementById('resume-preview');

    // Eğer resumeElement boşsa, hatalı işlem uyarısı verin
    if (!resumeElement || resumeElement.children.length === 0) {
      alert("Resume preview is empty. Please fill in the details before generating the PDF.");
      downloadBtn.innerHTML = originalBtnText;
      downloadBtn.disabled = false;
      return;
    }

    // Şablonun kopyasını al
    const clonedResume = resumeElement.cloneNode(true);

    // Kullanıcı adı ve soyadını PDF dosya adı olarak al
    const firstName = document.getElementById('first-name').value || 'John';
    const lastName = document.getElementById('last-name').value || 'Doe';
    const filename = `${firstName}_${lastName}_Resume.pdf`;

    // PDF seçenekleri
    const options = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        logging: false,
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };

    // PDF oluştur
    html2pdf()
      .from(clonedResume)
      .set(options)
      .save()
      .then(() => {
        // Buton durumunu eski haline getir
        downloadBtn.innerHTML = originalBtnText;
        downloadBtn.disabled = false;
      })
      .catch((error) => {
        console.error('PDF generation error:', error);
        downloadBtn.innerHTML = originalBtnText;
        downloadBtn.disabled = false;
        alert('There was an error generating your PDF. Please try again.');
      });
  }
};
