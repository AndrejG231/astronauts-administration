import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { IAstronaut } from "../api/types/IAstronauts"
import { store } from "./ReduxProvider"

// Define a type for the slice state
interface AstronautFormState {
  isCreating?: boolean
  itemToDelete?: IAstronaut | null
  itemToEdit?: IAstronaut | null
}

// Define the initial state using that type
const initialState: AstronautFormState = {
  isCreating: false,
  itemToDelete: null,
  itemToEdit: null,
}

export const astronautsFormSlice = createSlice({
  name: "astronautsFormSlice",
  initialState,
  reducers: {
    setItemToEdit: (state, action: PayloadAction<IAstronaut | null>) => {
      return {
        ...state,
        itemToEdit: action.payload,
      }
    },
    setItemToDelete: (state, action: PayloadAction<IAstronaut | null>) => {
      return {
        ...state,
        itemToDelete: action.payload,
      }
    },
    setIsCreating: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isCreating: action.payload,
      }
    },

    reset: () => ({ ...initialState }),
  },
})

export const astronautsFormActions = astronautsFormSlice.actions

export default astronautsFormSlice.reducer
