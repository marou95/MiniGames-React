import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Effacer localStorage uniquement au premier lancement en mode développement
if (process.env.NODE_ENV === 'development') {
  if (!localStorage.getItem('appInitialized')) {
    localStorage.clear();
    localStorage.setItem('appInitialized', 'true');
    console.log('localStorage cleared on first app startup (development mode)');
  } else {
    console.log('localStorage preserved (already initialized)');
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <App />
  // {/* </React.StrictMode> */}
);