import { FC, PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import astronautsForm from "./astronautsForm"

export const store = configureStore({
  reducer: { astronautsForm },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
