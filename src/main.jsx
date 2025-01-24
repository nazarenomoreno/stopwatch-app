import { StrictMode } from 'react'                //renderiza dos veces para evitar fallos
import { createRoot } from 'react-dom/client'     //para habilitar características nuevas como renderizado concurrente
import './index.css'                              //css

import Stopwatch from './App.jsx'     //componente


createRoot(document.getElementById('root')).render(

  <StrictMode>

    <Stopwatch/>

  </StrictMode>
)
