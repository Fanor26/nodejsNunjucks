let previousState = null; // Variable para guardar el estado anterior
let changeCounter = 0;
let blinkInterval = null;
let blinkTimeout = null;
let showButton = null;
let counterBadge = null;
let isPanelVisible = true;
const expandedPaths = new Set();

export function renderTreeViewer(state) {
  const container = document.createElement('div');
  container.className = 'tree-viewer-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    background: #222;
    color: white;
    font-family: monospace;
    font-size: 13px;
    overflow-y: auto;
    z-index: 9999;
    border-left: 3px solid #888;
    transform: translateX(0);
    transition: transform 0.3s ease;
  `;

  const header = document.createElement('div');
  header.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #333;
    padding: 8px 10px;
    position: sticky;
    top: 0;
    z-index: 10001;
  `;

  const title = document.createElement('span');
  title.textContent = '🌳 State Viewer';
  title.style.cssText = `font-weight: bold;`;

  const hideButton = document.createElement('span');
  hideButton.textContent = '🗙';
  hideButton.style.cssText = `
    cursor: pointer;
    font-size: 18px;
    color: #ffcc00;
  `;

  hideButton.addEventListener('click', () => {
    container.style.transform = 'translateX(100%)';
    showButton.style.display = 'block';
    isPanelVisible = false;
  });

  header.appendChild(title);
  header.appendChild(hideButton);

  const treeContainer = document.createElement('div');
  treeContainer.className = 'tree-viewer';
  treeContainer.style.cssText = `padding: 10px; background: #1e1e1e;`;
  treeContainer.appendChild(createNodeElement(state));
  container.appendChild(header);
  container.appendChild(treeContainer);
  document.body.appendChild(container);

  showButton = document.createElement('div');
  showButton.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    font-size: 20px;
    background: #ffcc00;
    color: #1e1e1e;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    z-index: 10000;
    display: none;
    text-align: center;
  `;
  showButton.textContent = '🌳';

  counterBadge = document.createElement('div');
  counterBadge.style.cssText = `
    font-size: 12px;
    margin-top: 2px;
    color: #1e1e1e;
    font-weight: bold;
  `;
  counterBadge.textContent = '';

  showButton.appendChild(counterBadge);

  showButton.addEventListener('click', () => {
    container.style.transform = 'translateX(0)';
    showButton.style.display = 'none';
    isPanelVisible = true;
    changeCounter = 0;
    counterBadge.textContent = '';
  });

  document.body.appendChild(showButton);
}

export function createNodeElement(obj, keyName = null, keyNamePath = []) {
  const wrapper = document.createElement('div');
  const isObject = typeof obj === 'object' && obj !== null;
  const isArray = Array.isArray(obj);
  const currentPath = [...keyNamePath, keyName].filter(Boolean).join('.');

  if (isObject) {
    const summary = document.createElement('div');
    summary.style.cursor = 'pointer';
    summary.style.margin = '2px 0';

    const toggle = document.createElement('span');
    toggle.textContent = '▶ ';
    toggle.style.color = '#ffcc00';

    const label = document.createElement('span');
    label.textContent = `${keyName !== null ? keyName + ': ' : ''}${
      isArray ? '[...]' : '{...}'
    }`;

    summary.appendChild(toggle);
    summary.appendChild(label);

    const childContainer = document.createElement('div');
    childContainer.style.marginLeft = '10px';

    const isExpanded = expandedPaths.has(currentPath);
    childContainer.style.display = isExpanded ? 'block' : 'none';
    toggle.textContent = isExpanded ? '▼ ' : '▶ ';

    for (const key in obj) {
      const child = createNodeElement(obj[key], key, [...keyNamePath, keyName]);
      childContainer.appendChild(child);
    }

    summary.addEventListener('click', () => {
      const isOpen = childContainer.style.display === 'block';
      childContainer.style.display = isOpen ? 'none' : 'block';
      toggle.textContent = isOpen ? '▶ ' : '▼ ';
      if (isOpen) {
        expandedPaths.delete(currentPath);
      } else {
        expandedPaths.add(currentPath);
      }
    });

    wrapper.appendChild(summary);
    wrapper.appendChild(childContainer);
  } else {
    const leaf = document.createElement('div');
    leaf.textContent = `${
      keyName !== null ? keyName + ': ' : ''
    }${JSON.stringify(obj)}`;
    wrapper.appendChild(leaf);
  }

  return wrapper;
}
export function safeUpdateTreeViewer(newState, retry = 0) {
  const container = document.querySelector('.tree-viewer');

  if (!container) {
    if (retry < 5) {
      setTimeout(() => {
        safeUpdateTreeViewer(newState, retry + 1);
      }, 100);
    }
    return;
  }

  container.style.transition = 'background-color 0.3s';
  container.style.backgroundColor = '#663399';

  // Comparar el estado actual con el anterior para verificar si hubo un cambio real
  const isStateChanged =
    JSON.stringify(previousState) !== JSON.stringify(newState);
  if (isStateChanged) {
    setTimeout(() => {
      container.innerHTML = '';
      container.appendChild(createNodeElement(newState, null, []));
      container.style.backgroundColor = '#222';
      previousState = newState; // Guardamos el nuevo estado
    }, 200);

    if (!isPanelVisible) {
      changeCounter++; // Solo incrementamos si hay un cambio real
      counterBadge.textContent = changeCounter.toString();

      // Parpadeo corto para cada cambio
      const colors = ['#ffcc00', '#ff6f00'];
      let i = 0;
      let blinkCount = 0;
      const maxBlinks = 6;

      if (blinkInterval) clearInterval(blinkInterval);
      if (blinkTimeout) clearTimeout(blinkTimeout);

      blinkInterval = setInterval(() => {
        showButton.style.backgroundColor = colors[i % colors.length];
        i++;
        blinkCount++;
      }, 500);

      blinkTimeout = setTimeout(() => {
        clearInterval(blinkInterval);
        blinkInterval = null;
        showButton.style.backgroundColor = '#ffcc00';
      }, maxBlinks * 500);
    }
  }
}
