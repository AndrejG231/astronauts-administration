import { ApolloServer } from "apollo-server-express"
import { Express } from "express"
import { GraphQLSchema } from "graphql"
import { Context } from "../types/Context"

interface ApplyGqlServerArgs {
  app: Express
  schema: GraphQLSchema
  models: Context["models"]
  services: Context["services"]
}

/**
 * Create graphql server middleware and apply it
 * to express server instance
 */
const applyGraphqlServer = async ({
  app,
  schema,
  models,
  services,
}: ApplyGqlServerArgs) => {
  const server = new ApolloServer({
    schema,
    context: ({ req, res }): Context => ({
      req,
      res,
      models,
      services,
    }),
  })

  await server.start()

  server.applyMiddleware({ app, path: "/graphql" })
}

export { applyGraphqlServer }
