FROM node:12.18.0-alpine AS builder

RUN apk add --no-cache python make git g++

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build


FROM nginx:1.18.0-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
