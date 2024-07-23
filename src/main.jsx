import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './CreateTrip/CreateTrip.jsx'
import Header from './components/CustomPages/Header.jsx'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AllTrip from './AllTrip/[tripid]/AllTrip.jsx'
import MyTrip from './AllTrip/MyTrip/MyTrip.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
     path:"/createTrip",
     element:<CreateTrip/>
  },
  {
     path:"/allTrip/:tripId",
     element:<AllTrip/>
  },
  {
     path:"/myTrip",
     element:<MyTrip/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster/>
   <RouterProvider router={router}/>
      </GoogleOAuthProvider>
  </React.StrictMode>,
)
