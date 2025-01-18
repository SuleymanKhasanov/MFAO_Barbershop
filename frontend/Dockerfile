# Используем Node.js 18 как базовый образ
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock), чтобы установить зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код в контейнер
COPY . .

# Собираем приложение для production
RUN npm run build

# Открываем порт 3000 для фронтенда
EXPOSE 3000

# Запуск приложения в production-режиме
CMD ["npm", "start"]
