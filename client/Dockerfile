FROM node:alpine as builder
WORKDIR '/usr/app'
COPY package.json /usr/app
RUN npm install
COPY . /usr/app
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html