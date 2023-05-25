import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Routes } from "./Routes"

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  )
}