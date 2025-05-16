export function getCurrentPath() {
  return window.location.pathname;
}

// Función para setear el currentPath en localStorage
export function setCurrentPath(path) {
  localStorage.setItem('currentPath', path);
}
window.addEventListener('load', () => {
  const currentPath = getCurrentPath();
  setCurrentPath(currentPath);
});
window.addEventListener('popstate', () => {
  const currentPath = getCurrentPath();
  setCurrentPath(currentPath);
});
