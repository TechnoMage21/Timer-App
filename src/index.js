import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles
import App from './App'; // Main application component

// Create the root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the application inside React.StrictMode for development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

