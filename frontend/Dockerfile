# Используем базовый образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install


# Копируем весь проект
COPY . .


# Запускаем приложение с Turbopack
CMD ["npm", "run", "dev"]
