import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import emailjs from '@emailjs/browser'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin.jsx'

// Initialize EmailJS
emailjs.init("oU8KzC1UnhUI5xVmM")

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
