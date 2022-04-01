import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./RoutesConfig";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./customTheme";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <BrowserRouter>
          <RoutesConfig />
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
