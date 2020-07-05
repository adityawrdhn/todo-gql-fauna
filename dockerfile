FROM node:13.12.0-alpine
WORKDIR /app/todo-gql
COPY . .
RUN yarn
CMD ["yarn", "start"]
EXPOSE 3000
