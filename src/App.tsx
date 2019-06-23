import React from 'react';
import './App.css';
import { GitRepoStarsList } from './GitRepoStarsList';

interface State {
  language: string;
}

class App extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      language: 'javascript',
    };

    this.languageChanged = this.languageChanged.bind(this);
  }

  private languageChanged(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    this.setState({
      language: value,
    });
  }

  public render() {
    const {
      language,
    } = this.state;

    return (
      <div className='app'>
        <div className='app__test-form'>
          <label>
            Language:
            <input
              type='language'
              value={language}
              onChange={this.languageChanged}
            />
          </label>
        </div>
        <GitRepoStarsList language={language} />
      </div>);
  }
}

export default App;
