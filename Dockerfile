FROM node:22.5-slim
WORKDIR /front

COPY . .
WORKDIR /front/kdg-platform-front
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000
