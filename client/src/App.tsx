import { ApiProvider } from "./api/Provider"

import { ReduxProvider } from "./store/ReduxProvider"

import { Home } from "./pages/home"

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
