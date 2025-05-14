// components/ui/snackbar.js
export function showSnackbar(message, duration = 3000, type = 'info') {
  const existing = document.getElementById('global-snackbar');
  if (existing) existing.remove();

  const snackbar = document.createElement('div');
  snackbar.id = 'global-snackbar';
  snackbar.textContent = message;
  snackbar.style.position = 'fixed';
  snackbar.style.bottom = '20px';
  snackbar.style.left = '50%';
  snackbar.style.transform = 'translateX(-50%)';
  snackbar.style.backgroundColor =
    type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#333';
  snackbar.style.color = 'white';
  snackbar.style.padding = '12px 24px';
  snackbar.style.borderRadius = '8px';
  snackbar.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
  snackbar.style.zIndex = 9999;
  snackbar.style.fontFamily = 'sans-serif';

  document.body.appendChild(snackbar);

  setTimeout(() => {
    snackbar.remove();
  }, duration);
}
