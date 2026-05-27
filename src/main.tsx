import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WIN_LENGTH, GRID_SIZE } from './config.ts'

if (WIN_LENGTH > GRID_SIZE) {
    throw new Error(`WIN_LENGTH (${WIN_LENGTH}) cannot be greater than GRID_SIZE (${GRID_SIZE})`);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
