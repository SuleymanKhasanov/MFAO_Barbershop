FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Указываем по умолчанию, что папка node_modules не будет перезаписываться
VOLUME [ "/app/node_modules" ]

# В режиме разработки мы не копируем весь проект — это делает volume
CMD ["npm", "run", "dev"]
