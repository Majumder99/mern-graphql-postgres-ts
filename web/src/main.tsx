import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "apollo-link-context";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "http://localhost:4000",
//   cache: new InMemoryCache(),
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
