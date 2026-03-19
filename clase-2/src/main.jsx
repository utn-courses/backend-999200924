import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { Beneficios } from './components/Beneficios.jsx'
import { Hero } from './components/Hero.jsx'
import { Contacto } from './components/Contacto.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Contacto />
    <Hero titulo="Bienvenidos a TravelAventure" />
    <Beneficios />
  </StrictMode>,
)
