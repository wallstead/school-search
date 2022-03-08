import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import '@fontsource/archivo/700.css'
import App from './App'
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
