import React from 'react';
import logo from './logo.svg';
import { Value } from './features/value/Value';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Value />
        
      </header>
    </div>
  );
}

export default App;
