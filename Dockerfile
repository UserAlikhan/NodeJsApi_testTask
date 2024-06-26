FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY prisma ./prisma/
COPY start.sh ./

RUN npm install

COPY . .

RUN chmod +x start.sh

CMD ["./start.sh"]