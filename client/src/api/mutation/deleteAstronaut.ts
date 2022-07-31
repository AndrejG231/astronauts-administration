import { gql } from "@apollo/client"

import { IActionResponse } from "../types/IActionResponse"

export interface IAstronautDeleteMutationResponse {
  deleteAstronaut: IActionResponse
}

export interface IAstronautDeleteMutationVariables {
  id: string
}

export const deleteAstronautMutation = gql`
  mutation DeleteAstronaut($id: String!) {
    deleteAstronaut(id: $id) {
      message
    }
  }
`
