const Select = {
  create: (config = {}) => {
    const container = document.createElement('div');
    container.style.marginBottom = '1.5rem';

    // Label
    if (config.label) {
      const label = document.createElement('label');
      label.textContent = config.label;
      label.htmlFor = config.name;
      label.style.display = 'block';
      label.style.marginBottom = '0.5rem';
      label.style.fontWeight = '500';
      container.appendChild(label);
    }

    // Select element
    const select = document.createElement('select');
    select.name = config.name;
    select.id = config.name;
    select.required = config.required || false;
    select.disabled = config.disabled || false;

    // Estilos
    select.style.width = '100%';
    select.style.padding = '12px 16px';
    select.style.borderRadius = '4px';
    select.style.border = '1px solid #ddd';
    select.style.backgroundColor = '#fff';
    select.style.fontSize = '1rem';
    select.style.cursor = 'pointer';

    // Placeholder option
    if (config.placeholder) {
      const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      placeholderOption.textContent = config.placeholder;
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      select.appendChild(placeholderOption);
    }

    // Options
    config.options.forEach((option) => {
      const opt = document.createElement('option');
      opt.value = option.value;
      opt.textContent = option.label;
      if (option.disabled) opt.disabled = true;
      select.appendChild(opt);
    });

    // Valor inicial
    if (config.value) {
      select.value = config.value;
    }

    // Event handlers
    select.addEventListener('change', (e) => {
      config.onChange?.(e.target.value);
    });

    // Error message
    if (config.error) {
      select.style.borderColor = '#f44336';
      const error = document.createElement('div');
      error.textContent = config.error;
      error.style.color = '#f44336';
      error.style.fontSize = '0.8rem';
      error.style.marginTop = '0.25rem';
      container.appendChild(error);
    }

    container.appendChild(select);

    // Public API
    container.getValue = () => select.value;
    container.setValue = (value) => {
      select.value = value;
      config.onChange?.(value);
    };

    return container;
  },
};
export default Select;
