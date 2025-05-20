import Joi from 'joi';

export const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

export const validateRegister = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    dni: Joi.string()
      .pattern(/^[0-9]{8,10}$/)
      .required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({ 'any.only': 'Las contraseñas no coinciden' }),
  });

  return schema.validate(data);
};
