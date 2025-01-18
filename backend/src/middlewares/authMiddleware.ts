import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Типизация для локальной работы с req.user
interface CustomRequest extends Request {
  user?: JwtPayload;
}

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret';

export const authenticateToken = (
  req: CustomRequest, // Используем CustomRequest вместо обычного Request
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Токен отсутствует' });
    return;
  }

  try {
    const user = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = user; // Добавляем user в req
    next();
  } catch (error) {
    res.status(403).json({ message: 'Недействительный токен' });
  }
};
