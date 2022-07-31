import { gql, MutationHookOptions, useMutation } from "@apollo/client"
import { IActionResponse } from "../types/IActionResponse"
import { IAstronaut, IAstronautUpdateFields } from "../types/IAstronauts"

export interface IAstronautCreateMutationResponse {
  createAstronaut: IActionResponse
}

export interface IAstronautCreateMutationVariables {
  data: IAstronautUpdateFields
}

export const createAstronautMutation = gql`
  mutation CreateAstronaut($data: IAstronautCreateInput!) {
    createAstronaut(data: $data) {
      message
    }
  }
`
