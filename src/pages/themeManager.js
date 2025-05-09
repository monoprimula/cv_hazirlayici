export const themeManager = {
  init() {
    const toggleButton = document.getElementById('theme-toggle');
    toggleButton.addEventListener('click', this.toggleTheme);
    
    // Kaydedilen tema tercihini kontrol et
    this.loadThemePreference();
  },

  toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Tema sınıfını değiştir
    body.classList.remove(`${currentTheme}-theme`);
    body.classList.add(`${newTheme}-theme`);
    
    // Tercihi kaydet
    localStorage.setItem('theme-preference', newTheme);
  },

  loadThemePreference() {
    const savedTheme = localStorage.getItem('theme-preference');
    
    if (savedTheme) {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${savedTheme}-theme`);
    } else {
      // Kullanıcının koyu mod tercihi var mı diye kontrol et
      const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (prefersDarkMode) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
      }
    }
  }
};
