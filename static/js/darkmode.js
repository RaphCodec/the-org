// Theme switch logic for Ark Mode
document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.documentElement.setAttribute('data-theme', 'luxury'); // Dark mode
    } else {
      document.documentElement.setAttribute('data-theme', 'caramellatte'); // Light mode
    }
  });
});
