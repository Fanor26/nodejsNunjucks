export const validate = (value, rules = {}) => {
  if (!rules) return null;

  // Required validation
  if (rules.required && !value) {
    return rules.requiredMessage || 'This field is required';
  }

  // Min length validation
  if (rules.minLength && value.length < rules.minLength) {
    return rules.minLengthMessage || `Minimum ${rules.minLength} characters`;
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    return rules.maxLengthMessage || `Maximum ${rules.maxLength} characters`;
  }

  // Pattern validation
  if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
    return rules.patternMessage || 'Invalid format';
  }

  // Custom validation function
  if (rules.validate && typeof rules.validate === 'function') {
    const customError = rules.validate(value);
    if (customError) return customError;
  }

  return null;
};

export const validators = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    patternMessage: 'Please enter a valid email',
  },
  password: {
    required: true,
    minLength: 8,
    validate: (value) => {
      if (!/[A-Z]/.test(value)) return 'At least one uppercase letter';
      if (!/[0-9]/.test(value)) return 'At least one number';
      return null;
    },
  },
  required: {
    required: true,
  },
};
