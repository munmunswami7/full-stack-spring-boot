import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ChakraProvider, extendTheme} from "@chakra-ui/react"

const theme = extendTheme({})

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    
  </React.StrictMode>,
)
