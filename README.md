# Astronauts Administration

Simple CRUD administration website.  
Web: https://62e6d75867682615394bce48--friendly-quokka-266ae9.netlify.app/  
Graphql Playground: https://astronauts-administration-be.herokuapp.com/graphql



### Table of contents
- [Api](#api)
  - [Technology Stack](#technology--stack)
  - [Deployments](#api-deployments)
- [Client](#client)
  - [Technology Stack](#technology-stack)
  - [Deployments](#deployments)
- [Local Development](#local-development)

## Api
Graphql api built with Node.js

#### Technology  stack
- [Typescript](https://www.typescriptlang.org/)
- [Yarn](https://yarnpkg.com/)
- [Apollo Server](https://www.npmjs.com/package/apollo-server-express) - graphql server middleware for [Express](https://expressjs.com)
- [TypeGraphql](https://typegraphql.com/) - code first graphql library
- [MongoDb](https://www.mongodb.com/) - database
- [Mongoose](https://mongoosejs.com/) - database management

#### API Deployments

App is deployed on [Heroku](https://heroku.com) via Docker.  
Api url: https://astronauts-administration-be.herokuapp.com/  
GraphQL playground: https://astronauts-administration-be.herokuapp.com/graphql
    
## Client

Single-page web application built with React.js.

#### Technology Stack
- [Typescript](https://www.typescriptlang.org/)
- [Yarn](https://yarnpkg.com/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/) - state management
- [Apollo Client](https://www.apollographql.com/docs/react/) - graphql client
- [Ant Design](https://ant.design/) - intuitive UI library

#### Deployments

App is deployed on netlify.  
Web url: https://62e6d75867682615394bce48--friendly-quokka-266ae9.netlify.app/

## Local development

Requirements: [Docker](https://www.docker.com/) version 20+

1. Clone repository
1. Create `.env` file. 
1. Fill the following variables:
```
MONGO_URL=#mongoDb cluster access url
```
1. Run `docker-compose up`  



Client will be running by default on port `3000`. Server on port  `4000`.

