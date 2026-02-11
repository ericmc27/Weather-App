import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {UsaStates} from 'usa-states'

createRoot(document.getElementById('root')).render(
    <App />
)

export const usStates = new UsaStates().states




