FROM node:latest

WORKDIR /app
COPY package.json .

RUN npm install

#all needed
COPY . .
EXPOSE 3000
#react-app:: port :: 3000
CMD ["npm", "start"]
