FROM node:alpine3.18 as builder

ARG VITE_API_URL 

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN echo "VITE_API_URL=${VITE_API_URL}" >> .env.production

RUN npm run build

FROM nginx


RUN rm /etc/nginx/conf.d/default.conf
COPY ./gabysystem.front.conf /etc/nginx/conf.d

COPY --from=builder /app/dist /usr/share/nginx/html/gabysystem.front

RUN ln -sf /usr/share/zoneinfo/America/Argentina/Buenos_Aires /etc/localtime

