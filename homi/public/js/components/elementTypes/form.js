import Input from './input.js';
import Select from './select.js';
import Checkbox from './checkbox.js';
import Button from './button.js';
import * as validation from '../../validations/Validation.js';
import {
  baseFormStyles,
  colors,
  errorText,
  focusShadow,
} from '../../styles/baseForm.js';

const Form = {
  create: (config = {}) => {
    const form = document.createElement('form');
    Object.assign(form.style, baseFormStyles, config.styles); // ✅ Esto está bien

    form.id = config.id || '';
    form.noValidate = true;

    const state = {
      values: {},
      errors: {},
      touched: {},
      isValid: false,
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      validateAll();
      if (state.isValid) {
        config.onSubmit?.(state.values);
      } else {
        config.onError?.(state.errors);
      }
    };

    const validateField = (name, value) => {
      const fieldConfig = config.fields.find((f) => f.name === name);
      if (!fieldConfig) return;

      const error = validation.validate(value, fieldConfig.validation);
      state.errors[name] = error;
      state.touched[name] = true;
      updateFormValidity();
      return error;
    };

    const validateAll = () => {
      config.fields.forEach((field) => {
        const value = state.values[field.name] || '';
        validateField(field.name, value);
      });
    };

    const updateFormValidity = () => {
      // Recalcular si el formulario es válido
      state.isValid = Object.values(state.errors).every((error) => !error);
    };

    config.fields.forEach((fieldConfig) => {
      let fieldComponent;

      switch (fieldConfig.type) {
        case 'select':
          fieldComponent = Select.create({
            ...fieldConfig,
            onChange: (value) => {
              state.values[fieldConfig.name] = value;
              if (state.touched[fieldConfig.name]) {
                validateField(fieldConfig.name, value);
              }
            },
            error: state.errors[fieldConfig.name],
          });
          break;

        case 'checkbox':
          fieldComponent = Checkbox.create({
            ...fieldConfig,
            onChange: (value) => {
              state.values[fieldConfig.name] = value;
              if (state.touched[fieldConfig.name]) {
                validateField(fieldConfig.name, value);
              }
            },
          });
          break;

        default:
          fieldComponent = Input.create({
            ...fieldConfig,
            onChange: (value) => {
              state.values[fieldConfig.name] = value;
              validateField(fieldConfig.name, value); // Validación en tiempo real
            },
            onBlur: (value) => {
              state.touched[fieldConfig.name] = true;
              validateField(fieldConfig.name, value);
            },
            error: state.touched[fieldConfig.name]
              ? state.errors[fieldConfig.name]
              : null,
          });
      }

      form.appendChild(fieldComponent);
    });

    // Crear botón de submit
    if (config.submitButton) {
      const submitButton = Button.create({
        ...config.submitButton,
        type: 'submit',
        disabled: !state.isValid, // Deshabilitar hasta que el formulario sea válido
      });
      form.appendChild(submitButton);
    }

    form.addEventListener('submit', handleSubmit);

    form.getValues = () => state.values;
    form.setValues = (values) => {
      Object.keys(values).forEach((name) => {
        state.values[name] = values[name];
      });
    };
    form.validate = validateAll;
    form.reset = () => {
      state.values = {};
      state.errors = {};
      state.touched = {};
      state.isValid = false;
    };

    return form;
  },
};

export default Form;
