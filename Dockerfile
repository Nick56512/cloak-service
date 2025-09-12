FROM node:slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/src/main.js"]