import React from 'react';
import './App.css';

// Import de componentes
import Home from './components/home/Home';
import RadialTimeline from './components/radial_timeline/radial_timeline';
import Hierarchy from './components/hierarchy/hierarchy';

function App() {
  return (
    <div class="slides" >
      <Home />
      <RadialTimeline />
      <Hierarchy />
    </div>
  );
}

export default App;
