document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'littlepug');
      themeSwitch.checked = false;
    } else {
      document.documentElement.setAttribute('data-theme', 'bubs');
      themeSwitch.checked = true;
    }
  };

  applyTheme(systemDarkMode.matches);

  systemDarkMode.addEventListener('change', (e) => {
    applyTheme(e.matches);
  });

  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.documentElement.setAttribute('data-theme', 'bubs');
    } else {
      document.documentElement.setAttribute('data-theme', 'littlepug');
    }
  });
});
