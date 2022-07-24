import { Field, ObjectType, InputType, Int } from "type-graphql"

@ObjectType()
class IAstronaut {
  @Field()
  _id: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  birthDate: Date

  @Field()
  superpower: string
}

@ObjectType()
class IAstronautList {
  @Field(() => Int)
  total: number

  @Field(() => [IAstronaut])
  astronauts: IAstronaut[]
}

@InputType()
class IAstronautCreateInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  birthDate: Date

  @Field()
  superpower: string
}

@InputType()
class IAstronautUpdateInput {
  @Field({ nullable: true })
  firstName: string

  @Field({ nullable: true })
  lastName: string

  @Field({ nullable: true })
  birthDate: Date

  @Field({ nullable: true })
  superpower: string
}

export {
  IAstronaut,
  IAstronautList,
  IAstronautCreateInput,
  IAstronautUpdateInput,
}
