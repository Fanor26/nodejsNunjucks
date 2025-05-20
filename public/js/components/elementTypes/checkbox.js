const Checkbox = {
  create: (config = {}) => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.marginBottom = '1rem';
    container.style.position = 'relative';

    // Checkbox input (hidden)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = config.name;
    checkbox.name = config.name;
    checkbox.style.position = 'absolute';
    checkbox.style.opacity = '0';
    checkbox.style.cursor = 'pointer';

    // Custom checkbox
    const customCheckbox = document.createElement('span');
    customCheckbox.style.display = 'inline-block';
    customCheckbox.style.width = '20px';
    customCheckbox.style.height = '20px';
    customCheckbox.style.border = '2px solid #6200EE';
    customCheckbox.style.borderRadius = '4px';
    customCheckbox.style.marginRight = '12px';
    customCheckbox.style.position = 'relative';
    customCheckbox.style.transition = 'all 0.2s';

    // Checkmark
    const checkmark = document.createElement('span');
    checkmark.style.position = 'absolute';
    checkmark.style.top = '2px';
    checkmark.style.left = '6px';
    checkmark.style.width = '5px';
    checkmark.style.height = '10px';
    checkmark.style.border = 'solid white';
    checkmark.style.borderWidth = '0 2px 2px 0';
    checkmark.style.transform = 'rotate(45deg)';
    checkmark.style.opacity = '0';

    // Label
    const label = document.createElement('label');
    label.htmlFor = config.name;
    label.style.cursor = 'pointer';
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.userSelect = 'none';

    // Texto
    const text = document.createElement('span');
    text.textContent = config.label || '';
    text.style.fontSize = '0.9rem';

    // Estado inicial
    if (config.checked) {
      customCheckbox.style.backgroundColor = '#6200EE';
      checkmark.style.opacity = '1';
    }

    // Event handlers
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        customCheckbox.style.backgroundColor = '#6200EE';
        checkmark.style.opacity = '1';
      } else {
        customCheckbox.style.backgroundColor = 'transparent';
        checkmark.style.opacity = '0';
      }
      config.onChange?.(e.target.checked);
    });

    // Ensamblar componentes
    customCheckbox.appendChild(checkmark);
    label.appendChild(checkbox);
    label.appendChild(customCheckbox);
    label.appendChild(text);
    container.appendChild(label);

    // Public API
    container.getValue = () => checkbox.checked;
    container.setValue = (value) => {
      checkbox.checked = value;
      if (value) {
        customCheckbox.style.backgroundColor = '#6200EE';
        checkmark.style.opacity = '1';
      } else {
        customCheckbox.style.backgroundColor = 'transparent';
        checkmark.style.opacity = '0';
      }
    };

    return container;
  },
};
export default Checkbox;
