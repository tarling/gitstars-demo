import React from 'react';
import { List } from './List';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <List language='javascript' since={new Date('2017-12-07')} />
    </div>
  );
}

export default App;
