document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'night');
      themeSwitch.checked = false;
    } else {
      document.documentElement.setAttribute('data-theme', 'lofi');
      themeSwitch.checked = true;
    }
  };

  applyTheme(systemDarkMode.matches);

  systemDarkMode.addEventListener('change', (e) => {
    applyTheme(e.matches);
  });

  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.documentElement.setAttribute('data-theme', 'lofi');
    } else {
      document.documentElement.setAttribute('data-theme', 'night');
    }
  });
});
