import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
// import { BrowserRouter } from 'react-router'
import Path from './routes/index.jsx'
// import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter>
    </BrowserRouter> */}
    {/* <App/> */}
    <Path/>

  </StrictMode>,
)
