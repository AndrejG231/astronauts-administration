import { ApolloError } from "apollo-server-express"
import { MiddlewareFn } from "type-graphql"

/**
 * Middleware to generalize all unexpected server errors
 */
const errorInterceptor: MiddlewareFn<any> = async (_, next) => {
  try {
    return await next()
  } catch (err) {
    if (err instanceof ApolloError) {
      throw err
    }

    throw new ApolloError("Unknown error occured.", "500")
  }
}

export { errorInterceptor }
