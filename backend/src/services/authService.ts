import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface RegisterUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export const registerUser = async ({
  name,
  email,
  phone,
  password,
}: RegisterUser) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error('Email уже используется');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, phone, password: hashedPassword },
  });
};

export const validateUser = async (
  email: string,
  password: string,
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new Error('Неверный пароль');
  }

  return user;
};
