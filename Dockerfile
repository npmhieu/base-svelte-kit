FROM node:16-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn install && yarn build

FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build .
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "index.js"]
