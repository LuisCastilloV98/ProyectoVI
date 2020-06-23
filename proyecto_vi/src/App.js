import React from 'react';
import './App.css';

// Import de componentes
import Home from './components/home/Home';
import RadialTimeline from './components/radial_timeline/radial_timeline';
import Hierarchy from './components/hierarchy/hierarchy';
import SmallMultiples from './components/small_multiples/small_multiples';

function App() {
  return (
    <div className="slides" >
      <Home />
      <RadialTimeline/>
      <SmallMultiples />
      <Hierarchy />
    </div>
  );
}

export default App;
