import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { FC, PropsWithChildren } from "react"
import { BACKEND_URL } from "../config"

const client = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache(),
})

const ApiProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export { ApiProvider }
