import { gql } from "@apollo/client"

import { IAstronaut } from "../types/IAstronauts"

export interface IAstronautQueryResponse {
  astronauts: {
    total: number
    astronauts: IAstronaut[]
  }
}

export interface IAstronautsQueryVariables {
  limit?: number
  offset?: number
}

export const astronautsListQuery = gql`
  query Astronauts($offset: Int, $limit: Int) {
    astronauts(offset: $offset, limit: $limit) {
      total
      astronauts {
        birthDate
        _id
        superpower
        lastName
        firstName
      }
    }
  }
`
