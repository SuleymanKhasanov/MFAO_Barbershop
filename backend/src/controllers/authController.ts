import { Request, Response } from 'express';
import { registerUser, validateUser } from '../services/authService';
import { generateToken } from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;
    const user = await registerUser({
      name,
      email,
      phone,
      password,
    });
    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    res.status(400).json({ error: message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    const token = generateToken({
      id: user.id.toString(),
      email: user.email,
    });
    res.status(200).json({ message: 'Успешный вход', token });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    res.status(400).json({ error: message });
  }
};

// Типизация для локальной работы с req.user
interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const protectedRoute = (req: CustomRequest, res: Response) => {
  const user = req.user;

  if (user) {
    res.json({ message: 'Доступ разрешён', user });
  } else {
    res.status(401).json({ message: 'Пользователь не авторизован' });
  }
};
