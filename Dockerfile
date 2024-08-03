FROM node:22.5-slim
WORKDIR /front
COPY ./front ./
RUN npm install
EXPOSE 5173