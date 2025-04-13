document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.documentElement.setAttribute('data-theme', 'winter'); // Dark mode
    } else {
      document.documentElement.setAttribute('data-theme', 'dark'); // Light mode
    }
  });
});