import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./css/button.css"
import "./css/grid.css"
import "./css/icon.css"
import "./css/panel.css"
import "./css/card.css"
import "./css/modal.css"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
