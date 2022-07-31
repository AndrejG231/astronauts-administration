import React from "react"
import { ApiProvider } from "./api/Provider"
import { Home } from "./pages/home"
import { ReduxProvider } from "./store/ReduxProvider"

const App = () => {
  return (
    <ReduxProvider>
      <ApiProvider>
        <Home />
      </ApiProvider>
    </ReduxProvider>
  )
}

export default App
