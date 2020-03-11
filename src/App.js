import React from 'react';
import './App.css';
import Hero from "./components/Hero";
import Controls from './components/Controls';
// Font Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSortUp, faSortDown, faSort, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(faSortUp, faSortDown, faSort, faCoffee);


function App() {
  return (
    <div className="App">
      <Hero />
      <Controls />
    </div>
  );
}

export default App;
