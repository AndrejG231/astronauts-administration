import { gql, MutationHookOptions, useMutation } from "@apollo/client"
import { IActionResponse } from "../types/IActionResponse"
import { IAstronautUpdateFields } from "../types/IAstronauts"

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
