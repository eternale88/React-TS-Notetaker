import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { NotesProvider } from './assets/context/NotesContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NotesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotesProvider>
  </React.StrictMode>
)
