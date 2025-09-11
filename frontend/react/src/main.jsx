import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "./components/login/Login.jsx"
import AuthProvider from './components/context/AuthContext.jsx'
import ProtectedRouter from './components/shared/ProtectedRoute.jsx'
import SignUp from './components/signup/SignUp.jsx'

const theme = extendTheme({})

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },

    {
        path: "/signup",
        element: <SignUp />
    },

    {
        path: "dashboard",
        element: <ProtectedRouter><App /></ProtectedRouter> 
    }
])

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
