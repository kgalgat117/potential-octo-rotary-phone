import React from 'react';
import './App.css';
import { AppRoute } from './routes/app';

function App() {
  return (
    <div className="container-fluid" style={{ backgroundColor: 'wheat', position: 'absolute', height: '-webkit-fill-available' }}>
      <AppRoute></AppRoute>
    </div>
  );
}

export default App;