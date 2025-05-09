export const previewUpdater = {
  init() {
    // Sayfa yüklendiğinde form verileriyle önizlemeyi başlat
    this.refreshPreview();
  },

  updateField(id, value) {
    // Alanların önizlemeyle eşlemesi
    const fieldMappings = {
      'first-name': () => this.updateNameTitle(),
      'last-name': () => this.updateNameTitle(),
      'job-title': () => {
        document.getElementById('cv-title').textContent = value;
      },
      'email': () => {
        document.getElementById('cv-email').textContent = value || 'eposta@ornek.com';
      },
      'phone': () => {
        document.getElementById('cv-phone').textContent = value || '+90 (555) 123 4567';
      },
      'location': () => {
        document.getElementById('cv-location').textContent = value || 'Şehir, Ülke';
      },
      'website': () => {
        const websiteEl = document.getElementById('cv-website');
        if (value) {
          const displayValue = value.replace(/^https?:\/\//, '').replace(/\/$/, '');
          websiteEl.textContent = displayValue;
          websiteEl.style.display = 'block';
        } else {
          websiteEl.style.display = 'none';
        }
      },
      'summary': () => {
        document.getElementById('cv-summary').textContent = value || 'Kariyer özetinizi buraya yazın...';
      },
      'skills': () => {
        this.updateSkills(value);
      }
    };

    // İlgili güncelleme fonksiyonunu çalıştır
    if (fieldMappings[id]) {
      fieldMappings[id]();
    }

    // Tecrübe veya eğitim alanına aitse tüm önizlemeyi yenile
    if (
      id.includes('company') || id.includes('position') || 
      id.includes('job-description') || id.includes('exp-start-date') || 
      id.includes('exp-end-date') || id.includes('school') || 
      id.includes('degree') || id.includes('edu-description') || 
      id.includes('edu-start-date') || id.includes('edu-end-date')
    ) {
      this.refreshPreview();
    }
  },

  updateNameTitle() {
    const firstName = document.getElementById('first-name').value || 'Ad';
    const lastName = document.getElementById('last-name').value || 'Soyad';
    document.getElementById('cv-name').textContent = `${firstName} ${lastName}`;
  },

  updateSkills(skillsText) {
    const skillsContainer = document.getElementById('cv-skills');
    skillsContainer.innerHTML = '';

    if (!skillsText) {
      const placeholder = document.createElement('span');
      placeholder.textContent = 'Yeteneklerinizi ekleyin...';
      placeholder.classList.add('skill-placeholder');
      skillsContainer.appendChild(placeholder);
      return;
    }

    const skills = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
    
    skills.forEach(skill => {
      const skillElement = document.createElement('div');
      skillElement.classList.add('skill-item');
      skillElement.textContent = skill;
      skillsContainer.appendChild(skillElement);
    });
  },

  refreshPreview() {
    this.updateNameTitle();

    const sectionOrder = this.getSectionOrder();
    
    this.updateExperienceSection();
    this.updateEducationSection();

    const skillsText = document.getElementById('skills').value;
    this.updateSkills(skillsText);
    
    this.applySectionOrder(sectionOrder);
  },

  getSectionOrder() {
    const sectionItems = document.querySelectorAll('.section-order-item');
    return Array.from(sectionItems).map(item => item.dataset.section);
  },

  applySectionOrder(order) {
    const resumeBody = document.querySelector('.resume-body');
    const sections = {
      'work': document.getElementById('cv-experience-section'),
      'education': document.getElementById('cv-education-section'),
      'skills': document.getElementById('cv-skills-section')
    };
    
    Object.values(sections).forEach(section => {
      if (section && section.parentNode === resumeBody) {
        resumeBody.removeChild(section);
      }
    });
    
    order.forEach(sectionKey => {
      if (sections[sectionKey]) {
        resumeBody.appendChild(sections[sectionKey]);
      }
    });
  },

  updateExperienceSection() {
    const experienceContainer = document.getElementById('cv-experience');
    experienceContainer.innerHTML = '';

    const experienceItems = document.querySelectorAll('.experience-item');

    if (experienceItems.length === 0) {
      const placeholder = document.createElement('p');
      placeholder.classList.add('empty-section');
      placeholder.textContent = 'İş deneyimi ekleyin...';
      experienceContainer.appendChild(placeholder);
      return;
    }

    experienceItems.forEach(item => {
      const id = item.dataset.id.split('-')[1];

      const company = document.getElementById(`company-${id}`)?.value || '';
      const position = document.getElementById(`job-position-${id}`)?.value || '';
      const startDate = document.getElementById(`exp-start-date-${id}`)?.value || '';
      const endDate = document.getElementById(`exp-end-date-${id}`)?.value || '';
      const isCurrentJob = document.getElementById(`current-job-${id}`)?.checked || false;
      const description = document.getElementById(`job-description-${id}`)?.value || '';

      const formattedStartDate = this.formatDate(startDate);
      const formattedEndDate = isCurrentJob ? 'Devam ediyor' : this.formatDate(endDate);
      const dateRange = startDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

      const experienceHTML = `
        <div class="resume-item">
          <div class="resume-item-header">
            <div>
              <div class="resume-item-title">${position}</div>
              <div class="resume-item-subtitle">${company}</div>
            </div>
            <div class="resume-item-date">${dateRange}</div>
          </div>
          <div class="resume-item-content">
            <p>${description}</p>
          </div>
        </div>
      `;

      experienceContainer.insertAdjacentHTML('beforeend', experienceHTML);
    });
  },

  updateEducationSection() {
    const educationContainer = document.getElementById('cv-education');
    educationContainer.innerHTML = '';

    const educationItems = document.querySelectorAll('.education-item');

    if (educationItems.length === 0) {
      const placeholder = document.createElement('p');
      placeholder.classList.add('empty-section');
      placeholder.textContent = 'Eğitim bilgisi ekleyin...';
      educationContainer.appendChild(placeholder);
      return;
    }

    educationItems.forEach(item => {
      const id = item.dataset.id.split('-')[1];

      const school = document.getElementById(`school-${id}`)?.value || '';
      const degree = document.getElementById(`degree-${id}`)?.value || '';
      const startDate = document.getElementById(`edu-start-date-${id}`)?.value || '';
      const endDate = document.getElementById(`edu-end-date-${id}`)?.value || '';
      const isCurrentEducation = document.getElementById(`current-edu-${id}`)?.checked || false;
      const description = document.getElementById(`edu-description-${id}`)?.value || '';

      const formattedStartDate = this.formatDate(startDate);
      const formattedEndDate = isCurrentEducation ? 'Devam ediyor' : this.formatDate(endDate);
      const dateRange = startDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

      const educationHTML = `
        <div class="resume-item">
          <div class="resume-item-header">
            <div>
              <div class="resume-item-title">${degree}</div>
              <div class="resume-item-subtitle">${school}</div>
            </div>
            <div class="resume-item-date">${dateRange}</div>
          </div>
          ${description ? `
            <div class="resume-item-content">
              <p>${description}</p>
            </div>
          ` : ''}
        </div>
      `;

      educationContainer.insertAdjacentHTML('beforeend', educationHTML);
    });
  },

  formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleString('tr-TR', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  }
};
