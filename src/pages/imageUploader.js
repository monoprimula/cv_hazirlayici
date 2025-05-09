export const imageUploader = {
  init() {
    const profilResimKutusu = document.querySelector('.profile-image-container');
    const profilInput = document.getElementById('profile-image');
    const kaldirButonu = document.getElementById('remove-image');
    
    if (profilResimKutusu && profilInput) {
      // Resim kutusuna tıklanırsa dosya seçici açılır
      profilResimKutusu.addEventListener('click', () => {
        profilInput.click();
      });
      
      // Dosya seçimi işlenir
      profilInput.addEventListener('change', (event) => {
        const dosya = event.target.files[0];
        if (dosya && dosya.type.startsWith('image/')) {
          this.handleImageUpload(dosya);
        }
      });
      
      // Profil resmi kaldırılır
      if (kaldirButonu) {
        kaldirButonu.addEventListener('click', (event) => {
          event.preventDefault();
          this.removeProfileImage();
        });
      }
    }
  },
  
  handleImageUpload(dosya) {
    const okuyucu = new FileReader();
    
    okuyucu.onload = (event) => {
      const resimVerisi = event.target.result;
      
      // Ön izleme alanındaki her iki resmi güncelle (form ve CV)
      const onizlemeResmi = document.getElementById('profile-image-preview');
      const cvResmi = document.getElementById('cv-profile-image');
      
      if (onizlemeResmi) onizlemeResmi.src = resimVerisi;
      if (cvResmi) cvResmi.src = resimVerisi;
    };
    
    okuyucu.readAsDataURL(dosya);
  },
  
  removeProfileImage() {
    // Varsayılan yer tutucu resme sıfırla
    const varsayilanResim = 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    const onizlemeResmi = document.getElementById('profile-image-preview');
    const cvResmi = document.getElementById('cv-profile-image');
    
    if (onizlemeResmi) onizlemeResmi.src = varsayilanResim;
    if (cvResmi) cvResmi.src = varsayilanResim;
    
    // Dosya seçimini sıfırla
    const profilInput = document.getElementById('profile-image');
    if (profilInput) profilInput.value = '';
  }
};
