import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const DomNode = document.getElementById('root')
const root = createRoot(DomNode);

root.render(
         <App />
)