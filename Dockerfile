FROM node:22.5-slim
WORKDIR /front

COPY . .
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000
