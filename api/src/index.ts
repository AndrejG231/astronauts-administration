import "reflect-metadata"
import express from "express"
import { buildSchema } from "type-graphql"
import { ApolloServer } from "apollo-server-express"

import { connectMongo } from "./services/mongo"

import { models } from "./models"
import { applyGraphqlServer } from "./middleware/applyGraphqlServer"

const PORT = ~~(process.env.PORT || 4000)
const MONGO_URL = process.env.MONGO_URL!

const main = async () => {
  const db = await connectMongo(MONGO_URL)

  const schema = await buildSchema({
    resolvers: [] as any,
  })

  const services = {
    db,
  }

  const app = express()

  // Apply apollo server middleware on route "/graphql"
  applyGraphqlServer({ app, schema, models, services })

  app.get("/", (_, res) => {
    res.send("Welcome to Astronauts administration api.")
  })

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
  })
}

main().catch((err) => console.log("Error: ", err))
