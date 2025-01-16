const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ error: 'Email уже используется' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Ошибка при создании пользователя' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Найти пользователя в базе данных
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'Пользователь не найден' });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    // Генерация JWT-токена
    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      {
        expiresIn: '1h', // Токен действует 1 час
      },
    );

    res.status(200).json({ message: 'Успешный вход', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user; // Добавляем данные пользователя в запрос
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: 'Недействительный токен' });
  }
};

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Доступ разрешён', user: req.user });
});

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
