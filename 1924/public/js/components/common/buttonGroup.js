// components/common/buttonGroup.js

export function createButtonGroup(buttons = []) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.gap = '10px';

  buttons.forEach(({ label, onClick, active = false, color = '#ddd' }) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.padding = '10px';
    btn.style.cursor = 'pointer';
    btn.style.backgroundColor = active ? '#3f51b5' : color;
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.addEventListener('click', onClick);

    container.appendChild(btn);
  });

  return container;
}
