import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f0f0f',
            color: '#fff',
            border: '1px solid #2a2a2a',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: { iconTheme: { primary: '#C8F135', secondary: '#0f0f0f' } },
          error: { iconTheme: { primary: '#ff4d4d', secondary: '#fff' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
