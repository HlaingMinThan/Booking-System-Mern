import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:4000"

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
