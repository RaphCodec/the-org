
// Show the help form
function showHelpForm() {
  document.getElementById('helpForm').classList.remove('hidden');
}

// Hide the help form (called on Send button)
function hideHelpForm() {
  const form = document.getElementById('helpForm');
  form.classList.add('hidden');
  // Reset all input fields inside the help form
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked = false;
    } else {
      input.value = '';
    }
  });
}
