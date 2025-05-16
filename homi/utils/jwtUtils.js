import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

export { generateAccessToken, generateRefreshToken };
