import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IAstronaut } from "../api/types/IAstronauts"

export type AstronautFormContentType = "create" | "update" | "delete"
interface AstronautFormState {
  formContent: {
    item?: IAstronaut | null
    type: AstronautFormContentType
  } | null
}

const initialState: AstronautFormState = {
  formContent: null,
}

/**
 * Astronauts form store
 * Handle information about currently selected item to edit/delete, creation mode
 */
export const astronautsFormSlice = createSlice({
  name: "astronautsFormSlice",
  initialState,
  reducers: {
    setItemToEdit: (
      state,
      action: PayloadAction<IAstronaut | null>
    ): AstronautFormState => {
      return {
        ...state,
        formContent: {
          type: "update",
          item: action.payload,
        },
      }
    },
    setItemToDelete: (
      state,
      action: PayloadAction<IAstronaut | null>
    ): AstronautFormState => {
      return {
        ...state,
        formContent: {
          type: "delete",
          item: action.payload,
        },
      }
    },
    createNew: (state): AstronautFormState => {
      return {
        ...state,
        formContent: {
          type: "create",
        },
      }
    },
    reset: () => ({ ...initialState }),
  },
})

export const astronautsFormActions = astronautsFormSlice.actions

export default astronautsFormSlice.reducer
