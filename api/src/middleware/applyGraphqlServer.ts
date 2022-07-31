import { ApolloServer } from "apollo-server-express"
import { Express } from "express"
import { GraphQLSchema } from "graphql"
import { Context } from "../types/Context"

interface GqlServerArgs {
  schema: GraphQLSchema
  models: Context["models"]
  services: Context["services"]
  path: string
}

/**
 * Create graphql server middleware and apply it
 * to express server instance
 */
const applyGraphqlServer = async (
  app: Express,
  { schema, models, services, path }: GqlServerArgs
) => {
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

  server.applyMiddleware({ app, path })
}

export { applyGraphqlServer }
