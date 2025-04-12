document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');

  // Set theme based on system preference on page load
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dim' : 'light');
  themeSwitch.checked = systemPrefersDark;

  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.documentElement.setAttribute('data-theme', 'dim'); // Dark mode
    } else {
      document.documentElement.setAttribute('data-theme', 'light'); // Light mode
    }
  });
});
