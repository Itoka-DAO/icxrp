import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { ChakraProvider } from "@chakra-ui/react"

import { theme } from './theme'
import Font from "./components/Fonts"
import Main from "./view"
import { MainProvider } from "./context"


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <MainProvider>
      <Font />
      <ChakraProvider theme={theme}>
        <Main />
      </ChakraProvider>
    </MainProvider>
  </React.StrictMode>,
)
