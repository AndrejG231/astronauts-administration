import { Field, ObjectType } from "type-graphql"

@ObjectType()
class IActionResponse {
  @Field()
  message: string
}

export { IActionResponse }
