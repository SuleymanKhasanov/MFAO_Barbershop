import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret';

export const generateToken = (user: {
  id: string;
  email: string;
}) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h',
  });
};
