import { gql, MutationHookOptions, useMutation } from "@apollo/client"
import { IActionResponse } from "../types/IActionResponse"
import { IAstronautUpdateFields } from "../types/IAstronauts"

export interface IAstronautUpdateMutationResponse {
  updateAstronaut: IActionResponse
}

export interface IAstronautUpdateMutationVariables {
  data: Partial<IAstronautUpdateFields>
  id: string
}

export const updateAstronautMutation = gql`
  mutation UpdateAstronaut($data: IAstronautUpdateInput!, $id: String!) {
    updateAstronaut(data: $data, id: $id) {
      message
    }
  }
`
