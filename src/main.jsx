import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SellNFT from './components/SellNFT';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import NFTPage from './components/NFTpage';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode>,
)
