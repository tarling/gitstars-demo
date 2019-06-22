import React from 'react';
import { List } from './List';

const App: React.FC = () => {
  return <List language='javascript' since={new Date('2017-12-07')} />;
}

export default App;
