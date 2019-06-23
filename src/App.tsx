import React from 'react';
import { GitRepoStarsList } from './GitRepoStarsList';

const App: React.FC = () => {
  return <GitRepoStarsList language='javascript' since={new Date('2017-12-07')} />;
};

export default App;
