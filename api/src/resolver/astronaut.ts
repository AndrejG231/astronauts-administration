import { Arg, Ctx, Query, Resolver, Int, Mutation } from "type-graphql"
import { Context } from "../types/Context"

import {
  IAstronaut,
  IAstronautCreateInput,
  IAstronautList,
  IAstronautUpdateInput,
} from "../typedefs/IAstronaut"
import { ApolloError } from "apollo-server-express"
import { IActionResponse } from "../typedefs/IActionResponse"
import { validateAstronaut } from "../utils/validateAstronaut"

@Resolver()
class AstronautResolver {
  // SINGLE - Retrieve astronaut data
  @Query(() => IAstronaut)
  async astronaut(
    @Arg("id") id: string,
    @Ctx() { models, services }: Context
  ): Promise<IAstronaut> {
    // Validate mongo ObjectId
    if (!services.db.Types.ObjectId.isValid(id)) {
      throw new ApolloError("Astronaut Id provided is not valid", "400")
    }

    const astronaut = await models.Astronaut.findOne({ _id: id }).exec()

    if (!astronaut) {
      throw new ApolloError(
        "Could not find astronaut with specified id.",
        "204",
        { handled: true }
      )
    }

    return astronaut
  }
}

export { AstronautResolver }
