import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import NoteApp from './components/NoteApp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
 const router = createBrowserRouter([
  {
     path: '/',
     element: <NoteApp />
   }
 ])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
