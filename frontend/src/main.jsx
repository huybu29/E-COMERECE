 import './styles/index.css'
 import App from './App.jsx'
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
