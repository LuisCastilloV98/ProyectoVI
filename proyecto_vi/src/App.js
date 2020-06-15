import React from 'react';
import './App.css';

// Import de componentes
import Home from './components/home/Home';
import Jerarquia from './components/jerarquia/Jerarquia';

function App() {
  return (
    <div class="slides" >
      <Home />
      <Jerarquia />
    </div>
  );
}

export default App;
