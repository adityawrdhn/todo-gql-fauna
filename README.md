# React Todo GraphQL !

## Deploy

- [todo-adityawrdhn.netlify.app](https://todo-adityawrdhn.netlify.app/)


## Features

This Todo project creates by requirement the following :

-   User can read, add, update, delete Todo

## Tech!

-   React.js using hooks
-   Fluent-UI framework
-   Redux
-   Graphql
-   Backend using FaunaDB Graphql

### Folder Structure Description

-   `Components` spliting ui component.
-   `Containers` component as page or container
-   `Graphql` graphql setting and query
-   `Store` redux setting and store

## Usage

Clone and run application.

```sh
$ cd /{YOUR_PATH_FOLDER}/
$ git clone "https://github.com/adityawrdhn/todo-gql-fauna.git"
$ cd todo-gql-fauna/
```

1. Start React Apps Using Npm

```sh
$ npm install
$ npm start
```
2. Start React Apps Using yarn

```sh
$ yarn
$ yarn start
```

3. Start React Apps Using Docker

```sh
$ docker build . -t todo-gql
$ docker container run -it -p 3000:3000 todo-gql:latest
```

### Run Unit Test

```sh
$ yarn test
```
