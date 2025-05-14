import User from '../models/userModel.js';

export const sanitizeUser = (user) => {
  if (!user) return null;
  const userObj = user.toObject ? user.toObject() : user;
  const { password, __v, resetToken, ...safeData } = userObj;
  return safeData;
};

export const buildAuthResponse = (user, req) => ({
  status: 'success',
  data: {
    user: sanitizeUser(user),
    session: {
      id: req.sessionID,
      createdAt: new Date().toISOString(),
      expiresAt: req.session.cookie._expires,
    },
  },
});

export const createUser = async (userData) => {
  const { username, email, dni, password } = userData;

  const newUser = new User({
    username,
    email,
    dni,
    password,
    roles: ['user'],
  });

  return await newUser.save();
};

export const handleAuthError = (error) => {
  if (error.code === 11000) {
    return {
      status: 'fail',
      code: 'DUPLICATE_ENTRY',
      message: 'El usuario o email ya existe',
      details: { duplicateField: Object.keys(error.keyValue)[0] },
    };
  }

  return {
    status: 'error',
    code: 'SERVER_ERROR',
    message: 'Error en el servidor',
  };
};
