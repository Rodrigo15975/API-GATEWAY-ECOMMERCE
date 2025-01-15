FROM node:20-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install 
COPY . .

# Establece la variable NODE_ENV en producción
ENV NODE_ENV=production
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"] 
