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

  // CREATE
  @Mutation(() => IActionResponse)
  async createAstronaut(
    @Arg("data", () => IAstronautCreateInput) data: IAstronautCreateInput,
    @Ctx() { models }: Context
  ): Promise<IActionResponse> {
    // Validate input values
    const validation = validateAstronaut(data)

    if (!validation.isValid) {
      throw new ApolloError(
        `Invalid input value for field \
        ${validation.field} - ${validation.problem}`,
        "400"
      )
    }

    const creation = await new models.Astronaut(data).save()

    if (!creation?.id) {
      throw new ApolloError(`Failed to create astronaut`, "500")
    }

    return {
      message: "Successfully created astronaut",
    }
  }

  // UPDATE
  @Mutation(() => IActionResponse)
  async updateAstronaut(
    @Arg("id") id: string,
    @Arg("data", () => IAstronautUpdateInput) data: IAstronautUpdateInput,
    @Ctx() { services, models }: Context
  ): Promise<IActionResponse> {
    // Validate mongo ObjectId
    if (!services.db.Types.ObjectId.isValid(id)) {
      throw new ApolloError("Astronaut Id provided is not valid", "400")
    }

    // Validate input values
    const validation = validateAstronaut(data)

    if (!validation.isValid) {
      throw new ApolloError(
        `Invalid input value for field \
        ${validation.field} - ${validation.problem}`,
        "400"
      )
    }

    // Update in db
    const update = await models.Astronaut.findByIdAndUpdate(id, data, {
      rawResult: true,
      new: true,
    }).exec()

    if (!update.ok) {
      throw new ApolloError(`Failed to update astronaut`, "500")
    }

    return {
      message: "Successfully created astronaut",
    }
  }
}

export { AstronautResolver }
