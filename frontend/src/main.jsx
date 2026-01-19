import {BrowserRouter} from "react-router-dom";
// a component from React Router that enables client‑side routing
//(so you can use <Link>, <Routes>, <Route>, etc. without full page reloads).

import ReactDOM from 'react-dom/client';
//Imports the ReactDOM API that actually mounts your React app into the real HTML page.

import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
