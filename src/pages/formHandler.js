import { previewUpdater } from './previewUpdater.js';

export const formHandler = {
  experienceCounter: 1,
  educationCounter: 1,

  init() {
    this.attachEventListeners();
    this.populateFormWithDummyData();
    document.querySelectorAll('input, textarea').forEach(input => {
      previewUpdater.updateField(input.id, input.value);
    });
  },

  attachEventListeners() {
    document.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', (e) => {
        previewUpdater.updateField(e.target.id, e.target.value);
      });
    });

    document.getElementById('add-experience').addEventListener('click', () => {
      this.addExperienceItem();
    });

    document.getElementById('add-education').addEventListener('click', () => {
      this.addEducationItem();
    });

    document.addEventListener('click', (e) => {
      if (e.target.closest('.remove-item')) {
        const item = e.target.closest('.experience-item, .education-item');
        if (item) {
          item.remove();
          previewUpdater.refreshPreview();
        }
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('current-job') || e.target.classList.contains('current-edu')) {
        const id = e.target.id.replace('current-job-', '').replace('current-edu-', '');
        const type = e.target.classList.contains('current-job') ? 'exp' : 'edu';
        const endDateId = `${type}-end-date-${id}`;
        const endDateInput = document.getElementById(endDateId);
        
        if (e.target.checked) {
          endDateInput.disabled = true;
          endDateInput.value = '';
        } else {
          endDateInput.disabled = false;
        }
        
        previewUpdater.refreshPreview();
      }
    });

    document.addEventListener('input', (e) => {
      if (e.target.closest('.experience-item, .education-item')) {
        previewUpdater.refreshPreview();
      }
    });
  },

  addExperienceItem() {
    this.experienceCounter++;
    const id = this.experienceCounter;
    
    const template = `
      <div class="experience-item" data-id="exp-${id}">
        <div class="form-row">
          <div class="form-field">
            <label for="company-${id}">Şirket</label>
            <input type="text" id="company-${id}" class="company" placeholder="Şirket Adı">
          </div>
          <div class="form-field">
            <label for="job-position-${id}">Pozisyon</label>
            <input type="text" id="job-position-${id}" class="position" placeholder="İş Ünvanı">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label for="exp-start-date-${id}">Başlangıç Tarihi</label>
            <input type="month" id="exp-start-date-${id}" class="start-date">
          </div>
          <div class="form-field">
            <label for="exp-end-date-${id}">Bitiş Tarihi</label>
            <input type="month" id="exp-end-date-${id}" class="end-date">
            <div class="checkbox-field">
              <input type="checkbox" id="current-job-${id}" class="current-job">
              <label for="current-job-${id}">Hâlen Çalışıyor</label>
            </div>
          </div>
        </div>
        <div class="form-field">
          <label for="job-description-${id}">Açıklama</label>
          <textarea id="job-description-${id}" class="description" rows="3" placeholder="Sorumluluklarınızı ve başarılarınızı açıklayın..."></textarea>
        </div>
        <button class="remove-item btn-icon" title="Bu iş deneyimini kaldır">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </button>
      </div>
    `;
    
    const container = document.getElementById('experience-container');
    container.insertAdjacentHTML('beforeend', template);
  },

  addEducationItem() {
    this.educationCounter++;
    const id = this.educationCounter;
    
    const template = `
      <div class="education-item" data-id="edu-${id}">
        <div class="form-row">
          <div class="form-field">
            <label for="school-${id}">Okul / Üniversite</label>
            <input type="text" id="school-${id}" class="school" placeholder="Üniversite Adı">
          </div>
          <div class="form-field">
            <label for="degree-${id}">Derece</label>
            <input type="text" id="degree-${id}" class="degree" placeholder="Lisans / Yüksek Lisans">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label for="edu-start-date-${id}">Başlangıç Tarihi</label>
            <input type="month" id="edu-start-date-${id}" class="start-date">
          </div>
          <div class="form-field">
            <label for="edu-end-date-${id}">Bitiş Tarihi</label>
            <input type="month" id="edu-end-date-${id}" class="end-date">
            <div class="checkbox-field">
              <input type="checkbox" id="current-edu-${id}" class="current-edu">
              <label for="current-edu-${id}">Hâlen Öğrenci</label>
            </div>
          </div>
        </div>
        <div class="form-field">
          <label for="edu-description-${id}">Açıklama (isteğe bağlı)</label>
          <textarea id="edu-description-${id}" class="description" rows="2" placeholder="İlgili dersler, başarılar veya etkinlikler..."></textarea>
        </div>
        <button class="remove-item btn-icon" title="Bu eğitimi kaldır">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </button>
      </div>
    `;
    
    const container = document.getElementById('education-container');
    container.insertAdjacentHTML('beforeend', template);
  },
populateFormWithDummyData() {
  document.getElementById('first-name').value = 'Esra';
  document.getElementById('last-name').value = 'Küçük';
  document.getElementById('job-title').value = 'Bilgisayar Mühendisi';
  document.getElementById('email').value = 'e-kck@hotmail.com.tr';
  document.getElementById('phone').value = '+90 (555) 123-4567';
  document.getElementById('location').value = 'Ankara, Türkiye';
  document.getElementById('website').value = 'https://portfolyom.com';
  document.getElementById('summary').value = 'Yenilikçi teknolojilerle çözümler üretmeye odaklanan, detaylara önem veren bir bilgisayar mühendisiyim. Takım çalışmasına yatkın ve öğrenmeye istekliyim.';

  document.getElementById('company-1').value = 'ABC Teknoloji A.Ş.';
  document.getElementById('job-position-1').value = 'Yazılım Geliştirici';
  document.getElementById('exp-start-date-1').value = '2022-02';
  document.getElementById('exp-end-date-1').value = '2024-12';
  document.getElementById('job-description-1').value = 'Web uygulamaları geliştirdim, yazılım hatalarını analiz ederek çözdüm ve kullanıcı deneyimini iyileştirmek için arayüz optimizasyonları yaptım.';

  document.getElementById('school-1').value = 'Selçuk Üniversitesi';
  document.getElementById('degree-1').value = 'Bilgisayar Mühendisliği Lisans';
  document.getElementById('edu-start-date-1').value = '2024-02';
  document.getElementById('edu-end-date-1').value = '2026-06';
  document.getElementById('edu-description-1').value = 'Lisans eğitimimi başarıyla tamamladım. Algoritmalar, veritabanı sistemleri ve yazılım mühendisliği konularında derinlemesine bilgi edindim.';

  document.getElementById('skills').value = 'Java, C#, HTML, CSS, JavaScript, React, SQL';
},
}