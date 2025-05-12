import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import { BrowserRouter } from 'react-router-dom'
// Removed: import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster" // Ensure this path is correct

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Removed ThemeProvider wrapper */}
      <App />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>,
)
