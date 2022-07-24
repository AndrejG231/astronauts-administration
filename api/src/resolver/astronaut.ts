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

  // LIST - Retrieve list of all astronauts
  @Query(() => IAstronautList)
  async astronauts(
    @Arg("limit", () => Int, { nullable: true }) limit: number = 20,
    @Arg("offset", () => Int, { nullable: true }) offset: number = 0,
    @Ctx() { models }: Context
  ): Promise<IAstronautList> {
    // Fetch count and astronaut list based with current pagination data
    const [total, astronauts] = await Promise.all([
      models.Astronaut.countDocuments(),
      models.Astronaut.find()
        .sort("created_at")
        .limit(limit)
        .skip(offset)
        .exec(),
    ])

    return { astronauts, total }
  }
}

export { AstronautResolver }
